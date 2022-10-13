import {
    SaveSceneServiceParameter,
    SceneApiResponseResult,
    ScenesDictionaryItem,
} from "../scenesTypes";

export const saveScene = async ({
    id,
    name,
    data: { serializedWidgets, widgetsDictionary },
}: SaveSceneServiceParameter) => {
    const sceneDefinition: ScenesDictionaryItem = {
        id,
        name,
        data: {
            serializedWidgets,
            widgetsDictionary,
        },
    };

    const rawResponse = await fetch("api/scene", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sceneDefinition),
    });

    try {
        return await rawResponse.json();
    } catch (error) {
        return console.error(error, "error");
    }
};

type FetchSuccessCallBack = (data: SceneApiResponseResult) => void;

export const fetchScene = async (successCallBack: FetchSuccessCallBack) => {
    const response = await fetch("api/scene");

    try {
        const { sceneJsonString } = await response.json();

        const data = JSON.parse(sceneJsonString) as SceneApiResponseResult;

        successCallBack(data);
    } catch (error) {
        console.error(error, "error");
    }
};
