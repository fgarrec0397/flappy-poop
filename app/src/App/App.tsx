import { useContextBridge } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import { ReactReduxContext } from "react-redux";

import { KeyboardContext } from "./Core/_actions/_data/providers/KeyboardProvider";
import useKeyboardMapping from "./Core/_actions/hooks/useHandleKeyboardMapping";
import { HistoryDictionaryContext } from "./Editor/_actions/_data/providers/HistoryContextProvider";
import { CamerasContext } from "./Scenes/_actions/_data/providers/CamerasContextProvider";
import Scenes from "./Scenes/Scenes";
import UI from "./UI/UI";
import { WidgetsModulesContext } from "./Widgets/_actions/_data/providers/WidgetsModulesProvider";
import { WidgetsContext } from "./Widgets/_actions/_data/providers/WidgetsProvider";
import useWidgets from "./Widgets/_actions/hooks/useWidgets";
import useWidgetsInitModules from "./Widgets/_actions/hooks/useWidgetsInitModules";

const App: FC = () => {
    const { removeWidgetSelection } = useWidgets();
    const ContextBridge = useContextBridge(
        CamerasContext,
        KeyboardContext,
        WidgetsContext,
        WidgetsModulesContext,
        ReactReduxContext,
        HistoryDictionaryContext
    );

    // Store all kind of widgets in Widgets Context API
    useWidgetsInitModules();

    useKeyboardMapping();

    const onPointerMissed = (event: MouseEvent) => {
        event.stopPropagation();
        removeWidgetSelection();
    };

    return (
        <>
            <Canvas camera={{ fov: 25, aspect: 1 }} onPointerMissed={onPointerMissed}>
                <ContextBridge>
                    <Scenes />
                </ContextBridge>
            </Canvas>
            <UI />
        </>
    );
};

export default App;
