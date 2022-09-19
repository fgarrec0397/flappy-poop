import { useAppSelector } from "@app/Core/store";
import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import useGameInit from "@app/Game/_actions/hooks/useGameInit";
import useGameUpdate from "@app/Game/_actions/hooks/useGameUpdate";
import createWidget from "@app/Widgets/_actions/utilities/createWidget";
import { FC, useState } from "react";

import toiletsReducer from "./_actions/_data/state/toiletsReducer";
import { ToiletModel } from "./_actions/toiletsTypes";
import ToiletColumn from "./components/ToiletColumn";

export interface ToiletsProps extends EditableWidget {
    shape: string;
    color: string;
    gravityScale: number;
}

type OwnProps = ToiletsProps;

const Toilets: FC<OwnProps> = () => {
    const [toilets, setToilets] = useState<ToiletModel[]>([{ positionY: 0, isVisible: true }]);
    const appState = useAppSelector((state) => state.features.toiletsState);

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

export const widget = createWidget({
    component: Toilets,
    reducer: toiletsReducer,
    widgetDefinition: {
        name: "Toilet",
    },
});
