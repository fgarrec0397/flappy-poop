import { Dictionary } from "@app/Common/commonTypes";
import { SerializedWidgetObjects, WidgetsDictionary } from "@app/Widgets/_actions/widgetsTypes";
import { Camera } from "@react-three/fiber";
import { MutableRefObject } from "react";

// --------------- Cameras types --------------- //

export type SceneCameraRef = MutableRefObject<
    | (Camera & {
          manual?: boolean | undefined;
      })
    | undefined
>;

export type SceneCamera = {
    id: string;
    name: string;
    cameraRef: SceneCameraRef;
};

// --------------- Scenes types --------------- //

/**
 * A dictionary containing informations about scenes
 */
export type ScenesDictionary = Dictionary<ScenesDictionaryItem>;

/**
 * A single scene information
 */
export type ScenesDictionaryItem = {
    id: string;
    name: string;
    isDefault: boolean;
    data: SceneData;
};

/**
 * All data of a scene object
 */
export type SceneData = {
    serializedWidgets: SerializedWidgetObjects;
    widgetsDictionary: WidgetsDictionary;
};

/**
 * Scene Services Parameters
 */
export type SaveSceneServiceParameter = ScenesDictionary;

export type SceneApiResponseResult = ScenesDictionary;
