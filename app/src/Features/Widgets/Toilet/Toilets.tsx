import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import { useGLTF } from "@react-three/drei";
import { WidgetModule } from "@widgets/_actions/widgetsTypes";
import { FC } from "react";
// eslint-disable-next-line import/named
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        Cylinder001: THREE.Mesh;
        Box001: THREE.Mesh;
        Box002: THREE.Mesh;
    };
    materials: {
        ["Material #25"]: THREE.MeshStandardMaterial;
        ["Material #25"]: THREE.MeshStandardMaterial;
        ["Material #25"]: THREE.MeshStandardMaterial;
    };
};

export interface ToiletsProps extends EditableWidget {
    shape: string;
    color: string;
    gravityScale: number;
}

type OwnProps = ToiletsProps;

const Toilets: FC<OwnProps> = () => {
    const { nodes, materials } = useGLTF("/assets/Toilet.gltf") as GLTFResult;

    return (
        <group scale={[0.05, 0.05, 0.05]} dispose={null}>
            <mesh
                geometry={nodes.Cylinder001.geometry}
                material={materials["Material #25"]}
                rotation={[-Math.PI / 2, 0, 0]}
            />
            <mesh
                geometry={nodes.Box001.geometry}
                material={materials["Material #25"]}
                rotation={[-Math.PI / 2, 0, 0]}
            />
            <mesh
                geometry={nodes.Box002.geometry}
                material={materials["Material #25"]}
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </group>
    );
};

export const widget: WidgetModule<ToiletsProps> = {
    component: Toilets,
    reducer: null,
    widgetDefinition: {
        name: "Toilet",
    },
};
