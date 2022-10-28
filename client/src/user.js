import './App.css';
import React, {useEffect, useState, useMemo} from "react";
import Header from "./header";
import Pagination from "./pagination";
import Search from "./search";
import "bootstrap/dist/css/bootstrap.min.css"
import "./icons";
import {useDispatch, useSelector} from "react-redux";
import {getUser, removeUser} from './actions/user'
import {useNavigate} from "react-router-dom";
import useLoader from "./hooks/useLoader";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDebounce from "./hooks/useDebounce";

function User() {
    const [loader, showLoader, hideLoader] = useLoader();
    const [usrs, setUsrs] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({field: "", order: ""});
    const ITEMS_PER_PAGE = 5;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const debouncedSearch = useDebounce(search, 500);

    const headers = [
        {name: "No#", field: "id", sortable: false},
        {name: "User Name", field: "username", sortable: true},
        {name: "Email", field: "email", sortable: true},
        {name: "Password", field: "password", sortable: true},
        {name: "Action", field: "", sortable: false}

    ];

    const userData = useSelector((state) => state.userData);

    useEffect(() => {
        showLoader();

        if (userData.users.result) {
            hideLoader();

            setUsrs(userData.users.result.reverse());
        } else setUsrs([]);

    }, [userData.users])

    const deleteUser = async id => {
        try {
            if (window.confirm('Are you sure to delete this record?'))
                await dispatch(removeUser(id));
            await dispatch(getUser());
            setUsrs(userData.users.result.reverse());
            if (usersData.length === 1) {
                setCurrentPage(page => page - 1);
            }
            toast.success('User Deleted Successfully', {autoClose: 1000, hideProgressBar: true})
        } catch (e) {
            toast.error(e?.statusText, {autoClose: 1000, hideProgressBar: true})
    }
}

// }
const updateUser = (id) => {
    if (id) {
        let path = `/users/${id}`;
        navigate(path);
    } else {
        let path = `/users`;
        navigate(path);
    }

}

const usersData = useMemo(() => {
    let computedUsers = usrs;

    if (search) {
        computedUsers = computedUsers.filter(
            usr =>
                usr.username.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                usr.email.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }

    if (computedUsers.length !== 0) setTotalItems(computedUsers.length)
    else setTotalItems(0)
    //Sorting users
    if (sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        computedUsers = computedUsers.sort(
            (a, b) =>
                reversed * a[sorting.field].localeCompare(b[sorting.field])
        );
    }

    //Current Page slice
    return computedUsers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
}, [usrs, dispatch, totalItems, currentPage, debouncedSearch, sorting]);

return (
    <>
        <ToastContainer position={"top-center"} autoClose={1000}/>
        <h3 style={{display: "flex", justifyContent: "center"}}>Building User Table </h3><br/><br/>

        <div className="row w-100">
            <div className="col mb-3 col-12 text-center">
                <div className="row">
                    <div className="col-md-12 d-flex flex-row-reverse">

                        <Search
                            onSearch={value => {
                                setSearch(value);
                                setCurrentPage(1);
                            }}
                        />
                        <button className="btn btn-primary mr-4" onClick={() => updateUser()}
                        >
                            Add
                        </button>
                    </div>
                </div>

                <table className="table table-striped">
                    <Header
                        headers={headers}
                        onSorting={(field, order) =>
                            setSorting({field, order})
                        }
                    />
                    <tbody>
                    {(!!usersData && usersData.length === 0 && !usrs) &&
                    <h3 style={{display: "flex", justifyContent: "center"}}>No Data To Preview, So Please Add Some
                    </h3>}
                    {usersData.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">
                                {user.id}
                            </th>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>

                                <button
                                    className="btn btn-warning mr-2"
                                    onClick={() => updateUser(user.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="row">
                    <div className="col-md-12 d-flex flex-row-reverse">
                        <Pagination
                            total={totalItems}
                            itemsPerPage={ITEMS_PER_PAGE}
                            currentPage={currentPage}
                            onPageChange={page => setCurrentPage(page)}
                        />
                    </div>
                </div>

            </div>
        </div>
        {loader}

    </>
);
}

export default User;
