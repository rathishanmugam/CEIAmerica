import axios from "axios";

 const api = axios.create({baseURL: 'http://localhost:8000'});

 //when run using minikube
// console.log('window.runtimeEnvironment', window.runtimeEnvironment);
// const api = window.runtimeEnvironment ; //|| 'http://localhost:8000';

export const getUser = () => api.get('/users')
export const getUserById = (id) => api.get(`/users/${id}`)
export const createUser = (newUser) => api.post('/users', newUser);
export const updateUser = (id, updateUser) => api.put(`/users/${id}`, updateUser);
export const deleteUser = (id) => api.delete(`/users/${id}`);

