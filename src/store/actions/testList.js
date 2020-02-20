import axios from '../../helpers/axios';
import {FETCH_TESTS_FAILURE, FETCH_TESTS_REQUEST, FETCH_TESTS_SUCCESS} from "./actionTypes";

export const fetchTestList = () => async dispatch => {
    dispatch({type: FETCH_TESTS_REQUEST});
    try {
        const response = await axios.get('/test-list.json');

        const tests = Object.keys(response.data).map((key, index) => {
            return {
                id: key,
                name: `Test № ${index + 1}`
            }
        });

        dispatch({
            type: FETCH_TESTS_SUCCESS,
            payload: tests
        });
    } catch (e) {
        dispatch({
            type: FETCH_TESTS_FAILURE,
            payload: e
        });
    }
};