import useGameUpdate from "@app/Game/_actions/hooks/useGameUpdate";
import { useCallback, useEffect } from "react";

import useToilets from "./useToilets";

export default () => {
    const { toiletsChunks, addToiletChunk, removeToiletChunk } = useToilets();

    useEffect(() => {
        if (toiletsChunks.length) {
            // console.log(
            //     toiletsChunks[toiletsChunks.length - 1].toilets.some((x) => x.isVisible),
            //     "toiletsChunks[toiletsChunks.length - 1].toilets.some((x) => x.isVisible)"
            // );
            // console.log(
            //     toiletsChunks[toiletsChunks.length - 1].toilets.some((x) => x.isVisible),
            //     "toiletsChunks[toiletsChunks.length - 1].toilets.some((x) => x.isVisible)"
            // );
            console.log(
                toiletsChunks[toiletsChunks.length - 1].id,
                "toiletsChunks[toiletsChunks.length - 1].id"
            );
        }
    }, [toiletsChunks]);

    useGameUpdate(() => {
        // console.log({
        //     chunk: toiletsChunks,
        //     lastChunkId: toiletsChunks[toiletsChunks.length - 1].id,
        //     toilets: toiletsChunks[toiletsChunks.length - 1].toilets,
        //     hasSomeVisible: toiletsChunks[toiletsChunks.length - 1].toilets.some(
        //         (x) => x.isVisible
        //     ),
        // });

        if (
            toiletsChunks.length &&
            toiletsChunks[toiletsChunks.length - 1].toilets.some((x) => x.isVisible)
        ) {
            addToiletChunk();
            removeToiletChunk(toiletsChunks[0].id);
            // console.log("last element started to showing up");
        }
    });
};
