import { usePrevious } from "@app/Common/hooks";
import keyboardMappings from "@app/Core/configs/keyboardMappings";
import { defaultKeyMappingObj } from "@app/Core/coreConstants";
import { ClientKeyMappings, KeyboardMappings, KeyboardType } from "@app/Core/coreTypes";
import useEditor from "@app/Editor/_actions/hooks/useEditor";
import isEqual from "lodash/isEqual";
import { useEffect, useMemo, useState } from "react";

import useKeyboardService from "../_data/hooks/useKeyboardService";

const triggerAllMappedKey = (
    keyMapped: KeyboardMappings,
    keyboardType: KeyboardType,
    event?: KeyboardEvent
) => {
    const clientKeyMapped: ClientKeyMappings = {};

    for (const key in keyMapped[keyboardType]) {
        keyMapped[keyboardType][key] = {
            ...keyMapped[keyboardType][key],
            value: event ? keyMapped[keyboardType][key].trigger(event) : false,
        };

        clientKeyMapped[key] = keyMapped[keyboardType][key].value;
    }

    return clientKeyMapped;
};

export default () => {
    const [keyboardType, setKeyboardType] = useState<KeyboardType>("editor");
    const { update, keyMapping } = useKeyboardService();
    const previousKeyMapping = usePrevious(keyMapping);
    const { isEditor } = useEditor();

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

    /**
     * Listen on the Key Up event and update the keyMapping with the good value
     */
    useEffect(() => {
        const onKeyUpHandler = (event: KeyboardEvent) => {
            update(triggerAllMappedKey(keysMapping, keyboardType, event));
        };

        window.addEventListener("keyup", onKeyUpHandler);

        return () => {
            window.removeEventListener("keyup", onKeyUpHandler);
        };
    }, [keyboardType, keysMapping, update]); // TODO -- Validate if this helps

    /**
     * When the keyMapping change, reset it all false by avoiding to send an event object to triggerAllMappedKey
     */
    useEffect(() => {
        if (!isEqual(keyMapping, previousKeyMapping)) {
            update(triggerAllMappedKey(keysMapping, keyboardType));
        }
    }, [keyMapping, keyboardType, keysMapping, previousKeyMapping, update]);
};
