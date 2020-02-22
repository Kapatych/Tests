import {
    ADD_TEST_QUESTION, ADD_TEST_SETTINGS,
    CREATE_TEST_FAILURE,
    CREATE_TEST_REQUEST,
    CREATE_TEST_SUCCESS, TEST_CREATOR_RESET
} from "../actions/actionTypes";

const initialState = {
    name: null,
    answersQuantity: 4,
    questions: [],
    isLoading: false,
    isError: false
};

const testCreatorReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ADD_TEST_SETTINGS:
            return {
                ...state,
                name: payload.name,
                answersQuantity: payload.answersQuantity
            };
        case ADD_TEST_QUESTION:
            return {...state, questions: [...state.questions, payload]};
        case CREATE_TEST_REQUEST:
            return {...state, isLoading: true};
        case CREATE_TEST_SUCCESS:
            return {
                ...state,
                name: null,
                answersQuantity: 4,
                questions: [],
                isLoading: false,
                isError: false
            };
        case CREATE_TEST_FAILURE:
            return {...state, isLoading: false, isError: true};
        case TEST_CREATOR_RESET:
            return {
                ...state,
                name: null,
                answersQuantity: 4,
                questions: [],
                isLoading: false,
                isError: false
            };
        default:
            return state;
    }
};

export default testCreatorReducer;