import { useContext } from "react";

import { KeyboardContext } from "../providers/KeyboardProvider";

export default () => {
    const context = useContext(KeyboardContext);

    if (!context) {
        throw new Error("widgetsContext must be inside WidgetsProvider");
    }

    return context;
};
