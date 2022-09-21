import { useAppDispatch } from "@app/Core/store";

import { ToiletsChunkModel } from "../../toiletsTypes";
import { updateToiletsChunk } from "../state/toiletsReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchUpdate = (toiletChunks: ToiletsChunkModel[]) => {
        dispatch(updateToiletsChunk(toiletChunks));
    };

    return {
        dispatchUpdate,
    };
};
