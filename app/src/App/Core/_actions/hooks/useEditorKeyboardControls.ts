import { KeyboardMappings } from "@app/Core/coreTypes";
import useHistory from "@app/Editor/_actions/hooks/useHistory";
import usePlayGame from "@app/Game/_actions/hooks/usePlayGame";
import { saveScene } from "@app/Scene/_actions/_data/services";
import useCameras from "@scene/_actions/hooks/useCameras";
import useWidgets from "@widgets/_actions/hooks/useWidgets";
import { WidgetSceneObject } from "@widgets/_actions/widgetsTypes";
import { useState } from "react";

import useKeyboardMappings from "./useKeyboardMappings";

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

    useKeyboardMappings(
        async (keyMapping: KeyboardMappings) => {
            if (keyMapping.editor.toggleEditor?.value) {
                playGame();
            } else if (keyMapping.editor.copyWidget?.value) {
                if (selectedWidgets.length > 0) {
                    setCopiedWidgets(selectedWidgets);
                }
            } else if (keyMapping.editor.pasteWidget?.value) {
                if (selectedWidgets.length > 0) {
                    selectedWidgets.forEach((x) => {
                        copyWidget(x);
                    });
                }
            } else if (keyMapping.editor.undo?.value) {
                setPrevHistoryItem();
            } else if (keyMapping.editor.cancelUndo?.value) {
                setNextHistoryItem();
            } else if (keyMapping.editor.deleteWidget?.value) {
                if (selectedWidgets.length > 0) {
                    removeselectedWidgets();
                }
            } else if (keyMapping.editor.nextCamera?.value) {
                setNextCamera();
            } else if (keyMapping.editor.prevCamera?.value) {
                setPrevCamera();
            } else if (keyMapping.editor.saveScene?.value) {
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
