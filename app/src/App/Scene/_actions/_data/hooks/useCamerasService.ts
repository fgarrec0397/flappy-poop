import { useCallback } from "react";

import { SceneCamera } from "../../sceneTypes";
import useCamerasContext from "./useCamerasContext";

export default () => {
    const { cameras, setCameras, setCurrentCameraId, currentCameraId } = useCamerasContext();

    const add = useCallback(
        (camera: SceneCamera) => {
            setCameras((prevCameras) => ({
                ...prevCameras,
                [camera.id]: { ...camera },
            }));
        },
        [setCameras]
    );

    const update = useCallback(
        (camera: SceneCamera) => {
            setCameras((prevCameras) => {
                prevCameras[camera.id] = camera;

                return { ...prevCameras };
            });
        },
        [setCameras]
    );

    const selectCamera = useCallback(
        (cameraId: string) => {
            setCurrentCameraId(cameraId);
        },
        [setCurrentCameraId]
    );

    return {
        add,
        update,
        selectCamera,
        cameras,
        currentCameraId,
    };
};
