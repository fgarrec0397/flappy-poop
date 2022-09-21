import { uidGenerator } from "@app/Common/utilities";

import { ToiletsChunkModel } from "../toiletsTypes";
import createToilets from "./createToilets";

export default (): ToiletsChunkModel => {
    const id = uidGenerator();

    return {
        id,
        canBeDeleted: false,
        toilets: createToilets(id),
    };
};
