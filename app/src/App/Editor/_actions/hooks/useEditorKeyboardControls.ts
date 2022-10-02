import { ClientKeyMappings } from "@app/Core/coreTypes";
import useHistory from "@app/Editor/_actions/hooks/useHistory";
import usePlayGame from "@app/Game/_actions/hooks/usePlayGame";
import { saveScene } from "@app/Scene/_actions/_data/services";
import useCameras from "@scene/_actions/hooks/useCameras";
import useWidgets from "@widgets/_actions/hooks/useWidgets";
import { WidgetSceneObject } from "@widgets/_actions/widgetsTypes";
import { useState } from "react";

import useEditorKeyboard from "../../../Core/_actions/hooks/useEditorKeyboard";

export default () => {
    const { setNextCamera, setPrevCamera } = useCameras();
    const {
        selectedWidgets,
        firstCurrentWidget,
        widgets,
        widgetsDictionary,
        removeselectedWidgets,
        copyWidget,
    } = useWidgets();
    const { setPrevHistoryItem, setNextHistoryItem, shouldAddHistoryState } = useHistory();
    const [, setCopiedWidgets] = useState<WidgetSceneObject[]>([]);
    const { playGame } = usePlayGame();

    useEditorKeyboard(
        async (keyMapping: ClientKeyMappings) => {
            if (keyMapping.toggleEditor) {
                playGame();
            } else if (keyMapping.copyWidget) {
                if (selectedWidgets.length > 0) {
                    setCopiedWidgets(selectedWidgets);
                }
            } else if (keyMapping.pasteWidget) {
                if (selectedWidgets.length > 0) {
                    selectedWidgets.forEach((x) => {
                        copyWidget(x);
                    });
                }
            } else if (keyMapping.undo) {
                setPrevHistoryItem();
            } else if (keyMapping.cancelUndo) {
                setNextHistoryItem();
            } else if (keyMapping.deleteWidget) {
                if (selectedWidgets.length > 0) {
                    removeselectedWidgets();
                }
            } else if (keyMapping.nextCamera) {
                setNextCamera();
            } else if (keyMapping.prevCamera) {
                setPrevCamera();
            } else if (keyMapping.saveScene) {
                await saveScene({ widgets, widgetsDictionary });
            }
        },
        [
            firstCurrentWidget?.id,
            selectedWidgets,
            widgets,
            copyWidget,
            removeselectedWidgets,
            shouldAddHistoryState,
        ]
    );
};
