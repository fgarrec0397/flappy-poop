import clone from "lodash/clone";
import { forwardRef, ForwardRefRenderFunction } from "react";

import { WidgetComponent, WidgetModule } from "../widgetsTypes";

/**
 * A function helping you creating a widget
 */
export default <PropsType, RefType = null, ReducerType = null>(
    widget: WidgetModule<PropsType, RefType, ReducerType>
) => {
    const widgetModule: WidgetModule<PropsType, RefType, ReducerType> = clone(widget);

    if (widgetModule.hasRef) {
        (widgetModule.component as WidgetComponent<PropsType, RefType>) = forwardRef(
            widget.component as ForwardRefRenderFunction<RefType, PropsType>
        ) as WidgetComponent<PropsType, RefType>;
    }

    return widgetModule;
};
