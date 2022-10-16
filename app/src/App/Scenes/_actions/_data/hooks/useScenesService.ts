import { useCallback } from "react";

import { ScenesDictionary, ScenesDictionaryItem } from "../../scenesTypes";
import { postScenes } from "../scenesApiservices";
import useScenesDispatch from "./useScenesDispatch";
import useScenesSelector from "./useScenesSelector";

export default () => {
    const {
        dispatchAddScene,
        dispatchAddScenesBatch,
        dispatchResetScenes,
        dispatchSetCurrentSceneId,
        dispatchSetCurrentDefaultSceneId,
        dispatchUpdateScene,
    } = useScenesDispatch();
    const scenesData = useScenesSelector();

    const add = (scene: ScenesDictionaryItem) => {
        dispatchAddScene(scene);
    };

    const addBatch = (scenes: ScenesDictionary) => {
        dispatchAddScenesBatch(scenes);
    };

    const reset = useCallback(
        (scenes: ScenesDictionary, newCurrentSceneId: string) => {
            dispatchResetScenes(scenes, newCurrentSceneId);
        },
        [dispatchResetScenes]
    );

    const updateCurrentSceneId = (sceneId: string) => {
        dispatchSetCurrentSceneId(sceneId);
    };

    const updateCurrentDefaultSceneId = (sceneId: string) => {
        dispatchSetCurrentDefaultSceneId(sceneId);
    };

    const updateScene = useCallback(
        (scene: ScenesDictionaryItem) => {
            dispatchUpdateScene(scene);
        },
        [dispatchUpdateScene]
    );

    const save = useCallback(async (scenes: ScenesDictionary) => {
        await postScenes(scenes);
    }, []);

    return {
        ...scenesData,
        add,
        addBatch,
        reset,
        save,
        updateScene,
        updateCurrentDefaultSceneId,
        updateCurrentSceneId,
    };
};
