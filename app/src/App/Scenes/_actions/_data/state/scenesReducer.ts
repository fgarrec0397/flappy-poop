import { uidGenerator } from "@app/Common/utilities";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SceneData, ScenesDictionary, ScenesDictionaryItem } from "../../scenesTypes";

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
                serializedWidgets: {},
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
        addScenesBatch: (state: ScenesState, actions: PayloadAction<ScenesDictionary>) => {
            const newScenes = actions.payload;

            state.scenes = {
                ...state.scenes,
                ...newScenes,
            };
        },
        resetScenes: (
            state: ScenesState,
            actions: PayloadAction<{ scenes: ScenesDictionary; currentSceneId: string }>
        ) => {
            const { scenes, currentSceneId } = actions.payload;

            state.currentSceneId = currentSceneId;

            state.scenes = {
                ...scenes,
            };
        },
        setCurrentSceneId: (state: ScenesState, actions: PayloadAction<string>) => {
            state.currentSceneId = actions.payload;
        },
        updateScenes: (state: ScenesState, actions: PayloadAction<ScenesDictionary>) => {
            state.scenes = actions.payload;
        },
        updateScene: (
            state: ScenesState,
            actions: PayloadAction<{ sceneId: string; sceneData: SceneData }>
        ) => {
            const { sceneId, sceneData } = actions.payload;

            state.scenes[sceneId].data = sceneData;
        },
    },
});

export const {
    addScene,
    addScenesBatch,
    resetScenes,
    setCurrentSceneId,
    updateScenes,
    updateScene,
} = scenesSlice.actions;

export default scenesSlice.reducer;
