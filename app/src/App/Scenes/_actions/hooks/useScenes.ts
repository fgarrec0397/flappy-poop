import { useCallback } from "react";

import useScenesService from "../_data/hooks/useScenesService";

export default () => {
    const { scenes } = useScenesService();

    const selectScene = useCallback((sceneId: string) => {}, []);

    return {
        scenes,
        selectScene,
    };
};
