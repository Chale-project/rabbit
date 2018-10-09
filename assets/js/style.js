//common.setStorage('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LndoaHlrai5jbiIsImF1ZCI6Imh0dHBzOlwvXC93d3cud2hoeWtqLmNuIiwiaWF0IjoxNTM1NzAwNTkxLCJleHAiOjE1MzcxNDA1OTEsInVpZCI6MjY5MX0.CLDJPJISz-Fuq4bBoa0esJFPs3jMEEPojdKxv7ZtKh8')
//common.setStorage('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LndoaHlrai5jbiIsImF1ZCI6Imh0dHBzOlwvXC93d3cud2hoeWtqLmNuIiwiaWF0IjoxNTM1MzQ5Nzg1LCJleHAiOjE1MzY3ODk3ODUsInVpZCI6MjY5MX0.4vJfhvWzUZXplszGKW9jnqEXkapLs4I67XqGavSwqps')

//common.setStorage('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LndoaHlrai5jbiIsImF1ZCI6Imh0dHBzOlwvXC93d3cud2hoeWtqLmNuIiwiaWF0IjoxNTMxODIzNTUyLCJleHAiOjE1MzMyNjM1NTIsInVpZCI6MTgzNDR9.qtiIGqo5DmMFoOXyjWdPEaqsH3y5pyWtwjP25Sdq3_M')
//common.setStorage('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LndoaHlrai5jbiIsImF1ZCI6Imh0dHBzOlwvXC93d3cud2hoeWtqLmNuIiwiaWF0IjoxNTM1NzA3MDk3LCJleHAiOjE1MzcxNDcwOTgsInVpZCI6MTg0NDZ9.8MGSypgoVUYXX3TW-qf-nSeTn0r2c8pJVhNydBLt--g')
//var userInfo = {
//	birthday: "1993-06-11",
//	description: null,
//	expoint1: 0,
//	expoint2: 0,
//	expoint3: 0,
//	extract_code: "709776",
//	grades: 0,
//	headimgurl: "http://thirdwx.qlogo.cn/mmopen/7qTjU0pI1JtpZNAQnH1Qv00Zg32CUu1ppcv7Q7s8Uic6RtkuGrKOCd3kFOaIKCKmaTquXml6CFcYKHjhvW1RjPFcLlj0y7yrO/132",
//	hobby: null,
//	id: 18344,
//	last_login_ip: "",
//	last_login_time: "0",
//	mobile: "17671015060",
//	nickname: "一切皆为虚幻",
//	openid: "oWDEn0f1UwHT1u4qXjTN-v1CkKnI",
//	password: null,
//	pic: null,
//	point: 0,
//	regtime: "1524639855",
//	salt: null,
//	sex: "1",
//	shop_openid: "oWDEn0f1UwHT1u4qXjTN-v1CkKnI",
//	small_openid: "oj8LD5PZDyGf0byigDY2961wkRWo",
//	sms_on: 0,
//	status: 1,
//	unionid: "oCwjK1JlZ4Y4zCl7ZV6JHPb2UCxc",
//	userhead: "/public/images/default.png",
//	userhome: null,
//	userip: null,
//	usermail: null,
//	username: "一切皆为虚幻"
//}
//common.setStorage('userInfo', JSON.stringify(userInfo))
//_userRole = {
//	dresserid: 1141,
//	makeup_id: 55,
//	role: 1
//}
//common.setStorage('userRole', JSON.stringify(_userRole))
var u = navigator.userAgent,
	isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var WCY = {
	path: location.pathname,
	init: function() {
		mui.init()
		mui.init({
			swipeBack: false
		});

		mui('body').on('tap', 'a', function(e) {
			var href = this.getAttribute('href');
			if(href && href.indexOf('javascript:;') != 0 && href.indexOf('#item1mobile') != 0 && href.indexOf('#item2mobile') != 0 && href.indexOf('#item3mobile') != 0 && href.indexOf('#item4mobile') != 0) {
				location.href = href;
			}
		});

		WCY.checkUserLogin();

		//返回首頁
		if(WCY.path != '/html/shop/author.html' && WCY.path != '/html/shop/login.html' && WCY.path != '/html/shop/index.html' && WCY.path != '/html/shop/product.html' && WCY.path != '/html/shop/cart.html' && WCY.path != '/html/shop/user.html' && WCY.path.indexOf('/html/safe') == -1) {
			WCY.goHome();
			$('body').on('tap', '.icon-go-home', function() {
				common.urlOpen('../shop/index.html?');
			})
		}
	},

	//检测用户登录
	checkUserLogin: function() {
		if(!WCY.checkLogin() && WCY.path != '/html/shop/author.html' && WCY.path != '/html/shop/login.html') {
			common.setStorage('beforeLoginUrl', location.href)
			location.href = '../shop/author.html'
			return false;
		}
		if(WCY.checkLogin() && WCY.path == '/html/shop/author.html') {
			location.href = '../shop/index.html'
			return false;
		}
	},

	setUserRole: function(c) {
		common.ajaxRequest({
			u: 'Makeup_Stores/makeupUserRole.html?'
		}, function(res) {
			var _userRole = res.userRole;
			common.setStorage('userRole', JSON.stringify(_userRole));
			(typeof c == 'function') && c(_userRole);
		})
	},

	//cookie检测用户登录态
	checkLogin: function() {
		var token = common.getStorage('token');
		if(token && token.indexOf('.') > 0)
			return token;
	},

	//返回首頁
	goHome: function(c) {
		var _home = '<div class="icon-go-home"></div>';
		$('body').append(_home);
		(typeof c == 'function') && c(_userRole);
	},

	//搜索无数据
	nodata: function(str) {
		var ele = '<div class="no-data"><span class="mui-icon mui-icon-info"></span> ' + str + '</div>'
		return ele;
	},

	//跳转商品对应分类
	goProduct: function(id) {
		common.urlOpen('product.html?categoryType=' + id);
	},

	//跳转推荐商品详情
	goProductDetail: function(id) {
		common.urlOpen('../shop/productShow.html?proid=' + id);
	},

	//购物车为空
	emptyCart: function() {
		var html = [];
		html.push('<div class="no-data">');
		html.push('		<p><img style="width: 40px;" src="../assets/images/nempty_cart.png"></p>');
		html.push('		<p>您的购物车空空如也！</p>');
		//html.push('	<div class="btn-goshopping">');
		//html.push('		<a href="../makeUpShopIndex" class="mui-btn mui-btn-default btn-back-shopping">再去逛逛</a>');
		//html.push('	</div>');
		html.push('</div>');
		return html.join('');
	},

	//错误处理
	errorMessageShow: function(msg) {
		var html = [];
		html.push('<li class="error-message-show">');
		html.push('	<img src="../assets/images/failure.png">');
		html.push('	<p>' + msg + '！</p>');
		html.push('</li>');
		return html.join('');
	},

	//空订单列表
	emptyOrderList: function() {
		var html = [];
		html.push('<div class="wcy-order-null">');
		html.push('	<img src="../assets/images/noorder.png">');
		html.push('	<p>没有相关订单哦！</p>');
		html.push('</div>');
		return html.join('');
	},

	//空优惠券列表
	emptyCouponslist: function() {
		var html = [];
		html.push('<div class="no-coupon">');
		html.push('  <img src="../assets/images/no_coupon.png">');
		html.push('  <span>暂时没有此状态下优惠券^_^</span>');
		html.push('</div>');
		return html.join('');
	},

	//更新购物车数量
	updateCart: function() {
		var $elnum = $('.wares-num');
		common.ajaxRequest({
			u: 'cart/cartCount.html?'
		}, function(res) {
			if(res.totalNumber > 0) {
				$elnum.css('display', 'inline-block').text(parseInt(res.totalNumber));
			} else {
				$elnum.css('display', 'none');
			}
		});
	},

	//添加到购物车
	addCart: function(data, callback) {
		common.ajaxRequest({
			u: 'Cart/add_to_cart.html?',
			d: data
		}, function(res) {
			common.layerMsg("添加成功！");
			WCY.updateCart(); //更新购物车商品数
		});
	},

	//属性选择效果
	specSelect: function() {
		var flag = $('.spec-select').hasClass('mui-active');
		if(!flag) {
			$('.spec-select').addClass('mui-active');
			$('.mui-backdrop').css({
				'display': 'block',
				'opacity': '1'
			});
		} else {
			$('.spec-select').removeClass('mui-active');
			$('.mui-backdrop').css({
				'display': 'none',
				'opacity': '0'
			});
		}
	},

	//推荐商品
	getProductRecom: function(elem, self) {
		common.ajaxRequest({
			u: 'cms_content/recommend_goods.html?'
		}, function(res) {
			var list = res.list
			WCY.showProductRecom(list, self);
			elem.css('display', 'block');
		});
	},

	showProductRecom: function(list, self) {
		var html = [];
		for(var i = 0; i < list.length; i++) {
			html.push('<li class="mui-table-view-cell mui-media mui-col-xs-6 ' + (i % 2 == 0 ? 'odd' : 'even') + '" data-proid="' + list[i].goods_id + '">');
			html.push('	<div class="home-product-thumb">');
			html.push('		<img class="mui-media-object" src="' + filesService + (!list[i].image ? '../assets/images/logo.png' : list[i].image) + '">');
			html.push('	</div>');
			html.push('	<div class="home-product-title">');
			html.push('		<p class="mui-ellipsis-2">' + list[i].name + '</p>');
			html.push('	</div>');
			html.push('	<div class="home-product-others">');
			html.push('		<div class="home-product-price">');
			html.push('			<span class="selling-price mui-ellipsis">￥<em>' + list[i].price + '</em></span>');
			html.push('			<span class="original-price mui-ellipsis">￥<em>' + list[i].wasprice + '</em></span>');
			html.push('		</div>');
			html.push('		<div class="product-list-buy"><span>购买</span></div>');
			html.push('	</div>');
			html.push('</li>');
		}
		self.html(html.join(''));
	},

	//倒计时
	showTimeout: function(i) {
		var $info = $('#getSmsBtn')[0],
			timer = setInterval(function() {
				$info.innerHTML = i + '秒';
				i--;
				if(i <= 0) {
					clearInterval(timer);
					$info.disabled = false;
					$info.innerHTML = '验证码';
				}
			}, 1e3)
	},

	//获取验证码
	getSmsVerify: function(mobile) {
		common.ajaxRequest({
			u: 'reg/creatcode.html?',
			d: {
				mobile: mobile
			}
		}, function(res) {
			$('#getSmsBtn')[0].disabled = true;
			WCY.showTimeout(59);
			common.layerMsg('发送成功！');
		})
	},

	//刷新
	reload: function() {
		setTimeout(function() {
			location.reload();
		}, 1e3)
	},

};

WCY.init();