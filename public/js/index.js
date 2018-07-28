// -----------------交互-------------------------
;(function(){
	let initTree = dataOpera.initTree;
	let initPath = dataOpera.initPath;
	let treeMenu = $('.tree-menu');
	let breadNav = $('.bread-nav');
	let folders = $('.folders');
	let checkedAll = $('.checkedAll');
	// ----------------退出登陆-----------
	$('#logout').on('click', (e)=>{
		window.localStorage.removeItem('tokenpanyanzi');
		location.href = '/login';
	})

  // -----------------树形结构交互------------
	treeMenu.on('click',"li",function (e){
		let id = $(this).find('div').attr('custom-id');
		renderOpera.addStyleBgById(id);
		checkedAll.removeClass('checked');
		breadNav.html(renderOpera.createNavPathHtml(id));
		folders.html(renderOpera.createFilesHtml(id));
		e.stopPropagation();	
	});
	// 导航路径区域交互
	breadNav.on('click','a',function (e){
		let id = $(this).attr('custom-id');
		renderOpera.addStyleBgById(id);
		checkedAll.removeClass('checked');
		breadNav.html(renderOpera.createNavPathHtml(id));
		folders.html(renderOpera.createFilesHtml(id));
	});
	// ----------------文件区域交互-----------
	folders.on('click','.file-item',function (e){
		let target = e.target;
		if($(target).is('i')){
			// 点击选中单个文件
			let bl = $(target).toggleClass('checked').is('.checked');
			if(bl) {
				$(target).parent().addClass('active')
			}else{
				$(target).parent().removeClass('active')
			}
			let checkedI = Array.from($('.file-item')).every((item) => {
				return $(item).hasClass('active');
			});
			if(checkedI){
				checkedAll.addClass('checked');
			}else{
				checkedAll.removeClass('checked');
			}
		} else if ($(target).is('input')){
			return;
		} else {
			if ($(this).attr('custom-dir') === 'dir') {
				// 点击进入文件夹
				let id = $(this).attr('custom-id')
				renderOpera.addStyleBgById(id);
				breadNav.html(renderOpera.createNavPathHtml(id));
				folders.html(renderOpera.createFilesHtml(id));
				checkedAll.removeClass('checked')
			} else {
				// 点击选中单个文件
				let bl = $(this).children('i').toggleClass('checked').is('.checked');
				if(bl) {
					$(this).addClass('active')
				}else{
					$(this).removeClass('active')
				}
				let checkedI = Array.from($('.file-item')).every((item) => {
					return $(item).hasClass('active');
				});
				if(checkedI){
					checkedAll.addClass('checked');
				}else{
					checkedAll.removeClass('checked');
				}
			}
		}
	});
	// 全选
	checkedAll.click(function (){
		let currentId = breadNav.find('span').attr('current-id');
		let childs = dataOpera.getChildsById(currentId);
		if(!childs.length){
			return;
		}
		let bl = checkedAll.toggleClass('checked').is('.checked');
		if(bl){
			$('.file-item').each((index,item) =>{
				$(item).children('i').addClass('checked');
				$(item).addClass('active');
			})
		}else{
			$('.file-item').each((index,item) =>{
				$(item).children('i').removeClass('checked');
				$(item).removeClass('active');
			});
		}
	});
	// 框选
	folders.on('mousedown',function (e){
		if(!$(e.target).is('.folders')){
			return;
		}
		let newDiv = $('<div class="selectbox"></div>');
		let downX = e.clientX,downY = e.clientY;
		newDiv.css({
			width: 10,
			height: 10,
			left: downX,
			top: downY
		})
		newDiv.data('isAppend',false);  // 记录是否放到body中了
		let moveX,moveY,left,top,width,height,t,l;
		$(document).mousemove(function (e){
			// 有范围 10像素之内 是没有div
			if(Math.abs(e.clientX - downX) > 10 || Math.abs(e.clientY - downY) > 10){
				if(!newDiv.data('isAppend')){
					$(document.body).append(newDiv);
					newDiv.data('isAppend',true); // 记录已经插入
				}
			}else{
				return;
			}
			l = folders.offset().left;
			t = folders.offset().top;
			moveX = e.clientX;
			moveY = e.clientY;
			width = Math.abs(moveX - downX);
			height = Math.abs(moveY - downY);
			left = Math.min(moveX,downX);
			top = Math.min(moveY,downY);		
			if(left < l){
				left = l;
				width = width - (l - moveX);
			}
			if(top < t){
				top = t;
				height = height - (t - moveY);
			}
			newDiv.css({
				width: width,
				height: height,
				left: left,
				top: top
			});
			$('.file-item').each(function (index,item){
				if(collision(newDiv[0],item)){
					$(item).addClass('active').find('i').addClass('checked');
				}else{
					$(item).removeClass('active').find('i').removeClass('checked');
				}	
			});
			let checkedI = Array.from($('.file-item')).every((item) => {
				return $(item).hasClass('active');
			});
			if(checkedI){
				checkedAll.addClass('checked')
			}else{
				checkedAll.removeClass('checked')
			}
		});
		$(document).mouseup(function (){
			newDiv.remove();
			$(document).off('mousemove mouseup')	
		});
		e.preventDefault();
	});
	//-------------------删除------------------------
	// 点击删除按钮，打开操作面板
	$('#del').click(function(e) {
		let selectedI = folders.find('i.checked');
		if(selectedI.length > 0){
			$(this).addClass('active');
			$('#delebox').show();
		}else{
			tip(WARN,'请选择删除文件');
		}
	});
	// 删除操作面板点击
	$('#delebox').click((e) => {
		if ($(e.target).hasClass('btn-ok')) {
			let currentId = breadNav.find('span').attr('current-id');
			let selectedI = $('.file-item.active');
			let delectIds = [];
			selectedI.each((index,item) => {
				delectIds.push(parseInt($(item).attr('custom-id')));
			});
			delectIdItem = dataOpera.getChildsAllByIds(delectIds).map((item) => {
				return item.id	
			});
			//------------------删除数据操作----------
			// 操作数据库删除数据
			let jsonDelectIds = JSON.stringify(delectIdItem);
			$.ajax({
				url: '/opera/remove',
				method: 'post',
				data: {
					delectIds: jsonDelectIds,
					pid: +currentId
				},
				success: function(data) {
					if (data.status===0) {
						dataOpera.delectItemByIds(delectIdItem);
						treeMenu.html(renderOpera.createTreeHtml(initTree, initTree));
				    folders.html(renderOpera.createFilesHtml(currentId));
				    renderOpera.addStyleBgById(currentId);
				    checkedAll.removeClass('checked');
				    $('#delebox').hide();
				    $('#del').removeClass('active');
					} else if(data.status===1) {
						tip(ERROR,'删除中断');
						// 重新请求数据进行渲染-----------
					} else {
						tip(ERROR,'网络连接失败');
					}
				},
				error: function(err) {
					tip(ERROR,'网络连接失败');
					// 刷新页面重新获取数据！！！！！
				}
			});			
		} else if ($(e.target).hasClass('btn-cancel') || $(e.target).hasClass('close-ico')) {
			$('#delebox').hide();
			$('#del').removeClass('active');
		}
	});
	
	//-------------------重命名------------------------
	// 点击重命名按钮
	$('#rename').click((e) => {
		let selectedI = folders.find('i.checked');
		if(selectedI.length === 1){
			let span = selectedI.siblings('span');
			let input = selectedI.siblings('input');
			span.hide();
			input.css({display:'block'}).focus().val(span.text().trim()).select();
			$('#rename').addClass('active');
			$('#rename').data('isRename',true);
		} else if(selectedI.length > 1){
			tip(ERROR,'不能同时重命名多个文件')
		}else if(selectedI.length < 1){
			tip(WARN,'请选择重命名文件')
		}
	});
	// 处理重命名
	$(document).mousedown((e) => {
		if(!$('#rename').data('isRename')){
			return;
		}
		if($(e.target).is('input')){
			return;
		}
		let selectedI = folders.find('i.checked');
		let span = selectedI.siblings('span');
		let input = selectedI.siblings('input');
		let value = input.val().trim();
		let id = selectedI.parent().attr('custom-id')
		if(value === ''){
			tip(WARN,'文件名为空');
			input.hide();
			span.show();
		}else if(dataOpera.isExistBrothersNameById(id,value)){
			tip(ERROR,'文件名重复');
			input.hide();
			span.show();
		}else {
			// -------------重命名操作---------------
			// id:文件的id; value:文件的新名字
			$.ajax({
				url: '/opera/rename',
				method: 'post',
				data: {
					id: id,
					last_name: value
				},
				success: function(data){
					if (data.status === 0) {
						input.hide();
						span.show().text(value);
						dataOpera.setDataAttr(id,'last_name',value);
						treeMenu.find('div[custom-id="'+id+'"]').find('.item-title').text(value);
						tip(OK,'文件重命名成功');
					} else {
						tip(ERROR,'网络连接失败');
						input.hide();
						span.show();
					}
				},
				error: function(err){
					tip(ERROR,'网络连接失败');
					input.hide();
					span.show();
				}
			});
		}
		$('#rename').removeClass('active');
		$('#rename').data('isRename',false)
	});
	// ------------------新建文件------------------------------
	$('#create').click(function (e) {
		$(this).addClass('active');
		let last_name = '新建文件夹';
		// 判断文件中是否存在新建文件夹
		let pid = breadNav.find('span').attr('current-id');
		let items = dataOpera.getChildsById(pid);
		let reg = /^(?:(?:新建文件夹)(?:\((\d)\))?)$/;
		let n = 0;
		let num = [0];
		items.forEach((item) => {
			let res = item.last_name.match(reg);
			if (res) {
				n++;
				res[1] !== undefined ? num.push(parseInt(res[1])) : '';
			}
		});
		if (n !== 0 ) {
			last_name = `新建文件夹(${Math.max(...num)+1})`;
		}
		// ----------------------
		let html = $(renderOpera.createSingleFileHtml({id:'',last_name:last_name,type:'dir'}));
		folders.prepend(html);
		html.find('span').hide();
		html.find('input').val(last_name).select();
		input = html.find('input').css('display','block').focus();
		$('#create').data('isCreate',true)
	});
	// 判断新建文件命名
	$(document).mousedown(function (e){
		if($(e.target).is('input')){
			return;
		}
		if($('#create').data('isCreate')){
			let first = folders.find('.file-item:first');
			let span = first.find('span')
			let input = first.find('input');
			let value = input.val().trim();
			let pid = breadNav.find('span').attr('current-id');
			if(value === ''){
				first.remove();
			}else if(dataOpera.isExistChildsNameById(pid,value)){
				tip(ERROR,'文件名重复');
				first.remove();
			}else{
				// --------------操作数据库新建文件----------
				$.ajax({
					url: '/opera/adddir',
					method: 'post',
					data: {
						method: 1,
						last_name: value,
						pid: +pid,
						type: 'dir'
					},
					success: function(data) {
						if (data.status === 0) {
							let o = {
								last_name: value,
								pid: +pid,
								type: 'dir',
								id: data.data.file_id,
								hash_name: data.data.hash_name
							}
							dataOpera.addDate(o);
							first.attr('custom-id',o.id);
							input.hide();
							span.show().text(value);
							treeMenu.html(renderOpera.createTreeHtml(initTree,initTree));
							renderOpera.addStyleBgById(pid);
						} else {
							tip(ERROR,'网络连接失败');
							first.remove();
						}
					},
					error: function(err) {
						tip(ERROR,'网络连接失败');
						first.remove();
					}
				});
			}
		}
		$('#create').data('isCreate',false);
		$('#create').removeClass('active');
	});
	//-----------------上传文件---------------------
	$('#upload-inp').on('change', function(e) {
      // 先上传（进度条）／在写入=>渲染
      if ($('#upload-inp')[0].files[0]){
	    	let file = $('#upload-inp')[0].files[0];
	    	let pid = breadNav.find('span').attr('current-id');
	    	// --------------判断上传文件重复--------------
	    	let last_name = file.name;
	    	let reg = new RegExp();
	    	let i = last_name.indexOf('.');
	    	let n1,n2;
	    	if (i === -1 ) {
	    		let str = `^(?:(?:${last_name})(?:\\((\\d)\\))?)$`;
	    		reg = new RegExp(str);
	    	} else {
	    		n1 = last_name.slice(0,i);
	    		n2 = last_name.slice(i,); //包括.
	    		let str = `^(?:(?:${n1})(?:\\((\\d)\\))?)(?:${n2})$`;
	    		reg = new RegExp(str);
	    	}
				let items = dataOpera.getChildsById(pid);
				let n = 0;
				let num = [0];
				items.forEach((item) => {
					let res = item.last_name.match(reg);
					if (res) {
						n++;
						res[1] !== undefined ? num.push(parseInt(res[1])) : '';
					}
				});
				if (n !== 0 ) {
					if (i===-1) {
						last_name = `${last_name}(${Math.max(...num)+1})`;
					} else {
						last_name = `${n1}(${Math.max(...num)+1})${n2}`;
					}
				}
	    	// ------------------------------
	    	let fData = new FormData();
	    	fData.append('file', file, last_name);
	    	$.ajax({
	    		url: `/api/uploads?pid=${pid}`,
	    		method: 'post',
	    		cache: false,
	    		data: fData,
	    		processData: false,
	    		contentType: false,
	    		success: function(data) {
	    			if (data.status === 0) {
	    				tip(OK,'上传成功');
	    				let {file_id,last_name,type,hash_name} = data.data;
	    				let o = {
								id: file_id,
								last_name: last_name,
								pid: +pid,
								type: type,
								hash_name: hash_name
							}
							dataOpera.addDate(o);
	    				let html = $(renderOpera.createSingleFileHtml(o));
	    				folders.prepend(html);
	    			} else {
	    				tip(ERROR,'上传失败');
	    			}
	    		},
	    		error: function(err) {
	    			tip(ERROR,'上传失败');
	    		}
	    	});
      } else {
      	tip(WARN,'请选择上传文件');
      }
  });
	//-----------------移动到---------------------
	let moveTargetId = 1;  // 移动的目标父级的id
	// 点击移动事件
	$('#remove').click(function(e) {
		moveTargetId = 1;
		$('.footer .btn-ok').css('cursor', 'pointer');
		$('.modal-tree .tip').text('');
		let selectedI = folders.find('i.checked')
		if(selectedI.length > 0){
			$(this).addClass('active');
			$('.modal-tree').show();
			$('#mask').show();
			$('.modal-tree .folderName span').text(dataOpera.getItemById(initPath).last_name)
			$('.modal-tree .content').html(renderOpera.createTreeHtml(initTree,initTree));
			renderOpera.addModalStyleBgById(moveTargetId);
			if(breadNav.find('span').attr('current-id') == moveTargetId){
				$('.modal-tree .tip').data('isMove',false)
			}else{
				$('.modal-tree .tip').data('isMove',true)
			}
		}else{
			tip(WARN,'请选择移动文件');
		}
	});
	// 移动弹窗点击事件，选择移动到目录
	$('.modal-tree .content').on('click','div',function (){
		let id = $(this).attr('custom-id'); 
		renderOpera.addModalStyleBgById(id);
		let name = $(this).find('.item-title').text().trim();
		$('.modal-tree .folderName span').text(name);
		let selectedI = folders.find('i.checked'); 
		let ids = [];
		selectedI.each((index,item) => {
			ids.push($(item).parent().attr('custom-id'))	
		})
		// 找到父级数据 目标父级id在不在allData中 在的话不能移动 不在 可以移动
		let allData = dataOpera.getChildsAllByIds(ids).concat(dataOpera.getParentById(ids[0])); //[{},{}]
		let flag = false;
		flag = allData.some((item) => {
			return item.id === parseInt(id);
		});
		if(flag){
			$('.modal-tree .tip').data('isMove',false);
			$('.modal-tree .tip').text('父子文件不能移动');
			$('.footer .btn-ok').css('cursor', 'not-allowed');
		}else{
			$('.footer .btn-ok').css('cursor', 'pointer');
			$('.modal-tree .tip').text('');
			$('.modal-tree .tip').data('isMove',true)
		}
		moveTargetId = id; 
	})
	// 确定移动 把要移动的文件的pid改成目标父级的id
	$('.modal-tree .btn-ok').click(function (){
		if(!$('.modal-tree .tip').data('isMove')){
			return;
		}
		// -----------------操作数据库移动数据
		let selectedI = $('.file-item.active');
		let selectedIds = [];
		let movenamelist = [];
		selectedI.each((index,item) => {
			let id = parseInt($(item).attr('custom-id'));
			selectedIds.push(id);
			movenamelist.push(dataOpera.getItemById(id).last_name);
		});
		// -----------处理移动重名问题-----------
		let targetIds = dataOpera.getChildsById(+moveTargetId);
		let newname = [];
		let showname = [];
		movenamelist.forEach((item,index)=>{
			let last_name = item;
			let reg = new RegExp();
    	let i = last_name.indexOf('.');
    	let n1,n2;
    	if (i === -1 ) {
    		let str = `^(?:(?:${last_name})(?:\\((\\d)\\))?)$`;
    		reg = new RegExp(str);
    	} else {
    		n1 = last_name.slice(0,i);
    		n2 = last_name.slice(i,); //包括.
    		let str = `^(?:(?:${n1})(?:\\((\\d)\\))?)(?:${n2})$`;
    		reg = new RegExp(str);
    	}
			let n = 0;
			let num = [0];
			targetIds.forEach((item) => {
				let res = item.last_name.match(reg);
				if (res) {
					n++;
					res[1] !== undefined ? num.push(parseInt(res[1])) : '';
				}
			});
			if (n !== 0 ) {
				if (i===-1) {
					last_name = `${last_name}(${Math.max(...num)+1})`;
				} else {
					last_name = `${n1}(${Math.max(...num)+1})${n2}`;
				}
			}
			if (last_name !== item) {
				newname.push({
					id: selectedIds[index],
					last_name: last_name
				})
			}
			showname.push(last_name);
		});
		// ----------------------------
		let jsonSelectedIds = JSON.stringify(selectedIds);
		let jsonSelectedNames = JSON.stringify(newname);
		$.ajax({
			url: '/opera/move',
			method: 'post',
			data: {
				selectedIds: jsonSelectedIds,
				moveTargetId: +moveTargetId,
				selectedNames: jsonSelectedNames
			},
			success: function(data) {
				if (data.status===0) {
			    selectedIds.forEach((item,index)=>{
			    	dataOpera.setDataAttr(item,'pid',+moveTargetId);
			    	dataOpera.setDataAttr(item,'last_name',showname[index]);

			    });
			    treeMenu.html(renderOpera.createTreeHtml(initTree,initTree));
					folders.html(renderOpera.createFilesHtml(breadNav.find('span').attr('current-id')))
					renderOpera.addStyleBgById(breadNav.find('span').attr('current-id'))
					tip(OK,'移动成功');
				} else {
					tip(ERROR,'移动失败');
				}
			},
			error: function(err) {
				tip(ERROR,'网络连接失败');
			}
		});
		$('.modal-tree').hide();
		$('#mask').hide();
		$('#remove').removeClass('active');
	})
	// 移动面板点击取消
	$('.modal-tree .btn-cancel').click(function (){
		$('.modal-tree').hide();
		$('#mask').hide();
		$('#remove').removeClass('active');
	});
	// 移动面板点击关闭
	$('.modal-tree .close-ico').click(function (){
		$('.modal-tree').hide();
		$('#mask').hide();
		$('#remove').removeClass('active');
	});

	// 碰撞检测的工具函数
	function getRect(el){
		return el.getBoundingClientRect();
	}
	function collision(dragEl,hitedEl){
		let dragRect = getRect(dragEl);
		let hitedRect = getRect(hitedEl); 
		if(
			dragRect.right < hitedRect.left || 
			dragRect.bottom < hitedRect.top ||
			dragRect.left > hitedRect.right ||
			dragRect.top > hitedRect.bottom
		){
			return false
		}
		return true
	}
	let fullTipBox = $('.full-tip-box');
	let tipText = fullTipBox.find('.tip-text')
	let timer = null;
	function tip(cls,value){
		fullTipBox[0].classList=('full-tip-box');
		fullTipBox.css('top',-32);
		fullTipBox[0].style.transition = 'none';
		tipText.text(value);
		fullTipBox.addClass(cls);
		setTimeout(function (){
			fullTipBox.css('top',0);
			fullTipBox[0].style.transition = '.3s';
		});
		clearTimeout(timer);
		timer = setTimeout(function (){
			fullTipBox.css('top',-32);	
		},2000);
	}
	
})();


