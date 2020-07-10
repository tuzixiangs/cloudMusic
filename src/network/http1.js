import axios from "axios";

const instance1 = axios.create({
	baseURL: "http://music.163.com/api/radio/get",
	timeout: 30 * 1000,
	withCredentials: true,
	// headers: {
	// 	"content-type": "application/json;charset=UTF-8",
	// },
});

// 请求拦截器
instance1.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.error(error);
	}
);

// 响应拦截器
instance1.interceptors.response.use(
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
export function get1(url, params) {
	return new Promise((resolve, reject) => {
		instance1
			.get(url, {
				// 改params，将时间戳作为参数
				params: {
					params,
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
