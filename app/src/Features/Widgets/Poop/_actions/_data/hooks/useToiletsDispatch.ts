import { useAppDispatch } from "@app/Core/store";

import { ToiletModel, ToiletsChunkModel } from "../../poopTypes";
import { addToiletsChunk, removeToiletsChunk, updateToilet } from "../state/toiletsReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchAdd = (toiletChunks: ToiletsChunkModel[]) => {
        dispatch(addToiletsChunk(toiletChunks));
    };

    const dispatchRemove = (toiletChunkId: string) => {
        dispatch(removeToiletsChunk(toiletChunkId));
    };

    const dispatchUpdate = (toilet: ToiletModel) => {
        dispatch(updateToilet(toilet));
    };

    return {
        dispatchAdd,
        dispatchRemove,
        dispatchUpdate,
    };
};
