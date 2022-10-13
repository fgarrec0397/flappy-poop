import { useDispatch } from "react-redux";

import { SceneData, ScenesDictionaryItem } from "../../scenesTypes";
import { addScene, setCurrentSceneId, updateScene } from "../state/scenesReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchAddScene = (scene: ScenesDictionaryItem) => {
        dispatch(addScene(scene));
    };

    const dispatchSetCurrentSceneId = (sceneId: string) => {
        dispatch(setCurrentSceneId(sceneId));
    };

    const dispatchUpdateScene = (sceneId: string, sceneData: SceneData) => {
        dispatch(updateScene({ sceneId, sceneData }));
    };

    return {
        dispatchAddScene,
        dispatchUpdateScene,
        dispatchSetCurrentSceneId,
    };
};
