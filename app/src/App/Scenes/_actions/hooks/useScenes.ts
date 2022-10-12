import { uidGenerator } from "@app/Common/utilities";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
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
                    widgets: {},
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

    const saveScene = useCallback(() => {
        // Update the current scene
        // When it's updated, save all scenes
        updateSceneData(currentSceneId, {
            widgets,
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
