import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import useGameUpdate from "@app/Game/_actions/hooks/useGameUpdate";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import GameRigidbody from "@features/Physics/components/GameRigidbody";
import { RigidBodyApi } from "@react-three/rapier";
import { FC, useRef } from "react";
import { Vector3 } from "three";

export type TerrainProps = EditableWidget;

type OwnProps = TerrainProps;

const Terrain: FC<OwnProps> = () => {
    const ref = useRef<RigidBodyApi>(null);

    useGameUpdate(() => {
        if (ref.current) {
            ref.current.setTranslation(
                new Vector3(
                    ref.current.translation().x + 0.01,
                    ref.current.translation().y,
                    ref.current.translation().z
                )
            );
        }
    });

    return (
        <GameRigidbody ref={ref}>
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
