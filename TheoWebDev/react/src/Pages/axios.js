import axios from "axios";

const axiosClient = axios.create({
	baseURL: `http://localhost:8000`,
	withXSRFToken: true,
	withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
	const token = localStorage.getItem("ACCESS_TOKEN");
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const { response } = error;
		if (response && response.status === 401) {
			localStorage.removeItem("ACCESS_TOKEN");
			// Optionally redirect to login
			window.location.href = "/login";
		}
		throw error;
	}
);

export default axiosClient;
