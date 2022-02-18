import * as api from '../api/index'
import {CREATE, DELETE, UPDATE, FETCH_ALL, FETCH_ID, ERROR} from "./actionTypes";

export const getUser = () => async (dispatch) => {
    try {
        const {data} = await api.getUser();
        console.log('data from api =====>', data);
        dispatch({type: FETCH_ALL, payload: data})
    } catch (error) {
        dispatch({type:ERROR,payload:error})

        console.log("ERROR IN GET ACTION",error);

    }

}
export const getUserById = (id) => async (dispatch) => {
    try {
        const {data} = await api.getUserById(id);
        console.log('data from api =====>', data);
        dispatch({type: FETCH_ID, payload: data})
    } catch (error) {
        dispatch({type:ERROR,payload:error})

        console.log('ERROR IN GET ID ACTION',error);

    }

}

export const createUser = (user) => async (dispatch) => {
    try {
        const {data} = await api.createUser(user);

        dispatch({type: CREATE, payload: data});
    } catch (error) {
        dispatch({type:ERROR,payload:error})

        console.log('ERROR IN CREATE ACTION',error);
    }
};

export const updateUser = (id, user) => async (dispatch) => {
    try {
        const {data} = await api.updateUser(id, user);

        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        dispatch({type:ERROR,payload:error})

        console.log('ERROR IN UPDATE ACTION',error);
    }
};

export const removeUser = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id);
        dispatch({type: DELETE, payload: id});
    } catch (error) {
        dispatch({type:ERROR,payload:error})

        console.log('ERROR IN REMOVE ACTION',error);
    }
};
