import { useDispatch } from "react-redux";

import { SceneData, ScenesDictionary, ScenesDictionaryItem } from "../../scenesTypes";
import {
    addScene,
    addScenesBatch,
    resetScenes,
    setCurrentSceneId,
    updateScene,
} from "../state/scenesReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchAddScene = (scene: ScenesDictionaryItem) => {
        dispatch(addScene(scene));
    };

    const dispatchAddScenesBatch = (scenes: ScenesDictionary) => {
        dispatch(addScenesBatch(scenes));
    };

    const dispatchResetScenes = (scenes: ScenesDictionary, newCurrentSceneId: string) => {
        dispatch(resetScenes({ scenes, currentSceneId: newCurrentSceneId }));
    };

    const dispatchSetCurrentSceneId = (sceneId: string) => {
        dispatch(setCurrentSceneId(sceneId));
    };

    const dispatchUpdateScene = (sceneId: string, sceneData: SceneData) => {
        dispatch(updateScene({ sceneId, sceneData }));
    };

    return {
        dispatchAddScene,
        dispatchAddScenesBatch,
        dispatchResetScenes,
        dispatchUpdateScene,
        dispatchSetCurrentSceneId,
    };
};
