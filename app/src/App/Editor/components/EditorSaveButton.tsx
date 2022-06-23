import { trigger } from "@core/utilities/events";
import { Button } from "antd";
import { FC } from "react";

const SaveButton: FC = () => {
    const onSaveFileHanlder = () => {
        trigger("saveFile:click");
    };

    return <Button onClick={onSaveFileHanlder}>Save</Button>;
};

export default SaveButton;
