import { WidgetObjectModule, WidgetUIModule } from "@app/Widgets/_actions/widgetsTypes";
import type { CamerasProps } from "@features/Widgets/Cameras";
import type { GameControllerProps, GameControllerState } from "@features/Widgets/GameController";
import type { GeometryFormsProps } from "@features/Widgets/GeometryForms";
import type { PlayerProps } from "@features/Widgets/Player";
import type { PoopProps, PoopState } from "@features/Widgets/Poop";
import type { TerrainProps } from "@features/Widgets/Terrain";
import type { TextProps, TextState } from "@features/Widgets/Text";
import type { ToiletsProps, ToiletsState } from "@features/Widgets/Toilets";
import type { WidgetStarterProps, WidgetStarterState } from "@features/Widgets/WidgetStarter";

const modules = import.meta.glob("./*/*.tsx");

/**
 * Add your Widgets Props here as union types
 */
export type FeaturesWidgetsProps = GeometryFormsProps &
    TextProps &
    PlayerProps &
    CamerasProps &
    TerrainProps &
    PoopProps &
    ToiletsProps &
    GameControllerProps &
    WidgetStarterProps;

/**
 * Add your Widgets reducers state here
 */
export interface FeaturesState {
    text: TextState;
    toilets: ToiletsState;
    poop: PoopState;
    gameController: GameControllerState;
    widgetStarter: WidgetStarterState;
}

/**
 * Extracts widgets from loaded modules and export them for further use.
 *
 * You should not touch this function
 */
export const loadWidgetsFromModules = async () => {
    const widgetModules: WidgetObjectModule[] | WidgetUIModule[] = [];

    for (const path in modules) {
        const { widget } = (await modules[path]()) as any;
        widgetModules.push(widget);
    }

    return widgetModules;
};
