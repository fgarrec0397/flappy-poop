import usePoopDispatch from "./usePoopDispatch";

export default () => {
    const { dispatchAddPoint } = usePoopDispatch();

    const addPoint = () => {
        dispatchAddPoint();
    };

    return {
        addPoint,
    };
};
