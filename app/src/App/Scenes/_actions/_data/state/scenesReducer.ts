import { uidGenerator } from "@app/Common/utilities";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ScenesDictionary, ScenesDictionaryItem } from "../../scenesTypes";

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
            data: {
                widgets: {},
                widgetsDictionary: {},
            },
        },
    },
    currentSceneId: defaultSceneId,
};

export const scenesSlice = createSlice({
    name: "scenes",
    initialState,
    reducers: {
        addScene: (state: ScenesState, actions: PayloadAction<ScenesDictionaryItem>) => {
            const newScene = actions.payload;

            state.scenes = {
                ...state.scenes,
                [newScene.id]: newScene,
            };
        },
        setCurrentSceneId: (state: ScenesState, actions: PayloadAction<string>) => {
            state.currentSceneId = actions.payload;
        },
    },
});

export const { addScene, setCurrentSceneId } = scenesSlice.actions;

export default scenesSlice.reducer;
