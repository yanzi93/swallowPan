
// -------------------render------------
let renderOpera = (function(){
	let initTree = dataOpera.initTree;
	let initPath = dataOpera.initPath;
	// let fileInitId = dataOpera.fileInitId;
	let treeMenu = $('.tree-menu');
	let breadNav = $('.bread-nav');
	let folders = $('.folders');
	let checkedAll = $('.checkedAll');

	$('.user .user-name').text(dataOpera.name);
	$('.user-info-name').text(dataOpera.name);
	

	treeMenu.html(createTreeHtml(initTree,initTree));
	addStyleBgById(initPath);
	breadNav.html(createNavPathHtml(initPath));
	folders.html(createFilesHtml(initPath));

	// -----渲染树形菜单区域-----
	// 通过传入的一个id，找到这个id下所有的子级数据，生成一个ul结构
	function createTreeHtml(id,n){
		let childs = dataOpera.getChildsById(id);	
		let treeHtml = '';
		n++;
		if(childs.length){
			treeHtml = '<ul>';
			childs.forEach((item) => {
				if (item.type !== 'dir') return;   //对于文件不添加到树形结构
				let html = createTreeHtml(item.id, n);
				let cls = item.type === 'dir' ? '&#xe614;' : '&#xe731;';
				treeHtml += `<li>
											<div custom-id="${item.id}" custom-hash="${item.hash_name}"
														style="padding-left: ${n*16}px;" 
														class="tree-title">
												<span><i class="iconfont">${cls}</i><span class="item-title">${item.last_name}</span></span>
											</div>`;
				treeHtml += html;
				treeHtml += `</li>`;
			});	
			treeHtml += '</ul>'
		}
		return treeHtml;
	};
	// 用来给指定的元素加上样式的
	function addStyleBgById(id){
		treeMenu.find('div').removeClass('tree-item-acitve');
		treeMenu.find('div[custom-id="'+id+'"]').addClass('tree-item-acitve');
	};
	function addModalStyleBgById(id){
		$('.modal-tree .content').find('div').removeClass('tree-item-acitve');
		$('.modal-tree .content').find('div[custom-id="'+id+'"]').addClass('tree-item-acitve');	
	};
	// -------渲染路径导航区域------
	// 传入指定id，找到这个id所有的父级，返回拼好的结构
	function createNavPathHtml(id){
		let parentsAll = dataOpera.getParentAllById(id).reverse();	
		let pathHtml = '';
		let parentsAllLen = parentsAll.length;
		if(parentsAllLen){
			pathHtml = parentsAll.map((item,index) => {
				if (index === parentsAllLen-1) {
					return `<span current-id=${item.id} custom-hash="${item.hash_name}">${item.last_name}</span>`
				}
				return `<a custom-id=${item.id} custom-hash="${item.hash_name} href="javascript:;">${item.last_name}</a>`
			}).join('');
		}
		return pathHtml;
	};

	// -------渲染文件区域-------
	// 生成一个文件结构
	function createSingleFileHtml(item){
		let cls = item.type === 'dir' ? 'item-bg-dir' : 'item-bg-nodir';
		return `<div custom-id="${item.id}"  custom-hash="${item.hash_name}" custom-dir="${item.type}" class="file-item">
								<div class="item-bg ${cls}"></div>
                <span class="folder-name">${item.last_name}</span>
                <input type="text" class="editor"/>
                <i></i>
            </div>`
	};
	// 传入id生成所有子集的文件结构
	function createFilesHtml(id){
		let fileChilds = dataOpera.getChildsById(id);
		let fileHtml = '';
		if (fileChilds.length===0) {
			return fileHtml = '<p class="hasNofile"> -_-!!!  文件夹內没有内容</p>'
		}
		fileChilds.forEach((item) => {
			fileHtml += createSingleFileHtml(item);
		});

		return fileHtml;	
	};
	
	let fullTipBox = $('.full-tip-box');
	let tipText = fullTipBox.find('.tip-text');
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

	return {
		createTreeHtml,
		addStyleBgById,
		addModalStyleBgById,
		createNavPathHtml,
		createSingleFileHtml,
		createFilesHtml,
	}
})();


