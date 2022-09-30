import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import useCreateCamera from "@app/Scene/_actions/hooks/useCreateCamera";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { HelpersTypes } from "@app/Widgets/_actions/widgetsConstants";
import { FieldType } from "@widgets/_actions/widgetsTypes";
import { FC, Ref } from "react";
import { PerspectiveCamera } from "three";

export type CamerasProps = EditableWidget & {
    translateXOnPlay: boolean;
};

const Cameras: FC<CamerasProps> = (props, ref) => {
    const { cameraRef } = useCreateCamera("widgetCamera", ref!);

    return <perspectiveCamera ref={cameraRef as Ref<PerspectiveCamera>} />;
};

Cameras.displayName = "Cameras";

export const widget = createWidget<CamerasProps, PerspectiveCamera>({
    component: Cameras,
    hasRef: true,
    reducer: null,
    editorOptions: {
        helper: HelpersTypes.CameraHelper,
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
});
