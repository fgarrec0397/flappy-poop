import useEditor from "@app/Editor/_actions/hooks/useEditor";
import useEditorHelper from "@app/Editor/_actions/hooks/useEditorHelper";
import { ThreeEvent } from "@react-three/fiber";
import { getWidgetName, populateWidgetProperties } from "@app/Widgets/_actions/utilities";
import { WidgetSceneObject } from "@app/Widgets/_actions/widgetsTypes";
import { FC, MutableRefObject, useCallback, useRef, useState } from "react";
import { Object3D } from "three";

import { useWidgets } from "../_actions/hooks";
import resolveHelper from "../_actions/utilities/resolveHelper";

type Props = {
    widget: WidgetSceneObject;
};

const WidgetRenderer: FC<Props> = ({ widget }) => {
    const componentRef = useRef(null!);
    const [hovered, setHover] = useState(false);
    const { widgetsDictionary, getWidgetDictionaryFromWidget } = useWidgets();
    const { isEditor } = useEditor();
    const { component, id, editorOptions, hasRef } = widget;
    const name = getWidgetName(widget);
    const Component = component;

    const helper = resolveHelper(editorOptions?.helper);

    useEditorHelper(helper && (componentRef as MutableRefObject<Object3D | null>), helper);

    const componentProps = useCallback(() => {
        return {
            ...populateWidgetProperties(id!, widgetsDictionary),
        };
    }, [id, widgetsDictionary]);

    const handleOnPointerOver = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(true);
    };

    const handleOnPointerOut = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(false);
    };

    const meshHolder = (
        <>{isEditor && editorOptions?.meshHolder ? editorOptions?.meshHolder : null}</>
    );

    const widgetProperties = getWidgetDictionaryFromWidget(id!)?.properties;

    const ref =
        hasRef || editorOptions?.helper
            ? {
                  ref: componentRef,
              }
            : {};

    return (
        <mesh
            name={name}
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
            {...widgetProperties}
        >
            {meshHolder}

            <Component {...componentProps()} {...widgetProperties} hovered={hovered} {...ref} />
        </mesh>
    );
};
export default WidgetRenderer;
