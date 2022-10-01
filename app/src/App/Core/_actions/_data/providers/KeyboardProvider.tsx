import { ClientKeyMappings } from "@app/Core/coreTypes";
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

export type KeyboardContextModel = {
    keyMapping: ClientKeyMappings;
    setKeyMapping: Dispatch<SetStateAction<ClientKeyMappings>>;
};

export const keyboardDefaultContext: KeyboardContextModel = {
    keyMapping: {},
    setKeyMapping: () => {},
};

export const KeyboardContext = createContext<KeyboardContextModel>(keyboardDefaultContext);

type Props = {
    children: ReactNode;
};

const KeyboardContextProvider: FC<Props> = ({ children }) => {
    const [keyMapping, setKeyMapping] = useState<ClientKeyMappings>({});

    const providerValue = {
        keyMapping,
        setKeyMapping,
    };

    return <KeyboardContext.Provider value={providerValue}>{children}</KeyboardContext.Provider>;
};

export default KeyboardContextProvider;
