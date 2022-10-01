import { ClientKeyMappings } from "@app/Core/coreTypes";
import { useCallback } from "react";

import useKeyboardContext from "./useKeyboardContext";

export default () => {
    const { setKeyMapping, keyMapping } = useKeyboardContext();

    const triggerKey = useCallback(
        (clientKeyMapping: ClientKeyMappings) => {
            setKeyMapping(clientKeyMapping);
        },
        [setKeyMapping]
    );

    return {
        keyMapping,
        triggerKey,
    };
};
