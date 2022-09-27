import { Vector3Array } from "@app/Common/commonTypes";
import { useIntersect } from "@app/Common/hooks/useIntersect";
import useObjectSize from "@app/Common/hooks/useObjectSize";
import { serializeVector3 } from "@app/Common/utilities";
import { useIsEditor } from "@app/Editor/_actions/hooks";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidArgs, CuboidCollider, RigidBody } from "@react-three/rapier";
import { RigidBodyApi } from "@react-three/rapier/dist/declarations/src/types";
import { FC, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Vector3 } from "three";

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
    const { getSize } = useObjectSize();
    const rbRef = useRef<RigidBodyApi>(null);
    const { isEditor } = useIsEditor();
    const [groupPosition, setGroupPosition] = useState<Vector3Array>([0, 0, 0]);
    const [colliderSize, setColliderSize] = useState<CuboidArgs>([1, 1, 1]);
    const ref = useIntersect((visible) => {
        setIsVisible(toilet.id, toilet.toiletsChunkId, visible);
    });

    const rigibodyProps = {
        gravityScale: 1,
        // colliders: "cuboid",
    };

    useEffect(() => {
        if (ref.current) {
            const meshSize = getSize(ref.current, groupScale);

            if (meshSize) {
                const newGroupPosition = serializeVector3(
                    new Vector3(meshSize.x / 4, -meshSize.y, -meshSize.z / 6)
                );
                setGroupPosition(newGroupPosition);
            }
        }
    }, [ref, getSize, groupScale]);

    useEffect(() => {
        if (rbRef.current) {
            console.log(rbRef, "rbRef");
        }
    }, []);

    useFrame(() => {
        if (!isEditor && rbRef.current) {
            // this is how we translate a rigid body
            rbRef.current.setTranslation(
                new Vector3(
                    rbRef.current.translation().x - 0.01,
                    rbRef.current.translation().y,
                    rbRef.current.translation().z
                )
            );
        }
    });

    return (
        <>
            <RigidBody
                ref={rbRef}
                type="kinematicVelocity"
                colliders={false}
                position={toilet.position}
                {...rigibodyProps}
            >
                <CuboidCollider args={[3, 4, 2]} />

                <group scale={groupScale} position={groupPosition} dispose={null}>
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
            {/* <group scale={[0.05, 0.05, 0.05]} position={[0, 20, 0]} dispose={null}>
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
            </group> */}
        </>
    );
};

export default ToiletColumn;
