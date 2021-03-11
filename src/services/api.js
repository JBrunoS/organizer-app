import axios from 'axios'

const api = axios.create({
    baseURL: 'https://organizer-app-backend.herokuapp.com/'
})

export default api;