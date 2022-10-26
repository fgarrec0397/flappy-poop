import { useEffect } from "react";

import { getScenes } from "../_data/scenesApiservices";
import useScenes from "./useScenes";

export default () => {
    const { initScenes } = useScenes();

    useEffect(() => {
        const handleFetchScene = async () => {
            await getScenes(
                (result) => {
                    initScenes(result);
                },
                (error: any) => {
                    // TODO - show UI element with this error
                    // eslint-disable-next-line no-console
                    console.warn(error);
                }
            );
        };

        handleFetchScene();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
