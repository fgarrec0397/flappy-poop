import { uidGenerator } from "@app/Common/utilities";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ScenesDictionary } from "../../scenesTypes";

export interface ScenesState {
    scenes: ScenesDictionary;
    currentSceneId: string;
}

const defaultSceneId = uidGenerator();

const initialState: ScenesState = {
    scenes: {
        [defaultSceneId]: {
            id: defaultSceneId,
            name: "default scene",
            data: {},
        },
    },
    currentSceneId: defaultSceneId,
};

export const scenesSlice = createSlice({
    name: "scenes",
    initialState,
    reducers: {
        setCurrentSceneId: (state: ScenesState, actions: PayloadAction<string>) => {
            state.currentSceneId = actions.payload;
        },
    },
});

export const { setCurrentSceneId } = scenesSlice.actions;

export default scenesSlice.reducer;
