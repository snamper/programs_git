var ua = window.navigator.userAgent;
var appVersion = /[a-zA-Z]/.test(ua.split(" ").pop()) ?
	"1.0.0" :
	ua.split(" ").pop();
var sysVersion = GetIOSVersion() || getAndroidVersion();

var couponId = getQueryString("couponId") || "";
var sex = 1; //男
var yourBornDate;
var yourBornDate;
var yourBornTime;
var sourceType;
var chn;
var IsStartPayConfig; //配置是否关闭支付  true-->屏蔽支付 false-->需支付 默认为false

function GetIOSVersion() {
	if (window.MSStream) {
		return false;
	}
	var match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
		version;
	if (match !== undefined && match !== null) {
		version = [
			parseInt(match[1], 10),
			parseInt(match[2] || 0, 10),
			parseInt(match[3] || 0, 10)
		];
		return version.join(".");
	}

	return false;
}

function getQueryString(name) {
	var reg = new RegExp("(^|&|;)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}

function getAndroidVersion() {
	ua = ua.toLowerCase();
	var match = ua.match(/android\s([0-9\.]*)/);
	return match ? parseFloat(match[1]) : false;
}
var browser = {
	isAndroid: function () {
		return navigator.userAgent.match(/Android/i) ? true : false;
	},
	isIOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	isWx: function () {
		return navigator.userAgent.match(/micromessenger/i) ? true : false;
	},
	isWp: function () {
		return ua.toLowerCase().indexOf("windows phone") > -1;
	},
	isWnl: function () {
		return ua.toLowerCase().indexOf("wnl") > -1;
	},
	getIOSVersion: function () {
		if (window.MSStream) {
			return false;
		}
		var match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
			version;
		if (match !== undefined && match !== null) {
			version = [
				parseInt(match[1], 10),
				parseInt(match[2], 10),
				parseInt(match[3] || 0, 10)
			];
			return parseFloat(version.join("."));
		}
		return false;
	}
};
if (browser.isIOS()) {
	sourceType = "Youloft_IOS";
} else if (browser.isAndroid()) {
	sourceType = "Youloft_Android";
} else {
	sourceType = "Others";
}
var isWanNianLi = /wnl/i.test(ua);
//信息提示
function drawToast(message) {
	var alert = document.getElementById("toast");
	if (alert.className.match(new RegExp("(\\s|^)" + "show" + "(\\s|$)"))) {
		return false;
	}
	alert.className = alert.className.replace("lines", "");
	alert.style.opacity = 0.8;
	alert.innerHTML = message;
	var temp_alert = document.getElementById("toast1");
	temp_alert.innerHTML = message;
	alert.className += "show";
	alert.style.marginLeft = "-" + temp_alert.offsetWidth / 2 + "px";
	intervalCounter = setTimeout(function () {
		alert.style.opacity = 0;
		clearInterval(intervalCounter);
	}, 1500);
	setTimeout(function () {
		alert.className = alert.className.replace("show", "");
	}, 2000);
}

$("#spBirthDate").focus(function () {
	document.activeElement.blur();
});

$(function () {
	var mySwiper = new Swiper(".swiper-container", {
		autoplay: 8000,
		pagination: ".swiper-pagination",
		speed: 300
	});

	/* 控件初始化 */
	$("#spBirthDate")
		.mobiscroll()
		.datePicker({
			theme: "ios",
			mode: "scroller",
			display: "bottom",
			lang: "zh",
			isSolar: 1,
			enableSolarLunar: 1,
			showSolarLunar: 0,
			enableIgnore: 0,
			defaultDate: "2011-03-10",
			minDate: new Date(1906, 0, 1),
			maxDate: new Date(2006, 0, 1)
		});
	$("#spBirthDate").mobiscroll("setArrayVal", [1990, 1, 1], !1, !1, !1, 0);
	//创建出生时间控件
	$("#bornTime")
		.mobiscroll()
		.select({
			theme: "ios",
			mode: "scroller",
			display: "bottom",
			lang: "zh"
		});
	$(".circleMask, circleMaskBackground").on("touchmove", function (e) {
		e.preventDefault();
	});

	/* 获取底部热门测算 */
	getHotCesuan();

	function getHotCesuan() {
		$.ajax({
			url: "//coco70.51wnl.com/numberologynew/BaseCeSuan/GetRelevantGoodsList?size=8&type=8",
			/* url: "//118.190.93.204:8032/numberologynew/BaseCeSuan/GetRelevantGoodsList?size=8&type=8", */
			type: "post",
			dataType: "json",
			contentType: "application/json;charset=utf-8",
			success: function (res) {
				if (res.data.length > 0) {
					// console.log("has data");
					var cesaunItemTemplate =
						'<a class="hot-cesuan-item" href="<%- itemUrl %>">\
						<div class="hot-cesuan-item-header">\
							<img src="<%- itemImg %>">\
						</div>\
						<div class="hot-cesuan-item-footer"><%- itemTitle %></div>\
					</a>';

					$.each(res.data, function () {
						var mkpItem = _.template(cesaunItemTemplate)({
							itemUrl: this.url + '&posId=' + posId,
							itemImg: this.img,
							itemTitle: this.title
						});
						$("#hotCesuanArea").append(mkpItem);
					});
					$(".hot-cesuan-area").removeClass("hidden");
					/* $(".hot-cesuan-item").on("click", function (e) {
						var url = e.currentTarget.dataset.url;
						console.log("url" + url);
						if (url.toLocaleLowerCase().indexOf("posid=") > -1) {
							// 如果配 posId
							// console.log("有 posId");
							// location.href = url.replace("&posId=[posId]", "") + "&posId=" + posId;
							console.log(url + '&tab=[TAB]');
							location.href = url + '&tab=[TAB]';
						} else {
							// 没有 posId;
							// console.log("没有 posId");
							console.log(url + "&tab=[TAB]&posId=" + posId);
							location.href = url + "&tab=[TAB]&posId=" + posId;
						}
					}); */
				} else {
					// console.log("has no data");
				}
			},
			error: function (res) {
				console.log("res=" + res);
			}
		});
	}

	//获取围观人数
	getUseCount();

	function getUseCount() {
		$.ajax({
			url: "//coco70.51wnl.com/numberologynew/NRLorder/GetUseCount?parterid=nrlorder",
			type: "post",
			dataType: "json",
			contentType: "application/json;charset=utf-8",
			beforeSend: function () {},
			success: function (res) {
				var useCountNum = res.data;
				useCountStr = "已有 " + useCountNum + "人解锁八字测算";
				$(".bzcsTestNum").text(useCountStr);
			},
			error: function (res) {
				console.log("res=" + res);
			}
		});
	}

	/* 底部按钮逻辑处理 */
	$(document).on("click", ".submitBottom", function () {
		yourName = $("#txtName")
			.val()
			.trim();
		yourBornDate = $("#spBirthDate")
			.val()
			.replace(/\s/g, "");
		if (yourName == "" || yourBornDate == "") {
			$("body").animate({
					scrollTop: 0
				},
				500
			);
		} else {
			$("#btnMeasure").trigger("click");
		}
	});

	/* 底部推广 */
	if (posId) {
		if (location.href.indexOf("posId=APP") > -1) {
			posId = getQueryString("posId") || getQueryString("posid");
		}
		if (posId.toLowerCase() == "[posid]") posId = "";
	}
	chn = getQueryString("chn") || getQueryString("CHN");
	if (chn && posId) {
		if (!browser.isWnl()) {
			$(".promotionBanner").show();
		}
	}
	$(document).on("click", ".promotionBanner", function () {
		location.href =
			"https://astro.51wnl.com/index.html#/numerology/home?posId=" +
			posId +
			"&chn=" +
			chn;
	});
	/* 底部按钮固定在底部 */
	window.onscroll = function () {
		$(".closeBanner").trigger("click");
		var topScroll = document.body.scrollTop; //滚动的距离,距离顶部的距离
		var scrollHeight = $("#btnMeasure").offset().top;
		scrollHeight = scrollHeight + 40;
		if (topScroll > scrollHeight) {
			if ($(".bottomSubmitFixed").hasClass("bottomSubmitFixedHidden")) {
				$(".bottomSubmitFixed").removeClass("bottomSubmitFixedHidden");
				$(".bottomSubmitFixed").css("opacity", 1);

				if (
					browser.isIOS() &&
					window.devicePixelRatio === 3 &&
					document.body.clientWidth === 375
				) {
					$(".wnl_history_btn").addClass(
						"wnl_history_btn_up_iphoneX"
					);
				} else {
					$(".wnl_history_btn").addClass("wnl_history_btn_up");
				}
			}
		} else {
			if (!$(".bottomSubmitFixed").hasClass("bottomSubmitFixedHidden")) {
				$(".bottomSubmitFixed").css("opacity", 0);
				$(".bottomSubmitFixed").addClass("bottomSubmitFixedHidden");
				if (
					browser.isIOS() &&
					window.devicePixelRatio === 3 &&
					document.body.clientWidth === 375
				) {
					$(".wnl_history_btn").removeClass(
						"wnl_history_btn_up_iphoneX"
					);
				} else {
					$(".wnl_history_btn").removeClass("wnl_history_btn_up");
				}
			}
		}
	};
	$(".sexSelect").click(function () {
		$(".sexIcon").removeClass("active");
		$(this)
			.find(".sexIcon")
			.addClass("active");
		if ($(this).hasClass("manSexSelect")) {
			sex = 1;
		} else if ($(this).hasClass("womanSexSelect")) {
			sex = 0;
		}
	});
	if (browser.isWnl()) {
		setTimeout(function () {
			location.href = "protocol://getuserinfo#userinfocallback";
		}, 0);
	}
	if (browser.isIOS()) {
		$(".bottomSubmitFixed").css({
			"background-color": "rgba(252, 251, 249, 0.8)"
		});
	}
	var isWorking = false;
	$("#btnMeasure").on("click", function () {
		/* if (isWorking) {
			return false;
		} */
		yourName = $("#txtName")
			.val()
			.trim();
		yourBornDate = $("#spBirthDate")
			.val()
			.replace(/\s/g, ""); //去掉用户输入的字符
		yourBornDate = yourBornDate
			.substr(2)
			.trim()
			.replace("年", "-")
			.replace("月", "-")
			.replace("日", "");
		var yourBornDate_year = yourBornDate.slice(0, 4);
		yourBornTime = $("#bornTime").val();
		var nowYear = new Date().getFullYear();
		if (yourBornTime == "不清楚出生时间") {
			yourBornTime = "12:00:00";
		}
		if (localStorage.getItem("trigger_flag") === "yes") {
			name = localStorage.getItem("trigger_yourName");
			bornDate = localStorage.getItem("trigger_yourBornDate");
			bornTime = localStorage.getItem("trigger_yourBornTime");
			localStorage.setItem("trigger_flag", "no");
		}

		//判断输入是否有特殊字符
		var reg = new RegExp(
			"[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
		);
		if (reg.test(yourName)) {
			isWorking = false;
			drawToast("请填写正确的姓名");
			return false;
		}
		if (yourName.match(/^[\u4e00-\u9fa5]+$/)) {
			if (yourName.length > 5) {
				isWorking = false;
				drawToast("请填写正确的姓名");
				return false;
			}
		} else {
			if (yourName.length > 10) {
				isWorking = false;
				drawToast("请填写正确的姓名");
				return false;
			}
		}
		if (yourName.length == 0) {
			isWorking = false;
			drawToast("请填写您的姓名");
			return false;
		}
		if (yourBornDate.length === 0) {
			isWorking = false;
			drawToast("请选择您的出生日期");
			return false;
		}
		if (
			nowYear - yourBornDate_year < 10 ||
			yourBornDate_year > nowYear ||
			nowYear - yourBornDate_year > 80
		) {
			drawToast("该出生年份无数据，请重新选择");
			return false;
		}
		/* if (browser.isWx()) {
			if (!openid) {
				localStorage.setItem('trigger_flag', 'yes');
				localStorage.setItem('trigger_name', yourName);
				localStorage.setItem('trigger_bornDate', yourBornDate);
				localStorage.setItem('trigger_bornTime', yourBornTime);
				location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + window.location.href;
			}
        } */
		if (posId) {
			if (posId.toLowerCase() == "app") IsStartPayConfig = false;
		} else IsStartPayConfig = false;
		creatOrder();
	});

	function creatOrder() {
		var jsonData = JSON.stringify({
			name: yourName,
			birth: yourBornDate + " " + yourBornTime,
			sex: sex,
			userId: userId,
			deviceId: deviceId,
			mac: mac,
			clientType: sourceType,
			posId: posId,
			boundId: boundId,
			Token: pushToken,
			pToken: pToken,
			GoodsID: "41DBA1789A644753A408CD78DAF79B00",
			IsStartPayConfig: IsStartPayConfig,
			ParterID: "NRLorder",
			HomePageUrl: "//mobile.51wnl.com/numberology/bzcs/bzcs_index.html?userId" +
				userId +
				"&deviceId=" +
				deviceId +
				"&mac=" +
				mac +
				"&imei=" +
				imei +
				"&idfa=" +
				idfa +
				"&channel=" +
				channel +
				"&boundId=" +
				boundId +
				"&pushToken=" +
				pushToken +
				"&pToken=" +
				pToken +
				"&posId=" +
				posId +
				"&couponId=" +
				couponId,
			DetailsUrl: "//mobile.51wnl.com/numberology/bzcs/bzcs_result.html?userId" +
				userId +
				"&deviceId=" +
				deviceId +
				"&mac=" +
				mac +
				"&imei=" +
				imei +
				"&idfa=" +
				idfa +
				"&channel=" +
				channel +
				"&boundId=" +
				boundId +
				"&pushToken=" +
				pushToken +
				"&pToken=" +
				pToken +
				"&posId=" +
				posId +
				"&couponId=" +
				couponId,
			UnPayUrl: "//mobile.51wnl.com/numberology/bzcs/bzcs_result.html?userId" +
				userId +
				"&deviceId=" +
				deviceId +
				"&mac=" +
				mac +
				"&imei=" +
				imei +
				"&idfa=" +
				idfa +
				"&channel=" +
				channel +
				"&boundId=" +
				boundId +
				"&pushToken=" +
				pushToken +
				"&pToken=" +
				pToken +
				"&posId=" +
				posId +
				"&couponId=" +
				couponId,
			imei: imei,
			idfa: idfa,
			sysVersion: sysVersion,
			appVersion: appVersion
		});
		$.ajax({
			url: "//coco70.51wnl.com/NumberologyNew/NRLorder/CreatejpOrder?",
			cache: false,
			type: "POST",
			dataType: "json",
			contentType: "application/json;charset=utf-8",
			data: jsonData,
			beforeSend: function () {
				$(".mask,.circleMask").removeClass("hidden");
				$(".maskImage,.maskContent").addClass("jumpOut");
			},
			success: function (res) {
				$(".mask,.circleMask").addClass("hidden");
				orderId = res.data;
				if (orderId == "") {
					drawToast("下单失败,请稍后重试");
				} else {
					location.href =
						"bzcs_result.html?userId=" +
						userId +
						"&deviceId=" +
						deviceId +
						"&mac=" +
						mac +
						"&imei=" +
						imei +
						"&idfa=" +
						idfa +
						"&channel=" +
						channel +
						"&boundId=" +
						boundId +
						"&pushToken=" +
						pushToken +
						"&pToken=" +
						pToken +
						"&posId=" +
						posId +
						"&couponId=" +
						couponId +
						"&orderId=" +
						orderId;
				}
			},
			error: function (res) {
				console.log("res=" + res);
			}
		});
	}
	$(".infoIntroContent").click(function () {
		$("#descModal").modal();
		$("body").addClass("noscroll");
	});
	$("#descModal").on("hide.bs.modal", function () {
		$("body").removeClass("noscroll");
	});
	if (getQueryString("share")) {
		$(".yiqiDesc").addClass("hidden");
		$(".wnlBannerLink").removeClass("hidden");
	}
	ua = navigator.userAgent.toLowerCase();
	var wnl = ua.indexOf("wnl") > -1;
	if (!wnl) {
		$(".wnlBanner").show();
	} else {
		$(".bzcsBottomHr01").css("margin-bottom", "60px");
		$(".bzcsBottomHrCopyright").removeClass("hidden");
		if (
			browser.isIOS() &&
			window.devicePixelRatio === 3 &&
			document.body.clientWidth === 375
		) {
			$(".copyrightIphoneX").css("margin-bottom", "50px");
			$(".copyright").removeClass("hidden");
		} else {
			$(".copyright").removeClass("hidden");
		}
	}
	if (
		browser.isIOS() &&
		window.devicePixelRatio === 3 &&
		document.body.clientWidth === 375
	) {
		$(".contactLine").css("margin-bottom", "108px");
	} else {
		$(".contactLine").css("margin-bottom", "110px");
	}
	if (browser.isWnl()) {
		$(".contactLine").css("margin-bottom", "30px");
	}
	$(".downloadBtn,.downloadBanner").click(function () {
		var ua = navigator.userAgent.toLocaleLowerCase();
		var wx = ua.indexOf("micromessenger") > -1;
		var isIOSPhone = ua.indexOf("iphone") > -1 || ua.indexOf("ipod") > -1;
		var isIOS = isIOSPhone || ua.indexOf("ipad") > -1;
		var isAndroid = ua.indexOf("android") > -1;
		if (wx) {
			location.href =
				"http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653";
		} else {
			if (isIOS) {
				location.href = "https://at.umeng.com/mKfiWn";
			} else if (isAndroid) {
				location.href = "http://cloud.51wnl.com/release-20484.apk";
			} else {
				location.href = "http://www.51wnl.com";
			}
		}
	});

	$(".wnl_history_btn").on("click", function () {
		_czc.push([
			"_trackEvent",
			"cs_history.C",
			"bzcs_index+click+cs_history"
		]);
	});

	/* 适配iphoneX */
	if (
		browser.isIOS() &&
		window.devicePixelRatio === 3 &&
		document.body.clientWidth === 375
	) {
		$(".bottomSubmitFixed").addClass("bottomSubmitFixedIphoneX");
		$(".wnlBanner").addClass("wnlBannerIphoneX");
		$(".iphoneXAdaptation").show();
	}
});

var textObj1, textObj;
var bornTime = "-1";
var originalAllObj;

function userinfocallback(result) {
	var originalString = Base64.decode(result);
	originalAllObj = JSON.parse(originalString);
	var originalObj =
		originalAllObj.bzcs ||
		originalAllObj.native_jryc ||
		originalAllObj.native_usercenter;
	if (originalObj.name && originalObj.name.length !== 0) {
		$(".nameTxt").val(originalObj.name);
	}
	if (originalObj.date && originalObj.date.length !== 0) {
		var year = originalObj.date.substring(0, 4),
			month = originalObj.date.substring(5, 7),
			day = originalObj.date.substring(8, 10);
		$("#spBirthDate").val(
			"公历 " + year + "年" + month + "月" + day + "日"
		);
		$("#spBirthDate").mobiscroll(
			"setArrayVal", [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1,
			0
		);
	}
	if (originalObj.time && originalObj.time.length !== 0) {
		var hour = originalObj.time.substr(0, 2);
		$("#ddlBirthHour").val(hour);
		$("#ddlBirthHour").trigger("change");
	}
	if (originalObj.sex !== undefined && parseInt(originalObj.sex) !== -1) {
		sex = parseInt(originalObj.sex);
		if (sex === 0) {
			$(".manSexSelect .sexIcon").removeClass("active");
			$(".womanSexSelect .sexIcon").addClass("active");
		} else {
			$(".manSexSelect .sexIcon").addClass("active");
			$(".womanSexSelect .sexIcon").removeClass("active");
		}
	}
	if (originalAllObj.native_score) {
		var native_score = originalAllObj.native_score;
		if (
			native_score.userId &&
			native_score.userId.length !== 0 &&
			userId.length === 0
		) {
			userId = native_score.userId;
		}
		if (
			native_score.deviceId &&
			native_score.deviceId.length !== 0 &&
			deviceId.length === 0
		) {
			deviceId = native_score.deviceId;
		}
	}
}

$(".sexSelect").click(function () {
	$(".sexIcon").removeClass("active");
	$(this)
		.find(".sexIcon")
		.addClass("active");
	if ($(this).hasClass("manSexSelect")) {
		sex = 1;
	} else if ($(this).hasClass("womanSexSelect")) {
		sex = 0;
	}
});

function str2Int(str) {
	str = str.replace(/^0+/g, "");
	if (str.length == 0) {
		return 0;
	}
	return parseInt(str);
}

function ylappCallback_back() {
	if (localStorage.getItem("old_bzcs_tag")) {
		localStorage.removeItem("old_bzcs_tag");
		document.location.href = "protocol://exit#";
		return 1;
	} else {
		return 0;
	}
}
