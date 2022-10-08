import { ClientKeyMappings } from "@app/Core/coreTypes";
import useHistory from "@app/Editor/_actions/hooks/useHistory";
import useGame from "@app/Game/_actions/hooks/useGame";
import { saveScene } from "@app/Scenes/_actions/_data/services";
import useCameras from "@app/Scenes/_actions/hooks/useCameras";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { WidgetSceneObject } from "@app/Widgets/_actions/widgetsTypes";
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
    const { startGame } = useGame();

    useEditorKeyboard(
        async (keyMapping: ClientKeyMappings) => {
            if (keyMapping.toggleEditor) {
                startGame();
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
