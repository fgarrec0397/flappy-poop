import { uidGenerator } from "@app/Common/utilities";
import useGameUpdate from "@app/Game/_actions/hooks/useGameUpdate";
import { useCallback, useState } from "react";

import useToiletsService from "../_data/hooks/useToiletsService";
import createToiletsChunk from "../utilities/createToiletsChunk";

export default () => {
    const { toiletsChunks, update, getToiletById, add } = useToiletsService();
    const [canAddToiletsChunk, setCanAddToiletsChunk] = useState(false);

    useGameUpdate(() => {
        if (canAddToiletsChunk) {
            addToiletChunk();
        }
    });

    const addToiletChunk = useCallback(() => {
        const newToiletChunk = createToiletsChunk();
        add(newToiletChunk);
    }, [add]);

    const setIsVisible = useCallback(
        (toiletId: string, toiletsChunkId: string, isVisible: boolean) => {
            const toilet = getToiletById(toiletId, toiletsChunkId);

            if (toilet) {
                update(toilet, {
                    isVisible,
                });
            }
        },
        [getToiletById, update]
    );

    return { toiletsChunks, setIsVisible };
};
