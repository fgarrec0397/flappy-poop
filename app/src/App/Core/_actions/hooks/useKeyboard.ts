import { KeyboardMappingHandler, KeyboardType } from "@app/Core/coreTypes";
import { DependencyList, useCallback, useEffect } from "react";

import useKeyboardService from "../_data/hooks/useKeyboardService";

export default (
    handler: KeyboardMappingHandler,
    dependencies: DependencyList,
    keyboardType: KeyboardType
) => {
    const handlerCallback = useCallback(handler, [handler, ...dependencies]);
    const { keyMapping } = useKeyboardService();

    useEffect(() => {
        handlerCallback(keyMapping);
    }, [handlerCallback, keyMapping]);
};
