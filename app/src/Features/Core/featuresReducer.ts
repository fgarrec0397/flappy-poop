import { MapPropertiesToNonNullable } from "@common/commonTypes";
import { combineReducers } from "@reduxjs/toolkit";

import { preparedReducer } from "./collector";

type PreparedReducer = MapPropertiesToNonNullable<typeof preparedReducer>;

export default combineReducers(preparedReducer as PreparedReducer);
