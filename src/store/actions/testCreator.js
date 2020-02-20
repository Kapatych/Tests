import {ADD_TEST_QUESTION, CREATE_TEST_FAILURE, CREATE_TEST_REQUEST, CREATE_TEST_SUCCESS} from "./actionTypes";
import axios from "../../helpers/axios";

export const addQuestion = (question) => {
    return {type: ADD_TEST_QUESTION, payload: question}
};



export const createTest = () => async (dispatch, getState) => {
    dispatch({type: CREATE_TEST_REQUEST});
    try {
        await axios.post('test-list.json' , getState().testCreator.test);
        dispatch({type: CREATE_TEST_SUCCESS})
    } catch (e) {
       dispatch({type: CREATE_TEST_FAILURE})
    }
};
