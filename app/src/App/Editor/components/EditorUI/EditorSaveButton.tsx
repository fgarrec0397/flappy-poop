import { saveScene } from "@app/Scenes/_actions/_data/services";
import useScenes from "@app/Scenes/_actions/hooks/useScenes";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { Button } from "antd";
import { FC } from "react";

const SaveButton: FC = () => {
    const { widgets, widgetsDictionary } = useWidgets();
    const { currentSceneId } = useScenes();

    const onSaveFileHanlder = async () => {
        await saveScene({ id: currentSceneId, widgets, widgetsDictionary });
    };

    return <Button onClick={onSaveFileHanlder}>Save</Button>;
};

export default SaveButton;
