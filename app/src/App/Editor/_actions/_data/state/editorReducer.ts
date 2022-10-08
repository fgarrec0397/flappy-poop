import { ModesAvailable } from "@app/Editor/_actions/editorTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EditorState {
    isEditor: boolean;
    hasEditorOpened: boolean;
    hasEdited: boolean;
    isEditing: boolean;
    isMultipleSelect: boolean;
    currentMode: ModesAvailable;
}

const initialState: EditorState = {
    isEditor: true,
    hasEditorOpened: false,
    hasEdited: false,
    isEditing: false,
    isMultipleSelect: false,
    currentMode: ModesAvailable.Translate,
};

export const sceneSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setIsEditor: (state: EditorState, actions: PayloadAction<boolean>) => {
            state.isEditor = actions.payload;
        },
        setIsEditing: (state: EditorState, action: PayloadAction<boolean>) => {
            state.isEditing = action.payload;
        },
        setHasEditorOpened: (state: EditorState) => {
            state.isEditing = !state.isEditor;
        },
        setHasEdited: (state: EditorState, actions: PayloadAction<boolean>) => {
            state.hasEdited = actions.payload;
        },
        setIsMultipleSelect: (state: EditorState, action: PayloadAction<boolean>) => {
            state.isMultipleSelect = action.payload;
        },
        setCurrentMode: (state: EditorState, action: PayloadAction<ModesAvailable>) => {
            state.currentMode = action.payload;
        },
    },
});

export const {
    setIsEditor,
    setIsEditing,
    setHasEditorOpened,
    setHasEdited,
    setIsMultipleSelect,
    setCurrentMode,
} = sceneSlice.actions;

export default sceneSlice.reducer;
