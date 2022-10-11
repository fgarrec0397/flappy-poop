import { useThree } from "@react-three/fiber";

import getWidgetName from "../utilities/getWidgetName";
import { WidgetSceneObject } from "../widgetsTypes";

export default () => {
    const { scene } = useThree();

    const getMeshByWidget = (widget: WidgetSceneObject) => {
        const meshName = getWidgetName(widget);
        return scene.getObjectByName(meshName);
    };

    return getMeshByWidget;
};
