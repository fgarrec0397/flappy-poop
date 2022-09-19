import { uidGenerator } from "@app/Common/utilities";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ToiletsChunkModel } from "../../toiletsTypes";

export interface ToiletsState {
    toilets: ToiletsChunkModel[];
}

const initialState: ToiletsState = {
    toilets: [
        {
            id: uidGenerator(),
            canBeDeleted: false,
            toiletsChunk: [
                {
                    positionY: 0,
                    isVisible: true,
                },
                {
                    positionY: 1,
                    isVisible: true,
                },
                {
                    positionY: 5,
                    isVisible: false,
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
            state.toilets = action.payload;
        },
        removeToiletsChunk: (state, action: PayloadAction<ToiletsChunkModel[]>) => {
            state.toilets = action.payload;
        },
    },
});

export const { addToiletsChunk, removeToiletsChunk } = toiletsSlice.actions;

export default toiletsSlice.reducer;
