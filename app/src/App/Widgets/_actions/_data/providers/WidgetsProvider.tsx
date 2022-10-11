import { WidgetObjects, WidgetSceneObject } from "@app/Widgets/_actions/widgetsTypes";
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

export interface WidgetsContextModel {
    widgets: WidgetObjects;
    selectedWidgets: WidgetSceneObject[];
    setWidgets: Dispatch<SetStateAction<WidgetObjects>>;
    setSelectedWidgets: Dispatch<SetStateAction<WidgetSceneObject[]>>;
}

export const widgetsDefaultContext: WidgetsContextModel = {
    widgets: {},
    selectedWidgets: [],
    setWidgets: () => {},
    setSelectedWidgets: () => {},
};

export const WidgetsContext = createContext<WidgetsContextModel>(widgetsDefaultContext);

type Props = {
    children: ReactNode;
};

const WidgetsContextProvider: FC<Props> = ({ children }) => {
    const [widgets, setWidgets] = useState<WidgetObjects>({});
    const [selectedWidgets, setSelectedWidgets] = useState<WidgetSceneObject[]>([]);

    const providerValue: WidgetsContextModel = {
        widgets,
        selectedWidgets,
        setWidgets,
        setSelectedWidgets,
    };

    return <WidgetsContext.Provider value={providerValue}>{children}</WidgetsContext.Provider>;
};

export default WidgetsContextProvider;
