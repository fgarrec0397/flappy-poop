import { createSlice } from "@reduxjs/toolkit";

export interface PoopState {
    score: number;
}

const initialState: PoopState = {
    score: 0,
};

export const poopSlice = createSlice({
    name: "poop",
    initialState,
    reducers: {
        addPoint: (state) => {
            state.score++;
        },
    },
});

export const { addPoint } = poopSlice.actions;

export default poopSlice.reducer;
