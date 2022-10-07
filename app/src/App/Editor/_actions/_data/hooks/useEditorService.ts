import { ModesAvailable } from "../../editorTypes";
import useEditorDispatch from "./useEditorDispatch";
import useEditorSelector from "./useEditorSelector";

export default () => {
    const {
        dispatchSetIsEditor,
        dispatchSetIsEditing,
        dispatchSetHasEditorOpened,
        dispatchSetIsMultipleSelect,
        dispatchSetCurrentMode,
    } = useEditorDispatch();
    const { isEditor } = useEditorSelector();

    const updateIsEditor = (value: boolean) => {
        dispatchSetIsEditor(value);
    };

    const updateIsEditing = (value: boolean) => {
        dispatchSetIsEditing(value);
    };

    const updateHasEditorOpened = () => {
        dispatchSetHasEditorOpened();
    };

    const updateIsMultipleSelect = (value: boolean) => {
        dispatchSetIsMultipleSelect(value);
    };

    const updateCurrentMode = (value: ModesAvailable) => {
        dispatchSetCurrentMode(value);
    };

    return {
        isEditor,
        updateIsEditor,
        updateIsEditing,
        updateHasEditorOpened,
        updateIsMultipleSelect,
        updateCurrentMode,
    };
};
