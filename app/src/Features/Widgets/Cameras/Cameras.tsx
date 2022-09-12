import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import useEditorHelper from "@app/Editor/_actions/hooks/useEditorHelper";
import useGameUpdate from "@app/Game/_actions/hooks/useGameUpdate";
import useCreateCamera from "@app/Scene/_actions/hooks/useCreateCamera";
import { FieldType, WidgetModule } from "@widgets/_actions/widgetsTypes";
import { forwardRef, MutableRefObject, Ref } from "react";
import { CameraHelper, Object3D, PerspectiveCamera } from "three";

export type CamerasProps = EditableWidget & {
    translateXOnPlay: boolean;
};

const Cameras = forwardRef<PerspectiveCamera, CamerasProps>(({ translateXOnPlay = true }, ref) => {
    const { camera, cameraRef } = useCreateCamera("widgetCamera", ref!);

    useEditorHelper(cameraRef as MutableRefObject<Object3D | null>, CameraHelper); // TODO - try to hide this behind the scene

    useGameUpdate(() => {
        if (translateXOnPlay) {
            camera.position.x += 0.01;
        }
    });

    return <perspectiveCamera ref={cameraRef as Ref<PerspectiveCamera>} />;
});

Cameras.displayName = "Cameras";

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
