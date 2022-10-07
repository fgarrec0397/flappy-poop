import useEditor from "@app/Editor/_actions/hooks/useEditor";
import Editor from "@app/Editor/Editor";
import Game from "@app/Game/Game";
import { FC } from "react";

const UI: FC = () => {
    const { isEditor } = useEditor();

    return <>{isEditor ? <Editor.EditorUI /> : <Game.GameUI />}</>;
};

export default UI;
