import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ToiletsChunkModel } from "../../toiletsTypes";

export interface ToiletsState {
    toiletsChunks: ToiletsChunkModel[];
}

const initialState: ToiletsState = {
    toiletsChunks: [],
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
