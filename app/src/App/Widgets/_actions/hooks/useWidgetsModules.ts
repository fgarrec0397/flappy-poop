import { useCallback } from "react";

import useWidgetsModuleContext from "../_data/hooks/useWidgetsModuleContext";
import { SerializedWidgetSceneObject, WidgetSceneObject } from "../widgetsTypes";

export default () => {
    const { widgetsModules, setWidgetsModules } = useWidgetsModuleContext();

    const loadWidgetModule = useCallback(
        (widget: WidgetSceneObject | SerializedWidgetSceneObject) => {
            return widgetsModules.find(
                (x) => x.widgetDefinition.name === widget.widgetDefinition.name
            );
        },
        [widgetsModules]
    );

    /**
     * Load the  React component from the widgets modules list of the given widget
     */
    const getSceneWidgetComponentFromModules = useCallback(
        (widget: WidgetSceneObject | SerializedWidgetSceneObject) => {
            return loadWidgetModule(widget)!.component;
        },
        [loadWidgetModule]
    );

    return {
        widgetsModules,
        setWidgetsModules,
        getSceneWidgetComponentFromModules,
        loadWidgetModule,
    };
};
