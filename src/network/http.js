import axios from "axios";
import QS from "qs";

const instance = axios.create({
	baseURL: "https://autumnfish.cn",
	timeout: 30 * 1000,
	withCredentials: true,
	// "content-type": "application/json;charset=UTF-8",
});

// 请求拦截器
instance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.error(error);
	}
);

// 响应拦截器
instance.interceptors.response.use(
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
		instance
			.get(url, {
				// 改params，将时间戳作为参数
				params: {
					params,
					// cookie: this.cookie,
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
		instance
			.post(url, QS.stringify(params))
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
