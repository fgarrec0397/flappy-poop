import { useCallback } from "react";

import mapWidgetModuleToWidgetSceneObject from "../utilities/mapWidgetModuleToWidgetSceneObject";
import { SerializedWidgetObjects, WidgetObjects, WidgetsDictionary } from "../widgetsTypes";
import useWidgetsModules from "./useWidgetsModules";

export default () => {
    const { loadWidgetModule } = useWidgetsModules();

    const unserializeWidgets = useCallback(
        (serializedWidgets: SerializedWidgetObjects) => {
            const deserializedWidgets: WidgetObjects = {};

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

    const mergeWidgetDictionary = useCallback(
        (widgetsDictionary1: WidgetsDictionary, widgetsDictionary2: WidgetsDictionary) => {
            Object.keys(widgetsDictionary1).forEach((dictionaryItemKey) => {
                const dictionaryItem = widgetsDictionary1[dictionaryItemKey];

                for (const key in widgetsDictionary2[dictionaryItemKey].options) {
                    if (!Object.prototype.hasOwnProperty.call(dictionaryItem.options, key)) {
                        // Remove unexisting options on the local widget definitions options
                        delete widgetsDictionary2[dictionaryItemKey].options[key];
                    }
                }

                // Make sure to keep the options left from the saved widget dictionary
                widgetsDictionary1[dictionaryItemKey].options =
                    widgetsDictionary2[dictionaryItemKey].options;

                // Make sure to keep the properties left from the saved widget dictionary
                widgetsDictionary1[dictionaryItemKey].properties =
                    widgetsDictionary2[dictionaryItemKey].properties;
            });

            return widgetsDictionary1;
        },
        []
    );

    return { unserializeWidgets, mergeWidgetDictionary };
};
