import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import GameRigidbody from "@features/Physics/components/GameRigidbody";
import { FC } from "react";

export type TerrainProps = EditableWidget;

type OwnProps = TerrainProps;

const Terrain: FC<OwnProps> = () => {
    return (
        <GameRigidbody>
            <mesh>
                <planeBufferGeometry />
                <meshStandardMaterial color="white" />
            </mesh>
        </GameRigidbody>
    );
};

export const widget = createWidget({
    component: Terrain,
    reducer: null,
    widgetDefinition: {
        name: "Terrain",
    },
});
