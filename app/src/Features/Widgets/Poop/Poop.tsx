import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { useGLTF } from "@react-three/drei";
import { FC } from "react";

import { PoopModelGLTFResult } from "./_actions/poopTypes";

export interface PoopProps extends EditableWidget {
    shape: string;
    color: string;
    gravityScale: number;
}

const Poop: FC<PoopProps> = () => {
    const { nodes, materials } = useGLTF("/Poop.gltf") as PoopModelGLTFResult;

    return (
        <group dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <group position={[-149.41, 912.18, 171.25]}>
                    <mesh geometry={nodes.Object_3.geometry} material={materials.Blanco_Ojos} />
                    <mesh geometry={nodes.Object_4.geometry} material={materials.Cafe} />
                    <mesh geometry={nodes.Object_5.geometry} material={materials.Cafe} />
                    <mesh geometry={nodes.Object_6.geometry} material={materials.Custom} />
                    <mesh geometry={nodes.Object_7.geometry} material={materials.Default} />
                    <mesh geometry={nodes.Object_8.geometry} material={materials.Default} />
                </group>
            </group>
        </group>
    );
};

useGLTF.preload("/Poop.gltf");

export const widget = createWidget({
    component: Poop,
    reducer: null,
    widgetDefinition: {
        name: "Toilet",
    },
});
