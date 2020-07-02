import axios from "axios";
import QS from "qs";

axios.defaults.baseURL = "https://autumnfish.cn";
axios.defaults.timeout = 30 * 1000;
axios.defaults.withCredentials = true;

// 请求拦截器
axios.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.error(error);
	}
);

// 响应拦截器
axios.interceptors.response.use(
	(res) => {
		return res;
	},
	(err) => {
		console.log(err);
	}
);

// /**
//  * get方法，对应get请求
//  * @param {String} url [请求的url地址]
//  * @param {Object} params [请求时携带的参数]
//  */
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, {
				// 改params，将时间戳作为参数
				params: {
					t: Date.parse(new Date()),
					...params,
				},
			})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

// /**
//  * post方法，对应post请求
//  * @param {String} url [请求的url地址]
//  * @param {Object} params [请求时携带的参数]
//  */
export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios
			.post(url, QS.stringify(params))
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
