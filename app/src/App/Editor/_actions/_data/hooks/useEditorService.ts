import { useCallback } from "react";

import { ModesAvailable } from "../../editorTypes";
import useEditorDispatch from "./useEditorDispatch";
import useEditorSelector from "./useEditorSelector";

export default () => {
    const {
        dispatchSetIsEditor,
        dispatchSetIsEditing,
        dispatchSetHasEditorOpened,
        dispatchSetCurrentMode,
    } = useEditorDispatch();
    const { isEditor, isEditing, hasEditorOpened, isMultipleSelect, currentMode } =
        useEditorSelector();

    const toggleEditor = useCallback(() => {
        dispatchSetIsEditor();
    }, [dispatchSetIsEditor]);

    const setIsEditing = useCallback(
        (value: boolean) => {
            dispatchSetIsEditing(value);
        },
        [dispatchSetIsEditing]
    );

    const setHasEditorOpened = useCallback(() => {
        dispatchSetHasEditorOpened();
    }, [dispatchSetHasEditorOpened]);

    const setCurrentMode = useCallback(
        (mode: ModesAvailable) => {
            dispatchSetCurrentMode(mode);
        },
        [dispatchSetCurrentMode]
    );

    return {
        isEditor,
        isEditing,
        hasEditorOpened,
        isMultipleSelect,
        currentMode,
        toggleEditor,
        setIsEditing,
        setHasEditorOpened,
        setCurrentMode,
    };
};
