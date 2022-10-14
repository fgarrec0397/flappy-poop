import { uidGenerator } from "@app/Common/utilities";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import serializeWidgets from "@app/Widgets/_actions/utilities/serializeWidgets";
import { useCallback } from "react";

import useScenesService from "../_data/hooks/useScenesService";
import { ScenesDictionaryItem } from "../scenesTypes";

export default () => {
    const { scenes, currentSceneId, add, updateCurrentSceneId, updateSceneData } =
        useScenesService();
    const { widgets, widgetsDictionary } = useWidgets();

    const addScene = useCallback(
        (name: string) => {
            const scene: ScenesDictionaryItem = {
                id: uidGenerator(),
                name,
                data: {
                    serializedWidgets: {},
                    widgetsDictionary: {},
                },
            };

            add(scene);
        },
        [add]
    );

    const selectScene = useCallback(
        (sceneId: string) => {
            updateCurrentSceneId(sceneId);
        },
        [updateCurrentSceneId]
    );

    console.log(scenes, "scenes");

    const saveScene = useCallback(() => {
        // Update the current scene
        // When it's updated, save all scenes
        // TODO - Remove keyboard provider and service
        const serializedWidgets = serializeWidgets(widgets);
        console.log("save");

        updateSceneData(currentSceneId, {
            serializedWidgets,
            widgetsDictionary,
        });
    }, [currentSceneId, updateSceneData, widgets, widgetsDictionary]);

    return {
        scenes,
        currentScene: scenes[currentSceneId],
        currentSceneId,

        // Actions
        addScene,
        saveScene,
        selectScene,
    };
};
