import { uidGenerator } from "@app/Common/utilities";
import { useThree } from "@react-three/fiber";
import { useCallback } from "react";

import useCamerasService from "../_data/hooks/useCamerasService";
import { SceneCamera, SceneCameraRef } from "../sceneTypes";

export default () => {
    const setThree = useThree((state) => state.set);
    const { add, cameras, selectCamera, currentCameraId } = useCamerasService();

    const setCurrentCamera = useCallback(
        (cameraId: string) => {
            const currentCamera = cameras[cameraId];
            selectCamera(cameraId);

            if (currentCamera?.cameraRef.current) {
                console.log("setthree");

                setThree({ camera: currentCamera.cameraRef.current });
            }
        },
        [cameras, selectCamera, setThree]
    );

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
            setCurrentCamera(camera.id);
        },
        [add, cameras, setCurrentCamera]
    );

    const getCameraId = useCallback(
        (index: number) => {
            return Object.keys(cameras)[index];
        },
        [cameras]
    );

    const setNextCamera = useCallback(() => {
        // TODO -- Fix setNextCamera
        const currentCameraIndex = cameras[currentCameraId!]?.order;
        console.log(currentCameraIndex, "setNextCamera");

        if (currentCameraIndex && currentCameraIndex >= 0) {
            const nextHistoryItemId = getCameraId(currentCameraIndex + 1);

            setCurrentCamera(nextHistoryItemId);
        }
    }, [cameras, currentCameraId, getCameraId, setCurrentCamera]);

    const setPrevCamera = useCallback(() => {
        // TODO -- Fix setPrevCamera
        const currentCameraIndex = cameras[currentCameraId!]?.order;
        console.log(currentCameraIndex, "setPrevCamera");

        if (currentCameraIndex && currentCameraIndex >= 0) {
            const prevHistoryItemId = getCameraId(currentCameraIndex - 1);
            setCurrentCamera(prevHistoryItemId);
        }
    }, [cameras, currentCameraId, getCameraId, setCurrentCamera]);

    const deleteCamera = () => {};

    return {
        cameras,
        addCamera,
        setCurrentCamera,
        setNextCamera,
        setPrevCamera,
        deleteCamera,
    };
};
