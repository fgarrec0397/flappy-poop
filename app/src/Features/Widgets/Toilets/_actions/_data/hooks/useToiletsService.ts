import clone from "lodash/clone";
import { useCallback } from "react";

import { ToiletModel, ToiletsChunkModel, ToiletsChunkToilets } from "../../toiletsTypes";
import useToiletsDispatch from "./useToiletsDispatch";
import useToiletsSelector from "./useToiletsSelector";

type ValuesType<T> = {
    [K in keyof T]: T[K];
};

export default () => {
    const { toiletsChunks } = useToiletsSelector();
    const { dispatchUpdate, dispatchAdd } = useToiletsDispatch();

    const getToiletChunkByID = useCallback(
        (id: string) => {
            return toiletsChunks.find((x) => x.id === id);
        },
        [toiletsChunks]
    );

    const getToiletById = useCallback(
        (toiletId: string, toiletsChunkId: string) => {
            return getToiletChunkByID(toiletsChunkId)?.toilets.find((x) => x.id === toiletId);
        },
        [getToiletChunkByID]
    );

    const add = useCallback(
        (toiletsChunk: ToiletsChunkModel) => {
            const newToiletsChunks = [...toiletsChunks, toiletsChunk];
            dispatchAdd(newToiletsChunks);
        },
        [dispatchAdd, toiletsChunks]
    );

    const remove = useCallback(() => {}, []);

    const update = useCallback(
        <T>(toilet: ToiletModel, values: ValuesType<T>) => {
            const newToilet = clone(toilet);
            const newToiletChunk = clone(getToiletChunkByID(newToilet.toiletsChunkId));

            Object.keys(values).forEach((x) => {
                (newToilet as any)[x] = values[x as keyof ValuesType<T>];
            });

            if (newToiletChunk) {
                newToiletChunk.toilets = newToiletChunk?.toilets.map((x) => {
                    if (x.id === newToilet.id) {
                        return newToilet;
                    }

                    return x;
                }) as ToiletsChunkToilets;

                const newToiletsChunks = toiletsChunks.map((x) => {
                    if (x.id === newToiletChunk.id) {
                        return newToiletChunk;
                    }

                    return x;
                });

                dispatchUpdate(newToiletsChunks);
            }
        },
        [dispatchUpdate, getToiletChunkByID, toiletsChunks]
    );

    return {
        toiletsChunks,
        add,
        remove,
        update,
        getToiletChunkByID,
        getToiletById,
    };
};
