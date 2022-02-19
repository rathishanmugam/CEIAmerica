import * as api from '../api/index'
import {CREATE, DELETE, UPDATE, FETCH_ALL, FETCH_ID, ERROR} from "./actionTypes";

export const getUser = () => async (dispatch) => {
    try {
        const {data} = await api.getUser();
        console.log('data from api =====>', data);
         dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log("ERROR IN GET ACTION",error.response);
        if(error?.response)  throw (error.response)

    }

}
export const getUserById = (id) => async (dispatch) => {
    try {
        const {data} = await api.getUserById(id);
        dispatch({type: FETCH_ID, payload: data});
    } catch (error) {
        console.log('ERROR IN GET ID ACTION',error.response);
        if(error?.response) throw (error.response)

    }

}

export const createUser = (user) => async (dispatch) => {
    try {
        const {data} = await api.createUser(user);
        dispatch({type: CREATE, payload:data});
    } catch (error) {
        console.log('ERROR IN create ACTION',error.response);
        if(error?.response) throw (error.response)
    }
};

export const updateUser = (id, user) => async (dispatch) => {
    try {
        const response = await api.updateUser(id, user);
        console.log('the res======>',response);
          dispatch({type: UPDATE, payload: response.data});
    } catch (error) {
        console.log('ERROR IN UPDATE ACTION',error?.response);
        if(error?.response) throw (error?.response)

    }
};


export const removeUser = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id);
        dispatch({type: DELETE, payload: id});

    } catch (error) {
        console.log('ERROR IN REMOVE ACTION',error.response);
        if(error?.response) throw (error.response)

    }
};
