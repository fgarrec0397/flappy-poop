import { useIsEditor } from "@app/Editor/_actions/hooks";
import { useCameras } from "@app/Scene/_actions/hooks";
import { useThree } from "@react-three/fiber";

export default () => {
    const { setIsEditor } = useIsEditor();
    const setThree = useThree((state) => state.set);
    const { cameras } = useCameras();

    // This hook will be in charge to init all the process set the game up
    const playGame = () => {
        const firstGameCamera = cameras.find((x) => x.name !== "editorCamera");
        setIsEditor();

        if (firstGameCamera?.id && firstGameCamera.cameraRef.current) {
            setThree({ camera: firstGameCamera.cameraRef.current });
        }
    };

    return { playGame };
};
