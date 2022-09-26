import { useHandleEditor, useIsEditor } from "@app/Editor/_actions/hooks";
import Editor from "@app/Editor/Editor";
import Game from "@app/Game/Game";
import { useHandleGetScene } from "@app/Scene/_actions/hooks";
import { Debug, Physics } from "@react-three/rapier";
import { FC } from "react";

import { Lights } from "./components";

const Scene: FC = () => {
    const { isEditor } = useIsEditor();

    useHandleEditor();
    useHandleGetScene();

    return (
        <Physics paused={isEditor}>
            <Debug />
            <Lights />
            {isEditor ? <Editor.Editor /> : <Game.Game />}
        </Physics>
    );
};

export default Scene;
