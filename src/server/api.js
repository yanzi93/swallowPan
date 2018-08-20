import axios from 'axios';

// 请求基路径，所有路径前加上基路径
axios.defaults.baseURL = '/kugou';

// 如果曾在多个基路径，则可以分别创建，会将基路径覆盖
let kugouAxios = axios.create({
	baseURL: "/kugou",
	// transformRequest(data = {}) {
	// 	//允许向服务端请求加加信息
	// 	data.user = 'leo';
	// 	return data
	// },
	transformResponse(data) {
		//允许服务端返回相应中添加信息
		data = JSON.parse(data);
		// data.user = 'leo';
		console.log('111',data)
		return data
	}
});
// let wangyiAxios = axios.create({
// 	baseURL = '/wangyi'
// });

function request(url, params) {
	return kugouAxios(url, params).catch((err)=>{
		if (err.status < 500) {
			console.log('资源问题',err);
		} else {
			console.log('网络问题');
		}
		
	})
}

// 获取新歌列表
export function getNewSong(params) {
	return request(`?json=true`,{params})
}
// 获取排行列表
export function getRank(params) {
	return request(`/rank/list?json=true`,{params})
}
// 获取歌单
export function getList(params) {
	return request(`/plist/index?json=true`,{params})
}
// 获取歌手
export function getSinger(params) {
	return request(`/singer/class?json=true`,{params})
}
