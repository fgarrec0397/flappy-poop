import useEditor from "@app/Editor/_actions/hooks/useEditor";
import useCameras from "@app/Scenes/_actions/hooks/useCameras";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { FC, useEffect, useRef } from "react";
import { PerspectiveCamera as PerspectiveCameraType, Vector3 } from "three";

import { DefaultCameras } from "../_actions/scenesConstants";
import TransformControls from "./TransformControls";

const EditorCamera: FC = () => {
    const { addCamera, removeCamera, setCurrentCamera } = useCameras();
    const { isEditor, isEditing, hasEditorOpened, setHasEditorOpened } = useEditor();
    const cameraRef = useRef<PerspectiveCameraType>(null!);

    useEffect(() => {
        const newCamera = addCamera(cameraRef, DefaultCameras.EditorCamera);

        setCurrentCamera(newCamera.id);

        return () => {
            removeCamera(newCamera.id);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cameraRef]);

    useEffect(() => {
        // TODO -- Rework this part because it doesn't work
        if (isEditor && !hasEditorOpened && cameraRef.current) {
            cameraRef.current.translateOnAxis(new Vector3(10, 10, 10), 1);
            cameraRef.current.lookAt(10, 10, 10);
        }
    }, [hasEditorOpened, isEditor, setHasEditorOpened]);

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
