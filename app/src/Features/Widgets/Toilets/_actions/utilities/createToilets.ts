import { uidGenerator } from "@app/Common/utilities";

import { ToiletModel, ToiletsChunkToilets } from "../toiletsTypes";

export default (toiletsChunkId: string) => {
    const toilets: ToiletModel[] = [];

    for (let i = 0; i < 3; i++) {
        const toilet: ToiletModel = {
            id: uidGenerator(),
            toiletsChunkId,
            positionY: 0,
            isVisible: true,
        };

        toilets.push(toilet);
    }

    console.log(toilets, "toilets in createToilets");

    return toilets as ToiletsChunkToilets;
};
