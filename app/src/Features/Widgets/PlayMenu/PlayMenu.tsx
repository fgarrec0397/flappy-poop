import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { FieldType, WidgetType } from "@app/Widgets/_actions/widgetsConstants";
import { FC } from "react";

const PlayMenu: FC = () => {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                width: 200,
                height: 200,
                backgroundColor: "red",
            }}
        >
            {" "}
            Hello world{" "}
        </div>
    );
};

export const widget = createWidget({
    component: PlayMenu,
    reducer: null,
    type: WidgetType.UI,
    widgetDefinition: {
        name: "PlayMenu",
        options: [
            {
                name: "translateXOnPlay",
                displayName: "Translate X on play",
                fieldType: FieldType.Checkbox,
                defaultValue: false,
            },
        ],
    },
});
