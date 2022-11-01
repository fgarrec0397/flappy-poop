import usePoopDispatch from "./usePoopDispatch";
import usePoopSelector from "./usePoopSelector";

export default () => {
    const { dispatchAddPoint, dispatchKillPoop } = usePoopDispatch();
    const poop = usePoopSelector();

    const addPoint = () => {
        dispatchAddPoint();
    };

    const killPoop = () => {
        dispatchKillPoop();
    };

    return { isAlive: poop?.isAlive, score: poop?.score, addPoint, killPoop };
};
