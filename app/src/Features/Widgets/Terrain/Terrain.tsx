import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { RigidBody } from "@react-three/rapier";
import { WidgetModule } from "@widgets/_actions/widgetsTypes";

export type TerrainProps = EditableWidget;

type OwnProps = TerrainProps;

const Terrain = createWidget<OwnProps>(() => {
    return (
        <RigidBody>
            <mesh>
                <planeBufferGeometry />
                <meshStandardMaterial color="white" />
            </mesh>
        </RigidBody>
    );
});

export const widget: WidgetModule<TerrainProps> = {
    component: Terrain,
    reducer: null,
    widgetDefinition: {
        name: "Terrain",
    },
};
