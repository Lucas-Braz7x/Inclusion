import axios from 'axios'

export const api = axios.create({
  baseURL: "https://inclusion-recode.herokuapp.com",
  withCredentials: true
})

export const registrarToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log("Token resgistrado");
  }
}
