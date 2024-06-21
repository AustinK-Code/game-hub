import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key:'309500c1521c47a4b469c5a9cb4bb00e'
    }
});