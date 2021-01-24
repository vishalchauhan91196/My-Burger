import axios from 'axios';

const instance= axios.create({
    baseURL: 'https://my-burger--react-default-rtdb.firebaseio.com/',
});

export default instance;