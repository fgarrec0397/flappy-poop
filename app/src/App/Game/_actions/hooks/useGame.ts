import { useIsEditor } from "@app/Editor/_actions/hooks";
import { useCameras } from "@app/Scene/_actions/hooks";
import { useThree } from "@react-three/fiber";
import { useCallback } from "react";

import useGameService from "../_data/hooks/useGameService";

export default () => {
    const { updateIsGamePaused } = useGameService();

    const { setIsEditor } = useIsEditor();
    const setThree = useThree((state) => state.set);
    const { gameCameras } = useCameras();

    // This function is called when the game init
    const startGame = () => {
        const firstGameCamera = gameCameras[0];
        setIsEditor();

        // TODO - Rework the camera process when start the game
        // if (firstGameCamera?.id && firstGameCamera.cameraRef.current) {
        //     setThree({ camera: firstGameCamera.cameraRef.current });
        // }
    };

    const pauseGame = useCallback(() => {
        updateIsGamePaused(true);
    }, [updateIsGamePaused]);

    const playGame = useCallback(() => {
        updateIsGamePaused(false);
    }, [updateIsGamePaused]);

    return {
        startGame,
        pauseGame,
        playGame,
    };
};
