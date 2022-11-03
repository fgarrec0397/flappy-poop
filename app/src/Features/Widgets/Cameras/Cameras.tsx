import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import useGameUpdate from "@app/Game/_actions/hooks/useGameUpdate";
import useCreateCamera from "@app/Scenes/_actions/hooks/useCreateCamera";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { FieldType, HelpersTypes, WidgetType } from "@app/Widgets/_actions/widgetsConstants";
import { FC, Ref, useEffect } from "react";
import { PerspectiveCamera } from "three";

import usePoop from "../Poop/_actions/hooks/usePoop";

export type CamerasProps = EditableWidget & {
    translateXOnPlay: boolean;
};

const Cameras: FC<CamerasProps> = ({ translateXOnPlay }, ref) => {
    const { camera, cameraRef } = useCreateCamera("widgetCamera", ref!);
    const { isAlive } = usePoop();

    // set camera pos on component init
    useEffect(() => {
        camera.position.x = 0;
    }, [camera.position]);

    useGameUpdate(() => {
        if (translateXOnPlay) {
            camera.position.x += 0.01;
        }
    });

    return isAlive ? <perspectiveCamera ref={cameraRef as Ref<PerspectiveCamera>} /> : null;
};

Cameras.displayName = "Cameras";

export const widget = createWidget<CamerasProps, PerspectiveCamera>({
    component: Cameras,
    hasRef: true,
    reducer: null,
    type: WidgetType.GameObject,
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
                defaultValue: false,
            },
        ],
    },
});
