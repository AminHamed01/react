import axios from "axios";

const baseURL = "http://localhost:3002/movies";

export const getallMovies = async () => {
    return await axios.get(baseURL);
};

export const getMovieById = async (id) => {
    return await axios.get(`${baseURL}/${id}`);
};

export const editMovie = async (id, movie) => {
    return await axios.put(`${baseURL}/${id}`, movie);
};

export const addMovie = async (movie) => {
    return await axios.post(baseURL, movie);
};

export const deleteMovie = async (id) => {
    return await axios.delete(`${baseURL}/${id}`);
};
