import axios from 'axios';

const baseURL = "/kugou";

let kugouAxios = axios.create({
	baseURL: baseURL,
	transformResponse(data) {
		if (!data) return;
		if (typeof data === 'string') data = JSON.parse(data);
    return data;
	}
});

function request(url, params) {
	return kugouAxios(url, params).catch((err)=>{
		if (err.status < 500) {
			console.log('资源问题',err);
		} else {
			console.log('网络问题');
		}
		
	})
}


// 获取banner和新歌
export const getNewSongs = () => {
  return request('/?json=true')
}

// 获取排行数据
export const getRankList = () => {
  return request('/rank/list&json=true')
}
// 获取歌单数据
export const getPlist = () => {
  return request('/plist/index&json=true')
}

// 获取歌手分类数据
export const getSingers = () => {
  return request('/singer/class&json=true')
}

// 根据歌手分类id，获取歌手分类歌手
export const getSingerList = (params = { classid: '' }) => {
  return request(`/singer/list/${params.classid}?json=true`)
}

// 根据歌手id，获取歌手歌曲
export const getSingerInfo = (params = { singerid: '' }) => {
  return request(`/singer/info/${params.singerid}?json=true`)
}

// 根据歌单id，获取歌单歌曲
// http://m.kugou.com/plist/list/499135
export const getPlistInfo = (params = { plistid: '' }) => {
  return request(`/plist/list/${params.plistid}?json=true`)
}

// 根据排行id，获取排行歌曲
export const getRankInfo = (params = { rankid: '' }) => {
  return request(`/rank/info/${params.rankid}?json=true`)
}


export default {
  getNewSongs,
  getRankList,
  getPlist,
  getSingers,
  getSingerList,
  getSingerInfo,
  getPlistInfo,
  getRankInfo
}