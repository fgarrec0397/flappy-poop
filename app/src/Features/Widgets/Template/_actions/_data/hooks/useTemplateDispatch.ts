import { useAppDispatch } from "@app/Core/store";

import { addTemplate, removeTemplate, updateTemplate } from "../state/toiletsReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchAdd = () => {
        dispatch(addTemplate());
    };

    const dispatchRemove = () => {
        dispatch(removeTemplate());
    };

    const dispatchUpdate = () => {
        dispatch(updateTemplate());
    };

    return {
        dispatchAdd,
        dispatchRemove,
        dispatchUpdate,
    };
};
