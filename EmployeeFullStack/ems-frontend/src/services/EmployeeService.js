import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/employees";

export const listEmployees = () => axios.get(API_BASE_URL);

export const getEmployeeById = (id) => axios.get(`${API_BASE_URL}/${id}`);

export const updateEmployee = (id, employee) => axios.put(`${API_BASE_URL}/${id}`, employee);
