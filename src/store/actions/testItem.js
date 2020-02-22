import axios from '../../helpers/axios';
import {
    FETCH_TEST_FAILURE,
    FETCH_TEST_REQUEST,
    FETCH_TEST_SUCCESS, TEST_CHECK_ANSWER,
    TEST_FINISHED,
    TEST_NEXT_QUESTION, TEST_RESET
} from "./actionTypes";

export const fetchTestItem = testId => async dispatch => {
    dispatch({type: FETCH_TEST_REQUEST});

    try {
        const response = await axios(`test-list/${testId}/questions.json`);
        dispatch({type: FETCH_TEST_SUCCESS, payload: response.data})
    } catch (e) {
        dispatch({type: FETCH_TEST_FAILURE});
    }
};

export const testAnswerClick = answerId => (dispatch, getState) => {
    const state = getState().testItem;

    const activeQuestion = state.test[state.activeQuestion];
    if (answerId !== activeQuestion.rightAnswerId) {
        dispatch({type: TEST_CHECK_ANSWER, payload: {questionId: activeQuestion.id, answerId: answerId}})
    }

    const timeout = window.setTimeout(() => {
        if (state.activeQuestion + 1 !== state.test.length) {
            dispatch({type: TEST_NEXT_QUESTION})
        } else {
            dispatch({type: TEST_FINISHED})
        }
        window.clearTimeout(timeout)
    }, 500)
};

export const resetTest = () => {
    return {type: TEST_RESET}
};