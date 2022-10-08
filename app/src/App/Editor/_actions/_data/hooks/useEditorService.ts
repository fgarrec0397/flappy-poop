import { useCallback } from "react";

import { ModesAvailable } from "../../editorTypes";
import useEditorDispatch from "./useEditorDispatch";
import useEditorSelector from "./useEditorSelector";

export default () => {
    const {
        dispatchSetIsEditor,
        dispatchSetIsEditing,
        dispatchSetHasEditorOpened,
        dispatchSetHasEdited,
        dispatchSetIsMultipleSelect,
        dispatchSetCurrentMode,
    } = useEditorDispatch();
    const { isEditor, hasEdited, hasEditorOpened, isEditing, currentMode } = useEditorSelector();

    const updateIsEditor = (value: boolean) => {
        dispatchSetIsEditor(value);
    };

    const updateIsEditing = (value: boolean) => {
        dispatchSetIsEditing(value);
    };

    const updateHasEditorOpened = () => {
        dispatchSetHasEditorOpened();
    };

    const updateHasEdited = useCallback(
        (value: boolean) => {
            dispatchSetHasEdited(value);
        },
        [dispatchSetHasEdited]
    );

    const updateIsMultipleSelect = (value: boolean) => {
        dispatchSetIsMultipleSelect(value);
    };

    const updateCurrentMode = (value: ModesAvailable) => {
        dispatchSetCurrentMode(value);
    };

    return {
        isEditor,
        hasEdited,
        hasEditorOpened,
        isEditing,
        currentMode,
        updateIsEditor,
        updateIsEditing,
        updateHasEditorOpened,
        updateHasEdited,
        updateIsMultipleSelect,
        updateCurrentMode,
    };
};
