import { useCallback } from "react";

import { SceneData, ScenesDictionaryItem } from "../../scenesTypes";
import useScenesDispatch from "./useScenesDispatch";
import useScenesSelector from "./useScenesSelector";

export default () => {
    const { dispatchAddScene, dispatchSetCurrentSceneId, dispatchUpdateScene } =
        useScenesDispatch();
    const scenesData = useScenesSelector();

    const add = (scene: ScenesDictionaryItem) => {
        dispatchAddScene(scene);
    };

    const updateCurrentSceneId = (sceneId: string) => {
        dispatchSetCurrentSceneId(sceneId);
    };

    const updateSceneData = useCallback(
        (sceneId: string, sceneData: SceneData) => {
            // TODO -- continue here
            dispatchUpdateScene(sceneId, sceneData);
        },
        [dispatchUpdateScene]
    );

    return {
        ...scenesData,
        add,
        updateSceneData,
        updateCurrentSceneId,
    };
};
