import axios from "axios";

export default axios.create({
    baseURL: 'https://book-e-sell-node-api.vercel.app'
})