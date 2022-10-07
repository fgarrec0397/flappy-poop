import { useCallback } from "react";

import useEditorService from "../_data/hooks/useEditorService";

export default () => {
    const { isEditor, updateIsEditor } = useEditorService();

    const openEditor = useCallback(() => {
        updateIsEditor(true);
    }, [updateIsEditor]);

    const closeEditor = useCallback(() => {
        updateIsEditor(false);
    }, [updateIsEditor]);

    return { isEditor, openEditor, closeEditor };
};
