import useEditorHelper from "@app/Editor/_actions/hooks/useEditorHelper";
import useIsEditor from "@app/Editor/_actions/hooks/useIsEditor";
import { ThreeEvent } from "@react-three/fiber";
import { getWidgetName, populateWidgetProperties } from "@widgets/_actions/utilities";
import { WidgetSceneObject } from "@widgets/_actions/widgetsTypes";
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
    const { isEditor } = useIsEditor();
    const { component, id, editorOptions, hasRef } = widget;
    const name = getWidgetName(widget);
    const Component = component;

    const helper = resolveHelper(widget.editorOptions?.helper);

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

    const ref = hasRef
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

            <Component {...componentProps()} hovered={hovered} {...ref} />
        </mesh>
    );
};
export default WidgetRenderer;
