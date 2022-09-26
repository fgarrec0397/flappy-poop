import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PoopState {
    test: string;
}

const initialState: PoopState = {
    test: "",
};

export const toiletsSlice = createSlice({
    name: "toilets",
    initialState,
    reducers: {
        addPoop: (state) => {
            state.test = "";
        },
    },
});

export const { addPoop } = toiletsSlice.actions;

export default toiletsSlice.reducer;
