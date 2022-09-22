import { Vector3Array } from "@app/Common/commonTypes";
import { useCallback } from "react";
import { Vector3 } from "three";

import useToiletsService from "../_data/hooks/useToiletsService";
import { ToiletModel, ToiletsChunkToilets } from "../toiletsTypes";
import createToiletsChunk from "../utilities/createToiletsChunk";

export default () => {
    const { toiletsChunks, update, getToiletById, add } = useToiletsService();

    const addToiletChunk = useCallback(() => {
        const toiletWidth = 4.5;
        const spacingWidth = 16;
        const newToiletChunk = createToiletsChunk();
        const lastToiletChunk = toiletsChunks[toiletsChunks.length - 1];
        const lastToiletPosition = lastToiletChunk
            ? lastToiletChunk.toilets[lastToiletChunk.toilets.length - 1].position
            : [0, 0, 0];

        newToiletChunk.toilets = newToiletChunk.toilets.map((x, index) => {
            return {
                ...x,
                position: [
                    toiletWidth +
                        lastToiletPosition[0] +
                        (spacingWidth - toiletWidth) +
                        index * spacingWidth,
                    0,
                    0,
                ],
            };
        }) as ToiletsChunkToilets;

        add(newToiletChunk);
    }, [add, toiletsChunks]);

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

    const setToiletPosition = useCallback(
        (toilet: ToiletModel, position: Vector3 | Vector3Array) => {
            update(toilet, {
                position,
            });
        },
        [update]
    );

    return { toiletsChunks, setIsVisible, setToiletPosition, addToiletChunk };
};
