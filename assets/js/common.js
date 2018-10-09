var common = (function() {
	//公共请求
	return {
		ajaxRequest: function(param, callback) {
			$.ajax({
				url: apiService + param.u + '&_t=' + new Date().getTime(),
				type: 'post',
				data: param.d,
				beforeSend: function(request) {
					request.setRequestHeader("AUTHORITY", common.getStorage('token'));
					if(param.l)
						common.layerLoading(param.l);
				},
				success: function(d) {
					//alert(d.code)
					//alert(d.message)
					if(param.l)
						layer.closeAll();
					if(d.code === '00000') {
						console.log(param.u, d);
						var token = d.result.token;
						if(token && token.indexOf('.') > 0) {
							common.setStorage('token', token);
						}
						var res = d.result.data;
						(typeof callback == 'function') && callback(res);
					} else if(d.code == 21818) {
						common.goLogin();
					} else if(d.code == 21919) {
						common.goSystemMaintaining();
					} else if(d.code == 22222) {
						common.authorizeFailed();
					} else {
						$('button[type="button"]').prop('disabled', false);
						if(d.code != 50051) {
							common.layerMsg(d.message);
						}
					}
				},
				error: function(xhr, type, errorThrown) {
					common.layerMsg('请求失败，' + xhr.status);
				}
			});
		},

		layerLoading: function(c) {
			layer.open({
				type: 2,
				content: c || '加载中',
				shadeClose: false
			});
		},

		layerMsg: function(msg) {
			layer.open({
				content: msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		},

		layerConfirm: function(options) {
			layer.open({
				title: [options.t || '提示', 'background-color: #eee;'],
				content: options.c || '确定继续操作！',
				btn: options.b || ['确认', '取消'],
				shadeClose: false,
				yes: options.y || function(index) {
					layer.close(index);
				},
				no: options.n || function() {
					layer.closeAll();
				}
			});
		},

		goLogin: function() {
			common.layerConfirm({
				c: '请登录系统！',
				y: function(i) {
					common.urlOpen('../shop/login.html?');
					layer.close(i);
				}
			});
		},

		//系统维护中
		goSystemMaintaining: function() {
			common.urlOpen('../shop/systemMaintenance.html?')
		},

		//授权失败
		authorizeFailed: function() {
			common.urlReplace('../shop/focusUs.html?')
		},

		urlOpen: function(str) {
			location.href = str + "&_t=" + new Date().getTime();
		},

		urlReplace: function(str) {
			location.replace(str + "&_t=" + new Date().getTime());
		},

		tabs: function(obj1, obj2, classname) {
			obj = $(obj1);
			obj.each(function(i) {
				obj.eq(i).on('tap', function() {
					$(this).addClass(classname).siblings().removeClass(classname);
					$(obj2).eq(i).show().siblings().hide();
				})
			})
		},

		scrollX: function(obj1, obj2, classname, i) {
			obj = $(obj1);
			obj.each(function() {
				obj.eq(i).addClass(classname).siblings().removeClass(classname);
				$(obj2).eq(i).show().siblings().hide();
			})
		},

		getStorage: function(key) {
			return localStorage.getItem(key);
		},

		setStorage: function(key, value) {
			localStorage.setItem(key, value);
		},

		removeStorage: function(key) {
			localStorage.removeItem(key);
		},

		checktime: function(i) {
			if(i < 10 && i != 0)
				i = "0" + i;
			else
				i = i;
			return i;
		},

		getQueryString: function(key) {
			var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
			var result = window.location.search.substr(1).match(reg);
			return result ? decodeURIComponent(result[2]) : null;
		},

		getParam: function(url) {
			var obj = {};
			if(url.indexOf('?') != -1) {
				var arr = url.split("?"),
					str = arr[1],
					arrs = str.split("&");
				for(var i = 0; i < arrs.length; i++) {
					obj[arrs[i].split("=")[0]] = decodeURIComponent(arrs[i].split("=")[1]);
				}
			}
			return obj;
		},

		mobileToStar: function(mobile) {
			var str = mobile.substring(0, 3) + "****" + mobile.substring(7, 11);
			return str;
		},

		strReplace: function(str) {
			var newStr = str.replace(/\A/g, ' ');
			return newStr;
		},

		//		serializeObject: function() {
		//			var obj = new Object();
		//			$.each(this.serializeArray(), function(index, param) {
		//				if(!(param.name in obj)) {
		//					obj[param.name] = param.value;
		//				}
		//			});
		//			return obj;
		//		},

		setCookie: function(name, value, time) {
			var exdate = new Date()
			exdate.setDate(exdate.getDate() + time)
			document.cookie = name + "=" + escape(value) + ((time == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
		},

		getCookie: function(name) {
			var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			if(arr = document.cookie.match(reg))
				return unescape(arr[2]);
			else
				return null;
		},

		delCookie: function(name) {
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval = common.getCookie(name);
			if(cval != null)
				document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
		},

		clearAllCookie: function() {
			var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
			if(keys) {
				for(var i = keys.length; i--;)
					document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString() + ";path=/";
			}
		},

		delOrIdCookie: function(name) {
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval = common.getCookie(name);
			if(cval != null)
				document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
		},

		getDate: function(str) {
			var Dt = new Date(parseInt(str, 10) * 1000);
			var H = Dt.getHours();
			var M = Dt.getMinutes();
			var S = Dt.getSeconds();
			return time = H + ':' + common.checktime(M);
			//return time = Dt.toLocaleString();
		},

		random: function() {
			return Math.random().toFixed(3) * 1000 + 100
		},

		addFly: function(event) {
			var offset = $('#shopCart').offset(),
				flyer = $('<span class="mui-icon mui-icon-extra mui-icon-extra-cart shopping-cart-fly"></span>');
			flyer.fly({
				start: {
					left: event.pageX - 30,
					top: event.pageY - 40,
					fontSize: '24'
				},
				end: {
					left: offset.left,
					top: offset.top,
					width: 33,
					height: 33
				},
				onEnd: function() {
					this.destory();
				}
			});
		}
	}
})();

jQuery.prototype.serializeObject = function() {
	var obj = new Object();
	$.each(this.serializeArray(), function(index, param) {
		if(!(param.name in obj)) {
			obj[param.name] = param.value;
		}
	});
	return obj;
};