import axios from "axios";

const api = axios.create({baseURL: 'http://localhost:8000'});

const url = "http://localhost:8000/users"
export const getUser = () => api.get(url)
export const getUserById = (id) => api.get(`http://localhost:8000/users/${id}`)
export const createUser = (newUser) => api.post(url, newUser);
export const updateUser = (id, updateUser) => api.put(`http://localhost:8000/users/${id}`, updateUser);
export const deleteUser = (id) => api.delete(`http://localhost:8000/users/${id}`);

