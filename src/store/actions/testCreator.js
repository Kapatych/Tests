import {
    ADD_TEST_QUESTION, ADD_TEST_SETTINGS,
    CREATE_TEST_FAILURE,
    CREATE_TEST_REQUEST,
    CREATE_TEST_SUCCESS, TEST_CREATOR_RESET
} from "./actionTypes";
import axios from "../../helpers/axios";

export const addSettings = (settings) => {
    return {type: ADD_TEST_SETTINGS, payload: settings}
};

export const addQuestion = (question) => {
    return {type: ADD_TEST_QUESTION, payload: question}
};

export const createTest = () => async (dispatch, getState) => {
    dispatch({type: CREATE_TEST_REQUEST});
    try {
        const {name, questions} = getState().testCreator;
        await axios.post('test-list.json', {name, questions});
        dispatch({type: CREATE_TEST_SUCCESS})
    } catch (e) {
       dispatch({type: CREATE_TEST_FAILURE})
    }
};

export const testCreatorReset = () => {
    return {type: TEST_CREATOR_RESET}
};
