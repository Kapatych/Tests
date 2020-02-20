import {FETCH_TESTS_FAILURE, FETCH_TESTS_REQUEST, FETCH_TESTS_SUCCESS} from "../actions/actionTypes";

const initialState = {
    tests: null,
    isLoading: false,
    isError: false
};

const testListReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH_TESTS_REQUEST:
            return {
                ...state, isLoading: true
            };
        case FETCH_TESTS_SUCCESS:
            return {
                ...state, isLoading: false, isError: false, tests: payload
            };
        case FETCH_TESTS_FAILURE:
            return {
                ...state, isLoading: false, isError: true
            };
        default:
            return state
    }
};


export default testListReducer;