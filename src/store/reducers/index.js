import {combineReducers} from "redux";
import testListReducer from "./testList";
import testItemReducer from "./testItem";
import testCreatorReducer from "./testCreator";
import authReducer from "./auth";

export default combineReducers({
    testList: testListReducer,
    testItem: testItemReducer,
    testCreator: testCreatorReducer,
    auth: authReducer
})