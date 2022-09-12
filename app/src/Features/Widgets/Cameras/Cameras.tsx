import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import useEditorHelper from "@app/Editor/_actions/hooks/useEditorHelper";
import useGameUpdate from "@app/Game/_actions/hooks/useGameUpdate";
import useCreateCamera from "@app/Scene/_actions/hooks/useCreateCamera";
import { FieldType, WidgetModule } from "@widgets/_actions/widgetsTypes";
import { FC } from "react";
import { CameraHelper } from "three";

export type CamerasProps = EditableWidget & {
    translateXOnPlay: boolean;
};

const Cameras: FC<CamerasProps> = () => {
    const { camera, cameraRef } = useCreateCamera("widgetCamera");

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
