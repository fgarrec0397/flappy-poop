import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import useEditorHelper from "@app/Editor/_actions/hooks/useEditorHelper";
import useCameras from "@scene/_actions/hooks/useCameras";
import { FieldType, WidgetModule } from "@widgets/_actions/widgetsTypes";
import { FC, useEffect, useRef } from "react";
import { CameraHelper } from "three";

export type CamerasProps = EditableWidget & {
    translateXOnPlay: boolean;
};

const Cameras: FC<CamerasProps> = () => {
    const { addCamera, removeCamera } = useCameras();
    const cameraRef = useRef(null!);

    useEffect(() => {
        const newCamera = addCamera(cameraRef);

        return () => {
            removeCamera(newCamera.id);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEditorHelper(cameraRef, CameraHelper);

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
