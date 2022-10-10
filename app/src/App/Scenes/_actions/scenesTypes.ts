import { Dictionary, OptionalType } from "@app/Common/commonTypes";
import {
    SerializedWidgetObjects,
    WidgetObjects,
    WidgetsDictionary,
} from "@app/Widgets/_actions/widgetsTypes";
import { Camera } from "@react-three/fiber";
import { MutableRefObject } from "react";

/**
 * Cameras
 */

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
 * A dictionary containing about scenes informations
 */
export type ScenesDictionary = Dictionary<ScenesDictionaryItem>;

/**
 * A single scene information
 */
export type ScenesDictionaryItem<SceneDataType = OptionalType> = {
    id: string;
    name: string;
    data: SceneDataType;
};

/**
 * Scene Services Parameters
 */

export type SaveSceneServiceParameter = {
    widgets: WidgetObjects;
    widgetsDictionary: WidgetsDictionary;
};

export type SceneApiResponseResult = {
    serializedWidgets: SerializedWidgetObjects;
    widgetsDictionary: WidgetsDictionary;
};
