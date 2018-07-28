
const WARN = 'warning';
const ERROR = 'error';
const OK = "ok";
// -------------------服务端获取数据 ------------------------------
let {data,name} = (function(){
	let data = [];
	let name = '欢迎登陆Swallow';
	let token = window.localStorage.getItem('tokenpanyanzi');
	if (token) {
		$.ajaxSetup({
		headers: {
		  'x-access-token': token
		}
	  });
	} else {
		location.href = '/login';
		return;
	}
	$.ajax({
		url: '/api/get_user_file',
		method: 'post',
		async: false,
		success: (d) => {
			if(d.status === 0) {
				$('.onloading').hide();
				data = d.data || [];
				name = d.name || '欢迎登陆Swallow';
			} else {
				location.href = '/login';
			}
		},
		error: (err) => {
			location.href = '/login';
		}
	});
	return {data,name};
})();

// -------------------操作数据相关 ------------------------------
class Data {
	constructor(data) {
		this.data = data;
		this.name = name;
		this.initTree = -1;
		this.initPath = this.getChildsById(this.initTree)[0] ? this.getChildsById(this.initTree)[0].id : -1;
	}
	getItemById(id) {
		let tar = null
		this.data.forEach((item) => {
			if (item.id === parseInt(id)) {
				tar = item;
			}
		});
		return tar;
	}
	getChildsById(id) {
		return  this.data.filter((item) => {
			return item.pid === parseInt(id)
		}); 
	}
	getParentAllById(id) {
		let arr = [];
		let item = this.getItemById(id); // 先找到这条数据
		if(item){
			arr.push(item);
			arr = arr.concat(this.getParentAllById(item.pid))
		}
		return arr; 
	}
	// 通过一个id，找到所有的子孙数据 不包含自己
	getChildsAllById(id) {
		let self = this.getItemById(id);
		let arr = [];
		arr.push(self);
		let childs =  this.getChildsById(id);
		childs.forEach((item) => {
			arr = arr.concat(this.getChildsAllById(item.id));
		})
		return arr;
	}
	// 接收一个数组，找数组id的每一个子孙
	getChildsAllByIds(idsArr) {
		let arr = [];
		idsArr.forEach((item) => {
			arr = arr.concat(this.getChildsAllById(item));
		})
		return arr; 
	}
	delectItemById(id){
		this.data = this.data.filter((item) => {
			return item.id !== parseInt(id);
		});
	}
	// 批量删除，传入一个数组 [1,2,3,4]
	delectItemByIds(delectIds){
		delectIds.forEach((item) => {
			this.delectItemById(item);
		});
	}
	getBrothersById(id) {
		let self = this.getItemById(id); // 自己
		return this.data.filter((item) => {
			return item.pid === self.pid
		})
	}
	isExistBrothersNameById(id,last_name) { 
		let brothers = this.getBrothersById(id).filter((item) => {
			return item.id != id;   
		});
		return brothers.some((item) => {
			return item.last_name == last_name;
		});
	}
	setDataAttr(id,attr,val) {
		this.data.map((item) => {
			if (item.id === parseInt(id)) {
				item[attr] = val;
			}
			return item;
		});
	}
	// 指定一个id，找到这个id中所有的子级中是否包含传入的value,true false
	isExistChildsNameById(id,value) {
		let childs = this.getChildsById(id);
		return childs.some((item) => {
			return item.last_name == value;
		});
	}
	addDate(o) {
		this.data.unshift(o);
	}
	getParentById(id) {
		let self = this.getItemById(id);
		return this.data.filter((item) => {
			return item.id === self.pid;
		});
	}
}
let dataOpera = new Data(data,name);

