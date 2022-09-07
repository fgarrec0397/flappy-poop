import useIsEditor from "@app/Editor/_actions/hooks/useIsEditor";
// import { Triplet, useSphere } from "@react-three/cannon";
import { PointerLockControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import useCameras from "@scene/_actions/hooks/useCameras";
import { FC, useEffect, useRef, useState } from "react";
import * as THREE from "three";

export interface PlayerCameraProps {
    initialPlayerPos?: [number, number, number];
}

interface Movements {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
    jump: boolean;
}

interface KeyMappingModel {
    [key: string]: string;
}

const SPEED = 5;
const keys: KeyMappingModel = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    Space: "jump",
};

const moveFieldByKey = (key: string): string => keys[key];
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const speed = new THREE.Vector3();

const usePlayerControls = (): Movements => {
    const [movement, setMovement] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        jump: false,
    });
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent): void =>
            setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));

        const handleKeyUp = (e: KeyboardEvent): void =>
            setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp); // TODO -- Handle game key bindings

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);
    return movement;
};

const PlayerCamera: FC<PlayerCameraProps> = ({ initialPlayerPos, ...props }) => {
    // const [ref, api] = useSphere(() => ({
    //     mass: 1,
    //     type: "Dynamic",
    //     // position: initialPlayerPos,
    //     ...props,
    // }));

    const { isEditor } = useIsEditor();
    const { setCamera } = useCameras();
    const { forward, backward, left, right, jump } = usePlayerControls();
    const { camera } = useThree();

    const cameraRef = useRef(null);
    const velocity = useRef([0, 0, 0]);

    // useEffect(() => {
    //     if (isEditor) {
    //         setCamera({ cameraRef });
    //     }
    // }, [setCamera, isEditor]);

    // useEffect(
    //     () =>
    //         api.velocity.subscribe((v) => {
    //             velocity.current = v;
    //         }),
    //     [api.velocity]
    // );

    // useFrame(() => {
    //     ref.current?.getWorldPosition(camera.position);
    //     frontVector.set(0, 0, Number(backward) - Number(forward));
    //     sideVector.set(Number(left) - Number(right), 0, 0);
    //     direction
    //         .subVectors(frontVector, sideVector)
    //         .normalize()
    //         .multiplyScalar(SPEED)
    //         .applyEuler(camera.rotation);
    //     speed.fromArray(velocity.current);
    //     api.velocity.set(direction.x, velocity.current[1], direction.z);

    //     if (jump && Math.abs(Number(velocity.current[1].toFixed(2))) < 0.05)
    //         api.velocity.set(velocity.current[0], 10, velocity.current[2]);
    // });

    return (
        <>
            {/* <mesh ref={ref} /> */}
            <perspectiveCamera ref={cameraRef} />
            <PointerLockControls />
        </>
    );
};

export default PlayerCamera;
