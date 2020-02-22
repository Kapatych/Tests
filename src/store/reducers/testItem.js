import {
    FETCH_TEST_FAILURE,
    FETCH_TEST_REQUEST,
    FETCH_TEST_SUCCESS,
    TEST_CHECK_ANSWER,
    TEST_FINISHED,
    TEST_NEXT_QUESTION,
    TEST_RESET
} from "../actions/actionTypes";

const initialState = {
    result: {},
    isFinished: false,
    activeQuestion: 0,
    test: null,
    isLoading: false,
    isError: false
};

const testItemReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH_TEST_REQUEST:
            return {...state, isLoading: true};
        case FETCH_TEST_SUCCESS:
            return {...state, isLoading: false, test: payload};
        case FETCH_TEST_FAILURE:
            return {...state, isLoading: false, isError: true};
        case TEST_CHECK_ANSWER:
            return {
                ...state,
                result: {...state.result, [payload.questionId]: payload.answerId}
            };
        case TEST_NEXT_QUESTION:
            return {...state, activeQuestion: state.activeQuestion + 1};
        case TEST_FINISHED:
            return {...state, isFinished: true};
        case TEST_RESET:
            return {
                ...state,
                isFinished: false,
                activeQuestion: 0,
                result: {}
            };
        default:
            return state;
    }
};

export default testItemReducer;