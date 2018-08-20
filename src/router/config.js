import Pnew from '../views/pnew/pnew'
import Plist from '../views/plist/plist'
import Rank from '../views/rank/rank'
import Singer from '../views/singer/singer'

import SingerList from '../views/singer/singerlist/singerlist'
import SingerInfo from '../views/singer/singerinfo/singerinfo'

import PlistInfo from '../views/plist/plistinfo/plistinfo'
import RankInfo from '../views/rank/rankinfo/rankinfo'

import Search from '../views/search/search'


export let navConfig = [
{
	path: '/',
	title: '新歌',
	component: Pnew,
	info: {
		isRender: true,
		isExact: true
	}
},
{
	path: '/rank',
	title: '排行',
	component: Rank,
	info: {
		isRender: true,
		isExact: false
	}
},
{
	path: '/plist',
	title: '歌单',
	component: Plist,
	info: {
		isRender: true,
		isExact: false
	}
},
{
	path: '/singer',
	title: '歌手',
	component: Singer,
	info: {
		isRender: true,
		isExact: false
	}
}
];

export let singerNav = [
{
	path: '/singer/list/:id',
	title: '歌手',
	component: SingerList,
	info: {
		isRender: true,
		isExact: false
	}
},
{
	path: '/singer/info/:id',
	title: '歌手',
	component: SingerInfo,
	info: {
		isRender: true,
		isExact: false
	}
},
{
	path: '/plist/list/:id',
	title: '歌单',
	component: PlistInfo,
	info: {
		isRender: true,
		isExact: false
	}
},
{
	path: '/rank/info/:id',
	title: '排行',
	component: RankInfo,
	info: {
		isRender: true,
		isExact: false
	}
},
{
	path: '/search/index',
	title: '搜索',
	component: Search,
	info: {
		isRender: true,
		isExact: false
	}
}

];


export default [...navConfig, ...singerNav]