import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://burgerbuilder-8a36d.firebaseio.com'
})

export default instance