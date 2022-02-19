import './App.css';
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux";
import {getUser} from './actions/user'
import User from "./user";
import {Routes, Route} from 'react-router-dom';
import ManageUser from "./manageUser";
import {toast} from "react-toastify";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    }, [dispatch])
    const getData = async () => {
        try {
            await dispatch(getUser());
        }catch (e){
            toast.error(e?.statusText, {autoClose: 1000, hideProgressBar: true})

        }
    }
    return (
        <>
            <Routes>
                <Route path="/" element={<User/>}/>
                <Route path="/users" element={<ManageUser/>}/>
                <Route path="/users/:id" element={<ManageUser/>}/>
            </Routes>
        </>
    );
}

export default App;
