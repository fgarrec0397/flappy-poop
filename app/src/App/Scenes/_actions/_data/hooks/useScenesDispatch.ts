import { useDispatch } from "react-redux";

import { setCurrentSceneId } from "../state/scenesReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchSetCurrentSceneId = (sceneId: string) => {
        dispatch(setCurrentSceneId(sceneId));
    };

    return {
        dispatchSetCurrentSceneId,
    };
};
