import { combineReducers } from "redux";

import trackingsReducer from "./trackings";
import userReducer from "./user";
import dashboardReducer from "./dashboard";

const rootReducer = combineReducers({
  trackings: trackingsReducer,
  user: userReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
