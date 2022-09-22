import useGameInit from "@app/Game/_actions/hooks/useGameInit";

import useToilets from "./useToilets";

export default () => {
    const { addToiletChunk, toiletsChunks } = useToilets();

    useGameInit(() => {
        if (toiletsChunks.length <= 3) {
            addToiletChunk();
        }
    });
};
