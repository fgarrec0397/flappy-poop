import useIsEditing from "@app/Editor/_actions/hooks/useIsEditing";
import useIsEditor from "@app/Editor/_actions/hooks/useIsEditor";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import useCameras from "@scene/_actions/hooks/useCameras";
import { FC, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";

import TransformControls from "./TransformControls";

const EditorCamera: FC = () => {
    const { addCamera } = useCameras();
    const [hasEditorOpened, setHasEditorOpened] = useState(false);
    const { isEditor } = useIsEditor();
    const { isEditing } = useIsEditing();
    const { camera } = useThree((state) => ({
        camera: state.camera,
    }));
    const cameraRef = useRef(camera);

    useEffect(() => {
        console.log("executed");

        // TODO -- addCamera trigger an infinite loop when is in deps arrays
        addCamera(cameraRef);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cameraRef]);

    useFrame(() => {
        if (isEditor && !hasEditorOpened && cameraRef.current) {
            setHasEditorOpened(true);
            cameraRef.current.translateOnAxis(new Vector3(10, 10, 10), 1);
            cameraRef.current.lookAt(10, 10, 10);
        }
    });

    return (
        <>
            <PerspectiveCamera ref={cameraRef} />
            {isEditor && (
                <>
                    <TransformControls />
                    <OrbitControls
                        enablePan={!isEditing}
                        enableZoom={!isEditing}
                        enableRotate={!isEditing}
                    />
                </>
            )}
        </>
    );
};

export default EditorCamera;
