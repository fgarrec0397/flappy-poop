import { Physics } from "@react-three/rapier";
import Widgets from "@widgets/Widgets";
import { FC } from "react";

const Game: FC = () => {
    // TODO Implement a setting to activate the Debug through the editor
    return (
        <>
            <Physics>
                {/* <Debug /> */}
                <Widgets />
            </Physics>
        </>
    );
};

const GameUI: FC = () => {
    return null;
};

export default { Game, GameUI };
