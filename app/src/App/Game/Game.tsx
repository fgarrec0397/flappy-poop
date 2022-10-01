// import { useGameKeyboardControls } from "@app/Core/_actions/hooks";
import { Debug, Physics } from "@react-three/rapier";
import Widgets from "@widgets/Widgets";
import { FC } from "react";

const Game: FC = () => {
    // useGameKeyboardControls();

    return (
        <>
            <Physics>
                <Debug />
                <Widgets />
            </Physics>
        </>
    );
};

const GameUI: FC = () => {
    return null;
};

export default { Game, GameUI };
