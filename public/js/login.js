window.onload = (function(){
	let btn_log = $('#login-btn');
	let btn_reg = $('#register-btn');
	let log_user = $('#user-name');
	let log_passwd = $('#user-passwd');
	let reg_user = $('#register-name');
	let reg_passwd = $('#register-passwd');
	let log_tip = $('.tip-login');
	let reg_tip = $('.tip-register');
	let wrapper_log = $('.login-wrapper');
	let wrapper_reg = $('.register-wrapper');

	let initShow = 0;
	let exp_user = /^[a-zA-Z][a-zA-Z0-9_]{6,15}$/;
	let exp_passwd = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,18}$/;


	function check_user(str) {
		return exp_user.test(str);
	}
	function check_passwd(str) {
		return exp_passwd.test(str);
	}

	// ---------------登陆注册页面切换--------
	$('#toggle-register').on('click', ()=>{
		log_tip.hide();
		reg_tip.hide();
		wrapper_log.hide();
		wrapper_reg.show();
	});
	$('#toggle-login').on('click', ()=>{
		log_tip.hide();
		reg_tip.hide();
		wrapper_log.show();
		wrapper_reg.hide();
	});
	// input获得焦点提示框隐藏
	$('.user-info input').on('focus', function(e) {
		log_tip.val('').hide();
		reg_tip.val('').hide();
	});
	// 用户名回车焦点转移到密码
	log_user.on('keydown', function(e) {
		if (e.keyCode === 13) {
			log_passwd.focus();
		}
	});
	// 用户名回车焦点转移到密码
	reg_user.on('keydown', function(e) {
		if (e.keyCode === 13) {
			reg_passwd.focus();
		}
	});
	// 密码回车自动登陆
	log_passwd.on('keydown', function(e) {
		if (e.keyCode === 13) {
			loginFn();
		}
	});
	// 注册回车自动登陆
	reg_passwd.on('keydown', function(e) {
		if (e.keyCode === 13) {
			regFn();
		}
	});
	// ---------------登陆--------
	btn_log.data('doing', false);
	btn_log.on('click', function(e){
		loginFn();
	});
	// ----------------注册-------
	btn_reg.data('doing', false);
	btn_reg.on('click', function(e){
		regFn();
	});
	
	function show_log(str1,str2) {
		log_tip.text(str1).show();
		btn_log.val(str2);
		btn_log.data('doing', false);
	}
	function show_reg(str1,str2) {
		reg_tip.text(str1).show();
		btn_reg.val(str2);
		btn_reg.data('doing', false);
	}
	function ajaxPromise(options) {
	  return new Promise((resolve, reject) => {
	    $.ajax({
	    	url: options.url,
	    	method: options.method,
	    	data: options.data,
	      success: function(data) {
	        resolve(data);
	      },
	      error: function(err) {
	        reject(err);
	      }
	    });
		});
	};
	async function regFn() {
		if (btn_reg.data('doing')) {
			return
		};
		let name = reg_user.val();
		let passwd = reg_passwd.val();
		if (check_user(name) && check_passwd(passwd)) {
			// 执行登陆函数
			btn_reg.data('doing', true);
			btn_reg.val('注册中...');
			let options = {
	      url: '/api/user_register',
	      method: 'post',
	      data: {
	      	'user_name': name,
	      	'user_passwd': passwd
	      }
	    }
			try {
				let data = await ajaxPromise(options);
				if (data.status === 1) {
	        show_reg('用户名已存在','注册');
	      } else if (data.status === 0) {
	      	show_reg('注册成功,即将跳转','注册中...');
	        window.localStorage.setItem('tokenpanyanzi', data.token);
	        setTimeout(()=>{
	        	location.href = `/`;
	        },1000);
	      } else {
	      	show_reg('网络错误','注册');
	      }
			} catch(err) {
				show_reg('网络错误','注册');
			}
		} else {
			show_reg('用户名或密码格式错误','注册');
		}
	};
	async function loginFn() {
		if (btn_log.data('doing')) {
			return
		};
		let name = log_user.val();
		let passwd = log_passwd.val();
		if (check_user(name) && check_passwd(passwd)) {
			// 执行登陆函数
			btn_log.data('doing', true);
			btn_log.val('登陆中...');
			let options = {
	      url: '/api/user_login',
	      method: 'post',
	      data: {
	      	'user_name': name,
	      	'user_passwd': passwd
	      }
	    }
			try {
				let data = await ajaxPromise(options);
				if (data.status === 1) {
	        show_log('用户名密码错误','登陆');
	      } else if (data.status === 0) {
	      	show_log('登录成功,即将跳转','登陆中...');
	        window.localStorage.setItem('tokenpanyanzi', data.token);
	        setTimeout(()=>{
	        	location.href = `/`;
	        },1000);
	      } else {
	      	show_log('网络错误','登陆');
	      }
			} catch(err) {
				show_log('网络错误','登陆');
			}
		} else {
			show_log('用户名密码错误','登陆');
		}
	};

})();