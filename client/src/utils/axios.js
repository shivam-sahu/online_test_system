import Axios from 'axios';
const token = localStorage.jwtToken;

export default Axios.create({
	baseURL: "http://localhost:3001/",
	headers:{common:{'Authorization':token}}
});