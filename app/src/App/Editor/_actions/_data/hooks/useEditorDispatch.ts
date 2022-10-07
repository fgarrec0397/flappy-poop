import { useAppDispatch } from "@app/Core/store";

import { ModesAvailable } from "../../editorTypes";
import {
    setCurrentMode,
    setHasEditorOpened,
    setIsEditing,
    setIsEditor,
    setIsMultipleSelect,
} from "../state/editorReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchSetIsEditor = (value: boolean) => dispatch(setIsEditor(value));

    const dispatchSetIsEditing = (value: boolean) => dispatch(setIsEditing(value));

    const dispatchSetHasEditorOpened = () => dispatch(setHasEditorOpened());

    const dispatchSetIsMultipleSelect = (value: boolean) => dispatch(setIsMultipleSelect(value));

    const dispatchSetCurrentMode = (mode: ModesAvailable) => dispatch(setCurrentMode(mode));

    return {
        dispatchSetIsEditor,
        dispatchSetIsEditing,
        dispatchSetHasEditorOpened,
        dispatchSetIsMultipleSelect,
        dispatchSetCurrentMode,
    };
};
