import {FETCH_ALL, FETCH_ID, CREATE, UPDATE, DELETE, ERROR} from '../actions/actionTypes';
const initialState = {
    users:[],
    error: {}
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL:
            console.log('USER IN GET REDUCER----->', action.payload)
            return{...state,users:action.payload,error: {}}

            // return action.payload;
        case FETCH_ID:
            return state.users.map((user) => (user.id === action.payload.id));
        case CREATE:
            console.log('USER IN CREATE REDUCER----->', [...state, action.payload])
            return{...state,users:action.payload,error:{}}

            // return [...users, action.payload];
        case UPDATE:
             console.log('USER IN UPDATE REDUCER----->', state.users.map((user) => (user.id === action.payload.id ? action.payload : user)))
            return state.users.map((user) => (user.id === action.payload.id ? action.payload : user));

            // return users.map((user) => (user.id === action.payload.id ? action.payload : user));
        case DELETE:
            console.log('USER IN DELETE REDUCER----->', state.users.filter((user) => user.id !== action.payload))
            return state.users.filter((user) => user.id !== action.payload);

            // return users.filter((user) => user.id !== action.payload);
        case ERROR:
            console.log('ERROR IN ERROR REDUCER====>',{...state,users:[],error:action.payload})
            return{...state,users:[],error:action.payload}
        default:
            return state;
    }
};
export default userReducer;
