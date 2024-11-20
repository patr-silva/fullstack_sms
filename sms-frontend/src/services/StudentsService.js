import axios from "axios";

const REST_API_URL = "http://localhost:8080/api/students";

export const listStudents = () => {
  return axios.get(REST_API_URL);
};

export const createStudent = (newStudent) => {
  return axios.post(REST_API_URL, newStudent);
};

export const getStudentById = (id) => {
  return axios.get(`${REST_API_URL}/${id}`);
};

export const updateStudent = (id, studentData) => {
  return axios.put(`${REST_API_URL}/${id}`, studentData);
};

export const deleteStudent = (id) => {
  return axios.delete(`${REST_API_URL}/${id}`);
};
