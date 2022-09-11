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

    const getCameraIndexById = useCallback(
        (id: string) => {
            return cameras.findIndex((x) => x.id === id);
        },
        [cameras]
    );

    const setNextCamera = useCallback(() => {
        const currentCameraIndex = getCameraIndexById(currentCameraId!);

        if (currentCameraId !== null && currentCameraIndex + 1 <= cameras.length - 1) {
            setCurrentCamera(cameras[currentCameraIndex + 1].id);
        }
    }, [cameras, currentCameraId, getCameraIndexById, setCurrentCamera]);

    const setPrevCamera = useCallback(() => {
        const currentCameraIndex = getCameraIndexById(currentCameraId!);

        if (currentCameraId !== null && currentCameraIndex && currentCameraIndex >= 0) {
            setCurrentCamera(cameras[currentCameraIndex - 1].id);
        }
    }, [cameras, currentCameraId, getCameraIndexById, setCurrentCamera]);

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
        getCameraIndexById,
        removeCamera,
    };
};
