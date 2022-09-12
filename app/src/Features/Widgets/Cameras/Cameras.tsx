import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import useEditorHelper from "@app/Editor/_actions/hooks/useEditorHelper";
import useGameInit from "@app/Game/_actions/hooks/useGameInit";
import useGameUpdate from "@app/Game/_actions/hooks/useGameUpdate";
import { useThree } from "@react-three/fiber";
import useCameras from "@scene/_actions/hooks/useCameras";
import { FieldType, WidgetModule } from "@widgets/_actions/widgetsTypes";
import { FC, useRef } from "react";
import { CameraHelper, PerspectiveCamera } from "three";

export type CamerasProps = EditableWidget & {
    translateXOnPlay: boolean;
};

const Cameras: FC<CamerasProps> = () => {
    const camera = useThree((state) => state.camera);

    const { addCamera, removeCamera, setCurrentCamera } = useCameras();
    const cameraRef = useRef<PerspectiveCamera>(null!);

    useGameInit(
        () => {
            const newCamera = addCamera(cameraRef, "widgetCamera");
            setCurrentCamera(newCamera.id);

            return newCamera;
        },
        (newCamera) => {
            if (newCamera?.id) {
                removeCamera(newCamera?.id);
            }
        }
    );

    useEditorHelper(cameraRef, CameraHelper); // TODO - try to hide this behind the scene

    useGameUpdate(() => {
        camera.position.x += 0.01;
    });

    return <perspectiveCamera ref={cameraRef} />;
};

export const widget: WidgetModule<CamerasProps> = {
    component: Cameras,
    reducer: null,
    editorOptions: {
        meshHolder: (
            <mesh scale={[0.25, 0.25, 0.25]}>
                <boxGeometry />
                <meshBasicMaterial visible={false} />
            </mesh>
        ),
    },
    widgetDefinition: {
        name: "Cameras",
        options: [
            {
                name: "translateXOnPlay",
                displayName: "Translate X on play",
                fieldType: FieldType.Checkbox,
                defaultValue: true,
            },
        ],
    },
};
