import { uidGenerator } from "@app/Common/utilities";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import useWidgetsUtilities from "@app/Widgets/_actions/hooks/useWidgetsUtilities";
import { buildWidgetsDictionary } from "@app/Widgets/_actions/utilities/buildWidgetDictionaryItem";
import serializeWidgets from "@app/Widgets/_actions/utilities/serializeWidgets";
import cloneDeep from "lodash/cloneDeep";
import { useCallback } from "react";

import useScenesService from "../_data/hooks/useScenesService";
import { SceneApiResponseResult, ScenesDictionary, ScenesDictionaryItem } from "../scenesTypes";

export default () => {
    const {
        scenes,
        currentSceneId,
        save,
        add,
        addBatch,
        reset,
        updateCurrentSceneId,
        updateSceneData,
    } = useScenesService();
    const { unserializeWidgets, mergeWidgetsDictionary } = useWidgetsUtilities();
    const { widgets, widgetsDictionary, addWidgetsBatch, resetWidgets } = useWidgets();
    const currentScene = scenes[currentSceneId];

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
            const selectedSceneData = scenes[sceneId].data;
            const deserializedWidgets = unserializeWidgets(selectedSceneData.serializedWidgets);

            resetWidgets(deserializedWidgets, selectedSceneData.widgetsDictionary);
        },
        [updateCurrentSceneId, scenes, unserializeWidgets, resetWidgets]
    );

    const addScenesBatch = useCallback(
        (scenesDictionary: ScenesDictionary) => {
            addBatch(scenesDictionary);
        },
        [addBatch]
    );

    const resetScenes = useCallback(
        (scenesDictionary: ScenesDictionary, newCurrentSceneId: string) => {
            reset(scenesDictionary, newCurrentSceneId);
        },
        [reset]
    );

    const initScenes = useCallback(
        (result: SceneApiResponseResult) => {
            const newCurrentSceneId = Object.keys(result)[0]; // TODO - This is temporary, we'll find a cleaner way to set a default current scene
            const newCurrentScene = (result as ScenesDictionary)[newCurrentSceneId];

            const deserializedWidgets = unserializeWidgets(newCurrentScene.data.serializedWidgets);

            const newWidgetsDictionary = buildWidgetsDictionary(deserializedWidgets);
            const mergedWidgetDictionary = mergeWidgetsDictionary(
                newWidgetsDictionary,
                newCurrentScene.data.widgetsDictionary
            );

            resetWidgets(deserializedWidgets, mergedWidgetDictionary);
            resetScenes(result, newCurrentSceneId);
        },
        [resetWidgets, mergeWidgetsDictionary, resetScenes, unserializeWidgets]
    );

    const saveScene = useCallback(async () => {
        // Update the current scene
        // When it's updated, save all scenes
        const serializedWidgets = serializeWidgets(widgets);

        updateSceneData(currentSceneId, {
            serializedWidgets,
            widgetsDictionary,
        });

        const scenesClone = cloneDeep(scenes);

        scenesClone[currentSceneId] = {
            ...scenesClone[currentSceneId],
            data: {
                serializedWidgets,
                widgetsDictionary,
            },
        };

        await save(scenesClone);
    }, [currentSceneId, save, scenes, updateSceneData, widgets, widgetsDictionary]);

    return {
        scenes,
        currentScene,
        currentSceneId,

        // Actions
        addScene,
        addScenesBatch,
        resetScenes,
        initScenes,
        saveScene,
        selectScene,
    };
};
