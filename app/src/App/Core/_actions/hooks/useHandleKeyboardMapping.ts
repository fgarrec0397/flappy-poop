import keyboardMappings from "@app/Core/configs/keyboardMappings";
import { defaultKeyMappingObj } from "@app/Core/coreConstants";
import { ClientKeyMappings, KeyboardMappings, KeyboardType } from "@app/Core/coreTypes";
import { useIsEditor } from "@app/Editor/_actions/hooks";
import { useEffect, useMemo, useState } from "react";

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

export default () => {
    const [keyboardType, setKeyboardType] = useState<KeyboardType>("editor");
    const { triggerKey } = useKeyboardService();
    const { isEditor } = useIsEditor();

    useEffect(() => {
        if (isEditor) {
            setKeyboardType("editor");
        } else {
            setKeyboardType("game");
        }
    }, [isEditor]);

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
            triggerKey(triggerAllMappedKey(keysMapping, event, keyboardType));
        };

        window.addEventListener("keyup", onKeyUpHandler);

        return () => {
            window.removeEventListener("keyup", onKeyUpHandler);
        };
    });
};
