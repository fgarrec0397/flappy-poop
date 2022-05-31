import { useBox } from "@react-three/cannon";
import { FC } from "react";
import { EditableWidget } from "../../App/Editor/types";
import { FieldType, WidgetModule } from "../../App/Widgets/types";

export interface GeometryFormsProps extends EditableWidget {
    shape: string;
}

type OwnProps = GeometryFormsProps;

const GeometryForms: FC<OwnProps> = ({ shape, hovered }) => {
    const GeometryComponent = shape;
    const [ref] = useBox(() => ({ mass: 1, type: "Static" }));

    return (
        <mesh ref={ref} name="GeometryForms1" position={[0, 0, 0]}>
            <GeometryComponent />
            <meshStandardMaterial color={"blue"} />
            {/* <meshStandardMaterial color={hovered ? "#bdbdf5" : "white"} /> */}
        </mesh>
    );
};

export const widget: WidgetModule<GeometryFormsProps> = {
    component: GeometryForms,
    reducer: null,
    widgetDefinition: {
        name: "Geometry",
        options: [
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
};
