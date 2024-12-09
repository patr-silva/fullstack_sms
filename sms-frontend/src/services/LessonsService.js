import axios from "axios";

const REST_API_URL = "http://localhost:8080/api/lessons";

export const listLessons = () => {
  return axios.get(REST_API_URL);
};

export const createLesson = (newLesson) => {
  return axios.post(REST_API_URL, newLesson);
};

export const getLessonById = (id) => {
  return axios.get(`${REST_API_URL}/${id}`);
};

export const getLessonByStudentId = (id) => {
  return axios.get(`${REST_API_URL}/students/${id}`);
};


export const updateLesson = (id, LessonData) => {
  return axios.put(`${REST_API_URL}/${id}`, LessonData);
};

export const deleteLesson = (id) => {
  return axios.delete(`${REST_API_URL}/${id}`);
};
