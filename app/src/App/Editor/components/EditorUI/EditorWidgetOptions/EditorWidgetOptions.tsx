import Typography from "@app/Common/components/Html/Typography";
import useWidgets from "@widgets/_actions/hooks/useWidgets";
import { FieldType } from "@widgets/_actions/widgetsTypes";
import { Card } from "antd";
import { FC } from "react";

import EditorOptionsCheckboxField from "./EditorOptionsCheckboxField";
import EditorOptionsNumberField from "./EditorOptionsNumberField";
import EditorOptionsSelectField from "./EditorOptionsSelectField";
import EditorOptionsTextField from "./EditorOptionsTextField";

const EditorWidgetOptions: FC = () => {
    const { selectedWidgets } = useWidgets();

    console.log(
        selectedWidgets[0].widgetDefinition.options,
        "selectedWidgets[0].widgetDefinition.options"
    );

    return (
        <Card size="small" bordered={false} bodyStyle={{ padding: "0" }}>
            {selectedWidgets.length > 1 ? (
                <Typography>
                    {"Impossible to edit widget while more than one is selected"}
                </Typography>
            ) : (
                selectedWidgets.length > 0 &&
                selectedWidgets[0].widgetDefinition.options?.map((option) => {
                    if (option.fieldType === FieldType.Text) {
                        return <EditorOptionsTextField key={option.displayName} option={option} />;
                    }

                    if (option.fieldType === FieldType.Number) {
                        return (
                            <EditorOptionsNumberField key={option.displayName} option={option} />
                        );
                    }

                    if (option.fieldType === FieldType.Checkbox) {
                        return (
                            <EditorOptionsCheckboxField key={option.displayName} option={option} />
                        );
                    }

                    if (option.fieldType === FieldType.Select) {
                        return (
                            <EditorOptionsSelectField key={option.displayName} option={option} />
                        );
                    }

                    return null;
                })
            )}
        </Card>
    );
};

export default EditorWidgetOptions;
