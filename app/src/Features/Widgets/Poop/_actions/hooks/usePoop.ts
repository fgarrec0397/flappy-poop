import { useEffect } from "react";

import usePoopService from "../_data/hooks/usePoopService";

export default () => {
    const { isAlive, score, addPoint, killPoop } = usePoopService();

    // useEffect(() => {
    //     console.log({ score });
    // }, [score]);

    // useEffect(() => {
    //     console.log({ isAlive });
    // }, [isAlive]);

    const passToilet = () => {
        console.log("add point");

        addPoint();
    };

    const die = () => {
        killPoop();
    };

    return { isAlive, score, passToilet, die };
};
