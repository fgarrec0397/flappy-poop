import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import useWidgetsModules from "@app/Widgets/_actions/hooks/useWidgetsModules";
import useWidgetsUtilities from "@app/Widgets/_actions/hooks/useWidgetsUtilities";
import { buildWidgetsDictionary } from "@app/Widgets/_actions/utilities/buildWidgetDictionaryItem";
import { useEffect } from "react";

import { fetchScene } from "../_data/services";
import { SceneApiResponseResult } from "../scenesTypes";

export default () => {
    const { loadWidgetModule } = useWidgetsModules();
    const { unserializeWidgets, mergeWidgetsDictionary } = useWidgetsUtilities();
    const { addWidgetsBatch } = useWidgets();

    useEffect(() => {
        const handleFetchScene = async () => {
            await fetchScene((data: SceneApiResponseResult) => {
                console.log(data, "data");

                // TODO -- follow this process when the scene changes
                const deserializedWidgets = unserializeWidgets(data.serializedWidgets);

                const widgetsDictionary = buildWidgetsDictionary(deserializedWidgets);
                const mergedWidgetDictionary = mergeWidgetsDictionary(
                    widgetsDictionary,
                    data.widgetsDictionary
                );

                addWidgetsBatch(mergedWidgetDictionary, deserializedWidgets);
            });
        };

        handleFetchScene();
    }, [addWidgetsBatch, loadWidgetModule, unserializeWidgets, mergeWidgetsDictionary]);
};
