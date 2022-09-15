import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { RigidBody } from "@react-three/rapier";
import { FC } from "react";

export type TerrainProps = EditableWidget;

type OwnProps = TerrainProps;

const Terrain: FC<OwnProps> = () => {
    return (
        <RigidBody>
            <mesh>
                <planeBufferGeometry />
                <meshStandardMaterial color="white" />
            </mesh>
        </RigidBody>
    );
};

export const widget = createWidget({
    component: Terrain,
    reducer: null,
    widgetDefinition: {
        name: "Terrain",
    },
});
