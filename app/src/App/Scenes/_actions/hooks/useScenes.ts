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

    // console.log(currentSceneId, "currentSceneId");
    const saveScene = useCallback(() => {
        // Update the current scene
        // When it's updated, save all scenes
        // TODO editor save button works but not the keyboard shortcut
        const serializedWidgets = serializeWidgets(widgets);
        updateSceneData(currentSceneId, {
            serializedWidgets,
            widgetsDictionary,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSceneId, widgets, widgetsDictionary]);

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
