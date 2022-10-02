import { Vector3Array } from "@app/Common/commonTypes";
import useObjectSize from "@app/Common/hooks/useObjectSize";
import { serializeVector3 } from "@app/Common/utilities";
import useGameKeyboard from "@app/Core/_actions/hooks/useGameKeyboard";
import { ClientKeyMappings } from "@app/Core/coreTypes";
import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import { useIsEditor } from "@app/Editor/_actions/hooks";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import GameRigidbody from "@features/Physics/components/GameRigidbody";
import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBodyApi } from "@react-three/rapier";
import { FC, useEffect, useRef, useState } from "react";
import { Group, Mesh, Vector3 } from "three";

import { PoopModelGLTFResult } from "./_actions/poopTypes";

export type PoopProps = EditableWidget;

const Poop: FC<PoopProps> = ({ position }) => {
    const { nodes, materials } = useGLTF("/assets/Poop.gltf") as PoopModelGLTFResult;
    const ref = useRef<Group>(null);
    const meshRef = useRef<Mesh>(null);
    const [groupPosition, setGroupPosition] = useState<Vector3Array>([0, 0, 0]);
    const colliderRef = useRef<RigidBodyApi>(null);
    const { getSize } = useObjectSize();
    const { isEditor } = useIsEditor();

    useGameKeyboard((keyMapping: ClientKeyMappings) => {
        console.log(keyMapping, "game keyMapping");

        if (keyMapping.test) {
            console.log("it works");
        }
    }, []);

    useEffect(() => {
        if (meshRef.current) {
            const meshSize = getSize(meshRef.current, [0.008, 0.008, 0.008]);

            if (meshSize) {
                const newGroupPosition = serializeVector3(
                    new Vector3(-(meshSize.x / 2), -(meshSize.y / 2), meshSize.z / 2)
                );

                setGroupPosition(newGroupPosition);
            }
        }
    }, [meshRef, getSize, position]);

    return (
        <GameRigidbody
            ref={colliderRef}
            colliders={false}
            onCollisionEnter={(test) => {
                console.log(test, "collision enter");
            }}
        >
            {!isEditor && <CuboidCollider args={[0.15, 0.15, 0.15]} />}
            <group position={groupPosition}>
                <group rotation={[-Math.PI / 2, 0, 0]}>
                    <group scale={[0.008, 0.008, 0.008]} ref={ref}>
                        <mesh geometry={nodes.Object_3.geometry} material={materials.Blanco_Ojos} />
                        <mesh
                            ref={meshRef}
                            geometry={nodes.Object_4.geometry}
                            material={materials.Cafe}
                        />
                        <mesh geometry={nodes.Object_5.geometry} material={materials.Cafe} />
                        <mesh geometry={nodes.Object_6.geometry} material={materials.Custom} />
                        <mesh geometry={nodes.Object_7.geometry} material={materials.Default} />
                        <mesh geometry={nodes.Object_8.geometry} material={materials.Default} />
                    </group>
                </group>
            </group>
        </GameRigidbody>
    );
};

// useGLTF.preload("/assets/Poop.gltf");

export const widget = createWidget({
    component: Poop,
    reducer: null,
    widgetDefinition: {
        name: "Poop",
    },
});
