import { KeyboardMappingHandler } from "@app/Core/coreTypes";
import useEditor from "@app/Editor/_actions/hooks/useEditor";
import { DependencyList, useCallback, useEffect } from "react";

import useKeyboardService from "../_data/hooks/useKeyboardService";

export default (handler: KeyboardMappingHandler, dependencies: DependencyList) => {
    const handlerCallback = useCallback(handler, [handler, ...dependencies]);
    const { keyMapping } = useKeyboardService();
    const { isEditor } = useEditor();

    useEffect(() => {
        if (!isEditor) {
            handlerCallback(keyMapping);
        }
    }, [handlerCallback, isEditor, keyMapping]);
};
