import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../components/Auth/auth-reducer";
import appReducer from "./app-reducer";
import { settingsReducer } from "../components/Settings/settings-reducer";
import ordersReducer from "./orders-reducer";

let rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    settings: settingsReducer,
    orders: ordersReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store