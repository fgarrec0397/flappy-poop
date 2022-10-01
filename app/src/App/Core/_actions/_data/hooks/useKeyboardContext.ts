import { useContext } from "react";

import { KeyboardContext } from "../providers/KeyboardProvider";

export default () => {
    return useContext(KeyboardContext);
};
