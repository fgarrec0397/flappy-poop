import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { PerspectiveCamera } from "three";

import useCameras from "./useCameras";

/**
 * Create a new camera and add it to the CamerasContext.
 */
export default (cameraName: string) => {
    const camera = useThree((state) => state.camera);
    const { addCamera, removeCamera, setCurrentCamera } = useCameras();
    const cameraRef = useRef<PerspectiveCamera>(null!);

    useEffect(() => {
        const newCamera = addCamera(cameraRef, cameraName);
        setCurrentCamera(newCamera.id);

        return () => {
            removeCamera(newCamera?.id);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        camera,
        cameraRef,
    };
};
