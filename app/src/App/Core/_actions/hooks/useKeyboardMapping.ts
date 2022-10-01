import keyboardMappings from "@app/Core/configs/keyboardMappings";
import { defaultKeyMappingObj } from "@app/Core/coreConstants";
import {
    ClientKeyMappings,
    KeyboardMappingHandler,
    KeyboardMappings,
    KeyboardType,
} from "@app/Core/coreTypes";
import { DependencyList, useCallback, useEffect, useMemo } from "react";

import useKeyboardService from "../_data/hooks/useKeyboardService";

const triggerAllMappedKey = (
    keyMapped: KeyboardMappings,
    event: KeyboardEvent,
    keyboardType: KeyboardType
) => {
    const clientKeyMapped: ClientKeyMappings = {};

    for (const key in keyMapped[keyboardType]) {
        keyMapped[keyboardType][key] = {
            ...keyMapped[keyboardType][key],
            value: keyMapped[keyboardType][key].trigger(event),
        };

        clientKeyMapped[key] = keyMapped[keyboardType][key].value;
    }

    return clientKeyMapped;
};

export default (
    handler: KeyboardMappingHandler,
    dependencies: DependencyList,
    keyboardType: KeyboardType
) => {
    const handlerCallback = useCallback(handler, [handler, ...dependencies]);
    const { keyMapping, triggerKey } = useKeyboardService();

    useEffect(() => {
        console.log(keyMapping, "keyMapping");
    }, [keyMapping]);

    const keysMapping = useMemo((): KeyboardMappings => {
        const newMapping = defaultKeyMappingObj;

        keyboardMappings[keyboardType].forEach((x) => {
            newMapping[keyboardType][x.name] = {
                trigger: (event: KeyboardEvent) => {
                    const hasCtrlKey = x.ctrlKey ? event.ctrlKey : !event.ctrlKey;
                    const hasShifKey = x.shiftKey ? event.shiftKey : !event.shiftKey;

                    return hasCtrlKey && hasShifKey && event.code === x.code;
                },
                value: false,
            };
        });

        return newMapping;
    }, [keyboardType]);

    useEffect(() => {
        const onKeyUpHandler = (event: KeyboardEvent) => {
            handlerCallback(triggerAllMappedKey(keysMapping, event, keyboardType));
            triggerKey(triggerAllMappedKey(keysMapping, event, keyboardType));
        };

        window.addEventListener("keyup", onKeyUpHandler);

        return () => {
            window.removeEventListener("keyup", onKeyUpHandler);
        };
    }, [handlerCallback, keysMapping, keyboardType, triggerKey]);
};
