import { useAppDispatch } from "@app/Core/store";

import { ToiletsChunkModel } from "../../toiletsTypes";
import { addToiletsChunk, updateToiletsChunk } from "../state/toiletsReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchAdd = (toiletChunks: ToiletsChunkModel[]) => {
        dispatch(addToiletsChunk(toiletChunks));
    };

    const dispatchUpdate = (toiletChunks: ToiletsChunkModel[]) => {
        dispatch(updateToiletsChunk(toiletChunks));
    };

    return {
        dispatchAdd,
        dispatchUpdate,
    };
};
