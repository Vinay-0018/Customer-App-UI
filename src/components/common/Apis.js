import axios from 'axios';

export const UnAuthApi = axios.create({
	baseURL: 'http://localhost:8081/api'
});

export const AuthApi = axios.create({
	baseURL: 'http://localhost:8081/api',
	headers: {
		'Authorization': `Bearer ${localStorage.getItem('token')}`
	}
})

export const MlApi = axios.create({
	baseURL: 'http://127.0.0.1:8000'
})