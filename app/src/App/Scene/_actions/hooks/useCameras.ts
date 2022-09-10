import { uidGenerator } from "@app/Common/utilities";
import { useThree } from "@react-three/fiber";
import { useCallback } from "react";

import useCamerasService from "../_data/hooks/useCamerasService";
import { SceneCamera, SceneCameraRef } from "../sceneTypes";

export default () => {
    const setThree = useThree((state) => state.set);
    const { add, remove, cameras, selectCamera, currentCameraId } = useCamerasService();

    const addCamera = useCallback(
        (cameraRef: SceneCameraRef) => {
            console.log("adding a camera...");
            console.log(Object.keys(cameras).length, "Object.keys(cameras).length");

            const id = uidGenerator();
            const order = Object.keys(cameras).length;
            const camera: SceneCamera = {
                id,
                cameraRef,
                order,
            };

            add(camera);

            return camera;
        },
        [add, cameras]
    );

    const getCameraById = useCallback(
        (id: string) => {
            return (cameras || []).find((x) => x.id === id);
        },
        [cameras]
    );

    const setCurrentCamera = useCallback(
        (cameraId: string) => {
            const currentCamera = getCameraById(cameraId);
            selectCamera(cameraId);

            if (currentCamera?.cameraRef.current) {
                setThree({ camera: currentCamera.cameraRef.current });
            }
        },
        [selectCamera, setThree, getCameraById]
    );

    const getCameraIdByOrder = useCallback(
        (index: number) => {
            return cameras.find((x) => x?.order === index)?.id;
        },
        [cameras]
    );

    const setNextCamera = useCallback(() => {
        const currentCameraIndex = getCameraById(currentCameraId!)?.order;

        if (currentCameraIndex !== undefined && currentCameraIndex >= 0) {
            const nextHistoryItemId = getCameraIdByOrder(currentCameraIndex + 1);

            if (nextHistoryItemId) {
                setCurrentCamera(nextHistoryItemId);
            }
        }
    }, [currentCameraId, getCameraById, getCameraIdByOrder, setCurrentCamera]);

    const setPrevCamera = useCallback(() => {
        const currentCameraIndex = getCameraById(currentCameraId!)?.order;

        if (currentCameraIndex !== undefined && currentCameraIndex >= 0) {
            const prevHistoryItemId = getCameraIdByOrder(currentCameraIndex - 1);

            if (prevHistoryItemId) {
                setCurrentCamera(prevHistoryItemId);
            }
        }
    }, [currentCameraId, getCameraById, getCameraIdByOrder, setCurrentCamera]);

    const removeCamera = useCallback(
        (id: string) => {
            remove(id);
        },
        [remove]
    );

    return {
        cameras,
        addCamera,
        setCurrentCamera,
        setNextCamera,
        setPrevCamera,
        getCameraIdByOrder,
        removeCamera,
    };
};
