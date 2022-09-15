import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { RigidBody } from "@react-three/rapier";
import { FieldType } from "@widgets/_actions/widgetsTypes";
import { FC } from "react";

export interface GeometryFormsProps extends EditableWidget {
    shape: string;
    color: string;
    gravityScale: number;
}

type OwnProps = GeometryFormsProps;

const GeometryForms: FC<OwnProps> = ({ shape, color, gravityScale }) => {
    const GeometryComponent = shape;

    return (
        <RigidBody gravityScale={gravityScale}>
            <mesh position={[0, 0, 0]}>
                <GeometryComponent />
                <meshStandardMaterial color={color} />
            </mesh>
        </RigidBody>
    );
};

export const widget = createWidget({
    component: GeometryForms,
    reducer: null,
    widgetDefinition: {
        name: "Geometry",
        options: [
            {
                name: "color",
                displayName: "Color",
                fieldType: FieldType.Text,
                defaultValue: "white",
            },
            {
                name: "gravityScale",
                displayName: "Gravity Scale",
                fieldType: FieldType.Number,
                defaultValue: 1,
            },
            {
                name: "shape",
                displayName: "Shape",
                fieldType: FieldType.Select,
                selectOptions: [
                    {
                        value: "BoxGeometry",
                        name: "Cube",
                    },
                    {
                        value: "PlaneGeometry",
                        name: "Plane",
                    },
                ],
                defaultValue: "BoxGeometry",
            },
        ],
    },
});
