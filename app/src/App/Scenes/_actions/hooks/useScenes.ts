import { uidGenerator } from "@app/Common/utilities";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import useWidgetsUtilities from "@app/Widgets/_actions/hooks/useWidgetsUtilities";
import { buildWidgetsDictionary } from "@app/Widgets/_actions/utilities/buildWidgetDictionaryItem";
import serializeWidgets from "@app/Widgets/_actions/utilities/serializeWidgets";
import cloneDeep from "lodash/cloneDeep";
import { useCallback } from "react";

import useScenesService from "../_data/hooks/useScenesService";
import { SceneApiResponseResult, ScenesDictionary, ScenesDictionaryItem } from "../scenesTypes";
import getDefaultScene from "../utilities/getDefaultScene";

export default () => {
    const {
        scenes,
        currentSceneId,
        currentDefaultSceneId,
        save,
        add,
        addBatch,
        reset,
        updateCurrentSceneId,
        updateCurrentDefaultSceneId,
        updateScene,
    } = useScenesService();
    const { unserializeWidgets, mergeWidgetsDictionary } = useWidgetsUtilities();
    const { widgets, widgetsDictionary, resetWidgets } = useWidgets();
    const currentScene = scenes[currentSceneId];
    const currentDefaultScene = scenes[currentDefaultSceneId];

    const setDefaultScene = useCallback(
        (scene: ScenesDictionaryItem, isDefault: boolean) => {
            updateScene({
                ...scene,
                isDefault,
            });
        },
        [updateScene]
    );

    const removeCurrentDefaultScene = useCallback(() => {
        setDefaultScene(currentDefaultScene, false);
    }, [currentDefaultScene, setDefaultScene]);

    const changeDefaultScene = useCallback(
        (newDefaultSceneId: string) => {
            removeCurrentDefaultScene();
            updateCurrentDefaultSceneId(newDefaultSceneId);
        },
        [removeCurrentDefaultScene, updateCurrentDefaultSceneId]
    );

    const addScene = useCallback(
        (name: string, isDefault: boolean) => {
            const scene: ScenesDictionaryItem = {
                id: uidGenerator(),
                name,
                isDefault,
                data: {
                    serializedWidgets: {},
                    widgetsDictionary: {},
                },
            };

            if (isDefault) {
                changeDefaultScene(scene.id);
            }

            add(scene);
        },
        [add, changeDefaultScene]
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
            const newCurrentSceneId = getDefaultScene(result);
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
        const serializedWidgets = serializeWidgets(widgets);

        const scene: ScenesDictionaryItem = {
            ...currentScene,
            data: {
                serializedWidgets,
                widgetsDictionary,
            },
        };

        updateScene(scene);

        const scenesClone = cloneDeep(scenes);

        scenesClone[currentScene.id] = {
            ...scenesClone[currentScene.id],
            data: {
                serializedWidgets,
                widgetsDictionary,
            },
        };

        await save(scenesClone);
    }, [currentScene, save, scenes, updateScene, widgets, widgetsDictionary]);

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
