module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				assets: "@/assets",
				components: "@/components",
				views: "@/views",
			},
		},
	},
	// devServer: {
	// 	port: 8888, // 端口
	// },
	// lintOnSave: false, // 取消 eslint 验证
	// devServer: {
	// 	proxy: {
	// 		// 要代理的接口名
	// 		"/privateFm": {
	// 			target: "http://music.163.com/api/radio/get", // 要代理的接口地址
	// 			changeOrigin: true, // 允许跨域
	// 			pathRewrite: { "^/privateFm": "" }, // 接口名重写
	// 		},
	// 	},
	// },
};
