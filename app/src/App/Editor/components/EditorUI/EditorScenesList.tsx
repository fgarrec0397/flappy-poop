import useScenes from "@app/Scenes/_actions/hooks/useScenes";
import { Button, Card, Input, List, Modal, Typography } from "antd";
import { FC, useState } from "react";

const EditorScenesList: FC = () => {
    const [isAddSceneModalOpen, setIsAddSceneModalOpen] = useState(false);
    const [sceneName, setSceneName] = useState("");
    const { scenes, currentSceneId, addScene, selectScene } = useScenes();

    const handleSelect = (sceneId: string) => {
        selectScene(sceneId);
    };

    const handleOk = () => {
        addScene(sceneName);
        setIsAddSceneModalOpen(false);
    };

    const handleCancel = () => {
        setIsAddSceneModalOpen(false);
    };

    return (
        <Card size="small" title="Scenes">
            <List
                size="small"
                bordered
                dataSource={Object.keys(scenes)}
                footer={<Button onClick={() => setIsAddSceneModalOpen(true)}>Add scene</Button>}
                renderItem={(sceneId) => (
                    <List.Item>
                        <Button
                            onClick={() => handleSelect(sceneId)}
                            disabled={currentSceneId === sceneId}
                        >
                            {scenes[sceneId].name}
                        </Button>
                    </List.Item>
                )}
            />

            <Modal
                title="Create A Scene"
                open={isAddSceneModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Typography>Scene Name</Typography>
                <Input
                    placeholder="Enter your scene name here..."
                    onChange={(event) => setSceneName(event.target.value)}
                />
            </Modal>
        </Card>
    );
};

export default EditorScenesList;
