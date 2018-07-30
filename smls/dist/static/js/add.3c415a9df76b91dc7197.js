webpackJsonp([3],{12:function(t,n){},13:function(t,n){},14:function(t,n){},15:function(t,n,o){(function(t){"function"!=typeof Object.create&&(Object.create=function(t){function n(){}return n.prototype=t,new n}),function(t,n,o,i){"use strict";var e={_positionClasses:["bottom-left","bottom-right","top-right","top-left","bottom-center","top-center","mid-center"],_defaultIcons:["success","error","info","warning"],init:function(n,o){this.prepareOptions(n,t.toast.options),this.process()},prepareOptions:function(n,o){var i={};"string"==typeof n||n instanceof Array?i.text=n:i=n,this.options=t.extend({},o,i)},process:function(){this.setup(),this.addToDom(),this.position(),this.bindToast(),this.animate()},setup:function(){var n="";if(this._toastEl=this._toastEl||t("<div></div>",{class:"jq-toast-single"}),n+='<span class="jq-toast-loader"></span>',this.options.allowToastClose&&(n+='<span class="close-jq-toast-single">&times;</span>'),this.options.text instanceof Array){this.options.heading&&(n+='<h2 class="jq-toast-heading">'+this.options.heading+"</h2>"),n+='<ul class="jq-toast-ul">';for(var o=0;o<this.options.text.length;o++)n+='<li class="jq-toast-li" id="jq-toast-item-'+o+'">'+this.options.text[o]+"</li>";n+="</ul>"}else this.options.heading&&(n+='<h2 class="jq-toast-heading">'+this.options.heading+"</h2>"),n+=this.options.text;this._toastEl.html(n),!1!==this.options.bgColor&&this._toastEl.css("background-color",this.options.bgColor),!1!==this.options.textColor&&this._toastEl.css("color",this.options.textColor),this.options.textAlign&&this._toastEl.css("text-align",this.options.textAlign),!1!==this.options.icon&&(this._toastEl.addClass("jq-has-icon"),-1!==t.inArray(this.options.icon,this._defaultIcons)&&this._toastEl.addClass("jq-icon-"+this.options.icon)),!1!==this.options.class&&this._toastEl.addClass(this.options.class)},position:function(){"string"==typeof this.options.position&&-1!==t.inArray(this.options.position,this._positionClasses)?"bottom-center"===this.options.position?this._container.css({left:t(n).outerWidth()/2-this._container.outerWidth()/2,bottom:20}):"top-center"===this.options.position?this._container.css({left:t(n).outerWidth()/2-this._container.outerWidth()/2,top:20}):"mid-center"===this.options.position?this._container.css({left:t(n).outerWidth()/2-this._container.outerWidth()/2,top:t(n).outerHeight()/2-this._container.outerHeight()/2-20}):this._container.addClass(this.options.position):"object"==typeof this.options.position?this._container.css({top:this.options.position.top?this.options.position.top:"auto",bottom:this.options.position.bottom?this.options.position.bottom:"auto",left:this.options.position.left?this.options.position.left:"auto",right:this.options.position.right?this.options.position.right:"auto"}):this._container.addClass("mid-center")},bindToast:function(){var t=this;this._toastEl.on("afterShown",function(){t.processLoader()}),this._toastEl.find(".close-jq-toast-single").on("click",function(n){n.preventDefault(),"fade"===t.options.showHideTransition?(t._toastEl.trigger("beforeHide"),t._toastEl.fadeOut(function(){t._toastEl.trigger("afterHidden")})):"slide"===t.options.showHideTransition?(t._toastEl.trigger("beforeHide"),t._toastEl.slideUp(function(){t._toastEl.trigger("afterHidden")})):(t._toastEl.trigger("beforeHide"),t._toastEl.hide(function(){t._toastEl.trigger("afterHidden")}))}),"function"==typeof this.options.beforeShow&&this._toastEl.on("beforeShow",function(){t.options.beforeShow(t._toastEl)}),"function"==typeof this.options.afterShown&&this._toastEl.on("afterShown",function(){t.options.afterShown(t._toastEl)}),"function"==typeof this.options.beforeHide&&this._toastEl.on("beforeHide",function(){t.options.beforeHide(t._toastEl)}),"function"==typeof this.options.afterHidden&&this._toastEl.on("afterHidden",function(){t.options.afterHidden(t._toastEl)}),"function"==typeof this.options.onClick&&this._toastEl.on("click",function(){t.options.onClick(t._toastEl)})},addToDom:function(){var n=t(".jq-toast-wrap");if(0===n.length?(n=t("<div></div>",{class:"jq-toast-wrap",role:"alert","aria-live":"polite"}),t("body").append(n)):this.options.stack&&!isNaN(parseInt(this.options.stack,10))||n.empty(),n.find(".jq-toast-single:hidden").remove(),n.append(this._toastEl),this.options.stack&&!isNaN(parseInt(this.options.stack),10)){var o=n.find(".jq-toast-single").length,i=o-this.options.stack;i>0&&t(".jq-toast-wrap").find(".jq-toast-single").slice(0,i).remove()}this._container=n},canAutoHide:function(){return!1!==this.options.hideAfter&&!isNaN(parseInt(this.options.hideAfter,10))},processLoader:function(){if(!this.canAutoHide()||!1===this.options.loader)return!1;var t=this._toastEl.find(".jq-toast-loader"),n=(this.options.hideAfter-400)/1e3+"s",o=this.options.loaderBg,i=t.attr("style")||"";i=i.substring(0,i.indexOf("-webkit-transition")),i+="-webkit-transition: width "+n+" ease-in;                       -o-transition: width "+n+" ease-in;                       transition: width "+n+" ease-in;                       background-color: "+o+";",t.attr("style",i).addClass("jq-toast-loaded")},animate:function(){var t=this;if(this._toastEl.hide(),this._toastEl.trigger("beforeShow"),"fade"===this.options.showHideTransition.toLowerCase()?this._toastEl.fadeIn(function(){t._toastEl.trigger("afterShown")}):"slide"===this.options.showHideTransition.toLowerCase()?this._toastEl.slideDown(function(){t._toastEl.trigger("afterShown")}):this._toastEl.show(function(){t._toastEl.trigger("afterShown")}),this.canAutoHide()){var t=this;n.setTimeout(function(){"fade"===t.options.showHideTransition.toLowerCase()?(t._toastEl.trigger("beforeHide"),t._toastEl.fadeOut(function(){t._toastEl.trigger("afterHidden")})):"slide"===t.options.showHideTransition.toLowerCase()?(t._toastEl.trigger("beforeHide"),t._toastEl.slideUp(function(){t._toastEl.trigger("afterHidden")})):(t._toastEl.trigger("beforeHide"),t._toastEl.hide(function(){t._toastEl.trigger("afterHidden")}))},this.options.hideAfter)}},reset:function(n){"all"===n?t(".jq-toast-wrap").remove():this._toastEl.remove()},update:function(t){this.prepareOptions(t,this.options),this.setup(),this.bindToast()},close:function(){this._toastEl.find(".close-jq-toast-single").click()}};t.toast=function(t){var n=Object.create(e);return n.init(t,this),{reset:function(t){n.reset(t)},update:function(t){n.update(t)},close:function(){n.close()}}},t.toast.options={text:"",heading:"",showHideTransition:"fade",allowToastClose:!1,hideAfter:800,loader:!1,loaderBg:"#9EC600",stack:5,position:"mid-center",bgColor:!1,textColor:!1,textAlign:"center",icon:!1,beforeShow:function(){},afterShown:function(){},beforeHide:function(){},afterHidden:function(){},onClick:function(){}}}(t,window,document)}).call(n,o(7))},156:function(t,n,o){"use strict";function i(t,n,o){var i=parseInt(t),e=parseInt(n-1),s=parseInt(o);return new Date(i,e,s).getTime()}n.a=i},22:function(t,n,o){"use strict";function i(t,n){return t.filter(n)[0]}function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(null===t||"object"!==(void 0===t?"undefined":x()(t)))return t;var o=i(n,function(n){return n.original===t});if(o)return o.copy;var s=Array.isArray(t)?[]:{};return n.push({original:t,copy:s}),y()(t).forEach(function(o){s[o]=e(t[o],n)}),s}function s(t){return null!==t&&"object"===(void 0===t?"undefined":x()(t))}function a(t){return 0===y()(t).length&&t.constructor===Object}function r(t){return t&&"function"==typeof t.then}function l(t){return"?"+y()(t).map(function(n){return encodeURIComponent(n)+"="+encodeURIComponent(t[n])}).join("&")}function c(t){if(0!==t.indexOf("http"))return!1;var n=t.indexOf("?")+1,o=t.substring(n,t.length),i={};if(0!==n){var e=o.split("&"),s=void 0;e.forEach(function(t){s=t.split("="),i[s[0]]=s[1]})}return 0!==v()(i).length&&i}function d(t){return t=t.toString(),t[1]?t:"0"+t}function u(t,n){var o={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};return/(y+)/.test(n)&&(n=n.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),o.keys(function(t){new RegExp("("+t+")").test(n)&&(n=n.replace(RegExp.$1,1===RegExp.$1.length?o[t]:("00"+o[t]).substr((""+o[t]).length)))}),n}function h(t){return t=t.replace(/^0+/g,""),0===t.length?0:parseInt(t)}function p(t){var n=0,o=0;return document.all?(n=t.currentStyle.height,o=parseInt(t.currentStyle.marginTop,10)+parseInt(t.currentStyle.marginBottom,10)+"px"):(n=document.defaultView.getComputedStyle(t,"").getPropertyValue("height").replace("px",""),o=parseInt(document.defaultView.getComputedStyle(t,"").getPropertyValue("margin-top"))+parseInt(document.defaultView.getComputedStyle(t,"").getPropertyValue("margin-bottom"))),Math.ceil(n+o)}function f(t){var n=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),o=window.location.search.substr(1).match(n)||window.location.hash.substr(1).match(n);return null!=o?decodeURIComponent(o[2]):null}function g(t,n,o){var i=null,e=null;return function(s){var a=+new Date;e||(e=a),o&&a-e>o?(t(s),e=a,clearTimeout(i)):(clearTimeout(i),i=setTimeout(function(){t(s),e=null},n))}}function m(t,n){var o=t.getTime(),i=n.getTime(),e=o-i;return Math.floor(e.toFixed(2)/864e5)}function w(t){var n="";return 0===t?n="今天":-1===t?n="明天":1===t?n="昨天":t<-1?n=Math.abs(t)+"天后":t>1&&(n=t+"天前"),n}function b(){if(window.devicePixelRatio&&devicePixelRatio>=2){var t=document.createElement("div");t.style.border=".5px solid transparent",document.body.appendChild(t),1===t.offsetHeight&&document.querySelector("html").classList.add("hairlines"),document.body.removeChild(t)}}var _=o(151),v=o.n(_),E=o(154),y=o.n(E),C=o(155),x=o.n(C),j=window.navigator.userAgent.toLowerCase(),S=/micromessenger/i.test(j),H=/wnl/i.test(j),I=parseInt(j.substr(j.indexOf("wnl ")+4,5).replace(/\./g,"")),O=j.substr(j.indexOf("wnl ")+4,5),q=function(){if(window.MSStream)return!1;var t=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);if(void 0!==t&&null!==t){var n=[parseInt(t[1],10),parseInt(t[2],10),parseInt(t[3]||0,10)];return parseFloat(n.join("."))}return!1}(),T=function(){var t=j.match(/android\s([0-9\.]*)/);return!!t&&parseFloat(t[1])}(),D=/android|htc/i.test(j)||(window.navigator.platform+"").match(/linux/i),A=!D&&/iPad/i.test(j),k=!D&&/iPod|iPhone/i.test(j),N=A||k,P=k&&375===window.innerWidth&&3===window.devicePixelRatio,V={isWnl:H,isWeixin:S,isIOS:N,isAndroid:D,appVersion:I,appVersionString:O,iOSVersion:q,androidVersion:T,isIphoneX:P,find:i,deepCopy:e,isObject:s,isEmptyObject:a,isPromise:r,jsonToQueryString:l,queryStringToJson:c,formatNumber:d,formatDate:u,str2Int:h,outHeight:p,getQueryValue:f,throttle:g,getDayDistance:m,getDayDistanceString:w,setHairlines:b};n.a=V},237:function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),function(t){function n(n,o){var i=void 0;t(document).on("touchend touchstart touchmove touchcancel",n,function(t){if("touchstart"===t.type)i=null,o.removeClass("hidden");else if("touchmove"===t.type){if(i)return;i=!0,o.addClass("hidden")}else{if(i)return;o.addClass("hidden")}})}var i=o(35),e=(o.n(i),o(43)),s=(o.n(e),o(47)),a=(o.n(s),o(48)),r=(o.n(a),o(49)),l=(o.n(r),o(50)),c=(o.n(l),o(51)),d=(o.n(c),o(52)),u=(o.n(d),o(53)),h=(o.n(u),o(54)),p=(o.n(h),o(55)),f=(o.n(p),o(57)),g=(o.n(f),o(58)),m=(o.n(g),o(59)),w=(o.n(m),o(60)),b=(o.n(w),o(61)),_=(o.n(b),o(62)),v=(o.n(_),o(63)),E=(o.n(v),o(64)),y=(o.n(E),o(65)),C=(o.n(y),o(66)),x=(o.n(C),o(67)),j=(o.n(x),o(68)),S=(o.n(j),o(69)),H=(o.n(S),o(70)),I=(o.n(H),o(71)),O=(o.n(I),o(72)),q=(o.n(O),o(73)),T=(o.n(q),o(74)),D=(o.n(T),o(75)),A=(o.n(D),o(76)),k=(o.n(A),o(77)),N=(o.n(k),o(78)),P=(o.n(N),o(79)),V=(o.n(P),o(80)),M=(o.n(V),o(81)),L=(o.n(M),o(82)),R=(o.n(L),o(83)),W=(o.n(R),o(84)),F=(o.n(W),o(85)),U=(o.n(F),o(86)),B=(o.n(U),o(87)),Y=(o.n(B),o(88)),$=(o.n(Y),o(89)),J=(o.n($),o(90)),Q=(o.n(J),o(91)),G=(o.n(Q),o(92)),X=(o.n(G),o(93)),z=(o.n(X),o(94)),K=(o.n(z),o(95)),Z=(o.n(K),o(96)),tt=(o.n(Z),o(97)),nt=(o.n(tt),o(98)),ot=(o.n(nt),o(99)),it=(o.n(ot),o(100)),et=(o.n(it),o(101)),st=(o.n(et),o(102)),at=(o.n(st),o(103)),rt=(o.n(at),o(104)),lt=(o.n(rt),o(105)),ct=(o.n(lt),o(106)),dt=(o.n(ct),o(24)),ut=(o.n(dt),o(107)),ht=(o.n(ut),o(108)),pt=(o.n(ht),o(109)),ft=(o.n(pt),o(110)),gt=(o.n(ft),o(111)),mt=(o.n(gt),o(112)),wt=(o.n(mt),o(113)),bt=(o.n(wt),o(114)),_t=(o.n(bt),o(115)),vt=(o.n(_t),o(116)),Et=(o.n(vt),o(117)),yt=(o.n(Et),o(118)),Ct=(o.n(yt),o(119)),xt=(o.n(Ct),o(120)),jt=(o.n(xt),o(121)),St=(o.n(jt),o(122)),Ht=(o.n(St),o(123)),It=(o.n(Ht),o(124)),Ot=(o.n(It),o(125)),qt=(o.n(Ot),o(126)),Tt=(o.n(qt),o(127)),Dt=(o.n(Tt),o(128)),At=(o.n(Dt),o(129)),kt=(o.n(At),o(130)),Nt=(o.n(kt),o(131)),Pt=(o.n(Nt),o(132)),Vt=(o.n(Pt),o(133)),Mt=(o.n(Vt),o(134)),Lt=(o.n(Mt),o(135)),Rt=(o.n(Lt),o(136)),Wt=(o.n(Rt),o(137)),Ft=(o.n(Wt),o(138)),Ut=(o.n(Ft),o(139)),Bt=(o.n(Ut),o(140)),Yt=(o.n(Bt),o(12)),$t=(o.n(Yt),o(13)),Jt=(o.n($t),o(14)),Qt=(o.n(Jt),o(15)),Gt=(o.n(Qt),o(254)),Xt=(o.n(Gt),o(22)),zt=o(156),Kt={dev:{add:"http://192.168.1.178:3000/mock/14/LifeNum/CreateOrder?tag=add"},pro:{add:"//coco70.51wnl.com/numberologynew/LifeNum/AddOrModifyUser?tag=add"}},Zt={title:"生命灵数",text:"超准的运势，快来看看你的吧",image:"https://qiniu.image.cq-wnl.com/content/20180509b4ac5bda312e4b85b6ededa7cd272368.jpg",imgUrl:"https://qiniu.image.cq-wnl.com/content/20180509b4ac5bda312e4b85b6ededa7cd272368.jpg",url:window.location.protocol+"//"+(window.location.host+window.location.pathname.replace("add","index"))};t(function(){var o=Xt.a.getQueryValue("deviceid");window.wnlui.wnlShare.setShareData(Zt),window.wnlui.wxShare(Zt);var i=Xt.a.isIOS?"iOS":"Android",e=Xt.a.isIOS?"Youloft_IOS":"Youloft_Android";t("#birthinput_text").on("focus",function(){t(this).removeClass("active")}),t(".birthinput").on("click",function(){t(".tip").addClass("slide"),new wnlui.datePicker({showLunar:!0,onChange:function(t){},onConfirm:function(n){if(n.isSolar){var o=n.dateObj,i=o.cYear+"."+Xt.a.formatNumber(o.cMonth)+"."+Xt.a.formatNumber(o.cDay);t(".birthinput_text").html(i)}else{var e=n.dateObj,s=e.cYear+"."+Xt.a.formatNumber(e.cMonth)+"."+Xt.a.formatNumber(e.cDay);t(".birthinput_text").html(s)}t(".birthinput_text").removeClass("active")},onCancel:function(){t(".tip").removeClass("slide")}})}),n(".comfirm",t(".addactive")),t(".comfirm").on("click",function(){var n=t("#name").val().trim().length,s=t(".birthinput_text").text().indexOf(".")>-1?1:0,a=t(".birthinput_text").text(),r={Name:encodeURIComponent(t("#name").val().trim()),CalendarType:1,userID:"",DeviceID:o||"test",ParterID:"wnl",ClientType:e,Channel:i,APPVersion:"1.0.0",GoodsID:"775F426CC9C245E4AEDF4DCFF68E817C",Birthday:t(".birthinput_text").text().split(".").join("-"),GLBirthDay:t(".birthinput_text").text().split(".").join("-"),img:1};Xt.a.getQueryValue("userlen")<=0?r.img=1:r.img=0,n<=0||s<=0?(t.toast().reset("all"),t.toast("请输入完整信息")):Object(zt.a)(a.split(".")[0],a.split(".")[1],a.split(".")[2])>(new Date).getTime()?(t.toast().reset("all"),t.toast("请选择正确的出生日期")):(t.toast().reset("all"),t.toast("信息提交中..."),t.ajax({url:Kt.pro.add,method:"post",ContentType:"application/json",data:r,success:function(n){0===JSON.parse(n).status?(t.toast().reset("all"),t.toast("添加成功"),window.location.href="./index.html?name="+t("#name").val()+"&birth="+r.GLBirthDay+"&orderid="+JSON.parse(n).data.data.orderID+"&add=1"):(t.toast().reset("all"),t.toast("添加失败"))},error:function(){t.toast().reset("all"),t.toast("数据出错")}}))})})}.call(n,o(7))},254:function(t,n){}},[237]);
//# sourceMappingURL=add.3c415a9df76b91dc7197.js.map