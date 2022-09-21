import useIsEditing from "@app/Editor/_actions/hooks/useIsEditing";
import useIsEditor from "@app/Editor/_actions/hooks/useIsEditor";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useCameras from "@scene/_actions/hooks/useCameras";
import { FC, useEffect, useRef, useState } from "react";
import { PerspectiveCamera as PerspectiveCameraType, Vector3 } from "three";

import { DefaultCameras } from "../_actions/sceneConstants";
import TransformControls from "./TransformControls";

const EditorCamera: FC = () => {
    const { addCamera, removeCamera, setCurrentCamera } = useCameras();
    const [hasEditorOpened, setHasEditorOpened] = useState(false);
    const { isEditor } = useIsEditor();
    const { isEditing } = useIsEditing();
    const cameraRef = useRef<PerspectiveCameraType>(null!);

    useEffect(() => {
        const newCamera = addCamera(cameraRef, DefaultCameras.EditorCamera);

        setCurrentCamera(newCamera.id);

        return () => {
            removeCamera(newCamera.id);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cameraRef]);

    useFrame(() => {
        if (isEditor && !hasEditorOpened && cameraRef.current) {
            setHasEditorOpened(true);
            cameraRef.current.translateOnAxis(new Vector3(10, 10, 10), 1);
            cameraRef.current.lookAt(10, 10, 10);
        }
    });

    if (isEditor) {
        return (
            <>
                <PerspectiveCamera ref={cameraRef} />
                <TransformControls />
                <OrbitControls
                    enablePan={!isEditing}
                    enableZoom={!isEditing}
                    enableRotate={!isEditing}
                />
            </>
        );
    }

    return null;
};

export default EditorCamera;
