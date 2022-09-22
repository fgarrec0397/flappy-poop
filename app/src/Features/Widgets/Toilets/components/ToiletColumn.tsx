import { Vector3Array } from "@app/Common/commonTypes";
import { useGLTF, useIntersect } from "@react-three/drei";
import { FC, useMemo } from "react";
import { Mesh } from "three";

import useToilets from "../_actions/hooks/useToilets";
import { ToiletModel, ToiletModelGLTFResult } from "../_actions/toiletsTypes";

export type ToiletColumnProps = {
    toilet: ToiletModel;
    index: number;
};

const ToiletColumn: FC<ToiletColumnProps> = ({ toilet }) => {
    const { nodes, materials } = useGLTF("/assets/Toilet.gltf") as ToiletModelGLTFResult;
    const groupScale: Vector3Array = useMemo(() => [0.05, 0.05, 0.05], []);
    const { setIsVisible } = useToilets();
    const ref = useIntersect<Mesh>((visible) => {
        setIsVisible(toilet.id, toilet.toiletsChunkId, visible);
    });
    return (
        <group position={toilet.position}>
            <group scale={groupScale} dispose={null}>
                <mesh
                    ref={ref}
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
            <group scale={[0.05, 0.05, 0.05]} position={[0, 20, 0]} dispose={null}>
                <mesh
                    geometry={nodes.Cylinder001.geometry}
                    material={materials["Material #25"]}
                    rotation={[-Math.PI / 2, -Math.PI, 0]}
                />
                <mesh
                    geometry={nodes.Box001.geometry}
                    material={materials["Material #25"]}
                    rotation={[-Math.PI / 2, -Math.PI, 0]}
                />
                <mesh
                    geometry={nodes.Box002.geometry}
                    material={materials["Material #25"]}
                    rotation={[-Math.PI / 2, -Math.PI, 0]}
                />
            </group>
        </group>
    );
};

export default ToiletColumn;
