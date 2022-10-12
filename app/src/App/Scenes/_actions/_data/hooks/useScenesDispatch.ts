import { useDispatch } from "react-redux";

import { ScenesDictionaryItem } from "../../scenesTypes";
import { addScene, setCurrentSceneId } from "../state/scenesReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchAddScene = (scene: ScenesDictionaryItem) => {
        dispatch(addScene(scene));
    };

    const dispatchSetCurrentSceneId = (sceneId: string) => {
        dispatch(setCurrentSceneId(sceneId));
    };

    return {
        dispatchAddScene,
        dispatchSetCurrentSceneId,
    };
};
