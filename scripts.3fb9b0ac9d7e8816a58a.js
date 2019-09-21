!function(t){"object"==typeof exports&&"undefined"!=typeof module?(module.exports=t(),module.exports.introJs=function(){return console.warn('Deprecated: please use require("intro.js") directly, instead of the introJs method of the function'),t().apply(this,arguments)}):"function"==typeof define&&define.amd?define([],t):("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).introJs=t()}(function(){function t(t){this._targetElement=t,this._introItems=[],this._options={nextLabel:"Next &rarr;",prevLabel:"&larr; Back",skipLabel:"Skip",doneLabel:"Done",hidePrev:!1,hideNext:!1,tooltipPosition:"bottom",tooltipClass:"",highlightClass:"",exitOnEsc:!0,exitOnOverlayClick:!0,showStepNumbers:!0,keyboardNavigation:!0,showButtons:!0,showBullets:!0,showProgress:!1,scrollToElement:!0,scrollTo:"element",scrollPadding:30,overlayOpacity:.8,positionPrecedence:["bottom","top","right","left"],disableInteraction:!1,helperElementPadding:10,hintPosition:"top-middle",hintButtonLabel:"Got it",hintAnimation:!0,buttonClass:"introjs-button"}}function e(){this.refresh.call(this)}function i(t){var e=null===t.code?t.which:t.code;if(null===e&&(e=null===t.charCode?t.keyCode:t.charCode),"Escape"!==e&&27!==e||!0!==this._options.exitOnEsc){if("ArrowLeft"===e||37===e)s.call(this);else if("ArrowRight"===e||39===e)o.call(this);else if("Enter"===e||13===e){var i=t.target||t.srcElement;i&&i.className.match("introjs-prevbutton")?s.call(this):i&&i.className.match("introjs-skipbutton")?(this._introItems.length-1===this._currentStep&&"function"==typeof this._introCompleteCallback&&this._introCompleteCallback.call(this),l.call(this,this._targetElement)):i&&i.getAttribute("data-stepnumber")?i.click():o.call(this),t.preventDefault?t.preventDefault():t.returnValue=!1}}else l.call(this,this._targetElement)}function n(t){if(null===t||"object"!=typeof t||void 0!==t.nodeType)return t;var e={};for(var i in t)e[i]=void 0!==window.jQuery&&t[i]instanceof window.jQuery?t[i]:n(t[i]);return e}function o(){this._direction="forward",void 0!==this._currentStepNumber&&b(this._introItems,(function(t,e){t.step===this._currentStepNumber&&(this._currentStep=e-1,this._currentStepNumber=void 0)}).bind(this)),void 0===this._currentStep?this._currentStep=0:++this._currentStep;var t=this._introItems[this._currentStep],e=!0;return void 0!==this._introBeforeChangeCallback&&(e=this._introBeforeChangeCallback.call(this,t.element)),!1===e?(--this._currentStep,!1):this._introItems.length<=this._currentStep?("function"==typeof this._introCompleteCallback&&this._introCompleteCallback.call(this),void l.call(this,this._targetElement)):void p.call(this,t)}function s(){if(this._direction="backward",0===this._currentStep)return!1;--this._currentStep;var t=this._introItems[this._currentStep],e=!0;if(void 0!==this._introBeforeChangeCallback&&(e=this._introBeforeChangeCallback.call(this,t.element)),!1===e)return++this._currentStep,!1;p.call(this,t)}function l(t,n){var o=!0;if(void 0!==this._introBeforeExitCallback&&(o=this._introBeforeExitCallback.call(this)),n||!1!==o){var s=t.querySelectorAll(".introjs-overlay");s&&s.length&&b(s,(function(t){t.style.opacity=0,window.setTimeout((function(){this.parentNode&&this.parentNode.removeChild(this)}).bind(t),500)}).bind(this));var l=t.querySelector(".introjs-helperLayer");l&&l.parentNode.removeChild(l);var r=t.querySelector(".introjs-tooltipReferenceLayer");r&&r.parentNode.removeChild(r);var a=t.querySelector(".introjs-disableInteraction");a&&a.parentNode.removeChild(a);var c=document.querySelector(".introjsFloatingElement");c&&c.parentNode.removeChild(c),m(),b(document.querySelectorAll(".introjs-fixParent"),function(t){w(t,/introjs-fixParent/g)}),v.off(window,"keydown",i,this,!0),v.off(window,"resize",e,this,!0),void 0!==this._introExitCallback&&this._introExitCallback.call(this),this._currentStep=void 0}}function r(t,e,i,n,o){var s,l,r,u,d;if(o=o||!1,e.style.top=null,e.style.right=null,e.style.bottom=null,e.style.left=null,e.style.marginLeft=null,e.style.marginTop=null,i.style.display="inherit",null!=n&&(n.style.top=null,n.style.left=null),this._introItems[this._currentStep])switch(e.className=("introjs-tooltip "+("string"==typeof(s=this._introItems[this._currentStep]).tooltipClass?s.tooltipClass:this._options.tooltipClass)).replace(/^\s+|\s+$/g,""),e.setAttribute("role","dialog"),"floating"!==(d=this._introItems[this._currentStep].position)&&(d=(function(t,e,i){var n=this._options.positionPrecedence.slice(),o=k(),s=q(e).height+10,l=q(e).width+20,r=t.getBoundingClientRect(),a="floating";r.bottom+s+s>o.height&&h(n,"bottom"),r.top-s<0&&h(n,"top"),r.right+l>o.width&&h(n,"right"),r.left-l<0&&h(n,"left");var c,u,d=-1!==(u=(c=i||"").indexOf("-"))?c.substr(u):"";return i&&(i=i.split("-")[0]),n.length&&(a="auto"!==i&&n.indexOf(i)>-1?i:n[0]),-1!==["top","bottom"].indexOf(a)&&(a+=function(t,e,i,n){var o=e/2,s=Math.min(i.width,window.screen.width),l=["-left-aligned","-middle-aligned","-right-aligned"];return s-t<e&&h(l,"-left-aligned"),(t<o||s-t<o)&&h(l,"-middle-aligned"),t<e&&h(l,"-right-aligned"),l.length?-1!==l.indexOf(n)?n:l[0]:"-middle-aligned"}(r.left,l,o,d)),a}).call(this,t,e,d)),r=q(t),l=q(e),u=k(),_(e,"introjs-"+d),d){case"top-right-aligned":i.className="introjs-arrow bottom-right";var p=0;c(r,p,l,e),e.style.bottom=r.height+20+"px";break;case"top-middle-aligned":i.className="introjs-arrow bottom-middle";var f=r.width/2-l.width/2;o&&(f+=5),c(r,f,l,e)&&(e.style.right=null,a(r,f,l,u,e)),e.style.bottom=r.height+20+"px";break;case"top-left-aligned":case"top":i.className="introjs-arrow bottom",a(r,o?0:15,l,u,e),e.style.bottom=r.height+20+"px";break;case"right":e.style.left=r.width+20+"px",r.top+l.height>u.height?(i.className="introjs-arrow left-bottom",e.style.top="-"+(l.height-r.height-20)+"px"):i.className="introjs-arrow left";break;case"left":o||!0!==this._options.showStepNumbers||(e.style.top="15px"),r.top+l.height>u.height?(e.style.top="-"+(l.height-r.height-20)+"px",i.className="introjs-arrow right-bottom"):i.className="introjs-arrow right",e.style.right=r.width+20+"px";break;case"floating":i.style.display="none",e.style.left="50%",e.style.top="50%",e.style.marginLeft="-"+l.width/2+"px",e.style.marginTop="-"+l.height/2+"px",null!=n&&(n.style.left="-"+(l.width/2+18)+"px",n.style.top="-"+(l.height/2+18)+"px");break;case"bottom-right-aligned":i.className="introjs-arrow top-right",c(r,p=0,l,e),e.style.top=r.height+20+"px";break;case"bottom-middle-aligned":i.className="introjs-arrow top-middle",f=r.width/2-l.width/2,o&&(f+=5),c(r,f,l,e)&&(e.style.right=null,a(r,f,l,u,e)),e.style.top=r.height+20+"px";break;default:i.className="introjs-arrow top",a(r,0,l,u,e),e.style.top=r.height+20+"px"}}function a(t,e,i,n,o){return t.left+e+i.width>n.width?(o.style.left=n.width-i.width-t.left+"px",!1):(o.style.left=e+"px",!0)}function c(t,e,i,n){return t.left+t.width-e-i.width<0?(n.style.left=-t.left+"px",!1):(n.style.right=e+"px",!0)}function h(t,e){t.indexOf(e)>-1&&t.splice(t.indexOf(e),1)}function u(t){if(t){if(!this._introItems[this._currentStep])return;var e=this._introItems[this._currentStep],i=q(e.element),n=this._options.helperElementPadding;j(e.element)?_(t,"introjs-fixedTooltip"):w(t,"introjs-fixedTooltip"),"floating"===e.position&&(n=0),t.style.cssText="width: "+(i.width+n)+"px; height:"+(i.height+n)+"px; top:"+(i.top-n/2)+"px;left: "+(i.left-n/2)+"px;"}}function d(t){t.setAttribute("role","button"),t.tabIndex=0}function p(t){void 0!==this._introChangeCallback&&this._introChangeCallback.call(this,t.element);var e,i,n,a,c=this,h=document.querySelector(".introjs-helperLayer"),p=document.querySelector(".introjs-tooltipReferenceLayer"),g="introjs-helperLayer";if("string"==typeof t.highlightClass&&(g+=" "+t.highlightClass),"string"==typeof this._options.highlightClass&&(g+=" "+this._options.highlightClass),null!==h){var y=p.querySelector(".introjs-helperNumberLayer"),v=p.querySelector(".introjs-tooltiptext"),j=p.querySelector(".introjs-arrow"),k=p.querySelector(".introjs-tooltip");if(n=p.querySelector(".introjs-skipbutton"),i=p.querySelector(".introjs-prevbutton"),e=p.querySelector(".introjs-nextbutton"),h.className=g,k.style.opacity=0,k.style.display="none",null!==y){var x=this._introItems[t.step-2>=0?t.step-2:0];(null!==x&&"forward"===this._direction&&"floating"===x.position||"backward"===this._direction&&"floating"===t.position)&&(y.style.opacity=0)}(a=B(t.element))!==document.body&&H(a,t.element),u.call(c,h),u.call(c,p),b(document.querySelectorAll(".introjs-fixParent"),function(t){w(t,/introjs-fixParent/g)}),m(),c._lastShowElementTimer&&window.clearTimeout(c._lastShowElementTimer),c._lastShowElementTimer=window.setTimeout(function(){null!==y&&(y.innerHTML=t.step),v.innerHTML=t.intro,k.style.display="block",r.call(c,t.element,k,j,y),c._options.showBullets&&(p.querySelector(".introjs-bullets li > a.active").className="",p.querySelector('.introjs-bullets li > a[data-stepnumber="'+t.step+'"]').className="active"),p.querySelector(".introjs-progress .introjs-progressbar").style.cssText="width:"+O.call(c)+"%;",p.querySelector(".introjs-progress .introjs-progressbar").setAttribute("aria-valuenow",O.call(c)),k.style.opacity=1,y&&(y.style.opacity=1),null!=n&&/introjs-donebutton/gi.test(n.className)?n.focus():null!=e&&e.focus(),f.call(c,t.scrollTo,t,v)},350)}else{var S=document.createElement("div"),E=document.createElement("div"),N=document.createElement("div"),A=document.createElement("div"),L=document.createElement("div"),T=document.createElement("div"),I=document.createElement("div"),P=document.createElement("div");S.className=g,E.className="introjs-tooltipReferenceLayer",(a=B(t.element))!==document.body&&H(a,t.element),u.call(c,S),u.call(c,E),this._targetElement.appendChild(S),this._targetElement.appendChild(E),N.className="introjs-arrow",L.className="introjs-tooltiptext",L.innerHTML=t.intro,T.className="introjs-bullets",!1===this._options.showBullets&&(T.style.display="none");var q=document.createElement("ul");q.setAttribute("role","tablist");var M=function(){c.goToStep(this.getAttribute("data-stepnumber"))};b(this._introItems,function(e,i){var n=document.createElement("li"),o=document.createElement("a");n.setAttribute("role","presentation"),o.setAttribute("role","tab"),o.onclick=M,i===t.step-1&&(o.className="active"),d(o),o.innerHTML="&nbsp;",o.setAttribute("data-stepnumber",e.step),n.appendChild(o),q.appendChild(n)}),T.appendChild(q),I.className="introjs-progress",!1===this._options.showProgress&&(I.style.display="none");var R=document.createElement("div");R.className="introjs-progressbar",R.setAttribute("role","progress"),R.setAttribute("aria-valuemin",0),R.setAttribute("aria-valuemax",100),R.setAttribute("aria-valuenow",O.call(this)),R.style.cssText="width:"+O.call(this)+"%;",I.appendChild(R),P.className="introjs-tooltipbuttons",!1===this._options.showButtons&&(P.style.display="none"),A.className="introjs-tooltip",A.appendChild(L),A.appendChild(T),A.appendChild(I);var V=document.createElement("span");!0===this._options.showStepNumbers&&(V.className="introjs-helperNumberLayer",V.innerHTML=t.step,E.appendChild(V)),A.appendChild(N),E.appendChild(A),(e=document.createElement("a")).onclick=function(){c._introItems.length-1!==c._currentStep&&o.call(c)},d(e),e.innerHTML=this._options.nextLabel,(i=document.createElement("a")).onclick=function(){0!==c._currentStep&&s.call(c)},d(i),i.innerHTML=this._options.prevLabel,(n=document.createElement("a")).className=this._options.buttonClass+" introjs-skipbutton ",d(n),n.innerHTML=this._options.skipLabel,n.onclick=function(){c._introItems.length-1===c._currentStep&&"function"==typeof c._introCompleteCallback&&c._introCompleteCallback.call(c),c._introItems.length-1!==c._currentStep&&"function"==typeof c._introExitCallback&&c._introExitCallback.call(c),"function"==typeof c._introSkipCallback&&c._introSkipCallback.call(c),l.call(c,c._targetElement)},P.appendChild(n),this._introItems.length>1&&(P.appendChild(i),P.appendChild(e)),A.appendChild(P),r.call(c,t.element,A,N,V),f.call(this,t.scrollTo,t,A)}var z=c._targetElement.querySelector(".introjs-disableInteraction");z&&z.parentNode.removeChild(z),t.disableInteraction&&(function(){var t=document.querySelector(".introjs-disableInteraction");null===t&&((t=document.createElement("div")).className="introjs-disableInteraction",this._targetElement.appendChild(t)),u.call(this,t)}).call(c),0===this._currentStep&&this._introItems.length>1?(null!=n&&(n.className=this._options.buttonClass+" introjs-skipbutton"),null!=e&&(e.className=this._options.buttonClass+" introjs-nextbutton"),!0===this._options.hidePrev?(null!=i&&(i.className=this._options.buttonClass+" introjs-prevbutton introjs-hidden"),null!=e&&_(e,"introjs-fullbutton")):null!=i&&(i.className=this._options.buttonClass+" introjs-prevbutton introjs-disabled"),null!=n&&(n.innerHTML=this._options.skipLabel)):this._introItems.length-1===this._currentStep||1===this._introItems.length?(null!=n&&(n.innerHTML=this._options.doneLabel,_(n,"introjs-donebutton")),null!=i&&(i.className=this._options.buttonClass+" introjs-prevbutton"),!0===this._options.hideNext?(null!=e&&(e.className=this._options.buttonClass+" introjs-nextbutton introjs-hidden"),null!=i&&_(i,"introjs-fullbutton")):null!=e&&(e.className=this._options.buttonClass+" introjs-nextbutton introjs-disabled")):(null!=n&&(n.className=this._options.buttonClass+" introjs-skipbutton"),null!=i&&(i.className=this._options.buttonClass+" introjs-prevbutton"),null!=e&&(e.className=this._options.buttonClass+" introjs-nextbutton"),null!=n&&(n.innerHTML=this._options.skipLabel)),i.setAttribute("role","button"),e.setAttribute("role","button"),n.setAttribute("role","button"),null!=e&&e.focus(),function(t){var e;if(t.element instanceof SVGElement)for(e=t.element.parentNode;null!==t.element.parentNode&&e.tagName&&"body"!==e.tagName.toLowerCase();)"svg"===e.tagName.toLowerCase()&&_(e,"introjs-showElement introjs-relativePosition"),e=e.parentNode;_(t.element,"introjs-showElement");var i=C(t.element,"position");for("absolute"!==i&&"relative"!==i&&"fixed"!==i&&_(t.element,"introjs-relativePosition"),e=t.element.parentNode;null!==e&&e.tagName&&"body"!==e.tagName.toLowerCase();){var n=C(e,"z-index"),o=parseFloat(C(e,"opacity")),s=C(e,"transform")||C(e,"-webkit-transform")||C(e,"-moz-transform")||C(e,"-ms-transform")||C(e,"-o-transform");(/[0-9]+/.test(n)||o<1||"none"!==s&&void 0!==s)&&_(e,"introjs-fixParent"),e=e.parentNode}}(t),void 0!==this._introAfterChangeCallback&&this._introAfterChangeCallback.call(this,t.element)}function f(t,e,i){var n;if("off"!==t&&this._options.scrollToElement&&(n="tooltip"===t?i.getBoundingClientRect():e.element.getBoundingClientRect(),!function(t){var i=e.element.getBoundingClientRect();return i.top>=0&&i.left>=0&&i.bottom+80<=window.innerHeight&&i.right<=window.innerWidth}())){var o=k().height;n.bottom-(n.bottom-n.top)<0||e.element.clientHeight>o?window.scrollBy(0,n.top-(o/2-n.height/2)-this._options.scrollPadding):window.scrollBy(0,n.top-(o/2-n.height/2)+this._options.scrollPadding)}}function m(){b(document.querySelectorAll(".introjs-showElement"),function(t){w(t,/introjs-[a-zA-Z]+/g)})}function b(t,e,i){if(t)for(var n=0,o=t.length;n<o;n++)e(t[n],n);"function"==typeof i&&i()}var g,y=(g={},function(t,e){return g[e=e||"introjs-stamp"]=g[e]||0,void 0===t[e]&&(t[e]=g[e]++),t[e]}),v=new function(){var t="introjs_event";this._id=function(t,e,i,n){return e+y(i)+(n?"_"+y(n):"")},this.on=function(e,i,n,o,s){var l=this._id.apply(this,arguments),r=function(t){return n.call(o||e,t||window.event)};"addEventListener"in e?e.addEventListener(i,r,s):"attachEvent"in e&&e.attachEvent("on"+i,r),e[t]=e[t]||{},e[t][l]=r},this.off=function(e,i,n,o,s){var l=this._id.apply(this,arguments),r=e[t]&&e[t][l];r&&("removeEventListener"in e?e.removeEventListener(i,r,s):"detachEvent"in e&&e.detachEvent("on"+i,r),e[t][l]=null)}};function _(t,e){if(t instanceof SVGElement){var i=t.getAttribute("class")||"";t.setAttribute("class",i+" "+e)}else void 0!==t.classList?b(e.split(" "),function(e){t.classList.add(e)}):t.className.match(e)||(t.className+=" "+e)}function w(t,e){if(t instanceof SVGElement){var i=t.getAttribute("class")||"";t.setAttribute("class",i.replace(e,"").replace(/^\s+|\s+$/g,""))}else t.className=t.className.replace(e,"").replace(/^\s+|\s+$/g,"")}function C(t,e){var i="";return t.currentStyle?i=t.currentStyle[e]:document.defaultView&&document.defaultView.getComputedStyle&&(i=document.defaultView.getComputedStyle(t,null).getPropertyValue(e)),i&&i.toLowerCase?i.toLowerCase():i}function j(t){var e=t.parentNode;return!(!e||"HTML"===e.nodeName)&&("fixed"===C(t,"position")||j(e))}function k(){if(void 0!==window.innerWidth)return{width:window.innerWidth,height:window.innerHeight};var t=document.documentElement;return{width:t.clientWidth,height:t.clientHeight}}function x(){var t=document.querySelector(".introjs-hintReference");if(t){var e=t.getAttribute("data-step");return t.parentNode.removeChild(t),e}}function S(t){if(this._introItems=[],this._options.hints)b(this._options.hints,(function(t){var e=n(t);"string"==typeof e.element&&(e.element=document.querySelector(e.element)),e.hintPosition=e.hintPosition||this._options.hintPosition,e.hintAnimation=e.hintAnimation||this._options.hintAnimation,null!==e.element&&this._introItems.push(e)}).bind(this));else{var e=t.querySelectorAll("*[data-hint]");if(!e||!e.length)return!1;b(e,(function(t){var e=t.getAttribute("data-hintanimation");e=e?"true"===e:this._options.hintAnimation,this._introItems.push({element:t,hint:t.getAttribute("data-hint"),hintPosition:t.getAttribute("data-hintposition")||this._options.hintPosition,hintAnimation:e,tooltipClass:t.getAttribute("data-tooltipclass"),position:t.getAttribute("data-position")||this._options.tooltipPosition})}).bind(this))}(function(){var t=this,e=document.querySelector(".introjs-hints");null===e&&((e=document.createElement("div")).className="introjs-hints"),b(this._introItems,(function(i,n){if(!document.querySelector('.introjs-hint[data-step="'+n+'"]')){var o=document.createElement("a");d(o),o.onclick=function(e){return function(i){var n=i||window.event;n.stopPropagation&&n.stopPropagation(),null!==n.cancelBubble&&(n.cancelBubble=!0),P.call(t,e)}}(n),o.className="introjs-hint",i.hintAnimation||_(o,"introjs-hint-no-anim"),j(i.element)&&_(o,"introjs-fixedhint");var s=document.createElement("div");s.className="introjs-hint-dot";var l=document.createElement("div");l.className="introjs-hint-pulse",o.appendChild(s),o.appendChild(l),o.setAttribute("data-step",n),i.targetElement=i.element,i.element=o,I.call(this,i.hintPosition,o,i.targetElement),e.appendChild(o)}}).bind(this)),document.body.appendChild(e),void 0!==this._hintsAddedCallback&&this._hintsAddedCallback.call(this)}).call(this),v.on(document,"click",x,this,!1),v.on(window,"resize",E,this,!0)}function E(){b(this._introItems,(function(t){void 0!==t.targetElement&&I.call(this,t.hintPosition,t.element,t.targetElement)}).bind(this))}function N(t){var e=document.querySelector(".introjs-hints");return e?e.querySelectorAll(t):[]}function A(t){var e=N('.introjs-hint[data-step="'+t+'"]')[0];x.call(this),e&&_(e,"introjs-hidehint"),void 0!==this._hintCloseCallback&&this._hintCloseCallback.call(this,t)}function L(t){var e=N('.introjs-hint[data-step="'+t+'"]')[0];e&&w(e,/introjs-hidehint/g)}function T(t){var e=N('.introjs-hint[data-step="'+t+'"]')[0];e&&e.parentNode.removeChild(e)}function I(t,e,i){var n=q.call(this,i);switch(t){default:case"top-left":e.style.left=n.left+"px",e.style.top=n.top+"px";break;case"top-right":e.style.left=n.left+n.width-20+"px",e.style.top=n.top+"px";break;case"bottom-left":e.style.left=n.left+"px",e.style.top=n.top+n.height-20+"px";break;case"bottom-right":e.style.left=n.left+n.width-20+"px",e.style.top=n.top+n.height-20+"px";break;case"middle-left":e.style.left=n.left+"px",e.style.top=n.top+(n.height-20)/2+"px";break;case"middle-right":e.style.left=n.left+n.width-20+"px",e.style.top=n.top+(n.height-20)/2+"px";break;case"middle-middle":e.style.left=n.left+(n.width-20)/2+"px",e.style.top=n.top+(n.height-20)/2+"px";break;case"bottom-middle":e.style.left=n.left+(n.width-20)/2+"px",e.style.top=n.top+n.height-20+"px";break;case"top-middle":e.style.left=n.left+(n.width-20)/2+"px",e.style.top=n.top+"px"}}function P(t){var e=document.querySelector('.introjs-hint[data-step="'+t+'"]'),i=this._introItems[t];void 0!==this._hintClickCallback&&this._hintClickCallback.call(this,e,i,t);var n=x.call(this);if(parseInt(n,10)!==t){var o=document.createElement("div"),s=document.createElement("div"),l=document.createElement("div"),a=document.createElement("div");o.className="introjs-tooltip",o.onclick=function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0},s.className="introjs-tooltiptext";var c=document.createElement("p");c.innerHTML=i.hint;var h=document.createElement("a");h.className=this._options.buttonClass,h.setAttribute("role","button"),h.innerHTML=this._options.hintButtonLabel,h.onclick=A.bind(this,t),s.appendChild(c),s.appendChild(h),l.className="introjs-arrow",o.appendChild(l),o.appendChild(s),this._currentStep=e.getAttribute("data-step"),a.className="introjs-tooltipReferenceLayer introjs-hintReference",a.setAttribute("data-step",e.getAttribute("data-step")),u.call(this,a),a.appendChild(o),document.body.appendChild(a),r.call(this,e,o,l,null,!0)}}function q(t){var e=document.body,i=document.documentElement,n=window.pageYOffset||i.scrollTop||e.scrollTop,o=window.pageXOffset||i.scrollLeft||e.scrollLeft,s=t.getBoundingClientRect();return{top:s.top+n,width:s.width,height:s.height,left:s.left+o}}function B(t){var e=window.getComputedStyle(t),i="absolute"===e.position,n=/(auto|scroll)/;if("fixed"===e.position)return document.body;for(var o=t;o=o.parentElement;)if(e=window.getComputedStyle(o),(!i||"static"!==e.position)&&n.test(e.overflow+e.overflowY+e.overflowX))return o;return document.body}function H(t,e){t.scrollTop=e.offsetTop-t.offsetTop}function O(){return parseInt(this._currentStep+1,10)/this._introItems.length*100}var M=function(e){var i;if("object"==typeof e)i=new t(e);else if("string"==typeof e){var n=document.querySelector(e);if(!n)throw new Error("There is no element with given selector.");i=new t(n)}else i=new t(document.body);return M.instances[y(i,"introjs-instance")]=i,i};return M.version="2.9.3",M.instances={},M.fn=t.prototype={clone:function(){return new t(this)},setOption:function(t,e){return this._options[t]=e,this},setOptions:function(t){return this._options=function(t,e){var i,n={};for(i in t)n[i]=t[i];for(i in e)n[i]=e[i];return n}(this._options,t),this},start:function(t){return(function(t,s){var r=t.querySelectorAll("*[data-intro]"),a=[];if(this._options.steps)b(this._options.steps,(function(t){var e=n(t);if(e.step=a.length+1,"string"==typeof e.element&&(e.element=document.querySelector(e.element)),null==e.element){var i=document.querySelector(".introjsFloatingElement");null===i&&((i=document.createElement("div")).className="introjsFloatingElement",document.body.appendChild(i)),e.element=i,e.position="floating"}e.scrollTo=e.scrollTo||this._options.scrollTo,void 0===e.disableInteraction&&(e.disableInteraction=this._options.disableInteraction),null!==e.element&&a.push(e)}).bind(this));else{var c;if(r.length<1)return!1;b(r,(function(t){if((!s||t.getAttribute("data-intro-group")===s)&&"none"!==t.style.display){var e=parseInt(t.getAttribute("data-step"),10);c=void 0!==t.getAttribute("data-disable-interaction")?!!t.getAttribute("data-disable-interaction"):this._options.disableInteraction,e>0&&(a[e-1]={element:t,intro:t.getAttribute("data-intro"),step:parseInt(t.getAttribute("data-step"),10),tooltipClass:t.getAttribute("data-tooltipclass"),highlightClass:t.getAttribute("data-highlightclass"),position:t.getAttribute("data-position")||this._options.tooltipPosition,scrollTo:t.getAttribute("data-scrollto")||this._options.scrollTo,disableInteraction:c})}}).bind(this));var h=0;b(r,(function(t){if((!s||t.getAttribute("data-intro-group")===s)&&null===t.getAttribute("data-step")){for(;void 0!==a[h];)h++;c=void 0!==t.getAttribute("data-disable-interaction")?!!t.getAttribute("data-disable-interaction"):this._options.disableInteraction,a[h]={element:t,intro:t.getAttribute("data-intro"),step:h+1,tooltipClass:t.getAttribute("data-tooltipclass"),highlightClass:t.getAttribute("data-highlightclass"),position:t.getAttribute("data-position")||this._options.tooltipPosition,scrollTo:t.getAttribute("data-scrollto")||this._options.scrollTo,disableInteraction:c}}}).bind(this))}for(var u=[],d=0;d<a.length;d++)a[d]&&u.push(a[d]);return(a=u).sort(function(t,e){return t.step-e.step}),this._introItems=a,(function(t){var e=document.createElement("div"),i="",n=this;if(e.className="introjs-overlay",t.tagName&&"body"!==t.tagName.toLowerCase()){var o=q(t);o&&(e.style.cssText=i+="width: "+o.width+"px; height:"+o.height+"px; top:"+o.top+"px;left: "+o.left+"px;")}else e.style.cssText=i+="top: 0;bottom: 0; left: 0;right: 0;position: fixed;";return t.appendChild(e),e.onclick=function(){!0===n._options.exitOnOverlayClick&&l.call(n,t)},window.setTimeout(function(){i+="opacity: "+n._options.overlayOpacity.toString()+";",e.style.cssText=i},10),!0}).call(this,t)&&(o.call(this),this._options.keyboardNavigation&&v.on(window,"keydown",i,this,!0),v.on(window,"resize",e,this,!0)),!1}).call(this,this._targetElement,t),this},goToStep:function(t){return(function(t){this._currentStep=t-2,void 0!==this._introItems&&o.call(this)}).call(this,t),this},addStep:function(t){return this._options.steps||(this._options.steps=[]),this._options.steps.push(t),this},addSteps:function(t){if(t.length){for(var e=0;e<t.length;e++)this.addStep(t[e]);return this}},goToStepNumber:function(t){return(function(t){this._currentStepNumber=t,void 0!==this._introItems&&o.call(this)}).call(this,t),this},nextStep:function(){return o.call(this),this},previousStep:function(){return s.call(this),this},exit:function(t){return l.call(this,this._targetElement,t),this},refresh:function(){return(function(){if(u.call(this,document.querySelector(".introjs-helperLayer")),u.call(this,document.querySelector(".introjs-tooltipReferenceLayer")),u.call(this,document.querySelector(".introjs-disableInteraction")),null!=this._currentStep){var t=document.querySelector(".introjs-helperNumberLayer"),e=document.querySelector(".introjs-arrow"),i=document.querySelector(".introjs-tooltip");r.call(this,this._introItems[this._currentStep].element,i,e,t)}return E.call(this),this}).call(this),this},onbeforechange:function(t){if("function"!=typeof t)throw new Error("Provided callback for onbeforechange was not a function");return this._introBeforeChangeCallback=t,this},onchange:function(t){if("function"!=typeof t)throw new Error("Provided callback for onchange was not a function.");return this._introChangeCallback=t,this},onafterchange:function(t){if("function"!=typeof t)throw new Error("Provided callback for onafterchange was not a function");return this._introAfterChangeCallback=t,this},oncomplete:function(t){if("function"!=typeof t)throw new Error("Provided callback for oncomplete was not a function.");return this._introCompleteCallback=t,this},onhintsadded:function(t){if("function"!=typeof t)throw new Error("Provided callback for onhintsadded was not a function.");return this._hintsAddedCallback=t,this},onhintclick:function(t){if("function"!=typeof t)throw new Error("Provided callback for onhintclick was not a function.");return this._hintClickCallback=t,this},onhintclose:function(t){if("function"!=typeof t)throw new Error("Provided callback for onhintclose was not a function.");return this._hintCloseCallback=t,this},onexit:function(t){if("function"!=typeof t)throw new Error("Provided callback for onexit was not a function.");return this._introExitCallback=t,this},onskip:function(t){if("function"!=typeof t)throw new Error("Provided callback for onskip was not a function.");return this._introSkipCallback=t,this},onbeforeexit:function(t){if("function"!=typeof t)throw new Error("Provided callback for onbeforeexit was not a function.");return this._introBeforeExitCallback=t,this},addHints:function(){return S.call(this,this._targetElement),this},hideHint:function(t){return A.call(this,t),this},hideHints:function(){return(function(){b(N(".introjs-hint"),(function(t){A.call(this,t.getAttribute("data-step"))}).bind(this))}).call(this),this},showHint:function(t){return L.call(this,t),this},showHints:function(){return(function(){var t=N(".introjs-hint");t&&t.length?b(t,(function(t){L.call(this,t.getAttribute("data-step"))}).bind(this)):S.call(this,this._targetElement)}).call(this),this},removeHints:function(){return(function(){b(N(".introjs-hint"),(function(t){T.call(this,t.getAttribute("data-step"))}).bind(this))}).call(this),this},removeHint:function(t){return T.call(this,t),this},showHintDialog:function(t){return P.call(this,t),this}},M});