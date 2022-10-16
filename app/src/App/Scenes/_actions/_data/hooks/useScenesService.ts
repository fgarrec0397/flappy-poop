import { useCallback } from "react";

import { SceneData, ScenesDictionary, ScenesDictionaryItem } from "../../scenesTypes";
import { postScenes } from "../services";
import useScenesDispatch from "./useScenesDispatch";
import useScenesSelector from "./useScenesSelector";

export default () => {
    const {
        dispatchAddScene,
        dispatchAddScenesBatch,
        dispatchResetScenes,
        dispatchSetCurrentSceneId,
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

    const updateSceneData = useCallback(
        (sceneId: string, sceneData: SceneData) => {
            dispatchUpdateScene(sceneId, sceneData);
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
        updateSceneData,
        updateCurrentSceneId,
    };
};
