import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import useGameInit from "@app/Game/_actions/hooks/useGameInit";
import useGameUpdate from "@app/Game/_actions/hooks/useGameUpdate";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { FC, useState } from "react";

import ToiletColumn from "./components/ToiletColumn";
import { ToiletModel } from "./toiletsTypes";

export interface ToiletsProps extends EditableWidget {
    shape: string;
    color: string;
    gravityScale: number;
}

type OwnProps = ToiletsProps;

const Toilets: FC<OwnProps> = () => {
    const [toilets, setToilets] = useState<ToiletModel[]>([{ positionY: 0, isVisible: true }]);

    useGameInit(() => {
        setToilets([
            {
                positionY: 0,
                isVisible: true,
            },
            {
                positionY: 1,
                isVisible: true,
            },
            {
                positionY: 5,
                isVisible: false,
            },
        ]);
    });

    useGameUpdate(() => {});

    return (
        <>
            {toilets.map((x, index) => (
                <ToiletColumn key={index} index={index} toilet={x} />
            ))}
        </>
    );
};

export const widget = createWidget<ToiletsProps>({
    component: Toilets,
    reducer: null,
    widgetDefinition: {
        name: "Toilet",
    },
});
