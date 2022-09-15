import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { Html } from "@react-three/drei";
import { FC } from "react";

import { EditableWidget } from "../../../App/Editor/_actions/editorTypes";
import { FieldType, WidgetModule } from "../../../App/Widgets/_actions/widgetsTypes";
import textReducer from "./state/textReducer";

export interface TextProps extends EditableWidget {
    text: string;
}

type OwnProps = TextProps;

const Text = createWidget<OwnProps>(({ text }) => {
    return (
        <mesh>
            <Html>
                <div>
                    <p>{text}</p>
                </div>
            </Html>
        </mesh>
    );
});

export const widget: WidgetModule<TextProps> = {
    component: Text,
    reducer: textReducer,
    widgetDefinition: {
        name: "Text",
        options: [
            {
                name: "text",
                displayName: "Text",
                fieldType: FieldType.Text,
                defaultValue: "Test default value",
            },
        ],
    },
};
