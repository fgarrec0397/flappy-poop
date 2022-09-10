import { uidGenerator } from "@app/Common/utilities";
import { useThree } from "@react-three/fiber";
import { useCallback, useEffect } from "react";

import useCamerasService from "../_data/hooks/useCamerasService";
import { SceneCamera, SceneCameraRef } from "../sceneTypes";

export default () => {
    const setThree = useThree((state) => state.set);
    const { add, remove, cameras, selectCamera, currentCameraId } = useCamerasService();

    // useEffect(() => {
    //     console.log(cameras, "cameras");
    // }, [cameras]);

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

    const setCurrentCamera = useCallback(
        (cameraId: string) => {
            const currentCamera = cameras[cameraId];
            selectCamera(cameraId);

            if (currentCamera?.cameraRef.current) {
                setThree({ camera: currentCamera.cameraRef.current });
            }
        },
        [cameras, selectCamera, setThree]
    );

    const getCameraIdByOrder = useCallback(
        (index: number) => {
            return Object.values(cameras).find((x) => x?.order === index)?.id;
        },
        [cameras]
    );

    const setNextCamera = useCallback(() => {
        const currentCameraIndex = cameras[currentCameraId!]?.order;
        console.log(currentCameraIndex, "currentCameraIndex");

        if (currentCameraIndex !== undefined && currentCameraIndex >= 0) {
            const nextHistoryItemId = getCameraIdByOrder(currentCameraIndex + 1);
            console.log(nextHistoryItemId, "nextHistoryItemId");

            if (nextHistoryItemId) {
                setCurrentCamera(nextHistoryItemId);
            }
        }
    }, [cameras, currentCameraId, getCameraIdByOrder, setCurrentCamera]);

    const setPrevCamera = useCallback(() => {
        const currentCameraIndex = cameras[currentCameraId!]?.order;
        console.log(currentCameraIndex, "currentCameraIndex");

        if (currentCameraIndex !== undefined && currentCameraIndex >= 0) {
            const prevHistoryItemId = getCameraIdByOrder(currentCameraIndex - 1);
            console.log(prevHistoryItemId, "prevHistoryItemId");

            if (prevHistoryItemId) {
                setCurrentCamera(prevHistoryItemId);
            }
        }
    }, [cameras, currentCameraId, getCameraIdByOrder, setCurrentCamera]);

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
