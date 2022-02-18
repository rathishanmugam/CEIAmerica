import './App.css';
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux";
import {getUser} from './actions/user'
import User from "./user";
import {Routes, Route} from 'react-router-dom';
import ManageUser from "./manageUser";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    }, [dispatch])
    const getData = async () => {
        await dispatch(getUser());
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
