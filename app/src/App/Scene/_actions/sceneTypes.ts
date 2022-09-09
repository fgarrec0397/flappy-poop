import {
    SerializedWidgetObjects,
    WidgetObjects,
    WidgetsDictionary,
} from "@app/Widgets/_actions/widgetsTypes";
import { Camera } from "@react-three/fiber";
import { Dictionary } from "@reduxjs/toolkit";
import { MutableRefObject } from "react";

export type SceneCameraRef = MutableRefObject<
    | (Camera & {
          manual?: boolean | undefined;
      })
    | undefined
>;

export type SceneCamera = {
    id: string;
    order: number;
    cameraRef: SceneCameraRef;
};

export type SceneCameraDictionary = Dictionary<SceneCamera>;

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
