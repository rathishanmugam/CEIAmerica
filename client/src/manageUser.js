import React, {useState, useEffect} from "react";
// import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import {getUser, getUserById, createUser, updateUser} from "./actions/user";
import {useDispatch, useSelector} from 'react-redux';
import PageNotFound from "./PageNotFound";
import {toast, ToastContainer} from "react-toastify";

const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
};
const ManageUser = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData);
    const usr = useSelector((state) => (!!id ? state?.userData?.users?.result?.find((user) => user.id === Number(id)) : null));
    const [status, setStatus] = useState(STATUS.IDLE);
    console.log('FILTTER USER FROM STORE=====>', usr)
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

// Derived state
    const errors = getErrors(user);
    const isValid = Object.keys(errors).length === 0;

    const onInputChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        if (id && usr) {
            setUser(usr);
        }
    }, [usr,id]);
    const clear = () => {
        setUser({ username: '', email: '', password: '' });

    };
    const handleSubmit = async e => {
        e.preventDefault();
        if (isValid) {
            if (!id && !usr) {
                await (dispatch(createUser(user)))
                await dispatch(getUser());
                clear();
                toast.success('User Created Successfully', {autoClose: 1000, hideProgressBar: true})
                setTimeout(()=>navigate("/"), 1000);
            } else if (id && !usr) {
                await (dispatch(createUser(user)))
                await dispatch(getUser());
                clear();
                toast.success('User Created Successfully', {autoClose: 1000, hideProgressBar: true})
                setTimeout(()=>navigate("/"), 1000);
            }else{
                await dispatch(updateUser(id, user))
                await dispatch(getUser());
                clear();
                toast.success('User Updated Successfully', {autoClose: 1000, hideProgressBar: true})
                setTimeout(()=>navigate("/"), 2000);
            }
        } else {
            setStatus(STATUS.SUBMITTED);
        }
    };

    function getErrors(user) {
        const result = {};
        if (!user.username) result.username = "User Name is required";
        if (!user.email) result.email = "Email is required";
        if (!user.password) result.password = "Password is required";

        return result;
    }
    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4"> {(id && usr) ? 'Edit A User' : 'Add A User'}</h2>
                <ToastContainer position={"top-center"} autoClose={1000}/>

                {!isValid && status === STATUS.SUBMITTED && (
                    <div role="alert">
                        <p>Please fix the following errors:</p>
                        <ul>
                            {Object.keys(errors).map((key) => {
                                return <li key={key}>{errors[key]}</li>;
                            })}
                        </ul>
                    </div>
                )}

                <form onSubmit={e => handleSubmit(e)}>
                    <div className="form-group text-center mb-4">
                        <input autoFocus
                               type="text"
                               className="form-control form-control-lg"
                               placeholder="Enter Your Username"
                               name="username"
                               value={user.username}
                               onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group text-center mb-4">
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Enter Your E-mail Address"
                            name="email"
                            value={user.email}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group text-center mb-4">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Password"
                            name="password"
                            value={user.password}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <button className="btn btn-warning btn-block">{(id && usr) ? 'Update User' : 'Add User'}</button>
                    &nbsp;&nbsp;&nbsp;
                    <button className="btn btn-warning btn-block" onClick={() => navigate("/")}>Back</button>

                </form>
            </div>
        </div>
    );
};

export default ManageUser;
