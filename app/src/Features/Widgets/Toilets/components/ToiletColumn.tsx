import { Vector3Array } from "@app/Common/commonTypes";
import { useIntersect } from "@app/Common/hooks/useIntersect";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { FC, useMemo } from "react";

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
    const ref = useIntersect((visible) => {
        setIsVisible(toilet.id, toilet.toiletsChunkId, visible);
    });

    const rigibodyProps = {
        gravityScale: 1,
        // colliders: "cuboid",
    };

    return (
        <group position={toilet.position}>
            <RigidBody colliders={false} {...rigibodyProps}>
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
            </RigidBody>
            {/* <RigidBody {...rigibodyProps}> */}
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
            {/* </RigidBody> */}
        </group>
    );
};

export default ToiletColumn;
