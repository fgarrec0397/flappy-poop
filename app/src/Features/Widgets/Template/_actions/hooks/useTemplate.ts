import { Vector3Array } from "@app/Common/commonTypes";
import getRandomNumber from "@app/Common/utilities/getRandomNumber";
import { useCallback } from "react";

import useTemplateService from "../_data/hooks/useTemplateService";

export default () => {
    const { add, update, remove } = useTemplateService();

    const addTemplate = useCallback(() => {
        add();
    }, [add]);

    const removeTemplate = useCallback(() => {
        remove();
    }, [remove]);

    const updateTemplate = useCallback(() => {
        update();
    }, [update]);

    return { addTemplate, removeTemplate, updateTemplate };
};
