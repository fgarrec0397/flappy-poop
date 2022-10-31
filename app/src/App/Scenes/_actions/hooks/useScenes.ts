import { usePrevious } from "@app/Common/hooks";
import { uidGenerator } from "@app/Common/utilities";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import useWidgetsModules from "@app/Widgets/_actions/hooks/useWidgetsModules";
import useWidgetsUtilities from "@app/Widgets/_actions/hooks/useWidgetsUtilities";
import serializeWidgets from "@app/Widgets/_actions/utilities/serializeWidgets";
import cloneDeep from "lodash/cloneDeep";
import { useCallback, useEffect, useState } from "react";

import useScenesService from "../_data/hooks/useScenesService";
import { ScenesDictionary, ScenesDictionaryItem } from "../scenesTypes";
import getFirstNonDefaultScene from "../utilities/getFirstNonDefaultScene";

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
        remove,
    } = useScenesService();
    const { unserializeWidgets } = useWidgetsUtilities();
    const { widgets, widgetsInfoDictionary, resetWidgets } = useWidgets();
    const { widgetsModules } = useWidgetsModules();
    const [lastSceneAdded, setLastSceneAdded] = useState<ScenesDictionaryItem>();
    const previousScenes = usePrevious(scenes);

    const getSceneById = useCallback(
        (sceneId: string | null) => {
            if (scenes && sceneId) {
                return scenes[sceneId];
            }

            return null;
        },
        [scenes]
    );

    const getSceneByName = useCallback(
        (sceneName: string | null) => {
            if (scenes && sceneName) {
                const sceneId = Object.keys(scenes).find((x) => scenes[x].name === sceneName);

                if (sceneId) {
                    return scenes[sceneId];
                }
            }

            return null;
        },
        [scenes]
    );

    const getSceneByNameOrId = useCallback(
        (sceneIdOrName: string | null) => {
            const scene = getSceneById(sceneIdOrName);

            if (!scene) {
                return getSceneByName(sceneIdOrName);
            }

            return scene;
        },
        [getSceneById, getSceneByName]
    );

    const getCurrentScene = useCallback(() => {
        return getSceneById(currentSceneId);
    }, [currentSceneId, getSceneById]);

    const updateCurrentScene = useCallback(() => {
        const serializedWidgets = serializeWidgets(widgets);
        const currentScene = getCurrentScene();

        if (currentScene) {
            const scene: ScenesDictionaryItem = {
                ...currentScene,
                data: {
                    serializedWidgets,
                    widgetsInfoDictionary,
                },
            };

            updateScene(scene);
        }
    }, [getCurrentScene, updateScene, widgets, widgetsInfoDictionary]);

    const loadScene = useCallback(
        (sceneNameOrId: string) => {
            const scene = getSceneByNameOrId(sceneNameOrId);

            if (scene) {
                const selectedSceneData = scene.data;
                const deserializedWidgets = unserializeWidgets(
                    selectedSceneData.serializedWidgets,
                    widgetsModules
                );

                updateCurrentScene();
                updateCurrentSceneId(sceneNameOrId);
                resetWidgets(deserializedWidgets, selectedSceneData.widgetsInfoDictionary, true);
            }
        },
        [
            getSceneByNameOrId,
            resetWidgets,
            unserializeWidgets,
            updateCurrentScene,
            updateCurrentSceneId,
            widgetsModules,
        ]
    );

    useEffect(() => {
        if (
            scenes &&
            previousScenes &&
            lastSceneAdded &&
            currentSceneId !== lastSceneAdded.id &&
            Object.keys(scenes).length > Object.keys(previousScenes).length
        ) {
            loadScene(lastSceneAdded.id);
        }
    }, [currentSceneId, lastSceneAdded, previousScenes, scenes, loadScene]);

    const getCurrentDefaultScene = useCallback(() => {
        return getSceneById(currentDefaultSceneId);
    }, [currentDefaultSceneId, getSceneById]);

    const removeCurrentDefaultScene = useCallback(() => {
        const currentScene = getCurrentScene();
        if (currentScene) {
            updateScene({
                ...currentScene,
                isDefault: false,
            });
        }
    }, [getCurrentScene, updateScene]);

    const changeDefaultScene = useCallback(
        (scene: ScenesDictionaryItem) => {
            updateScene({
                ...scene,
                isDefault: true,
            });
            removeCurrentDefaultScene();
            updateCurrentDefaultSceneId(scene.id);
        },
        [removeCurrentDefaultScene, updateCurrentDefaultSceneId, updateScene]
    );

    const addScene = useCallback(
        (name: string, isDefault: boolean) => {
            const scene: ScenesDictionaryItem = {
                id: uidGenerator(),
                name,
                isDefault,
                data: {
                    serializedWidgets: {},
                    widgetsInfoDictionary: {},
                },
            };

            if (isDefault) {
                changeDefaultScene(scene);
            }

            add(scene);
            setLastSceneAdded(scene);
        },
        [add, changeDefaultScene]
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

    const saveScene = useCallback(async () => {
        const serializedWidgets = serializeWidgets(widgets);

        const currentScene = getCurrentScene();
        const scenesClone = cloneDeep(scenes);

        if (currentScene && scenesClone) {
            const scene: ScenesDictionaryItem = {
                ...currentScene,
                data: {
                    serializedWidgets,
                    widgetsInfoDictionary,
                },
            };

            updateScene(scene);

            scenesClone[currentScene.id] = {
                ...scenesClone[currentScene.id],
                data: {
                    serializedWidgets,
                    widgetsInfoDictionary,
                },
            };

            await save(scenesClone);
        }
    }, [getCurrentScene, save, scenes, updateScene, widgets, widgetsInfoDictionary]);

    const removeScene = useCallback(
        (sceneId: string) => {
            const sceneToRemove = getSceneById(sceneId);

            if (scenes) {
                if (sceneToRemove && sceneToRemove.isDefault) {
                    const nonDefaultScene = getFirstNonDefaultScene(scenes);

                    loadScene(nonDefaultScene.id);
                    changeDefaultScene(nonDefaultScene);
                }
            }

            remove(sceneId);
        },
        [getSceneById, scenes, remove, loadScene, changeDefaultScene]
    );

    return {
        scenes,
        currentScene: getCurrentScene(),
        currentSceneId,

        // Actions
        addScene,
        addScenesBatch,
        changeDefaultScene,
        getSceneById,
        getCurrentScene,
        getCurrentDefaultScene,
        resetScenes,
        // initScenes,
        saveScene,
        loadScene,
        removeScene,
    };
};
