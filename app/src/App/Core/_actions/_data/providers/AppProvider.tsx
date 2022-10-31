import { store } from "@app/Core/_actions/_data/state/store";
import HistoryDictionaryContextProvider from "@app/Editor/_actions/_data/providers/HistoryContextProvider";
import CamerasContextProvider from "@app/Scenes/_actions/_data/providers/CamerasContextProvider";
import WidgetsModulesContextProvider from "@app/Widgets/_actions/_data/providers/WidgetsModulesProvider";
import WidgetsContextProvider from "@app/Widgets/_actions/_data/providers/WidgetsProvider";
import { injectStore } from "@app/Widgets/_actions/utilities/createWidget";
import { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";

type Props = {
    children: React.ReactNode;
};

injectStore(store);

const AppProvider: FC<Props> = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <CamerasContextProvider>
                <WidgetsContextProvider>
                    <WidgetsModulesContextProvider>
                        <HistoryDictionaryContextProvider>
                            {children}
                        </HistoryDictionaryContextProvider>
                    </WidgetsModulesContextProvider>
                </WidgetsContextProvider>
            </CamerasContextProvider>
        </ReduxProvider>
    );
};

export default AppProvider;
