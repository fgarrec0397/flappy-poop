import useScenesDispatch from "./useScenesDispatch";
import useScenesSelector from "./useScenesSelector";

export default () => {
    const { dispatchSetCurrentSceneId } = useScenesDispatch();
    const scenesData = useScenesSelector();

    const updateCurrentSceneId = (sceneId: string) => {
        dispatchSetCurrentSceneId(sceneId);
    };

    return {
        ...scenesData,
        updateCurrentSceneId,
    };
};
