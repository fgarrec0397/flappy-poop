import { uidGenerator } from "@app/Common/utilities";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ToiletsChunkModel } from "../../toiletsTypes";

export interface ToiletsState {
    toiletsChunks: ToiletsChunkModel[];
}

const defaultChunkId = uidGenerator();

const initialState: ToiletsState = {
    toiletsChunks: [
        {
            id: defaultChunkId,
            canBeDeleted: false,
            toilets: [
                {
                    id: uidGenerator(),
                    toiletsChunkId: defaultChunkId,
                    positionY: 0,
                    isVisible: true,
                },
                {
                    id: uidGenerator(),
                    toiletsChunkId: defaultChunkId,
                    positionY: 1,
                    isVisible: true,
                },
                {
                    id: uidGenerator(),
                    toiletsChunkId: defaultChunkId,
                    positionY: 5,
                    isVisible: true,
                },
            ],
        },
    ],
};

export const toiletsSlice = createSlice({
    name: "toilets",
    initialState,
    reducers: {
        addToiletsChunk: (state, action: PayloadAction<ToiletsChunkModel[]>) => {
            state.toiletsChunks = action.payload;
        },
        removeToiletsChunk: (state, action: PayloadAction<ToiletsChunkModel[]>) => {
            state.toiletsChunks = action.payload;
        },
        updateToiletsChunk: (state, action: PayloadAction<ToiletsChunkModel[]>) => {
            state.toiletsChunks = action.payload;
        },
    },
});

export const { addToiletsChunk, removeToiletsChunk, updateToiletsChunk } = toiletsSlice.actions;

export default toiletsSlice.reducer;
