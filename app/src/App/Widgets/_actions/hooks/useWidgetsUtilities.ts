import { useCallback } from "react";

import mapWidgetModuleToWidgetSceneObject from "../utilities/mapWidgetModuleToWidgetSceneObject";
import {
    SerializedWidgetObjects,
    WidgetObjectsDictionary,
    WidgetsInfoDictionary,
} from "../widgetsTypes";
import useWidgetsModules from "./useWidgetsModules";

export default () => {
    const { loadWidgetModule } = useWidgetsModules();

    const unserializeWidgets = useCallback(
        (serializedWidgets: SerializedWidgetObjects) => {
            const deserializedWidgets: WidgetObjectsDictionary = {};

            // loop through all serialized widgets from the DB
            for (const key in serializedWidgets) {
                const serializedWidget = serializedWidgets[key];

                // Load the corresponding widget module
                const widgetModule = loadWidgetModule(serializedWidget);

                if (widgetModule) {
                    const widget = mapWidgetModuleToWidgetSceneObject(widgetModule);

                    deserializedWidgets[serializedWidget.id] = {
                        ...widget,
                        id: serializedWidget.id,
                    };
                }
            }

            return deserializedWidgets;
        },
        [loadWidgetModule]
    );

    const mergeWidgetsDictionary = useCallback(
        (
            widgetsInfoDictionary1: WidgetsInfoDictionary,
            widgetsInfoDictionary2: WidgetsInfoDictionary
        ) => {
            Object.keys(widgetsInfoDictionary1).forEach((dictionaryItemKey) => {
                const dictionaryItem = widgetsInfoDictionary1[dictionaryItemKey];

                for (const key in widgetsInfoDictionary2[dictionaryItemKey].options) {
                    if (!Object.prototype.hasOwnProperty.call(dictionaryItem.options, key)) {
                        // Remove unexisting options on the local widget definitions options
                        delete widgetsInfoDictionary2[dictionaryItemKey].options?.[key];
                    }
                }

                // Make sure to keep the options left from the saved widget dictionary
                widgetsInfoDictionary1[dictionaryItemKey].options =
                    widgetsInfoDictionary2[dictionaryItemKey].options;

                // Make sure to keep the properties left from the saved widget dictionary
                widgetsInfoDictionary1[dictionaryItemKey].properties =
                    widgetsInfoDictionary2[dictionaryItemKey].properties;
            });

            return widgetsInfoDictionary1;
        },
        []
    );

    return { unserializeWidgets, mergeWidgetsDictionary };
};
