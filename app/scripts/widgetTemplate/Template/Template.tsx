import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { FC } from "react";

import templateReducer from "./_actions/_data/state/templateReducer";
import TemplateComponent from "./components/TemplateComponent";

export type TemplateProps = EditableWidget;

const Template: FC<TemplateProps> = () => {
    return <TemplateComponent />;
};

export const widget = createWidget({
    component: Template,
    reducer: templateReducer,
    widgetDefinition: {
        name: "Template",
    },
});
