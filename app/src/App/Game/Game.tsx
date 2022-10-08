import ClientGameUI from "@features/GameUI/GameUI";
import { Physics } from "@react-three/rapier";
import Widgets from "@app/Widgets/Widgets";
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
    return <ClientGameUI />;
};

export default { Game, GameUI };
