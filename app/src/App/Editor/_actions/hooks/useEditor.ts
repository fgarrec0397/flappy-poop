import { useCallback } from "react";

import useEditorService from "../_data/hooks/useEditorService";

export default () => {
    const {
        isEditor,
        isEditing,
        hasEditorOpened,
        isMultipleSelect,
        currentMode,
        toggleEditor,
        setIsEditing,
        setHasEditorOpened,
        setCurrentMode,
    } = useEditorService();

    const setIsEditor = useCallback(() => toggleEditor(), [toggleEditor]);

    return { isEditor, setIsEditor };
};
