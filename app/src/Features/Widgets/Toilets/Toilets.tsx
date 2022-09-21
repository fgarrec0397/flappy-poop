import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { FC, useEffect } from "react";

import toiletsReducer from "./_actions/_data/state/toiletsReducer";
import useToilets from "./_actions/hooks/useToilets";
import ToiletsChunk from "./components/ToiletsChunk";

export interface ToiletsProps extends EditableWidget {
    shape: string;
    color: string;
    gravityScale: number;
}

type OwnProps = ToiletsProps;

const Toilets: FC<OwnProps> = () => {
    const { toiletsChunks } = useToilets();

    useEffect(() => {
        console.log(toiletsChunks, "toiletsChunks");
    }, [toiletsChunks]);

    return (
        <>
            {toiletsChunks.map((x, index) => (
                <ToiletsChunk key={index} toiletChunk={x} />
            ))}
        </>
    );
};

export const widget = createWidget({
    component: Toilets,
    reducer: toiletsReducer,
    widgetDefinition: {
        name: "Toilet",
    },
});
