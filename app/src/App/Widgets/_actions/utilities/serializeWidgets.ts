import { SetOptionalPropertyFrom } from "@app/Common/commonTypes";
import { serialize } from "@app/Core/_actions/utilities/componentSerializer";
import {
    SerializedWidgetObjects,
    SerializedWidgetSceneObject,
    WidgetEditorOptions,
    WidgetObjects,
    WidgetSceneObject,
} from "@app/Widgets/_actions/widgetsTypes";

export const serializeEditorOptions = ({ meshHolder, helper }: WidgetEditorOptions) => {
    if (meshHolder) {
        const serializedMeshHolder = serialize(meshHolder as JSX.Element);

        return {
            meshHolder: serializedMeshHolder,
            helper,
        };
    }
};

export default (widgets: WidgetObjects) => {
    const serializedWidgets: SerializedWidgetObjects = {};

    for (const key in widgets) {
        const widget: SetOptionalPropertyFrom<WidgetSceneObject, "component"> = { ...widgets[key] };
        let editorOptions: WidgetEditorOptions | undefined;
        if (widget.editorOptions) {
            editorOptions = serializeEditorOptions(widget.editorOptions);
        }

        widget.editorOptions = editorOptions;

        delete widget.component;

        serializedWidgets[widget.id] = widget as SerializedWidgetSceneObject;
    }

    return serializedWidgets;
};