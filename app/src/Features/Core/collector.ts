import cameras, { CamerasProps } from "@features/Widgets/Cameras";
import geometryForms, { GeometryFormsProps } from "@features/Widgets/GeometryForms";
import player, { PlayerProps } from "@features/Widgets/Player";
import poop, { PoopProps } from "@features/Widgets/Poop";
import terrain, { TerrainProps } from "@features/Widgets/Terrain";
import text, { TextProps, TextState } from "@features/Widgets/Text";
import toilets, { ToiletsProps, ToiletsState } from "@features/Widgets/Toilets";

/**
 * Add your Widgets Props here as union types
 */
export type FeaturesWidgetsProps = GeometryFormsProps &
    TextProps &
    PlayerProps &
    CamerasProps &
    TerrainProps &
    PoopProps &
    ToiletsProps;

/**
 * Add your Widgets reducers state here
 */
export interface FeaturesState {
    textState: TextState;
    toiletsState: ToiletsState;
}

/**
 * Add your Widgets reducers here.
 * They will be imported and combined to the main reducer
 */
export const preparedReducer = {
    textState: text.reducer,
    toiletsState: toilets.reducer,
};

export default [geometryForms, terrain, text, player, cameras, poop, toilets];
