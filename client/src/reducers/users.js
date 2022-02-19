import {FETCH_ALL, FETCH_ID, CREATE, UPDATE, DELETE, ERROR} from '../actions/actionTypes';
const initialState = {
    users:[],
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL:
            console.log('USER IN GET REDUCER----->', action.payload)
            return{...state,users:action.payload}
        case FETCH_ID:
            return state.users.map((user) => (user.id === action.payload.id));
        case CREATE:
            console.log('USER IN CREATE REDUCER----->', {...state,users:action.payload})
            return{...state,users:action.payload}
        case UPDATE:
            return state.users.map((user) => (user.id === action.payload.id ? action.payload : user));
        case DELETE:
            return state.users.filter((user) => user.id !== action.payload);
        default:
            return state;
    }
};
export default userReducer;
