import useScenes from "@app/Scenes/_actions/hooks/useScenes";
import { Button, Card, List } from "antd";
import { FC } from "react";

const EditorScenesList: FC = () => {
    const { scenes, selectScene } = useScenes();

    const handleSelect = (sceneId: string) => {
        selectScene(sceneId);
    };

    return (
        <Card size="small" title="Elements on scene">
            <List
                size="small"
                bordered
                dataSource={Object.keys(scenes)}
                renderItem={(sceneId) => (
                    <List.Item>
                        <Button
                            onClick={() => handleSelect(sceneId)}
                            // TODO - disable selected scene
                        >
                            {scenes[sceneId].name}
                        </Button>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default EditorScenesList;
