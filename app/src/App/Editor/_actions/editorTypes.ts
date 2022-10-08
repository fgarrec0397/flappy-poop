import { Dictionary } from "@app/Common/commonTypes";
import { WidgetObjects, WidgetsDictionary } from "@app/Widgets/_actions/widgetsTypes";

/**
 * Additional props that applies for widgets in the editor
 */
export interface EditableWidget {
    hovered: boolean;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
}

/**
 * Transform Controls Modes
 */
export enum ModesAvailable {
    Translate = "translate",
    Rotate = "rotate",
    Scale = "scale",
}

/**
 * The History dictionary containing all actions done by the user
 */
export type HistoryDictionary = Dictionary<HistoryItem>;

/**
 * One history item
 */
export type HistoryItem = {
    id: string;
    order: number;
    state: HistoryState;
};

/**
 * A snapshot of a editor state
 */
export type HistoryState = {
    widgetsDictionary: WidgetsDictionary;
    widgets: WidgetObjects;
};
