import { useCallback, useEffect, useState } from "react";

import usePoopService from "../_data/hooks/usePoopService";

export default () => {
    const { isAlive, score, addPoint, killPoop } = usePoopService();
    const [canAddPoint, setCanAddPoint] = useState(true); // Try to put this into a context api

    useEffect(() => {
        if (!canAddPoint) {
            setTimeout(() => {
                setCanAddPoint(true);
            }, 1000);
        }
    }, [canAddPoint]);

    // useEffect(() => {
    //     console.log(canAddPoint, "canAddPoint");
    // }, [canAddPoint]);

    // useEffect(() => {
    //     console.log(score, "score");
    // }, [score]);

    const passToilet = useCallback(() => {
        if (canAddPoint) {
            addPoint();
            setCanAddPoint(false);
        }
    }, [addPoint, canAddPoint]);

    const die = () => {
        killPoop();
    };

    return { isAlive, score, passToilet, die };
};
