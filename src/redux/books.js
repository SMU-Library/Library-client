import * as ActionTypes from './ActionTypes';

const Books = (state = { isLoading: true,
    errMess: null,
    books:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_BOOKS:
            return {...state, isLoading: false, errMess: null, books: action.payload};

        default:
            return state;
    }
};
export default Books;