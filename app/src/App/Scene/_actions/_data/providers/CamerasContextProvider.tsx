import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

import { SceneCameraDictionary } from "../../sceneTypes";

export interface CamerasContextModel {
    cameras: SceneCameraDictionary;
    setCameras: (() => void) | Dispatch<SetStateAction<SceneCameraDictionary>>;
    currentCameraId: string | null;
    setCurrentCameraId: (() => void) | Dispatch<SetStateAction<string | null>>;
}

export const defaultContext: CamerasContextModel = {
    cameras: {},
    setCameras: () => {},
    currentCameraId: null,
    setCurrentCameraId: () => {},
};

export const CamerasContext = createContext<CamerasContextModel>(defaultContext);

type Props = {
    children: ReactNode;
};

const CamerasContextProvider: FC<Props> = ({ children }) => {
    const [cameras, setCameras] = useState<SceneCameraDictionary>({});
    const [currentCameraId, setCurrentCameraId] = useState<string | null>(null);

    const providerValue: CamerasContextModel = {
        cameras,
        setCameras,
        currentCameraId,
        setCurrentCameraId,
    };

    return <CamerasContext.Provider value={providerValue}>{children}</CamerasContext.Provider>;
};

export default CamerasContextProvider;
