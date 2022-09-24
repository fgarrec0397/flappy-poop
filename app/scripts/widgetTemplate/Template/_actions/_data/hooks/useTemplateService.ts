import { useCallback } from "react";

import useTemplateDispatch from "./useTemplateDispatch";
import useTemplateSelector from "./useTemplateSelector";

export default () => {
    const { template } = useTemplateSelector();
    const { dispatchUpdate, dispatchAdd, dispatchRemove } = useTemplateDispatch();

    const add = useCallback(() => {
        dispatchAdd();
    }, [dispatchAdd]);

    const remove = useCallback(() => {
        dispatchRemove();
    }, [dispatchRemove]);

    const update = useCallback(() => {
        dispatchUpdate();
    }, [dispatchUpdate]);

    return {
        add,
        remove,
        update,
        template,
    };
};
