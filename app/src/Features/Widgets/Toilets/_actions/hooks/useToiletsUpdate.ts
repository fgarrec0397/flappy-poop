import useGameUpdate from "@app/Game/_actions/hooks/useGameUpdate";

import useToilets from "./useToilets";

export default () => {
    const { addToiletChunk, toiletsChunks } = useToilets();

    useGameUpdate(() => {
        if (toiletsChunks.length <= 3) {
            addToiletChunk();
        }
    });
};
