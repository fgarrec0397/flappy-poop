import { Vector3Array } from "@app/Common/commonTypes";
import useObjectSize from "@app/Common/hooks/useObjectSize";
import { useGLTF, useIntersect } from "@react-three/drei";
import { FC, useEffect, useRef } from "react";
import { Group, Mesh, Vector3 } from "three";

import useToilets from "../_actions/hooks/useToilets";
import { ToiletModel, ToiletModelGLTFResult } from "../_actions/toiletsTypes";

export type ToiletColumnProps = {
    toilet: ToiletModel;
    index: number;
};

const ToiletColumn: FC<ToiletColumnProps> = ({ toilet, index }) => {
    const { nodes, materials } = useGLTF("/assets/Toilet.gltf") as ToiletModelGLTFResult;
    const groupScale: Vector3Array = [0.05, 0.05, 0.05];
    const objectSize = useObjectSize(nodes.Box001, groupScale);
    const { setIsVisible } = useToilets();
    const ref = useIntersect<Mesh>((visible) => {
        setIsVisible(toilet.id, toilet.toiletsChunkId, visible);
    });
    const groupRef = useRef<Group>(null!);
    // const groupSize = useObjectSize(groupRef.current, groupScale);
    // console.log(groupSize, "groupSize");

    useEffect(() => {
        const scale = new Vector3();
        groupRef.current.getWorldScale(scale);
        console.log(scale, "scale");
        console.log(objectSize, "objectSize");

        // console.log(groupRef.current.getWorldScale(), "groupRef");
        // console.log(nodes.Box001, "nodes.Box001");
    }, [objectSize]);

    return (
        <group position={[objectSize.x + index * 16, toilet.positionY, 0]}>
            <group ref={groupRef} scale={groupScale} dispose={null}>
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
