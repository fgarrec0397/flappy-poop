import { Dictionary } from "@common/commonTypes";
import { FeaturesWidgetsProps } from "@features/collector";
import { FC, ForwardRefExoticComponent, PropsWithoutRef, ReactNode, RefAttributes } from "react";
import { AnyAction, Reducer } from "redux";
import { Object3D } from "three";

import { HelpersTypes } from "./widgetsConstants";

/**
 * Allowed Fieldtypes
 */
export enum FieldType {
    Text = "Text",
    Number = "Number",
    Select = "Select",
    Checkbox = "Checkbox",
}

/**
 * Option for Select FieldType
 */
export interface SelectOptions {
    value: string;
    name: string;
}

type WidgetAdditionnalOptions = WidgetSelectionOptions;

export type WidgetOptionDefaultValue = string | number | boolean; // TODO - Readjust that in order to match the field type

export interface WidgetSelectionOptions {
    selectOptions?: SelectOptions[];
}

/**
 * Base interface for option object.
 */
export interface WidgetBaseOptions extends WidgetAdditionnalOptions {
    name: string;
    displayName: string;
    fieldType: FieldType;
    isVisible?: (options: WidgetBaseOptions[]) => boolean;
    defaultValue: WidgetOptionDefaultValue;
}

/**
 * All options allowed for the widget in the editor
 */
export type WidgetOptions = WidgetBaseOptions;

/**
 * Widget object definition. This information is displayed in the editor
 */
export interface WidgetDefinition {
    name: string;
    options?: WidgetOptions[];
}

/**
 * Widget options to set in the editor
 */
export type WidgetEditorOptions = {
    helper?: HelpersTypes;
    meshHolder?: ReactNode | Object3D;
};

export type WidgetComponent<Props, Ref> =
    | FC<Props>
    | ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<Ref>>;

/**
 * Widget object that is exported from all widgets objects
 */
export interface WidgetModule<Props = FeaturesWidgetsProps, Ref = null, ReducerType = null> {
    component: WidgetComponent<Props, Ref>;
    hasRef?: true;
    reducer: Reducer<ReducerType, AnyAction> | null;
    editorOptions?: WidgetEditorOptions;
    widgetDefinition: WidgetDefinition;
}

/**
 * Informations of a widget object on the scene
 */
export type WidgetSceneObject<Props = FeaturesWidgetsProps> = Omit<
    WidgetModule<Props>,
    "reducer"
> & {
    id: string;
};

/**
 * A dictionary containing informations about all WidgetObjects
 */
export type WidgetObjects<Props = FeaturesWidgetsProps> = Dictionary<WidgetSceneObject<Props>>;

/**
 * A serialized dictionary containing informations about all WidgetObjects
 */
export type SerializedWidgetObjects<Props = FeaturesWidgetsProps> = Dictionary<
    SerializedWidgetSceneObject<Props>
>;

/**
 * A serialized version of WidgetSceneObject type
 */
export type SerializedWidgetSceneObject<Props = FeaturesWidgetsProps> = Omit<
    WidgetSceneObject<Props>,
    "component" | "meshHolder"
> & {
    meshHolder: string;
};

/**
 * A dictionary containing editable informations about a WidgetSceneObject
 */
export type WidgetsDictionary = Dictionary<{
    properties: WidgetProperties;
    options: WidgetOptionsValues;
}>;

export type WidgetOptionsValues = Dictionary<{
    fieldType: FieldType;
    value: WidgetOptionDefaultValue;
}>;

export type WidgetsDictionaryItem = {
    id: string;
    properties?: WidgetProperties;
    options?: WidgetOptionsValues;
};

export type WidgetProperties = {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
};
