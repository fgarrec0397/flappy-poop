import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { FC } from "react";

import widgetStarterReducer from "./_actions/_data/state/widgetStarterReducer";

export type WidgetStarterProps = EditableWidget;

const WidgetStarter: FC<WidgetStarterProps> = () => {
    return <> Widget Starter </>;
};

export const widget = createWidget({
    component: WidgetStarter,
    reducer: widgetStarterReducer,
    widgetDefinition: {
        name: "Poop",
    },
});
