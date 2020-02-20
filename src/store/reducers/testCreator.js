import {
    ADD_TEST_QUESTION,
    CREATE_TEST_FAILURE,
    CREATE_TEST_REQUEST,
    CREATE_TEST_SUCCESS} from "../actions/actionTypes";

const initialState = {
    test: [],
    isLoading: false,
    isError: false
};

const testCreatorReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ADD_TEST_QUESTION:
            return {...state, test: [...state.test, payload]};
        case CREATE_TEST_REQUEST:
            return {...state, isLoading: true};
        case CREATE_TEST_SUCCESS:
            return {...state, isLoading: false, isError: false, test: []};
        case CREATE_TEST_FAILURE:
            return {...state, isLoading: false, isError: true};
        default:
            return state;
    }
};

export default testCreatorReducer;