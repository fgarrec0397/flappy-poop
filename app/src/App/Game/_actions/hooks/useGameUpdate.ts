import { useIsEditor } from "@app/Editor/_actions/hooks";
import { RenderCallback, useFrame } from "@react-three/fiber";

/**
 * This hook is executed on each frame when the game is running.
 *
 * It uses `useFrame` from **react-three-fiber** behind the scene, so it works the same way and you have access to the same parameters in your callback.
 *
 * @param callback The callback you want to be executed each frame.
 */
export default (callback: RenderCallback) => {
    const { isEditor } = useIsEditor();

    useFrame((state, delta, frame) => {
        if (!isEditor) {
            callback(state, delta, frame);
        } else {
            return null;
        }
    });
};
