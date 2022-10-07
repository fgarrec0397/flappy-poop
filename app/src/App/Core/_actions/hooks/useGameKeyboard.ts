import { KeyboardMappingHandler } from "@app/Core/coreTypes";
import { useIsEditor } from "@app/Editor/_actions/hooks";
import { DependencyList, useCallback, useEffect } from "react";

import useKeyboardService from "../_data/hooks/useKeyboardService";

export default (handler: KeyboardMappingHandler, dependencies: DependencyList) => {
    const handlerCallback = useCallback(handler, [handler, ...dependencies]);
    const { keyMapping } = useKeyboardService();
    const { isEditor } = useIsEditor();

    useEffect(() => {
        if (!isEditor) {
            // console.log(keyMapping, "keyMapping from useGameKeyboard");

            handlerCallback(keyMapping);
        }
    }, [handlerCallback, isEditor, keyMapping]);
};
