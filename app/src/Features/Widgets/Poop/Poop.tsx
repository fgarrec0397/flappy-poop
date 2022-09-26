import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { useGLTF } from "@react-three/drei";
import { CuboidCollider, Debug, RigidBody, useRapier } from "@react-three/rapier";
import { FC } from "react";

import { PoopModelGLTFResult } from "./_actions/poopTypes";

export interface PoopProps extends EditableWidget {
    shape: string;
    color: string;
    gravityScale: number;
}

const Poop: FC<PoopProps> = () => {
    const { nodes, materials } = useGLTF("/assets/Poop.gltf") as PoopModelGLTFResult;
    // const physic = useRapier();

    // console.log(physic, "physic");

    // return <></>;
    return (
        <RigidBody
            colliders={false}
            // position={[0, 0, 0]}
            onCollisionEnter={(test) => {
                console.log(test, "collision enter");
            }}
        >
            <CuboidCollider position={[0, 0, 0]} args={[0.5, 0.5, 0.5]} />
            <group dispose={null}>
                <group rotation={[-Math.PI / 2, 0, 0]}>
                    <group scale={[0.008, 0.008, 0.008]}>
                        <mesh geometry={nodes.Object_3.geometry} material={materials.Blanco_Ojos} />
                        <mesh geometry={nodes.Object_4.geometry} material={materials.Cafe} />
                        <mesh geometry={nodes.Object_5.geometry} material={materials.Cafe} />
                        <mesh geometry={nodes.Object_6.geometry} material={materials.Custom} />
                        <mesh geometry={nodes.Object_7.geometry} material={materials.Default} />
                        <mesh geometry={nodes.Object_8.geometry} material={materials.Default} />
                    </group>
                </group>
            </group>
        </RigidBody>
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
