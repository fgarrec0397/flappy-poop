import { ClientKeyMappings } from "@app/Core/coreTypes";
import clone from "lodash/clone";
import { useCallback } from "react";

import useKeyboardContext from "./useKeyboardContext";

export default () => {
    const { setKeyMapping, keyMapping } = useKeyboardContext();

    const update = useCallback(
        (clientKeyMapping: ClientKeyMappings) => {
            console.log(clientKeyMapping, "update");

            setKeyMapping(clientKeyMapping);
        },
        [setKeyMapping]
    );

    // const updateAllValuesTo = useCallback(
    //     (value: boolean) => {
    //         const newKeyMapping = clone(keyMapping);

    //         for
    //     },
    //     [keyMapping]
    // );

    return {
        keyMapping,
        update,
    };
};
