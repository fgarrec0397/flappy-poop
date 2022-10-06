import { useDispatch } from "react-redux";

import { addPoint } from "../state/poopReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchAddPoint = () => {
        dispatch(addPoint());
    };

    return {
        dispatchAddPoint,
    };
};
