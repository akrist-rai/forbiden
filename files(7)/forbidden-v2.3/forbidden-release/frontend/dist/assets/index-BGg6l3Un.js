(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function Yy(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Gg={exports:{}},zc={},Wg={exports:{}},at={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ia=Symbol.for("react.element"),qy=Symbol.for("react.portal"),Ky=Symbol.for("react.fragment"),Jy=Symbol.for("react.strict_mode"),Zy=Symbol.for("react.profiler"),Qy=Symbol.for("react.provider"),e_=Symbol.for("react.context"),t_=Symbol.for("react.forward_ref"),n_=Symbol.for("react.suspense"),i_=Symbol.for("react.memo"),r_=Symbol.for("react.lazy"),Ip=Symbol.iterator;function s_(t){return t===null||typeof t!="object"?null:(t=Ip&&t[Ip]||t["@@iterator"],typeof t=="function"?t:null)}var Xg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},$g=Object.assign,Yg={};function go(t,e,n){this.props=t,this.context=e,this.refs=Yg,this.updater=n||Xg}go.prototype.isReactComponent={};go.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};go.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function qg(){}qg.prototype=go.prototype;function Xf(t,e,n){this.props=t,this.context=e,this.refs=Yg,this.updater=n||Xg}var $f=Xf.prototype=new qg;$f.constructor=Xf;$g($f,go.prototype);$f.isPureReactComponent=!0;var Dp=Array.isArray,Kg=Object.prototype.hasOwnProperty,Yf={current:null},Jg={key:!0,ref:!0,__self:!0,__source:!0};function Zg(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Kg.call(e,i)&&!Jg.hasOwnProperty(i)&&(r[i]=e[i]);var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];r.children=c}if(t&&t.defaultProps)for(i in l=t.defaultProps,l)r[i]===void 0&&(r[i]=l[i]);return{$$typeof:Ia,type:t,key:s,ref:o,props:r,_owner:Yf.current}}function o_(t,e){return{$$typeof:Ia,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function qf(t){return typeof t=="object"&&t!==null&&t.$$typeof===Ia}function a_(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Up=/\/+/g;function fu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?a_(""+t.key):e.toString(36)}function Bl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Ia:case qy:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+fu(o,0):i,Dp(r)?(n="",t!=null&&(n=t.replace(Up,"$&/")+"/"),Bl(r,e,n,"",function(u){return u})):r!=null&&(qf(r)&&(r=o_(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Up,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Dp(t))for(var l=0;l<t.length;l++){s=t[l];var c=i+fu(s,l);o+=Bl(s,e,n,c,r)}else if(c=s_(t),typeof c=="function")for(t=c.call(t),l=0;!(s=t.next()).done;)s=s.value,c=i+fu(s,l++),o+=Bl(s,e,n,c,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function qa(t,e,n){if(t==null)return t;var i=[],r=0;return Bl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function l_(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var gn={current:null},jl={transition:null},c_={ReactCurrentDispatcher:gn,ReactCurrentBatchConfig:jl,ReactCurrentOwner:Yf};function Qg(){throw Error("act(...) is not supported in production builds of React.")}at.Children={map:qa,forEach:function(t,e,n){qa(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return qa(t,function(){e++}),e},toArray:function(t){return qa(t,function(e){return e})||[]},only:function(t){if(!qf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};at.Component=go;at.Fragment=Ky;at.Profiler=Zy;at.PureComponent=Xf;at.StrictMode=Jy;at.Suspense=n_;at.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=c_;at.act=Qg;at.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=$g({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Yf.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(c in e)Kg.call(e,c)&&!Jg.hasOwnProperty(c)&&(i[c]=e[c]===void 0&&l!==void 0?l[c]:e[c])}var c=arguments.length-2;if(c===1)i.children=n;else if(1<c){l=Array(c);for(var u=0;u<c;u++)l[u]=arguments[u+2];i.children=l}return{$$typeof:Ia,type:t.type,key:r,ref:s,props:i,_owner:o}};at.createContext=function(t){return t={$$typeof:e_,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Qy,_context:t},t.Consumer=t};at.createElement=Zg;at.createFactory=function(t){var e=Zg.bind(null,t);return e.type=t,e};at.createRef=function(){return{current:null}};at.forwardRef=function(t){return{$$typeof:t_,render:t}};at.isValidElement=qf;at.lazy=function(t){return{$$typeof:r_,_payload:{_status:-1,_result:t},_init:l_}};at.memo=function(t,e){return{$$typeof:i_,type:t,compare:e===void 0?null:e}};at.startTransition=function(t){var e=jl.transition;jl.transition={};try{t()}finally{jl.transition=e}};at.unstable_act=Qg;at.useCallback=function(t,e){return gn.current.useCallback(t,e)};at.useContext=function(t){return gn.current.useContext(t)};at.useDebugValue=function(){};at.useDeferredValue=function(t){return gn.current.useDeferredValue(t)};at.useEffect=function(t,e){return gn.current.useEffect(t,e)};at.useId=function(){return gn.current.useId()};at.useImperativeHandle=function(t,e,n){return gn.current.useImperativeHandle(t,e,n)};at.useInsertionEffect=function(t,e){return gn.current.useInsertionEffect(t,e)};at.useLayoutEffect=function(t,e){return gn.current.useLayoutEffect(t,e)};at.useMemo=function(t,e){return gn.current.useMemo(t,e)};at.useReducer=function(t,e,n){return gn.current.useReducer(t,e,n)};at.useRef=function(t){return gn.current.useRef(t)};at.useState=function(t){return gn.current.useState(t)};at.useSyncExternalStore=function(t,e,n){return gn.current.useSyncExternalStore(t,e,n)};at.useTransition=function(){return gn.current.useTransition()};at.version="18.3.1";Wg.exports=at;var Kf=Wg.exports;const e0=Yy(Kf);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u_=Kf,d_=Symbol.for("react.element"),f_=Symbol.for("react.fragment"),h_=Object.prototype.hasOwnProperty,p_=u_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,m_={key:!0,ref:!0,__self:!0,__source:!0};function t0(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)h_.call(e,i)&&!m_.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:d_,type:t,key:s,ref:o,props:r,_owner:p_.current}}zc.Fragment=f_;zc.jsx=t0;zc.jsxs=t0;Gg.exports=zc;var a=Gg.exports,n0={exports:{}},Fn={},i0={exports:{}},r0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(I,W){var G=I.length;I.push(W);e:for(;0<G;){var fe=G-1>>>1,De=I[fe];if(0<r(De,W))I[fe]=W,I[G]=De,G=fe;else break e}}function n(I){return I.length===0?null:I[0]}function i(I){if(I.length===0)return null;var W=I[0],G=I.pop();if(G!==W){I[0]=G;e:for(var fe=0,De=I.length,Ye=De>>>1;fe<Ye;){var J=2*(fe+1)-1,ce=I[J],ve=J+1,ye=I[ve];if(0>r(ce,G))ve<De&&0>r(ye,ce)?(I[fe]=ye,I[ve]=G,fe=ve):(I[fe]=ce,I[J]=G,fe=J);else if(ve<De&&0>r(ye,G))I[fe]=ye,I[ve]=G,fe=ve;else break e}}return W}function r(I,W){var G=I.sortIndex-W.sortIndex;return G!==0?G:I.id-W.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var c=[],u=[],p=1,f=null,h=3,m=!1,y=!1,S=!1,g=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(I){for(var W=n(u);W!==null;){if(W.callback===null)i(u);else if(W.startTime<=I)i(u),W.sortIndex=W.expirationTime,e(c,W);else break;W=n(u)}}function b(I){if(S=!1,v(I),!y)if(n(c)!==null)y=!0,ae(L);else{var W=n(u);W!==null&&ne(b,W.startTime-I)}}function L(I,W){y=!1,S&&(S=!1,d(k),k=-1),m=!0;var G=h;try{for(v(W),f=n(c);f!==null&&(!(f.expirationTime>W)||I&&!B());){var fe=f.callback;if(typeof fe=="function"){f.callback=null,h=f.priorityLevel;var De=fe(f.expirationTime<=W);W=t.unstable_now(),typeof De=="function"?f.callback=De:f===n(c)&&i(c),v(W)}else i(c);f=n(c)}if(f!==null)var Ye=!0;else{var J=n(u);J!==null&&ne(b,J.startTime-W),Ye=!1}return Ye}finally{f=null,h=G,m=!1}}var R=!1,A=null,k=-1,w=5,M=-1;function B(){return!(t.unstable_now()-M<w)}function z(){if(A!==null){var I=t.unstable_now();M=I;var W=!0;try{W=A(!0,I)}finally{W?D():(R=!1,A=null)}}else R=!1}var D;if(typeof x=="function")D=function(){x(z)};else if(typeof MessageChannel<"u"){var U=new MessageChannel,ee=U.port2;U.port1.onmessage=z,D=function(){ee.postMessage(null)}}else D=function(){g(z,0)};function ae(I){A=I,R||(R=!0,D())}function ne(I,W){k=g(function(){I(t.unstable_now())},W)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(I){I.callback=null},t.unstable_continueExecution=function(){y||m||(y=!0,ae(L))},t.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):w=0<I?Math.floor(1e3/I):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(c)},t.unstable_next=function(I){switch(h){case 1:case 2:case 3:var W=3;break;default:W=h}var G=h;h=W;try{return I()}finally{h=G}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(I,W){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var G=h;h=I;try{return W()}finally{h=G}},t.unstable_scheduleCallback=function(I,W,G){var fe=t.unstable_now();switch(typeof G=="object"&&G!==null?(G=G.delay,G=typeof G=="number"&&0<G?fe+G:fe):G=fe,I){case 1:var De=-1;break;case 2:De=250;break;case 5:De=1073741823;break;case 4:De=1e4;break;default:De=5e3}return De=G+De,I={id:p++,callback:W,priorityLevel:I,startTime:G,expirationTime:De,sortIndex:-1},G>fe?(I.sortIndex=G,e(u,I),n(c)===null&&I===n(u)&&(S?(d(k),k=-1):S=!0,ne(b,G-fe))):(I.sortIndex=De,e(c,I),y||m||(y=!0,ae(L))),I},t.unstable_shouldYield=B,t.unstable_wrapCallback=function(I){var W=h;return function(){var G=h;h=W;try{return I.apply(this,arguments)}finally{h=G}}}})(r0);i0.exports=r0;var g_=i0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x_=Kf,kn=g_;function pe(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s0=new Set,da={};function us(t,e){oo(t,e),oo(t+"Capture",e)}function oo(t,e){for(da[t]=e,t=0;t<e.length;t++)s0.add(e[t])}var Vi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),pd=Object.prototype.hasOwnProperty,v_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Op={},kp={};function y_(t){return pd.call(kp,t)?!0:pd.call(Op,t)?!1:v_.test(t)?kp[t]=!0:(Op[t]=!0,!1)}function __(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function S_(t,e,n,i){if(e===null||typeof e>"u"||__(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function xn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var tn={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){tn[t]=new xn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];tn[e]=new xn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){tn[t]=new xn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){tn[t]=new xn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){tn[t]=new xn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){tn[t]=new xn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){tn[t]=new xn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){tn[t]=new xn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){tn[t]=new xn(t,5,!1,t.toLowerCase(),null,!1,!1)});var Jf=/[\-:]([a-z])/g;function Zf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Jf,Zf);tn[e]=new xn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Jf,Zf);tn[e]=new xn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Jf,Zf);tn[e]=new xn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){tn[t]=new xn(t,1,!1,t.toLowerCase(),null,!1,!1)});tn.xlinkHref=new xn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){tn[t]=new xn(t,1,!1,t.toLowerCase(),null,!0,!0)});function Qf(t,e,n,i){var r=tn.hasOwnProperty(e)?tn[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(S_(e,n,r,i)&&(n=null),i||r===null?y_(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ki=x_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ka=Symbol.for("react.element"),Fs=Symbol.for("react.portal"),zs=Symbol.for("react.fragment"),eh=Symbol.for("react.strict_mode"),md=Symbol.for("react.profiler"),o0=Symbol.for("react.provider"),a0=Symbol.for("react.context"),th=Symbol.for("react.forward_ref"),gd=Symbol.for("react.suspense"),xd=Symbol.for("react.suspense_list"),nh=Symbol.for("react.memo"),or=Symbol.for("react.lazy"),l0=Symbol.for("react.offscreen"),Fp=Symbol.iterator;function No(t){return t===null||typeof t!="object"?null:(t=Fp&&t[Fp]||t["@@iterator"],typeof t=="function"?t:null)}var Dt=Object.assign,hu;function $o(t){if(hu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);hu=e&&e[1]||""}return`
`+hu+t}var pu=!1;function mu(t,e){if(!t||pu)return"";pu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var i=u}Reflect.construct(t,[],e)}else{try{e.call()}catch(u){i=u}t.call(e.prototype)}else{try{throw Error()}catch(u){i=u}t()}}catch(u){if(u&&i&&typeof u.stack=="string"){for(var r=u.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,l=s.length-1;1<=o&&0<=l&&r[o]!==s[l];)l--;for(;1<=o&&0<=l;o--,l--)if(r[o]!==s[l]){if(o!==1||l!==1)do if(o--,l--,0>l||r[o]!==s[l]){var c=`
`+r[o].replace(" at new "," at ");return t.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",t.displayName)),c}while(1<=o&&0<=l);break}}}finally{pu=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?$o(t):""}function M_(t){switch(t.tag){case 5:return $o(t.type);case 16:return $o("Lazy");case 13:return $o("Suspense");case 19:return $o("SuspenseList");case 0:case 2:case 15:return t=mu(t.type,!1),t;case 11:return t=mu(t.type.render,!1),t;case 1:return t=mu(t.type,!0),t;default:return""}}function vd(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case zs:return"Fragment";case Fs:return"Portal";case md:return"Profiler";case eh:return"StrictMode";case gd:return"Suspense";case xd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case a0:return(t.displayName||"Context")+".Consumer";case o0:return(t._context.displayName||"Context")+".Provider";case th:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case nh:return e=t.displayName||null,e!==null?e:vd(t.type)||"Memo";case or:e=t._payload,t=t._init;try{return vd(t(e))}catch{}}return null}function E_(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return vd(e);case 8:return e===eh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function br(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function c0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function b_(t){var e=c0(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ja(t){t._valueTracker||(t._valueTracker=b_(t))}function u0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=c0(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function sc(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function yd(t,e){var n=e.checked;return Dt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function zp(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=br(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function d0(t,e){e=e.checked,e!=null&&Qf(t,"checked",e,!1)}function _d(t,e){d0(t,e);var n=br(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Sd(t,e.type,n):e.hasOwnProperty("defaultValue")&&Sd(t,e.type,br(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Bp(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Sd(t,e,n){(e!=="number"||sc(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Yo=Array.isArray;function Js(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+br(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Md(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(pe(91));return Dt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function jp(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(pe(92));if(Yo(n)){if(1<n.length)throw Error(pe(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:br(n)}}function f0(t,e){var n=br(e.value),i=br(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Hp(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function h0(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ed(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?h0(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Za,p0=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Za=Za||document.createElement("div"),Za.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Za.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function fa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var ea={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},w_=["Webkit","ms","Moz","O"];Object.keys(ea).forEach(function(t){w_.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),ea[e]=ea[t]})});function m0(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||ea.hasOwnProperty(t)&&ea[t]?(""+e).trim():e+"px"}function g0(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=m0(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var T_=Dt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function bd(t,e){if(e){if(T_[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(pe(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(pe(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(pe(61))}if(e.style!=null&&typeof e.style!="object")throw Error(pe(62))}}function wd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Td=null;function ih(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ad=null,Zs=null,Qs=null;function Vp(t){if(t=Oa(t)){if(typeof Ad!="function")throw Error(pe(280));var e=t.stateNode;e&&(e=Gc(e),Ad(t.stateNode,t.type,e))}}function x0(t){Zs?Qs?Qs.push(t):Qs=[t]:Zs=t}function v0(){if(Zs){var t=Zs,e=Qs;if(Qs=Zs=null,Vp(t),e)for(t=0;t<e.length;t++)Vp(e[t])}}function y0(t,e){return t(e)}function _0(){}var gu=!1;function S0(t,e,n){if(gu)return t(e,n);gu=!0;try{return y0(t,e,n)}finally{gu=!1,(Zs!==null||Qs!==null)&&(_0(),v0())}}function ha(t,e){var n=t.stateNode;if(n===null)return null;var i=Gc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(pe(231,e,typeof n));return n}var Cd=!1;if(Vi)try{var Lo={};Object.defineProperty(Lo,"passive",{get:function(){Cd=!0}}),window.addEventListener("test",Lo,Lo),window.removeEventListener("test",Lo,Lo)}catch{Cd=!1}function A_(t,e,n,i,r,s,o,l,c){var u=Array.prototype.slice.call(arguments,3);try{e.apply(n,u)}catch(p){this.onError(p)}}var ta=!1,oc=null,ac=!1,Rd=null,C_={onError:function(t){ta=!0,oc=t}};function R_(t,e,n,i,r,s,o,l,c){ta=!1,oc=null,A_.apply(C_,arguments)}function P_(t,e,n,i,r,s,o,l,c){if(R_.apply(this,arguments),ta){if(ta){var u=oc;ta=!1,oc=null}else throw Error(pe(198));ac||(ac=!0,Rd=u)}}function ds(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function M0(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Gp(t){if(ds(t)!==t)throw Error(pe(188))}function N_(t){var e=t.alternate;if(!e){if(e=ds(t),e===null)throw Error(pe(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Gp(r),t;if(s===i)return Gp(r),e;s=s.sibling}throw Error(pe(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,l=r.child;l;){if(l===n){o=!0,n=r,i=s;break}if(l===i){o=!0,i=r,n=s;break}l=l.sibling}if(!o){for(l=s.child;l;){if(l===n){o=!0,n=s,i=r;break}if(l===i){o=!0,i=s,n=r;break}l=l.sibling}if(!o)throw Error(pe(189))}}if(n.alternate!==i)throw Error(pe(190))}if(n.tag!==3)throw Error(pe(188));return n.stateNode.current===n?t:e}function E0(t){return t=N_(t),t!==null?b0(t):null}function b0(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=b0(t);if(e!==null)return e;t=t.sibling}return null}var w0=kn.unstable_scheduleCallback,Wp=kn.unstable_cancelCallback,L_=kn.unstable_shouldYield,I_=kn.unstable_requestPaint,Ft=kn.unstable_now,D_=kn.unstable_getCurrentPriorityLevel,rh=kn.unstable_ImmediatePriority,T0=kn.unstable_UserBlockingPriority,lc=kn.unstable_NormalPriority,U_=kn.unstable_LowPriority,A0=kn.unstable_IdlePriority,Bc=null,wi=null;function O_(t){if(wi&&typeof wi.onCommitFiberRoot=="function")try{wi.onCommitFiberRoot(Bc,t,void 0,(t.current.flags&128)===128)}catch{}}var di=Math.clz32?Math.clz32:z_,k_=Math.log,F_=Math.LN2;function z_(t){return t>>>=0,t===0?32:31-(k_(t)/F_|0)|0}var Qa=64,el=4194304;function qo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function cc(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~r;l!==0?i=qo(l):(s&=o,s!==0&&(i=qo(s)))}else o=n&~r,o!==0?i=qo(o):s!==0&&(i=qo(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-di(e),r=1<<n,i|=t[n],e&=~r;return i}function B_(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function j_(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-di(s),l=1<<o,c=r[o];c===-1?(!(l&n)||l&i)&&(r[o]=B_(l,e)):c<=e&&(t.expiredLanes|=l),s&=~l}}function Pd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function C0(){var t=Qa;return Qa<<=1,!(Qa&4194240)&&(Qa=64),t}function xu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Da(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-di(e),t[e]=n}function H_(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-di(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function sh(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-di(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var xt=0;function R0(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var P0,oh,N0,L0,I0,Nd=!1,tl=[],gr=null,xr=null,vr=null,pa=new Map,ma=new Map,cr=[],V_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Xp(t,e){switch(t){case"focusin":case"focusout":gr=null;break;case"dragenter":case"dragleave":xr=null;break;case"mouseover":case"mouseout":vr=null;break;case"pointerover":case"pointerout":pa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ma.delete(e.pointerId)}}function Io(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Oa(e),e!==null&&oh(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function G_(t,e,n,i,r){switch(e){case"focusin":return gr=Io(gr,t,e,n,i,r),!0;case"dragenter":return xr=Io(xr,t,e,n,i,r),!0;case"mouseover":return vr=Io(vr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return pa.set(s,Io(pa.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,ma.set(s,Io(ma.get(s)||null,t,e,n,i,r)),!0}return!1}function D0(t){var e=qr(t.target);if(e!==null){var n=ds(e);if(n!==null){if(e=n.tag,e===13){if(e=M0(n),e!==null){t.blockedOn=e,I0(t.priority,function(){N0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Hl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Ld(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Td=i,n.target.dispatchEvent(i),Td=null}else return e=Oa(n),e!==null&&oh(e),t.blockedOn=n,!1;e.shift()}return!0}function $p(t,e,n){Hl(t)&&n.delete(e)}function W_(){Nd=!1,gr!==null&&Hl(gr)&&(gr=null),xr!==null&&Hl(xr)&&(xr=null),vr!==null&&Hl(vr)&&(vr=null),pa.forEach($p),ma.forEach($p)}function Do(t,e){t.blockedOn===e&&(t.blockedOn=null,Nd||(Nd=!0,kn.unstable_scheduleCallback(kn.unstable_NormalPriority,W_)))}function ga(t){function e(r){return Do(r,t)}if(0<tl.length){Do(tl[0],t);for(var n=1;n<tl.length;n++){var i=tl[n];i.blockedOn===t&&(i.blockedOn=null)}}for(gr!==null&&Do(gr,t),xr!==null&&Do(xr,t),vr!==null&&Do(vr,t),pa.forEach(e),ma.forEach(e),n=0;n<cr.length;n++)i=cr[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<cr.length&&(n=cr[0],n.blockedOn===null);)D0(n),n.blockedOn===null&&cr.shift()}var eo=Ki.ReactCurrentBatchConfig,uc=!0;function X_(t,e,n,i){var r=xt,s=eo.transition;eo.transition=null;try{xt=1,ah(t,e,n,i)}finally{xt=r,eo.transition=s}}function $_(t,e,n,i){var r=xt,s=eo.transition;eo.transition=null;try{xt=4,ah(t,e,n,i)}finally{xt=r,eo.transition=s}}function ah(t,e,n,i){if(uc){var r=Ld(t,e,n,i);if(r===null)Au(t,e,i,dc,n),Xp(t,i);else if(G_(r,t,e,n,i))i.stopPropagation();else if(Xp(t,i),e&4&&-1<V_.indexOf(t)){for(;r!==null;){var s=Oa(r);if(s!==null&&P0(s),s=Ld(t,e,n,i),s===null&&Au(t,e,i,dc,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Au(t,e,i,null,n)}}var dc=null;function Ld(t,e,n,i){if(dc=null,t=ih(i),t=qr(t),t!==null)if(e=ds(t),e===null)t=null;else if(n=e.tag,n===13){if(t=M0(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return dc=t,null}function U0(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(D_()){case rh:return 1;case T0:return 4;case lc:case U_:return 16;case A0:return 536870912;default:return 16}default:return 16}}var fr=null,lh=null,Vl=null;function O0(){if(Vl)return Vl;var t,e=lh,n=e.length,i,r="value"in fr?fr.value:fr.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Vl=r.slice(t,1<i?1-i:void 0)}function Gl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function nl(){return!0}function Yp(){return!1}function zn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?nl:Yp,this.isPropagationStopped=Yp,this}return Dt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=nl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=nl)},persist:function(){},isPersistent:nl}),e}var xo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ch=zn(xo),Ua=Dt({},xo,{view:0,detail:0}),Y_=zn(Ua),vu,yu,Uo,jc=Dt({},Ua,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:uh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Uo&&(Uo&&t.type==="mousemove"?(vu=t.screenX-Uo.screenX,yu=t.screenY-Uo.screenY):yu=vu=0,Uo=t),vu)},movementY:function(t){return"movementY"in t?t.movementY:yu}}),qp=zn(jc),q_=Dt({},jc,{dataTransfer:0}),K_=zn(q_),J_=Dt({},Ua,{relatedTarget:0}),_u=zn(J_),Z_=Dt({},xo,{animationName:0,elapsedTime:0,pseudoElement:0}),Q_=zn(Z_),e1=Dt({},xo,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),t1=zn(e1),n1=Dt({},xo,{data:0}),Kp=zn(n1),i1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},r1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},s1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function o1(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=s1[t])?!!e[t]:!1}function uh(){return o1}var a1=Dt({},Ua,{key:function(t){if(t.key){var e=i1[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Gl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?r1[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:uh,charCode:function(t){return t.type==="keypress"?Gl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Gl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),l1=zn(a1),c1=Dt({},jc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Jp=zn(c1),u1=Dt({},Ua,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:uh}),d1=zn(u1),f1=Dt({},xo,{propertyName:0,elapsedTime:0,pseudoElement:0}),h1=zn(f1),p1=Dt({},jc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),m1=zn(p1),g1=[9,13,27,32],dh=Vi&&"CompositionEvent"in window,na=null;Vi&&"documentMode"in document&&(na=document.documentMode);var x1=Vi&&"TextEvent"in window&&!na,k0=Vi&&(!dh||na&&8<na&&11>=na),Zp=" ",Qp=!1;function F0(t,e){switch(t){case"keyup":return g1.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function z0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Bs=!1;function v1(t,e){switch(t){case"compositionend":return z0(e);case"keypress":return e.which!==32?null:(Qp=!0,Zp);case"textInput":return t=e.data,t===Zp&&Qp?null:t;default:return null}}function y1(t,e){if(Bs)return t==="compositionend"||!dh&&F0(t,e)?(t=O0(),Vl=lh=fr=null,Bs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return k0&&e.locale!=="ko"?null:e.data;default:return null}}var _1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function em(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!_1[t.type]:e==="textarea"}function B0(t,e,n,i){x0(i),e=fc(e,"onChange"),0<e.length&&(n=new ch("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var ia=null,xa=null;function S1(t){J0(t,0)}function Hc(t){var e=Vs(t);if(u0(e))return t}function M1(t,e){if(t==="change")return e}var j0=!1;if(Vi){var Su;if(Vi){var Mu="oninput"in document;if(!Mu){var tm=document.createElement("div");tm.setAttribute("oninput","return;"),Mu=typeof tm.oninput=="function"}Su=Mu}else Su=!1;j0=Su&&(!document.documentMode||9<document.documentMode)}function nm(){ia&&(ia.detachEvent("onpropertychange",H0),xa=ia=null)}function H0(t){if(t.propertyName==="value"&&Hc(xa)){var e=[];B0(e,xa,t,ih(t)),S0(S1,e)}}function E1(t,e,n){t==="focusin"?(nm(),ia=e,xa=n,ia.attachEvent("onpropertychange",H0)):t==="focusout"&&nm()}function b1(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Hc(xa)}function w1(t,e){if(t==="click")return Hc(e)}function T1(t,e){if(t==="input"||t==="change")return Hc(e)}function A1(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var pi=typeof Object.is=="function"?Object.is:A1;function va(t,e){if(pi(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!pd.call(e,r)||!pi(t[r],e[r]))return!1}return!0}function im(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function rm(t,e){var n=im(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=im(n)}}function V0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?V0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function G0(){for(var t=window,e=sc();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=sc(t.document)}return e}function fh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function C1(t){var e=G0(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&V0(n.ownerDocument.documentElement,n)){if(i!==null&&fh(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=rm(n,s);var o=rm(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var R1=Vi&&"documentMode"in document&&11>=document.documentMode,js=null,Id=null,ra=null,Dd=!1;function sm(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Dd||js==null||js!==sc(i)||(i=js,"selectionStart"in i&&fh(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ra&&va(ra,i)||(ra=i,i=fc(Id,"onSelect"),0<i.length&&(e=new ch("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=js)))}function il(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Hs={animationend:il("Animation","AnimationEnd"),animationiteration:il("Animation","AnimationIteration"),animationstart:il("Animation","AnimationStart"),transitionend:il("Transition","TransitionEnd")},Eu={},W0={};Vi&&(W0=document.createElement("div").style,"AnimationEvent"in window||(delete Hs.animationend.animation,delete Hs.animationiteration.animation,delete Hs.animationstart.animation),"TransitionEvent"in window||delete Hs.transitionend.transition);function Vc(t){if(Eu[t])return Eu[t];if(!Hs[t])return t;var e=Hs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in W0)return Eu[t]=e[n];return t}var X0=Vc("animationend"),$0=Vc("animationiteration"),Y0=Vc("animationstart"),q0=Vc("transitionend"),K0=new Map,om="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ar(t,e){K0.set(t,e),us(e,[t])}for(var bu=0;bu<om.length;bu++){var wu=om[bu],P1=wu.toLowerCase(),N1=wu[0].toUpperCase()+wu.slice(1);Ar(P1,"on"+N1)}Ar(X0,"onAnimationEnd");Ar($0,"onAnimationIteration");Ar(Y0,"onAnimationStart");Ar("dblclick","onDoubleClick");Ar("focusin","onFocus");Ar("focusout","onBlur");Ar(q0,"onTransitionEnd");oo("onMouseEnter",["mouseout","mouseover"]);oo("onMouseLeave",["mouseout","mouseover"]);oo("onPointerEnter",["pointerout","pointerover"]);oo("onPointerLeave",["pointerout","pointerover"]);us("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));us("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));us("onBeforeInput",["compositionend","keypress","textInput","paste"]);us("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));us("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));us("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ko="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),L1=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ko));function am(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,P_(i,e,void 0,t),t.currentTarget=null}function J0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var l=i[o],c=l.instance,u=l.currentTarget;if(l=l.listener,c!==s&&r.isPropagationStopped())break e;am(r,l,u),s=c}else for(o=0;o<i.length;o++){if(l=i[o],c=l.instance,u=l.currentTarget,l=l.listener,c!==s&&r.isPropagationStopped())break e;am(r,l,u),s=c}}}if(ac)throw t=Rd,ac=!1,Rd=null,t}function wt(t,e){var n=e[zd];n===void 0&&(n=e[zd]=new Set);var i=t+"__bubble";n.has(i)||(Z0(e,t,2,!1),n.add(i))}function Tu(t,e,n){var i=0;e&&(i|=4),Z0(n,t,i,e)}var rl="_reactListening"+Math.random().toString(36).slice(2);function ya(t){if(!t[rl]){t[rl]=!0,s0.forEach(function(n){n!=="selectionchange"&&(L1.has(n)||Tu(n,!1,t),Tu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[rl]||(e[rl]=!0,Tu("selectionchange",!1,e))}}function Z0(t,e,n,i){switch(U0(e)){case 1:var r=X_;break;case 4:r=$_;break;default:r=ah}n=r.bind(null,e,n,t),r=void 0,!Cd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Au(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var l=i.stateNode.containerInfo;if(l===r||l.nodeType===8&&l.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===r||c.nodeType===8&&c.parentNode===r))return;o=o.return}for(;l!==null;){if(o=qr(l),o===null)return;if(c=o.tag,c===5||c===6){i=s=o;continue e}l=l.parentNode}}i=i.return}S0(function(){var u=s,p=ih(n),f=[];e:{var h=K0.get(t);if(h!==void 0){var m=ch,y=t;switch(t){case"keypress":if(Gl(n)===0)break e;case"keydown":case"keyup":m=l1;break;case"focusin":y="focus",m=_u;break;case"focusout":y="blur",m=_u;break;case"beforeblur":case"afterblur":m=_u;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=qp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=K_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=d1;break;case X0:case $0:case Y0:m=Q_;break;case q0:m=h1;break;case"scroll":m=Y_;break;case"wheel":m=m1;break;case"copy":case"cut":case"paste":m=t1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=Jp}var S=(e&4)!==0,g=!S&&t==="scroll",d=S?h!==null?h+"Capture":null:h;S=[];for(var x=u,v;x!==null;){v=x;var b=v.stateNode;if(v.tag===5&&b!==null&&(v=b,d!==null&&(b=ha(x,d),b!=null&&S.push(_a(x,b,v)))),g)break;x=x.return}0<S.length&&(h=new m(h,y,null,n,p),f.push({event:h,listeners:S}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",h&&n!==Td&&(y=n.relatedTarget||n.fromElement)&&(qr(y)||y[Gi]))break e;if((m||h)&&(h=p.window===p?p:(h=p.ownerDocument)?h.defaultView||h.parentWindow:window,m?(y=n.relatedTarget||n.toElement,m=u,y=y?qr(y):null,y!==null&&(g=ds(y),y!==g||y.tag!==5&&y.tag!==6)&&(y=null)):(m=null,y=u),m!==y)){if(S=qp,b="onMouseLeave",d="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(S=Jp,b="onPointerLeave",d="onPointerEnter",x="pointer"),g=m==null?h:Vs(m),v=y==null?h:Vs(y),h=new S(b,x+"leave",m,n,p),h.target=g,h.relatedTarget=v,b=null,qr(p)===u&&(S=new S(d,x+"enter",y,n,p),S.target=v,S.relatedTarget=g,b=S),g=b,m&&y)t:{for(S=m,d=y,x=0,v=S;v;v=Ss(v))x++;for(v=0,b=d;b;b=Ss(b))v++;for(;0<x-v;)S=Ss(S),x--;for(;0<v-x;)d=Ss(d),v--;for(;x--;){if(S===d||d!==null&&S===d.alternate)break t;S=Ss(S),d=Ss(d)}S=null}else S=null;m!==null&&lm(f,h,m,S,!1),y!==null&&g!==null&&lm(f,g,y,S,!0)}}e:{if(h=u?Vs(u):window,m=h.nodeName&&h.nodeName.toLowerCase(),m==="select"||m==="input"&&h.type==="file")var L=M1;else if(em(h))if(j0)L=T1;else{L=b1;var R=E1}else(m=h.nodeName)&&m.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(L=w1);if(L&&(L=L(t,u))){B0(f,L,n,p);break e}R&&R(t,h,u),t==="focusout"&&(R=h._wrapperState)&&R.controlled&&h.type==="number"&&Sd(h,"number",h.value)}switch(R=u?Vs(u):window,t){case"focusin":(em(R)||R.contentEditable==="true")&&(js=R,Id=u,ra=null);break;case"focusout":ra=Id=js=null;break;case"mousedown":Dd=!0;break;case"contextmenu":case"mouseup":case"dragend":Dd=!1,sm(f,n,p);break;case"selectionchange":if(R1)break;case"keydown":case"keyup":sm(f,n,p)}var A;if(dh)e:{switch(t){case"compositionstart":var k="onCompositionStart";break e;case"compositionend":k="onCompositionEnd";break e;case"compositionupdate":k="onCompositionUpdate";break e}k=void 0}else Bs?F0(t,n)&&(k="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(k="onCompositionStart");k&&(k0&&n.locale!=="ko"&&(Bs||k!=="onCompositionStart"?k==="onCompositionEnd"&&Bs&&(A=O0()):(fr=p,lh="value"in fr?fr.value:fr.textContent,Bs=!0)),R=fc(u,k),0<R.length&&(k=new Kp(k,t,null,n,p),f.push({event:k,listeners:R}),A?k.data=A:(A=z0(n),A!==null&&(k.data=A)))),(A=x1?v1(t,n):y1(t,n))&&(u=fc(u,"onBeforeInput"),0<u.length&&(p=new Kp("onBeforeInput","beforeinput",null,n,p),f.push({event:p,listeners:u}),p.data=A))}J0(f,e)})}function _a(t,e,n){return{instance:t,listener:e,currentTarget:n}}function fc(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=ha(t,n),s!=null&&i.unshift(_a(t,s,r)),s=ha(t,e),s!=null&&i.push(_a(t,s,r))),t=t.return}return i}function Ss(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function lm(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var l=n,c=l.alternate,u=l.stateNode;if(c!==null&&c===i)break;l.tag===5&&u!==null&&(l=u,r?(c=ha(n,s),c!=null&&o.unshift(_a(n,c,l))):r||(c=ha(n,s),c!=null&&o.push(_a(n,c,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var I1=/\r\n?/g,D1=/\u0000|\uFFFD/g;function cm(t){return(typeof t=="string"?t:""+t).replace(I1,`
`).replace(D1,"")}function sl(t,e,n){if(e=cm(e),cm(t)!==e&&n)throw Error(pe(425))}function hc(){}var Ud=null,Od=null;function kd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Fd=typeof setTimeout=="function"?setTimeout:void 0,U1=typeof clearTimeout=="function"?clearTimeout:void 0,um=typeof Promise=="function"?Promise:void 0,O1=typeof queueMicrotask=="function"?queueMicrotask:typeof um<"u"?function(t){return um.resolve(null).then(t).catch(k1)}:Fd;function k1(t){setTimeout(function(){throw t})}function Cu(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),ga(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);ga(e)}function yr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function dm(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var vo=Math.random().toString(36).slice(2),Si="__reactFiber$"+vo,Sa="__reactProps$"+vo,Gi="__reactContainer$"+vo,zd="__reactEvents$"+vo,F1="__reactListeners$"+vo,z1="__reactHandles$"+vo;function qr(t){var e=t[Si];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Gi]||n[Si]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=dm(t);t!==null;){if(n=t[Si])return n;t=dm(t)}return e}t=n,n=t.parentNode}return null}function Oa(t){return t=t[Si]||t[Gi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Vs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(pe(33))}function Gc(t){return t[Sa]||null}var Bd=[],Gs=-1;function Cr(t){return{current:t}}function At(t){0>Gs||(t.current=Bd[Gs],Bd[Gs]=null,Gs--)}function Mt(t,e){Gs++,Bd[Gs]=t.current,t.current=e}var wr={},ln=Cr(wr),bn=Cr(!1),ns=wr;function ao(t,e){var n=t.type.contextTypes;if(!n)return wr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function wn(t){return t=t.childContextTypes,t!=null}function pc(){At(bn),At(ln)}function fm(t,e,n){if(ln.current!==wr)throw Error(pe(168));Mt(ln,e),Mt(bn,n)}function Q0(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(pe(108,E_(t)||"Unknown",r));return Dt({},n,i)}function mc(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||wr,ns=ln.current,Mt(ln,t),Mt(bn,bn.current),!0}function hm(t,e,n){var i=t.stateNode;if(!i)throw Error(pe(169));n?(t=Q0(t,e,ns),i.__reactInternalMemoizedMergedChildContext=t,At(bn),At(ln),Mt(ln,t)):At(bn),Mt(bn,n)}var Ui=null,Wc=!1,Ru=!1;function ex(t){Ui===null?Ui=[t]:Ui.push(t)}function B1(t){Wc=!0,ex(t)}function Rr(){if(!Ru&&Ui!==null){Ru=!0;var t=0,e=xt;try{var n=Ui;for(xt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Ui=null,Wc=!1}catch(r){throw Ui!==null&&(Ui=Ui.slice(t+1)),w0(rh,Rr),r}finally{xt=e,Ru=!1}}return null}var Ws=[],Xs=0,gc=null,xc=0,Vn=[],Gn=0,is=null,ki=1,Fi="";function Hr(t,e){Ws[Xs++]=xc,Ws[Xs++]=gc,gc=t,xc=e}function tx(t,e,n){Vn[Gn++]=ki,Vn[Gn++]=Fi,Vn[Gn++]=is,is=t;var i=ki;t=Fi;var r=32-di(i)-1;i&=~(1<<r),n+=1;var s=32-di(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,ki=1<<32-di(e)+r|n<<r|i,Fi=s+t}else ki=1<<s|n<<r|i,Fi=t}function hh(t){t.return!==null&&(Hr(t,1),tx(t,1,0))}function ph(t){for(;t===gc;)gc=Ws[--Xs],Ws[Xs]=null,xc=Ws[--Xs],Ws[Xs]=null;for(;t===is;)is=Vn[--Gn],Vn[Gn]=null,Fi=Vn[--Gn],Vn[Gn]=null,ki=Vn[--Gn],Vn[Gn]=null}var On=null,Dn=null,Ct=!1,ai=null;function nx(t,e){var n=Xn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function pm(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,On=t,Dn=yr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,On=t,Dn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=is!==null?{id:ki,overflow:Fi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Xn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,On=t,Dn=null,!0):!1;default:return!1}}function jd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Hd(t){if(Ct){var e=Dn;if(e){var n=e;if(!pm(t,e)){if(jd(t))throw Error(pe(418));e=yr(n.nextSibling);var i=On;e&&pm(t,e)?nx(i,n):(t.flags=t.flags&-4097|2,Ct=!1,On=t)}}else{if(jd(t))throw Error(pe(418));t.flags=t.flags&-4097|2,Ct=!1,On=t}}}function mm(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;On=t}function ol(t){if(t!==On)return!1;if(!Ct)return mm(t),Ct=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!kd(t.type,t.memoizedProps)),e&&(e=Dn)){if(jd(t))throw ix(),Error(pe(418));for(;e;)nx(t,e),e=yr(e.nextSibling)}if(mm(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(pe(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Dn=yr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Dn=null}}else Dn=On?yr(t.stateNode.nextSibling):null;return!0}function ix(){for(var t=Dn;t;)t=yr(t.nextSibling)}function lo(){Dn=On=null,Ct=!1}function mh(t){ai===null?ai=[t]:ai.push(t)}var j1=Ki.ReactCurrentBatchConfig;function Oo(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(pe(309));var i=n.stateNode}if(!i)throw Error(pe(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var l=r.refs;o===null?delete l[s]:l[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(pe(284));if(!n._owner)throw Error(pe(290,t))}return t}function al(t,e){throw t=Object.prototype.toString.call(e),Error(pe(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function gm(t){var e=t._init;return e(t._payload)}function rx(t){function e(d,x){if(t){var v=d.deletions;v===null?(d.deletions=[x],d.flags|=16):v.push(x)}}function n(d,x){if(!t)return null;for(;x!==null;)e(d,x),x=x.sibling;return null}function i(d,x){for(d=new Map;x!==null;)x.key!==null?d.set(x.key,x):d.set(x.index,x),x=x.sibling;return d}function r(d,x){return d=Er(d,x),d.index=0,d.sibling=null,d}function s(d,x,v){return d.index=v,t?(v=d.alternate,v!==null?(v=v.index,v<x?(d.flags|=2,x):v):(d.flags|=2,x)):(d.flags|=1048576,x)}function o(d){return t&&d.alternate===null&&(d.flags|=2),d}function l(d,x,v,b){return x===null||x.tag!==6?(x=Ou(v,d.mode,b),x.return=d,x):(x=r(x,v),x.return=d,x)}function c(d,x,v,b){var L=v.type;return L===zs?p(d,x,v.props.children,b,v.key):x!==null&&(x.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===or&&gm(L)===x.type)?(b=r(x,v.props),b.ref=Oo(d,x,v),b.return=d,b):(b=Jl(v.type,v.key,v.props,null,d.mode,b),b.ref=Oo(d,x,v),b.return=d,b)}function u(d,x,v,b){return x===null||x.tag!==4||x.stateNode.containerInfo!==v.containerInfo||x.stateNode.implementation!==v.implementation?(x=ku(v,d.mode,b),x.return=d,x):(x=r(x,v.children||[]),x.return=d,x)}function p(d,x,v,b,L){return x===null||x.tag!==7?(x=Qr(v,d.mode,b,L),x.return=d,x):(x=r(x,v),x.return=d,x)}function f(d,x,v){if(typeof x=="string"&&x!==""||typeof x=="number")return x=Ou(""+x,d.mode,v),x.return=d,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ka:return v=Jl(x.type,x.key,x.props,null,d.mode,v),v.ref=Oo(d,null,x),v.return=d,v;case Fs:return x=ku(x,d.mode,v),x.return=d,x;case or:var b=x._init;return f(d,b(x._payload),v)}if(Yo(x)||No(x))return x=Qr(x,d.mode,v,null),x.return=d,x;al(d,x)}return null}function h(d,x,v,b){var L=x!==null?x.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return L!==null?null:l(d,x,""+v,b);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Ka:return v.key===L?c(d,x,v,b):null;case Fs:return v.key===L?u(d,x,v,b):null;case or:return L=v._init,h(d,x,L(v._payload),b)}if(Yo(v)||No(v))return L!==null?null:p(d,x,v,b,null);al(d,v)}return null}function m(d,x,v,b,L){if(typeof b=="string"&&b!==""||typeof b=="number")return d=d.get(v)||null,l(x,d,""+b,L);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Ka:return d=d.get(b.key===null?v:b.key)||null,c(x,d,b,L);case Fs:return d=d.get(b.key===null?v:b.key)||null,u(x,d,b,L);case or:var R=b._init;return m(d,x,v,R(b._payload),L)}if(Yo(b)||No(b))return d=d.get(v)||null,p(x,d,b,L,null);al(x,b)}return null}function y(d,x,v,b){for(var L=null,R=null,A=x,k=x=0,w=null;A!==null&&k<v.length;k++){A.index>k?(w=A,A=null):w=A.sibling;var M=h(d,A,v[k],b);if(M===null){A===null&&(A=w);break}t&&A&&M.alternate===null&&e(d,A),x=s(M,x,k),R===null?L=M:R.sibling=M,R=M,A=w}if(k===v.length)return n(d,A),Ct&&Hr(d,k),L;if(A===null){for(;k<v.length;k++)A=f(d,v[k],b),A!==null&&(x=s(A,x,k),R===null?L=A:R.sibling=A,R=A);return Ct&&Hr(d,k),L}for(A=i(d,A);k<v.length;k++)w=m(A,d,k,v[k],b),w!==null&&(t&&w.alternate!==null&&A.delete(w.key===null?k:w.key),x=s(w,x,k),R===null?L=w:R.sibling=w,R=w);return t&&A.forEach(function(B){return e(d,B)}),Ct&&Hr(d,k),L}function S(d,x,v,b){var L=No(v);if(typeof L!="function")throw Error(pe(150));if(v=L.call(v),v==null)throw Error(pe(151));for(var R=L=null,A=x,k=x=0,w=null,M=v.next();A!==null&&!M.done;k++,M=v.next()){A.index>k?(w=A,A=null):w=A.sibling;var B=h(d,A,M.value,b);if(B===null){A===null&&(A=w);break}t&&A&&B.alternate===null&&e(d,A),x=s(B,x,k),R===null?L=B:R.sibling=B,R=B,A=w}if(M.done)return n(d,A),Ct&&Hr(d,k),L;if(A===null){for(;!M.done;k++,M=v.next())M=f(d,M.value,b),M!==null&&(x=s(M,x,k),R===null?L=M:R.sibling=M,R=M);return Ct&&Hr(d,k),L}for(A=i(d,A);!M.done;k++,M=v.next())M=m(A,d,k,M.value,b),M!==null&&(t&&M.alternate!==null&&A.delete(M.key===null?k:M.key),x=s(M,x,k),R===null?L=M:R.sibling=M,R=M);return t&&A.forEach(function(z){return e(d,z)}),Ct&&Hr(d,k),L}function g(d,x,v,b){if(typeof v=="object"&&v!==null&&v.type===zs&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case Ka:e:{for(var L=v.key,R=x;R!==null;){if(R.key===L){if(L=v.type,L===zs){if(R.tag===7){n(d,R.sibling),x=r(R,v.props.children),x.return=d,d=x;break e}}else if(R.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===or&&gm(L)===R.type){n(d,R.sibling),x=r(R,v.props),x.ref=Oo(d,R,v),x.return=d,d=x;break e}n(d,R);break}else e(d,R);R=R.sibling}v.type===zs?(x=Qr(v.props.children,d.mode,b,v.key),x.return=d,d=x):(b=Jl(v.type,v.key,v.props,null,d.mode,b),b.ref=Oo(d,x,v),b.return=d,d=b)}return o(d);case Fs:e:{for(R=v.key;x!==null;){if(x.key===R)if(x.tag===4&&x.stateNode.containerInfo===v.containerInfo&&x.stateNode.implementation===v.implementation){n(d,x.sibling),x=r(x,v.children||[]),x.return=d,d=x;break e}else{n(d,x);break}else e(d,x);x=x.sibling}x=ku(v,d.mode,b),x.return=d,d=x}return o(d);case or:return R=v._init,g(d,x,R(v._payload),b)}if(Yo(v))return y(d,x,v,b);if(No(v))return S(d,x,v,b);al(d,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,x!==null&&x.tag===6?(n(d,x.sibling),x=r(x,v),x.return=d,d=x):(n(d,x),x=Ou(v,d.mode,b),x.return=d,d=x),o(d)):n(d,x)}return g}var co=rx(!0),sx=rx(!1),vc=Cr(null),yc=null,$s=null,gh=null;function xh(){gh=$s=yc=null}function vh(t){var e=vc.current;At(vc),t._currentValue=e}function Vd(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function to(t,e){yc=t,gh=$s=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(En=!0),t.firstContext=null)}function Yn(t){var e=t._currentValue;if(gh!==t)if(t={context:t,memoizedValue:e,next:null},$s===null){if(yc===null)throw Error(pe(308));$s=t,yc.dependencies={lanes:0,firstContext:t}}else $s=$s.next=t;return e}var Kr=null;function yh(t){Kr===null?Kr=[t]:Kr.push(t)}function ox(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,yh(e)):(n.next=r.next,r.next=n),e.interleaved=n,Wi(t,i)}function Wi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var ar=!1;function _h(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ax(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Bi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function _r(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,ht&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Wi(t,n)}return r=i.interleaved,r===null?(e.next=e,yh(i)):(e.next=r.next,r.next=e),i.interleaved=e,Wi(t,n)}function Wl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,sh(t,n)}}function xm(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function _c(t,e,n,i){var r=t.updateQueue;ar=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,l=r.shared.pending;if(l!==null){r.shared.pending=null;var c=l,u=c.next;c.next=null,o===null?s=u:o.next=u,o=c;var p=t.alternate;p!==null&&(p=p.updateQueue,l=p.lastBaseUpdate,l!==o&&(l===null?p.firstBaseUpdate=u:l.next=u,p.lastBaseUpdate=c))}if(s!==null){var f=r.baseState;o=0,p=u=c=null,l=s;do{var h=l.lane,m=l.eventTime;if((i&h)===h){p!==null&&(p=p.next={eventTime:m,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var y=t,S=l;switch(h=e,m=n,S.tag){case 1:if(y=S.payload,typeof y=="function"){f=y.call(m,f,h);break e}f=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=S.payload,h=typeof y=="function"?y.call(m,f,h):y,h==null)break e;f=Dt({},f,h);break e;case 2:ar=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[l]:h.push(l))}else m={eventTime:m,lane:h,tag:l.tag,payload:l.payload,callback:l.callback,next:null},p===null?(u=p=m,c=f):p=p.next=m,o|=h;if(l=l.next,l===null){if(l=r.shared.pending,l===null)break;h=l,l=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(p===null&&(c=f),r.baseState=c,r.firstBaseUpdate=u,r.lastBaseUpdate=p,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);ss|=o,t.lanes=o,t.memoizedState=f}}function vm(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(pe(191,r));r.call(i)}}}var ka={},Ti=Cr(ka),Ma=Cr(ka),Ea=Cr(ka);function Jr(t){if(t===ka)throw Error(pe(174));return t}function Sh(t,e){switch(Mt(Ea,e),Mt(Ma,t),Mt(Ti,ka),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Ed(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Ed(e,t)}At(Ti),Mt(Ti,e)}function uo(){At(Ti),At(Ma),At(Ea)}function lx(t){Jr(Ea.current);var e=Jr(Ti.current),n=Ed(e,t.type);e!==n&&(Mt(Ma,t),Mt(Ti,n))}function Mh(t){Ma.current===t&&(At(Ti),At(Ma))}var Lt=Cr(0);function Sc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Pu=[];function Eh(){for(var t=0;t<Pu.length;t++)Pu[t]._workInProgressVersionPrimary=null;Pu.length=0}var Xl=Ki.ReactCurrentDispatcher,Nu=Ki.ReactCurrentBatchConfig,rs=0,It=null,Vt=null,Yt=null,Mc=!1,sa=!1,ba=0,H1=0;function nn(){throw Error(pe(321))}function bh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!pi(t[n],e[n]))return!1;return!0}function wh(t,e,n,i,r,s){if(rs=s,It=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Xl.current=t===null||t.memoizedState===null?X1:$1,t=n(i,r),sa){s=0;do{if(sa=!1,ba=0,25<=s)throw Error(pe(301));s+=1,Yt=Vt=null,e.updateQueue=null,Xl.current=Y1,t=n(i,r)}while(sa)}if(Xl.current=Ec,e=Vt!==null&&Vt.next!==null,rs=0,Yt=Vt=It=null,Mc=!1,e)throw Error(pe(300));return t}function Th(){var t=ba!==0;return ba=0,t}function vi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Yt===null?It.memoizedState=Yt=t:Yt=Yt.next=t,Yt}function qn(){if(Vt===null){var t=It.alternate;t=t!==null?t.memoizedState:null}else t=Vt.next;var e=Yt===null?It.memoizedState:Yt.next;if(e!==null)Yt=e,Vt=t;else{if(t===null)throw Error(pe(310));Vt=t,t={memoizedState:Vt.memoizedState,baseState:Vt.baseState,baseQueue:Vt.baseQueue,queue:Vt.queue,next:null},Yt===null?It.memoizedState=Yt=t:Yt=Yt.next=t}return Yt}function wa(t,e){return typeof e=="function"?e(t):e}function Lu(t){var e=qn(),n=e.queue;if(n===null)throw Error(pe(311));n.lastRenderedReducer=t;var i=Vt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var l=o=null,c=null,u=s;do{var p=u.lane;if((rs&p)===p)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),i=u.hasEagerState?u.eagerState:t(i,u.action);else{var f={lane:p,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(l=c=f,o=i):c=c.next=f,It.lanes|=p,ss|=p}u=u.next}while(u!==null&&u!==s);c===null?o=i:c.next=l,pi(i,e.memoizedState)||(En=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=c,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,It.lanes|=s,ss|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Iu(t){var e=qn(),n=e.queue;if(n===null)throw Error(pe(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);pi(s,e.memoizedState)||(En=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function cx(){}function ux(t,e){var n=It,i=qn(),r=e(),s=!pi(i.memoizedState,r);if(s&&(i.memoizedState=r,En=!0),i=i.queue,Ah(hx.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Yt!==null&&Yt.memoizedState.tag&1){if(n.flags|=2048,Ta(9,fx.bind(null,n,i,r,e),void 0,null),qt===null)throw Error(pe(349));rs&30||dx(n,e,r)}return r}function dx(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=It.updateQueue,e===null?(e={lastEffect:null,stores:null},It.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function fx(t,e,n,i){e.value=n,e.getSnapshot=i,px(e)&&mx(t)}function hx(t,e,n){return n(function(){px(e)&&mx(t)})}function px(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!pi(t,n)}catch{return!0}}function mx(t){var e=Wi(t,1);e!==null&&fi(e,t,1,-1)}function ym(t){var e=vi();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:wa,lastRenderedState:t},e.queue=t,t=t.dispatch=W1.bind(null,It,t),[e.memoizedState,t]}function Ta(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=It.updateQueue,e===null?(e={lastEffect:null,stores:null},It.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function gx(){return qn().memoizedState}function $l(t,e,n,i){var r=vi();It.flags|=t,r.memoizedState=Ta(1|e,n,void 0,i===void 0?null:i)}function Xc(t,e,n,i){var r=qn();i=i===void 0?null:i;var s=void 0;if(Vt!==null){var o=Vt.memoizedState;if(s=o.destroy,i!==null&&bh(i,o.deps)){r.memoizedState=Ta(e,n,s,i);return}}It.flags|=t,r.memoizedState=Ta(1|e,n,s,i)}function _m(t,e){return $l(8390656,8,t,e)}function Ah(t,e){return Xc(2048,8,t,e)}function xx(t,e){return Xc(4,2,t,e)}function vx(t,e){return Xc(4,4,t,e)}function yx(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function _x(t,e,n){return n=n!=null?n.concat([t]):null,Xc(4,4,yx.bind(null,e,t),n)}function Ch(){}function Sx(t,e){var n=qn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&bh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Mx(t,e){var n=qn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&bh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function Ex(t,e,n){return rs&21?(pi(n,e)||(n=C0(),It.lanes|=n,ss|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,En=!0),t.memoizedState=n)}function V1(t,e){var n=xt;xt=n!==0&&4>n?n:4,t(!0);var i=Nu.transition;Nu.transition={};try{t(!1),e()}finally{xt=n,Nu.transition=i}}function bx(){return qn().memoizedState}function G1(t,e,n){var i=Mr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},wx(t))Tx(e,n);else if(n=ox(t,e,n,i),n!==null){var r=fn();fi(n,t,i,r),Ax(n,e,i)}}function W1(t,e,n){var i=Mr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(wx(t))Tx(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,l=s(o,n);if(r.hasEagerState=!0,r.eagerState=l,pi(l,o)){var c=e.interleaved;c===null?(r.next=r,yh(e)):(r.next=c.next,c.next=r),e.interleaved=r;return}}catch{}finally{}n=ox(t,e,r,i),n!==null&&(r=fn(),fi(n,t,i,r),Ax(n,e,i))}}function wx(t){var e=t.alternate;return t===It||e!==null&&e===It}function Tx(t,e){sa=Mc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Ax(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,sh(t,n)}}var Ec={readContext:Yn,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useInsertionEffect:nn,useLayoutEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useMutableSource:nn,useSyncExternalStore:nn,useId:nn,unstable_isNewReconciler:!1},X1={readContext:Yn,useCallback:function(t,e){return vi().memoizedState=[t,e===void 0?null:e],t},useContext:Yn,useEffect:_m,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,$l(4194308,4,yx.bind(null,e,t),n)},useLayoutEffect:function(t,e){return $l(4194308,4,t,e)},useInsertionEffect:function(t,e){return $l(4,2,t,e)},useMemo:function(t,e){var n=vi();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=vi();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=G1.bind(null,It,t),[i.memoizedState,t]},useRef:function(t){var e=vi();return t={current:t},e.memoizedState=t},useState:ym,useDebugValue:Ch,useDeferredValue:function(t){return vi().memoizedState=t},useTransition:function(){var t=ym(!1),e=t[0];return t=V1.bind(null,t[1]),vi().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=It,r=vi();if(Ct){if(n===void 0)throw Error(pe(407));n=n()}else{if(n=e(),qt===null)throw Error(pe(349));rs&30||dx(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,_m(hx.bind(null,i,s,t),[t]),i.flags|=2048,Ta(9,fx.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=vi(),e=qt.identifierPrefix;if(Ct){var n=Fi,i=ki;n=(i&~(1<<32-di(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=ba++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=H1++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},$1={readContext:Yn,useCallback:Sx,useContext:Yn,useEffect:Ah,useImperativeHandle:_x,useInsertionEffect:xx,useLayoutEffect:vx,useMemo:Mx,useReducer:Lu,useRef:gx,useState:function(){return Lu(wa)},useDebugValue:Ch,useDeferredValue:function(t){var e=qn();return Ex(e,Vt.memoizedState,t)},useTransition:function(){var t=Lu(wa)[0],e=qn().memoizedState;return[t,e]},useMutableSource:cx,useSyncExternalStore:ux,useId:bx,unstable_isNewReconciler:!1},Y1={readContext:Yn,useCallback:Sx,useContext:Yn,useEffect:Ah,useImperativeHandle:_x,useInsertionEffect:xx,useLayoutEffect:vx,useMemo:Mx,useReducer:Iu,useRef:gx,useState:function(){return Iu(wa)},useDebugValue:Ch,useDeferredValue:function(t){var e=qn();return Vt===null?e.memoizedState=t:Ex(e,Vt.memoizedState,t)},useTransition:function(){var t=Iu(wa)[0],e=qn().memoizedState;return[t,e]},useMutableSource:cx,useSyncExternalStore:ux,useId:bx,unstable_isNewReconciler:!1};function ri(t,e){if(t&&t.defaultProps){e=Dt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Gd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Dt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var $c={isMounted:function(t){return(t=t._reactInternals)?ds(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=fn(),r=Mr(t),s=Bi(i,r);s.payload=e,n!=null&&(s.callback=n),e=_r(t,s,r),e!==null&&(fi(e,t,r,i),Wl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=fn(),r=Mr(t),s=Bi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=_r(t,s,r),e!==null&&(fi(e,t,r,i),Wl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=fn(),i=Mr(t),r=Bi(n,i);r.tag=2,e!=null&&(r.callback=e),e=_r(t,r,i),e!==null&&(fi(e,t,i,n),Wl(e,t,i))}};function Sm(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!va(n,i)||!va(r,s):!0}function Cx(t,e,n){var i=!1,r=wr,s=e.contextType;return typeof s=="object"&&s!==null?s=Yn(s):(r=wn(e)?ns:ln.current,i=e.contextTypes,s=(i=i!=null)?ao(t,r):wr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=$c,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Mm(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&$c.enqueueReplaceState(e,e.state,null)}function Wd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},_h(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Yn(s):(s=wn(e)?ns:ln.current,r.context=ao(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Gd(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&$c.enqueueReplaceState(r,r.state,null),_c(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function fo(t,e){try{var n="",i=e;do n+=M_(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Du(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Xd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var q1=typeof WeakMap=="function"?WeakMap:Map;function Rx(t,e,n){n=Bi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){wc||(wc=!0,nf=i),Xd(t,e)},n}function Px(t,e,n){n=Bi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Xd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Xd(t,e),typeof i!="function"&&(Sr===null?Sr=new Set([this]):Sr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Em(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new q1;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=cS.bind(null,t,e,n),e.then(t,t))}function bm(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function wm(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Bi(-1,1),e.tag=2,_r(n,e,1))),n.lanes|=1),t)}var K1=Ki.ReactCurrentOwner,En=!1;function dn(t,e,n,i){e.child=t===null?sx(e,null,n,i):co(e,t.child,n,i)}function Tm(t,e,n,i,r){n=n.render;var s=e.ref;return to(e,r),i=wh(t,e,n,i,s,r),n=Th(),t!==null&&!En?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Xi(t,e,r)):(Ct&&n&&hh(e),e.flags|=1,dn(t,e,i,r),e.child)}function Am(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Oh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,Nx(t,e,s,i,r)):(t=Jl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:va,n(o,i)&&t.ref===e.ref)return Xi(t,e,r)}return e.flags|=1,t=Er(s,i),t.ref=e.ref,t.return=e,e.child=t}function Nx(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(va(s,i)&&t.ref===e.ref)if(En=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(En=!0);else return e.lanes=t.lanes,Xi(t,e,r)}return $d(t,e,n,i,r)}function Lx(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},Mt(qs,Ln),Ln|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,Mt(qs,Ln),Ln|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,Mt(qs,Ln),Ln|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,Mt(qs,Ln),Ln|=i;return dn(t,e,r,n),e.child}function Ix(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function $d(t,e,n,i,r){var s=wn(n)?ns:ln.current;return s=ao(e,s),to(e,r),n=wh(t,e,n,i,s,r),i=Th(),t!==null&&!En?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Xi(t,e,r)):(Ct&&i&&hh(e),e.flags|=1,dn(t,e,n,r),e.child)}function Cm(t,e,n,i,r){if(wn(n)){var s=!0;mc(e)}else s=!1;if(to(e,r),e.stateNode===null)Yl(t,e),Cx(e,n,i),Wd(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var c=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=Yn(u):(u=wn(n)?ns:ln.current,u=ao(e,u));var p=n.getDerivedStateFromProps,f=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==i||c!==u)&&Mm(e,o,i,u),ar=!1;var h=e.memoizedState;o.state=h,_c(e,i,o,r),c=e.memoizedState,l!==i||h!==c||bn.current||ar?(typeof p=="function"&&(Gd(e,n,p,i),c=e.memoizedState),(l=ar||Sm(e,n,l,i,h,c,u))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=c),o.props=i,o.state=c,o.context=u,i=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,ax(t,e),l=e.memoizedProps,u=e.type===e.elementType?l:ri(e.type,l),o.props=u,f=e.pendingProps,h=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=Yn(c):(c=wn(n)?ns:ln.current,c=ao(e,c));var m=n.getDerivedStateFromProps;(p=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==f||h!==c)&&Mm(e,o,i,c),ar=!1,h=e.memoizedState,o.state=h,_c(e,i,o,r);var y=e.memoizedState;l!==f||h!==y||bn.current||ar?(typeof m=="function"&&(Gd(e,n,m,i),y=e.memoizedState),(u=ar||Sm(e,n,u,i,h,y,c)||!1)?(p||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,y,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,y,c)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=y),o.props=i,o.state=y,o.context=c,i=u):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return Yd(t,e,n,i,s,r)}function Yd(t,e,n,i,r,s){Ix(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&hm(e,n,!1),Xi(t,e,s);i=e.stateNode,K1.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=co(e,t.child,null,s),e.child=co(e,null,l,s)):dn(t,e,l,s),e.memoizedState=i.state,r&&hm(e,n,!0),e.child}function Dx(t){var e=t.stateNode;e.pendingContext?fm(t,e.pendingContext,e.pendingContext!==e.context):e.context&&fm(t,e.context,!1),Sh(t,e.containerInfo)}function Rm(t,e,n,i,r){return lo(),mh(r),e.flags|=256,dn(t,e,n,i),e.child}var qd={dehydrated:null,treeContext:null,retryLane:0};function Kd(t){return{baseLanes:t,cachePool:null,transitions:null}}function Ux(t,e,n){var i=e.pendingProps,r=Lt.current,s=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(r&2)!==0),l?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),Mt(Lt,r&1),t===null)return Hd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Kc(o,i,0,null),t=Qr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Kd(n),e.memoizedState=qd,t):Rh(e,o));if(r=t.memoizedState,r!==null&&(l=r.dehydrated,l!==null))return J1(t,e,o,i,l,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,l=r.sibling;var c={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=c,e.deletions=null):(i=Er(r,c),i.subtreeFlags=r.subtreeFlags&14680064),l!==null?s=Er(l,s):(s=Qr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?Kd(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=qd,i}return s=t.child,t=s.sibling,i=Er(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Rh(t,e){return e=Kc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function ll(t,e,n,i){return i!==null&&mh(i),co(e,t.child,null,n),t=Rh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function J1(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Du(Error(pe(422))),ll(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Kc({mode:"visible",children:i.children},r,0,null),s=Qr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&co(e,t.child,null,o),e.child.memoizedState=Kd(o),e.memoizedState=qd,s);if(!(e.mode&1))return ll(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var l=i.dgst;return i=l,s=Error(pe(419)),i=Du(s,i,void 0),ll(t,e,o,i)}if(l=(o&t.childLanes)!==0,En||l){if(i=qt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Wi(t,r),fi(i,t,r,-1))}return Uh(),i=Du(Error(pe(421))),ll(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=uS.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Dn=yr(r.nextSibling),On=e,Ct=!0,ai=null,t!==null&&(Vn[Gn++]=ki,Vn[Gn++]=Fi,Vn[Gn++]=is,ki=t.id,Fi=t.overflow,is=e),e=Rh(e,i.children),e.flags|=4096,e)}function Pm(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Vd(t.return,e,n)}function Uu(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function Ox(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(dn(t,e,i.children,n),i=Lt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Pm(t,n,e);else if(t.tag===19)Pm(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(Mt(Lt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Sc(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Uu(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Sc(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Uu(e,!0,n,null,s);break;case"together":Uu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Yl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Xi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),ss|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(pe(153));if(e.child!==null){for(t=e.child,n=Er(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Er(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Z1(t,e,n){switch(e.tag){case 3:Dx(e),lo();break;case 5:lx(e);break;case 1:wn(e.type)&&mc(e);break;case 4:Sh(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;Mt(vc,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(Mt(Lt,Lt.current&1),e.flags|=128,null):n&e.child.childLanes?Ux(t,e,n):(Mt(Lt,Lt.current&1),t=Xi(t,e,n),t!==null?t.sibling:null);Mt(Lt,Lt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Ox(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),Mt(Lt,Lt.current),i)break;return null;case 22:case 23:return e.lanes=0,Lx(t,e,n)}return Xi(t,e,n)}var kx,Jd,Fx,zx;kx=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Jd=function(){};Fx=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Jr(Ti.current);var s=null;switch(n){case"input":r=yd(t,r),i=yd(t,i),s=[];break;case"select":r=Dt({},r,{value:void 0}),i=Dt({},i,{value:void 0}),s=[];break;case"textarea":r=Md(t,r),i=Md(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=hc)}bd(n,i);var o;n=null;for(u in r)if(!i.hasOwnProperty(u)&&r.hasOwnProperty(u)&&r[u]!=null)if(u==="style"){var l=r[u];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(da.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in i){var c=i[u];if(l=r!=null?r[u]:void 0,i.hasOwnProperty(u)&&c!==l&&(c!=null||l!=null))if(u==="style")if(l){for(o in l)!l.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&l[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(s||(s=[]),s.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(s=s||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(s=s||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(da.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&wt("scroll",t),s||l===c||(s=[])):(s=s||[]).push(u,c))}n&&(s=s||[]).push("style",n);var u=s;(e.updateQueue=u)&&(e.flags|=4)}};zx=function(t,e,n,i){n!==i&&(e.flags|=4)};function ko(t,e){if(!Ct)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function rn(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function Q1(t,e,n){var i=e.pendingProps;switch(ph(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return rn(e),null;case 1:return wn(e.type)&&pc(),rn(e),null;case 3:return i=e.stateNode,uo(),At(bn),At(ln),Eh(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(ol(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,ai!==null&&(of(ai),ai=null))),Jd(t,e),rn(e),null;case 5:Mh(e);var r=Jr(Ea.current);if(n=e.type,t!==null&&e.stateNode!=null)Fx(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(pe(166));return rn(e),null}if(t=Jr(Ti.current),ol(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Si]=e,i[Sa]=s,t=(e.mode&1)!==0,n){case"dialog":wt("cancel",i),wt("close",i);break;case"iframe":case"object":case"embed":wt("load",i);break;case"video":case"audio":for(r=0;r<Ko.length;r++)wt(Ko[r],i);break;case"source":wt("error",i);break;case"img":case"image":case"link":wt("error",i),wt("load",i);break;case"details":wt("toggle",i);break;case"input":zp(i,s),wt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},wt("invalid",i);break;case"textarea":jp(i,s),wt("invalid",i)}bd(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="children"?typeof l=="string"?i.textContent!==l&&(s.suppressHydrationWarning!==!0&&sl(i.textContent,l,t),r=["children",l]):typeof l=="number"&&i.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&sl(i.textContent,l,t),r=["children",""+l]):da.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&wt("scroll",i)}switch(n){case"input":Ja(i),Bp(i,s,!0);break;case"textarea":Ja(i),Hp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=hc)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=h0(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[Si]=e,t[Sa]=i,kx(t,e,!1,!1),e.stateNode=t;e:{switch(o=wd(n,i),n){case"dialog":wt("cancel",t),wt("close",t),r=i;break;case"iframe":case"object":case"embed":wt("load",t),r=i;break;case"video":case"audio":for(r=0;r<Ko.length;r++)wt(Ko[r],t);r=i;break;case"source":wt("error",t),r=i;break;case"img":case"image":case"link":wt("error",t),wt("load",t),r=i;break;case"details":wt("toggle",t),r=i;break;case"input":zp(t,i),r=yd(t,i),wt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=Dt({},i,{value:void 0}),wt("invalid",t);break;case"textarea":jp(t,i),r=Md(t,i),wt("invalid",t);break;default:r=i}bd(n,r),l=r;for(s in l)if(l.hasOwnProperty(s)){var c=l[s];s==="style"?g0(t,c):s==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&p0(t,c)):s==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&fa(t,c):typeof c=="number"&&fa(t,""+c):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(da.hasOwnProperty(s)?c!=null&&s==="onScroll"&&wt("scroll",t):c!=null&&Qf(t,s,c,o))}switch(n){case"input":Ja(t),Bp(t,i,!1);break;case"textarea":Ja(t),Hp(t);break;case"option":i.value!=null&&t.setAttribute("value",""+br(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Js(t,!!i.multiple,s,!1):i.defaultValue!=null&&Js(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=hc)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return rn(e),null;case 6:if(t&&e.stateNode!=null)zx(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(pe(166));if(n=Jr(Ea.current),Jr(Ti.current),ol(e)){if(i=e.stateNode,n=e.memoizedProps,i[Si]=e,(s=i.nodeValue!==n)&&(t=On,t!==null))switch(t.tag){case 3:sl(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&sl(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Si]=e,e.stateNode=i}return rn(e),null;case 13:if(At(Lt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ct&&Dn!==null&&e.mode&1&&!(e.flags&128))ix(),lo(),e.flags|=98560,s=!1;else if(s=ol(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(pe(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(pe(317));s[Si]=e}else lo(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;rn(e),s=!1}else ai!==null&&(of(ai),ai=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Lt.current&1?Gt===0&&(Gt=3):Uh())),e.updateQueue!==null&&(e.flags|=4),rn(e),null);case 4:return uo(),Jd(t,e),t===null&&ya(e.stateNode.containerInfo),rn(e),null;case 10:return vh(e.type._context),rn(e),null;case 17:return wn(e.type)&&pc(),rn(e),null;case 19:if(At(Lt),s=e.memoizedState,s===null)return rn(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)ko(s,!1);else{if(Gt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Sc(t),o!==null){for(e.flags|=128,ko(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return Mt(Lt,Lt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Ft()>ho&&(e.flags|=128,i=!0,ko(s,!1),e.lanes=4194304)}else{if(!i)if(t=Sc(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),ko(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Ct)return rn(e),null}else 2*Ft()-s.renderingStartTime>ho&&n!==1073741824&&(e.flags|=128,i=!0,ko(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ft(),e.sibling=null,n=Lt.current,Mt(Lt,i?n&1|2:n&1),e):(rn(e),null);case 22:case 23:return Dh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Ln&1073741824&&(rn(e),e.subtreeFlags&6&&(e.flags|=8192)):rn(e),null;case 24:return null;case 25:return null}throw Error(pe(156,e.tag))}function eS(t,e){switch(ph(e),e.tag){case 1:return wn(e.type)&&pc(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return uo(),At(bn),At(ln),Eh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Mh(e),null;case 13:if(At(Lt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(pe(340));lo()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return At(Lt),null;case 4:return uo(),null;case 10:return vh(e.type._context),null;case 22:case 23:return Dh(),null;case 24:return null;default:return null}}var cl=!1,an=!1,tS=typeof WeakSet=="function"?WeakSet:Set,Ie=null;function Ys(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){kt(t,e,i)}else n.current=null}function Zd(t,e,n){try{n()}catch(i){kt(t,e,i)}}var Nm=!1;function nS(t,e){if(Ud=uc,t=G0(),fh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,l=-1,c=-1,u=0,p=0,f=t,h=null;t:for(;;){for(var m;f!==n||r!==0&&f.nodeType!==3||(l=o+r),f!==s||i!==0&&f.nodeType!==3||(c=o+i),f.nodeType===3&&(o+=f.nodeValue.length),(m=f.firstChild)!==null;)h=f,f=m;for(;;){if(f===t)break t;if(h===n&&++u===r&&(l=o),h===s&&++p===i&&(c=o),(m=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=m}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Od={focusedElem:t,selectionRange:n},uc=!1,Ie=e;Ie!==null;)if(e=Ie,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Ie=t;else for(;Ie!==null;){e=Ie;try{var y=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var S=y.memoizedProps,g=y.memoizedState,d=e.stateNode,x=d.getSnapshotBeforeUpdate(e.elementType===e.type?S:ri(e.type,S),g);d.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var v=e.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(pe(163))}}catch(b){kt(e,e.return,b)}if(t=e.sibling,t!==null){t.return=e.return,Ie=t;break}Ie=e.return}return y=Nm,Nm=!1,y}function oa(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Zd(e,n,s)}r=r.next}while(r!==i)}}function Yc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Qd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Bx(t){var e=t.alternate;e!==null&&(t.alternate=null,Bx(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Si],delete e[Sa],delete e[zd],delete e[F1],delete e[z1])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function jx(t){return t.tag===5||t.tag===3||t.tag===4}function Lm(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||jx(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function ef(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=hc));else if(i!==4&&(t=t.child,t!==null))for(ef(t,e,n),t=t.sibling;t!==null;)ef(t,e,n),t=t.sibling}function tf(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(tf(t,e,n),t=t.sibling;t!==null;)tf(t,e,n),t=t.sibling}var Zt=null,si=!1;function Qi(t,e,n){for(n=n.child;n!==null;)Hx(t,e,n),n=n.sibling}function Hx(t,e,n){if(wi&&typeof wi.onCommitFiberUnmount=="function")try{wi.onCommitFiberUnmount(Bc,n)}catch{}switch(n.tag){case 5:an||Ys(n,e);case 6:var i=Zt,r=si;Zt=null,Qi(t,e,n),Zt=i,si=r,Zt!==null&&(si?(t=Zt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Zt.removeChild(n.stateNode));break;case 18:Zt!==null&&(si?(t=Zt,n=n.stateNode,t.nodeType===8?Cu(t.parentNode,n):t.nodeType===1&&Cu(t,n),ga(t)):Cu(Zt,n.stateNode));break;case 4:i=Zt,r=si,Zt=n.stateNode.containerInfo,si=!0,Qi(t,e,n),Zt=i,si=r;break;case 0:case 11:case 14:case 15:if(!an&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Zd(n,e,o),r=r.next}while(r!==i)}Qi(t,e,n);break;case 1:if(!an&&(Ys(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(l){kt(n,e,l)}Qi(t,e,n);break;case 21:Qi(t,e,n);break;case 22:n.mode&1?(an=(i=an)||n.memoizedState!==null,Qi(t,e,n),an=i):Qi(t,e,n);break;default:Qi(t,e,n)}}function Im(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new tS),e.forEach(function(i){var r=dS.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function ei(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:Zt=l.stateNode,si=!1;break e;case 3:Zt=l.stateNode.containerInfo,si=!0;break e;case 4:Zt=l.stateNode.containerInfo,si=!0;break e}l=l.return}if(Zt===null)throw Error(pe(160));Hx(s,o,r),Zt=null,si=!1;var c=r.alternate;c!==null&&(c.return=null),r.return=null}catch(u){kt(r,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Vx(e,t),e=e.sibling}function Vx(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(ei(e,t),xi(t),i&4){try{oa(3,t,t.return),Yc(3,t)}catch(S){kt(t,t.return,S)}try{oa(5,t,t.return)}catch(S){kt(t,t.return,S)}}break;case 1:ei(e,t),xi(t),i&512&&n!==null&&Ys(n,n.return);break;case 5:if(ei(e,t),xi(t),i&512&&n!==null&&Ys(n,n.return),t.flags&32){var r=t.stateNode;try{fa(r,"")}catch(S){kt(t,t.return,S)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,l=t.type,c=t.updateQueue;if(t.updateQueue=null,c!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&d0(r,s),wd(l,o);var u=wd(l,s);for(o=0;o<c.length;o+=2){var p=c[o],f=c[o+1];p==="style"?g0(r,f):p==="dangerouslySetInnerHTML"?p0(r,f):p==="children"?fa(r,f):Qf(r,p,f,u)}switch(l){case"input":_d(r,s);break;case"textarea":f0(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var m=s.value;m!=null?Js(r,!!s.multiple,m,!1):h!==!!s.multiple&&(s.defaultValue!=null?Js(r,!!s.multiple,s.defaultValue,!0):Js(r,!!s.multiple,s.multiple?[]:"",!1))}r[Sa]=s}catch(S){kt(t,t.return,S)}}break;case 6:if(ei(e,t),xi(t),i&4){if(t.stateNode===null)throw Error(pe(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(S){kt(t,t.return,S)}}break;case 3:if(ei(e,t),xi(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{ga(e.containerInfo)}catch(S){kt(t,t.return,S)}break;case 4:ei(e,t),xi(t);break;case 13:ei(e,t),xi(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Lh=Ft())),i&4&&Im(t);break;case 22:if(p=n!==null&&n.memoizedState!==null,t.mode&1?(an=(u=an)||p,ei(e,t),an=u):ei(e,t),xi(t),i&8192){if(u=t.memoizedState!==null,(t.stateNode.isHidden=u)&&!p&&t.mode&1)for(Ie=t,p=t.child;p!==null;){for(f=Ie=p;Ie!==null;){switch(h=Ie,m=h.child,h.tag){case 0:case 11:case 14:case 15:oa(4,h,h.return);break;case 1:Ys(h,h.return);var y=h.stateNode;if(typeof y.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,y.props=e.memoizedProps,y.state=e.memoizedState,y.componentWillUnmount()}catch(S){kt(i,n,S)}}break;case 5:Ys(h,h.return);break;case 22:if(h.memoizedState!==null){Um(f);continue}}m!==null?(m.return=h,Ie=m):Um(f)}p=p.sibling}e:for(p=null,f=t;;){if(f.tag===5){if(p===null){p=f;try{r=f.stateNode,u?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=f.stateNode,c=f.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=m0("display",o))}catch(S){kt(t,t.return,S)}}}else if(f.tag===6){if(p===null)try{f.stateNode.nodeValue=u?"":f.memoizedProps}catch(S){kt(t,t.return,S)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;p===f&&(p=null),f=f.return}p===f&&(p=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:ei(e,t),xi(t),i&4&&Im(t);break;case 21:break;default:ei(e,t),xi(t)}}function xi(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(jx(n)){var i=n;break e}n=n.return}throw Error(pe(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(fa(r,""),i.flags&=-33);var s=Lm(t);tf(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,l=Lm(t);ef(t,l,o);break;default:throw Error(pe(161))}}catch(c){kt(t,t.return,c)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function iS(t,e,n){Ie=t,Gx(t)}function Gx(t,e,n){for(var i=(t.mode&1)!==0;Ie!==null;){var r=Ie,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||cl;if(!o){var l=r.alternate,c=l!==null&&l.memoizedState!==null||an;l=cl;var u=an;if(cl=o,(an=c)&&!u)for(Ie=r;Ie!==null;)o=Ie,c=o.child,o.tag===22&&o.memoizedState!==null?Om(r):c!==null?(c.return=o,Ie=c):Om(r);for(;s!==null;)Ie=s,Gx(s),s=s.sibling;Ie=r,cl=l,an=u}Dm(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Ie=s):Dm(t)}}function Dm(t){for(;Ie!==null;){var e=Ie;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:an||Yc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!an)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:ri(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&vm(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}vm(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var c=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var p=u.memoizedState;if(p!==null){var f=p.dehydrated;f!==null&&ga(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(pe(163))}an||e.flags&512&&Qd(e)}catch(h){kt(e,e.return,h)}}if(e===t){Ie=null;break}if(n=e.sibling,n!==null){n.return=e.return,Ie=n;break}Ie=e.return}}function Um(t){for(;Ie!==null;){var e=Ie;if(e===t){Ie=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Ie=n;break}Ie=e.return}}function Om(t){for(;Ie!==null;){var e=Ie;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Yc(4,e)}catch(c){kt(e,n,c)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(c){kt(e,r,c)}}var s=e.return;try{Qd(e)}catch(c){kt(e,s,c)}break;case 5:var o=e.return;try{Qd(e)}catch(c){kt(e,o,c)}}}catch(c){kt(e,e.return,c)}if(e===t){Ie=null;break}var l=e.sibling;if(l!==null){l.return=e.return,Ie=l;break}Ie=e.return}}var rS=Math.ceil,bc=Ki.ReactCurrentDispatcher,Ph=Ki.ReactCurrentOwner,$n=Ki.ReactCurrentBatchConfig,ht=0,qt=null,jt=null,Qt=0,Ln=0,qs=Cr(0),Gt=0,Aa=null,ss=0,qc=0,Nh=0,aa=null,Sn=null,Lh=0,ho=1/0,Di=null,wc=!1,nf=null,Sr=null,ul=!1,hr=null,Tc=0,la=0,rf=null,ql=-1,Kl=0;function fn(){return ht&6?Ft():ql!==-1?ql:ql=Ft()}function Mr(t){return t.mode&1?ht&2&&Qt!==0?Qt&-Qt:j1.transition!==null?(Kl===0&&(Kl=C0()),Kl):(t=xt,t!==0||(t=window.event,t=t===void 0?16:U0(t.type)),t):1}function fi(t,e,n,i){if(50<la)throw la=0,rf=null,Error(pe(185));Da(t,n,i),(!(ht&2)||t!==qt)&&(t===qt&&(!(ht&2)&&(qc|=n),Gt===4&&ur(t,Qt)),Tn(t,i),n===1&&ht===0&&!(e.mode&1)&&(ho=Ft()+500,Wc&&Rr()))}function Tn(t,e){var n=t.callbackNode;j_(t,e);var i=cc(t,t===qt?Qt:0);if(i===0)n!==null&&Wp(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Wp(n),e===1)t.tag===0?B1(km.bind(null,t)):ex(km.bind(null,t)),O1(function(){!(ht&6)&&Rr()}),n=null;else{switch(R0(i)){case 1:n=rh;break;case 4:n=T0;break;case 16:n=lc;break;case 536870912:n=A0;break;default:n=lc}n=Zx(n,Wx.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Wx(t,e){if(ql=-1,Kl=0,ht&6)throw Error(pe(327));var n=t.callbackNode;if(no()&&t.callbackNode!==n)return null;var i=cc(t,t===qt?Qt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Ac(t,i);else{e=i;var r=ht;ht|=2;var s=$x();(qt!==t||Qt!==e)&&(Di=null,ho=Ft()+500,Zr(t,e));do try{aS();break}catch(l){Xx(t,l)}while(!0);xh(),bc.current=s,ht=r,jt!==null?e=0:(qt=null,Qt=0,e=Gt)}if(e!==0){if(e===2&&(r=Pd(t),r!==0&&(i=r,e=sf(t,r))),e===1)throw n=Aa,Zr(t,0),ur(t,i),Tn(t,Ft()),n;if(e===6)ur(t,i);else{if(r=t.current.alternate,!(i&30)&&!sS(r)&&(e=Ac(t,i),e===2&&(s=Pd(t),s!==0&&(i=s,e=sf(t,s))),e===1))throw n=Aa,Zr(t,0),ur(t,i),Tn(t,Ft()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(pe(345));case 2:Vr(t,Sn,Di);break;case 3:if(ur(t,i),(i&130023424)===i&&(e=Lh+500-Ft(),10<e)){if(cc(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){fn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Fd(Vr.bind(null,t,Sn,Di),e);break}Vr(t,Sn,Di);break;case 4:if(ur(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-di(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=Ft()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*rS(i/1960))-i,10<i){t.timeoutHandle=Fd(Vr.bind(null,t,Sn,Di),i);break}Vr(t,Sn,Di);break;case 5:Vr(t,Sn,Di);break;default:throw Error(pe(329))}}}return Tn(t,Ft()),t.callbackNode===n?Wx.bind(null,t):null}function sf(t,e){var n=aa;return t.current.memoizedState.isDehydrated&&(Zr(t,e).flags|=256),t=Ac(t,e),t!==2&&(e=Sn,Sn=n,e!==null&&of(e)),t}function of(t){Sn===null?Sn=t:Sn.push.apply(Sn,t)}function sS(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!pi(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ur(t,e){for(e&=~Nh,e&=~qc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-di(e),i=1<<n;t[n]=-1,e&=~i}}function km(t){if(ht&6)throw Error(pe(327));no();var e=cc(t,0);if(!(e&1))return Tn(t,Ft()),null;var n=Ac(t,e);if(t.tag!==0&&n===2){var i=Pd(t);i!==0&&(e=i,n=sf(t,i))}if(n===1)throw n=Aa,Zr(t,0),ur(t,e),Tn(t,Ft()),n;if(n===6)throw Error(pe(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Vr(t,Sn,Di),Tn(t,Ft()),null}function Ih(t,e){var n=ht;ht|=1;try{return t(e)}finally{ht=n,ht===0&&(ho=Ft()+500,Wc&&Rr())}}function os(t){hr!==null&&hr.tag===0&&!(ht&6)&&no();var e=ht;ht|=1;var n=$n.transition,i=xt;try{if($n.transition=null,xt=1,t)return t()}finally{xt=i,$n.transition=n,ht=e,!(ht&6)&&Rr()}}function Dh(){Ln=qs.current,At(qs)}function Zr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,U1(n)),jt!==null)for(n=jt.return;n!==null;){var i=n;switch(ph(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&pc();break;case 3:uo(),At(bn),At(ln),Eh();break;case 5:Mh(i);break;case 4:uo();break;case 13:At(Lt);break;case 19:At(Lt);break;case 10:vh(i.type._context);break;case 22:case 23:Dh()}n=n.return}if(qt=t,jt=t=Er(t.current,null),Qt=Ln=e,Gt=0,Aa=null,Nh=qc=ss=0,Sn=aa=null,Kr!==null){for(e=0;e<Kr.length;e++)if(n=Kr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}Kr=null}return t}function Xx(t,e){do{var n=jt;try{if(xh(),Xl.current=Ec,Mc){for(var i=It.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Mc=!1}if(rs=0,Yt=Vt=It=null,sa=!1,ba=0,Ph.current=null,n===null||n.return===null){Gt=1,Aa=e,jt=null;break}e:{var s=t,o=n.return,l=n,c=e;if(e=Qt,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,p=l,f=p.tag;if(!(p.mode&1)&&(f===0||f===11||f===15)){var h=p.alternate;h?(p.updateQueue=h.updateQueue,p.memoizedState=h.memoizedState,p.lanes=h.lanes):(p.updateQueue=null,p.memoizedState=null)}var m=bm(o);if(m!==null){m.flags&=-257,wm(m,o,l,s,e),m.mode&1&&Em(s,u,e),e=m,c=u;var y=e.updateQueue;if(y===null){var S=new Set;S.add(c),e.updateQueue=S}else y.add(c);break e}else{if(!(e&1)){Em(s,u,e),Uh();break e}c=Error(pe(426))}}else if(Ct&&l.mode&1){var g=bm(o);if(g!==null){!(g.flags&65536)&&(g.flags|=256),wm(g,o,l,s,e),mh(fo(c,l));break e}}s=c=fo(c,l),Gt!==4&&(Gt=2),aa===null?aa=[s]:aa.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=Rx(s,c,e);xm(s,d);break e;case 1:l=c;var x=s.type,v=s.stateNode;if(!(s.flags&128)&&(typeof x.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(Sr===null||!Sr.has(v)))){s.flags|=65536,e&=-e,s.lanes|=e;var b=Px(s,l,e);xm(s,b);break e}}s=s.return}while(s!==null)}qx(n)}catch(L){e=L,jt===n&&n!==null&&(jt=n=n.return);continue}break}while(!0)}function $x(){var t=bc.current;return bc.current=Ec,t===null?Ec:t}function Uh(){(Gt===0||Gt===3||Gt===2)&&(Gt=4),qt===null||!(ss&268435455)&&!(qc&268435455)||ur(qt,Qt)}function Ac(t,e){var n=ht;ht|=2;var i=$x();(qt!==t||Qt!==e)&&(Di=null,Zr(t,e));do try{oS();break}catch(r){Xx(t,r)}while(!0);if(xh(),ht=n,bc.current=i,jt!==null)throw Error(pe(261));return qt=null,Qt=0,Gt}function oS(){for(;jt!==null;)Yx(jt)}function aS(){for(;jt!==null&&!L_();)Yx(jt)}function Yx(t){var e=Jx(t.alternate,t,Ln);t.memoizedProps=t.pendingProps,e===null?qx(t):jt=e,Ph.current=null}function qx(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=eS(n,e),n!==null){n.flags&=32767,jt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Gt=6,jt=null;return}}else if(n=Q1(n,e,Ln),n!==null){jt=n;return}if(e=e.sibling,e!==null){jt=e;return}jt=e=t}while(e!==null);Gt===0&&(Gt=5)}function Vr(t,e,n){var i=xt,r=$n.transition;try{$n.transition=null,xt=1,lS(t,e,n,i)}finally{$n.transition=r,xt=i}return null}function lS(t,e,n,i){do no();while(hr!==null);if(ht&6)throw Error(pe(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(pe(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(H_(t,s),t===qt&&(jt=qt=null,Qt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ul||(ul=!0,Zx(lc,function(){return no(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=$n.transition,$n.transition=null;var o=xt;xt=1;var l=ht;ht|=4,Ph.current=null,nS(t,n),Vx(n,t),C1(Od),uc=!!Ud,Od=Ud=null,t.current=n,iS(n),I_(),ht=l,xt=o,$n.transition=s}else t.current=n;if(ul&&(ul=!1,hr=t,Tc=r),s=t.pendingLanes,s===0&&(Sr=null),O_(n.stateNode),Tn(t,Ft()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(wc)throw wc=!1,t=nf,nf=null,t;return Tc&1&&t.tag!==0&&no(),s=t.pendingLanes,s&1?t===rf?la++:(la=0,rf=t):la=0,Rr(),null}function no(){if(hr!==null){var t=R0(Tc),e=$n.transition,n=xt;try{if($n.transition=null,xt=16>t?16:t,hr===null)var i=!1;else{if(t=hr,hr=null,Tc=0,ht&6)throw Error(pe(331));var r=ht;for(ht|=4,Ie=t.current;Ie!==null;){var s=Ie,o=s.child;if(Ie.flags&16){var l=s.deletions;if(l!==null){for(var c=0;c<l.length;c++){var u=l[c];for(Ie=u;Ie!==null;){var p=Ie;switch(p.tag){case 0:case 11:case 15:oa(8,p,s)}var f=p.child;if(f!==null)f.return=p,Ie=f;else for(;Ie!==null;){p=Ie;var h=p.sibling,m=p.return;if(Bx(p),p===u){Ie=null;break}if(h!==null){h.return=m,Ie=h;break}Ie=m}}}var y=s.alternate;if(y!==null){var S=y.child;if(S!==null){y.child=null;do{var g=S.sibling;S.sibling=null,S=g}while(S!==null)}}Ie=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,Ie=o;else e:for(;Ie!==null;){if(s=Ie,s.flags&2048)switch(s.tag){case 0:case 11:case 15:oa(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,Ie=d;break e}Ie=s.return}}var x=t.current;for(Ie=x;Ie!==null;){o=Ie;var v=o.child;if(o.subtreeFlags&2064&&v!==null)v.return=o,Ie=v;else e:for(o=x;Ie!==null;){if(l=Ie,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Yc(9,l)}}catch(L){kt(l,l.return,L)}if(l===o){Ie=null;break e}var b=l.sibling;if(b!==null){b.return=l.return,Ie=b;break e}Ie=l.return}}if(ht=r,Rr(),wi&&typeof wi.onPostCommitFiberRoot=="function")try{wi.onPostCommitFiberRoot(Bc,t)}catch{}i=!0}return i}finally{xt=n,$n.transition=e}}return!1}function Fm(t,e,n){e=fo(n,e),e=Rx(t,e,1),t=_r(t,e,1),e=fn(),t!==null&&(Da(t,1,e),Tn(t,e))}function kt(t,e,n){if(t.tag===3)Fm(t,t,n);else for(;e!==null;){if(e.tag===3){Fm(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Sr===null||!Sr.has(i))){t=fo(n,t),t=Px(e,t,1),e=_r(e,t,1),t=fn(),e!==null&&(Da(e,1,t),Tn(e,t));break}}e=e.return}}function cS(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=fn(),t.pingedLanes|=t.suspendedLanes&n,qt===t&&(Qt&n)===n&&(Gt===4||Gt===3&&(Qt&130023424)===Qt&&500>Ft()-Lh?Zr(t,0):Nh|=n),Tn(t,e)}function Kx(t,e){e===0&&(t.mode&1?(e=el,el<<=1,!(el&130023424)&&(el=4194304)):e=1);var n=fn();t=Wi(t,e),t!==null&&(Da(t,e,n),Tn(t,n))}function uS(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Kx(t,n)}function dS(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(pe(314))}i!==null&&i.delete(e),Kx(t,n)}var Jx;Jx=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||bn.current)En=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return En=!1,Z1(t,e,n);En=!!(t.flags&131072)}else En=!1,Ct&&e.flags&1048576&&tx(e,xc,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Yl(t,e),t=e.pendingProps;var r=ao(e,ln.current);to(e,n),r=wh(null,e,i,t,r,n);var s=Th();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,wn(i)?(s=!0,mc(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,_h(e),r.updater=$c,e.stateNode=r,r._reactInternals=e,Wd(e,i,t,n),e=Yd(null,e,i,!0,s,n)):(e.tag=0,Ct&&s&&hh(e),dn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Yl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=hS(i),t=ri(i,t),r){case 0:e=$d(null,e,i,t,n);break e;case 1:e=Cm(null,e,i,t,n);break e;case 11:e=Tm(null,e,i,t,n);break e;case 14:e=Am(null,e,i,ri(i.type,t),n);break e}throw Error(pe(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ri(i,r),$d(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ri(i,r),Cm(t,e,i,r,n);case 3:e:{if(Dx(e),t===null)throw Error(pe(387));i=e.pendingProps,s=e.memoizedState,r=s.element,ax(t,e),_c(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=fo(Error(pe(423)),e),e=Rm(t,e,i,n,r);break e}else if(i!==r){r=fo(Error(pe(424)),e),e=Rm(t,e,i,n,r);break e}else for(Dn=yr(e.stateNode.containerInfo.firstChild),On=e,Ct=!0,ai=null,n=sx(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(lo(),i===r){e=Xi(t,e,n);break e}dn(t,e,i,n)}e=e.child}return e;case 5:return lx(e),t===null&&Hd(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,kd(i,r)?o=null:s!==null&&kd(i,s)&&(e.flags|=32),Ix(t,e),dn(t,e,o,n),e.child;case 6:return t===null&&Hd(e),null;case 13:return Ux(t,e,n);case 4:return Sh(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=co(e,null,i,n):dn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ri(i,r),Tm(t,e,i,r,n);case 7:return dn(t,e,e.pendingProps,n),e.child;case 8:return dn(t,e,e.pendingProps.children,n),e.child;case 12:return dn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,Mt(vc,i._currentValue),i._currentValue=o,s!==null)if(pi(s.value,o)){if(s.children===r.children&&!bn.current){e=Xi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var l=s.dependencies;if(l!==null){o=s.child;for(var c=l.firstContext;c!==null;){if(c.context===i){if(s.tag===1){c=Bi(-1,n&-n),c.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var p=u.pending;p===null?c.next=c:(c.next=p.next,p.next=c),u.pending=c}}s.lanes|=n,c=s.alternate,c!==null&&(c.lanes|=n),Vd(s.return,n,e),l.lanes|=n;break}c=c.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(pe(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Vd(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}dn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,to(e,n),r=Yn(r),i=i(r),e.flags|=1,dn(t,e,i,n),e.child;case 14:return i=e.type,r=ri(i,e.pendingProps),r=ri(i.type,r),Am(t,e,i,r,n);case 15:return Nx(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ri(i,r),Yl(t,e),e.tag=1,wn(i)?(t=!0,mc(e)):t=!1,to(e,n),Cx(e,i,r),Wd(e,i,r,n),Yd(null,e,i,!0,t,n);case 19:return Ox(t,e,n);case 22:return Lx(t,e,n)}throw Error(pe(156,e.tag))};function Zx(t,e){return w0(t,e)}function fS(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Xn(t,e,n,i){return new fS(t,e,n,i)}function Oh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function hS(t){if(typeof t=="function")return Oh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===th)return 11;if(t===nh)return 14}return 2}function Er(t,e){var n=t.alternate;return n===null?(n=Xn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Jl(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")Oh(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case zs:return Qr(n.children,r,s,e);case eh:o=8,r|=8;break;case md:return t=Xn(12,n,e,r|2),t.elementType=md,t.lanes=s,t;case gd:return t=Xn(13,n,e,r),t.elementType=gd,t.lanes=s,t;case xd:return t=Xn(19,n,e,r),t.elementType=xd,t.lanes=s,t;case l0:return Kc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case o0:o=10;break e;case a0:o=9;break e;case th:o=11;break e;case nh:o=14;break e;case or:o=16,i=null;break e}throw Error(pe(130,t==null?t:typeof t,""))}return e=Xn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Qr(t,e,n,i){return t=Xn(7,t,i,e),t.lanes=n,t}function Kc(t,e,n,i){return t=Xn(22,t,i,e),t.elementType=l0,t.lanes=n,t.stateNode={isHidden:!1},t}function Ou(t,e,n){return t=Xn(6,t,null,e),t.lanes=n,t}function ku(t,e,n){return e=Xn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function pS(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=xu(0),this.expirationTimes=xu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=xu(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function kh(t,e,n,i,r,s,o,l,c){return t=new pS(t,e,n,l,c),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Xn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},_h(s),t}function mS(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Fs,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function Qx(t){if(!t)return wr;t=t._reactInternals;e:{if(ds(t)!==t||t.tag!==1)throw Error(pe(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(wn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(pe(171))}if(t.tag===1){var n=t.type;if(wn(n))return Q0(t,n,e)}return e}function ev(t,e,n,i,r,s,o,l,c){return t=kh(n,i,!0,t,r,s,o,l,c),t.context=Qx(null),n=t.current,i=fn(),r=Mr(n),s=Bi(i,r),s.callback=e??null,_r(n,s,r),t.current.lanes=r,Da(t,r,i),Tn(t,i),t}function Jc(t,e,n,i){var r=e.current,s=fn(),o=Mr(r);return n=Qx(n),e.context===null?e.context=n:e.pendingContext=n,e=Bi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=_r(r,e,o),t!==null&&(fi(t,r,o,s),Wl(t,r,o)),o}function Cc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function zm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Fh(t,e){zm(t,e),(t=t.alternate)&&zm(t,e)}function gS(){return null}var tv=typeof reportError=="function"?reportError:function(t){console.error(t)};function zh(t){this._internalRoot=t}Zc.prototype.render=zh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(pe(409));Jc(t,e,null,null)};Zc.prototype.unmount=zh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;os(function(){Jc(null,t,null,null)}),e[Gi]=null}};function Zc(t){this._internalRoot=t}Zc.prototype.unstable_scheduleHydration=function(t){if(t){var e=L0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<cr.length&&e!==0&&e<cr[n].priority;n++);cr.splice(n,0,t),n===0&&D0(t)}};function Bh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Qc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Bm(){}function xS(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var u=Cc(o);s.call(u)}}var o=ev(e,i,t,0,null,!1,!1,"",Bm);return t._reactRootContainer=o,t[Gi]=o.current,ya(t.nodeType===8?t.parentNode:t),os(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var l=i;i=function(){var u=Cc(c);l.call(u)}}var c=kh(t,0,!1,null,null,!1,!1,"",Bm);return t._reactRootContainer=c,t[Gi]=c.current,ya(t.nodeType===8?t.parentNode:t),os(function(){Jc(e,c,n,i)}),c}function eu(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var l=r;r=function(){var c=Cc(o);l.call(c)}}Jc(e,o,t,r)}else o=xS(n,e,t,r,i);return Cc(o)}P0=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=qo(e.pendingLanes);n!==0&&(sh(e,n|1),Tn(e,Ft()),!(ht&6)&&(ho=Ft()+500,Rr()))}break;case 13:os(function(){var i=Wi(t,1);if(i!==null){var r=fn();fi(i,t,1,r)}}),Fh(t,1)}};oh=function(t){if(t.tag===13){var e=Wi(t,134217728);if(e!==null){var n=fn();fi(e,t,134217728,n)}Fh(t,134217728)}};N0=function(t){if(t.tag===13){var e=Mr(t),n=Wi(t,e);if(n!==null){var i=fn();fi(n,t,e,i)}Fh(t,e)}};L0=function(){return xt};I0=function(t,e){var n=xt;try{return xt=t,e()}finally{xt=n}};Ad=function(t,e,n){switch(e){case"input":if(_d(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Gc(i);if(!r)throw Error(pe(90));u0(i),_d(i,r)}}}break;case"textarea":f0(t,n);break;case"select":e=n.value,e!=null&&Js(t,!!n.multiple,e,!1)}};y0=Ih;_0=os;var vS={usingClientEntryPoint:!1,Events:[Oa,Vs,Gc,x0,v0,Ih]},Fo={findFiberByHostInstance:qr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},yS={bundleType:Fo.bundleType,version:Fo.version,rendererPackageName:Fo.rendererPackageName,rendererConfig:Fo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ki.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=E0(t),t===null?null:t.stateNode},findFiberByHostInstance:Fo.findFiberByHostInstance||gS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var dl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!dl.isDisabled&&dl.supportsFiber)try{Bc=dl.inject(yS),wi=dl}catch{}}Fn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vS;Fn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Bh(e))throw Error(pe(200));return mS(t,e,null,n)};Fn.createRoot=function(t,e){if(!Bh(t))throw Error(pe(299));var n=!1,i="",r=tv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=kh(t,1,!1,null,null,n,!1,i,r),t[Gi]=e.current,ya(t.nodeType===8?t.parentNode:t),new zh(e)};Fn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(pe(188)):(t=Object.keys(t).join(","),Error(pe(268,t)));return t=E0(e),t=t===null?null:t.stateNode,t};Fn.flushSync=function(t){return os(t)};Fn.hydrate=function(t,e,n){if(!Qc(e))throw Error(pe(200));return eu(null,t,e,!0,n)};Fn.hydrateRoot=function(t,e,n){if(!Bh(t))throw Error(pe(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=tv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=ev(e,null,t,1,n??null,r,!1,s,o),t[Gi]=e.current,ya(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Zc(e)};Fn.render=function(t,e,n){if(!Qc(e))throw Error(pe(200));return eu(null,t,e,!1,n)};Fn.unmountComponentAtNode=function(t){if(!Qc(t))throw Error(pe(40));return t._reactRootContainer?(os(function(){eu(null,null,t,!1,function(){t._reactRootContainer=null,t[Gi]=null})}),!0):!1};Fn.unstable_batchedUpdates=Ih;Fn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Qc(n))throw Error(pe(200));if(t==null||t._reactInternals===void 0)throw Error(pe(38));return eu(t,e,n,!1,i)};Fn.version="18.3.1-next-f1338f8080-20240426";function nv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(nv)}catch(t){console.error(t)}}nv(),n0.exports=Fn;var _S=n0.exports,iv,jm=_S;iv=jm.createRoot,jm.hydrateRoot;/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const tu="164",rv=0,af=1,sv=2,jh=1,ov=2,yi=3,$i=0,hn=1,Mi=2,ji=0,es=1,lf=2,cf=3,uf=4,av=5,dr=100,lv=101,cv=102,uv=103,dv=104,fv=200,hv=201,pv=202,mv=203,Rc=204,Pc=205,gv=206,xv=207,vv=208,yv=209,_v=210,Sv=211,Mv=212,Ev=213,bv=214,wv=0,Tv=1,Av=2,Ca=3,Cv=4,Rv=5,Pv=6,Nv=7,nu=0,Lv=1,Iv=2,Hi=0,Dv=1,Uv=2,Ov=3,kv=4,Fv=5,zv=6,Bv=7,Hh=300,as=301,ls=302,Nc=303,Lc=304,Fa=306,Ic=1e3,pr=1001,Dc=1002,Un=1003,jv=1004,Jo=1005,Wn=1006,Zl=1007,mr=1008,Yi=1009,Hv=1010,Vv=1011,Vh=1012,Gh=1013,cs=1014,zi=1015,za=1016,Wh=1017,Xh=1018,yo=1020,Gv=35902,Wv=1021,Xv=1022,ui=1023,$v=1024,Yv=1025,ts=1026,po=1027,qv=1028,$h=1029,Kv=1030,Yh=1031,qh=1033,Ql=33776,ec=33777,tc=33778,nc=33779,df=35840,ff=35841,hf=35842,pf=35843,mf=36196,gf=37492,xf=37496,vf=37808,yf=37809,_f=37810,Sf=37811,Mf=37812,Ef=37813,bf=37814,wf=37815,Tf=37816,Af=37817,Cf=37818,Rf=37819,Pf=37820,Nf=37821,ic=36492,Lf=36494,If=36495,Jv=36283,Df=36284,Uf=36285,Of=36286,Zv=3200,Qv=3201,Kh=0,ey=1,Oi="",oi="srgb",Ji="srgb-linear",iu="display-p3",Ba="display-p3-linear",Ra="linear",St="srgb",Pa="rec709",Na="p3",Gr=7680,kf=519,ty=512,ny=513,iy=514,Jh=515,ry=516,sy=517,oy=518,ay=519,Ff=35044,zf="300 es",Ei=2e3,La=2001;class fs{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Fu=Math.PI/180,Bf=180/Math.PI;function ja(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(sn[t&255]+sn[t>>8&255]+sn[t>>16&255]+sn[t>>24&255]+"-"+sn[e&255]+sn[e>>8&255]+"-"+sn[e>>16&15|64]+sn[e>>24&255]+"-"+sn[n&63|128]+sn[n>>8&255]+"-"+sn[n>>16&255]+sn[n>>24&255]+sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]).toLowerCase()}function Mn(t,e,n){return Math.max(e,Math.min(n,t))}function SS(t,e){return(t%e+e)%e}function zu(t,e,n){return(1-n)*t+n*e}function zo(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function _n(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class ut{constructor(e=0,n=0){ut.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Mn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qe{constructor(e,n,i,r,s,o,l,c,u){Qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,l,c,u)}set(e,n,i,r,s,o,l,c,u){const p=this.elements;return p[0]=e,p[1]=r,p[2]=l,p[3]=n,p[4]=s,p[5]=c,p[6]=i,p[7]=o,p[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],l=i[3],c=i[6],u=i[1],p=i[4],f=i[7],h=i[2],m=i[5],y=i[8],S=r[0],g=r[3],d=r[6],x=r[1],v=r[4],b=r[7],L=r[2],R=r[5],A=r[8];return s[0]=o*S+l*x+c*L,s[3]=o*g+l*v+c*R,s[6]=o*d+l*b+c*A,s[1]=u*S+p*x+f*L,s[4]=u*g+p*v+f*R,s[7]=u*d+p*b+f*A,s[2]=h*S+m*x+y*L,s[5]=h*g+m*v+y*R,s[8]=h*d+m*b+y*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],l=e[5],c=e[6],u=e[7],p=e[8];return n*o*p-n*l*u-i*s*p+i*l*c+r*s*u-r*o*c}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],l=e[5],c=e[6],u=e[7],p=e[8],f=p*o-l*u,h=l*c-p*s,m=u*s-o*c,y=n*f+i*h+r*m;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/y;return e[0]=f*S,e[1]=(r*u-p*i)*S,e[2]=(l*i-r*o)*S,e[3]=h*S,e[4]=(p*n-r*c)*S,e[5]=(r*s-l*n)*S,e[6]=m*S,e[7]=(i*c-u*n)*S,e[8]=(o*n-i*s)*S,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,l){const c=Math.cos(s),u=Math.sin(s);return this.set(i*c,i*u,-i*(c*o+u*l)+o+e,-r*u,r*c,-r*(-u*o+c*l)+l+n,0,0,1),this}scale(e,n){return this.premultiply(Bu.makeScale(e,n)),this}rotate(e){return this.premultiply(Bu.makeRotation(-e)),this}translate(e,n){return this.premultiply(Bu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Bu=new Qe;function ly(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Uc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function cy(){const t=Uc("canvas");return t.style.display="block",t}const Hm={};function MS(t){t in Hm||(Hm[t]=!0,console.warn(t))}const Vm=new Qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Gm=new Qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),fl={[Ji]:{transfer:Ra,primaries:Pa,toReference:t=>t,fromReference:t=>t},[oi]:{transfer:St,primaries:Pa,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[Ba]:{transfer:Ra,primaries:Na,toReference:t=>t.applyMatrix3(Gm),fromReference:t=>t.applyMatrix3(Vm)},[iu]:{transfer:St,primaries:Na,toReference:t=>t.convertSRGBToLinear().applyMatrix3(Gm),fromReference:t=>t.applyMatrix3(Vm).convertLinearToSRGB()}},ES=new Set([Ji,Ba]),gt={enabled:!0,_workingColorSpace:Ji,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!ES.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=fl[e].toReference,r=fl[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return fl[t].primaries},getTransfer:function(t){return t===Oi?Ra:fl[t].transfer}};function ro(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function ju(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Ms;class uy{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ms===void 0&&(Ms=Uc("canvas")),Ms.width=e.width,Ms.height=e.height;const i=Ms.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ms}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Uc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ro(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(ro(n[i]/255)*255):n[i]=ro(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let bS=0;class Zh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bS++}),this.uuid=ja(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,l=r.length;o<l;o++)r[o].isDataTexture?s.push(Hu(r[o].image)):s.push(Hu(r[o]))}else s=Hu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Hu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?uy.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let wS=0;class pn extends fs{constructor(e=pn.DEFAULT_IMAGE,n=pn.DEFAULT_MAPPING,i=pr,r=pr,s=Wn,o=mr,l=ui,c=Yi,u=pn.DEFAULT_ANISOTROPY,p=Oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wS++}),this.uuid=ja(),this.name="",this.source=new Zh(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=l,this.internalFormat=null,this.type=c,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=p,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ic:e.x=e.x-Math.floor(e.x);break;case pr:e.x=e.x<0?0:1;break;case Dc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ic:e.y=e.y-Math.floor(e.y);break;case pr:e.y=e.y<0?0:1;break;case Dc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}pn.DEFAULT_IMAGE=null;pn.DEFAULT_MAPPING=Hh;pn.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,n=0,i=0,r=1){Tt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const c=e.elements,u=c[0],p=c[4],f=c[8],h=c[1],m=c[5],y=c[9],S=c[2],g=c[6],d=c[10];if(Math.abs(p-h)<.01&&Math.abs(f-S)<.01&&Math.abs(y-g)<.01){if(Math.abs(p+h)<.1&&Math.abs(f+S)<.1&&Math.abs(y+g)<.1&&Math.abs(u+m+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const v=(u+1)/2,b=(m+1)/2,L=(d+1)/2,R=(p+h)/4,A=(f+S)/4,k=(y+g)/4;return v>b&&v>L?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=R/i,s=A/i):b>L?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=R/r,s=k/r):L<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(L),i=A/s,r=k/s),this.set(i,r,s,n),this}let x=Math.sqrt((g-y)*(g-y)+(f-S)*(f-S)+(h-p)*(h-p));return Math.abs(x)<.001&&(x=1),this.x=(g-y)/x,this.y=(f-S)/x,this.z=(h-p)/x,this.w=Math.acos((u+m+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class dy extends fs{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Tt(0,0,e,n),this.scissorTest=!1,this.viewport=new Tt(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new pn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let l=0;l<o;l++)this.textures[l]=s.clone(),this.textures[l].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new Zh(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Tr extends dy{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Qh extends pn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Un,this.minFilter=Un,this.wrapR=pr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fy extends pn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Un,this.minFilter=Un,this.wrapR=pr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _o{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,l){let c=i[r+0],u=i[r+1],p=i[r+2],f=i[r+3];const h=s[o+0],m=s[o+1],y=s[o+2],S=s[o+3];if(l===0){e[n+0]=c,e[n+1]=u,e[n+2]=p,e[n+3]=f;return}if(l===1){e[n+0]=h,e[n+1]=m,e[n+2]=y,e[n+3]=S;return}if(f!==S||c!==h||u!==m||p!==y){let g=1-l;const d=c*h+u*m+p*y+f*S,x=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){const L=Math.sqrt(v),R=Math.atan2(L,d*x);g=Math.sin(g*R)/L,l=Math.sin(l*R)/L}const b=l*x;if(c=c*g+h*b,u=u*g+m*b,p=p*g+y*b,f=f*g+S*b,g===1-l){const L=1/Math.sqrt(c*c+u*u+p*p+f*f);c*=L,u*=L,p*=L,f*=L}}e[n]=c,e[n+1]=u,e[n+2]=p,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,o){const l=i[r],c=i[r+1],u=i[r+2],p=i[r+3],f=s[o],h=s[o+1],m=s[o+2],y=s[o+3];return e[n]=l*y+p*f+c*m-u*h,e[n+1]=c*y+p*h+u*f-l*m,e[n+2]=u*y+p*m+l*h-c*f,e[n+3]=p*y-l*f-c*h-u*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,l=Math.cos,c=Math.sin,u=l(i/2),p=l(r/2),f=l(s/2),h=c(i/2),m=c(r/2),y=c(s/2);switch(o){case"XYZ":this._x=h*p*f+u*m*y,this._y=u*m*f-h*p*y,this._z=u*p*y+h*m*f,this._w=u*p*f-h*m*y;break;case"YXZ":this._x=h*p*f+u*m*y,this._y=u*m*f-h*p*y,this._z=u*p*y-h*m*f,this._w=u*p*f+h*m*y;break;case"ZXY":this._x=h*p*f-u*m*y,this._y=u*m*f+h*p*y,this._z=u*p*y+h*m*f,this._w=u*p*f-h*m*y;break;case"ZYX":this._x=h*p*f-u*m*y,this._y=u*m*f+h*p*y,this._z=u*p*y-h*m*f,this._w=u*p*f+h*m*y;break;case"YZX":this._x=h*p*f+u*m*y,this._y=u*m*f+h*p*y,this._z=u*p*y-h*m*f,this._w=u*p*f-h*m*y;break;case"XZY":this._x=h*p*f-u*m*y,this._y=u*m*f-h*p*y,this._z=u*p*y+h*m*f,this._w=u*p*f+h*m*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],l=n[5],c=n[9],u=n[2],p=n[6],f=n[10],h=i+l+f;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(p-c)*m,this._y=(s-u)*m,this._z=(o-r)*m}else if(i>l&&i>f){const m=2*Math.sqrt(1+i-l-f);this._w=(p-c)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+u)/m}else if(l>f){const m=2*Math.sqrt(1+l-i-f);this._w=(s-u)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(c+p)/m}else{const m=2*Math.sqrt(1+f-i-l);this._w=(o-r)/m,this._x=(s+u)/m,this._y=(c+p)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mn(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,l=n._x,c=n._y,u=n._z,p=n._w;return this._x=i*p+o*l+r*u-s*c,this._y=r*p+o*c+s*l-i*u,this._z=s*p+o*u+i*c-r*l,this._w=o*p-i*l-r*c-s*u,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let l=o*e._w+i*e._x+r*e._y+s*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const c=1-l*l;if(c<=Number.EPSILON){const m=1-n;return this._w=m*o+n*this._w,this._x=m*i+n*this._x,this._y=m*r+n*this._y,this._z=m*s+n*this._z,this.normalize(),this}const u=Math.sqrt(c),p=Math.atan2(u,l),f=Math.sin((1-n)*p)/u,h=Math.sin(n*p)/u;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(e=0,n=0,i=0){V.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Wm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Wm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,l=e.z,c=e.w,u=2*(o*r-l*i),p=2*(l*n-s*r),f=2*(s*i-o*n);return this.x=n+c*u+o*f-l*p,this.y=i+c*p+l*u-s*f,this.z=r+c*f+s*p-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,l=n.y,c=n.z;return this.x=r*c-s*l,this.y=s*o-i*c,this.z=i*l-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Vu.copy(this).projectOnVector(e),this.sub(Vu)}reflect(e){return this.sub(Vu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Mn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Vu=new V,Wm=new _o;class So{constructor(e=new V(1/0,1/0,1/0),n=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(ti.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(ti.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=ti.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,l=s.count;o<l;o++)e.isMesh===!0?e.getVertexPosition(o,ti):ti.fromBufferAttribute(s,o),ti.applyMatrix4(e.matrixWorld),this.expandByPoint(ti);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),hl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),hl.copy(i.boundingBox)),hl.applyMatrix4(e.matrixWorld),this.union(hl)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ti),ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Bo),pl.subVectors(this.max,Bo),Es.subVectors(e.a,Bo),bs.subVectors(e.b,Bo),ws.subVectors(e.c,Bo),er.subVectors(bs,Es),tr.subVectors(ws,bs),Or.subVectors(Es,ws);let n=[0,-er.z,er.y,0,-tr.z,tr.y,0,-Or.z,Or.y,er.z,0,-er.x,tr.z,0,-tr.x,Or.z,0,-Or.x,-er.y,er.x,0,-tr.y,tr.x,0,-Or.y,Or.x,0];return!Gu(n,Es,bs,ws,pl)||(n=[1,0,0,0,1,0,0,0,1],!Gu(n,Es,bs,ws,pl))?!1:(ml.crossVectors(er,tr),n=[ml.x,ml.y,ml.z],Gu(n,Es,bs,ws,pl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ti).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ti).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ri=[new V,new V,new V,new V,new V,new V,new V,new V],ti=new V,hl=new So,Es=new V,bs=new V,ws=new V,er=new V,tr=new V,Or=new V,Bo=new V,pl=new V,ml=new V,kr=new V;function Gu(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){kr.fromArray(t,s);const l=r.x*Math.abs(kr.x)+r.y*Math.abs(kr.y)+r.z*Math.abs(kr.z),c=e.dot(kr),u=n.dot(kr),p=i.dot(kr);if(Math.max(-Math.max(c,u,p),Math.min(c,u,p))>l)return!1}return!0}const TS=new So,jo=new V,Wu=new V;class Mo{constructor(e=new V,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):TS.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;jo.subVectors(e,this.center);const n=jo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(jo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(jo.copy(e.center).add(Wu)),this.expandByPoint(jo.copy(e.center).sub(Wu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Pi=new V,Xu=new V,gl=new V,nr=new V,$u=new V,xl=new V,Yu=new V;class Ha{constructor(e=new V,n=new V(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Pi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Pi.copy(this.origin).addScaledVector(this.direction,n),Pi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Xu.copy(e).add(n).multiplyScalar(.5),gl.copy(n).sub(e).normalize(),nr.copy(this.origin).sub(Xu);const s=e.distanceTo(n)*.5,o=-this.direction.dot(gl),l=nr.dot(this.direction),c=-nr.dot(gl),u=nr.lengthSq(),p=Math.abs(1-o*o);let f,h,m,y;if(p>0)if(f=o*c-l,h=o*l-c,y=s*p,f>=0)if(h>=-y)if(h<=y){const S=1/p;f*=S,h*=S,m=f*(f+o*h+2*l)+h*(o*f+h+2*c)+u}else h=s,f=Math.max(0,-(o*h+l)),m=-f*f+h*(h+2*c)+u;else h=-s,f=Math.max(0,-(o*h+l)),m=-f*f+h*(h+2*c)+u;else h<=-y?(f=Math.max(0,-(-o*s+l)),h=f>0?-s:Math.min(Math.max(-s,-c),s),m=-f*f+h*(h+2*c)+u):h<=y?(f=0,h=Math.min(Math.max(-s,-c),s),m=h*(h+2*c)+u):(f=Math.max(0,-(o*s+l)),h=f>0?s:Math.min(Math.max(-s,-c),s),m=-f*f+h*(h+2*c)+u);else h=o>0?-s:s,f=Math.max(0,-(o*h+l)),m=-f*f+h*(h+2*c)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Xu).addScaledVector(gl,h),m}intersectSphere(e,n){Pi.subVectors(e.center,this.origin);const i=Pi.dot(this.direction),r=Pi.dot(Pi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),l=i-o,c=i+o;return c<0?null:l<0?this.at(c,n):this.at(l,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,l,c;const u=1/this.direction.x,p=1/this.direction.y,f=1/this.direction.z,h=this.origin;return u>=0?(i=(e.min.x-h.x)*u,r=(e.max.x-h.x)*u):(i=(e.max.x-h.x)*u,r=(e.min.x-h.x)*u),p>=0?(s=(e.min.y-h.y)*p,o=(e.max.y-h.y)*p):(s=(e.max.y-h.y)*p,o=(e.min.y-h.y)*p),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(l=(e.min.z-h.z)*f,c=(e.max.z-h.z)*f):(l=(e.max.z-h.z)*f,c=(e.min.z-h.z)*f),i>c||l>r)||((l>i||i!==i)&&(i=l),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Pi)!==null}intersectTriangle(e,n,i,r,s){$u.subVectors(n,e),xl.subVectors(i,e),Yu.crossVectors($u,xl);let o=this.direction.dot(Yu),l;if(o>0){if(r)return null;l=1}else if(o<0)l=-1,o=-o;else return null;nr.subVectors(this.origin,e);const c=l*this.direction.dot(xl.crossVectors(nr,xl));if(c<0)return null;const u=l*this.direction.dot($u.cross(nr));if(u<0||c+u>o)return null;const p=-l*nr.dot(Yu);return p<0?null:this.at(p/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Et{constructor(e,n,i,r,s,o,l,c,u,p,f,h,m,y,S,g){Et.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,l,c,u,p,f,h,m,y,S,g)}set(e,n,i,r,s,o,l,c,u,p,f,h,m,y,S,g){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=l,d[13]=c,d[2]=u,d[6]=p,d[10]=f,d[14]=h,d[3]=m,d[7]=y,d[11]=S,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Et().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Ts.setFromMatrixColumn(e,0).length(),s=1/Ts.setFromMatrixColumn(e,1).length(),o=1/Ts.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),l=Math.sin(i),c=Math.cos(r),u=Math.sin(r),p=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*p,m=o*f,y=l*p,S=l*f;n[0]=c*p,n[4]=-c*f,n[8]=u,n[1]=m+y*u,n[5]=h-S*u,n[9]=-l*c,n[2]=S-h*u,n[6]=y+m*u,n[10]=o*c}else if(e.order==="YXZ"){const h=c*p,m=c*f,y=u*p,S=u*f;n[0]=h+S*l,n[4]=y*l-m,n[8]=o*u,n[1]=o*f,n[5]=o*p,n[9]=-l,n[2]=m*l-y,n[6]=S+h*l,n[10]=o*c}else if(e.order==="ZXY"){const h=c*p,m=c*f,y=u*p,S=u*f;n[0]=h-S*l,n[4]=-o*f,n[8]=y+m*l,n[1]=m+y*l,n[5]=o*p,n[9]=S-h*l,n[2]=-o*u,n[6]=l,n[10]=o*c}else if(e.order==="ZYX"){const h=o*p,m=o*f,y=l*p,S=l*f;n[0]=c*p,n[4]=y*u-m,n[8]=h*u+S,n[1]=c*f,n[5]=S*u+h,n[9]=m*u-y,n[2]=-u,n[6]=l*c,n[10]=o*c}else if(e.order==="YZX"){const h=o*c,m=o*u,y=l*c,S=l*u;n[0]=c*p,n[4]=S-h*f,n[8]=y*f+m,n[1]=f,n[5]=o*p,n[9]=-l*p,n[2]=-u*p,n[6]=m*f+y,n[10]=h-S*f}else if(e.order==="XZY"){const h=o*c,m=o*u,y=l*c,S=l*u;n[0]=c*p,n[4]=-f,n[8]=u*p,n[1]=h*f+S,n[5]=o*p,n[9]=m*f-y,n[2]=y*f-m,n[6]=l*p,n[10]=S*f+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(AS,e,CS)}lookAt(e,n,i){const r=this.elements;return Rn.subVectors(e,n),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),ir.crossVectors(i,Rn),ir.lengthSq()===0&&(Math.abs(i.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),ir.crossVectors(i,Rn)),ir.normalize(),vl.crossVectors(Rn,ir),r[0]=ir.x,r[4]=vl.x,r[8]=Rn.x,r[1]=ir.y,r[5]=vl.y,r[9]=Rn.y,r[2]=ir.z,r[6]=vl.z,r[10]=Rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],l=i[4],c=i[8],u=i[12],p=i[1],f=i[5],h=i[9],m=i[13],y=i[2],S=i[6],g=i[10],d=i[14],x=i[3],v=i[7],b=i[11],L=i[15],R=r[0],A=r[4],k=r[8],w=r[12],M=r[1],B=r[5],z=r[9],D=r[13],U=r[2],ee=r[6],ae=r[10],ne=r[14],I=r[3],W=r[7],G=r[11],fe=r[15];return s[0]=o*R+l*M+c*U+u*I,s[4]=o*A+l*B+c*ee+u*W,s[8]=o*k+l*z+c*ae+u*G,s[12]=o*w+l*D+c*ne+u*fe,s[1]=p*R+f*M+h*U+m*I,s[5]=p*A+f*B+h*ee+m*W,s[9]=p*k+f*z+h*ae+m*G,s[13]=p*w+f*D+h*ne+m*fe,s[2]=y*R+S*M+g*U+d*I,s[6]=y*A+S*B+g*ee+d*W,s[10]=y*k+S*z+g*ae+d*G,s[14]=y*w+S*D+g*ne+d*fe,s[3]=x*R+v*M+b*U+L*I,s[7]=x*A+v*B+b*ee+L*W,s[11]=x*k+v*z+b*ae+L*G,s[15]=x*w+v*D+b*ne+L*fe,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],l=e[5],c=e[9],u=e[13],p=e[2],f=e[6],h=e[10],m=e[14],y=e[3],S=e[7],g=e[11],d=e[15];return y*(+s*c*f-r*u*f-s*l*h+i*u*h+r*l*m-i*c*m)+S*(+n*c*m-n*u*h+s*o*h-r*o*m+r*u*p-s*c*p)+g*(+n*u*f-n*l*m-s*o*f+i*o*m+s*l*p-i*u*p)+d*(-r*l*p-n*c*f+n*l*h+r*o*f-i*o*h+i*c*p)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],l=e[5],c=e[6],u=e[7],p=e[8],f=e[9],h=e[10],m=e[11],y=e[12],S=e[13],g=e[14],d=e[15],x=f*g*u-S*h*u+S*c*m-l*g*m-f*c*d+l*h*d,v=y*h*u-p*g*u-y*c*m+o*g*m+p*c*d-o*h*d,b=p*S*u-y*f*u+y*l*m-o*S*m-p*l*d+o*f*d,L=y*f*c-p*S*c-y*l*h+o*S*h+p*l*g-o*f*g,R=n*x+i*v+r*b+s*L;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return e[0]=x*A,e[1]=(S*h*s-f*g*s-S*r*m+i*g*m+f*r*d-i*h*d)*A,e[2]=(l*g*s-S*c*s+S*r*u-i*g*u-l*r*d+i*c*d)*A,e[3]=(f*c*s-l*h*s-f*r*u+i*h*u+l*r*m-i*c*m)*A,e[4]=v*A,e[5]=(p*g*s-y*h*s+y*r*m-n*g*m-p*r*d+n*h*d)*A,e[6]=(y*c*s-o*g*s-y*r*u+n*g*u+o*r*d-n*c*d)*A,e[7]=(o*h*s-p*c*s+p*r*u-n*h*u-o*r*m+n*c*m)*A,e[8]=b*A,e[9]=(y*f*s-p*S*s-y*i*m+n*S*m+p*i*d-n*f*d)*A,e[10]=(o*S*s-y*l*s+y*i*u-n*S*u-o*i*d+n*l*d)*A,e[11]=(p*l*s-o*f*s-p*i*u+n*f*u+o*i*m-n*l*m)*A,e[12]=L*A,e[13]=(p*S*r-y*f*r+y*i*h-n*S*h-p*i*g+n*f*g)*A,e[14]=(y*l*r-o*S*r-y*i*c+n*S*c+o*i*g-n*l*g)*A,e[15]=(o*f*r-p*l*r+p*i*c-n*f*c-o*i*h+n*l*h)*A,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,l=e.y,c=e.z,u=s*o,p=s*l;return this.set(u*o+i,u*l-r*c,u*c+r*l,0,u*l+r*c,p*l+i,p*c-r*o,0,u*c-r*l,p*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,l=n._z,c=n._w,u=s+s,p=o+o,f=l+l,h=s*u,m=s*p,y=s*f,S=o*p,g=o*f,d=l*f,x=c*u,v=c*p,b=c*f,L=i.x,R=i.y,A=i.z;return r[0]=(1-(S+d))*L,r[1]=(m+b)*L,r[2]=(y-v)*L,r[3]=0,r[4]=(m-b)*R,r[5]=(1-(h+d))*R,r[6]=(g+x)*R,r[7]=0,r[8]=(y+v)*A,r[9]=(g-x)*A,r[10]=(1-(h+S))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Ts.set(r[0],r[1],r[2]).length();const o=Ts.set(r[4],r[5],r[6]).length(),l=Ts.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],ni.copy(this);const u=1/s,p=1/o,f=1/l;return ni.elements[0]*=u,ni.elements[1]*=u,ni.elements[2]*=u,ni.elements[4]*=p,ni.elements[5]*=p,ni.elements[6]*=p,ni.elements[8]*=f,ni.elements[9]*=f,ni.elements[10]*=f,n.setFromRotationMatrix(ni),i.x=s,i.y=o,i.z=l,this}makePerspective(e,n,i,r,s,o,l=Ei){const c=this.elements,u=2*s/(n-e),p=2*s/(i-r),f=(n+e)/(n-e),h=(i+r)/(i-r);let m,y;if(l===Ei)m=-(o+s)/(o-s),y=-2*o*s/(o-s);else if(l===La)m=-o/(o-s),y=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=p,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,o,l=Ei){const c=this.elements,u=1/(n-e),p=1/(i-r),f=1/(o-s),h=(n+e)*u,m=(i+r)*p;let y,S;if(l===Ei)y=(o+s)*f,S=-2*f;else if(l===La)y=s*f,S=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return c[0]=2*u,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*p,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=S,c[14]=-y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Ts=new V,ni=new Et,AS=new V(0,0,0),CS=new V(1,1,1),ir=new V,vl=new V,Rn=new V,Xm=new Et,$m=new _o;class mi{constructor(e=0,n=0,i=0,r=mi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],l=r[8],c=r[1],u=r[5],p=r[9],f=r[2],h=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(Mn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-p,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Mn(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(l,m),this._z=Math.atan2(c,u)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Mn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Mn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(Mn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-p,u),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(l,m));break;case"XZY":this._z=Math.asin(-Mn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(l,s)):(this._x=Math.atan2(-p,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Xm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Xm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return $m.setFromEuler(this),this.setFromQuaternion($m,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}mi.DEFAULT_ORDER="XYZ";class ru{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let RS=0;const Ym=new V,As=new _o,Ni=new Et,yl=new V,Ho=new V,PS=new V,NS=new _o,qm=new V(1,0,0),Km=new V(0,1,0),Jm=new V(0,0,1),Zm={type:"added"},LS={type:"removed"},Cs={type:"childadded",child:null},qu={type:"childremoved",child:null};class en extends fs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:RS++}),this.uuid=ja(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=en.DEFAULT_UP.clone();const e=new V,n=new mi,i=new _o,r=new V(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Et},normalMatrix:{value:new Qe}}),this.matrix=new Et,this.matrixWorld=new Et,this.matrixAutoUpdate=en.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ru,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return As.setFromAxisAngle(e,n),this.quaternion.multiply(As),this}rotateOnWorldAxis(e,n){return As.setFromAxisAngle(e,n),this.quaternion.premultiply(As),this}rotateX(e){return this.rotateOnAxis(qm,e)}rotateY(e){return this.rotateOnAxis(Km,e)}rotateZ(e){return this.rotateOnAxis(Jm,e)}translateOnAxis(e,n){return Ym.copy(e).applyQuaternion(this.quaternion),this.position.add(Ym.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(qm,e)}translateY(e){return this.translateOnAxis(Km,e)}translateZ(e){return this.translateOnAxis(Jm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ni.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?yl.copy(e):yl.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ho.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ni.lookAt(Ho,yl,this.up):Ni.lookAt(yl,Ho,this.up),this.quaternion.setFromRotationMatrix(Ni),r&&(Ni.extractRotation(r.matrixWorld),As.setFromRotationMatrix(Ni),this.quaternion.premultiply(As.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Zm),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(LS),qu.child=e,this.dispatchEvent(qu),qu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ni),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Zm),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ho,e,PS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ho,NS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const l=r[s];l.matrixWorldAutoUpdate===!0&&l.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(l,c){return l[c.uuid]===void 0&&(l[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const c=l.shapes;if(Array.isArray(c))for(let u=0,p=c.length;u<p;u++){const f=c[u];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let c=0,u=this.material.length;c<u;c++)l.push(s(e.materials,this.material[c]));r.material=l}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){const c=this.animations[l];r.animations.push(s(e.animations,c))}}if(n){const l=o(e.geometries),c=o(e.materials),u=o(e.textures),p=o(e.images),f=o(e.shapes),h=o(e.skeletons),m=o(e.animations),y=o(e.nodes);l.length>0&&(i.geometries=l),c.length>0&&(i.materials=c),u.length>0&&(i.textures=u),p.length>0&&(i.images=p),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),y.length>0&&(i.nodes=y)}return i.object=r,i;function o(l){const c=[];for(const u in l){const p=l[u];delete p.metadata,c.push(p)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}en.DEFAULT_UP=new V(0,1,0);en.DEFAULT_MATRIX_AUTO_UPDATE=!0;en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ii=new V,Li=new V,Ku=new V,Ii=new V,Rs=new V,Ps=new V,Qm=new V,Ju=new V,Zu=new V,Qu=new V;class ci{constructor(e=new V,n=new V,i=new V){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),ii.subVectors(e,n),r.cross(ii);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){ii.subVectors(r,n),Li.subVectors(i,n),Ku.subVectors(e,n);const o=ii.dot(ii),l=ii.dot(Li),c=ii.dot(Ku),u=Li.dot(Li),p=Li.dot(Ku),f=o*u-l*l;if(f===0)return s.set(0,0,0),null;const h=1/f,m=(u*c-l*p)*h,y=(o*p-l*c)*h;return s.set(1-m-y,y,m)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getInterpolation(e,n,i,r,s,o,l,c){return this.getBarycoord(e,n,i,r,Ii)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ii.x),c.addScaledVector(o,Ii.y),c.addScaledVector(l,Ii.z),c)}static isFrontFacing(e,n,i,r){return ii.subVectors(i,n),Li.subVectors(e,n),ii.cross(Li).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ii.subVectors(this.c,this.b),Li.subVectors(this.a,this.b),ii.cross(Li).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ci.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ci.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return ci.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return ci.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ci.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,l;Rs.subVectors(r,i),Ps.subVectors(s,i),Ju.subVectors(e,i);const c=Rs.dot(Ju),u=Ps.dot(Ju);if(c<=0&&u<=0)return n.copy(i);Zu.subVectors(e,r);const p=Rs.dot(Zu),f=Ps.dot(Zu);if(p>=0&&f<=p)return n.copy(r);const h=c*f-p*u;if(h<=0&&c>=0&&p<=0)return o=c/(c-p),n.copy(i).addScaledVector(Rs,o);Qu.subVectors(e,s);const m=Rs.dot(Qu),y=Ps.dot(Qu);if(y>=0&&m<=y)return n.copy(s);const S=m*u-c*y;if(S<=0&&u>=0&&y<=0)return l=u/(u-y),n.copy(i).addScaledVector(Ps,l);const g=p*y-m*f;if(g<=0&&f-p>=0&&m-y>=0)return Qm.subVectors(s,r),l=(f-p)/(f-p+(m-y)),n.copy(r).addScaledVector(Qm,l);const d=1/(g+S+h);return o=S*d,l=h*d,n.copy(i).addScaledVector(Rs,o).addScaledVector(Ps,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const hy={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rr={h:0,s:0,l:0},_l={h:0,s:0,l:0};function ed(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class ot{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=oi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,gt.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=gt.workingColorSpace){return this.r=e,this.g=n,this.b=i,gt.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=gt.workingColorSpace){if(e=SS(e,1),n=Mn(n,0,1),i=Mn(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=ed(o,s,e+1/3),this.g=ed(o,s,e),this.b=ed(o,s,e-1/3)}return gt.toWorkingColorSpace(this,r),this}setStyle(e,n=oi){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],l=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=oi){const i=hy[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ro(e.r),this.g=ro(e.g),this.b=ro(e.b),this}copyLinearToSRGB(e){return this.r=ju(e.r),this.g=ju(e.g),this.b=ju(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=oi){return gt.fromWorkingColorSpace(on.copy(this),e),Math.round(Mn(on.r*255,0,255))*65536+Math.round(Mn(on.g*255,0,255))*256+Math.round(Mn(on.b*255,0,255))}getHexString(e=oi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=gt.workingColorSpace){gt.fromWorkingColorSpace(on.copy(this),n);const i=on.r,r=on.g,s=on.b,o=Math.max(i,r,s),l=Math.min(i,r,s);let c,u;const p=(l+o)/2;if(l===o)c=0,u=0;else{const f=o-l;switch(u=p<=.5?f/(o+l):f/(2-o-l),o){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=u,e.l=p,e}getRGB(e,n=gt.workingColorSpace){return gt.fromWorkingColorSpace(on.copy(this),n),e.r=on.r,e.g=on.g,e.b=on.b,e}getStyle(e=oi){gt.fromWorkingColorSpace(on.copy(this),e);const n=on.r,i=on.g,r=on.b;return e!==oi?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(rr),this.setHSL(rr.h+e,rr.s+n,rr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(rr),e.getHSL(_l);const i=zu(rr.h,_l.h,n),r=zu(rr.s,_l.s,n),s=zu(rr.l,_l.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new ot;ot.NAMES=hy;let IS=0;class Pr extends fs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:IS++}),this.uuid=ja(),this.name="",this.type="Material",this.blending=es,this.side=$i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Rc,this.blendDst=Pc,this.blendEquation=dr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=Ca,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=kf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gr,this.stencilZFail=Gr,this.stencilZPass=Gr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==es&&(i.blending=this.blending),this.side!==$i&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Rc&&(i.blendSrc=this.blendSrc),this.blendDst!==Pc&&(i.blendDst=this.blendDst),this.blendEquation!==dr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ca&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==kf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Gr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Gr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const l in s){const c=s[l];delete c.metadata,o.push(c)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ep extends Pr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mi,this.combine=nu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Bt=new V,Sl=new ut;class hi{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Ff,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=zi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return MS("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Sl.fromBufferAttribute(this,n),Sl.applyMatrix3(e),this.setXY(n,Sl.x,Sl.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Bt.fromBufferAttribute(this,n),Bt.applyMatrix3(e),this.setXYZ(n,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Bt.fromBufferAttribute(this,n),Bt.applyMatrix4(e),this.setXYZ(n,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Bt.fromBufferAttribute(this,n),Bt.applyNormalMatrix(e),this.setXYZ(n,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Bt.fromBufferAttribute(this,n),Bt.transformDirection(e),this.setXYZ(n,Bt.x,Bt.y,Bt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=zo(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=_n(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=zo(n,this.array)),n}setX(e,n){return this.normalized&&(n=_n(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=zo(n,this.array)),n}setY(e,n){return this.normalized&&(n=_n(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=zo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=_n(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=zo(n,this.array)),n}setW(e,n){return this.normalized&&(n=_n(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=_n(n,this.array),i=_n(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=_n(n,this.array),i=_n(i,this.array),r=_n(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=_n(n,this.array),i=_n(i,this.array),r=_n(r,this.array),s=_n(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ff&&(e.usage=this.usage),e}}class tp extends hi{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class np extends hi{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class mn extends hi{constructor(e,n,i){super(new Float32Array(e),n,i)}}let DS=0;const jn=new Et,td=new en,Ns=new V,Pn=new So,Vo=new So,$t=new V;class Kn extends fs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:DS++}),this.uuid=ja(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ly(e)?np:tp)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Qe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return jn.makeRotationFromQuaternion(e),this.applyMatrix4(jn),this}rotateX(e){return jn.makeRotationX(e),this.applyMatrix4(jn),this}rotateY(e){return jn.makeRotationY(e),this.applyMatrix4(jn),this}rotateZ(e){return jn.makeRotationZ(e),this.applyMatrix4(jn),this}translate(e,n,i){return jn.makeTranslation(e,n,i),this.applyMatrix4(jn),this}scale(e,n,i){return jn.makeScale(e,n,i),this.applyMatrix4(jn),this}lookAt(e){return td.lookAt(e),td.updateMatrix(),this.applyMatrix4(td.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ns).negate(),this.translate(Ns.x,Ns.y,Ns.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new mn(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new So);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Pn.setFromBufferAttribute(s),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,Pn.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,Pn.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(Pn.min),this.boundingBox.expandByPoint(Pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const i=this.boundingSphere.center;if(Pn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const l=n[s];Vo.setFromBufferAttribute(l),this.morphTargetsRelative?($t.addVectors(Pn.min,Vo.min),Pn.expandByPoint($t),$t.addVectors(Pn.max,Vo.max),Pn.expandByPoint($t)):(Pn.expandByPoint(Vo.min),Pn.expandByPoint(Vo.max))}Pn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)$t.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared($t));if(n)for(let s=0,o=n.length;s<o;s++){const l=n[s],c=this.morphTargetsRelative;for(let u=0,p=l.count;u<p;u++)$t.fromBufferAttribute(l,u),c&&(Ns.fromBufferAttribute(e,u),$t.add(Ns)),r=Math.max(r,i.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hi(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),l=[],c=[];for(let k=0;k<i.count;k++)l[k]=new V,c[k]=new V;const u=new V,p=new V,f=new V,h=new ut,m=new ut,y=new ut,S=new V,g=new V;function d(k,w,M){u.fromBufferAttribute(i,k),p.fromBufferAttribute(i,w),f.fromBufferAttribute(i,M),h.fromBufferAttribute(s,k),m.fromBufferAttribute(s,w),y.fromBufferAttribute(s,M),p.sub(u),f.sub(u),m.sub(h),y.sub(h);const B=1/(m.x*y.y-y.x*m.y);isFinite(B)&&(S.copy(p).multiplyScalar(y.y).addScaledVector(f,-m.y).multiplyScalar(B),g.copy(f).multiplyScalar(m.x).addScaledVector(p,-y.x).multiplyScalar(B),l[k].add(S),l[w].add(S),l[M].add(S),c[k].add(g),c[w].add(g),c[M].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let k=0,w=x.length;k<w;++k){const M=x[k],B=M.start,z=M.count;for(let D=B,U=B+z;D<U;D+=3)d(e.getX(D+0),e.getX(D+1),e.getX(D+2))}const v=new V,b=new V,L=new V,R=new V;function A(k){L.fromBufferAttribute(r,k),R.copy(L);const w=l[k];v.copy(w),v.sub(L.multiplyScalar(L.dot(w))).normalize(),b.crossVectors(R,w);const B=b.dot(c[k])<0?-1:1;o.setXYZW(k,v.x,v.y,v.z,B)}for(let k=0,w=x.length;k<w;++k){const M=x[k],B=M.start,z=M.count;for(let D=B,U=B+z;D<U;D+=3)A(e.getX(D+0)),A(e.getX(D+1)),A(e.getX(D+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new hi(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new V,s=new V,o=new V,l=new V,c=new V,u=new V,p=new V,f=new V;if(e)for(let h=0,m=e.count;h<m;h+=3){const y=e.getX(h+0),S=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(n,y),s.fromBufferAttribute(n,S),o.fromBufferAttribute(n,g),p.subVectors(o,s),f.subVectors(r,s),p.cross(f),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,S),u.fromBufferAttribute(i,g),l.add(p),c.add(p),u.add(p),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(S,c.x,c.y,c.z),i.setXYZ(g,u.x,u.y,u.z)}else for(let h=0,m=n.count;h<m;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),o.fromBufferAttribute(n,h+2),p.subVectors(o,s),f.subVectors(r,s),p.cross(f),i.setXYZ(h+0,p.x,p.y,p.z),i.setXYZ(h+1,p.x,p.y,p.z),i.setXYZ(h+2,p.x,p.y,p.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)$t.fromBufferAttribute(e,n),$t.normalize(),e.setXYZ(n,$t.x,$t.y,$t.z)}toNonIndexed(){function e(l,c){const u=l.array,p=l.itemSize,f=l.normalized,h=new u.constructor(c.length*p);let m=0,y=0;for(let S=0,g=c.length;S<g;S++){l.isInterleavedBufferAttribute?m=c[S]*l.data.stride+l.offset:m=c[S]*p;for(let d=0;d<p;d++)h[y++]=u[m++]}return new hi(h,p,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Kn,i=this.index.array,r=this.attributes;for(const l in r){const c=r[l],u=e(c,i);n.setAttribute(l,u)}const s=this.morphAttributes;for(const l in s){const c=[],u=s[l];for(let p=0,f=u.length;p<f;p++){const h=u[p],m=e(h,i);c.push(m)}n.morphAttributes[l]=c}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let l=0,c=o.length;l<c;l++){const u=o[l];n.addGroup(u.start,u.count,u.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const u in c)c[u]!==void 0&&(e[u]=c[u]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const u=i[c];e.data.attributes[c]=u.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const u=this.morphAttributes[c],p=[];for(let f=0,h=u.length;f<h;f++){const m=u[f];p.push(m.toJSON(e.data))}p.length>0&&(r[c]=p,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const u in r){const p=r[u];this.setAttribute(u,p.clone(n))}const s=e.morphAttributes;for(const u in s){const p=[],f=s[u];for(let h=0,m=f.length;h<m;h++)p.push(f[h].clone(n));this.morphAttributes[u]=p}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,p=o.length;u<p;u++){const f=o[u];this.addGroup(f.start,f.count,f.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const eg=new Et,Fr=new Ha,Ml=new Mo,tg=new V,Ls=new V,Is=new V,Ds=new V,nd=new V,El=new V,bl=new ut,wl=new ut,Tl=new ut,ng=new V,ig=new V,rg=new V,Al=new V,Cl=new V;class bi extends en{constructor(e=new Kn,n=new ep){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const l=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const l=this.morphTargetInfluences;if(s&&l){El.set(0,0,0);for(let c=0,u=s.length;c<u;c++){const p=l[c],f=s[c];p!==0&&(nd.fromBufferAttribute(f,e),o?El.addScaledVector(nd,p):El.addScaledVector(nd.sub(n),p))}n.add(El)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ml.copy(i.boundingSphere),Ml.applyMatrix4(s),Fr.copy(e.ray).recast(e.near),!(Ml.containsPoint(Fr.origin)===!1&&(Fr.intersectSphere(Ml,tg)===null||Fr.origin.distanceToSquared(tg)>(e.far-e.near)**2))&&(eg.copy(s).invert(),Fr.copy(e.ray).applyMatrix4(eg),!(i.boundingBox!==null&&Fr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Fr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,l=s.index,c=s.attributes.position,u=s.attributes.uv,p=s.attributes.uv1,f=s.attributes.normal,h=s.groups,m=s.drawRange;if(l!==null)if(Array.isArray(o))for(let y=0,S=h.length;y<S;y++){const g=h[y],d=o[g.materialIndex],x=Math.max(g.start,m.start),v=Math.min(l.count,Math.min(g.start+g.count,m.start+m.count));for(let b=x,L=v;b<L;b+=3){const R=l.getX(b),A=l.getX(b+1),k=l.getX(b+2);r=Rl(this,d,e,i,u,p,f,R,A,k),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const y=Math.max(0,m.start),S=Math.min(l.count,m.start+m.count);for(let g=y,d=S;g<d;g+=3){const x=l.getX(g),v=l.getX(g+1),b=l.getX(g+2);r=Rl(this,o,e,i,u,p,f,x,v,b),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let y=0,S=h.length;y<S;y++){const g=h[y],d=o[g.materialIndex],x=Math.max(g.start,m.start),v=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let b=x,L=v;b<L;b+=3){const R=b,A=b+1,k=b+2;r=Rl(this,d,e,i,u,p,f,R,A,k),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const y=Math.max(0,m.start),S=Math.min(c.count,m.start+m.count);for(let g=y,d=S;g<d;g+=3){const x=g,v=g+1,b=g+2;r=Rl(this,o,e,i,u,p,f,x,v,b),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function US(t,e,n,i,r,s,o,l){let c;if(e.side===hn?c=i.intersectTriangle(o,s,r,!0,l):c=i.intersectTriangle(r,s,o,e.side===$i,l),c===null)return null;Cl.copy(l),Cl.applyMatrix4(t.matrixWorld);const u=n.ray.origin.distanceTo(Cl);return u<n.near||u>n.far?null:{distance:u,point:Cl.clone(),object:t}}function Rl(t,e,n,i,r,s,o,l,c,u){t.getVertexPosition(l,Ls),t.getVertexPosition(c,Is),t.getVertexPosition(u,Ds);const p=US(t,e,n,i,Ls,Is,Ds,Al);if(p){r&&(bl.fromBufferAttribute(r,l),wl.fromBufferAttribute(r,c),Tl.fromBufferAttribute(r,u),p.uv=ci.getInterpolation(Al,Ls,Is,Ds,bl,wl,Tl,new ut)),s&&(bl.fromBufferAttribute(s,l),wl.fromBufferAttribute(s,c),Tl.fromBufferAttribute(s,u),p.uv1=ci.getInterpolation(Al,Ls,Is,Ds,bl,wl,Tl,new ut)),o&&(ng.fromBufferAttribute(o,l),ig.fromBufferAttribute(o,c),rg.fromBufferAttribute(o,u),p.normal=ci.getInterpolation(Al,Ls,Is,Ds,ng,ig,rg,new V),p.normal.dot(i.direction)>0&&p.normal.multiplyScalar(-1));const f={a:l,b:c,c:u,normal:new V,materialIndex:0};ci.getNormal(Ls,Is,Ds,f.normal),p.face=f}return p}class Eo extends Kn{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const l=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],u=[],p=[],f=[];let h=0,m=0;y("z","y","x",-1,-1,i,n,e,o,s,0),y("z","y","x",1,-1,i,n,-e,o,s,1),y("x","z","y",1,1,e,i,n,r,o,2),y("x","z","y",1,-1,e,i,-n,r,o,3),y("x","y","z",1,-1,e,n,i,r,s,4),y("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new mn(u,3)),this.setAttribute("normal",new mn(p,3)),this.setAttribute("uv",new mn(f,2));function y(S,g,d,x,v,b,L,R,A,k,w){const M=b/A,B=L/k,z=b/2,D=L/2,U=R/2,ee=A+1,ae=k+1;let ne=0,I=0;const W=new V;for(let G=0;G<ae;G++){const fe=G*B-D;for(let De=0;De<ee;De++){const Ye=De*M-z;W[S]=Ye*x,W[g]=fe*v,W[d]=U,u.push(W.x,W.y,W.z),W[S]=0,W[g]=0,W[d]=R>0?1:-1,p.push(W.x,W.y,W.z),f.push(De/A),f.push(1-G/k),ne+=1}}for(let G=0;G<k;G++)for(let fe=0;fe<A;fe++){const De=h+fe+ee*G,Ye=h+fe+ee*(G+1),J=h+(fe+1)+ee*(G+1),ce=h+(fe+1)+ee*G;c.push(De,Ye,ce),c.push(Ye,J,ce),I+=6}l.addGroup(m,I,w),m+=I,h+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Eo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function mo(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function un(t){const e={};for(let n=0;n<t.length;n++){const i=mo(t[n]);for(const r in i)e[r]=i[r]}return e}function OS(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function py(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:gt.workingColorSpace}const my={clone:mo,merge:un};var kS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,FS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qi extends Pr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kS,this.fragmentShader=FS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=mo(e.uniforms),this.uniformsGroups=OS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class ip extends en{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Et,this.projectionMatrix=new Et,this.projectionMatrixInverse=new Et,this.coordinateSystem=Ei}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const sr=new V,sg=new ut,og=new ut;class In extends ip{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Bf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Fu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bf*2*Math.atan(Math.tan(Fu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){sr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(sr.x,sr.y).multiplyScalar(-e/sr.z),sr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(sr.x,sr.y).multiplyScalar(-e/sr.z)}getViewSize(e,n){return this.getViewBounds(e,sg,og),n.subVectors(og,sg)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Fu*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,u=o.fullHeight;s+=o.offsetX*r/c,n-=o.offsetY*i/u,r*=o.width/c,i*=o.height/u}const l=this.filmOffset;l!==0&&(s+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Us=-90,Os=1;class gy extends en{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new In(Us,Os,e,n);r.layers=this.layers,this.add(r);const s=new In(Us,Os,e,n);s.layers=this.layers,this.add(s);const o=new In(Us,Os,e,n);o.layers=this.layers,this.add(o);const l=new In(Us,Os,e,n);l.layers=this.layers,this.add(l);const c=new In(Us,Os,e,n);c.layers=this.layers,this.add(c);const u=new In(Us,Os,e,n);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,l,c]=n;for(const u of n)this.remove(u);if(e===Ei)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===La)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of n)this.add(u),u.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,l,c,u,p]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),y=e.xr.enabled;e.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,l),e.setRenderTarget(i,3,r),e.render(n,c),e.setRenderTarget(i,4,r),e.render(n,u),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,r),e.render(n,p),e.setRenderTarget(f,h,m),e.xr.enabled=y,i.texture.needsPMREMUpdate=!0}}class rp extends pn{constructor(e,n,i,r,s,o,l,c,u,p){e=e!==void 0?e:[],n=n!==void 0?n:as,super(e,n,i,r,s,o,l,c,u,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class xy extends Tr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new rp(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Wn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Eo(5,5,5),s=new qi({name:"CubemapFromEquirect",uniforms:mo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:hn,blending:ji});s.uniforms.tEquirect.value=n;const o=new bi(r,s),l=n.minFilter;return n.minFilter===mr&&(n.minFilter=Wn),new gy(1,10,this).update(e,o),n.minFilter=l,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const id=new V,zS=new V,BS=new Qe;class lr{constructor(e=new V(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=id.subVectors(i,n).cross(zS.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(id),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||BS.getNormalMatrix(e),r=this.coplanarPoint(id).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zr=new Mo,Pl=new V;class su{constructor(e=new lr,n=new lr,i=new lr,r=new lr,s=new lr,o=new lr){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const l=this.planes;return l[0].copy(e),l[1].copy(n),l[2].copy(i),l[3].copy(r),l[4].copy(s),l[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Ei){const i=this.planes,r=e.elements,s=r[0],o=r[1],l=r[2],c=r[3],u=r[4],p=r[5],f=r[6],h=r[7],m=r[8],y=r[9],S=r[10],g=r[11],d=r[12],x=r[13],v=r[14],b=r[15];if(i[0].setComponents(c-s,h-u,g-m,b-d).normalize(),i[1].setComponents(c+s,h+u,g+m,b+d).normalize(),i[2].setComponents(c+o,h+p,g+y,b+x).normalize(),i[3].setComponents(c-o,h-p,g-y,b-x).normalize(),i[4].setComponents(c-l,h-f,g-S,b-v).normalize(),n===Ei)i[5].setComponents(c+l,h+f,g+S,b+v).normalize();else if(n===La)i[5].setComponents(l,f,S,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),zr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zr)}intersectsSprite(e){return zr.center.set(0,0,0),zr.radius=.7071067811865476,zr.applyMatrix4(e.matrixWorld),this.intersectsSphere(zr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Pl.x=r.normal.x>0?e.max.x:e.min.x,Pl.y=r.normal.y>0?e.max.y:e.min.y,Pl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Pl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function vy(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function jS(t){const e=new WeakMap;function n(l,c){const u=l.array,p=l.usage,f=u.byteLength,h=t.createBuffer();t.bindBuffer(c,h),t.bufferData(c,u,p),l.onUploadCallback();let m;if(u instanceof Float32Array)m=t.FLOAT;else if(u instanceof Uint16Array)l.isFloat16BufferAttribute?m=t.HALF_FLOAT:m=t.UNSIGNED_SHORT;else if(u instanceof Int16Array)m=t.SHORT;else if(u instanceof Uint32Array)m=t.UNSIGNED_INT;else if(u instanceof Int32Array)m=t.INT;else if(u instanceof Int8Array)m=t.BYTE;else if(u instanceof Uint8Array)m=t.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)m=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:h,type:m,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:f}}function i(l,c,u){const p=c.array,f=c._updateRange,h=c.updateRanges;if(t.bindBuffer(u,l),f.count===-1&&h.length===0&&t.bufferSubData(u,0,p),h.length!==0){for(let m=0,y=h.length;m<y;m++){const S=h[m];t.bufferSubData(u,S.start*p.BYTES_PER_ELEMENT,p,S.start,S.count)}c.clearUpdateRanges()}f.count!==-1&&(t.bufferSubData(u,f.offset*p.BYTES_PER_ELEMENT,p,f.offset,f.count),f.count=-1),c.onUploadCallback()}function r(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function s(l){l.isInterleavedBufferAttribute&&(l=l.data);const c=e.get(l);c&&(t.deleteBuffer(c.buffer),e.delete(l))}function o(l,c){if(l.isGLBufferAttribute){const p=e.get(l);(!p||p.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const u=e.get(l);if(u===void 0)e.set(l,n(l,c));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,l,c),u.version=l.version}}return{get:r,remove:s,update:o}}class Va extends Kn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,l=Math.floor(i),c=Math.floor(r),u=l+1,p=c+1,f=e/l,h=n/c,m=[],y=[],S=[],g=[];for(let d=0;d<p;d++){const x=d*h-o;for(let v=0;v<u;v++){const b=v*f-s;y.push(b,-x,0),S.push(0,0,1),g.push(v/l),g.push(1-d/c)}}for(let d=0;d<c;d++)for(let x=0;x<l;x++){const v=x+u*d,b=x+u*(d+1),L=x+1+u*(d+1),R=x+1+u*d;m.push(v,b,R),m.push(b,L,R)}this.setIndex(m),this.setAttribute("position",new mn(y,3)),this.setAttribute("normal",new mn(S,3)),this.setAttribute("uv",new mn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Va(e.width,e.height,e.widthSegments,e.heightSegments)}}var HS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,VS=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,GS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,WS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,XS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$S=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,YS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,qS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,KS=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,JS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,ZS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,QS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,eM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,tM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,nM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,iM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,rM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,oM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,aM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,lM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,cM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,uM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,dM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,fM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,hM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,pM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vM="gl_FragColor = linearToOutputTexel( gl_FragColor );",yM=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,_M=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,SM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,MM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,EM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,wM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,TM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,AM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,CM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,RM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,PM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,NM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,LM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,IM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,DM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,UM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,OM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,FM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,BM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,jM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,HM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,VM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,GM=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,WM=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,XM=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$M=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,YM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,KM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,JM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ZM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,QM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,eE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tE=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,iE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,rE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,sE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,oE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,aE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,uE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,dE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,fE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,xE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,yE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_E=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,SE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ME=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,EE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,bE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,wE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,TE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,AE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,CE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,RE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,PE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,NE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,LE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,IE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,DE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,UE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,OE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,kE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,FE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,BE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const jE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,HE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,VE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,GE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,XE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$E=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,YE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,qE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,KE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,JE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ZE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,QE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,eb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,nb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ib=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rb=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ob=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ab=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,lb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,cb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ub=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,db=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,fb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,gb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,yb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_b=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:HS,alphahash_pars_fragment:VS,alphamap_fragment:GS,alphamap_pars_fragment:WS,alphatest_fragment:XS,alphatest_pars_fragment:$S,aomap_fragment:YS,aomap_pars_fragment:qS,batching_pars_vertex:KS,batching_vertex:JS,begin_vertex:ZS,beginnormal_vertex:QS,bsdfs:eM,iridescence_fragment:tM,bumpmap_pars_fragment:nM,clipping_planes_fragment:iM,clipping_planes_pars_fragment:rM,clipping_planes_pars_vertex:sM,clipping_planes_vertex:oM,color_fragment:aM,color_pars_fragment:lM,color_pars_vertex:cM,color_vertex:uM,common:dM,cube_uv_reflection_fragment:fM,defaultnormal_vertex:hM,displacementmap_pars_vertex:pM,displacementmap_vertex:mM,emissivemap_fragment:gM,emissivemap_pars_fragment:xM,colorspace_fragment:vM,colorspace_pars_fragment:yM,envmap_fragment:_M,envmap_common_pars_fragment:SM,envmap_pars_fragment:MM,envmap_pars_vertex:EM,envmap_physical_pars_fragment:DM,envmap_vertex:bM,fog_vertex:wM,fog_pars_vertex:TM,fog_fragment:AM,fog_pars_fragment:CM,gradientmap_pars_fragment:RM,lightmap_pars_fragment:PM,lights_lambert_fragment:NM,lights_lambert_pars_fragment:LM,lights_pars_begin:IM,lights_toon_fragment:UM,lights_toon_pars_fragment:OM,lights_phong_fragment:kM,lights_phong_pars_fragment:FM,lights_physical_fragment:zM,lights_physical_pars_fragment:BM,lights_fragment_begin:jM,lights_fragment_maps:HM,lights_fragment_end:VM,logdepthbuf_fragment:GM,logdepthbuf_pars_fragment:WM,logdepthbuf_pars_vertex:XM,logdepthbuf_vertex:$M,map_fragment:YM,map_pars_fragment:qM,map_particle_fragment:KM,map_particle_pars_fragment:JM,metalnessmap_fragment:ZM,metalnessmap_pars_fragment:QM,morphinstance_vertex:eE,morphcolor_vertex:tE,morphnormal_vertex:nE,morphtarget_pars_vertex:iE,morphtarget_vertex:rE,normal_fragment_begin:sE,normal_fragment_maps:oE,normal_pars_fragment:aE,normal_pars_vertex:lE,normal_vertex:cE,normalmap_pars_fragment:uE,clearcoat_normal_fragment_begin:dE,clearcoat_normal_fragment_maps:fE,clearcoat_pars_fragment:hE,iridescence_pars_fragment:pE,opaque_fragment:mE,packing:gE,premultiplied_alpha_fragment:xE,project_vertex:vE,dithering_fragment:yE,dithering_pars_fragment:_E,roughnessmap_fragment:SE,roughnessmap_pars_fragment:ME,shadowmap_pars_fragment:EE,shadowmap_pars_vertex:bE,shadowmap_vertex:wE,shadowmask_pars_fragment:TE,skinbase_vertex:AE,skinning_pars_vertex:CE,skinning_vertex:RE,skinnormal_vertex:PE,specularmap_fragment:NE,specularmap_pars_fragment:LE,tonemapping_fragment:IE,tonemapping_pars_fragment:DE,transmission_fragment:UE,transmission_pars_fragment:OE,uv_pars_fragment:kE,uv_pars_vertex:FE,uv_vertex:zE,worldpos_vertex:BE,background_vert:jE,background_frag:HE,backgroundCube_vert:VE,backgroundCube_frag:GE,cube_vert:WE,cube_frag:XE,depth_vert:$E,depth_frag:YE,distanceRGBA_vert:qE,distanceRGBA_frag:KE,equirect_vert:JE,equirect_frag:ZE,linedashed_vert:QE,linedashed_frag:eb,meshbasic_vert:tb,meshbasic_frag:nb,meshlambert_vert:ib,meshlambert_frag:rb,meshmatcap_vert:sb,meshmatcap_frag:ob,meshnormal_vert:ab,meshnormal_frag:lb,meshphong_vert:cb,meshphong_frag:ub,meshphysical_vert:db,meshphysical_frag:fb,meshtoon_vert:hb,meshtoon_frag:pb,points_vert:mb,points_frag:gb,shadow_vert:xb,shadow_frag:vb,sprite_vert:yb,sprite_frag:_b},be={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},li={basic:{uniforms:un([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:un([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new ot(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:un([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:un([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:un([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new ot(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:un([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:un([be.points,be.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:un([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:un([be.common,be.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:un([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:un([be.sprite,be.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:un([be.common,be.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:un([be.lights,be.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};li.physical={uniforms:un([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const Nl={r:0,b:0,g:0},Br=new mi,Sb=new Et;function Mb(t,e,n,i,r,s,o){const l=new ot(0);let c=s===!0?0:1,u,p,f=null,h=0,m=null;function y(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?n:e).get(v)),v}function S(x){let v=!1;const b=y(x);b===null?d(l,c):b&&b.isColor&&(d(b,1),v=!0);const L=t.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||v)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil)}function g(x,v){const b=y(v);b&&(b.isCubeTexture||b.mapping===Fa)?(p===void 0&&(p=new bi(new Eo(1,1,1),new qi({name:"BackgroundCubeMaterial",uniforms:mo(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(L,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(p)),Br.copy(v.backgroundRotation),Br.x*=-1,Br.y*=-1,Br.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Br.y*=-1,Br.z*=-1),p.material.uniforms.envMap.value=b,p.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(Sb.makeRotationFromEuler(Br)),p.material.toneMapped=gt.getTransfer(b.colorSpace)!==St,(f!==b||h!==b.version||m!==t.toneMapping)&&(p.material.needsUpdate=!0,f=b,h=b.version,m=t.toneMapping),p.layers.enableAll(),x.unshift(p,p.geometry,p.material,0,0,null)):b&&b.isTexture&&(u===void 0&&(u=new bi(new Va(2,2),new qi({name:"BackgroundMaterial",uniforms:mo(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:$i,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=b,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.toneMapped=gt.getTransfer(b.colorSpace)!==St,b.matrixAutoUpdate===!0&&b.updateMatrix(),u.material.uniforms.uvTransform.value.copy(b.matrix),(f!==b||h!==b.version||m!==t.toneMapping)&&(u.material.needsUpdate=!0,f=b,h=b.version,m=t.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null))}function d(x,v){x.getRGB(Nl,py(t)),i.buffers.color.setClear(Nl.r,Nl.g,Nl.b,v,o)}return{getClearColor:function(){return l},setClearColor:function(x,v=1){l.set(x),c=v,d(l,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,d(l,c)},render:S,addToRenderList:g}}function Eb(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function l(M,B,z,D,U){let ee=!1;const ae=f(D,z,B);s!==ae&&(s=ae,u(s.object)),ee=m(M,D,z,U),ee&&y(M,D,z,U),U!==null&&e.update(U,t.ELEMENT_ARRAY_BUFFER),(ee||o)&&(o=!1,b(M,B,z,D),U!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function c(){return t.createVertexArray()}function u(M){return t.bindVertexArray(M)}function p(M){return t.deleteVertexArray(M)}function f(M,B,z){const D=z.wireframe===!0;let U=i[M.id];U===void 0&&(U={},i[M.id]=U);let ee=U[B.id];ee===void 0&&(ee={},U[B.id]=ee);let ae=ee[D];return ae===void 0&&(ae=h(c()),ee[D]=ae),ae}function h(M){const B=[],z=[],D=[];for(let U=0;U<n;U++)B[U]=0,z[U]=0,D[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:z,attributeDivisors:D,object:M,attributes:{},index:null}}function m(M,B,z,D){const U=s.attributes,ee=B.attributes;let ae=0;const ne=z.getAttributes();for(const I in ne)if(ne[I].location>=0){const G=U[I];let fe=ee[I];if(fe===void 0&&(I==="instanceMatrix"&&M.instanceMatrix&&(fe=M.instanceMatrix),I==="instanceColor"&&M.instanceColor&&(fe=M.instanceColor)),G===void 0||G.attribute!==fe||fe&&G.data!==fe.data)return!0;ae++}return s.attributesNum!==ae||s.index!==D}function y(M,B,z,D){const U={},ee=B.attributes;let ae=0;const ne=z.getAttributes();for(const I in ne)if(ne[I].location>=0){let G=ee[I];G===void 0&&(I==="instanceMatrix"&&M.instanceMatrix&&(G=M.instanceMatrix),I==="instanceColor"&&M.instanceColor&&(G=M.instanceColor));const fe={};fe.attribute=G,G&&G.data&&(fe.data=G.data),U[I]=fe,ae++}s.attributes=U,s.attributesNum=ae,s.index=D}function S(){const M=s.newAttributes;for(let B=0,z=M.length;B<z;B++)M[B]=0}function g(M){d(M,0)}function d(M,B){const z=s.newAttributes,D=s.enabledAttributes,U=s.attributeDivisors;z[M]=1,D[M]===0&&(t.enableVertexAttribArray(M),D[M]=1),U[M]!==B&&(t.vertexAttribDivisor(M,B),U[M]=B)}function x(){const M=s.newAttributes,B=s.enabledAttributes;for(let z=0,D=B.length;z<D;z++)B[z]!==M[z]&&(t.disableVertexAttribArray(z),B[z]=0)}function v(M,B,z,D,U,ee,ae){ae===!0?t.vertexAttribIPointer(M,B,z,U,ee):t.vertexAttribPointer(M,B,z,D,U,ee)}function b(M,B,z,D){S();const U=D.attributes,ee=z.getAttributes(),ae=B.defaultAttributeValues;for(const ne in ee){const I=ee[ne];if(I.location>=0){let W=U[ne];if(W===void 0&&(ne==="instanceMatrix"&&M.instanceMatrix&&(W=M.instanceMatrix),ne==="instanceColor"&&M.instanceColor&&(W=M.instanceColor)),W!==void 0){const G=W.normalized,fe=W.itemSize,De=e.get(W);if(De===void 0)continue;const Ye=De.buffer,J=De.type,ce=De.bytesPerElement,ve=J===t.INT||J===t.UNSIGNED_INT||W.gpuType===Gh;if(W.isInterleavedBufferAttribute){const ye=W.data,se=ye.stride,we=W.offset;if(ye.isInstancedInterleavedBuffer){for(let j=0;j<I.locationSize;j++)d(I.location+j,ye.meshPerAttribute);M.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let j=0;j<I.locationSize;j++)g(I.location+j);t.bindBuffer(t.ARRAY_BUFFER,Ye);for(let j=0;j<I.locationSize;j++)v(I.location+j,fe/I.locationSize,J,G,se*ce,(we+fe/I.locationSize*j)*ce,ve)}else{if(W.isInstancedBufferAttribute){for(let ye=0;ye<I.locationSize;ye++)d(I.location+ye,W.meshPerAttribute);M.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let ye=0;ye<I.locationSize;ye++)g(I.location+ye);t.bindBuffer(t.ARRAY_BUFFER,Ye);for(let ye=0;ye<I.locationSize;ye++)v(I.location+ye,fe/I.locationSize,J,G,fe*ce,fe/I.locationSize*ye*ce,ve)}}else if(ae!==void 0){const G=ae[ne];if(G!==void 0)switch(G.length){case 2:t.vertexAttrib2fv(I.location,G);break;case 3:t.vertexAttrib3fv(I.location,G);break;case 4:t.vertexAttrib4fv(I.location,G);break;default:t.vertexAttrib1fv(I.location,G)}}}}x()}function L(){k();for(const M in i){const B=i[M];for(const z in B){const D=B[z];for(const U in D)p(D[U].object),delete D[U];delete B[z]}delete i[M]}}function R(M){if(i[M.id]===void 0)return;const B=i[M.id];for(const z in B){const D=B[z];for(const U in D)p(D[U].object),delete D[U];delete B[z]}delete i[M.id]}function A(M){for(const B in i){const z=i[B];if(z[M.id]===void 0)continue;const D=z[M.id];for(const U in D)p(D[U].object),delete D[U];delete z[M.id]}}function k(){w(),o=!0,s!==r&&(s=r,u(s.object))}function w(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:l,reset:k,resetDefaultState:w,dispose:L,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:S,enableAttribute:g,disableUnusedAttributes:x}}function bb(t,e,n){let i;function r(u){i=u}function s(u,p){t.drawArrays(i,u,p),n.update(p,i,1)}function o(u,p,f){f!==0&&(t.drawArraysInstanced(i,u,p,f),n.update(p,i,f))}function l(u,p,f){if(f===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let m=0;m<f;m++)this.render(u[m],p[m]);else{h.multiDrawArraysWEBGL(i,u,0,p,0,f);let m=0;for(let y=0;y<f;y++)m+=p[y];n.update(m,i,1)}}function c(u,p,f,h){if(f===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let y=0;y<u.length;y++)o(u[y],p[y],h[y]);else{m.multiDrawArraysInstancedWEBGL(i,u,0,p,0,h,0,f);let y=0;for(let S=0;S<f;S++)y+=p[S];for(let S=0;S<h.length;S++)n.update(y,i,h[S])}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=l,this.renderMultiDrawInstances=c}function wb(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(R){return!(R!==ui&&i.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(R){const A=R===za&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Yi&&i.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==zi&&!A)}function c(R){if(R==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=n.precision!==void 0?n.precision:"highp";const p=c(u);p!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",p,"instead."),u=p);const f=n.logarithmicDepthBuffer===!0,h=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),m=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=t.getParameter(t.MAX_TEXTURE_SIZE),S=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),g=t.getParameter(t.MAX_VERTEX_ATTRIBS),d=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),x=t.getParameter(t.MAX_VARYING_VECTORS),v=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),b=m>0,L=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:l,precision:u,logarithmicDepthBuffer:f,maxTextures:h,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:S,maxAttributes:g,maxVertexUniforms:d,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:b,maxSamples:L}}function Tb(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new lr,l=new Qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const m=f.length!==0||h||i!==0||r;return r=h,i=f.length,m},this.beginShadows=function(){s=!0,p(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){n=p(f,h,0)},this.setState=function(f,h,m){const y=f.clippingPlanes,S=f.clipIntersection,g=f.clipShadows,d=t.get(f);if(!r||y===null||y.length===0||s&&!g)s?p(null):u();else{const x=s?0:i,v=x*4;let b=d.clippingState||null;c.value=b,b=p(y,h,v,m);for(let L=0;L!==v;++L)b[L]=n[L];d.clippingState=b,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=x}};function u(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function p(f,h,m,y){const S=f!==null?f.length:0;let g=null;if(S!==0){if(g=c.value,y!==!0||g===null){const d=m+S*4,x=h.matrixWorldInverse;l.getNormalMatrix(x),(g===null||g.length<d)&&(g=new Float32Array(d));for(let v=0,b=m;v!==S;++v,b+=4)o.copy(f[v]).applyMatrix4(x,l),o.normal.toArray(g,b),g[b+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,g}}function Ab(t){let e=new WeakMap;function n(o,l){return l===Nc?o.mapping=as:l===Lc&&(o.mapping=ls),o}function i(o){if(o&&o.isTexture){const l=o.mapping;if(l===Nc||l===Lc)if(e.has(o)){const c=e.get(o).texture;return n(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const u=new xy(c.height);return u.fromEquirectangularTexture(t,o),e.set(o,u),o.addEventListener("dispose",r),n(u.texture,o.mapping)}else return null}}return o}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class yy extends ip{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,l=r+n,c=r-n;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,o=s+u*this.view.width,l-=p*this.view.offsetY,c=l-p*this.view.height}this.projectionMatrix.makeOrthographic(s,o,l,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Ks=4,ag=[.125,.215,.35,.446,.526,.582],Yr=20,rd=new yy,lg=new ot;let sd=null,od=0,ad=0,ld=!1;const Wr=(1+Math.sqrt(5))/2,ks=1/Wr,cg=[new V(-Wr,ks,0),new V(Wr,ks,0),new V(-ks,0,Wr),new V(ks,0,Wr),new V(0,Wr,-ks),new V(0,Wr,ks),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)];class jf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){sd=this._renderer.getRenderTarget(),od=this._renderer.getActiveCubeFace(),ad=this._renderer.getActiveMipmapLevel(),ld=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(sd,od,ad),this._renderer.xr.enabled=ld,e.scissorTest=!1,Ll(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===as||e.mapping===ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),sd=this._renderer.getRenderTarget(),od=this._renderer.getActiveCubeFace(),ad=this._renderer.getActiveMipmapLevel(),ld=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Wn,minFilter:Wn,generateMipmaps:!1,type:za,format:ui,colorSpace:Ji,depthBuffer:!1},r=ug(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ug(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Cb(s)),this._blurMaterial=Rb(s,e,n)}return r}_compileMaterial(e){const n=new bi(this._lodPlanes[0],e);this._renderer.compile(n,rd)}_sceneToCubeUV(e,n,i,r){const l=new In(90,1,n,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],p=this._renderer,f=p.autoClear,h=p.toneMapping;p.getClearColor(lg),p.toneMapping=Hi,p.autoClear=!1;const m=new ep({name:"PMREM.Background",side:hn,depthWrite:!1,depthTest:!1}),y=new bi(new Eo,m);let S=!1;const g=e.background;g?g.isColor&&(m.color.copy(g),e.background=null,S=!0):(m.color.copy(lg),S=!0);for(let d=0;d<6;d++){const x=d%3;x===0?(l.up.set(0,c[d],0),l.lookAt(u[d],0,0)):x===1?(l.up.set(0,0,c[d]),l.lookAt(0,u[d],0)):(l.up.set(0,c[d],0),l.lookAt(0,0,u[d]));const v=this._cubeSize;Ll(r,x*v,d>2?v:0,v,v),p.setRenderTarget(r),S&&p.render(y,l),p.render(e,l)}y.geometry.dispose(),y.material.dispose(),p.toneMapping=h,p.autoClear=f,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===as||e.mapping===ls;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=fg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dg());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new bi(this._lodPlanes[0],s),l=s.uniforms;l.envMap.value=e;const c=this._cubeSize;Ll(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(o,rd)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),l=cg[(r-s-1)%cg.length];this._blur(e,s-1,s,o,l)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,l){const c=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const p=3,f=new bi(this._lodPlanes[r],u),h=u.uniforms,m=this._sizeLods[i]-1,y=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Yr-1),S=s/y,g=isFinite(s)?1+Math.floor(p*S):Yr;g>Yr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Yr}`);const d=[];let x=0;for(let A=0;A<Yr;++A){const k=A/S,w=Math.exp(-k*k/2);d.push(w),A===0?x+=w:A<g&&(x+=2*w)}for(let A=0;A<d.length;A++)d[A]=d[A]/x;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=d,h.latitudinal.value=o==="latitudinal",l&&(h.poleAxis.value=l);const{_lodMax:v}=this;h.dTheta.value=y,h.mipInt.value=v-i;const b=this._sizeLods[r],L=3*b*(r>v-Ks?r-v+Ks:0),R=4*(this._cubeSize-b);Ll(n,L,R,3*b,2*b),c.setRenderTarget(n),c.render(f,rd)}}function Cb(t){const e=[],n=[],i=[];let r=t;const s=t-Ks+1+ag.length;for(let o=0;o<s;o++){const l=Math.pow(2,r);n.push(l);let c=1/l;o>t-Ks?c=ag[o-t+Ks-1]:o===0&&(c=0),i.push(c);const u=1/(l-2),p=-u,f=1+u,h=[p,p,f,p,f,f,p,p,f,f,p,f],m=6,y=6,S=3,g=2,d=1,x=new Float32Array(S*y*m),v=new Float32Array(g*y*m),b=new Float32Array(d*y*m);for(let R=0;R<m;R++){const A=R%3*2/3-1,k=R>2?0:-1,w=[A,k,0,A+2/3,k,0,A+2/3,k+1,0,A,k,0,A+2/3,k+1,0,A,k+1,0];x.set(w,S*y*R),v.set(h,g*y*R);const M=[R,R,R,R,R,R];b.set(M,d*y*R)}const L=new Kn;L.setAttribute("position",new hi(x,S)),L.setAttribute("uv",new hi(v,g)),L.setAttribute("faceIndex",new hi(b,d)),e.push(L),r>Ks&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function ug(t,e,n){const i=new Tr(t,e,n);return i.texture.mapping=Fa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ll(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function Rb(t,e,n){const i=new Float32Array(Yr),r=new V(0,1,0);return new qi({name:"SphericalGaussianBlur",defines:{n:Yr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:sp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function dg(){return new qi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function fg(){return new qi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function sp(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Pb(t){let e=new WeakMap,n=null;function i(l){if(l&&l.isTexture){const c=l.mapping,u=c===Nc||c===Lc,p=c===as||c===ls;if(u||p){let f=e.get(l);const h=f!==void 0?f.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==h)return n===null&&(n=new jf(t)),f=u?n.fromEquirectangular(l,f):n.fromCubemap(l,f),f.texture.pmremVersion=l.pmremVersion,e.set(l,f),f.texture;if(f!==void 0)return f.texture;{const m=l.image;return u&&m&&m.height>0||p&&m&&r(m)?(n===null&&(n=new jf(t)),f=u?n.fromEquirectangular(l):n.fromCubemap(l),f.texture.pmremVersion=l.pmremVersion,e.set(l,f),l.addEventListener("dispose",s),f.texture):null}}}return l}function r(l){let c=0;const u=6;for(let p=0;p<u;p++)l[p]!==void 0&&c++;return c===u}function s(l){const c=l.target;c.removeEventListener("dispose",s);const u=e.get(c);u!==void 0&&(e.delete(c),u.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function Nb(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Lb(t,e,n,i){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const y in h.attributes)e.remove(h.attributes[y]);for(const y in h.morphAttributes){const S=h.morphAttributes[y];for(let g=0,d=S.length;g<d;g++)e.remove(S[g])}h.removeEventListener("dispose",o),delete r[h.id];const m=s.get(h);m&&(e.remove(m),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function l(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,n.memory.geometries++),h}function c(f){const h=f.attributes;for(const y in h)e.update(h[y],t.ARRAY_BUFFER);const m=f.morphAttributes;for(const y in m){const S=m[y];for(let g=0,d=S.length;g<d;g++)e.update(S[g],t.ARRAY_BUFFER)}}function u(f){const h=[],m=f.index,y=f.attributes.position;let S=0;if(m!==null){const x=m.array;S=m.version;for(let v=0,b=x.length;v<b;v+=3){const L=x[v+0],R=x[v+1],A=x[v+2];h.push(L,R,R,A,A,L)}}else if(y!==void 0){const x=y.array;S=y.version;for(let v=0,b=x.length/3-1;v<b;v+=3){const L=v+0,R=v+1,A=v+2;h.push(L,R,R,A,A,L)}}else return;const g=new(ly(h)?np:tp)(h,1);g.version=S;const d=s.get(f);d&&e.remove(d),s.set(f,g)}function p(f){const h=s.get(f);if(h){const m=f.index;m!==null&&h.version<m.version&&u(f)}else u(f);return s.get(f)}return{get:l,update:c,getWireframeAttribute:p}}function Ib(t,e,n){let i;function r(h){i=h}let s,o;function l(h){s=h.type,o=h.bytesPerElement}function c(h,m){t.drawElements(i,m,s,h*o),n.update(m,i,1)}function u(h,m,y){y!==0&&(t.drawElementsInstanced(i,m,s,h*o,y),n.update(m,i,y))}function p(h,m,y){if(y===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let g=0;g<y;g++)this.render(h[g]/o,m[g]);else{S.multiDrawElementsWEBGL(i,m,0,s,h,0,y);let g=0;for(let d=0;d<y;d++)g+=m[d];n.update(g,i,1)}}function f(h,m,y,S){if(y===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let d=0;d<h.length;d++)u(h[d]/o,m[d],S[d]);else{g.multiDrawElementsInstancedWEBGL(i,m,0,s,h,0,S,0,y);let d=0;for(let x=0;x<y;x++)d+=m[x];for(let x=0;x<S.length;x++)n.update(d,i,S[x])}}this.setMode=r,this.setIndex=l,this.render=c,this.renderInstances=u,this.renderMultiDraw=p,this.renderMultiDrawInstances=f}function Db(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,l){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=l*(s/3);break;case t.LINES:n.lines+=l*(s/2);break;case t.LINE_STRIP:n.lines+=l*(s-1);break;case t.LINE_LOOP:n.lines+=l*s;break;case t.POINTS:n.points+=l*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Ub(t,e,n){const i=new WeakMap,r=new Tt;function s(o,l,c){const u=o.morphTargetInfluences,p=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,f=p!==void 0?p.length:0;let h=i.get(l);if(h===void 0||h.count!==f){let M=function(){k.dispose(),i.delete(l),l.removeEventListener("dispose",M)};var m=M;h!==void 0&&h.texture.dispose();const y=l.morphAttributes.position!==void 0,S=l.morphAttributes.normal!==void 0,g=l.morphAttributes.color!==void 0,d=l.morphAttributes.position||[],x=l.morphAttributes.normal||[],v=l.morphAttributes.color||[];let b=0;y===!0&&(b=1),S===!0&&(b=2),g===!0&&(b=3);let L=l.attributes.position.count*b,R=1;L>e.maxTextureSize&&(R=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);const A=new Float32Array(L*R*4*f),k=new Qh(A,L,R,f);k.type=zi,k.needsUpdate=!0;const w=b*4;for(let B=0;B<f;B++){const z=d[B],D=x[B],U=v[B],ee=L*R*4*B;for(let ae=0;ae<z.count;ae++){const ne=ae*w;y===!0&&(r.fromBufferAttribute(z,ae),A[ee+ne+0]=r.x,A[ee+ne+1]=r.y,A[ee+ne+2]=r.z,A[ee+ne+3]=0),S===!0&&(r.fromBufferAttribute(D,ae),A[ee+ne+4]=r.x,A[ee+ne+5]=r.y,A[ee+ne+6]=r.z,A[ee+ne+7]=0),g===!0&&(r.fromBufferAttribute(U,ae),A[ee+ne+8]=r.x,A[ee+ne+9]=r.y,A[ee+ne+10]=r.z,A[ee+ne+11]=U.itemSize===4?r.w:1)}}h={count:f,texture:k,size:new ut(L,R)},i.set(l,h),l.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let y=0;for(let g=0;g<u.length;g++)y+=u[g];const S=l.morphTargetsRelative?1:1-y;c.getUniforms().setValue(t,"morphTargetBaseInfluence",S),c.getUniforms().setValue(t,"morphTargetInfluences",u)}c.getUniforms().setValue(t,"morphTargetsTexture",h.texture,n),c.getUniforms().setValue(t,"morphTargetsTextureSize",h.size)}return{update:s}}function Ob(t,e,n,i){let r=new WeakMap;function s(c){const u=i.render.frame,p=c.geometry,f=e.get(c,p);if(r.get(f)!==u&&(e.update(f),r.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return f}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:s,dispose:o}}class op extends pn{constructor(e,n,i,r,s,o,l,c,u,p){if(p=p!==void 0?p:ts,p!==ts&&p!==po)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&p===ts&&(i=cs),i===void 0&&p===po&&(i=yo),super(null,r,s,o,l,c,p,i,u),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=l!==void 0?l:Un,this.minFilter=c!==void 0?c:Un,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const _y=new pn,Sy=new op(1,1);Sy.compareFunction=Jh;const My=new Qh,Ey=new fy,by=new rp,hg=[],pg=[],mg=new Float32Array(16),gg=new Float32Array(9),xg=new Float32Array(4);function bo(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=hg[r];if(s===void 0&&(s=new Float32Array(r),hg[r]=s),e!==0){i.toArray(s,0);for(let o=1,l=0;o!==e;++o)l+=n,t[o].toArray(s,l)}return s}function Wt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Xt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function ou(t,e){let n=pg[e];n===void 0&&(n=new Int32Array(e),pg[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function kb(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function Fb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Wt(n,e))return;t.uniform2fv(this.addr,e),Xt(n,e)}}function zb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Wt(n,e))return;t.uniform3fv(this.addr,e),Xt(n,e)}}function Bb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Wt(n,e))return;t.uniform4fv(this.addr,e),Xt(n,e)}}function jb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Wt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Xt(n,e)}else{if(Wt(n,i))return;xg.set(i),t.uniformMatrix2fv(this.addr,!1,xg),Xt(n,i)}}function Hb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Wt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Xt(n,e)}else{if(Wt(n,i))return;gg.set(i),t.uniformMatrix3fv(this.addr,!1,gg),Xt(n,i)}}function Vb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Wt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Xt(n,e)}else{if(Wt(n,i))return;mg.set(i),t.uniformMatrix4fv(this.addr,!1,mg),Xt(n,i)}}function Gb(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function Wb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Wt(n,e))return;t.uniform2iv(this.addr,e),Xt(n,e)}}function Xb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Wt(n,e))return;t.uniform3iv(this.addr,e),Xt(n,e)}}function $b(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Wt(n,e))return;t.uniform4iv(this.addr,e),Xt(n,e)}}function Yb(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function qb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Wt(n,e))return;t.uniform2uiv(this.addr,e),Xt(n,e)}}function Kb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Wt(n,e))return;t.uniform3uiv(this.addr,e),Xt(n,e)}}function Jb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Wt(n,e))return;t.uniform4uiv(this.addr,e),Xt(n,e)}}function Zb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);const s=this.type===t.SAMPLER_2D_SHADOW?Sy:_y;n.setTexture2D(e||s,r)}function Qb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Ey,r)}function e2(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||by,r)}function t2(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||My,r)}function n2(t){switch(t){case 5126:return kb;case 35664:return Fb;case 35665:return zb;case 35666:return Bb;case 35674:return jb;case 35675:return Hb;case 35676:return Vb;case 5124:case 35670:return Gb;case 35667:case 35671:return Wb;case 35668:case 35672:return Xb;case 35669:case 35673:return $b;case 5125:return Yb;case 36294:return qb;case 36295:return Kb;case 36296:return Jb;case 35678:case 36198:case 36298:case 36306:case 35682:return Zb;case 35679:case 36299:case 36307:return Qb;case 35680:case 36300:case 36308:case 36293:return e2;case 36289:case 36303:case 36311:case 36292:return t2}}function i2(t,e){t.uniform1fv(this.addr,e)}function r2(t,e){const n=bo(e,this.size,2);t.uniform2fv(this.addr,n)}function s2(t,e){const n=bo(e,this.size,3);t.uniform3fv(this.addr,n)}function o2(t,e){const n=bo(e,this.size,4);t.uniform4fv(this.addr,n)}function a2(t,e){const n=bo(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function l2(t,e){const n=bo(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function c2(t,e){const n=bo(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function u2(t,e){t.uniform1iv(this.addr,e)}function d2(t,e){t.uniform2iv(this.addr,e)}function f2(t,e){t.uniform3iv(this.addr,e)}function h2(t,e){t.uniform4iv(this.addr,e)}function p2(t,e){t.uniform1uiv(this.addr,e)}function m2(t,e){t.uniform2uiv(this.addr,e)}function g2(t,e){t.uniform3uiv(this.addr,e)}function x2(t,e){t.uniform4uiv(this.addr,e)}function v2(t,e,n){const i=this.cache,r=e.length,s=ou(n,r);Wt(i,s)||(t.uniform1iv(this.addr,s),Xt(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||_y,s[o])}function y2(t,e,n){const i=this.cache,r=e.length,s=ou(n,r);Wt(i,s)||(t.uniform1iv(this.addr,s),Xt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Ey,s[o])}function _2(t,e,n){const i=this.cache,r=e.length,s=ou(n,r);Wt(i,s)||(t.uniform1iv(this.addr,s),Xt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||by,s[o])}function S2(t,e,n){const i=this.cache,r=e.length,s=ou(n,r);Wt(i,s)||(t.uniform1iv(this.addr,s),Xt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||My,s[o])}function M2(t){switch(t){case 5126:return i2;case 35664:return r2;case 35665:return s2;case 35666:return o2;case 35674:return a2;case 35675:return l2;case 35676:return c2;case 5124:case 35670:return u2;case 35667:case 35671:return d2;case 35668:case 35672:return f2;case 35669:case 35673:return h2;case 5125:return p2;case 36294:return m2;case 36295:return g2;case 36296:return x2;case 35678:case 36198:case 36298:case 36306:case 35682:return v2;case 35679:case 36299:case 36307:return y2;case 35680:case 36300:case 36308:case 36293:return _2;case 36289:case 36303:case 36311:case 36292:return S2}}class E2{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=n2(n.type)}}class b2{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=M2(n.type)}}class w2{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const l=r[s];l.setValue(e,n[l.id],i)}}}const cd=/(\w+)(\])?(\[|\.)?/g;function vg(t,e){t.seq.push(e),t.map[e.id]=e}function T2(t,e,n){const i=t.name,r=i.length;for(cd.lastIndex=0;;){const s=cd.exec(i),o=cd.lastIndex;let l=s[1];const c=s[2]==="]",u=s[3];if(c&&(l=l|0),u===void 0||u==="["&&o+2===r){vg(n,u===void 0?new E2(l,t,e):new b2(l,t,e));break}else{let f=n.map[l];f===void 0&&(f=new w2(l),vg(n,f)),n=f}}}class rc{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);T2(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const l=n[s],c=i[l.id];c.needsUpdate!==!1&&l.setValue(e,c.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function yg(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const A2=37297;let C2=0;function R2(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const l=o+1;i.push(`${l===e?">":" "} ${l}: ${n[o]}`)}return i.join(`
`)}function P2(t){const e=gt.getPrimaries(gt.workingColorSpace),n=gt.getPrimaries(t);let i;switch(e===n?i="":e===Na&&n===Pa?i="LinearDisplayP3ToLinearSRGB":e===Pa&&n===Na&&(i="LinearSRGBToLinearDisplayP3"),t){case Ji:case Ba:return[i,"LinearTransferOETF"];case oi:case iu:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function _g(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+R2(t.getShaderSource(e),o)}else return r}function N2(t,e){const n=P2(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function L2(t,e){let n;switch(e){case Dv:n="Linear";break;case Uv:n="Reinhard";break;case Ov:n="OptimizedCineon";break;case kv:n="ACESFilmic";break;case zv:n="AgX";break;case Bv:n="Neutral";break;case Fv:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function I2(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zo).join(`
`)}function D2(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function U2(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let l=1;s.type===t.FLOAT_MAT2&&(l=2),s.type===t.FLOAT_MAT3&&(l=3),s.type===t.FLOAT_MAT4&&(l=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:l}}return n}function Zo(t){return t!==""}function Sg(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mg(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const O2=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hf(t){return t.replace(O2,F2)}const k2=new Map;function F2(t,e){let n=Ze[e];if(n===void 0){const i=k2.get(e);if(i!==void 0)n=Ze[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Hf(n)}const z2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Eg(t){return t.replace(z2,B2)}function B2(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function bg(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function j2(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===jh?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===ov?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===yi&&(e="SHADOWMAP_TYPE_VSM"),e}function H2(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case as:case ls:e="ENVMAP_TYPE_CUBE";break;case Fa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function V2(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case ls:e="ENVMAP_MODE_REFRACTION";break}return e}function G2(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case nu:e="ENVMAP_BLENDING_MULTIPLY";break;case Lv:e="ENVMAP_BLENDING_MIX";break;case Iv:e="ENVMAP_BLENDING_ADD";break}return e}function W2(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function X2(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,l=n.fragmentShader;const c=j2(n),u=H2(n),p=V2(n),f=G2(n),h=W2(n),m=I2(n),y=D2(s),S=r.createProgram();let g,d,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(Zo).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(Zo).join(`
`),d.length>0&&(d+=`
`)):(g=[bg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zo).join(`
`),d=[bg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.envMap?"#define "+p:"",n.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Hi?"#define TONE_MAPPING":"",n.toneMapping!==Hi?Ze.tonemapping_pars_fragment:"",n.toneMapping!==Hi?L2("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,N2("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Zo).join(`
`)),o=Hf(o),o=Sg(o,n),o=Mg(o,n),l=Hf(l),l=Sg(l,n),l=Mg(l,n),o=Eg(o),l=Eg(l),n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",n.glslVersion===zf?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===zf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const v=x+g+o,b=x+d+l,L=yg(r,r.VERTEX_SHADER,v),R=yg(r,r.FRAGMENT_SHADER,b);r.attachShader(S,L),r.attachShader(S,R),n.index0AttributeName!==void 0?r.bindAttribLocation(S,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(S,0,"position"),r.linkProgram(S);function A(B){if(t.debug.checkShaderErrors){const z=r.getProgramInfoLog(S).trim(),D=r.getShaderInfoLog(L).trim(),U=r.getShaderInfoLog(R).trim();let ee=!0,ae=!0;if(r.getProgramParameter(S,r.LINK_STATUS)===!1)if(ee=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,S,L,R);else{const ne=_g(r,L,"vertex"),I=_g(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(S,r.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+z+`
`+ne+`
`+I)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(D===""||U==="")&&(ae=!1);ae&&(B.diagnostics={runnable:ee,programLog:z,vertexShader:{log:D,prefix:g},fragmentShader:{log:U,prefix:d}})}r.deleteShader(L),r.deleteShader(R),k=new rc(r,S),w=U2(r,S)}let k;this.getUniforms=function(){return k===void 0&&A(this),k};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let M=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(S,A2)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(S),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=C2++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=L,this.fragmentShader=R,this}let $2=0;class Y2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new q2(e),n.set(e,i)),i}}class q2{constructor(e){this.id=$2++,this.code=e,this.usedTimes=0}}function K2(t,e,n,i,r,s,o){const l=new ru,c=new Y2,u=new Set,p=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures;let m=r.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(w){return u.add(w),w===0?"uv":`uv${w}`}function g(w,M,B,z,D){const U=z.fog,ee=D.geometry,ae=w.isMeshStandardMaterial?z.environment:null,ne=(w.isMeshStandardMaterial?n:e).get(w.envMap||ae),I=ne&&ne.mapping===Fa?ne.image.height:null,W=y[w.type];w.precision!==null&&(m=r.getMaxPrecision(w.precision),m!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",m,"instead."));const G=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,fe=G!==void 0?G.length:0;let De=0;ee.morphAttributes.position!==void 0&&(De=1),ee.morphAttributes.normal!==void 0&&(De=2),ee.morphAttributes.color!==void 0&&(De=3);let Ye,J,ce,ve;if(W){const st=li[W];Ye=st.vertexShader,J=st.fragmentShader}else Ye=w.vertexShader,J=w.fragmentShader,c.update(w),ce=c.getVertexShaderID(w),ve=c.getFragmentShaderID(w);const ye=t.getRenderTarget(),se=D.isInstancedMesh===!0,we=D.isBatchedMesh===!0,j=!!w.map,et=!!w.matcap,Q=!!ne,de=!!w.aoMap,he=!!w.lightMap,Me=!!w.bumpMap,Te=!!w.normalMap,Ce=!!w.displacementMap,qe=!!w.emissiveMap,P=!!w.metalnessMap,E=!!w.roughnessMap,X=w.anisotropy>0,te=w.clearcoat>0,Z=w.dispersion>0,oe=w.iridescence>0,Ne=w.sheen>0,Se=w.transmission>0,ge=X&&!!w.anisotropyMap,He=te&&!!w.clearcoatMap,me=te&&!!w.clearcoatNormalMap,ke=te&&!!w.clearcoatRoughnessMap,Ve=oe&&!!w.iridescenceMap,Fe=oe&&!!w.iridescenceThicknessMap,re=Ne&&!!w.sheenColorMap,Re=Ne&&!!w.sheenRoughnessMap,ze=!!w.specularMap,it=!!w.specularColorMap,Le=!!w.specularIntensityMap,O=Se&&!!w.transmissionMap,le=Se&&!!w.thicknessMap,ie=!!w.gradientMap,_e=!!w.alphaMap,Ae=w.alphaTest>0,Ke=!!w.alphaHash,rt=!!w.extensions;let nt=Hi;w.toneMapped&&(ye===null||ye.isXRRenderTarget===!0)&&(nt=t.toneMapping);const yt={shaderID:W,shaderType:w.type,shaderName:w.name,vertexShader:Ye,fragmentShader:J,defines:w.defines,customVertexShaderID:ce,customFragmentShaderID:ve,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:m,batching:we,instancing:se,instancingColor:se&&D.instanceColor!==null,instancingMorph:se&&D.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ye===null?t.outputColorSpace:ye.isXRRenderTarget===!0?ye.texture.colorSpace:Ji,alphaToCoverage:!!w.alphaToCoverage,map:j,matcap:et,envMap:Q,envMapMode:Q&&ne.mapping,envMapCubeUVHeight:I,aoMap:de,lightMap:he,bumpMap:Me,normalMap:Te,displacementMap:h&&Ce,emissiveMap:qe,normalMapObjectSpace:Te&&w.normalMapType===ey,normalMapTangentSpace:Te&&w.normalMapType===Kh,metalnessMap:P,roughnessMap:E,anisotropy:X,anisotropyMap:ge,clearcoat:te,clearcoatMap:He,clearcoatNormalMap:me,clearcoatRoughnessMap:ke,dispersion:Z,iridescence:oe,iridescenceMap:Ve,iridescenceThicknessMap:Fe,sheen:Ne,sheenColorMap:re,sheenRoughnessMap:Re,specularMap:ze,specularColorMap:it,specularIntensityMap:Le,transmission:Se,transmissionMap:O,thicknessMap:le,gradientMap:ie,opaque:w.transparent===!1&&w.blending===es&&w.alphaToCoverage===!1,alphaMap:_e,alphaTest:Ae,alphaHash:Ke,combine:w.combine,mapUv:j&&S(w.map.channel),aoMapUv:de&&S(w.aoMap.channel),lightMapUv:he&&S(w.lightMap.channel),bumpMapUv:Me&&S(w.bumpMap.channel),normalMapUv:Te&&S(w.normalMap.channel),displacementMapUv:Ce&&S(w.displacementMap.channel),emissiveMapUv:qe&&S(w.emissiveMap.channel),metalnessMapUv:P&&S(w.metalnessMap.channel),roughnessMapUv:E&&S(w.roughnessMap.channel),anisotropyMapUv:ge&&S(w.anisotropyMap.channel),clearcoatMapUv:He&&S(w.clearcoatMap.channel),clearcoatNormalMapUv:me&&S(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ke&&S(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ve&&S(w.iridescenceMap.channel),iridescenceThicknessMapUv:Fe&&S(w.iridescenceThicknessMap.channel),sheenColorMapUv:re&&S(w.sheenColorMap.channel),sheenRoughnessMapUv:Re&&S(w.sheenRoughnessMap.channel),specularMapUv:ze&&S(w.specularMap.channel),specularColorMapUv:it&&S(w.specularColorMap.channel),specularIntensityMapUv:Le&&S(w.specularIntensityMap.channel),transmissionMapUv:O&&S(w.transmissionMap.channel),thicknessMapUv:le&&S(w.thicknessMap.channel),alphaMapUv:_e&&S(w.alphaMap.channel),vertexTangents:!!ee.attributes.tangent&&(Te||X),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!ee.attributes.uv&&(j||_e),fog:!!U,useFog:w.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:D.isSkinnedMesh===!0,morphTargets:ee.morphAttributes.position!==void 0,morphNormals:ee.morphAttributes.normal!==void 0,morphColors:ee.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:De,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:t.shadowMap.enabled&&B.length>0,shadowMapType:t.shadowMap.type,toneMapping:nt,useLegacyLights:t._useLegacyLights,decodeVideoTexture:j&&w.map.isVideoTexture===!0&&gt.getTransfer(w.map.colorSpace)===St,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Mi,flipSided:w.side===hn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:rt&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:rt&&w.extensions.multiDraw===!0&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return yt.vertexUv1s=u.has(1),yt.vertexUv2s=u.has(2),yt.vertexUv3s=u.has(3),u.clear(),yt}function d(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const B in w.defines)M.push(B),M.push(w.defines[B]);return w.isRawShaderMaterial===!1&&(x(M,w),v(M,w),M.push(t.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function x(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function v(w,M){l.disableAll(),M.supportsVertexTextures&&l.enable(0),M.instancing&&l.enable(1),M.instancingColor&&l.enable(2),M.instancingMorph&&l.enable(3),M.matcap&&l.enable(4),M.envMap&&l.enable(5),M.normalMapObjectSpace&&l.enable(6),M.normalMapTangentSpace&&l.enable(7),M.clearcoat&&l.enable(8),M.iridescence&&l.enable(9),M.alphaTest&&l.enable(10),M.vertexColors&&l.enable(11),M.vertexAlphas&&l.enable(12),M.vertexUv1s&&l.enable(13),M.vertexUv2s&&l.enable(14),M.vertexUv3s&&l.enable(15),M.vertexTangents&&l.enable(16),M.anisotropy&&l.enable(17),M.alphaHash&&l.enable(18),M.batching&&l.enable(19),M.dispersion&&l.enable(20),w.push(l.mask),l.disableAll(),M.fog&&l.enable(0),M.useFog&&l.enable(1),M.flatShading&&l.enable(2),M.logarithmicDepthBuffer&&l.enable(3),M.skinning&&l.enable(4),M.morphTargets&&l.enable(5),M.morphNormals&&l.enable(6),M.morphColors&&l.enable(7),M.premultipliedAlpha&&l.enable(8),M.shadowMapEnabled&&l.enable(9),M.useLegacyLights&&l.enable(10),M.doubleSided&&l.enable(11),M.flipSided&&l.enable(12),M.useDepthPacking&&l.enable(13),M.dithering&&l.enable(14),M.transmission&&l.enable(15),M.sheen&&l.enable(16),M.opaque&&l.enable(17),M.pointsUvs&&l.enable(18),M.decodeVideoTexture&&l.enable(19),M.alphaToCoverage&&l.enable(20),w.push(l.mask)}function b(w){const M=y[w.type];let B;if(M){const z=li[M];B=my.clone(z.uniforms)}else B=w.uniforms;return B}function L(w,M){let B;for(let z=0,D=p.length;z<D;z++){const U=p[z];if(U.cacheKey===M){B=U,++B.usedTimes;break}}return B===void 0&&(B=new X2(t,M,w,s),p.push(B)),B}function R(w){if(--w.usedTimes===0){const M=p.indexOf(w);p[M]=p[p.length-1],p.pop(),w.destroy()}}function A(w){c.remove(w)}function k(){c.dispose()}return{getParameters:g,getProgramCacheKey:d,getUniforms:b,acquireProgram:L,releaseProgram:R,releaseShaderCache:A,programs:p,dispose:k}}function J2(){let t=new WeakMap;function e(s){let o=t.get(s);return o===void 0&&(o={},t.set(s,o)),o}function n(s){t.delete(s)}function i(s,o,l){t.get(s)[o]=l}function r(){t=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function Z2(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function wg(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Tg(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(f,h,m,y,S,g){let d=t[e];return d===void 0?(d={id:f.id,object:f,geometry:h,material:m,groupOrder:y,renderOrder:f.renderOrder,z:S,group:g},t[e]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=m,d.groupOrder=y,d.renderOrder=f.renderOrder,d.z=S,d.group=g),e++,d}function l(f,h,m,y,S,g){const d=o(f,h,m,y,S,g);m.transmission>0?i.push(d):m.transparent===!0?r.push(d):n.push(d)}function c(f,h,m,y,S,g){const d=o(f,h,m,y,S,g);m.transmission>0?i.unshift(d):m.transparent===!0?r.unshift(d):n.unshift(d)}function u(f,h){n.length>1&&n.sort(f||Z2),i.length>1&&i.sort(h||wg),r.length>1&&r.sort(h||wg)}function p(){for(let f=e,h=t.length;f<h;f++){const m=t[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:p,sort:u}}function Q2(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new Tg,t.set(i,[o])):r>=s.length?(o=new Tg,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function ew(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new V,color:new ot};break;case"SpotLight":n={position:new V,direction:new V,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new V,color:new ot,distance:0,decay:0};break;case"HemisphereLight":n={direction:new V,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":n={color:new ot,position:new V,halfWidth:new V,halfHeight:new V};break}return t[e.id]=n,n}}}function tw(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let nw=0;function iw(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function rw(t){const e=new ew,n=tw(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new V);const r=new V,s=new Et,o=new Et;function l(u,p){let f=0,h=0,m=0;for(let B=0;B<9;B++)i.probe[B].set(0,0,0);let y=0,S=0,g=0,d=0,x=0,v=0,b=0,L=0,R=0,A=0,k=0;u.sort(iw);const w=p===!0?Math.PI:1;for(let B=0,z=u.length;B<z;B++){const D=u[B],U=D.color,ee=D.intensity,ae=D.distance,ne=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)f+=U.r*ee*w,h+=U.g*ee*w,m+=U.b*ee*w;else if(D.isLightProbe){for(let I=0;I<9;I++)i.probe[I].addScaledVector(D.sh.coefficients[I],ee);k++}else if(D.isDirectionalLight){const I=e.get(D);if(I.color.copy(D.color).multiplyScalar(D.intensity*w),D.castShadow){const W=D.shadow,G=n.get(D);G.shadowBias=W.bias,G.shadowNormalBias=W.normalBias,G.shadowRadius=W.radius,G.shadowMapSize=W.mapSize,i.directionalShadow[y]=G,i.directionalShadowMap[y]=ne,i.directionalShadowMatrix[y]=D.shadow.matrix,v++}i.directional[y]=I,y++}else if(D.isSpotLight){const I=e.get(D);I.position.setFromMatrixPosition(D.matrixWorld),I.color.copy(U).multiplyScalar(ee*w),I.distance=ae,I.coneCos=Math.cos(D.angle),I.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),I.decay=D.decay,i.spot[g]=I;const W=D.shadow;if(D.map&&(i.spotLightMap[R]=D.map,R++,W.updateMatrices(D),D.castShadow&&A++),i.spotLightMatrix[g]=W.matrix,D.castShadow){const G=n.get(D);G.shadowBias=W.bias,G.shadowNormalBias=W.normalBias,G.shadowRadius=W.radius,G.shadowMapSize=W.mapSize,i.spotShadow[g]=G,i.spotShadowMap[g]=ne,L++}g++}else if(D.isRectAreaLight){const I=e.get(D);I.color.copy(U).multiplyScalar(ee),I.halfWidth.set(D.width*.5,0,0),I.halfHeight.set(0,D.height*.5,0),i.rectArea[d]=I,d++}else if(D.isPointLight){const I=e.get(D);if(I.color.copy(D.color).multiplyScalar(D.intensity*w),I.distance=D.distance,I.decay=D.decay,D.castShadow){const W=D.shadow,G=n.get(D);G.shadowBias=W.bias,G.shadowNormalBias=W.normalBias,G.shadowRadius=W.radius,G.shadowMapSize=W.mapSize,G.shadowCameraNear=W.camera.near,G.shadowCameraFar=W.camera.far,i.pointShadow[S]=G,i.pointShadowMap[S]=ne,i.pointShadowMatrix[S]=D.shadow.matrix,b++}i.point[S]=I,S++}else if(D.isHemisphereLight){const I=e.get(D);I.skyColor.copy(D.color).multiplyScalar(ee*w),I.groundColor.copy(D.groundColor).multiplyScalar(ee*w),i.hemi[x]=I,x++}}d>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=h,i.ambient[2]=m;const M=i.hash;(M.directionalLength!==y||M.pointLength!==S||M.spotLength!==g||M.rectAreaLength!==d||M.hemiLength!==x||M.numDirectionalShadows!==v||M.numPointShadows!==b||M.numSpotShadows!==L||M.numSpotMaps!==R||M.numLightProbes!==k)&&(i.directional.length=y,i.spot.length=g,i.rectArea.length=d,i.point.length=S,i.hemi.length=x,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=L,i.spotShadowMap.length=L,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=L+R-A,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=k,M.directionalLength=y,M.pointLength=S,M.spotLength=g,M.rectAreaLength=d,M.hemiLength=x,M.numDirectionalShadows=v,M.numPointShadows=b,M.numSpotShadows=L,M.numSpotMaps=R,M.numLightProbes=k,i.version=nw++)}function c(u,p){let f=0,h=0,m=0,y=0,S=0;const g=p.matrixWorldInverse;for(let d=0,x=u.length;d<x;d++){const v=u[d];if(v.isDirectionalLight){const b=i.directional[f];b.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(g),f++}else if(v.isSpotLight){const b=i.spot[m];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(g),m++}else if(v.isRectAreaLight){const b=i.rectArea[y];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(g),o.identity(),s.copy(v.matrixWorld),s.premultiply(g),o.extractRotation(s),b.halfWidth.set(v.width*.5,0,0),b.halfHeight.set(0,v.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),y++}else if(v.isPointLight){const b=i.point[h];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(g),h++}else if(v.isHemisphereLight){const b=i.hemi[S];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(g),S++}}}return{setup:l,setupView:c,state:i}}function Ag(t){const e=new rw(t),n=[],i=[];function r(p){u.camera=p,n.length=0,i.length=0}function s(p){n.push(p)}function o(p){i.push(p)}function l(p){e.setup(n,p)}function c(p){e.setupView(n,p)}const u={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:u,setupLights:l,setupLightsView:c,pushLight:s,pushShadow:o}}function sw(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let l;return o===void 0?(l=new Ag(t),e.set(r,[l])):s>=o.length?(l=new Ag(t),o.push(l)):l=o[s],l}function i(){e=new WeakMap}return{get:n,dispose:i}}class wy extends Pr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ty extends Pr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ow=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,aw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function lw(t,e,n){let i=new su;const r=new ut,s=new ut,o=new Tt,l=new wy({depthPacking:Qv}),c=new Ty,u={},p=n.maxTextureSize,f={[$i]:hn,[hn]:$i,[Mi]:Mi},h=new qi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:ow,fragmentShader:aw}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const y=new Kn;y.setAttribute("position",new hi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new bi(y,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jh;let d=this.type;this.render=function(R,A,k){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;const w=t.getRenderTarget(),M=t.getActiveCubeFace(),B=t.getActiveMipmapLevel(),z=t.state;z.setBlending(ji),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const D=d!==yi&&this.type===yi,U=d===yi&&this.type!==yi;for(let ee=0,ae=R.length;ee<ae;ee++){const ne=R[ee],I=ne.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;r.copy(I.mapSize);const W=I.getFrameExtents();if(r.multiply(W),s.copy(I.mapSize),(r.x>p||r.y>p)&&(r.x>p&&(s.x=Math.floor(p/W.x),r.x=s.x*W.x,I.mapSize.x=s.x),r.y>p&&(s.y=Math.floor(p/W.y),r.y=s.y*W.y,I.mapSize.y=s.y)),I.map===null||D===!0||U===!0){const fe=this.type!==yi?{minFilter:Un,magFilter:Un}:{};I.map!==null&&I.map.dispose(),I.map=new Tr(r.x,r.y,fe),I.map.texture.name=ne.name+".shadowMap",I.camera.updateProjectionMatrix()}t.setRenderTarget(I.map),t.clear();const G=I.getViewportCount();for(let fe=0;fe<G;fe++){const De=I.getViewport(fe);o.set(s.x*De.x,s.y*De.y,s.x*De.z,s.y*De.w),z.viewport(o),I.updateMatrices(ne,fe),i=I.getFrustum(),b(A,k,I.camera,ne,this.type)}I.isPointLightShadow!==!0&&this.type===yi&&x(I,k),I.needsUpdate=!1}d=this.type,g.needsUpdate=!1,t.setRenderTarget(w,M,B)};function x(R,A){const k=e.update(S);h.defines.VSM_SAMPLES!==R.blurSamples&&(h.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Tr(r.x,r.y)),h.uniforms.shadow_pass.value=R.map.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,t.setRenderTarget(R.mapPass),t.clear(),t.renderBufferDirect(A,null,k,h,S,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,t.setRenderTarget(R.map),t.clear(),t.renderBufferDirect(A,null,k,m,S,null)}function v(R,A,k,w){let M=null;const B=k.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(B!==void 0)M=B;else if(M=k.isPointLight===!0?c:l,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const z=M.uuid,D=A.uuid;let U=u[z];U===void 0&&(U={},u[z]=U);let ee=U[D];ee===void 0&&(ee=M.clone(),U[D]=ee,A.addEventListener("dispose",L)),M=ee}if(M.visible=A.visible,M.wireframe=A.wireframe,w===yi?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:f[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,k.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const z=t.properties.get(M);z.light=k}return M}function b(R,A,k,w,M){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&M===yi)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,R.matrixWorld);const D=e.update(R),U=R.material;if(Array.isArray(U)){const ee=D.groups;for(let ae=0,ne=ee.length;ae<ne;ae++){const I=ee[ae],W=U[I.materialIndex];if(W&&W.visible){const G=v(R,W,w,M);R.onBeforeShadow(t,R,A,k,D,G,I),t.renderBufferDirect(k,null,D,G,R,I),R.onAfterShadow(t,R,A,k,D,G,I)}}}else if(U.visible){const ee=v(R,U,w,M);R.onBeforeShadow(t,R,A,k,D,ee,null),t.renderBufferDirect(k,null,D,ee,R,null),R.onAfterShadow(t,R,A,k,D,ee,null)}}const z=R.children;for(let D=0,U=z.length;D<U;D++)b(z[D],A,k,w,M)}function L(R){R.target.removeEventListener("dispose",L);for(const k in u){const w=u[k],M=R.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}function cw(t){function e(){let O=!1;const le=new Tt;let ie=null;const _e=new Tt(0,0,0,0);return{setMask:function(Ae){ie!==Ae&&!O&&(t.colorMask(Ae,Ae,Ae,Ae),ie=Ae)},setLocked:function(Ae){O=Ae},setClear:function(Ae,Ke,rt,nt,yt){yt===!0&&(Ae*=nt,Ke*=nt,rt*=nt),le.set(Ae,Ke,rt,nt),_e.equals(le)===!1&&(t.clearColor(Ae,Ke,rt,nt),_e.copy(le))},reset:function(){O=!1,ie=null,_e.set(-1,0,0,0)}}}function n(){let O=!1,le=null,ie=null,_e=null;return{setTest:function(Ae){Ae?ve(t.DEPTH_TEST):ye(t.DEPTH_TEST)},setMask:function(Ae){le!==Ae&&!O&&(t.depthMask(Ae),le=Ae)},setFunc:function(Ae){if(ie!==Ae){switch(Ae){case wv:t.depthFunc(t.NEVER);break;case Tv:t.depthFunc(t.ALWAYS);break;case Av:t.depthFunc(t.LESS);break;case Ca:t.depthFunc(t.LEQUAL);break;case Cv:t.depthFunc(t.EQUAL);break;case Rv:t.depthFunc(t.GEQUAL);break;case Pv:t.depthFunc(t.GREATER);break;case Nv:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ie=Ae}},setLocked:function(Ae){O=Ae},setClear:function(Ae){_e!==Ae&&(t.clearDepth(Ae),_e=Ae)},reset:function(){O=!1,le=null,ie=null,_e=null}}}function i(){let O=!1,le=null,ie=null,_e=null,Ae=null,Ke=null,rt=null,nt=null,yt=null;return{setTest:function(st){O||(st?ve(t.STENCIL_TEST):ye(t.STENCIL_TEST))},setMask:function(st){le!==st&&!O&&(t.stencilMask(st),le=st)},setFunc:function(st,Kt,Ut){(ie!==st||_e!==Kt||Ae!==Ut)&&(t.stencilFunc(st,Kt,Ut),ie=st,_e=Kt,Ae=Ut)},setOp:function(st,Kt,Ut){(Ke!==st||rt!==Kt||nt!==Ut)&&(t.stencilOp(st,Kt,Ut),Ke=st,rt=Kt,nt=Ut)},setLocked:function(st){O=st},setClear:function(st){yt!==st&&(t.clearStencil(st),yt=st)},reset:function(){O=!1,le=null,ie=null,_e=null,Ae=null,Ke=null,rt=null,nt=null,yt=null}}}const r=new e,s=new n,o=new i,l=new WeakMap,c=new WeakMap;let u={},p={},f=new WeakMap,h=[],m=null,y=!1,S=null,g=null,d=null,x=null,v=null,b=null,L=null,R=new ot(0,0,0),A=0,k=!1,w=null,M=null,B=null,z=null,D=null;const U=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ee=!1,ae=0;const ne=t.getParameter(t.VERSION);ne.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(ne)[1]),ee=ae>=1):ne.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),ee=ae>=2);let I=null,W={};const G=t.getParameter(t.SCISSOR_BOX),fe=t.getParameter(t.VIEWPORT),De=new Tt().fromArray(G),Ye=new Tt().fromArray(fe);function J(O,le,ie,_e){const Ae=new Uint8Array(4),Ke=t.createTexture();t.bindTexture(O,Ke),t.texParameteri(O,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(O,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let rt=0;rt<ie;rt++)O===t.TEXTURE_3D||O===t.TEXTURE_2D_ARRAY?t.texImage3D(le,0,t.RGBA,1,1,_e,0,t.RGBA,t.UNSIGNED_BYTE,Ae):t.texImage2D(le+rt,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Ae);return Ke}const ce={};ce[t.TEXTURE_2D]=J(t.TEXTURE_2D,t.TEXTURE_2D,1),ce[t.TEXTURE_CUBE_MAP]=J(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[t.TEXTURE_2D_ARRAY]=J(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ce[t.TEXTURE_3D]=J(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ve(t.DEPTH_TEST),s.setFunc(Ca),Me(!1),Te(af),ve(t.CULL_FACE),de(ji);function ve(O){u[O]!==!0&&(t.enable(O),u[O]=!0)}function ye(O){u[O]!==!1&&(t.disable(O),u[O]=!1)}function se(O,le){return p[O]!==le?(t.bindFramebuffer(O,le),p[O]=le,O===t.DRAW_FRAMEBUFFER&&(p[t.FRAMEBUFFER]=le),O===t.FRAMEBUFFER&&(p[t.DRAW_FRAMEBUFFER]=le),!0):!1}function we(O,le){let ie=h,_e=!1;if(O){ie=f.get(le),ie===void 0&&(ie=[],f.set(le,ie));const Ae=O.textures;if(ie.length!==Ae.length||ie[0]!==t.COLOR_ATTACHMENT0){for(let Ke=0,rt=Ae.length;Ke<rt;Ke++)ie[Ke]=t.COLOR_ATTACHMENT0+Ke;ie.length=Ae.length,_e=!0}}else ie[0]!==t.BACK&&(ie[0]=t.BACK,_e=!0);_e&&t.drawBuffers(ie)}function j(O){return m!==O?(t.useProgram(O),m=O,!0):!1}const et={[dr]:t.FUNC_ADD,[lv]:t.FUNC_SUBTRACT,[cv]:t.FUNC_REVERSE_SUBTRACT};et[uv]=t.MIN,et[dv]=t.MAX;const Q={[fv]:t.ZERO,[hv]:t.ONE,[pv]:t.SRC_COLOR,[Rc]:t.SRC_ALPHA,[_v]:t.SRC_ALPHA_SATURATE,[vv]:t.DST_COLOR,[gv]:t.DST_ALPHA,[mv]:t.ONE_MINUS_SRC_COLOR,[Pc]:t.ONE_MINUS_SRC_ALPHA,[yv]:t.ONE_MINUS_DST_COLOR,[xv]:t.ONE_MINUS_DST_ALPHA,[Sv]:t.CONSTANT_COLOR,[Mv]:t.ONE_MINUS_CONSTANT_COLOR,[Ev]:t.CONSTANT_ALPHA,[bv]:t.ONE_MINUS_CONSTANT_ALPHA};function de(O,le,ie,_e,Ae,Ke,rt,nt,yt,st){if(O===ji){y===!0&&(ye(t.BLEND),y=!1);return}if(y===!1&&(ve(t.BLEND),y=!0),O!==av){if(O!==S||st!==k){if((g!==dr||v!==dr)&&(t.blendEquation(t.FUNC_ADD),g=dr,v=dr),st)switch(O){case es:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case lf:t.blendFunc(t.ONE,t.ONE);break;case cf:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case uf:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case es:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case lf:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case cf:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case uf:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}d=null,x=null,b=null,L=null,R.set(0,0,0),A=0,S=O,k=st}return}Ae=Ae||le,Ke=Ke||ie,rt=rt||_e,(le!==g||Ae!==v)&&(t.blendEquationSeparate(et[le],et[Ae]),g=le,v=Ae),(ie!==d||_e!==x||Ke!==b||rt!==L)&&(t.blendFuncSeparate(Q[ie],Q[_e],Q[Ke],Q[rt]),d=ie,x=_e,b=Ke,L=rt),(nt.equals(R)===!1||yt!==A)&&(t.blendColor(nt.r,nt.g,nt.b,yt),R.copy(nt),A=yt),S=O,k=!1}function he(O,le){O.side===Mi?ye(t.CULL_FACE):ve(t.CULL_FACE);let ie=O.side===hn;le&&(ie=!ie),Me(ie),O.blending===es&&O.transparent===!1?de(ji):de(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),s.setFunc(O.depthFunc),s.setTest(O.depthTest),s.setMask(O.depthWrite),r.setMask(O.colorWrite);const _e=O.stencilWrite;o.setTest(_e),_e&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),qe(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ve(t.SAMPLE_ALPHA_TO_COVERAGE):ye(t.SAMPLE_ALPHA_TO_COVERAGE)}function Me(O){w!==O&&(O?t.frontFace(t.CW):t.frontFace(t.CCW),w=O)}function Te(O){O!==rv?(ve(t.CULL_FACE),O!==M&&(O===af?t.cullFace(t.BACK):O===sv?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ye(t.CULL_FACE),M=O}function Ce(O){O!==B&&(ee&&t.lineWidth(O),B=O)}function qe(O,le,ie){O?(ve(t.POLYGON_OFFSET_FILL),(z!==le||D!==ie)&&(t.polygonOffset(le,ie),z=le,D=ie)):ye(t.POLYGON_OFFSET_FILL)}function P(O){O?ve(t.SCISSOR_TEST):ye(t.SCISSOR_TEST)}function E(O){O===void 0&&(O=t.TEXTURE0+U-1),I!==O&&(t.activeTexture(O),I=O)}function X(O,le,ie){ie===void 0&&(I===null?ie=t.TEXTURE0+U-1:ie=I);let _e=W[ie];_e===void 0&&(_e={type:void 0,texture:void 0},W[ie]=_e),(_e.type!==O||_e.texture!==le)&&(I!==ie&&(t.activeTexture(ie),I=ie),t.bindTexture(O,le||ce[O]),_e.type=O,_e.texture=le)}function te(){const O=W[I];O!==void 0&&O.type!==void 0&&(t.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Z(){try{t.compressedTexImage2D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function oe(){try{t.compressedTexImage3D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ne(){try{t.texSubImage2D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Se(){try{t.texSubImage3D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ge(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function He(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function me(){try{t.texStorage2D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ke(){try{t.texStorage3D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ve(){try{t.texImage2D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Fe(){try{t.texImage3D.apply(t,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function re(O){De.equals(O)===!1&&(t.scissor(O.x,O.y,O.z,O.w),De.copy(O))}function Re(O){Ye.equals(O)===!1&&(t.viewport(O.x,O.y,O.z,O.w),Ye.copy(O))}function ze(O,le){let ie=c.get(le);ie===void 0&&(ie=new WeakMap,c.set(le,ie));let _e=ie.get(O);_e===void 0&&(_e=t.getUniformBlockIndex(le,O.name),ie.set(O,_e))}function it(O,le){const _e=c.get(le).get(O);l.get(le)!==_e&&(t.uniformBlockBinding(le,_e,O.__bindingPointIndex),l.set(le,_e))}function Le(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),u={},I=null,W={},p={},f=new WeakMap,h=[],m=null,y=!1,S=null,g=null,d=null,x=null,v=null,b=null,L=null,R=new ot(0,0,0),A=0,k=!1,w=null,M=null,B=null,z=null,D=null,De.set(0,0,t.canvas.width,t.canvas.height),Ye.set(0,0,t.canvas.width,t.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:ve,disable:ye,bindFramebuffer:se,drawBuffers:we,useProgram:j,setBlending:de,setMaterial:he,setFlipSided:Me,setCullFace:Te,setLineWidth:Ce,setPolygonOffset:qe,setScissorTest:P,activeTexture:E,bindTexture:X,unbindTexture:te,compressedTexImage2D:Z,compressedTexImage3D:oe,texImage2D:Ve,texImage3D:Fe,updateUBOMapping:ze,uniformBlockBinding:it,texStorage2D:me,texStorage3D:ke,texSubImage2D:Ne,texSubImage3D:Se,compressedTexSubImage2D:ge,compressedTexSubImage3D:He,scissor:re,viewport:Re,reset:Le}}function uw(t,e,n,i,r,s,o){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new ut,p=new WeakMap;let f;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(P,E){return m?new OffscreenCanvas(P,E):Uc("canvas")}function S(P,E,X){let te=1;const Z=qe(P);if((Z.width>X||Z.height>X)&&(te=X/Math.max(Z.width,Z.height)),te<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const oe=Math.floor(te*Z.width),Ne=Math.floor(te*Z.height);f===void 0&&(f=y(oe,Ne));const Se=E?y(oe,Ne):f;return Se.width=oe,Se.height=Ne,Se.getContext("2d").drawImage(P,0,0,oe,Ne),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+oe+"x"+Ne+")."),Se}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),P;return P}function g(P){return P.generateMipmaps&&P.minFilter!==Un&&P.minFilter!==Wn}function d(P){t.generateMipmap(P)}function x(P,E,X,te,Z=!1){if(P!==null){if(t[P]!==void 0)return t[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let oe=E;if(E===t.RED&&(X===t.FLOAT&&(oe=t.R32F),X===t.HALF_FLOAT&&(oe=t.R16F),X===t.UNSIGNED_BYTE&&(oe=t.R8)),E===t.RED_INTEGER&&(X===t.UNSIGNED_BYTE&&(oe=t.R8UI),X===t.UNSIGNED_SHORT&&(oe=t.R16UI),X===t.UNSIGNED_INT&&(oe=t.R32UI),X===t.BYTE&&(oe=t.R8I),X===t.SHORT&&(oe=t.R16I),X===t.INT&&(oe=t.R32I)),E===t.RG&&(X===t.FLOAT&&(oe=t.RG32F),X===t.HALF_FLOAT&&(oe=t.RG16F),X===t.UNSIGNED_BYTE&&(oe=t.RG8)),E===t.RG_INTEGER&&(X===t.UNSIGNED_BYTE&&(oe=t.RG8UI),X===t.UNSIGNED_SHORT&&(oe=t.RG16UI),X===t.UNSIGNED_INT&&(oe=t.RG32UI),X===t.BYTE&&(oe=t.RG8I),X===t.SHORT&&(oe=t.RG16I),X===t.INT&&(oe=t.RG32I)),E===t.RGB&&X===t.UNSIGNED_INT_5_9_9_9_REV&&(oe=t.RGB9_E5),E===t.RGBA){const Ne=Z?Ra:gt.getTransfer(te);X===t.FLOAT&&(oe=t.RGBA32F),X===t.HALF_FLOAT&&(oe=t.RGBA16F),X===t.UNSIGNED_BYTE&&(oe=Ne===St?t.SRGB8_ALPHA8:t.RGBA8),X===t.UNSIGNED_SHORT_4_4_4_4&&(oe=t.RGBA4),X===t.UNSIGNED_SHORT_5_5_5_1&&(oe=t.RGB5_A1)}return(oe===t.R16F||oe===t.R32F||oe===t.RG16F||oe===t.RG32F||oe===t.RGBA16F||oe===t.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function v(P,E){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==Un&&P.minFilter!==Wn?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function b(P){const E=P.target;E.removeEventListener("dispose",b),R(E),E.isVideoTexture&&p.delete(E)}function L(P){const E=P.target;E.removeEventListener("dispose",L),k(E)}function R(P){const E=i.get(P);if(E.__webglInit===void 0)return;const X=P.source,te=h.get(X);if(te){const Z=te[E.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&A(P),Object.keys(te).length===0&&h.delete(X)}i.remove(P)}function A(P){const E=i.get(P);t.deleteTexture(E.__webglTexture);const X=P.source,te=h.get(X);delete te[E.__cacheKey],o.memory.textures--}function k(P){const E=i.get(P);if(P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(E.__webglFramebuffer[te]))for(let Z=0;Z<E.__webglFramebuffer[te].length;Z++)t.deleteFramebuffer(E.__webglFramebuffer[te][Z]);else t.deleteFramebuffer(E.__webglFramebuffer[te]);E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer[te])}else{if(Array.isArray(E.__webglFramebuffer))for(let te=0;te<E.__webglFramebuffer.length;te++)t.deleteFramebuffer(E.__webglFramebuffer[te]);else t.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&t.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let te=0;te<E.__webglColorRenderbuffer.length;te++)E.__webglColorRenderbuffer[te]&&t.deleteRenderbuffer(E.__webglColorRenderbuffer[te]);E.__webglDepthRenderbuffer&&t.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const X=P.textures;for(let te=0,Z=X.length;te<Z;te++){const oe=i.get(X[te]);oe.__webglTexture&&(t.deleteTexture(oe.__webglTexture),o.memory.textures--),i.remove(X[te])}i.remove(P)}let w=0;function M(){w=0}function B(){const P=w;return P>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),w+=1,P}function z(P){const E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function D(P,E){const X=i.get(P);if(P.isVideoTexture&&Te(P),P.isRenderTargetTexture===!1&&P.version>0&&X.__version!==P.version){const te=P.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{De(X,P,E);return}}n.bindTexture(t.TEXTURE_2D,X.__webglTexture,t.TEXTURE0+E)}function U(P,E){const X=i.get(P);if(P.version>0&&X.__version!==P.version){De(X,P,E);return}n.bindTexture(t.TEXTURE_2D_ARRAY,X.__webglTexture,t.TEXTURE0+E)}function ee(P,E){const X=i.get(P);if(P.version>0&&X.__version!==P.version){De(X,P,E);return}n.bindTexture(t.TEXTURE_3D,X.__webglTexture,t.TEXTURE0+E)}function ae(P,E){const X=i.get(P);if(P.version>0&&X.__version!==P.version){Ye(X,P,E);return}n.bindTexture(t.TEXTURE_CUBE_MAP,X.__webglTexture,t.TEXTURE0+E)}const ne={[Ic]:t.REPEAT,[pr]:t.CLAMP_TO_EDGE,[Dc]:t.MIRRORED_REPEAT},I={[Un]:t.NEAREST,[jv]:t.NEAREST_MIPMAP_NEAREST,[Jo]:t.NEAREST_MIPMAP_LINEAR,[Wn]:t.LINEAR,[Zl]:t.LINEAR_MIPMAP_NEAREST,[mr]:t.LINEAR_MIPMAP_LINEAR},W={[ty]:t.NEVER,[ay]:t.ALWAYS,[ny]:t.LESS,[Jh]:t.LEQUAL,[iy]:t.EQUAL,[oy]:t.GEQUAL,[ry]:t.GREATER,[sy]:t.NOTEQUAL};function G(P,E){if(E.type===zi&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Wn||E.magFilter===Zl||E.magFilter===Jo||E.magFilter===mr||E.minFilter===Wn||E.minFilter===Zl||E.minFilter===Jo||E.minFilter===mr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(P,t.TEXTURE_WRAP_S,ne[E.wrapS]),t.texParameteri(P,t.TEXTURE_WRAP_T,ne[E.wrapT]),(P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY)&&t.texParameteri(P,t.TEXTURE_WRAP_R,ne[E.wrapR]),t.texParameteri(P,t.TEXTURE_MAG_FILTER,I[E.magFilter]),t.texParameteri(P,t.TEXTURE_MIN_FILTER,I[E.minFilter]),E.compareFunction&&(t.texParameteri(P,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(P,t.TEXTURE_COMPARE_FUNC,W[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Un||E.minFilter!==Jo&&E.minFilter!==mr||E.type===zi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");t.texParameterf(P,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function fe(P,E){let X=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",b));const te=E.source;let Z=h.get(te);Z===void 0&&(Z={},h.set(te,Z));const oe=z(E);if(oe!==P.__cacheKey){Z[oe]===void 0&&(Z[oe]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,X=!0),Z[oe].usedTimes++;const Ne=Z[P.__cacheKey];Ne!==void 0&&(Z[P.__cacheKey].usedTimes--,Ne.usedTimes===0&&A(E)),P.__cacheKey=oe,P.__webglTexture=Z[oe].texture}return X}function De(P,E,X){let te=t.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(te=t.TEXTURE_2D_ARRAY),E.isData3DTexture&&(te=t.TEXTURE_3D);const Z=fe(P,E),oe=E.source;n.bindTexture(te,P.__webglTexture,t.TEXTURE0+X);const Ne=i.get(oe);if(oe.version!==Ne.__version||Z===!0){n.activeTexture(t.TEXTURE0+X);const Se=gt.getPrimaries(gt.workingColorSpace),ge=E.colorSpace===Oi?null:gt.getPrimaries(E.colorSpace),He=E.colorSpace===Oi||Se===ge?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,He);let me=S(E.image,!1,r.maxTextureSize);me=Ce(E,me);const ke=s.convert(E.format,E.colorSpace),Ve=s.convert(E.type);let Fe=x(E.internalFormat,ke,Ve,E.colorSpace,E.isVideoTexture);G(te,E);let re;const Re=E.mipmaps,ze=E.isVideoTexture!==!0,it=Ne.__version===void 0||Z===!0,Le=oe.dataReady,O=v(E,me);if(E.isDepthTexture)Fe=t.DEPTH_COMPONENT16,E.type===zi?Fe=t.DEPTH_COMPONENT32F:E.type===cs?Fe=t.DEPTH_COMPONENT24:E.type===yo&&(Fe=t.DEPTH24_STENCIL8),it&&(ze?n.texStorage2D(t.TEXTURE_2D,1,Fe,me.width,me.height):n.texImage2D(t.TEXTURE_2D,0,Fe,me.width,me.height,0,ke,Ve,null));else if(E.isDataTexture)if(Re.length>0){ze&&it&&n.texStorage2D(t.TEXTURE_2D,O,Fe,Re[0].width,Re[0].height);for(let le=0,ie=Re.length;le<ie;le++)re=Re[le],ze?Le&&n.texSubImage2D(t.TEXTURE_2D,le,0,0,re.width,re.height,ke,Ve,re.data):n.texImage2D(t.TEXTURE_2D,le,Fe,re.width,re.height,0,ke,Ve,re.data);E.generateMipmaps=!1}else ze?(it&&n.texStorage2D(t.TEXTURE_2D,O,Fe,me.width,me.height),Le&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,me.width,me.height,ke,Ve,me.data)):n.texImage2D(t.TEXTURE_2D,0,Fe,me.width,me.height,0,ke,Ve,me.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){ze&&it&&n.texStorage3D(t.TEXTURE_2D_ARRAY,O,Fe,Re[0].width,Re[0].height,me.depth);for(let le=0,ie=Re.length;le<ie;le++)re=Re[le],E.format!==ui?ke!==null?ze?Le&&n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,le,0,0,0,re.width,re.height,me.depth,ke,re.data,0,0):n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,le,Fe,re.width,re.height,me.depth,0,re.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?Le&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,le,0,0,0,re.width,re.height,me.depth,ke,Ve,re.data):n.texImage3D(t.TEXTURE_2D_ARRAY,le,Fe,re.width,re.height,me.depth,0,ke,Ve,re.data)}else{ze&&it&&n.texStorage2D(t.TEXTURE_2D,O,Fe,Re[0].width,Re[0].height);for(let le=0,ie=Re.length;le<ie;le++)re=Re[le],E.format!==ui?ke!==null?ze?Le&&n.compressedTexSubImage2D(t.TEXTURE_2D,le,0,0,re.width,re.height,ke,re.data):n.compressedTexImage2D(t.TEXTURE_2D,le,Fe,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?Le&&n.texSubImage2D(t.TEXTURE_2D,le,0,0,re.width,re.height,ke,Ve,re.data):n.texImage2D(t.TEXTURE_2D,le,Fe,re.width,re.height,0,ke,Ve,re.data)}else if(E.isDataArrayTexture)ze?(it&&n.texStorage3D(t.TEXTURE_2D_ARRAY,O,Fe,me.width,me.height,me.depth),Le&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,ke,Ve,me.data)):n.texImage3D(t.TEXTURE_2D_ARRAY,0,Fe,me.width,me.height,me.depth,0,ke,Ve,me.data);else if(E.isData3DTexture)ze?(it&&n.texStorage3D(t.TEXTURE_3D,O,Fe,me.width,me.height,me.depth),Le&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,ke,Ve,me.data)):n.texImage3D(t.TEXTURE_3D,0,Fe,me.width,me.height,me.depth,0,ke,Ve,me.data);else if(E.isFramebufferTexture){if(it)if(ze)n.texStorage2D(t.TEXTURE_2D,O,Fe,me.width,me.height);else{let le=me.width,ie=me.height;for(let _e=0;_e<O;_e++)n.texImage2D(t.TEXTURE_2D,_e,Fe,le,ie,0,ke,Ve,null),le>>=1,ie>>=1}}else if(Re.length>0){if(ze&&it){const le=qe(Re[0]);n.texStorage2D(t.TEXTURE_2D,O,Fe,le.width,le.height)}for(let le=0,ie=Re.length;le<ie;le++)re=Re[le],ze?Le&&n.texSubImage2D(t.TEXTURE_2D,le,0,0,ke,Ve,re):n.texImage2D(t.TEXTURE_2D,le,Fe,ke,Ve,re);E.generateMipmaps=!1}else if(ze){if(it){const le=qe(me);n.texStorage2D(t.TEXTURE_2D,O,Fe,le.width,le.height)}Le&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ke,Ve,me)}else n.texImage2D(t.TEXTURE_2D,0,Fe,ke,Ve,me);g(E)&&d(te),Ne.__version=oe.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function Ye(P,E,X){if(E.image.length!==6)return;const te=fe(P,E),Z=E.source;n.bindTexture(t.TEXTURE_CUBE_MAP,P.__webglTexture,t.TEXTURE0+X);const oe=i.get(Z);if(Z.version!==oe.__version||te===!0){n.activeTexture(t.TEXTURE0+X);const Ne=gt.getPrimaries(gt.workingColorSpace),Se=E.colorSpace===Oi?null:gt.getPrimaries(E.colorSpace),ge=E.colorSpace===Oi||Ne===Se?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const He=E.isCompressedTexture||E.image[0].isCompressedTexture,me=E.image[0]&&E.image[0].isDataTexture,ke=[];for(let ie=0;ie<6;ie++)!He&&!me?ke[ie]=S(E.image[ie],!0,r.maxCubemapSize):ke[ie]=me?E.image[ie].image:E.image[ie],ke[ie]=Ce(E,ke[ie]);const Ve=ke[0],Fe=s.convert(E.format,E.colorSpace),re=s.convert(E.type),Re=x(E.internalFormat,Fe,re,E.colorSpace),ze=E.isVideoTexture!==!0,it=oe.__version===void 0||te===!0,Le=Z.dataReady;let O=v(E,Ve);G(t.TEXTURE_CUBE_MAP,E);let le;if(He){ze&&it&&n.texStorage2D(t.TEXTURE_CUBE_MAP,O,Re,Ve.width,Ve.height);for(let ie=0;ie<6;ie++){le=ke[ie].mipmaps;for(let _e=0;_e<le.length;_e++){const Ae=le[_e];E.format!==ui?Fe!==null?ze?Le&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,_e,0,0,Ae.width,Ae.height,Fe,Ae.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,_e,Re,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?Le&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,_e,0,0,Ae.width,Ae.height,Fe,re,Ae.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,_e,Re,Ae.width,Ae.height,0,Fe,re,Ae.data)}}}else{if(le=E.mipmaps,ze&&it){le.length>0&&O++;const ie=qe(ke[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,O,Re,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(me){ze?Le&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,ke[ie].width,ke[ie].height,Fe,re,ke[ie].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Re,ke[ie].width,ke[ie].height,0,Fe,re,ke[ie].data);for(let _e=0;_e<le.length;_e++){const Ke=le[_e].image[ie].image;ze?Le&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,_e+1,0,0,Ke.width,Ke.height,Fe,re,Ke.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,_e+1,Re,Ke.width,Ke.height,0,Fe,re,Ke.data)}}else{ze?Le&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Fe,re,ke[ie]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Re,Fe,re,ke[ie]);for(let _e=0;_e<le.length;_e++){const Ae=le[_e];ze?Le&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,_e+1,0,0,Fe,re,Ae.image[ie]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,_e+1,Re,Fe,re,Ae.image[ie])}}}g(E)&&d(t.TEXTURE_CUBE_MAP),oe.__version=Z.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function J(P,E,X,te,Z,oe){const Ne=s.convert(X.format,X.colorSpace),Se=s.convert(X.type),ge=x(X.internalFormat,Ne,Se,X.colorSpace);if(!i.get(E).__hasExternalTextures){const me=Math.max(1,E.width>>oe),ke=Math.max(1,E.height>>oe);Z===t.TEXTURE_3D||Z===t.TEXTURE_2D_ARRAY?n.texImage3D(Z,oe,ge,me,ke,E.depth,0,Ne,Se,null):n.texImage2D(Z,oe,ge,me,ke,0,Ne,Se,null)}n.bindFramebuffer(t.FRAMEBUFFER,P),Me(E)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,te,Z,i.get(X).__webglTexture,0,he(E)):(Z===t.TEXTURE_2D||Z>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,te,Z,i.get(X).__webglTexture,oe),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ce(P,E,X){if(t.bindRenderbuffer(t.RENDERBUFFER,P),E.depthBuffer&&!E.stencilBuffer){let te=t.DEPTH_COMPONENT24;if(X||Me(E)){const Z=E.depthTexture;Z&&Z.isDepthTexture&&(Z.type===zi?te=t.DEPTH_COMPONENT32F:Z.type===cs&&(te=t.DEPTH_COMPONENT24));const oe=he(E);Me(E)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,oe,te,E.width,E.height):t.renderbufferStorageMultisample(t.RENDERBUFFER,oe,te,E.width,E.height)}else t.renderbufferStorage(t.RENDERBUFFER,te,E.width,E.height);t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,P)}else if(E.depthBuffer&&E.stencilBuffer){const te=he(E);X&&Me(E)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,te,t.DEPTH24_STENCIL8,E.width,E.height):Me(E)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,te,t.DEPTH24_STENCIL8,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,E.width,E.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,P)}else{const te=E.textures;for(let Z=0;Z<te.length;Z++){const oe=te[Z],Ne=s.convert(oe.format,oe.colorSpace),Se=s.convert(oe.type),ge=x(oe.internalFormat,Ne,Se,oe.colorSpace),He=he(E);X&&Me(E)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,He,ge,E.width,E.height):Me(E)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,He,ge,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,ge,E.width,E.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function ve(P,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),D(E.depthTexture,0);const te=i.get(E.depthTexture).__webglTexture,Z=he(E);if(E.depthTexture.format===ts)Me(E)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,te,0,Z):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,te,0);else if(E.depthTexture.format===po)Me(E)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,te,0,Z):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function ye(P){const E=i.get(P),X=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!E.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");ve(E.__webglFramebuffer,P)}else if(X){E.__webglDepthbuffer=[];for(let te=0;te<6;te++)n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer[te]),E.__webglDepthbuffer[te]=t.createRenderbuffer(),ce(E.__webglDepthbuffer[te],P,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=t.createRenderbuffer(),ce(E.__webglDepthbuffer,P,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function se(P,E,X){const te=i.get(P);E!==void 0&&J(te.__webglFramebuffer,P,P.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),X!==void 0&&ye(P)}function we(P){const E=P.texture,X=i.get(P),te=i.get(E);P.addEventListener("dispose",L);const Z=P.textures,oe=P.isWebGLCubeRenderTarget===!0,Ne=Z.length>1;if(Ne||(te.__webglTexture===void 0&&(te.__webglTexture=t.createTexture()),te.__version=E.version,o.memory.textures++),oe){X.__webglFramebuffer=[];for(let Se=0;Se<6;Se++)if(E.mipmaps&&E.mipmaps.length>0){X.__webglFramebuffer[Se]=[];for(let ge=0;ge<E.mipmaps.length;ge++)X.__webglFramebuffer[Se][ge]=t.createFramebuffer()}else X.__webglFramebuffer[Se]=t.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){X.__webglFramebuffer=[];for(let Se=0;Se<E.mipmaps.length;Se++)X.__webglFramebuffer[Se]=t.createFramebuffer()}else X.__webglFramebuffer=t.createFramebuffer();if(Ne)for(let Se=0,ge=Z.length;Se<ge;Se++){const He=i.get(Z[Se]);He.__webglTexture===void 0&&(He.__webglTexture=t.createTexture(),o.memory.textures++)}if(P.samples>0&&Me(P)===!1){X.__webglMultisampledFramebuffer=t.createFramebuffer(),X.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let Se=0;Se<Z.length;Se++){const ge=Z[Se];X.__webglColorRenderbuffer[Se]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,X.__webglColorRenderbuffer[Se]);const He=s.convert(ge.format,ge.colorSpace),me=s.convert(ge.type),ke=x(ge.internalFormat,He,me,ge.colorSpace,P.isXRRenderTarget===!0),Ve=he(P);t.renderbufferStorageMultisample(t.RENDERBUFFER,Ve,ke,P.width,P.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.RENDERBUFFER,X.__webglColorRenderbuffer[Se])}t.bindRenderbuffer(t.RENDERBUFFER,null),P.depthBuffer&&(X.__webglDepthRenderbuffer=t.createRenderbuffer(),ce(X.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(oe){n.bindTexture(t.TEXTURE_CUBE_MAP,te.__webglTexture),G(t.TEXTURE_CUBE_MAP,E);for(let Se=0;Se<6;Se++)if(E.mipmaps&&E.mipmaps.length>0)for(let ge=0;ge<E.mipmaps.length;ge++)J(X.__webglFramebuffer[Se][ge],P,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,ge);else J(X.__webglFramebuffer[Se],P,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0);g(E)&&d(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ne){for(let Se=0,ge=Z.length;Se<ge;Se++){const He=Z[Se],me=i.get(He);n.bindTexture(t.TEXTURE_2D,me.__webglTexture),G(t.TEXTURE_2D,He),J(X.__webglFramebuffer,P,He,t.COLOR_ATTACHMENT0+Se,t.TEXTURE_2D,0),g(He)&&d(t.TEXTURE_2D)}n.unbindTexture()}else{let Se=t.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Se=P.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(Se,te.__webglTexture),G(Se,E),E.mipmaps&&E.mipmaps.length>0)for(let ge=0;ge<E.mipmaps.length;ge++)J(X.__webglFramebuffer[ge],P,E,t.COLOR_ATTACHMENT0,Se,ge);else J(X.__webglFramebuffer,P,E,t.COLOR_ATTACHMENT0,Se,0);g(E)&&d(Se),n.unbindTexture()}P.depthBuffer&&ye(P)}function j(P){const E=P.textures;for(let X=0,te=E.length;X<te;X++){const Z=E[X];if(g(Z)){const oe=P.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,Ne=i.get(Z).__webglTexture;n.bindTexture(oe,Ne),d(oe),n.unbindTexture()}}}const et=[],Q=[];function de(P){if(P.samples>0){if(Me(P)===!1){const E=P.textures,X=P.width,te=P.height;let Z=t.COLOR_BUFFER_BIT;const oe=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Ne=i.get(P),Se=E.length>1;if(Se)for(let ge=0;ge<E.length;ge++)n.bindFramebuffer(t.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Ne.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer);for(let ge=0;ge<E.length;ge++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Z|=t.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Z|=t.STENCIL_BUFFER_BIT)),Se){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Ne.__webglColorRenderbuffer[ge]);const He=i.get(E[ge]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,He,0)}t.blitFramebuffer(0,0,X,te,0,0,X,te,Z,t.NEAREST),c===!0&&(et.length=0,Q.length=0,et.push(t.COLOR_ATTACHMENT0+ge),P.depthBuffer&&P.resolveDepthBuffer===!1&&(et.push(oe),Q.push(oe),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Q)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,et))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),Se)for(let ge=0;ge<E.length;ge++){n.bindFramebuffer(t.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.RENDERBUFFER,Ne.__webglColorRenderbuffer[ge]);const He=i.get(E[ge]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Ne.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.TEXTURE_2D,He,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const E=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[E])}}}function he(P){return Math.min(r.maxSamples,P.samples)}function Me(P){const E=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Te(P){const E=o.render.frame;p.get(P)!==E&&(p.set(P,E),P.update())}function Ce(P,E){const X=P.colorSpace,te=P.format,Z=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||X!==Ji&&X!==Oi&&(gt.getTransfer(X)===St?(te!==ui||Z!==Yi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),E}function qe(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(u.width=P.naturalWidth||P.width,u.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(u.width=P.displayWidth,u.height=P.displayHeight):(u.width=P.width,u.height=P.height),u}this.allocateTextureUnit=B,this.resetTextureUnits=M,this.setTexture2D=D,this.setTexture2DArray=U,this.setTexture3D=ee,this.setTextureCube=ae,this.rebindTextures=se,this.setupRenderTarget=we,this.updateRenderTargetMipmap=j,this.updateMultisampleRenderTarget=de,this.setupDepthRenderbuffer=ye,this.setupFrameBufferTexture=J,this.useMultisampledRTT=Me}function Ay(t,e){function n(i,r=Oi){let s;const o=gt.getTransfer(r);if(i===Yi)return t.UNSIGNED_BYTE;if(i===Wh)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Xh)return t.UNSIGNED_SHORT_5_5_5_1;if(i===Gv)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===Hv)return t.BYTE;if(i===Vv)return t.SHORT;if(i===Vh)return t.UNSIGNED_SHORT;if(i===Gh)return t.INT;if(i===cs)return t.UNSIGNED_INT;if(i===zi)return t.FLOAT;if(i===za)return t.HALF_FLOAT;if(i===Wv)return t.ALPHA;if(i===Xv)return t.RGB;if(i===ui)return t.RGBA;if(i===$v)return t.LUMINANCE;if(i===Yv)return t.LUMINANCE_ALPHA;if(i===ts)return t.DEPTH_COMPONENT;if(i===po)return t.DEPTH_STENCIL;if(i===qv)return t.RED;if(i===$h)return t.RED_INTEGER;if(i===Kv)return t.RG;if(i===Yh)return t.RG_INTEGER;if(i===qh)return t.RGBA_INTEGER;if(i===Ql||i===ec||i===tc||i===nc)if(o===St)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ql)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ec)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===tc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===nc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ql)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ec)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===tc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===nc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===df||i===ff||i===hf||i===pf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===df)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ff)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===hf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===pf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===mf||i===gf||i===xf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===mf||i===gf)return o===St?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===xf)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===vf||i===yf||i===_f||i===Sf||i===Mf||i===Ef||i===bf||i===wf||i===Tf||i===Af||i===Cf||i===Rf||i===Pf||i===Nf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===vf)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===yf)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===_f)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Sf)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Mf)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ef)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===bf)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===wf)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Tf)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Af)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Cf)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Rf)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Pf)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Nf)return o===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ic||i===Lf||i===If)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ic)return o===St?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Lf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===If)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Jv||i===Df||i===Uf||i===Of)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ic)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Df)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Uf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Of)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===yo?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class Cy extends In{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Qo extends en{constructor(){super(),this.isGroup=!0,this.type="Group"}}const dw={type:"move"};class ud{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const l=this._targetRay,c=this._grip,u=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const S of e.hand.values()){const g=n.getJointPose(S,i),d=this._getHandJoint(u,S);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}const p=u.joints["index-finger-tip"],f=u.joints["thumb-tip"],h=p.position.distanceTo(f.position),m=.02,y=.005;u.inputState.pinching&&h>m+y?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&h<=m-y&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));l!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(dw)))}return l!==null&&(l.visible=r!==null),c!==null&&(c.visible=s!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Qo;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const fw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class pw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new pn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}render(e,n){if(this.texture!==null){if(this.mesh===null){const i=n.cameras[0].viewport,r=new qi({vertexShader:fw,fragmentShader:hw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new bi(new Va(20,20),r)}e.render(this.mesh,n)}}reset(){this.texture=null,this.mesh=null}}class mw extends fs{constructor(e,n){super();const i=this;let r=null,s=1,o=null,l="local-floor",c=1,u=null,p=null,f=null,h=null,m=null,y=null;const S=new pw,g=n.getContextAttributes();let d=null,x=null;const v=[],b=[],L=new ut;let R=null;const A=new In;A.layers.enable(1),A.viewport=new Tt;const k=new In;k.layers.enable(2),k.viewport=new Tt;const w=[A,k],M=new Cy;M.layers.enable(1),M.layers.enable(2);let B=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ce=v[J];return ce===void 0&&(ce=new ud,v[J]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(J){let ce=v[J];return ce===void 0&&(ce=new ud,v[J]=ce),ce.getGripSpace()},this.getHand=function(J){let ce=v[J];return ce===void 0&&(ce=new ud,v[J]=ce),ce.getHandSpace()};function D(J){const ce=b.indexOf(J.inputSource);if(ce===-1)return;const ve=v[ce];ve!==void 0&&(ve.update(J.inputSource,J.frame,u||o),ve.dispatchEvent({type:J.type,data:J.inputSource}))}function U(){r.removeEventListener("select",D),r.removeEventListener("selectstart",D),r.removeEventListener("selectend",D),r.removeEventListener("squeeze",D),r.removeEventListener("squeezestart",D),r.removeEventListener("squeezeend",D),r.removeEventListener("end",U),r.removeEventListener("inputsourceschange",ee);for(let J=0;J<v.length;J++){const ce=b[J];ce!==null&&(b[J]=null,v[J].disconnect(ce))}B=null,z=null,S.reset(),e.setRenderTarget(d),m=null,h=null,f=null,r=null,x=null,Ye.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){l=J,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(J){u=J},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return f},this.getFrame=function(){return y},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",D),r.addEventListener("selectstart",D),r.addEventListener("selectend",D),r.addEventListener("squeeze",D),r.addEventListener("squeezestart",D),r.addEventListener("squeezeend",D),r.addEventListener("end",U),r.addEventListener("inputsourceschange",ee),g.xrCompatible!==!0&&await n.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(L),r.renderState.layers===void 0){const ce={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,n,ce),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),x=new Tr(m.framebufferWidth,m.framebufferHeight,{format:ui,type:Yi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let ce=null,ve=null,ye=null;g.depth&&(ye=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ce=g.stencil?po:ts,ve=g.stencil?yo:cs);const se={colorFormat:n.RGBA8,depthFormat:ye,scaleFactor:s};f=new XRWebGLBinding(r,n),h=f.createProjectionLayer(se),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new Tr(h.textureWidth,h.textureHeight,{format:ui,type:Yi,depthTexture:new op(h.textureWidth,h.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),u=null,o=await r.requestReferenceSpace(l),Ye.setContext(r),Ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function ee(J){for(let ce=0;ce<J.removed.length;ce++){const ve=J.removed[ce],ye=b.indexOf(ve);ye>=0&&(b[ye]=null,v[ye].disconnect(ve))}for(let ce=0;ce<J.added.length;ce++){const ve=J.added[ce];let ye=b.indexOf(ve);if(ye===-1){for(let we=0;we<v.length;we++)if(we>=b.length){b.push(ve),ye=we;break}else if(b[we]===null){b[we]=ve,ye=we;break}if(ye===-1)break}const se=v[ye];se&&se.connect(ve)}}const ae=new V,ne=new V;function I(J,ce,ve){ae.setFromMatrixPosition(ce.matrixWorld),ne.setFromMatrixPosition(ve.matrixWorld);const ye=ae.distanceTo(ne),se=ce.projectionMatrix.elements,we=ve.projectionMatrix.elements,j=se[14]/(se[10]-1),et=se[14]/(se[10]+1),Q=(se[9]+1)/se[5],de=(se[9]-1)/se[5],he=(se[8]-1)/se[0],Me=(we[8]+1)/we[0],Te=j*he,Ce=j*Me,qe=ye/(-he+Me),P=qe*-he;ce.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(P),J.translateZ(qe),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert();const E=j+qe,X=et+qe,te=Te-P,Z=Ce+(ye-P),oe=Q*et/X*E,Ne=de*et/X*E;J.projectionMatrix.makePerspective(te,Z,oe,Ne,E,X),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}function W(J,ce){ce===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ce.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;S.texture!==null&&(J.near=S.depthNear,J.far=S.depthFar),M.near=k.near=A.near=J.near,M.far=k.far=A.far=J.far,(B!==M.near||z!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),B=M.near,z=M.far,A.near=B,A.far=z,k.near=B,k.far=z,A.updateProjectionMatrix(),k.updateProjectionMatrix(),J.updateProjectionMatrix());const ce=J.parent,ve=M.cameras;W(M,ce);for(let ye=0;ye<ve.length;ye++)W(ve[ye],ce);ve.length===2?I(M,A,k):M.projectionMatrix.copy(A.projectionMatrix),G(J,M,ce)};function G(J,ce,ve){ve===null?J.matrix.copy(ce.matrixWorld):(J.matrix.copy(ve.matrixWorld),J.matrix.invert(),J.matrix.multiply(ce.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ce.projectionMatrix),J.projectionMatrixInverse.copy(ce.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Bf*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&m===null))return c},this.setFoveation=function(J){c=J,h!==null&&(h.fixedFoveation=J),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=J)},this.hasDepthSensing=function(){return S.texture!==null};let fe=null;function De(J,ce){if(p=ce.getViewerPose(u||o),y=ce,p!==null){const ve=p.views;m!==null&&(e.setRenderTargetFramebuffer(x,m.framebuffer),e.setRenderTarget(x));let ye=!1;ve.length!==M.cameras.length&&(M.cameras.length=0,ye=!0);for(let we=0;we<ve.length;we++){const j=ve[we];let et=null;if(m!==null)et=m.getViewport(j);else{const de=f.getViewSubImage(h,j);et=de.viewport,we===0&&(e.setRenderTargetTextures(x,de.colorTexture,h.ignoreDepthValues?void 0:de.depthStencilTexture),e.setRenderTarget(x))}let Q=w[we];Q===void 0&&(Q=new In,Q.layers.enable(we),Q.viewport=new Tt,w[we]=Q),Q.matrix.fromArray(j.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(j.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(et.x,et.y,et.width,et.height),we===0&&(M.matrix.copy(Q.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ye===!0&&M.cameras.push(Q)}const se=r.enabledFeatures;if(se&&se.includes("depth-sensing")){const we=f.getDepthInformation(ve[0]);we&&we.isValid&&we.texture&&S.init(e,we,r.renderState)}}for(let ve=0;ve<v.length;ve++){const ye=b[ve],se=v[ve];ye!==null&&se!==void 0&&se.update(ye,ce,u||o)}S.render(e,M),fe&&fe(J,ce),ce.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ce}),y=null}const Ye=new vy;Ye.setAnimationLoop(De),this.setAnimationLoop=function(J){fe=J},this.dispose=function(){}}}const jr=new mi,gw=new Et;function xw(t,e){function n(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function i(g,d){d.color.getRGB(g.fogColor.value,py(t)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function r(g,d,x,v,b){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(g,d):d.isMeshToonMaterial?(s(g,d),f(g,d)):d.isMeshPhongMaterial?(s(g,d),p(g,d)):d.isMeshStandardMaterial?(s(g,d),h(g,d),d.isMeshPhysicalMaterial&&m(g,d,b)):d.isMeshMatcapMaterial?(s(g,d),y(g,d)):d.isMeshDepthMaterial?s(g,d):d.isMeshDistanceMaterial?(s(g,d),S(g,d)):d.isMeshNormalMaterial?s(g,d):d.isLineBasicMaterial?(o(g,d),d.isLineDashedMaterial&&l(g,d)):d.isPointsMaterial?c(g,d,x,v):d.isSpriteMaterial?u(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,n(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===hn&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,n(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===hn&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,n(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,n(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);const x=e.get(d),v=x.envMap,b=x.envMapRotation;if(v&&(g.envMap.value=v,jr.copy(b),jr.x*=-1,jr.y*=-1,jr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(jr.y*=-1,jr.z*=-1),g.envMapRotation.value.setFromMatrix4(gw.makeRotationFromEuler(jr)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap){g.lightMap.value=d.lightMap;const L=t._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=d.lightMapIntensity*L,n(d.lightMap,g.lightMapTransform)}d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,g.aoMapTransform))}function o(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform))}function l(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function c(g,d,x,v){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*x,g.scale.value=v*.5,d.map&&(g.map.value=d.map,n(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function u(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function p(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function f(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function h(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function m(g,d,x){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===hn&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,g.specularIntensityMapTransform))}function y(g,d){d.matcap&&(g.matcap.value=d.matcap)}function S(g,d){const x=e.get(d).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function vw(t,e,n,i){let r={},s={},o=[];const l=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,v){const b=v.program;i.uniformBlockBinding(x,b)}function u(x,v){let b=r[x.id];b===void 0&&(y(x),b=p(x),r[x.id]=b,x.addEventListener("dispose",g));const L=v.program;i.updateUBOMapping(x,L);const R=e.render.frame;s[x.id]!==R&&(h(x),s[x.id]=R)}function p(x){const v=f();x.__bindingPointIndex=v;const b=t.createBuffer(),L=x.__size,R=x.usage;return t.bindBuffer(t.UNIFORM_BUFFER,b),t.bufferData(t.UNIFORM_BUFFER,L,R),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,v,b),b}function f(){for(let x=0;x<l;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const v=r[x.id],b=x.uniforms,L=x.__cache;t.bindBuffer(t.UNIFORM_BUFFER,v);for(let R=0,A=b.length;R<A;R++){const k=Array.isArray(b[R])?b[R]:[b[R]];for(let w=0,M=k.length;w<M;w++){const B=k[w];if(m(B,R,w,L)===!0){const z=B.__offset,D=Array.isArray(B.value)?B.value:[B.value];let U=0;for(let ee=0;ee<D.length;ee++){const ae=D[ee],ne=S(ae);typeof ae=="number"||typeof ae=="boolean"?(B.__data[0]=ae,t.bufferSubData(t.UNIFORM_BUFFER,z+U,B.__data)):ae.isMatrix3?(B.__data[0]=ae.elements[0],B.__data[1]=ae.elements[1],B.__data[2]=ae.elements[2],B.__data[3]=0,B.__data[4]=ae.elements[3],B.__data[5]=ae.elements[4],B.__data[6]=ae.elements[5],B.__data[7]=0,B.__data[8]=ae.elements[6],B.__data[9]=ae.elements[7],B.__data[10]=ae.elements[8],B.__data[11]=0):(ae.toArray(B.__data,U),U+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,z,B.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function m(x,v,b,L){const R=x.value,A=v+"_"+b;if(L[A]===void 0)return typeof R=="number"||typeof R=="boolean"?L[A]=R:L[A]=R.clone(),!0;{const k=L[A];if(typeof R=="number"||typeof R=="boolean"){if(k!==R)return L[A]=R,!0}else if(k.equals(R)===!1)return k.copy(R),!0}return!1}function y(x){const v=x.uniforms;let b=0;const L=16;for(let A=0,k=v.length;A<k;A++){const w=Array.isArray(v[A])?v[A]:[v[A]];for(let M=0,B=w.length;M<B;M++){const z=w[M],D=Array.isArray(z.value)?z.value:[z.value];for(let U=0,ee=D.length;U<ee;U++){const ae=D[U],ne=S(ae),I=b%L;I!==0&&L-I<ne.boundary&&(b+=L-I),z.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=b,b+=ne.storage}}}const R=b%L;return R>0&&(b+=L-R),x.__size=b,x.__cache={},this}function S(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function g(x){const v=x.target;v.removeEventListener("dispose",g);const b=o.indexOf(v.__bindingPointIndex);o.splice(b,1),t.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function d(){for(const x in r)t.deleteBuffer(r[x]);o=[],r={},s={}}return{bind:c,update:u,dispose:d}}class yw{constructor(e={}){const{canvas:n=cy(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:l=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:u=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=o;const m=new Uint32Array(4),y=new Int32Array(4);let S=null,g=null;const d=[],x=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=oi,this._useLegacyLights=!1,this.toneMapping=Hi,this.toneMappingExposure=1;const v=this;let b=!1,L=0,R=0,A=null,k=-1,w=null;const M=new Tt,B=new Tt;let z=null;const D=new ot(0);let U=0,ee=n.width,ae=n.height,ne=1,I=null,W=null;const G=new Tt(0,0,ee,ae),fe=new Tt(0,0,ee,ae);let De=!1;const Ye=new su;let J=!1,ce=!1;const ve=new Et,ye=new V,se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function we(){return A===null?ne:1}let j=i;function et(T,H){return n.getContext(T,H)}try{const T={alpha:!0,depth:r,stencil:s,antialias:l,premultipliedAlpha:c,preserveDrawingBuffer:u,powerPreference:p,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${tu}`),n.addEventListener("webglcontextlost",O,!1),n.addEventListener("webglcontextrestored",le,!1),n.addEventListener("webglcontextcreationerror",ie,!1),j===null){const H="webgl2";if(j=et(H,T),j===null)throw et(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Q,de,he,Me,Te,Ce,qe,P,E,X,te,Z,oe,Ne,Se,ge,He,me,ke,Ve,Fe,re,Re,ze;function it(){Q=new Nb(j),Q.init(),re=new Ay(j,Q),de=new wb(j,Q,e,re),he=new cw(j),Me=new Db(j),Te=new J2,Ce=new uw(j,Q,he,Te,de,re,Me),qe=new Ab(v),P=new Pb(v),E=new jS(j),Re=new Eb(j,E),X=new Lb(j,E,Me,Re),te=new Ob(j,X,E,Me),ke=new Ub(j,de,Ce),ge=new Tb(Te),Z=new K2(v,qe,P,Q,de,Re,ge),oe=new xw(v,Te),Ne=new Q2,Se=new sw(Q),me=new Mb(v,qe,P,he,te,h,c),He=new lw(v,te,de),ze=new vw(j,Me,de,he),Ve=new bb(j,Q,Me),Fe=new Ib(j,Q,Me),Me.programs=Z.programs,v.capabilities=de,v.extensions=Q,v.properties=Te,v.renderLists=Ne,v.shadowMap=He,v.state=he,v.info=Me}it();const Le=new mw(v,j);this.xr=Le,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const T=Q.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Q.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(T){T!==void 0&&(ne=T,this.setSize(ee,ae,!1))},this.getSize=function(T){return T.set(ee,ae)},this.setSize=function(T,H,K=!0){if(Le.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ee=T,ae=H,n.width=Math.floor(T*ne),n.height=Math.floor(H*ne),K===!0&&(n.style.width=T+"px",n.style.height=H+"px"),this.setViewport(0,0,T,H)},this.getDrawingBufferSize=function(T){return T.set(ee*ne,ae*ne).floor()},this.setDrawingBufferSize=function(T,H,K){ee=T,ae=H,ne=K,n.width=Math.floor(T*K),n.height=Math.floor(H*K),this.setViewport(0,0,T,H)},this.getCurrentViewport=function(T){return T.copy(M)},this.getViewport=function(T){return T.copy(G)},this.setViewport=function(T,H,K,$){T.isVector4?G.set(T.x,T.y,T.z,T.w):G.set(T,H,K,$),he.viewport(M.copy(G).multiplyScalar(ne).round())},this.getScissor=function(T){return T.copy(fe)},this.setScissor=function(T,H,K,$){T.isVector4?fe.set(T.x,T.y,T.z,T.w):fe.set(T,H,K,$),he.scissor(B.copy(fe).multiplyScalar(ne).round())},this.getScissorTest=function(){return De},this.setScissorTest=function(T){he.setScissorTest(De=T)},this.setOpaqueSort=function(T){I=T},this.setTransparentSort=function(T){W=T},this.getClearColor=function(T){return T.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor.apply(me,arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha.apply(me,arguments)},this.clear=function(T=!0,H=!0,K=!0){let $=0;if(T){let Y=!1;if(A!==null){const Ee=A.texture.format;Y=Ee===qh||Ee===Yh||Ee===$h}if(Y){const Ee=A.texture.type,Ue=Ee===Yi||Ee===cs||Ee===Vh||Ee===yo||Ee===Wh||Ee===Xh,Oe=me.getClearColor(),Be=me.getClearAlpha(),Xe=Oe.r,We=Oe.g,Je=Oe.b;Ue?(m[0]=Xe,m[1]=We,m[2]=Je,m[3]=Be,j.clearBufferuiv(j.COLOR,0,m)):(y[0]=Xe,y[1]=We,y[2]=Je,y[3]=Be,j.clearBufferiv(j.COLOR,0,y))}else $|=j.COLOR_BUFFER_BIT}H&&($|=j.DEPTH_BUFFER_BIT),K&&($|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",O,!1),n.removeEventListener("webglcontextrestored",le,!1),n.removeEventListener("webglcontextcreationerror",ie,!1),Ne.dispose(),Se.dispose(),Te.dispose(),qe.dispose(),P.dispose(),te.dispose(),Re.dispose(),ze.dispose(),Z.dispose(),Le.dispose(),Le.removeEventListener("sessionstart",st),Le.removeEventListener("sessionend",Kt),Ut.stop()};function O(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function le(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const T=Me.autoReset,H=He.enabled,K=He.autoUpdate,$=He.needsUpdate,Y=He.type;it(),Me.autoReset=T,He.enabled=H,He.autoUpdate=K,He.needsUpdate=$,He.type=Y}function ie(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function _e(T){const H=T.target;H.removeEventListener("dispose",_e),Ae(H)}function Ae(T){Ke(T),Te.remove(T)}function Ke(T){const H=Te.get(T).programs;H!==void 0&&(H.forEach(function(K){Z.releaseProgram(K)}),T.isShaderMaterial&&Z.releaseShaderCache(T))}this.renderBufferDirect=function(T,H,K,$,Y,Ee){H===null&&(H=se);const Ue=Y.isMesh&&Y.matrixWorld.determinant()<0,Oe=Ga(T,H,K,$,Y);he.setMaterial($,Ue);let Be=K.index,Xe=1;if($.wireframe===!0){if(Be=X.getWireframeAttribute(K),Be===void 0)return;Xe=2}const We=K.drawRange,Je=K.attributes.position;let ct=We.start*Xe,Rt=(We.start+We.count)*Xe;Ee!==null&&(ct=Math.max(ct,Ee.start*Xe),Rt=Math.min(Rt,(Ee.start+Ee.count)*Xe)),Be!==null?(ct=Math.max(ct,0),Rt=Math.min(Rt,Be.count)):Je!=null&&(ct=Math.max(ct,0),Rt=Math.min(Rt,Je.count));const Pt=Rt-ct;if(Pt<0||Pt===1/0)return;Re.setup(Y,$,Oe,K,Be);let Jt,dt=Ve;if(Be!==null&&(Jt=E.get(Be),dt=Fe,dt.setIndex(Jt)),Y.isMesh)$.wireframe===!0?(he.setLineWidth($.wireframeLinewidth*we()),dt.setMode(j.LINES)):dt.setMode(j.TRIANGLES);else if(Y.isLine){let $e=$.linewidth;$e===void 0&&($e=1),he.setLineWidth($e*we()),Y.isLineSegments?dt.setMode(j.LINES):Y.isLineLoop?dt.setMode(j.LINE_LOOP):dt.setMode(j.LINE_STRIP)}else Y.isPoints?dt.setMode(j.POINTS):Y.isSprite&&dt.setMode(j.TRIANGLES);if(Y.isBatchedMesh)Y._multiDrawInstances!==null?dt.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances):dt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else if(Y.isInstancedMesh)dt.renderInstances(ct,Pt,Y.count);else if(K.isInstancedBufferGeometry){const $e=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Ir=Math.min(K.instanceCount,$e);dt.renderInstances(ct,Pt,Ir)}else dt.render(ct,Pt)};function rt(T,H,K){T.transparent===!0&&T.side===Mi&&T.forceSinglePass===!1?(T.side=hn,T.needsUpdate=!0,An(T,H,K),T.side=$i,T.needsUpdate=!0,An(T,H,K),T.side=Mi):An(T,H,K)}this.compile=function(T,H,K=null){K===null&&(K=T),g=Se.get(K),g.init(H),x.push(g),K.traverseVisible(function(Y){Y.isLight&&Y.layers.test(H.layers)&&(g.pushLight(Y),Y.castShadow&&g.pushShadow(Y))}),T!==K&&T.traverseVisible(function(Y){Y.isLight&&Y.layers.test(H.layers)&&(g.pushLight(Y),Y.castShadow&&g.pushShadow(Y))}),g.setupLights(v._useLegacyLights);const $=new Set;return T.traverse(function(Y){const Ee=Y.material;if(Ee)if(Array.isArray(Ee))for(let Ue=0;Ue<Ee.length;Ue++){const Oe=Ee[Ue];rt(Oe,K,Y),$.add(Oe)}else rt(Ee,K,Y),$.add(Ee)}),x.pop(),g=null,$},this.compileAsync=function(T,H,K=null){const $=this.compile(T,H,K);return new Promise(Y=>{function Ee(){if($.forEach(function(Ue){Te.get(Ue).currentProgram.isReady()&&$.delete(Ue)}),$.size===0){Y(T);return}setTimeout(Ee,10)}Q.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let nt=null;function yt(T){nt&&nt(T)}function st(){Ut.stop()}function Kt(){Ut.start()}const Ut=new vy;Ut.setAnimationLoop(yt),typeof self<"u"&&Ut.setContext(self),this.setAnimationLoop=function(T){nt=T,Le.setAnimationLoop(T),T===null?Ut.stop():Ut.start()},Le.addEventListener("sessionstart",st),Le.addEventListener("sessionend",Kt),this.render=function(T,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Le.enabled===!0&&Le.isPresenting===!0&&(Le.cameraAutoUpdate===!0&&Le.updateCamera(H),H=Le.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,H,A),g=Se.get(T,x.length),g.init(H),x.push(g),ve.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),Ye.setFromProjectionMatrix(ve),ce=this.localClippingEnabled,J=ge.init(this.clippingPlanes,ce),S=Ne.get(T,d.length),S.init(),d.push(S),hs(T,H,0,v.sortObjects),S.finish(),v.sortObjects===!0&&S.sort(I,W);const K=Le.enabled===!1||Le.isPresenting===!1||Le.hasDepthSensing()===!1;K&&me.addToRenderList(S,T),this.info.render.frame++,J===!0&&ge.beginShadows();const $=g.state.shadowsArray;He.render($,T,H),J===!0&&ge.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=S.opaque,Ee=S.transmissive;if(g.setupLights(v._useLegacyLights),H.isArrayCamera){const Ue=H.cameras;if(Ee.length>0)for(let Oe=0,Be=Ue.length;Oe<Be;Oe++){const Xe=Ue[Oe];ms(Y,Ee,T,Xe)}K&&me.render(T);for(let Oe=0,Be=Ue.length;Oe<Be;Oe++){const Xe=Ue[Oe];ps(S,T,Xe,Xe.viewport)}}else Ee.length>0&&ms(Y,Ee,T,H),K&&me.render(T),ps(S,T,H);A!==null&&(Ce.updateMultisampleRenderTarget(A),Ce.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(v,T,H),Re.resetDefaultState(),k=-1,w=null,x.pop(),x.length>0?(g=x[x.length-1],J===!0&&ge.setGlobalState(v.clippingPlanes,g.state.camera)):g=null,d.pop(),d.length>0?S=d[d.length-1]:S=null};function hs(T,H,K,$){if(T.visible===!1)return;if(T.layers.test(H.layers)){if(T.isGroup)K=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(H);else if(T.isLight)g.pushLight(T),T.castShadow&&g.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Ye.intersectsSprite(T)){$&&ye.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ve);const Ue=te.update(T),Oe=T.material;Oe.visible&&S.push(T,Ue,Oe,K,ye.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Ye.intersectsObject(T))){const Ue=te.update(T),Oe=T.material;if($&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ye.copy(T.boundingSphere.center)):(Ue.boundingSphere===null&&Ue.computeBoundingSphere(),ye.copy(Ue.boundingSphere.center)),ye.applyMatrix4(T.matrixWorld).applyMatrix4(ve)),Array.isArray(Oe)){const Be=Ue.groups;for(let Xe=0,We=Be.length;Xe<We;Xe++){const Je=Be[Xe],ct=Oe[Je.materialIndex];ct&&ct.visible&&S.push(T,Ue,ct,K,ye.z,Je)}}else Oe.visible&&S.push(T,Ue,Oe,K,ye.z,null)}}const Ee=T.children;for(let Ue=0,Oe=Ee.length;Ue<Oe;Ue++)hs(Ee[Ue],H,K,$)}function ps(T,H,K,$){const Y=T.opaque,Ee=T.transmissive,Ue=T.transparent;g.setupLightsView(K),J===!0&&ge.setGlobalState(v.clippingPlanes,K),$&&he.viewport(M.copy($)),Y.length>0&&Nr(Y,H,K),Ee.length>0&&Nr(Ee,H,K),Ue.length>0&&Nr(Ue,H,K),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function ms(T,H,K,$){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[$.id]===void 0&&(g.state.transmissionRenderTarget[$.id]=new Tr(1,1,{generateMipmaps:!0,type:Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float")?za:Yi,minFilter:mr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1}));const Ee=g.state.transmissionRenderTarget[$.id],Ue=$.viewport||M;Ee.setSize(Ue.z,Ue.w);const Oe=v.getRenderTarget();v.setRenderTarget(Ee),v.getClearColor(D),U=v.getClearAlpha(),U<1&&v.setClearColor(16777215,.5),v.clear();const Be=v.toneMapping;v.toneMapping=Hi;const Xe=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),g.setupLightsView($),J===!0&&ge.setGlobalState(v.clippingPlanes,$),Nr(T,K,$),Ce.updateMultisampleRenderTarget(Ee),Ce.updateRenderTargetMipmap(Ee),Q.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Je=0,ct=H.length;Je<ct;Je++){const Rt=H[Je],Pt=Rt.object,Jt=Rt.geometry,dt=Rt.material,$e=Rt.group;if(dt.side===Mi&&Pt.layers.test($.layers)){const Ir=dt.side;dt.side=hn,dt.needsUpdate=!0,Zi(Pt,K,$,Jt,dt,$e),dt.side=Ir,dt.needsUpdate=!0,We=!0}}We===!0&&(Ce.updateMultisampleRenderTarget(Ee),Ce.updateRenderTargetMipmap(Ee))}v.setRenderTarget(Oe),v.setClearColor(D,U),Xe!==void 0&&($.viewport=Xe),v.toneMapping=Be}function Nr(T,H,K){const $=H.isScene===!0?H.overrideMaterial:null;for(let Y=0,Ee=T.length;Y<Ee;Y++){const Ue=T[Y],Oe=Ue.object,Be=Ue.geometry,Xe=$===null?Ue.material:$,We=Ue.group;Oe.layers.test(K.layers)&&Zi(Oe,H,K,Be,Xe,We)}}function Zi(T,H,K,$,Y,Ee){T.onBeforeRender(v,H,K,$,Y,Ee),T.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),Y.onBeforeRender(v,H,K,$,T,Ee),Y.transparent===!0&&Y.side===Mi&&Y.forceSinglePass===!1?(Y.side=hn,Y.needsUpdate=!0,v.renderBufferDirect(K,H,$,Y,T,Ee),Y.side=$i,Y.needsUpdate=!0,v.renderBufferDirect(K,H,$,Y,T,Ee),Y.side=Mi):v.renderBufferDirect(K,H,$,Y,T,Ee),T.onAfterRender(v,H,K,$,Y,Ee)}function An(T,H,K){H.isScene!==!0&&(H=se);const $=Te.get(T),Y=g.state.lights,Ee=g.state.shadowsArray,Ue=Y.state.version,Oe=Z.getParameters(T,Y.state,Ee,H,K),Be=Z.getProgramCacheKey(Oe);let Xe=$.programs;$.environment=T.isMeshStandardMaterial?H.environment:null,$.fog=H.fog,$.envMap=(T.isMeshStandardMaterial?P:qe).get(T.envMap||$.environment),$.envMapRotation=$.environment!==null&&T.envMap===null?H.environmentRotation:T.envMapRotation,Xe===void 0&&(T.addEventListener("dispose",_e),Xe=new Map,$.programs=Xe);let We=Xe.get(Be);if(We!==void 0){if($.currentProgram===We&&$.lightsStateVersion===Ue)return To(T,Oe),We}else Oe.uniforms=Z.getUniforms(T),T.onBuild(K,Oe,v),T.onBeforeCompile(Oe,v),We=Z.acquireProgram(Oe,Be),Xe.set(Be,We),$.uniforms=Oe.uniforms;const Je=$.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Je.clippingPlanes=ge.uniform),To(T,Oe),$.needsLights=Ao(T),$.lightsStateVersion=Ue,$.needsLights&&(Je.ambientLightColor.value=Y.state.ambient,Je.lightProbe.value=Y.state.probe,Je.directionalLights.value=Y.state.directional,Je.directionalLightShadows.value=Y.state.directionalShadow,Je.spotLights.value=Y.state.spot,Je.spotLightShadows.value=Y.state.spotShadow,Je.rectAreaLights.value=Y.state.rectArea,Je.ltc_1.value=Y.state.rectAreaLTC1,Je.ltc_2.value=Y.state.rectAreaLTC2,Je.pointLights.value=Y.state.point,Je.pointLightShadows.value=Y.state.pointShadow,Je.hemisphereLights.value=Y.state.hemi,Je.directionalShadowMap.value=Y.state.directionalShadowMap,Je.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Je.spotShadowMap.value=Y.state.spotShadowMap,Je.spotLightMatrix.value=Y.state.spotLightMatrix,Je.spotLightMap.value=Y.state.spotLightMap,Je.pointShadowMap.value=Y.state.pointShadowMap,Je.pointShadowMatrix.value=Y.state.pointShadowMatrix),$.currentProgram=We,$.uniformsList=null,We}function wo(T){if(T.uniformsList===null){const H=T.currentProgram.getUniforms();T.uniformsList=rc.seqWithValue(H.seq,T.uniforms)}return T.uniformsList}function To(T,H){const K=Te.get(T);K.outputColorSpace=H.outputColorSpace,K.batching=H.batching,K.instancing=H.instancing,K.instancingColor=H.instancingColor,K.instancingMorph=H.instancingMorph,K.skinning=H.skinning,K.morphTargets=H.morphTargets,K.morphNormals=H.morphNormals,K.morphColors=H.morphColors,K.morphTargetsCount=H.morphTargetsCount,K.numClippingPlanes=H.numClippingPlanes,K.numIntersection=H.numClipIntersection,K.vertexAlphas=H.vertexAlphas,K.vertexTangents=H.vertexTangents,K.toneMapping=H.toneMapping}function Ga(T,H,K,$,Y){H.isScene!==!0&&(H=se),Ce.resetTextureUnits();const Ee=H.fog,Ue=$.isMeshStandardMaterial?H.environment:null,Oe=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Ji,Be=($.isMeshStandardMaterial?P:qe).get($.envMap||Ue),Xe=$.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,We=!!K.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Je=!!K.morphAttributes.position,ct=!!K.morphAttributes.normal,Rt=!!K.morphAttributes.color;let Pt=Hi;$.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Pt=v.toneMapping);const Jt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,dt=Jt!==void 0?Jt.length:0,$e=Te.get($),Ir=g.state.lights;if(J===!0&&(ce===!0||T!==w)){const vn=T===w&&$.id===k;ge.setState($,T,vn)}let _t=!1;$.version===$e.__version?($e.needsLights&&$e.lightsStateVersion!==Ir.state.version||$e.outputColorSpace!==Oe||Y.isBatchedMesh&&$e.batching===!1||!Y.isBatchedMesh&&$e.batching===!0||Y.isInstancedMesh&&$e.instancing===!1||!Y.isInstancedMesh&&$e.instancing===!0||Y.isSkinnedMesh&&$e.skinning===!1||!Y.isSkinnedMesh&&$e.skinning===!0||Y.isInstancedMesh&&$e.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&$e.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&$e.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&$e.instancingMorph===!1&&Y.morphTexture!==null||$e.envMap!==Be||$.fog===!0&&$e.fog!==Ee||$e.numClippingPlanes!==void 0&&($e.numClippingPlanes!==ge.numPlanes||$e.numIntersection!==ge.numIntersection)||$e.vertexAlphas!==Xe||$e.vertexTangents!==We||$e.morphTargets!==Je||$e.morphNormals!==ct||$e.morphColors!==Rt||$e.toneMapping!==Pt||$e.morphTargetsCount!==dt)&&(_t=!0):(_t=!0,$e.__version=$.version);let Jn=$e.currentProgram;_t===!0&&(Jn=An($,H,Y));let gs=!1,gi=!1,xs=!1;const zt=Jn.getUniforms(),Zn=$e.uniforms;if(he.useProgram(Jn.program)&&(gs=!0,gi=!0,xs=!0),$.id!==k&&(k=$.id,gi=!0),gs||w!==T){zt.setValue(j,"projectionMatrix",T.projectionMatrix),zt.setValue(j,"viewMatrix",T.matrixWorldInverse);const vn=zt.map.cameraPosition;vn!==void 0&&vn.setValue(j,ye.setFromMatrixPosition(T.matrixWorld)),de.logarithmicDepthBuffer&&zt.setValue(j,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&zt.setValue(j,"isOrthographic",T.isOrthographicCamera===!0),w!==T&&(w=T,gi=!0,xs=!0)}if(Y.isSkinnedMesh){zt.setOptional(j,Y,"bindMatrix"),zt.setOptional(j,Y,"bindMatrixInverse");const vn=Y.skeleton;vn&&(vn.boneTexture===null&&vn.computeBoneTexture(),zt.setValue(j,"boneTexture",vn.boneTexture,Ce))}Y.isBatchedMesh&&(zt.setOptional(j,Y,"batchingTexture"),zt.setValue(j,"batchingTexture",Y._matricesTexture,Ce));const Qn=K.morphAttributes;if((Qn.position!==void 0||Qn.normal!==void 0||Qn.color!==void 0)&&ke.update(Y,K,Jn),(gi||$e.receiveShadow!==Y.receiveShadow)&&($e.receiveShadow=Y.receiveShadow,zt.setValue(j,"receiveShadow",Y.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Zn.envMap.value=Be,Zn.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&H.environment!==null&&(Zn.envMapIntensity.value=H.environmentIntensity),gi&&(zt.setValue(j,"toneMappingExposure",v.toneMappingExposure),$e.needsLights&&Lr(Zn,xs),Ee&&$.fog===!0&&oe.refreshFogUniforms(Zn,Ee),oe.refreshMaterialUniforms(Zn,$,ne,ae,g.state.transmissionRenderTarget[T.id]),rc.upload(j,wo($e),Zn,Ce)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(rc.upload(j,wo($e),Zn,Ce),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&zt.setValue(j,"center",Y.center),zt.setValue(j,"modelViewMatrix",Y.modelViewMatrix),zt.setValue(j,"normalMatrix",Y.normalMatrix),zt.setValue(j,"modelMatrix",Y.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const vn=$.uniformsGroups;for(let Ai=0,Co=vn.length;Ai<Co;Ai++){const Ro=vn[Ai];ze.update(Ro,Jn),ze.bind(Ro,Jn)}}return Jn}function Lr(T,H){T.ambientLightColor.needsUpdate=H,T.lightProbe.needsUpdate=H,T.directionalLights.needsUpdate=H,T.directionalLightShadows.needsUpdate=H,T.pointLights.needsUpdate=H,T.pointLightShadows.needsUpdate=H,T.spotLights.needsUpdate=H,T.spotLightShadows.needsUpdate=H,T.rectAreaLights.needsUpdate=H,T.hemisphereLights.needsUpdate=H}function Ao(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,H,K){Te.get(T.texture).__webglTexture=H,Te.get(T.depthTexture).__webglTexture=K;const $=Te.get(T);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=K===void 0,$.__autoAllocateDepthBuffer||Q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,H){const K=Te.get(T);K.__webglFramebuffer=H,K.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(T,H=0,K=0){A=T,L=H,R=K;let $=!0,Y=null,Ee=!1,Ue=!1;if(T){const Be=Te.get(T);Be.__useDefaultFramebuffer!==void 0?(he.bindFramebuffer(j.FRAMEBUFFER,null),$=!1):Be.__webglFramebuffer===void 0?Ce.setupRenderTarget(T):Be.__hasExternalTextures&&Ce.rebindTextures(T,Te.get(T.texture).__webglTexture,Te.get(T.depthTexture).__webglTexture);const Xe=T.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Ue=!0);const We=Te.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(We[H])?Y=We[H][K]:Y=We[H],Ee=!0):T.samples>0&&Ce.useMultisampledRTT(T)===!1?Y=Te.get(T).__webglMultisampledFramebuffer:Array.isArray(We)?Y=We[K]:Y=We,M.copy(T.viewport),B.copy(T.scissor),z=T.scissorTest}else M.copy(G).multiplyScalar(ne).floor(),B.copy(fe).multiplyScalar(ne).floor(),z=De;if(he.bindFramebuffer(j.FRAMEBUFFER,Y)&&$&&he.drawBuffers(T,Y),he.viewport(M),he.scissor(B),he.setScissorTest(z),Ee){const Be=Te.get(T.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+H,Be.__webglTexture,K)}else if(Ue){const Be=Te.get(T.texture),Xe=H||0;j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,Be.__webglTexture,K||0,Xe)}k=-1},this.readRenderTargetPixels=function(T,H,K,$,Y,Ee,Ue){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Oe=Te.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ue!==void 0&&(Oe=Oe[Ue]),Oe){he.bindFramebuffer(j.FRAMEBUFFER,Oe);try{const Be=T.texture,Xe=Be.format,We=Be.type;if(!de.textureFormatReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!de.textureTypeReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=T.width-$&&K>=0&&K<=T.height-Y&&j.readPixels(H,K,$,Y,re.convert(Xe),re.convert(We),Ee)}finally{const Be=A!==null?Te.get(A).__webglFramebuffer:null;he.bindFramebuffer(j.FRAMEBUFFER,Be)}}},this.copyFramebufferToTexture=function(T,H,K=0){const $=Math.pow(2,-K),Y=Math.floor(H.image.width*$),Ee=Math.floor(H.image.height*$);Ce.setTexture2D(H,0),j.copyTexSubImage2D(j.TEXTURE_2D,K,0,0,T.x,T.y,Y,Ee),he.unbindTexture()},this.copyTextureToTexture=function(T,H,K,$=0){const Y=H.image.width,Ee=H.image.height,Ue=re.convert(K.format),Oe=re.convert(K.type);Ce.setTexture2D(K,0),j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,K.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,K.unpackAlignment),H.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,$,T.x,T.y,Y,Ee,Ue,Oe,H.image.data):H.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,$,T.x,T.y,H.mipmaps[0].width,H.mipmaps[0].height,Ue,H.mipmaps[0].data):j.texSubImage2D(j.TEXTURE_2D,$,T.x,T.y,Ue,Oe,H.image),$===0&&K.generateMipmaps&&j.generateMipmap(j.TEXTURE_2D),he.unbindTexture()},this.copyTextureToTexture3D=function(T,H,K,$,Y=0){const Ee=T.max.x-T.min.x,Ue=T.max.y-T.min.y,Oe=T.max.z-T.min.z,Be=re.convert($.format),Xe=re.convert($.type);let We;if($.isData3DTexture)Ce.setTexture3D($,0),We=j.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)Ce.setTexture2DArray($,0),We=j.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,$.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,$.unpackAlignment);const Je=j.getParameter(j.UNPACK_ROW_LENGTH),ct=j.getParameter(j.UNPACK_IMAGE_HEIGHT),Rt=j.getParameter(j.UNPACK_SKIP_PIXELS),Pt=j.getParameter(j.UNPACK_SKIP_ROWS),Jt=j.getParameter(j.UNPACK_SKIP_IMAGES),dt=K.isCompressedTexture?K.mipmaps[Y]:K.image;j.pixelStorei(j.UNPACK_ROW_LENGTH,dt.width),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,dt.height),j.pixelStorei(j.UNPACK_SKIP_PIXELS,T.min.x),j.pixelStorei(j.UNPACK_SKIP_ROWS,T.min.y),j.pixelStorei(j.UNPACK_SKIP_IMAGES,T.min.z),K.isDataTexture||K.isData3DTexture?j.texSubImage3D(We,Y,H.x,H.y,H.z,Ee,Ue,Oe,Be,Xe,dt.data):$.isCompressedArrayTexture?j.compressedTexSubImage3D(We,Y,H.x,H.y,H.z,Ee,Ue,Oe,Be,dt.data):j.texSubImage3D(We,Y,H.x,H.y,H.z,Ee,Ue,Oe,Be,Xe,dt),j.pixelStorei(j.UNPACK_ROW_LENGTH,Je),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,ct),j.pixelStorei(j.UNPACK_SKIP_PIXELS,Rt),j.pixelStorei(j.UNPACK_SKIP_ROWS,Pt),j.pixelStorei(j.UNPACK_SKIP_IMAGES,Jt),Y===0&&$.generateMipmaps&&j.generateMipmap(We),he.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?Ce.setTextureCube(T,0):T.isData3DTexture?Ce.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Ce.setTexture2DArray(T,0):Ce.setTexture2D(T,0),he.unbindTexture()},this.resetState=function(){L=0,R=0,A=null,he.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===iu?"display-p3":"srgb",n.unpackColorSpace=gt.workingColorSpace===Ba?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class _w extends en{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mi,this.environmentIntensity=1,this.environmentRotation=new mi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class ap extends Pr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ot(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Oc=new V,kc=new V,Cg=new Et,Go=new Ha,Il=new Mo,dd=new V,Rg=new V;class Ry extends en{constructor(e=new Kn,n=new ap){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Oc.fromBufferAttribute(n,r-1),kc.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Oc.distanceTo(kc);e.setAttribute("lineDistance",new mn(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Il.copy(i.boundingSphere),Il.applyMatrix4(r),Il.radius+=s,e.ray.intersectsSphere(Il)===!1)return;Cg.copy(r).invert(),Go.copy(e.ray).applyMatrix4(Cg);const l=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=l*l,u=this.isLineSegments?2:1,p=i.index,h=i.attributes.position;if(p!==null){const m=Math.max(0,o.start),y=Math.min(p.count,o.start+o.count);for(let S=m,g=y-1;S<g;S+=u){const d=p.getX(S),x=p.getX(S+1),v=Dl(this,e,Go,c,d,x);v&&n.push(v)}if(this.isLineLoop){const S=p.getX(y-1),g=p.getX(m),d=Dl(this,e,Go,c,S,g);d&&n.push(d)}}else{const m=Math.max(0,o.start),y=Math.min(h.count,o.start+o.count);for(let S=m,g=y-1;S<g;S+=u){const d=Dl(this,e,Go,c,S,S+1);d&&n.push(d)}if(this.isLineLoop){const S=Dl(this,e,Go,c,y-1,m);S&&n.push(S)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const l=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}}function Dl(t,e,n,i,r,s){const o=t.geometry.attributes.position;if(Oc.fromBufferAttribute(o,r),kc.fromBufferAttribute(o,s),n.distanceSqToSegment(Oc,kc,dd,Rg)>i)return;dd.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(dd);if(!(c<e.near||c>e.far))return{distance:c,point:Rg.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,object:t}}const Pg=new V,Ng=new V;class Py extends Ry{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)Pg.fromBufferAttribute(n,r),Ng.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Pg.distanceTo(Ng);e.setAttribute("lineDistance",new mn(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ny extends Pr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ot(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Lg=new Et,Vf=new Ha,Ul=new Mo,Ol=new V;class Sw extends en{constructor(e=new Kn,n=new Ny){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ul.copy(i.boundingSphere),Ul.applyMatrix4(r),Ul.radius+=s,e.ray.intersectsSphere(Ul)===!1)return;Lg.copy(r).invert(),Vf.copy(e.ray).applyMatrix4(Lg);const l=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=l*l,u=i.index,f=i.attributes.position;if(u!==null){const h=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let y=h,S=m;y<S;y++){const g=u.getX(y);Ol.fromBufferAttribute(f,g),Ig(Ol,g,c,r,e,n,this)}}else{const h=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let y=h,S=m;y<S;y++)Ol.fromBufferAttribute(f,y),Ig(Ol,y,c,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const l=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}}function Ig(t,e,n,i,r,s,o){const l=Vf.distanceSqToPoint(t);if(l<n){const c=new V;Vf.closestPointToPoint(t,c),c.applyMatrix4(i);const u=r.ray.origin.distanceTo(c);if(u<r.near||u>r.far)return;s.push({distance:u,distanceToRay:Math.sqrt(l),point:c,index:e,face:null,object:o})}}class lp extends Kn{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:l},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(o+l,Math.PI);let u=0;const p=[],f=new V,h=new V,m=[],y=[],S=[],g=[];for(let d=0;d<=i;d++){const x=[],v=d/i;let b=0;d===0&&o===0?b=.5/n:d===i&&c===Math.PI&&(b=-.5/n);for(let L=0;L<=n;L++){const R=L/n;f.x=-e*Math.cos(r+R*s)*Math.sin(o+v*l),f.y=e*Math.cos(o+v*l),f.z=e*Math.sin(r+R*s)*Math.sin(o+v*l),y.push(f.x,f.y,f.z),h.copy(f).normalize(),S.push(h.x,h.y,h.z),g.push(R+b,1-v),x.push(u++)}p.push(x)}for(let d=0;d<i;d++)for(let x=0;x<n;x++){const v=p[d][x+1],b=p[d][x],L=p[d+1][x],R=p[d+1][x+1];(d!==0||o>0)&&m.push(v,b,R),(d!==i-1||c<Math.PI)&&m.push(b,L,R)}this.setIndex(m),this.setAttribute("position",new mn(y,3)),this.setAttribute("normal",new mn(S,3)),this.setAttribute("uv",new mn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lp(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Mw extends Pr{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ot(16777215),this.specular=new ot(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kh,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mi,this.combine=nu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cp extends en{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),n}}const fd=new Et,Dg=new V,Ug=new V;class Ew{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.map=null,this.mapPass=null,this.matrix=new Et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new su,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Dg.setFromMatrixPosition(e.matrixWorld),n.position.copy(Dg),Ug.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Ug),n.updateMatrixWorld(),fd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fd),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(fd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Og=new Et,Wo=new V,hd=new V;class bw extends Ew{constructor(){super(new In(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ut(4,2),this._viewportCount=6,this._viewports=[new Tt(2,1,1,1),new Tt(0,1,1,1),new Tt(3,1,1,1),new Tt(1,1,1,1),new Tt(3,0,1,1),new Tt(1,0,1,1)],this._cubeDirections=[new V(1,0,0),new V(-1,0,0),new V(0,0,1),new V(0,0,-1),new V(0,1,0),new V(0,-1,0)],this._cubeUps=[new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,0,1),new V(0,0,-1)]}updateMatrices(e,n=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Wo.setFromMatrixPosition(e.matrixWorld),i.position.copy(Wo),hd.copy(i.position),hd.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(hd),i.updateMatrixWorld(),r.makeTranslation(-Wo.x,-Wo.y,-Wo.z),Og.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Og)}}class ww extends cp{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new bw}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Tw extends cp{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const kg=new Et;class Aw{constructor(e,n,i=0,r=1/0){this.ray=new Ha(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new ru,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return kg.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kg),this}intersectObject(e,n=!0,i=[]){return Gf(e,this,i,n),i.sort(Fg),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Gf(e[r],this,i,n);return i.sort(Fg),i}}function Fg(t,e){return t.distance-e.distance}function Gf(t,e,n,i){if(t.layers.test(e.layers)&&t.raycast(e,n),i===!0){const r=t.children;for(let s=0,o=r.length;s<o;s++)Gf(r[s],e,n,!0)}}class Cw extends Py{constructor(e=10,n=10,i=4473924,r=8947848){i=new ot(i),r=new ot(r);const s=n/2,o=e/n,l=e/2,c=[],u=[];for(let h=0,m=0,y=-l;h<=n;h++,y+=o){c.push(-l,0,y,l,0,y),c.push(y,0,-l,y,0,l);const S=h===s?i:r;S.toArray(u,m),m+=3,S.toArray(u,m),m+=3,S.toArray(u,m),m+=3,S.toArray(u,m),m+=3}const p=new Kn;p.setAttribute("position",new mn(c,3)),p.setAttribute("color",new mn(u,3));const f=new ap({vertexColors:!0,toneMapped:!1});super(p,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:tu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=tu);const Xo=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:kv,AddEquation:dr,AddOperation:Iv,AdditiveBlending:lf,AgXToneMapping:zv,AlphaFormat:Wv,AlwaysCompare:ay,AlwaysDepth:Tv,AlwaysStencilFunc:kf,AmbientLight:Tw,ArrayCamera:Cy,BackSide:hn,BasicDepthPacking:Zv,Box3:So,BoxGeometry:Eo,BufferAttribute:hi,BufferGeometry:Kn,ByteType:Hv,Camera:ip,CineonToneMapping:Ov,ClampToEdgeWrapping:pr,Color:ot,ColorManagement:gt,ConstantAlphaFactor:Ev,ConstantColorFactor:Sv,CubeCamera:gy,CubeReflectionMapping:as,CubeRefractionMapping:ls,CubeTexture:rp,CubeUVReflectionMapping:Fa,CullFaceBack:af,CullFaceFront:sv,CullFaceNone:rv,CustomBlending:av,CustomToneMapping:Fv,Data3DTexture:fy,DataArrayTexture:Qh,DepthFormat:ts,DepthStencilFormat:po,DepthTexture:op,DisplayP3ColorSpace:iu,DoubleSide:Mi,DstAlphaFactor:gv,DstColorFactor:vv,EqualCompare:iy,EqualDepth:Cv,EquirectangularReflectionMapping:Nc,EquirectangularRefractionMapping:Lc,Euler:mi,EventDispatcher:fs,Float32BufferAttribute:mn,FloatType:zi,FrontSide:$i,Frustum:su,GLSL3:zf,GreaterCompare:ry,GreaterDepth:Pv,GreaterEqualCompare:oy,GreaterEqualDepth:Rv,GridHelper:Cw,Group:Qo,HalfFloatType:za,ImageUtils:uy,IntType:Gh,KeepStencilOp:Gr,Layers:ru,LessCompare:ny,LessDepth:Av,LessEqualCompare:Jh,LessEqualDepth:Ca,Light:cp,Line:Ry,LineBasicMaterial:ap,LineSegments:Py,LinearDisplayP3ColorSpace:Ba,LinearFilter:Wn,LinearMipmapLinearFilter:mr,LinearMipmapNearestFilter:Zl,LinearSRGBColorSpace:Ji,LinearToneMapping:Dv,LinearTransfer:Ra,LuminanceAlphaFormat:Yv,LuminanceFormat:$v,Material:Pr,Matrix3:Qe,Matrix4:Et,MaxEquation:dv,Mesh:bi,MeshBasicMaterial:ep,MeshDepthMaterial:wy,MeshDistanceMaterial:Ty,MeshPhongMaterial:Mw,MinEquation:uv,MirroredRepeatWrapping:Dc,MixOperation:Lv,MultiplyBlending:uf,MultiplyOperation:nu,NearestFilter:Un,NearestMipmapLinearFilter:Jo,NearestMipmapNearestFilter:jv,NeutralToneMapping:Bv,NeverCompare:ty,NeverDepth:wv,NoBlending:ji,NoColorSpace:Oi,NoToneMapping:Hi,NormalBlending:es,NotEqualCompare:sy,NotEqualDepth:Nv,Object3D:en,ObjectSpaceNormalMap:ey,OneFactor:hv,OneMinusConstantAlphaFactor:bv,OneMinusConstantColorFactor:Mv,OneMinusDstAlphaFactor:xv,OneMinusDstColorFactor:yv,OneMinusSrcAlphaFactor:Pc,OneMinusSrcColorFactor:mv,OrthographicCamera:yy,P3Primaries:Na,PCFShadowMap:jh,PCFSoftShadowMap:ov,PMREMGenerator:jf,PerspectiveCamera:In,Plane:lr,PlaneGeometry:Va,PointLight:ww,Points:Sw,PointsMaterial:Ny,Quaternion:_o,RED_GREEN_RGTC2_Format:Uf,RED_RGTC1_Format:Jv,REVISION:tu,RGBADepthPacking:Qv,RGBAFormat:ui,RGBAIntegerFormat:qh,RGBA_ASTC_10x10_Format:Rf,RGBA_ASTC_10x5_Format:Tf,RGBA_ASTC_10x6_Format:Af,RGBA_ASTC_10x8_Format:Cf,RGBA_ASTC_12x10_Format:Pf,RGBA_ASTC_12x12_Format:Nf,RGBA_ASTC_4x4_Format:vf,RGBA_ASTC_5x4_Format:yf,RGBA_ASTC_5x5_Format:_f,RGBA_ASTC_6x5_Format:Sf,RGBA_ASTC_6x6_Format:Mf,RGBA_ASTC_8x5_Format:Ef,RGBA_ASTC_8x6_Format:bf,RGBA_ASTC_8x8_Format:wf,RGBA_BPTC_Format:ic,RGBA_ETC2_EAC_Format:xf,RGBA_PVRTC_2BPPV1_Format:pf,RGBA_PVRTC_4BPPV1_Format:hf,RGBA_S3TC_DXT1_Format:ec,RGBA_S3TC_DXT3_Format:tc,RGBA_S3TC_DXT5_Format:nc,RGBFormat:Xv,RGB_BPTC_SIGNED_Format:Lf,RGB_BPTC_UNSIGNED_Format:If,RGB_ETC1_Format:mf,RGB_ETC2_Format:gf,RGB_PVRTC_2BPPV1_Format:ff,RGB_PVRTC_4BPPV1_Format:df,RGB_S3TC_DXT1_Format:Ql,RGFormat:Kv,RGIntegerFormat:Yh,Ray:Ha,Raycaster:Aw,Rec709Primaries:Pa,RedFormat:qv,RedIntegerFormat:$h,ReinhardToneMapping:Uv,RenderTarget:dy,RepeatWrapping:Ic,ReverseSubtractEquation:cv,SIGNED_RED_GREEN_RGTC2_Format:Of,SIGNED_RED_RGTC1_Format:Df,SRGBColorSpace:oi,SRGBTransfer:St,Scene:_w,ShaderChunk:Ze,ShaderLib:li,ShaderMaterial:qi,ShortType:Vv,Source:Zh,Sphere:Mo,SphereGeometry:lp,SrcAlphaFactor:Rc,SrcAlphaSaturateFactor:_v,SrcColorFactor:pv,StaticDrawUsage:Ff,SubtractEquation:lv,SubtractiveBlending:cf,TangentSpaceNormalMap:Kh,Texture:pn,Triangle:ci,UVMapping:Hh,Uint16BufferAttribute:tp,Uint32BufferAttribute:np,UniformsLib:be,UniformsUtils:my,UnsignedByteType:Yi,UnsignedInt248Type:yo,UnsignedInt5999Type:Gv,UnsignedIntType:cs,UnsignedShort4444Type:Wh,UnsignedShort5551Type:Xh,UnsignedShortType:Vh,VSMShadowMap:yi,Vector2:ut,Vector3:V,Vector4:Tt,WebGLCoordinateSystem:Ei,WebGLCubeRenderTarget:xy,WebGLRenderTarget:Tr,WebGLRenderer:yw,WebGLUtils:Ay,WebGPUCoordinateSystem:La,ZeroFactor:fv,createCanvasElement:cy},Symbol.toStringTag,{value:"Module"})),{useState:ue,useEffect:Nt,useRef:lt,useCallback:_i,useMemo:Rw}=e0,ca=window.FORBIDDEN_API_URL||"http://localhost:3001";function ua(){var t;if((t=window.crypto)!=null&&t.randomUUID)return window.crypto.randomUUID()}function zg(t){return Array.isArray(t)?t:Array.isArray(t==null?void 0:t.nodes)?t.nodes:[]}function Pw(t,e){const n=t.trim().replace(/[^\w\s-]/g,"").replace(/[\s-]+/g,"_").replace(/^_+|_+$/g,"");if(!n)return null;const i=n.split("_").filter(Boolean).map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join("")||"Untitled";let r=`def ${n}():
    pass`;return e==="entry"?r=`def main():
    pass


if __name__ == "__main__":
    main()`:e==="class"?r=`class ${i}:
    def __init__(self):
        pass`:e==="hook"?r=`def ${n}():
    result = []
    return result`:(e==="util"||e==="helper")&&(r=`def ${n}(*args, **kwargs):
    return None`),{slug:n,label:`${n}.py`,language:"python",code:r}}async function Ot(t,e={},n=null){const i=await fetch(`${ca}${t}`,{...e,headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...e.headers||{}}});if(!i.ok){const r=await i.json().catch(()=>({error:i.statusText}));throw Object.assign(new Error(r.error||i.statusText),{status:i.status})}return i.json()}const Bg=[({size:t=48,accent:e="#10b981"})=>a.jsxs("svg",{width:t,height:t,viewBox:"0 0 48 48",fill:"none",children:[a.jsx("rect",{width:"48",height:"48",fill:"#010d07"}),a.jsx("circle",{cx:"24",cy:"24",r:"21",stroke:e,strokeWidth:"0.35",opacity:"0.2"}),[15,35,55,75,95,115,135,155,175,195,215,235,255,275,295,315,335].map(n=>a.jsx("line",{x1:"24",y1:"6",x2:"24",y2:"9",stroke:e,strokeWidth:"0.8",opacity:"0.35",transform:`rotate(${n} 24 24)`},n)),a.jsx("path",{d:"M 21.5 7.5 A 16.5 16.5 0 1 1 26.5 7.5",stroke:e,strokeWidth:"4.8",strokeLinecap:"butt"}),a.jsx("path",{d:"M 21.5 7.5 A 16.5 16.5 0 1 1 26.5 7.5",stroke:"#010d07",strokeWidth:"1.5",strokeLinecap:"butt",strokeDasharray:"3.5 3.5",opacity:"0.55"}),a.jsx("path",{d:"M 21.5 7.5 L 17 4 L 20 6.5",stroke:e,strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round"}),a.jsx("path",{d:"M 26.5 7.5 L 31 3.5 L 35.5 6 L 33 11 L 26.5 7.5",fill:e,stroke:e,strokeWidth:"0.5"}),a.jsx("circle",{cx:"31.5",cy:"5.5",r:"1",fill:"#010d07"}),a.jsx("circle",{cx:"31.5",cy:"5.5",r:"0.45",fill:e,opacity:"0.5"}),a.jsx("path",{d:"M 35.5 6.5 L 39 4.5 M 35.5 6.5 L 39 8.5",stroke:e,strokeWidth:"0.75",strokeLinecap:"round"}),a.jsx("circle",{cx:"24",cy:"24",r:"6.5",stroke:e,strokeWidth:"0.7",opacity:"0.3"}),a.jsx("circle",{cx:"24",cy:"24",r:"2.2",fill:e,opacity:"0.6"}),a.jsx("line",{x1:"24",y1:"17",x2:"24",y2:"31",stroke:e,strokeWidth:"0.45",opacity:"0.2"}),a.jsx("line",{x1:"17",y1:"24",x2:"31",y2:"24",stroke:e,strokeWidth:"0.45",opacity:"0.2"})]}),({size:t=48,accent:e="#ff435a"})=>a.jsxs("svg",{width:t,height:t,viewBox:"0 0 48 48",fill:"none",children:[a.jsx("rect",{width:"48",height:"48",fill:"#0d0002"}),a.jsx("circle",{cx:"24",cy:"24",r:"21",stroke:e,strokeWidth:"0.5",opacity:"0.2"}),a.jsx("circle",{cx:"24",cy:"24",r:"2.5",fill:e,opacity:"0.8"}),[0,120,240].map(n=>a.jsx("g",{transform:`rotate(${n} 24 24)`,children:a.jsx("path",{d:"M 24 24 C 28 22 32 18 30 13 C 28 8 22 7 18 10 C 14 13 13 18 15 22",stroke:e,strokeWidth:"2.2",fill:"none",strokeLinecap:"round"})},n)),[90,210,330].map(n=>a.jsx("line",{x1:24+18.5*Math.cos(n*Math.PI/180),y1:24+18.5*Math.sin(n*Math.PI/180),x2:24+21*Math.cos(n*Math.PI/180),y2:24+21*Math.sin(n*Math.PI/180),stroke:e,strokeWidth:"1.2",opacity:"0.45"},n))]}),({size:t=48,accent:e="#ffc410"})=>a.jsxs("svg",{width:t,height:t,viewBox:"0 0 48 48",fill:"none",children:[a.jsx("rect",{width:"48",height:"48",fill:"#0b0700"}),a.jsx("circle",{cx:"24",cy:"24",r:"21",stroke:e,strokeWidth:"0.4",opacity:"0.2"}),a.jsx("circle",{cx:"24",cy:"24",r:"3.5",stroke:e,strokeWidth:"1.3",opacity:"0.9"}),a.jsx("circle",{cx:"24",cy:"24",r:"1.4",fill:e,opacity:"0.85"}),[0,45,90,135,180,225,270,315].map(n=>a.jsxs("g",{transform:`rotate(${n} 24 24)`,children:[a.jsx("line",{x1:"24",y1:"20.5",x2:"24",y2:"5.5",stroke:e,strokeWidth:"1.8",strokeLinecap:"round"}),a.jsx("circle",{cx:"20",cy:"5",r:"1",fill:e,opacity:"0.8"}),a.jsx("circle",{cx:"28",cy:"5",r:"1",fill:e,opacity:"0.8"})]},n))]}),({size:t=48,accent:e="#4285f4"})=>a.jsxs("svg",{width:t,height:t,viewBox:"0 0 48 48",fill:"none",children:[a.jsx("rect",{width:"48",height:"48",fill:"#00040f"}),a.jsx("circle",{cx:"24",cy:"24",r:"21.5",stroke:e,strokeWidth:"0.5",opacity:"0.2"}),a.jsx("path",{d:"M 10 18 Q 14 18 16 16 Q 18 14 18 10",stroke:e,strokeWidth:"2.8",fill:"none",strokeLinecap:"round"}),a.jsx("path",{d:"M 30 10 Q 30 14 32 16 Q 34 18 38 18",stroke:e,strokeWidth:"2.8",fill:"none",strokeLinecap:"round"}),a.jsx("path",{d:"M 38 30 Q 34 30 32 32 Q 30 34 30 38",stroke:e,strokeWidth:"2.8",fill:"none",strokeLinecap:"round"}),a.jsx("path",{d:"M 18 38 Q 18 34 16 32 Q 14 30 10 30",stroke:e,strokeWidth:"2.8",fill:"none",strokeLinecap:"round"}),a.jsx("path",{d:"M 10 18 Q 10 24 10 30",stroke:e,strokeWidth:"2.8",fill:"none",strokeLinecap:"round"}),a.jsx("path",{d:"M 38 18 Q 38 24 38 30",stroke:e,strokeWidth:"2.8",fill:"none",strokeLinecap:"round"}),a.jsx("path",{d:"M 18 10 Q 24 10 30 10",stroke:e,strokeWidth:"2.8",fill:"none",strokeLinecap:"round"}),a.jsx("path",{d:"M 18 38 Q 24 38 30 38",stroke:e,strokeWidth:"2.8",fill:"none",strokeLinecap:"round"}),a.jsx("circle",{cx:"24",cy:"24",r:"3",stroke:e,strokeWidth:"1",opacity:"0.6",fill:"none"}),a.jsx("circle",{cx:"24",cy:"24",r:"1.2",fill:e,opacity:"0.8"})]}),({size:t=48,accent:e="#28f1c3"})=>a.jsxs("svg",{width:t,height:t,viewBox:"0 0 48 48",fill:"none",children:[a.jsx("rect",{width:"48",height:"48",fill:"#000f0c"}),a.jsx("circle",{cx:"24",cy:"24",r:"21",stroke:e,strokeWidth:"0.4",opacity:"0.18"}),a.jsx("line",{x1:"10",y1:"34.5",x2:"38",y2:"34.5",stroke:e,strokeWidth:"1.2",opacity:"0.5",strokeLinecap:"round"}),a.jsx("path",{d:"M 17 34 A 9 9 0 0 1 31 34 A 9 9 0 0 1 24 21 A 9 9 0 0 1 17 34 Z",stroke:e,strokeWidth:"2.5",fill:"none",strokeLinejoin:"round"}),a.jsx("circle",{cx:"24",cy:"24",r:"1.5",fill:e,opacity:"0.85"})]}),({size:t=48,accent:e="#ff1650"})=>{const n=Array.from({length:6},(i,r)=>{const s=(r*60-30)*Math.PI/180;return[+(24+15*Math.cos(s)).toFixed(2),+(24+15*Math.sin(s)).toFixed(2)]});return a.jsxs("svg",{width:t,height:t,viewBox:"0 0 48 48",fill:"none",children:[a.jsx("rect",{width:"48",height:"48",fill:"#0f0003"}),a.jsx("polygon",{points:n.map(i=>i.join(",")).join(" "),stroke:e,strokeWidth:"1.5",fill:e,fillOpacity:"0.06"}),n.map(([i,r],s)=>a.jsx("circle",{cx:i,cy:r,r:"7.5",stroke:e,strokeWidth:"1",fill:"none",opacity:"0.55"},s)),a.jsx("circle",{cx:"24",cy:"24",r:"1.8",fill:e,opacity:"0.9"})]})}],vt=["#10b981","#ff435a","#ffc410","#4285f4","#28f1c3","#ff1650","#bb9af7","#5ccfe6","#ffbd5e","#e36209","#72f1b8","#ff8080","#89ddff","#e5c07b","#4ec9b0","#c792ea"],Ly=["OUROBOROS","TRISKELION","HELM OF AWE","CELTIC KNOT","TRIQUETRA","HEXAGON"],Xr=({index:t,size:e=48,selected:n=!1,onClick:i})=>{const r=Bg[t%Bg.length],s=vt[t%vt.length];return a.jsxs("div",{onClick:i,style:{cursor:i?"pointer":"default",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"},children:[a.jsx("div",{style:{width:e,height:e,border:n?`2px solid ${s}`:"2px solid rgba(255,255,255,0.08)",boxShadow:n?`0 0 16px ${s}44`:"none",transition:"all 0.2s ease",borderRadius:"4px",overflow:"hidden",flexShrink:0},children:a.jsx(r,{size:e,accent:s})}),n&&a.jsx("div",{style:{fontSize:"8px",color:s,letterSpacing:"1px",fontFamily:"'JetBrains Mono',monospace"},children:Ly[t]})]})},Ht={Files:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}),a.jsx("path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"})]}),Search:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"11",cy:"11",r:"8"}),a.jsx("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),Git:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"18",cy:"18",r:"3"}),a.jsx("circle",{cx:"6",cy:"6",r:"3"}),a.jsx("path",{d:"M6 9v12"}),a.jsx("path",{d:"M18 15v-2a3 3 0 0 0-3-3H9"})]}),Terminal:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("polyline",{points:"4 17 10 11 4 5"}),a.jsx("line",{x1:"12",y1:"19",x2:"20",y2:"19"})]}),Timeline:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),a.jsx("line",{x1:"3",y1:"9",x2:"21",y2:"9"}),a.jsx("line",{x1:"9",y1:"21",x2:"9",y2:"9"})]}),Message:()=>a.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:a.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})}),Note:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),a.jsx("polyline",{points:"14 2 14 8 20 8"}),a.jsx("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),a.jsx("line",{x1:"16",y1:"17",x2:"8",y2:"17"})]}),Board:()=>a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),a.jsx("line",{x1:"9",y1:"3",x2:"9",y2:"21"}),a.jsx("line",{x1:"15",y1:"3",x2:"15",y2:"21"})]}),FileIcon:()=>a.jsxs("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("path",{d:"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}),a.jsx("polyline",{points:"13 2 13 9 20 9"})]}),Copy:()=>a.jsxs("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2"}),a.jsx("path",{d:"M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"})]}),Wrap:()=>a.jsxs("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("polyline",{points:"17 1 21 5 17 9"}),a.jsx("path",{d:"M3 11V9a4 4 0 014-4h14"}),a.jsx("polyline",{points:"7 23 3 19 7 15"}),a.jsx("path",{d:"M21 13v2a4 4 0 01-4 4H3"})]}),Format:()=>a.jsxs("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("line",{x1:"21",y1:"6",x2:"3",y2:"6"}),a.jsx("line",{x1:"15",y1:"12",x2:"3",y2:"12"}),a.jsx("line",{x1:"17",y1:"18",x2:"3",y2:"18"})]}),Diff:()=>a.jsxs("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),a.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]}),Cmd:()=>a.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:a.jsx("path",{d:"M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"})}),Plus:()=>a.jsxs("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[a.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),a.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]}),Zap:()=>a.jsx("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:a.jsx("polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"})})};function Wf(t){const e=/\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|True|False|None|pass|break|continue|try|except|finally|with|as|yield|lambda|self|print|raise|del|global|nonlocal|assert|async|await)\b/g,n=/\b(function|const|let|var|return|if|else|for|while|in|of|class|import|export|from|default|new|this|true|false|null|undefined|try|catch|finally|async|await|typeof|instanceof|break|continue|switch|case|throw)\b/g,i=/\b(len|range|print|type|str|int|float|list|dict|set|tuple|map|filter|zip|enumerate|open|super|object|bool|abs|max|min|sum|sorted|reversed|console|Math|JSON|Array|Object|Promise|setTimeout|parseInt|parseFloat)\b/g,r=/("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`)/g,s=/(#.*$|\/\/.*$|\/\*[\s\S]*?\*\/)/gm,o=/\b(\d+\.?\d*(?:[eE][+-]?\d+)?)\b/g,l=/\b([a-zA-Z_]\w*)\s*(?=\()/g;let c=t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");const u=[],p="\0",f="";return c=c.replace(s,h=>(u.push(`<span class="syn-comment">${h}</span>`),p+(u.length-1)+f)),c=c.replace(r,h=>(u.push(`<span class="syn-string">${h}</span>`),p+(u.length-1)+f)),c=c.replace(l,(h,m)=>(u.push(`<span class="syn-function">${m}</span>`),p+(u.length-1)+f+"(")),c=c.replace(e,'<span class="syn-keyword">$&</span>'),c=c.replace(n,'<span class="syn-keyword">$&</span>'),c=c.replace(i,'<span class="syn-builtin">$&</span>'),c=c.replace(o,'<span class="syn-number">$&</span>'),c=c.replace(/\x00(\d+)\x01/g,(h,m)=>u[parseInt(m)]),c}const so=[{id:"forbidden",name:"FORBIDDEN",bg:"#0b0b0f",base:"#c0c8d8",lineNum:"#2e2e42",activeLine:"rgba(255,255,255,0.035)",kw:"#ff435a",str:"#ffc410",cmt:"#3e3e5a",num:"#4285f4",fn:"#10b981",bi:"#28f1c3",op:"#6a6a8a",swatches:["#ff435a","#ffc410","#10b981","#28f1c3"]},{id:"dracula",name:"DRACULA",bg:"#282a36",base:"#f8f8f2",lineNum:"#44475a",activeLine:"rgba(68,71,90,0.4)",kw:"#ff79c6",str:"#f1fa8c",cmt:"#6272a4",num:"#bd93f9",fn:"#50fa7b",bi:"#8be9fd",op:"#ff79c6",swatches:["#ff79c6","#f1fa8c","#50fa7b","#8be9fd"]},{id:"monokai",name:"MONOKAI",bg:"#272822",base:"#f8f8f2",lineNum:"#3e3d32",activeLine:"rgba(73,72,62,0.4)",kw:"#f92672",str:"#e6db74",cmt:"#75715e",num:"#ae81ff",fn:"#a6e22e",bi:"#66d9e8",op:"#f92672",swatches:["#f92672","#e6db74","#a6e22e","#ae81ff"]},{id:"nord",name:"NORD",bg:"#2e3440",base:"#d8dee9",lineNum:"#3b4252",activeLine:"rgba(67,76,94,0.4)",kw:"#81a1c1",str:"#a3be8c",cmt:"#4c566a",num:"#b48ead",fn:"#88c0d0",bi:"#8fbcbb",op:"#81a1c1",swatches:["#81a1c1","#a3be8c","#88c0d0","#b48ead"]},{id:"tokyo",name:"TOKYO NIGHT",bg:"#1a1b2e",base:"#a9b1d6",lineNum:"#2a2b3d",activeLine:"rgba(42,43,61,0.5)",kw:"#bb9af7",str:"#9ece6a",cmt:"#3b4261",num:"#ff9e64",fn:"#7dcfff",bi:"#2ac3de",op:"#c0caf5",swatches:["#bb9af7","#9ece6a","#7dcfff","#ff9e64"]},{id:"gruvbox",name:"GRUVBOX",bg:"#282828",base:"#ebdbb2",lineNum:"#3c3836",activeLine:"rgba(60,56,54,0.5)",kw:"#fb4934",str:"#b8bb26",cmt:"#665c54",num:"#d3869b",fn:"#fabd2f",bi:"#8ec07c",op:"#fe8019",swatches:["#fb4934","#b8bb26","#fabd2f","#8ec07c"]},{id:"onedark",name:"ONE DARK",bg:"#282c34",base:"#abb2bf",lineNum:"#3b4048",activeLine:"rgba(40,44,52,0.6)",kw:"#c678dd",str:"#98c379",cmt:"#5c6370",num:"#d19a66",fn:"#61afef",bi:"#56b6c2",op:"#e06c75",swatches:["#c678dd","#98c379","#61afef","#d19a66"]},{id:"solarized",name:"SOLARIZED",bg:"#002b36",base:"#839496",lineNum:"#073642",activeLine:"rgba(7,54,66,0.6)",kw:"#859900",str:"#2aa198",cmt:"#586e75",num:"#d33682",fn:"#268bd2",bi:"#cb4b16",op:"#657b83",swatches:["#859900","#2aa198","#268bd2","#d33682"]},{id:"nightowl",name:"NIGHT OWL",bg:"#011627",base:"#d6deeb",lineNum:"#1d3b53",activeLine:"rgba(1,56,95,0.45)",kw:"#c792ea",str:"#addb67",cmt:"#637777",num:"#f78c6c",fn:"#82aaff",bi:"#7fdbca",op:"#c792ea",swatches:["#c792ea","#addb67","#82aaff","#7fdbca"]},{id:"ayu",name:"AYU MIRAGE",bg:"#1f2430",base:"#cccac2",lineNum:"#2d3443",activeLine:"rgba(45,52,67,0.5)",kw:"#ffa759",str:"#bae67e",cmt:"#5c6773",num:"#ffcc66",fn:"#5ccfe6",bi:"#73d0ff",op:"#f29e74",swatches:["#ffa759","#bae67e","#5ccfe6","#ffcc66"]},{id:"catppuccin",name:"CATPPUCCIN",bg:"#1e1e2e",base:"#cdd6f4",lineNum:"#313244",activeLine:"rgba(49,50,68,0.5)",kw:"#cba6f7",str:"#a6e3a1",cmt:"#585b70",num:"#fab387",fn:"#89b4fa",bi:"#94e2d5",op:"#f38ba8",swatches:["#cba6f7","#a6e3a1","#89b4fa","#fab387"]},{id:"rosepine",name:"ROSÉ PINE",bg:"#191724",base:"#e0def4",lineNum:"#26233a",activeLine:"rgba(38,35,58,0.5)",kw:"#c4a7e7",str:"#f6c177",cmt:"#6e6a86",num:"#ebbcba",fn:"#9ccfd8",bi:"#31748f",op:"#eb6f92",swatches:["#c4a7e7","#f6c177","#9ccfd8","#eb6f92"]},{id:"poimandres",name:"POIMANDRES",bg:"#1b1e28",base:"#a6accd",lineNum:"#252834",activeLine:"rgba(37,40,52,0.5)",kw:"#5de4c7",str:"#5fb3a1",cmt:"#3d4066",num:"#d0679d",fn:"#e4f0fb",bi:"#89ddff",op:"#add7ff",swatches:["#5de4c7","#d0679d","#e4f0fb","#89ddff"]},{id:"kanagawa",name:"KANAGAWA",bg:"#1f1f28",base:"#dcd7ba",lineNum:"#2a2a37",activeLine:"rgba(42,42,55,0.5)",kw:"#957fb8",str:"#98bb6c",cmt:"#727169",num:"#d27e99",fn:"#7e9cd8",bi:"#6a9589",op:"#c0a36e",swatches:["#957fb8","#98bb6c","#7e9cd8","#c0a36e"]},{id:"vesper",name:"VESPER",bg:"#101010",base:"#c2c2c2",lineNum:"#1e1e1e",activeLine:"rgba(30,30,30,0.6)",kw:"#ff8080",str:"#99ffe4",cmt:"#404040",num:"#ffbd5e",fn:"#b8a4ff",bi:"#5ef1ff",op:"#ff6e6e",swatches:["#ff8080","#99ffe4","#b8a4ff","#ffbd5e"]},{id:"everforest",name:"EVERFOREST",bg:"#272e33",base:"#d3c6aa",lineNum:"#333c43",activeLine:"rgba(51,60,67,0.5)",kw:"#e67e80",str:"#a7c080",cmt:"#5b6770",num:"#dbbc7f",fn:"#7fbbb3",bi:"#83c092",op:"#d699b6",swatches:["#e67e80","#a7c080","#7fbbb3","#dbbc7f"]},{id:"oxocarbon",name:"OXOCARBON",bg:"#161616",base:"#f2f4f8",lineNum:"#262626",activeLine:"rgba(38,38,38,0.55)",kw:"#ff7eb6",str:"#42be65",cmt:"#393939",num:"#82cfff",fn:"#ee5396",bi:"#3ddbd9",op:"#be95ff",swatches:["#ff7eb6","#42be65","#ee5396","#82cfff"]},{id:"palenight",name:"PALENIGHT",bg:"#292d3e",base:"#a6accd",lineNum:"#32374d",activeLine:"rgba(50,55,77,0.5)",kw:"#c792ea",str:"#c3e88d",cmt:"#676e95",num:"#f07178",fn:"#82aaff",bi:"#89ddff",op:"#ffcb6b",swatches:["#c792ea","#c3e88d","#82aaff","#f07178"]},{id:"synthwave",name:"SYNTHWAVE 84",bg:"#262335",base:"#ffffff",lineNum:"#34294f",activeLine:"rgba(52,41,79,0.5)",kw:"#ff7edb",str:"#ff8b39",cmt:"#848bbd",num:"#f97e72",fn:"#36f9f6",bi:"#72f1b8",op:"#fe4450",swatches:["#ff7edb","#36f9f6","#72f1b8","#fe4450"]},{id:"moonlight",name:"MOONLIGHT",bg:"#212337",base:"#c8d3f5",lineNum:"#2f334d",activeLine:"rgba(47,51,77,0.5)",kw:"#ff98a4",str:"#c3e88d",cmt:"#444a73",num:"#ff995e",fn:"#82aaff",bi:"#b4f9f8",op:"#c099ff",swatches:["#ff98a4","#c3e88d","#82aaff","#c099ff"]},{id:"github",name:"GITHUB LIGHT",bg:"#ffffff",base:"#24292e",lineNum:"#e1e4e8",activeLine:"rgba(225,228,232,0.5)",kw:"#d73a49",str:"#032f62",cmt:"#6a737d",num:"#005cc5",fn:"#6f42c1",bi:"#e36209",op:"#d73a49",swatches:["#d73a49","#032f62","#6f42c1","#005cc5"]},{id:"gruvlight",name:"GRUVBOX LIGHT",bg:"#fbf1c7",base:"#3c3836",lineNum:"#d5c4a1",activeLine:"rgba(213,196,161,0.5)",kw:"#9d0006",str:"#79740e",cmt:"#928374",num:"#8f3f71",fn:"#b57614",bi:"#076678",op:"#af3a03",swatches:["#9d0006","#79740e","#b57614","#076678"]},{id:"papercolor",name:"PAPERCOLOR",bg:"#eeeeee",base:"#444444",lineNum:"#d0d0d0",activeLine:"rgba(208,208,208,0.5)",kw:"#005f87",str:"#718c00",cmt:"#a8a8a8",num:"#8700af",fn:"#d75f00",bi:"#0087af",op:"#d70000",swatches:["#005f87","#718c00","#d75f00","#8700af"]},{id:"flexoki",name:"FLEXOKI",bg:"#fffcf0",base:"#100f0f",lineNum:"#e6e4d9",activeLine:"rgba(230,228,217,0.5)",kw:"#af3029",str:"#66800b",cmt:"#b7b5ac",num:"#8b7ec8",fn:"#205ea6",bi:"#24837b",op:"#bc5215",swatches:["#af3029","#66800b","#205ea6","#24837b"]}],jg=[{id:"matrix",name:"MATRIX",bg:"#020c02",text:"#00ff41",prompt:"#00cc33",dim:"#005c17",error:"#ff435a",warn:"#ffc410",info:"#00ff41",border:"#005c17",cursor:"#00ff41",selection:"rgba(0,255,65,0.2)"},{id:"forbidden",name:"FORBIDDEN",bg:"#080810",text:"#c0c8d8",prompt:"#10b981",dim:"#3e3e5a",error:"#ff435a",warn:"#ffc410",info:"#28f1c3",border:"#1a1a2c",cursor:"#10b981",selection:"rgba(16,185,129,0.15)"},{id:"dracula",name:"DRACULA",bg:"#282a36",text:"#f8f8f2",prompt:"#50fa7b",dim:"#6272a4",error:"#ff5555",warn:"#f1fa8c",info:"#8be9fd",border:"#44475a",cursor:"#f8f8f2",selection:"rgba(68,71,90,0.5)"},{id:"tokyo",name:"TOKYO NIGHT",bg:"#1a1b2e",text:"#a9b1d6",prompt:"#7dcfff",dim:"#3b4261",error:"#f7768e",warn:"#ff9e64",info:"#2ac3de",border:"#2a2b3d",cursor:"#7dcfff",selection:"rgba(42,43,61,0.6)"},{id:"nord",name:"NORD",bg:"#2e3440",text:"#d8dee9",prompt:"#88c0d0",dim:"#4c566a",error:"#bf616a",warn:"#ebcb8b",info:"#81a1c1",border:"#3b4252",cursor:"#88c0d0",selection:"rgba(67,76,94,0.5)"},{id:"synthwave",name:"SYNTHWAVE",bg:"#1a1030",text:"#ff7edb",prompt:"#36f9f6",dim:"#5c5080",error:"#fe4450",warn:"#ff8b39",info:"#72f1b8",border:"#34294f",cursor:"#36f9f6",selection:"rgba(54,249,246,0.1)"},{id:"gruvbox",name:"GRUVBOX",bg:"#1d2021",text:"#ebdbb2",prompt:"#fabd2f",dim:"#504945",error:"#cc241d",warn:"#d79921",info:"#689d6a",border:"#3c3836",cursor:"#fabd2f",selection:"rgba(250,189,47,0.12)"},{id:"catppuccin",name:"CATPPUCCIN",bg:"#1e1e2e",text:"#cdd6f4",prompt:"#a6e3a1",dim:"#585b70",error:"#f38ba8",warn:"#fab387",info:"#89dceb",border:"#313244",cursor:"#a6e3a1",selection:"rgba(166,227,161,0.1)"},{id:"kanagawa",name:"KANAGAWA",bg:"#1f1f28",text:"#dcd7ba",prompt:"#7e9cd8",dim:"#727169",error:"#e82424",warn:"#ff9e3b",info:"#6a9589",border:"#2a2a37",cursor:"#7e9cd8",selection:"rgba(126,156,216,0.12)"},{id:"rosepine",name:"ROSÉ PINE",bg:"#191724",text:"#e0def4",prompt:"#9ccfd8",dim:"#6e6a86",error:"#eb6f92",warn:"#f6c177",info:"#31748f",border:"#26233a",cursor:"#9ccfd8",selection:"rgba(156,207,216,0.1)"},{id:"hacker",name:"HACKER",bg:"#000000",text:"#39ff14",prompt:"#39ff14",dim:"#1a5c09",error:"#ff073a",warn:"#ffe600",info:"#00ffff",border:"#0d3305",cursor:"#39ff14",selection:"rgba(57,255,20,0.15)"},{id:"amber",name:"AMBER",bg:"#0d0800",text:"#ffb000",prompt:"#ffd700",dim:"#5c3d00",error:"#ff4500",warn:"#ffc400",info:"#ffb000",border:"#2a1a00",cursor:"#ffd700",selection:"rgba(255,176,0,0.15)"},{id:"iceberg",name:"ICEBERG",bg:"#161821",text:"#c6c8d1",prompt:"#84a0c6",dim:"#444b71",error:"#e27878",warn:"#e2a478",info:"#89b8c2",border:"#2c2f45",cursor:"#84a0c6",selection:"rgba(132,160,198,0.15)"},{id:"monokai",name:"MONOKAI",bg:"#272822",text:"#f8f8f2",prompt:"#a6e22e",dim:"#75715e",error:"#f92672",warn:"#e6db74",info:"#66d9e8",border:"#3e3d32",cursor:"#a6e22e",selection:"rgba(166,226,46,0.1)"},{id:"classic",name:"CLASSIC",bg:"#0c0c0c",text:"#cccccc",prompt:"#ffffff",dim:"#666666",error:"#c50f1f",warn:"#c19c00",info:"#3b78ff",border:"#333333",cursor:"#ffffff",selection:"rgba(255,255,255,0.1)"},{id:"solarized",name:"SOLARIZED",bg:"#002b36",text:"#839496",prompt:"#268bd2",dim:"#586e75",error:"#dc322f",warn:"#b58900",info:"#2aa198",border:"#073642",cursor:"#268bd2",selection:"rgba(38,139,210,0.1)"}];let kl=null;function Nw(){return kl||(kl=new Promise(t=>{if(window.monaco){t(window.monaco);return}const e=document.createElement("script");e.src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js",e.onload=()=>{window.require.config({paths:{vs:"https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs"}}),window.require(["vs/editor/editor.main"],()=>t(window.monaco))},document.head.appendChild(e)}),kl)}function Hg(t){return{base:t.bg.startsWith("#f")||t.bg.startsWith("#FF")||t.bg.startsWith("#FE")||parseInt(t.bg.slice(1,3),16)>200?"vs":"vs-dark",inherit:!0,rules:[{token:"keyword",foreground:t.kw.replace("#","")},{token:"string",foreground:t.str.replace("#","")},{token:"comment",foreground:t.cmt.replace("#","")},{token:"number",foreground:t.num.replace("#","")}],colors:{"editor.background":t.bg,"editor.foreground":t.base,"editorLineNumber.foreground":t.lineNum,"editorLineNumber.activeForeground":t.base,"editor.lineHighlightBackground":t.activeLine,"editorCursor.foreground":t.fn,"editor.selectionBackground":t.fn+"33"}}}function Fc(t=""){const e=(t.split(".").pop()||"").toLowerCase();return{py:"python",js:"javascript",ts:"typescript",jsx:"javascript",tsx:"typescript",rs:"rust",go:"go",java:"java",cpp:"cpp",c:"c",cs:"csharp",rb:"ruby",html:"html",css:"css",json:"json",md:"markdown",sh:"shell",yaml:"yaml",yml:"yaml",sql:"sql"}[e]||"plaintext"}function Lw({node:t,onChange:e,externalPalette:n,onRun:i,execOutput:r,execStatus:s,ydoc:o,awareness:l}){const[c,u]=ue(so[0]);Nt(()=>{n&&u(n)},[n==null?void 0:n.id]);const[p,f]=ue(!1),[h,m]=ue(!1),[y,S]=ue(!1),[g,d]=ue(""),[x,v]=ue(""),[b,L]=ue(!1),[R,A]=ue({line:1,col:1}),[k,w]=ue(""),[M,B]=ue(13),[z,D]=ue(!0),U=t.code||"",ee=se=>{w(""),setTimeout(()=>w(se),10),setTimeout(()=>w(""),1800)};Nt(()=>{if(!p)return;const se=()=>f(!1);return document.addEventListener("pointerdown",se),()=>document.removeEventListener("pointerdown",se)},[p]);const ae=Rw(()=>U.split(`
`).map((we,j)=>j===1&&t.modified?{type:"add",text:we,num:j+1}:j===2&&t.modified?{type:"del",text:"# (previous version)",num:null}:{type:"ctx",text:we,num:j+1}),[U,t.modified]),ne=U.trim()?U.trim().split(/\s+/).length:0,I=U.length,W=U.split(`
`).length,G=lt(null),fe=lt(null),De=lt(null),Ye=lt(null),[J,ce]=ue(!1);Nt(()=>{let se=!1;return Nw().then(we=>{if(se||!G.current)return;const j=Fc(t.label),et="forbidden-"+c.id;we.editor.defineTheme(et,Hg(c));const Q=we.editor.createModel(t.code||"",j);De.current=Q;const de=we.editor.create(G.current,{model:Q,theme:et,fontSize:M,fontFamily:"'JetBrains Mono', monospace",minimap:{enabled:z},wordWrap:b?"on":"off",lineNumbers:"on",scrollBeyondLastLine:!1,renderWhitespace:"selection",automaticLayout:!0,contextmenu:!0,smoothScrolling:!0,cursorBlinking:"smooth",cursorSmoothCaretAnimation:"on",renderLineHighlight:"all",scrollbar:{verticalScrollbarSize:5,horizontalScrollbarSize:5},suggestOnTriggerCharacters:!0,quickSuggestions:!0,tabSize:2,insertSpaces:!0});fe.current=de,de.onDidChangeCursorPosition(Me=>{A({line:Me.position.lineNumber,col:Me.position.column})}),de.addCommand(we.KeyMod.CtrlCmd|we.KeyCode.KeyS,()=>{const Me=de.getValue();e(Me),ee("✓ SAVED")}),de.addCommand(we.KeyMod.CtrlCmd|we.KeyCode.KeyD,()=>{m(Me=>!Me)});const he=window.MonacoBinding;if(o&&he){const Me=o.getText(`node:${t.id}`);Me.toString()===""&&t.code&&o.transact(()=>{Me.insert(0,t.code)});const Te=new Set([de]),Ce=new he(Me,Q,Te,l||void 0);Ye.current=Ce}else{let Me;de.onDidChangeModelContent(()=>{const Te=de.getValue();clearTimeout(Me),Me=setTimeout(()=>e(Te),300)})}ce(!0)}),()=>{var we,j,et,Q;se=!0,(j=(we=Ye.current)==null?void 0:we.destroy)==null||j.call(we),Ye.current=null,(et=fe.current)==null||et.dispose(),(Q=De.current)==null||Q.dispose(),fe.current=null,De.current=null,ce(!1)}},[t.id]),Nt(()=>{if(!J||!window.monaco)return;const se="forbidden-"+c.id;window.monaco.editor.defineTheme(se,Hg(c)),window.monaco.editor.setTheme(se)},[c.id,J]),Nt(()=>{var se;(se=fe.current)==null||se.updateOptions({fontSize:M,minimap:{enabled:z},wordWrap:b?"on":"off"})},[M,z,b]),Nt(()=>{const se=fe.current;if(!se)return;if(se.getValue()!==(t.code||"")){const j=se.getPosition();se.setValue(t.code||""),j&&se.setPosition(j)}},[t.code]);const ve=()=>{var se;navigator.clipboard.writeText(((se=fe.current)==null?void 0:se.getValue())||t.code||"").catch(()=>{}),ee("COPIED")},ye=()=>{var we,j,et;const se=(we=fe.current)==null?void 0:we.getAction("editor.action.formatDocument");if(se)se.run(),ee("FORMATTED");else{const Q=(((j=fe.current)==null?void 0:j.getValue())||t.code||"").split(`
`).map(de=>de.replace(/\s+$/,"")).join(`
`).replace(/\n{3,}/g,`

`);(et=fe.current)==null||et.setValue(Q),e(Q),ee("FORMATTED")}};return a.jsxs("div",{className:"editor-palette-scope",style:{display:"flex",flexDirection:"column",flex:1,minHeight:0,overflow:"hidden",background:c.bg},children:[a.jsxs("div",{className:"editor-toolbar",children:[i&&a.jsxs(a.Fragment,{children:[a.jsx("button",{className:`editor-toolbar-btn ${s==="running"?"active":""}`,style:{color:s==="running"?"#ffc410":s==="success"?"#10b981":s==="error"?"#ff435a":"inherit",borderColor:s==="running"?"rgba(255,196,16,0.4)":s==="success"?"rgba(16,185,129,0.4)":s==="error"?"rgba(255,67,90,0.4)":"rgba(128,128,128,0.15)",fontWeight:"bold"},onClick:()=>{i(t.id),S(!0)},disabled:s==="running",children:s==="running"?"▶ RUNNING":s==="success"?"✓ RUN":s==="error"?"✗ RUN":"▶ RUN"}),a.jsx("button",{className:`editor-toolbar-btn ${y?"active":""}`,onClick:()=>S(se=>!se),style:{fontSize:"9px",padding:"4px 7px"},children:"OUT"}),a.jsx("div",{className:"editor-toolbar-sep"})]}),a.jsxs("button",{className:"editor-toolbar-btn",onClick:ve,children:[a.jsx(Ht.Copy,{})," COPY"]}),a.jsx("div",{className:"editor-toolbar-sep"}),a.jsxs("button",{className:"editor-toolbar-btn",onClick:ye,children:[a.jsx(Ht.Format,{})," FORMAT"]}),a.jsx("button",{className:"editor-toolbar-btn",onClick:()=>{var se,we;return(we=(se=fe.current)==null?void 0:se.getAction("editor.action.toggleLineComment"))==null?void 0:we.run()},children:"# COMMENT"}),a.jsx("div",{className:"editor-toolbar-sep"}),a.jsxs("button",{className:`editor-toolbar-btn ${h?"active":""}`,onClick:()=>m(se=>!se),children:[a.jsx(Ht.Diff,{})," DIFF"]}),a.jsxs("button",{className:`editor-toolbar-btn ${b?"active":""}`,onClick:()=>L(se=>!se),children:[a.jsx(Ht.Wrap,{})," WRAP"]}),a.jsx("button",{className:"editor-toolbar-btn",onClick:()=>B(se=>Math.max(10,se-1)),style:{padding:"4px 6px"},children:"A−"}),a.jsx("button",{className:"editor-toolbar-btn",onClick:()=>B(se=>Math.min(20,se+1)),style:{padding:"4px 6px"},children:"A+"}),a.jsx("button",{className:`editor-toolbar-btn ${z?"active":""}`,onClick:()=>D(se=>!se),style:{padding:"4px 7px",fontSize:"9px"},children:"MAP"}),a.jsxs("div",{style:{marginLeft:"auto",position:"relative"},children:[a.jsxs("button",{className:`editor-toolbar-btn ${p?"active":""}`,onClick:()=>f(se=>!se),style:{gap:"5px"},children:[a.jsx("div",{style:{display:"flex",gap:"3px"},children:c.swatches.map((se,we)=>a.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:se}},we))}),c.name]}),p&&a.jsxs("div",{className:"palette-dropdown",onClick:se=>se.stopPropagation(),children:[a.jsx("div",{className:"palette-section-label",children:"DARK"}),so.filter(se=>!["github","gruvlight","papercolor","flexoki"].includes(se.id)).map(se=>a.jsxs("div",{className:`palette-option ${c.id===se.id?"active":""}`,onClick:()=>{u(se),f(!1)},style:{background:se.bg},children:[a.jsx("div",{className:"palette-swatches",children:se.swatches.map((we,j)=>a.jsx("div",{className:"palette-swatch",style:{background:we}},j))}),a.jsx("span",{className:"palette-name",style:{color:se.base},children:se.name})]},se.id)),a.jsx("div",{className:"palette-section-label",children:"LIGHT"}),so.filter(se=>["github","gruvlight","papercolor","flexoki"].includes(se.id)).map(se=>a.jsxs("div",{className:`palette-option ${c.id===se.id?"active":""}`,onClick:()=>{u(se),f(!1)},style:{background:se.bg},children:[a.jsx("div",{className:"palette-swatches",children:se.swatches.map((we,j)=>a.jsx("div",{className:"palette-swatch",style:{background:we}},j))}),a.jsx("span",{className:"palette-name",style:{color:se.base},children:se.name})]},se.id))]})]})]}),a.jsxs("div",{style:{display:"flex",flex:1,overflow:"hidden",minHeight:0,flexDirection:"column"},children:[a.jsxs("div",{style:{display:"flex",flex:1,overflow:"hidden",minHeight:0},children:[h&&a.jsxs("div",{style:{width:"220px",flexShrink:0,borderRight:`1px solid ${c.lineNum}44`,overflow:"auto",background:c.bg,display:"flex",flexDirection:"column"},children:[a.jsx("div",{style:{padding:"7px 12px",fontSize:"9px",opacity:.4,borderBottom:`1px solid ${c.lineNum}44`,letterSpacing:"1px"},children:"DIFF — WORKING TREE"}),a.jsx("div",{style:{flex:1,overflow:"auto",padding:"8px 0"},children:ae.map((se,we)=>a.jsxs("div",{className:`diff-line ${se.type==="add"?"diff-add":se.type==="del"?"diff-del":"diff-ctx"}`,style:{fontSize:"10px"},children:[a.jsx("span",{className:"diff-line-num",children:se.num||""}),a.jsxs("span",{style:{color:se.type==="add"?"#10b981":se.type==="del"?"#ff435a":c.base,paddingRight:"10px"},children:[se.type==="add"?"+":se.type==="del"?"-":" "," ",se.text.substring(0,26),se.text.length>26?"…":""]})]},we))})]}),a.jsxs("div",{style:{flex:1,position:"relative",overflow:"hidden",minWidth:0},children:[!J&&a.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:c.bg,zIndex:2},children:a.jsx("div",{style:{fontSize:"10px",opacity:.3,letterSpacing:"2px",fontFamily:"'JetBrains Mono',monospace"},children:"LOADING MONACO..."})}),a.jsx("div",{ref:G,style:{width:"100%",height:"100%"}})]}),a.jsxs("div",{className:"code-panel-info",children:[a.jsx("div",{className:"code-panel-info-hdr",children:"INSPECTOR"}),a.jsxs("div",{className:"code-panel-info-body",children:[a.jsxs("div",{children:[a.jsx("div",{className:"info-section-title",children:"FILE"}),a.jsx("div",{style:{fontWeight:"bold",color:c.fn,fontSize:"11px"},children:t.label}),a.jsxs("div",{style:{opacity:.4,marginTop:"2px",fontSize:"9px"},children:[t.type," · ",Fc(t.label)]})]}),a.jsxs("div",{children:[a.jsx("div",{className:"info-section-title",children:"METRICS"}),a.jsxs("div",{className:"stat-row",children:[a.jsx("span",{className:"stat-label",children:"LINES"}),a.jsx("span",{className:"stat-val",style:{color:"#10b981"},children:W})]}),a.jsxs("div",{className:"stat-row",children:[a.jsx("span",{className:"stat-label",children:"WORDS"}),a.jsx("span",{className:"stat-val",style:{color:"#ffc410"},children:ne})]}),a.jsxs("div",{className:"stat-row",children:[a.jsx("span",{className:"stat-label",children:"CHARS"}),a.jsx("span",{className:"stat-val",style:{color:"#4285f4"},children:I})]}),a.jsxs("div",{className:"stat-row",children:[a.jsx("span",{className:"stat-label",children:"SIZE"}),a.jsxs("span",{className:"stat-val",style:{color:"#28f1c3"},children:[(I/1024).toFixed(1),"kb"]})]})]}),a.jsxs("div",{children:[a.jsx("div",{className:"info-section-title",children:"CURSOR"}),a.jsxs("div",{className:"stat-row",children:[a.jsx("span",{className:"stat-label",children:"LINE"}),a.jsx("span",{className:"stat-val",children:R.line})]}),a.jsxs("div",{className:"stat-row",children:[a.jsx("span",{className:"stat-label",children:"COL"}),a.jsx("span",{className:"stat-val",children:R.col})]})]}),a.jsxs("div",{children:[a.jsx("div",{className:"info-section-title",children:"SHORTCUTS"}),a.jsxs("div",{style:{fontSize:"9px",opacity:.35,lineHeight:"2",display:"flex",flexDirection:"column",gap:"1px"},children:[a.jsx("span",{children:"^S — save"}),a.jsx("span",{children:"^/ — comment"}),a.jsx("span",{children:"F1 — command"}),a.jsx("span",{children:"^Space — suggest"})]})]}),a.jsxs("div",{children:[a.jsx("div",{className:"info-section-title",children:"STATUS"}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"5px"},children:[a.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:t.modified?"#ffc410":"#10b981",boxShadow:`0 0 6px ${t.modified?"#ffc410":"#10b981"}`}}),a.jsx("span",{style:{fontSize:"9px",color:t.modified?"#ffc410":"#10b981",fontWeight:"bold"},children:t.modified?"MODIFIED":"SAVED"})]}),s&&s!=="idle"&&a.jsxs("div",{style:{marginTop:"8px",display:"flex",alignItems:"center",gap:"5px"},children:[a.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:s==="running"?"#ffc410":s==="success"?"#10b981":"#ff435a",boxShadow:`0 0 6px ${s==="running"?"#ffc410":s==="success"?"#10b981":"#ff435a"}`}}),a.jsx("span",{style:{fontSize:"9px",fontWeight:"bold",color:s==="running"?"#ffc410":s==="success"?"#10b981":"#ff435a",textTransform:"uppercase"},children:s})]})]})]})]})]}),y&&a.jsxs("div",{style:{height:"160px",flexShrink:0,borderTop:"1px solid rgba(255,255,255,0.06)",background:"rgba(0,0,0,0.5)",display:"flex",flexDirection:"column",overflow:"hidden"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"4px 10px",borderBottom:"1px solid rgba(255,255,255,0.04)",flexShrink:0},children:[a.jsx("span",{style:{fontSize:"9px",opacity:.35,letterSpacing:"1.5px"},children:"OUTPUT"}),a.jsx("span",{style:{fontSize:"9px",padding:"1px 6px",borderRadius:"3px",background:s==="running"?"rgba(255,196,16,0.15)":s==="success"?"rgba(16,185,129,0.15)":s==="error"?"rgba(255,67,90,0.15)":"transparent",color:s==="running"?"#ffc410":s==="success"?"#10b981":s==="error"?"#ff435a":"transparent"},children:s||""}),a.jsx("button",{onClick:()=>S(!1),style:{marginLeft:"auto",background:"transparent",border:"none",color:"inherit",opacity:.3,cursor:"pointer",fontSize:"11px"},children:"✕"})]}),a.jsx("pre",{style:{flex:1,overflow:"auto",padding:"8px 12px",margin:0,fontSize:"10px",fontFamily:"'JetBrains Mono',monospace",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-all",color:s==="error"?"#ff8080":"rgba(200,230,200,0.85)"},children:r||(s==="running"?"▋ running...":"(no output)")})]})]}),a.jsxs("div",{className:"editor-status-strip",children:[a.jsxs("span",{children:["Ln ",R.line," : Col ",R.col]}),a.jsx("span",{style:{opacity:.25},children:"│"}),a.jsxs("span",{children:[W," lines"]}),a.jsx("span",{style:{opacity:.25},children:"│"}),a.jsx("span",{children:"UTF-8"}),a.jsx("span",{style:{opacity:.25},children:"│"}),a.jsxs("span",{style:{color:b?c.fn:void 0},children:["WRAP ",b?"ON":"OFF"]}),a.jsx("span",{style:{opacity:.25},children:"│"}),a.jsx("span",{style:{color:c.fn},children:c.name}),a.jsx("span",{style:{marginLeft:"auto",color:t.modified?"#ffc410":"#10b981",fontSize:"9px"},children:t.modified?"● UNSAVED":"✓ CLEAN"})]}),k&&a.jsx("div",{className:`copy-toast${k.includes("SAVED")||k.includes("✓")?"  save-toast":""}`,children:k})]})}const Vg=["default","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"],Iw={default:"#ffffff",1:"#ffffff",2:"#ffffff",3:"#ffffff",4:"#ffffff",5:"#808080",6:"#1a0b2e",7:"#1a0a2e",8:"#0a1628",9:"#1a1200",10:"#ffffff",11:"#0d1a0d",12:"#1a0a0a",13:"#0a0a1a",14:"#1a1600",15:"#001a14"},Hn=["#10b981","#4285f4","#ffc410","#ff435a","#28f1c3","#bb9af7","#ff1650","#5ccfe6","#ffbd5e","#e36209","#72f1b8","#ff8080","#89ddff","#e5c07b","#4ec9b0","#c792ea"],Dw=200/(24*60*60*1e3);function $r(t,e){return(t-e)*Dw}const Fl=Date.now(),zl=24*60*60*1e3,Uw=[{id:"n1",type:"entry",label:"core_sys.py",isMain:!0,x:0,y:0,vx:0,vy:0,themeIdx:0,createdAt:Fl-6*zl,code:`import torch
import sys

print("Central Architecture Booted")

def init_sequence():
    # Core logic entry
    pass

if __name__ == "__main__":
    init_sequence()`,modified:!1},{id:"n2",type:"function",label:"load_network.py",isMain:!1,x:140,y:-130,vx:0,vy:0,themeIdx:5,classId:"g1",createdAt:Fl-4*zl,code:`def load_network(config=None):
    """Load the neural network from disk.

    Args:
        config: Optional configuration dict
    Returns:
        DataLoader instance
    """
    loader = DataLoader(config)
    loader.init()
    return loader

# Network params
DEFAULT_LR = 0.001
DEFAULT_BATCH = 32`,modified:!0},{id:"n3",type:"class",label:"DataMatrix.py",isMain:!1,x:-100,y:150,vx:0,vy:0,themeIdx:6,code:`class DataMatrix:
    """Core data matrix handler."""

    def __init__(self, size=128):
        self.active = True
        self.buffer = []
        self.size = size

    def push(self, data):
        if len(self.buffer) < self.size:
            self.buffer.append(data)
            return True
        return False

    def flush(self):
        self.buffer = []
        return self`,modified:!1,classId:"g1",createdAt:Fl-4*zl},{id:"n4",type:"function",label:"preprocess.py",isMain:!1,x:60,y:180,vx:0,vy:0,themeIdx:4,classId:null,createdAt:Fl-1*zl,code:`def preprocess(data):
    return data`,modified:!1}],Ow=[{id:"e1",source:"n1",target:"n2"},{id:"e2",source:"n1",target:"n3"},{id:"e3",source:"n2",target:"n4"}],kw=[{id:"g1",name:"NetworkLayer",color:"#10b981",nodeIds:["n2","n3"]}],Fw={cols:[{id:"c1",title:"BACKLOG",color:"#4a4a6a"},{id:"c2",title:"TO DO",color:"#4285f4"},{id:"c3",title:"IN PROGRESS",color:"#ffc410"},{id:"c4",title:"REVIEW",color:"#ff435a"},{id:"c5",title:"DONE",color:"#10b981"}],cards:[{id:"k1",colId:"c3",title:"Build graph force simulation",priority:"HIGH",tags:["core","physics"],progress:70,due:"Mar 12",assignee:0},{id:"k2",colId:"c2",title:"WebSocket sync protocol",priority:"HIGH",tags:["backend","net"],progress:0,due:"Mar 18",assignee:1},{id:"k3",colId:"c2",title:"Class grouping thread UI",priority:"MED",tags:["ui","graph"],progress:20,due:"Mar 15",assignee:0},{id:"k5",colId:"c4",title:"Syntax highlight engine",priority:"MED",tags:["editor","parser"],progress:90,due:"Mar 10",assignee:0},{id:"k6",colId:"c5",title:"Babel JSX setup",priority:"DONE",tags:["infra"],progress:100,due:"Feb 28",assignee:1},{id:"k7",colId:"c5",title:"Boot sequence modal",priority:"DONE",tags:["ui"],progress:100,due:"Feb 25",assignee:0},{id:"k8",colId:"c3",title:"Color palette engine",priority:"MED",tags:["editor","ui"],progress:45,due:"Mar 14",assignee:2}]},zw=[{icon:"⌘",label:"Open Command Palette",hint:"Ctrl+P"},{icon:"F",label:"New file node",hint:"N"},{icon:"G",label:"New class group",hint:"G"},{icon:"J",label:"Join nodes (add edge)",hint:"J"},{icon:"X",label:"Cut edge",hint:"X"},{icon:"/",label:"Toggle comment",hint:"Ctrl+/"},{icon:"T",label:"Open terminal",hint:"`"},{icon:"B",label:"Open board",hint:""},{icon:"D",label:"Toggle dark / brutal",hint:""}];function Bw({token:t,workspaceId:e}){const[n,i]=ue([]),[r,s]=ue(!1);return Nt(()=>{!t||!e||(s(!0),Ot(`/api/pty-audit/${e}/commands`,{},t).then(o=>{i(Array.isArray(o)?o:[]),s(!1)}).catch(()=>s(!1)))},[t,e]),a.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"},children:[a.jsxs("div",{style:{padding:"6px 14px",borderBottom:"1px solid rgba(128,128,128,0.08)",fontSize:"9px",opacity:.35,letterSpacing:"1px",display:"flex",justifyContent:"space-between"},children:[a.jsx("span",{children:"PTY COMMAND AUDIT LOG"}),t&&a.jsx("button",{style:{fontSize:"8px",padding:"1px 6px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"2px",background:"transparent",color:"rgba(255,255,255,0.3)",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace"},onClick:()=>{s(!0),Ot(`/api/pty-audit/${e}/commands`,{},t).then(o=>{i(Array.isArray(o)?o:[]),s(!1)}).catch(()=>s(!1))},children:"REFRESH"})]}),a.jsxs("div",{style:{flex:1,overflowY:"auto",fontFamily:"'JetBrains Mono',monospace",fontSize:"10px"},children:[r&&a.jsx("div",{style:{padding:"24px",textAlign:"center",opacity:.3,letterSpacing:"2px"},children:"LOADING..."}),!r&&n.length===0&&a.jsx("div",{style:{padding:"24px",textAlign:"center",opacity:.2,fontSize:"9px",letterSpacing:"1px"},children:t?"No commands recorded yet":"Connect to backend to view audit log"}),n.map((o,l)=>a.jsxs("div",{style:{display:"flex",gap:"10px",padding:"6px 14px",borderBottom:"1px solid rgba(128,128,128,0.04)",alignItems:"flex-start"},onMouseEnter:c=>c.currentTarget.style.background="rgba(255,255,255,0.02)",onMouseLeave:c=>c.currentTarget.style.background="transparent",children:[a.jsxs("span",{style:{color:"#10b981",flexShrink:0,opacity:.6,fontSize:"9px",marginTop:"1px",minWidth:"44px"},children:[o.exitCode===0?"✓":"✗"," ",o.exitCode!==void 0?`[${o.exitCode}]`:""]}),a.jsx("span",{style:{flex:1,color:"#c0c8d8",wordBreak:"break-all"},children:o.command||o.cmd||o.data}),a.jsx("span",{style:{opacity:.25,fontSize:"8px",flexShrink:0,marginTop:"1px"},children:o.startedAt?new Date(o.startedAt).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):""})]},o._id||l))]})]})}const Nn=({title:t,isOpen:e,onClose:n,defaultX:i,defaultY:r,defaultW:s,defaultH:o,children:l})=>{const[c,u]=ue({x:i,y:r}),[p,f]=ue({w:s,h:o}),[h,m]=ue(100),y=lt({isDragging:!1}),S=lt({isResizing:!1});if(!e)return null;const g=()=>m(Date.now()%1e5+100),d=A=>{A.target.closest(".no-drag")||(y.current={isDragging:!0,startX:A.clientX,startY:A.clientY,ix:c.x,iy:c.y},A.currentTarget.setPointerCapture(A.pointerId),g())},x=A=>{y.current.isDragging&&u({x:y.current.ix+(A.clientX-y.current.startX),y:Math.max(0,y.current.iy+(A.clientY-y.current.startY))})},v=A=>{y.current.isDragging=!1,A.currentTarget.releasePointerCapture(A.pointerId)},b=A=>{A.stopPropagation(),S.current={isResizing:!0,startX:A.clientX,startY:A.clientY,iw:p.w,ih:p.h},A.currentTarget.setPointerCapture(A.pointerId)},L=A=>{S.current.isResizing&&f({w:Math.max(220,S.current.iw+(A.clientX-S.current.startX)),h:Math.max(160,S.current.ih+(A.clientY-S.current.startY))})},R=A=>{S.current.isResizing=!1,A.currentTarget.releasePointerCapture(A.pointerId)};return a.jsxs("div",{className:"floating-panel",style:{left:c.x,top:c.y,width:p.w,height:p.h,zIndex:h},onPointerDownCapture:g,children:[a.jsxs("div",{className:"panel-hdr",style:{cursor:"grab"},onPointerDown:d,onPointerMove:x,onPointerUp:v,onPointerCancel:v,children:[a.jsx("span",{children:t}),a.jsx("span",{className:"no-drag",style:{cursor:"pointer",padding:"0 4px",opacity:.5,fontSize:"12px"},onClick:n,children:"✕"})]}),a.jsxs("div",{className:"panel-content-wrap",children:[l,a.jsx("div",{className:"panel-resizer",onPointerDown:b,onPointerMove:L,onPointerUp:R,onPointerCancel:R})]})]})};function jw({isOpen:t,onClose:e,onAction:n}){const[i,r]=ue(""),[s,o]=ue(0),l=zw.filter(c=>c.label.toLowerCase().includes(i.toLowerCase()));return Nt(()=>{t&&r("")},[t]),t?a.jsx("div",{className:"cmd-overlay",onClick:e,children:a.jsxs("div",{className:"cmd-box",onClick:c=>c.stopPropagation(),children:[a.jsxs("div",{className:"cmd-input-wrap",children:[a.jsx("span",{className:"cmd-prefix",children:"⌘"}),a.jsx("input",{className:"cmd-input",value:i,onChange:c=>r(c.target.value),placeholder:"Type a command...",autoFocus:!0,onKeyDown:c=>{var u;c.key==="ArrowDown"&&(c.preventDefault(),o(p=>Math.min(p+1,l.length-1))),c.key==="ArrowUp"&&(c.preventDefault(),o(p=>Math.max(p-1,0))),c.key==="Enter"&&(n((u=l[s])==null?void 0:u.label),e()),c.key==="Escape"&&e()}})]}),a.jsx("div",{className:"cmd-results",children:l.map((c,u)=>a.jsxs("div",{className:`cmd-item ${u===s?"focused":""}`,onMouseEnter:()=>o(u),onClick:()=>{n(c.label),e()},children:[a.jsx("div",{className:"cmd-item-icon",children:c.icon}),a.jsx("span",{className:"cmd-item-label",children:c.label}),c.hint&&a.jsx("span",{className:"cmd-item-hint",children:c.hint})]},u))}),a.jsxs("div",{className:"cmd-footer",children:[a.jsx("span",{children:"↑↓ navigate"}),a.jsx("span",{children:"↵ execute"}),a.jsx("span",{children:"Esc close"})]})]})}):null}function Hw({groups:t,nodes:e,onOpen:n,onRemove:i}){return t.length?a.jsx("div",{className:"group-dock",children:t.map((r,s)=>{const o=e.filter(u=>r.nodeIds.includes(u.id)),l=r.color||Hn[s%Hn.length],c=o.reduce((u,p)=>u+(p.code||"").split(`
`).length,0);return a.jsxs("div",{className:"group-dock-card",onClick:()=>n(r.id),style:{borderColor:l+"30"},onMouseEnter:u=>u.currentTarget.style.borderColor=l+"70",onMouseLeave:u=>u.currentTarget.style.borderColor=l+"30",children:[a.jsx("div",{className:"group-dock-accent-line",style:{background:`linear-gradient(90deg, ${l}, ${l}44, transparent)`}}),a.jsxs("div",{className:"group-dock-header",children:[a.jsxs("div",{className:"group-dock-title-col",children:[a.jsx("div",{className:"group-dock-left-bar",style:{background:l+"aa"}}),a.jsxs("div",{children:[a.jsxs("div",{className:"group-dock-classname",style:{color:l},children:["class ",r.name]}),a.jsxs("div",{className:"group-dock-sub-label",children:[o.length," methods · ",c," lines"]})]})]}),a.jsx("div",{className:"group-dock-badge",style:{color:l,borderColor:l+"55"},children:"GROUP"})]}),a.jsxs("div",{className:"group-dock-tree",children:[a.jsxs("div",{className:"group-dock-tree-class-line",style:{color:l+"cc"},children:[a.jsx("span",{style:{opacity:.5},children:"class "}),a.jsx("span",{style:{fontWeight:"bold"},children:r.name}),a.jsx("span",{style:{opacity:.4},children:":"})]}),o.map((u,p)=>a.jsxs("div",{className:"group-dock-tree-row",children:[a.jsx("span",{className:"group-dock-tree-branch",style:{color:l},children:p===o.length-1?"└─":"├─"}),a.jsx("span",{className:"group-dock-tree-name",style:{color:Hn[p%Hn.length]},children:u.label.replace(".py","").replace(".js","")}),a.jsx("span",{className:"group-dock-tree-tag",children:u.type})]},u.id))]}),a.jsxs("div",{className:"group-dock-footer",children:[a.jsx("span",{className:"group-dock-hint",children:"↵ OPEN CLASS VIEW"}),a.jsx("button",{className:"group-dock-dissolve",onClick:u=>{u.stopPropagation(),i(r.id)},children:"DISSOLVE"})]})]},r.id)})}):null}function Vw({group:t,nodes:e,onClose:n,onOpenNode:i}){const[r,s]=ue(null);if(!t)return null;const o=e.filter(f=>t.nodeIds.includes(f.id)),l=t.color||"#10b981",c=o.reduce((f,h)=>f+(h.code||"").split(`
`).length,0),u=f=>{s(f);const h=document.getElementById("fn-block-"+f);h&&h.scrollIntoView({behavior:"smooth",block:"start"})},p=f=>({"--syn-kw":"#c792ea","--syn-str":f,"--syn-cmt":"rgba(180,180,220,0.28)","--syn-num":"#f78c6c","--syn-fn":f,"--syn-bi":"#89ddff","--syn-op":"rgba(200,200,230,0.45)"});return a.jsx("div",{className:"grp-editor-overlay",onPointerDown:n,children:a.jsxs("div",{className:"grp-editor-shell",onPointerDown:f=>f.stopPropagation(),children:[a.jsxs("div",{className:"grp-editor-chrome",children:[a.jsx("div",{className:"grp-chrome-dot",style:{background:"#ff5f57"}}),a.jsx("div",{className:"grp-chrome-dot",style:{background:"#febc2e"}}),a.jsx("div",{className:"grp-chrome-dot",style:{background:"#28c840"}}),a.jsx("div",{className:"grp-chrome-sep"}),a.jsxs("span",{className:"grp-chrome-title",style:{color:l},children:["class ",t.name]}),a.jsx("span",{style:{opacity:.2,margin:"0 6px",fontSize:"11px"},children:"/"}),a.jsxs("span",{className:"grp-chrome-meta",children:["CLASS ASSEMBLY VIEW · ",o.length," FUNCTIONS · ",c," LINES"]}),a.jsx("button",{className:"editor-toolbar-btn",style:{marginLeft:"auto",fontSize:"9px"},onClick:n,children:"✕ CLOSE"})]}),a.jsxs("div",{className:"grp-editor-body",children:[a.jsxs("div",{className:"grp-sidebar",children:[a.jsxs("div",{className:"grp-sidebar-hdr",children:[a.jsx("div",{className:"grp-sidebar-sup",children:"CLASS MEMBERS"}),a.jsx("div",{className:"grp-sidebar-classname",style:{color:l},children:t.name})]}),a.jsxs("div",{className:"grp-sidebar-struct",children:[a.jsxs("div",{className:"grp-sidebar-struct-class",style:{color:l},children:["class ",t.name,":"]}),o.map((f,h)=>{const m=Hn[h%Hn.length];return a.jsxs("div",{className:"grp-sidebar-struct-method",style:{cursor:"pointer"},onClick:()=>u(f.id),children:[a.jsx("span",{style:{opacity:.25,color:l},children:h===o.length-1?"└":"├"}),a.jsxs("span",{style:{color:m},children:["def ",f.label.replace(".py","").replace(".js",""),"()"]})]},f.id)})]}),a.jsx("div",{className:"grp-member-list",children:o.map((f,h)=>{const m=Hn[h%Hn.length],y=(f.code||"").split(`
`).length;return a.jsxs("div",{className:`grp-member-row ${r===f.id?"active":""}`,style:{borderLeftColor:r===f.id?m:"transparent",color:m},onClick:()=>u(f.id),children:[a.jsx("div",{className:"grp-member-dot",style:{background:m,boxShadow:r===f.id?`0 0 6px ${m}`:"none"}}),a.jsxs("div",{className:"grp-member-info",children:[a.jsx("div",{className:"grp-member-fname",children:f.label}),a.jsxs("div",{className:"grp-member-ftype",children:[f.type.toUpperCase()," · ",y,"L"]})]}),f.modified&&a.jsx("div",{style:{width:"5px",height:"5px",borderRadius:"50%",background:"#ffc410",flexShrink:0}})]},f.id)})}),a.jsxs("div",{className:"grp-sidebar-stats",children:[a.jsx("div",{style:{fontSize:"8px",opacity:.3,letterSpacing:"1.3px",marginBottom:"3px"},children:"STATS"}),a.jsxs("div",{className:"grp-stat-row",children:[a.jsx("span",{className:"grp-stat-label",children:"METHODS"}),a.jsx("span",{className:"grp-stat-val",style:{color:l},children:o.length})]}),a.jsxs("div",{className:"grp-stat-row",children:[a.jsx("span",{className:"grp-stat-label",children:"TOTAL LINES"}),a.jsx("span",{className:"grp-stat-val",style:{color:"#ffc410"},children:c})]}),a.jsxs("div",{className:"grp-stat-row",children:[a.jsx("span",{className:"grp-stat-label",children:"MODIFIED"}),a.jsx("span",{className:"grp-stat-val",style:{color:"#ff435a"},children:o.filter(f=>f.modified).length})]})]})]}),a.jsxs("div",{className:"grp-main",children:[a.jsxs("div",{className:"grp-tabs",children:[a.jsx("div",{className:"grp-tab active",style:{color:l,borderBottomColor:l,borderBottom:"2px solid"},children:"ALL MEMBERS"}),o.map((f,h)=>{const m=Hn[h%Hn.length];return a.jsx("div",{className:`grp-tab ${r===f.id?"active":""}`,style:{color:m,borderBottom:r===f.id?`2px solid ${m}`:"2px solid transparent"},onClick:()=>u(f.id),children:f.label},f.id)})]}),a.jsxs("div",{className:"grp-codescroll",children:[a.jsxs("div",{className:"grp-class-banner",children:[a.jsx("div",{className:"grp-banner-bar",style:{background:l,height:"40px"}}),a.jsxs("div",{children:[a.jsxs("div",{className:"grp-banner-code",children:[a.jsx("span",{style:{color:"#c792ea",fontWeight:"bold",fontFamily:"'JetBrains Mono',monospace",fontSize:"13px"},children:"class "}),a.jsx("span",{style:{color:l,fontWeight:"bold",fontFamily:"'JetBrains Mono',monospace",fontSize:"13px"},children:t.name}),a.jsx("span",{style:{color:"rgba(200,200,230,0.4)",fontFamily:"'JetBrains Mono',monospace",fontSize:"13px"},children:":"})]}),a.jsxs("div",{className:"grp-banner-note",children:["# assembled class view · ",o.length," methods · read-only"]})]}),a.jsxs("div",{style:{marginLeft:"auto",display:"flex",gap:"8px",alignItems:"center"},children:[a.jsx("div",{style:{padding:"3px 10px",border:`1px solid ${l}44`,borderRadius:"3px",fontSize:"9px",color:l,fontFamily:"'JetBrains Mono',monospace",letterSpacing:"1px"},children:"CLASS"}),a.jsxs("div",{style:{padding:"3px 10px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"3px",fontSize:"9px",opacity:.4,fontFamily:"'JetBrains Mono',monospace"},children:[o.length," METHODS"]})]})]}),o.map((f,h)=>{const m=Hn[h%Hn.length],y=(f.code||"# empty").split(`
`),S=Wf(f.code||"# empty"),g=p(m);return a.jsxs("div",{id:"fn-block-"+f.id,className:"grp-fn-section",style:{borderLeftColor:r===f.id?m+"44":"transparent",borderLeftWidth:"3px",borderLeftStyle:"solid"},children:[a.jsxs("div",{className:"grp-fn-header",style:{background:m+"08",borderBottomColor:m+"18"},children:[a.jsx("div",{className:"grp-fn-num",style:{background:m+"18",color:m},children:String(h+1).padStart(2,"0")}),a.jsxs("div",{className:"grp-fn-name-col",children:[a.jsx("div",{className:"grp-fn-title",style:{color:m},children:f.label}),a.jsxs("div",{className:"grp-fn-subtitle",children:["def ",f.label.replace(".py","").replace(".js",""),"(self)  ·  ",y.length," lines  ·  ",f.type]})]}),a.jsx("div",{className:"grp-fn-badge",style:{color:m,borderColor:m+"55"},children:f.type.toUpperCase()}),f.modified&&a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px",fontSize:"8px",color:"#ffc410",flexShrink:0},children:[a.jsx("div",{style:{width:"5px",height:"5px",borderRadius:"50%",background:"#ffc410"}}),"UNSAVED"]}),a.jsxs("span",{className:"grp-fn-lines-meta",children:[y.length,"L"]}),a.jsx("button",{className:"grp-fn-open-btn",style:{borderColor:m+"44",color:m},onClick:()=>i(f.id),children:"OPEN FILE →"})]}),a.jsxs("div",{className:"grp-fn-codewrap",ref:d=>{d&&Object.entries(g).forEach(([x,v])=>d.style.setProperty(x,v))},children:[a.jsx("div",{className:"grp-fn-linenums",children:y.map((d,x)=>a.jsx("div",{style:{lineHeight:"1.65",color:x===0?m+"55":"rgba(255,255,255,0.1)"},children:x+1},x))}),a.jsx("pre",{className:"grp-fn-code editor-palette-scope",dangerouslySetInnerHTML:{__html:S}})]})]},f.id)}),a.jsx("div",{style:{height:"40px"}})]}),a.jsxs("div",{className:"grp-statusbar",children:[a.jsx("span",{style:{color:l,fontWeight:"bold"},children:t.name}),a.jsx("span",{style:{opacity:.25},children:"·"}),a.jsxs("span",{children:[o.length," functions assembled"]}),a.jsx("span",{style:{opacity:.25},children:"·"}),a.jsx("span",{children:"READ-ONLY CLASS VIEW"}),a.jsx("span",{style:{opacity:.25},children:"·"}),a.jsxs("span",{children:[c," total lines"]}),a.jsx("span",{style:{marginLeft:"auto",opacity:.3},children:"FORBIDDEN // CLASS ASSEMBLY"})]})]})]})]})})}function Gw({initialTheme:t,initialAvatar:e,token:n,operatorId:i,operatorName:r,workspaceId:s,workspaceName:o,onLogout:l}){var Np,Lp;const[c,u]=ue(t),[p,f]=ue(()=>new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}));Nt(()=>{const _=setInterval(()=>f(new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})),1e4);return()=>clearInterval(_)},[]);const h=lt(null),m=lt("sess-"+Math.random().toString(36).slice(2)),[y,S]=ue("connecting"),[g,d]=ue("unknown"),[x,v]=ue({}),[b,L]=ue({}),[R,A]=ue(null),[k,w]=ue(null),[M,B]=ue(!1),z=lt(JSON.parse(JSON.stringify(Uw))),D=lt(Ow),[,U]=ue({}),[ee,ae]=ue({x:window.innerWidth/2,y:window.innerHeight/2,scale:1}),[ne,I]=ue(!1),[W,G]=ue("files"),[fe,De]=ue("timeline"),[Ye,J]=ue([]),[ce,ve]=ue(null),[ye,se]=ue(""),[we,j]=ue(e),[et,Q]=ue(""),[de,he]=ue(!1),[Me,Te]=ue(!1),[Ce,qe]=ue(""),[P,E]=ue("function"),[X,te]=ue(1),[Z,oe]=ue(!1),[Ne,Se]=ue(""),[ge,He]=ue("#10b981"),[me,ke]=ue([]),[Ve,Fe]=ue(Fw),[re,Re]=ue(!1);lt(null),Nt(()=>{!n||!s||(Re(!0),Ot(`/api/tasks/${s}`,{},n).then(_=>{if(!(_!=null&&_.columns))return;const N={todo:"c2","in-progress":"c3",done:"c5",archived:"c1"},C=_.columns.flatMap(q=>q.tasks.map(F=>({id:F._id||F.id,_backendId:F._id||F.id,colId:N[F.status]||"c2",title:F.title,priority:F.priority||"MED",tags:F.tags||[],progress:F.progress||0,due:F.dueDate?new Date(F.dueDate).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"",assignee:0})));C.length>0&&Fe(q=>({...q,cards:C}))}).catch(()=>{}).finally(()=>Re(!1)))},[n,s]);const[ze,it]=ue(null),[Le,O]=ue([]),[le,ie]=ue(100),[_e,Ae]=ue(!1),[Ke,rt]=ue([]);lt(null);const nt=lt(null),yt=lt(null),st=lt(null),[Kt,Ut]=ue(!1),[hs,ps]=ue([]),ms=lt(null),Nr=lt(null),Zi=lt(null),[An,wo]=ue({}),[To,Ga]=ue([]),[Lr,Ao]=ue(0),[T,H]=ue(!1),[K,$]=ue([]),[Y,Ee]=ue(null),[Ue,Oe]=ue(""),[Be,Xe]=ue(null),[We,Je]=ue(null),[ct,Rt]=ue(null),[Pt,Jt]=ue(null),[dt,$e]=ue("default"),[Ir,_t]=ue(null),[Jn,gs]=ue([]),[gi,xs]=ue(""),[zt,Zn]=ue(!1),[Qn,vn]=ue("explain"),[Ai,Co]=ue(!1),[Ro,vs]=ue([]),[Ci,Po]=ue(null),[pt,Iy]=ue(jg[0]),[Wa,Xa]=ue(!1),[au,up]=ue(""),[dp,lu]=ue([]),[fp,Dy]=ue(`// OPERATOR NOTES
// Use this scratchpad for any workspace notes.

`),hp=lt(null),[je,pp]=ue(so[0]),Cn=lt(JSON.parse(JSON.stringify(kw))),$a=lt(null);lt({x:0,y:0}),Nt(()=>{if(!n||!s)return;Ot(`/api/messages/${s}`,{},n).then(N=>{Array.isArray(N)&&lu(N.slice(-50).map(C=>({id:C._id||Math.random(),from:C.operatorName||C.operatorId||"Operator",time:C.createdAt?new Date(C.createdAt).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"",text:C.text,self:C.operatorId===i})))}).catch(()=>{}),Ot(`/api/nodes/${s}`,{},n).then(N=>{const C=zg(N);if(C.length>0){z.current=C.map(F=>{var xe,Pe;return{id:F.id,label:F.label,type:F.type||"function",isMain:F.isMain||!1,x:((xe=F.position)==null?void 0:xe.x)||(Math.random()-.5)*400,y:((Pe=F.position)==null?void 0:Pe.y)||(Math.random()-.5)*300,vx:0,vy:0,themeIdx:F.themeIdx??Math.floor(Math.random()*16),classId:F.groupId||null,code:F.code||"",modified:!1,language:F.language||"python",createdAt:F.createdAt?new Date(F.createdAt).getTime():Date.now()}});const q=[];C.forEach(F=>{(F.edges||[]).forEach(xe=>q.push({id:`${F.id}-${xe.targetId}`,source:F.id,target:xe.targetId,edgeType:xe.edgeType||"default",label:xe.label||""}))}),D.current=q,U({})}}).catch(N=>console.warn("[forbidden] Node load failed:",N.message));const _=io(ca,{auth:{token:n},query:{workspaceId:s},transports:["websocket","polling"]});return h.current=_,_.on("connect",()=>{S("live"),n&&Ot(`/api/workspaces/${s}/status`,{},n).then(N=>d(N.status||"unknown")).catch(()=>{})}),_.on("disconnect",()=>S("offline")),_.on("connect_error",()=>S("offline")),_.on("event:new",N=>{var q,F;const C=N.payload||{};N.type==="NODE_CREATED"?z.current.find(Pe=>Pe.id===C.nodeId)||(z.current=[...z.current,{id:C.nodeId,label:C.label,type:C.type||"function",isMain:!1,x:((q=C.position)==null?void 0:q.x)||(Math.random()-.5)*300,y:((F=C.position)==null?void 0:F.y)||(Math.random()-.5)*300,z:0,vx:0,vy:0,themeIdx:C.themeIdx??0,classId:null,code:C.code||"",modified:!1,language:C.language||"python",createdAt:C.createdAt?new Date(C.createdAt).getTime():Date.now()}],U({})):N.type==="NODE_EDITED"?(z.current=z.current.map(xe=>{var Pe,Ge;return xe.id===C.nodeId?{...xe,code:C.code??xe.code,language:C.language??xe.language,x:((Pe=C.position)==null?void 0:Pe.x)??xe.x,y:((Ge=C.position)==null?void 0:Ge.y)??xe.y,modified:C.code!==void 0?!0:xe.modified}:xe}),U({})):N.type==="NODE_DELETED"?(z.current=z.current.filter(xe=>xe.id!==C.nodeId),D.current=D.current.filter(xe=>xe.source!==C.nodeId&&xe.target!==C.nodeId),U({})):N.type==="NODE_JOINED"?D.current.find(Pe=>Pe.source===C.sourceId&&Pe.target===C.targetId)||(D.current=[...D.current,{id:`${C.sourceId}-${C.targetId}`,source:C.sourceId,target:C.targetId,edgeType:C.edgeType||"default",label:C.label||""}],U({})):N.type==="NODE_CUT"&&(D.current=D.current.filter(xe=>!(xe.source===C.sourceId&&xe.target===C.targetId)),U({}))}),_.on("timeline:update",N=>{O(C=>[N,...C].slice(0,200)),rt(C=>[...C,N].slice(0,500)),ie(100)}),_.on("message:new",N=>{N.operatorId!==i&&lu(C=>[...C,{id:N._id||Date.now(),from:N.operatorName||N.operatorId||"Operator",time:new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),text:N.text,self:!1}].slice(-100))}),_.on("terminal:output",({sessionId:N,data:C})=>{N===m.current&&ps(q=>[...q,C])}),_.on("terminal:closed",({sessionId:N})=>{N===m.current&&(Ut(!1),ps(C=>[...C,`\r
[session closed]\r
`]))}),_.on("feed:new",N=>{Ga(C=>[N,...C].slice(0,200)),Ao(C=>C+1)}),_.on("container:status",({status:N})=>d(N)),_.on("node:run:status",({nodeId:N,status:C})=>{v(q=>({...q,[N]:C})),C==="running"&&A(N)}),_.on("node:run:output",({nodeId:N,chunk:C})=>{L(q=>({...q,[N]:(q[N]||"")+C}))}),_.on("node:run:done",({nodeId:N,exitCode:C})=>{if(v(q=>({...q,[N]:C===0?"success":"error"})),A(null),C!==0){const q=z.current.find(F=>F.id===N);if(q){const F=(q.edges||[]).filter(xe=>xe.edgeType==="calls"||xe.edgeType==="data-flow").map(xe=>xe.targetId);F.length&&v(xe=>{const Pe={...xe};return F.forEach(Ge=>{Pe[Ge]="warn"}),Pe})}}}),_.on("pipeline:start",({order:N})=>{Co(!0),vs([`▶ Running pipeline (${N.length} nodes)...`])}),_.on("pipeline:node:start",({nodeId:N})=>{const C=z.current.find(q=>q.id===N);vs(q=>[...q,`  ↳ Running ${(C==null?void 0:C.label)||N}...`]),v(q=>({...q,[N]:"running"}))}),_.on("pipeline:node:done",({nodeId:N,exitCode:C})=>{v(q=>({...q,[N]:C===0?"success":"error"})),vs(q=>[...q,`    ${C===0?"✓":"✗"} exit ${C}`])}),_.on("pipeline:done",({total:N})=>{Co(!1),vs(C=>[...C,`✓ Pipeline complete (${N} nodes)`])}),_.on("pipeline:error",({error:N})=>{Co(!1),vs(C=>[...C,`✗ Pipeline failed: ${N}`])}),()=>_.disconnect()},[n,s]),Nt(()=>{!n||!s||(Ot("/api/feed",{},n).then(_=>{Array.isArray(_)&&(Ga(_),Ao(0))}).catch(()=>{}),Ot("/api/templates").then(_=>{Array.isArray(_)&&$(_)}).catch(()=>{}))},[n,s]),Nt(()=>{if(!n||n==="DEMO"||!s)return;if(!window.Y){console.warn("Yjs not loaded, CRDT disabled");return}const _=window.Y,N=new _.Doc;ms.current=N;const C=ca.replace("http","ws")+"/crdt",q=window.WebsocketProvider||window.Y&&window.Y.WebsocketProvider;if(!q){console.warn("y-websocket not loaded, CRDT disabled");return}const F=new q(C,s,N,{params:{token:n}});Nr.current=F;const xe=F.awareness;Zi.current=xe,xe.setLocalStateField("user",{id:i,name:r,color:vt[0],nodeId:null});const Pe=()=>{const Ge={};xe.getStates().forEach((bt,mt)=>{mt!==xe.clientID&&bt.user&&(Ge[mt]=bt.user)}),wo(Ge)};return xe.on("change",Pe),()=>{xe.off("change",Pe),F.destroy(),N.destroy(),ms.current=null,Nr.current=null,Zi.current=null,wo({})}},[n,s]),Nt(()=>{Zi.current&&Zi.current.setLocalStateField("user",{id:i,name:r,color:vt[we%vt.length],nodeId:ce||null})},[ce]),Nt(()=>{var q;if(fe!=="terminal"||!st.current||nt.current)return;const _=new window.Terminal({fontFamily:"'JetBrains Mono', monospace",fontSize:12,lineHeight:1.5,cursorBlink:!0,theme:{background:pt.bg,foreground:pt.text,cursor:pt.cursor,selection:pt.selection,black:"#000000",red:pt.error,green:pt.prompt,yellow:pt.warn,blue:"#4285f4",magenta:"#bb9af7",cyan:pt.info,white:pt.text},allowProposedApi:!0,scrollback:5e3});nt.current=_;let N=null;window.FitAddon&&(N=new window.FitAddon.FitAddon,_.loadAddon(N),yt.current=N),_.open(st.current),N&&setTimeout(()=>N.fit(),50),_.writeln("\x1B[32mFORBIDDEN TERMINAL\x1B[0m"),n&&s?(_.writeln("\x1B[2mConnecting to workspace container...\x1B[0m"),(q=h.current)==null||q.emit("terminal:open",{workspaceId:s,sessionId:m.current,cols:_.cols,rows:_.rows}),Ut(!0),_.writeln(`\x1B[2mType to interact with the container shell.\x1B[0m\r
`)):(_.writeln(`\x1B[2m[DEMO MODE] Backend not connected. Showing local simulation.\x1B[0m\r
`),_.write("$ ")),_.onData(F=>{var xe;n&&((xe=h.current)!=null&&xe.connected)?h.current.emit("terminal:input",{workspaceId:s,sessionId:m.current,data:F}):F==="\r"?(_.writeln(""),_.write("\x1B[32m$\x1B[0m ")):F===""?_.write("\b \b"):_.write(F)});const C=new ResizeObserver(()=>{var F;N&&(N.fit(),(F=h.current)==null||F.emit("terminal:resize",{workspaceId:s,sessionId:m.current,cols:_.cols,rows:_.rows}))});return st.current&&C.observe(st.current),()=>{C.disconnect(),_.dispose(),nt.current=null,yt.current=null}},[fe]),Nt(()=>{hs.length===0||!nt.current||(hs.forEach(_=>nt.current.write(_)),ps([]))},[hs]);const Dr=_i((_,N)=>{var q;if(!((q=h.current)!=null&&q.connected))return;const C=ua();h.current.emit("node:"+(_==="NODE_CREATED"?"add":_==="NODE_EDITED"?"edit":_==="NODE_DELETED"?"delete":_==="NODE_JOINED"?"join":"cut"),{workspaceId:s,operatorId:i,sessionId:m.current,...C?{clientEventId:C}:{},...N})},[s,i]);Nt(()=>{var _;(_=hp.current)==null||_.scrollIntoView({behavior:"smooth"})},[dp]),Nt(()=>{const _=N=>{const C=N.target.tagName,q=C==="INPUT"||C==="TEXTAREA"||N.target.contentEditable==="true";(N.metaKey||N.ctrlKey)&&N.key==="p"&&(N.preventDefault(),he(F=>!F)),N.key==="Escape"&&(he(!1),Je(null),Rt(null),Jt(null),Po(null),Xa(!1),We||ve(null)),q||((N.key==="n"||N.key==="N")&&Te(!0),(N.key==="g"||N.key==="G")&&(oe(!0),ke([])),(N.key==="`"||N.key==="~")&&De(F=>F==="terminal"?null:"terminal"),(N.key==="j"||N.key==="J")&&Rt(F=>F==="join"?null:"join"),(N.key==="x"||N.key==="X")&&Rt(F=>F==="cut"?null:"cut"),(N.key==="a"||N.key==="A")&&G(F=>F==="ai"?null:"ai"),(N.key==="l"||N.key==="L")&&Ap(),(N.key==="Delete"||N.key==="Backspace")&&Be&&(z.current=z.current.filter(F=>F.id!==Be),D.current=D.current.filter(F=>F.source!==Be&&F.target!==Be),U({}),Dr("NODE_DELETED",{nodeId:Be})))};return window.addEventListener("keydown",_),()=>window.removeEventListener("keydown",_)},[We,Be]);const[mp,Ya]=ue(null),cu=lt(null),Uy=_=>{if(se(_),cu.current&&clearTimeout(cu.current),!_.trim()){Ya(null);return}if(!n){Ya(z.current.filter(N=>{var C;return((C=N.label)==null?void 0:C.toLowerCase().includes(_.toLowerCase()))||(N.code||"").toLowerCase().includes(_.toLowerCase())}));return}cu.current=setTimeout(async()=>{try{const N=await Ot(`/api/workspaces/${s}/search?q=${encodeURIComponent(_)}`,{},n);Ya(N.results||[])}catch{Ya(z.current.filter(N=>{var C;return(C=N.label)==null?void 0:C.toLowerCase().includes(_.toLowerCase())}))}},350)},gp=mp!==null?mp:z.current,yn=z.current.filter(_=>_.modified),uu=z.current;D.current.filter(_=>uu.find(N=>N.id===_.source)&&uu.find(N=>N.id===_.target));const xp=z.current.find(_=>_.id===(ce||Be)),vp=xp?Vg[xp.themeIdx%Vg.length]:"default",ft=z.current.find(_=>_.id===ce),Oy=`app-wrapper theme-${c} zone-${vp}`,ky=c==="brutal"?Iw[vp]:"#050505";Nt(()=>{let _;const N=()=>{let C=!1;const q=z.current,F=D.current,xe=q.reduce((Pe,Ge)=>Math.min(Pe,Ge.createdAt||Date.now()),Date.now());for(let Pe=0;Pe<q.length;Pe++)for(let Ge=Pe+1;Ge<q.length;Ge++){const bt=q[Ge].x-q[Pe].x,mt=q[Ge].y-q[Pe].y,tt=bt*bt+mt*mt||1,cn=Math.sqrt(tt),Bn=4200/tt;q[Pe].vx-=bt/cn*Bn,q[Pe].vy-=mt/cn*Bn,q[Ge].vx+=bt/cn*Bn,q[Ge].vy+=mt/cn*Bn}if(F.forEach(Pe=>{const Ge=q.find(_s=>_s.id===Pe.source),bt=q.find(_s=>_s.id===Pe.target);if(!Ge||!bt)return;const mt=bt.x-Ge.x,tt=bt.y-Ge.y,cn=Math.sqrt(mt*mt+tt*tt)||1,Bn=(cn-145)*.05;Ge.vx+=mt/cn*Bn,Ge.vy+=tt/cn*Bn,bt.vx-=mt/cn*Bn,bt.vy-=tt/cn*Bn}),q.forEach(Pe=>{const Ge=Pe.isMain?.2:.005;Pe.vx+=(0-Pe.x)*Ge,Pe.vy+=(0-Pe.y)*Ge,Pe.vx*=.8,Pe.vy*=.8,Pe.x+=Pe.vx,Pe.y+=Pe.vy,Pe.z=$r(Pe.createdAt||Date.now(),xe),(Math.abs(Pe.vx)>.05||Math.abs(Pe.vy)>.05)&&(C=!0)}),$a.current){const Pe=q.find(Ge=>Ge.id===$a.current.id);Pe&&(Pe.x=$a.current.x,Pe.y=$a.current.y,Pe.vx=0,Pe.vy=0,C=!0)}C&&U({}),_=requestAnimationFrame(N)};return _=requestAnimationFrame(N),()=>cancelAnimationFrame(_)},[]);const ys=_=>{J(N=>N.includes(_)?N:[...N,_]),ve(_)},Fy=_=>{Je(_)},yp=()=>Je(null),_p=()=>{const _=Pw(Ce,P);if(!_)return;const N="n"+Date.now(),C={id:N,label:_.label,type:P,isMain:!1,x:(Math.random()-.5)*300,y:(Math.random()-.5)*300,z:0,vx:0,vy:0,themeIdx:X,classId:null,code:_.code,language:_.language,modified:!1,createdAt:Date.now()};z.current=[...z.current,C],Te(!1),qe(""),E("function"),te(1),ys(N),U({}),Dr("NODE_CREATED",{nodeId:N,label:C.label,type:P,code:C.code,language:C.language,themeIdx:X,position:{x:C.x,y:C.y},createdAt:C.createdAt})},Sp=()=>{if(!Ne.trim()||me.length<2)return;const _="g"+Date.now();Cn.current=[...Cn.current,{id:_,name:Ne.trim(),color:ge,nodeIds:[...me]}],z.current=z.current.map(N=>me.includes(N.id)?{...N,classId:_}:N),oe(!1),Se(""),ke([]),U({})},zy=_=>{Cn.current=Cn.current.filter(N=>N.id!==_),z.current=z.current.map(N=>N.classId===_?{...N,classId:null}:N),We===_&&Je(null),U({})},By=_=>{if(ct==="join"){if(!Pt){Jt(_);return}if(Pt===_){Jt(null);return}D.current.find(C=>C.source===Pt&&C.target===_||C.source===_&&C.target===Pt)||(D.current=[...D.current,{id:"e"+Date.now(),source:Pt,target:_,edgeType:dt,label:""}],U({}),Dr("NODE_JOINED",{sourceId:Pt,targetId:_,edgeType:dt})),Jt(null)}},jy=_=>{if(ct==="cut"){const N=D.current.find(C=>C.id===_);D.current=D.current.filter(C=>C.id!==_),U({}),N&&Dr("NODE_CUT",{sourceId:N.source,targetId:N.target})}},Hy=(_,N)=>{z.current=z.current.map(C=>C.id===_?{...C,themeIdx:N}:C),Po(null),U({})},Mp={c1:"archived",c2:"todo",c3:"in-progress",c4:"in-progress",c5:"done"},Ep=_=>{if(!Ue.trim())return;const N="k"+Date.now(),C={id:N,colId:_,title:Ue.trim(),priority:"MED",tags:[],progress:0,due:"",assignee:we};Fe(q=>({...q,cards:[...q.cards,C]})),Ee(null),Oe(""),n&&s&&Ot(`/api/tasks/${s}`,{method:"POST",body:JSON.stringify({title:C.title,status:Mp[_]||"todo"})},n).then(q=>{if(q!=null&&q.task){const F=q.task._id||q.task.id;Fe(xe=>({...xe,cards:xe.cards.map(Pe=>Pe.id===N?{...Pe,id:F,_backendId:F}:Pe)}))}}).catch(()=>{})},Vy=(_,N)=>{Fe(F=>({...F,cards:F.cards.map(xe=>xe.id===_?{...xe,colId:N}:xe)}));const C=Ve.cards.find(F=>F.id===_),q=(C==null?void 0:C._backendId)||_;n&&s&&q&&!/^k\d/.test(q)&&Ot(`/api/tasks/${s}/${q}`,{method:"PATCH",body:JSON.stringify({status:Mp[N]||"todo"})},n).catch(()=>{})},bp=(_,N)=>Fe(C=>({...C,cards:C.cards.map(q=>q.id===_?{...q,...N}:q)})),Gy=_=>{const N=Ve.cards.find(q=>q.id===_);Fe(q=>({...q,cards:q.cards.filter(F=>F.id!==_)})),it(null);const C=(N==null?void 0:N._backendId)||_;n&&s&&C&&!/^k\d/.test(C)&&Ot(`/api/tasks/${s}/${C}`,{method:"DELETE"},n).catch(()=>{})},wp=_=>{var N;L(C=>({...C,[_]:""})),v(C=>({...C,[_]:"running"})),(N=h.current)==null||N.emit("node:run",{nodeId:_})},Tp=_i(async _=>{var F;if(ie(_),_>=100){Ae(!1);return}if(Ae(!0),!n||!s)return;const N=Ke;if(N.length===0)return;const C=Math.floor(_/100*(N.length-1)),q=(F=N[C])==null?void 0:F.createdAt;if(q)try{const Pe=((await Ot(`/api/events?workspaceId=${s}&limit=500`,{},n)).events||[]).filter(mt=>{var tt;return((tt=mt.meta)==null?void 0:tt.serverTimestamp)<=q}),Ge={},bt={};Pe.forEach(mt=>{var cn,Bn;const tt=mt.payload||{};if(mt.type==="NODE_CREATED")Ge[tt.nodeId]={id:tt.nodeId,label:tt.label||"Untitled",type:tt.type||"function",isMain:!1,x:((cn=tt.position)==null?void 0:cn.x)||0,y:((Bn=tt.position)==null?void 0:Bn.y)||0,vx:0,vy:0,themeIdx:0,classId:null,code:tt.code||"",modified:!1};else if(mt.type==="NODE_EDITED"&&Ge[tt.nodeId])Ge[tt.nodeId]={...Ge[tt.nodeId],code:tt.code??Ge[tt.nodeId].code};else if(mt.type==="NODE_DELETED")delete Ge[tt.nodeId];else if(mt.type==="NODE_JOINED"){const _s=`${tt.sourceId}-${tt.targetId}`;bt[_s]={id:_s,source:tt.sourceId,target:tt.targetId,edgeType:tt.edgeType||"default",label:tt.label||""}}else mt.type==="NODE_CUT"&&delete bt[`${tt.sourceId}-${tt.targetId}`]}),z.current=Object.values(Ge),D.current=Object.values(bt),U({})}catch(xe){console.warn("[scrubber] replay failed:",xe.message)}},[n,s,Ke]),Wy=async()=>{if(!(!n||!s)){B(!0);try{const _=await Ot(`/api/workspaces/${s}/share`,{method:"POST"},n);w(_.url)}catch{w("error")}finally{B(!1)}}},Xy=()=>{var N;const _=z.current.map(C=>C.id);(N=h.current)==null||N.emit("pipeline:run",{nodeIds:_})},Ap=_i(()=>{if(!window.dagre){console.warn("[layout] dagre not loaded");return}const _=new window.dagre.graphlib.Graph;_.setGraph({rankdir:"LR",nodesep:80,ranksep:140,marginx:60,marginy:60}),_.setDefaultEdgeLabel(()=>({}));const N=z.current.filter(q=>!q.pinned);N.forEach(q=>_.setNode(q.id,{width:60,height:60})),D.current.forEach(q=>{_.hasNode(q.source)&&_.hasNode(q.target)&&_.setEdge(q.source,q.target)}),window.dagre.layout(_);const C=N.map(q=>{const F=_.node(q.id);return F?{id:q.id,x:F.x-(_.graph().width||0)/2,y:F.y-(_.graph().height||0)/2}:null}).filter(Boolean);z.current=z.current.map(q=>{const F=C.find(xe=>xe.id===q.id);return F?{...q,x:F.x,y:F.y,vx:0,vy:0}:q}),U({}),C.forEach(({id:q,x:F,y:xe})=>{var Ge;const Pe=z.current.find(bt=>bt.id===q);Pe&&(Pe.z=0),(Ge=h.current)==null||Ge.emit("node:edit",{workspaceId:s,nodeId:q,position:{x:F,y:xe},operatorId:i,sessionId:m.current,...ua()?{clientEventId:ua()}:{}})})},[s,i]),Cp=async()=>{var C,q;if(!gi.trim()||zt)return;const _=z.current.find(F=>F.id===ce),N=gi.trim();gs(F=>[...F,{role:"user",content:N}]),xs(""),Zn(!0);try{const F=_?(_.edges||[]).slice(0,3).map(mt=>{const tt=z.current.find(cn=>cn.id===mt.targetId);return tt?`${tt.label} (${tt.language}):
${(tt.code||"").slice(0,300)}`:""}).filter(Boolean):[],xe=_?`You are an AI assistant embedded in the FORBIDDEN graph IDE. Current node: ${_.label} (${_.language}). Mode: ${Qn}.
Current code:
\`\`\`
${(_.code||"").slice(0,1500)}
\`\`\`
${F.length?`
Upstream nodes:
${F.join(`
---
`)}`:""}`:`You are an AI assistant in the FORBIDDEN graph IDE. Mode: ${Qn}. No file currently open.`,Ge=await(await fetch(`${ca.replace(/\/$/,"")}/api/ai/chat`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({messages:[...Jn,{role:"user",content:N}],system:xe})})).json(),bt=Ge.reply||((q=(C=Ge.content)==null?void 0:C[0])==null?void 0:q.text)||"(no response)";gs(mt=>[...mt,{role:"assistant",content:bt}])}catch(F){gs(xe=>[...xe,{role:"assistant",content:`Error: ${F.message}`}])}finally{Zn(!1)}},Rp=_i(()=>{const _=au.trim();if(!_)return;const N={id:Date.now(),from:r||"You",time:new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),text:_,self:!0};lu(C=>[...C,N]),up(""),n&&s&&Ot(`/api/messages/${s}`,{method:"POST",body:JSON.stringify({text:_,operatorId:i,operatorName:r})},n).catch(()=>{})},[au,n,s,i,r]),du=z.current.length,$y=D.current.length,Ur={HIGH:"#ff435a",MED:"#ffc410",LOW:"#4285f4",DONE:"#10b981"},Pp=Cn.current.find(_=>_.id===We)||null;return a.jsx("div",{style:{width:"100vw",height:"100vh",padding:c==="brutal"?"36px":"0px",backgroundColor:ky,transition:"all 0.4s ease",boxSizing:"border-box"},children:a.jsxs("div",{className:Oy,children:[a.jsxs("div",{className:"app-header",children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[a.jsxs("div",{className:"hdr-brand",children:[a.jsx(Ht.Zap,{}),"FORBIDDEN"]}),a.jsx("div",{style:{width:"1px",height:"18px",background:"rgba(128,128,128,0.2)"}}),a.jsxs("div",{className:"hdr-breadcrumb",children:[a.jsx("span",{style:{opacity:.3},children:o||"workspace"}),a.jsx("span",{style:{opacity:.2},children:"/"}),ft?a.jsxs(a.Fragment,{children:[a.jsx("span",{style:{color:vt[ft.themeIdx%vt.length],opacity:.9},children:ft.label}),a.jsx("span",{style:{opacity:.3,fontSize:"9px",marginLeft:"4px"},children:ft.type})]}):a.jsx("span",{style:{opacity:.25},children:"no file open"})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"5px",marginLeft:"12px"},children:[a.jsx("span",{style:{width:"5px",height:"5px",borderRadius:"50%",display:"inline-block",transition:"background 0.4s",background:y==="live"?"#10b981":y==="connecting"?"#ffc410":"#ff435a",boxShadow:y==="live"?"0 0 6px #10b981":y==="connecting"?"0 0 6px #ffc410":"0 0 6px #ff435a"}}),a.jsx("span",{style:{fontSize:"8px",opacity:.3,letterSpacing:"1px"},children:y.toUpperCase()})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"5px"},title:`Container: ${g}`,children:[a.jsx("span",{style:{width:"5px",height:"5px",borderRadius:"50%",display:"inline-block",background:g==="running"?"#10b981":g==="starting"?"#ffc410":g==="paused"?"#888":"#ff435a",boxShadow:g==="running"?"0 0 6px #10b981":g==="starting"?"0 0 6px #ffc410 0.4s infinite":""}}),a.jsx("span",{style:{fontSize:"8px",opacity:.25,letterSpacing:"1px"},children:"CTR"}),(g==="paused"||g==="dead")&&n&&a.jsx("button",{onClick:async()=>{d("starting"),await Ot(`/api/workspaces/${s}/wake`,{method:"POST"},n).catch(()=>{})},style:{fontSize:"8px",padding:"1px 5px",border:"1px solid rgba(255,200,0,0.3)",background:"transparent",color:"#ffc410",cursor:"pointer",borderRadius:"2px",letterSpacing:"1px"},children:"WAKE"})]})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"18px",fontSize:"10px"},children:[a.jsxs("span",{style:{opacity:.35,display:"flex",gap:"6px",alignItems:"center"},children:[a.jsx("span",{style:{width:"5px",height:"5px",borderRadius:"50%",background:"#10b981",display:"inline-block",boxShadow:"0 0 5px #10b981"}}),du," nodes"]}),a.jsx("span",{style:{opacity:.25},children:"·"}),a.jsxs("span",{style:{opacity:.35},children:[D.current.length," edges"]}),a.jsx("span",{style:{opacity:.25},children:"·"}),a.jsxs("span",{style:{opacity:.35},children:[Cn.current.length," groups"]}),yn.length>0&&a.jsxs(a.Fragment,{children:[a.jsx("span",{style:{opacity:.25},children:"·"}),a.jsxs("span",{style:{color:"#ffc410",opacity:.8},children:[yn.length," unsaved"]})]})]}),a.jsxs("div",{style:{display:"flex",gap:"6px",alignItems:"center"},children:[a.jsxs("button",{className:"btn hdr-pill",style:{display:"flex",alignItems:"center",gap:"6px"},onClick:()=>Te(!0),title:"Create file node (N)",children:[a.jsx("span",{style:{fontSize:"12px"},children:"＋"}),a.jsx("span",{children:"NODE"})]}),a.jsxs("button",{className:"btn hdr-pill",style:{display:"flex",alignItems:"center",gap:"5px",color:Ai?"#ffc410":"inherit"},onClick:Xy,disabled:Ai,title:"Run pipeline (all nodes in dependency order)",children:[a.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("polygon",{points:"5 3 19 12 5 21 5 3"}),a.jsx("line",{x1:"19",y1:"3",x2:"19",y2:"21"})]}),a.jsx("span",{children:"PIPELINE"})]}),a.jsxs("button",{className:"btn hdr-pill",style:{display:"flex",alignItems:"center",gap:"5px"},onClick:Wy,disabled:M,title:"Create read-only share link",children:[a.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"18",cy:"5",r:"3"}),a.jsx("circle",{cx:"6",cy:"12",r:"3"}),a.jsx("circle",{cx:"18",cy:"19",r:"3"}),a.jsx("line",{x1:"8.59",y1:"13.51",x2:"15.42",y2:"17.49"}),a.jsx("line",{x1:"15.41",y1:"6.51",x2:"8.59",y2:"10.49"})]}),a.jsx("span",{children:M?"..":"SHARE"})]}),a.jsxs("button",{className:"btn hdr-pill",style:{display:"flex",alignItems:"center",gap:"5px"},onClick:()=>H(_=>!_),title:"Browse workspace templates",children:[a.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[a.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),a.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),a.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),a.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]}),a.jsx("span",{children:"TEMPLATES"})]}),Object.keys(An).length>0&&a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px",padding:"4px 8px",border:"1px solid rgba(16,185,129,0.2)",borderRadius:"20px",background:"rgba(16,185,129,0.06)"},children:[Object.values(An).slice(0,3).map((_,N)=>a.jsx("div",{title:_.name,style:{width:"16px",height:"16px",borderRadius:"50%",background:_.color||"#10b981",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"8px",color:"#fff",fontWeight:"bold",marginLeft:N>0?"-4px":"0",border:"1.5px solid rgba(8,8,16,0.8)"},children:(_.name||"?")[0].toUpperCase()},N)),a.jsxs("span",{style:{fontSize:"9px",color:"#10b981",opacity:.7,marginLeft:"2px"},children:[Object.keys(An).length," ONLINE"]})]}),a.jsx("button",{className:"btn hdr-pill",onClick:()=>u(_=>_==="cyber"?"brutal":"cyber"),title:"Toggle theme",children:c==="cyber"?a.jsxs(a.Fragment,{children:[a.jsx("span",{style:{opacity:.5,marginRight:"4px"},children:"◐"}),"OBSIDIAN"]}):a.jsxs(a.Fragment,{children:[a.jsx("span",{style:{opacity:.5,marginRight:"4px"},children:"◑"}),"FORSAKEN"]})}),a.jsx("div",{style:{width:"1px",height:"18px",background:"rgba(128,128,128,0.15)"}}),a.jsxs("button",{className:"btn hdr-pill",style:{display:"flex",alignItems:"center",gap:"5px"},onClick:()=>he(!0),children:[a.jsx(Ht.Cmd,{}),a.jsx("span",{style:{opacity:.5},children:"⌘P"})]}),a.jsx("div",{style:{cursor:"pointer",display:"flex",alignItems:"center",padding:"2px",border:`1px solid ${W==="settings"?"rgba(128,128,128,0.4)":"rgba(128,128,128,0.12)"}`,borderRadius:"50%",transition:"border-color 0.2s"},onClick:()=>G(_=>_==="settings"?null:"settings"),children:a.jsx(Xr,{index:we,size:24})}),a.jsxs("button",{className:"btn hdr-pill",style:{display:"flex",alignItems:"center",gap:"5px",color:W==="ai"?"#10b981":"inherit",borderColor:W==="ai"?"rgba(16,185,129,0.4)":"undefined"},onClick:()=>G(_=>_==="ai"?null:"ai"),title:"AI Assistant (A)",children:[a.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("path",{d:"M12 2a10 10 0 1 0 10 10H12z"}),a.jsx("path",{d:"M12 12l4-4"}),a.jsx("circle",{cx:"12",cy:"12",r:"1"})]}),a.jsx("span",{children:"AI"})]}),l&&a.jsx("button",{className:"btn hdr-pill",style:{opacity:.4,fontSize:"9px"},onClick:l,title:"Logout",children:"⏻"})]})]}),a.jsxs("div",{className:"app-body",children:[a.jsxs("div",{className:"sidebar",children:[a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"2px",width:"100%",alignItems:"center",paddingTop:"6px"},children:[["files","EXPLORER",a.jsx(Ht.Files,{})],["search","SEARCH",a.jsx(Ht.Search,{})],["git","SOURCE CONTROL",a.jsxs(a.Fragment,{children:[a.jsx(Ht.Git,{}),yn.length>0&&a.jsx("div",{className:"badge",children:yn.length})]})],["chat","COMMS",a.jsx(Ht.Message,{})],["note","NOTES",a.jsx(Ht.Note,{})],["board","BOARD",a.jsx(Ht.Board,{})],["feed","ACTIVITY FEED",a.jsxs(a.Fragment,{children:[a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("path",{d:"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"}),a.jsx("path",{d:"M13.73 21a2 2 0 0 1-3.46 0"})]}),Lr>0&&a.jsx("div",{className:"badge",children:Lr>9?"9+":Lr})]})],["ai","AI ASSISTANT",a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),a.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}),a.jsx("circle",{cx:"12",cy:"16",r:"1"})]})]].map(([_,N,C])=>a.jsxs("div",{className:`strip-icon ${W===_?"active":""}`,onClick:()=>G(q=>q===_?null:_),children:[C,a.jsx("div",{className:"strip-icon-tooltip",children:N})]},_))}),a.jsx("div",{style:{flex:1}}),a.jsx("div",{style:{height:"1px",width:"26px",background:"rgba(128,128,128,0.15)",margin:"6px 0"}}),a.jsxs("div",{className:`strip-icon ${fe==="timeline"?"active":""}`,onClick:()=>De(_=>_==="timeline"?null:"timeline"),children:[a.jsx(Ht.Timeline,{}),a.jsx("div",{className:"strip-icon-tooltip",children:"TIMELINE"})]}),a.jsxs("div",{className:`strip-icon ${fe==="terminal"?"active":""}`,onClick:()=>De(_=>_==="terminal"?null:"terminal"),children:[a.jsx(Ht.Terminal,{}),a.jsx("div",{className:"strip-icon-tooltip",children:"TERMINAL"})]}),a.jsx("div",{style:{height:"1px",width:"26px",background:"rgba(128,128,128,0.15)",margin:"6px 0"}}),a.jsxs("div",{className:`strip-icon ${W==="uipalette"?"active":""}`,onClick:()=>G(_=>_==="uipalette"?null:"uipalette"),title:"UI Color Zone",children:[a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"M12 2a10 10 0 0 1 0 20"}),a.jsx("path",{d:"M2 12h20"})]}),a.jsx("div",{className:"strip-icon-tooltip",children:"UI COLOR ZONE"})]}),a.jsxs("div",{className:`strip-icon ${W==="codepalette"?"active":""}`,onClick:()=>G(_=>_==="codepalette"?null:"codepalette"),title:"Code Palette",children:[a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("polyline",{points:"16 18 22 12 16 6"}),a.jsx("polyline",{points:"8 6 2 12 8 18"})]}),a.jsx("div",{className:"strip-icon-tooltip",children:"CODE PALETTE"})]}),a.jsx("div",{style:{height:"1px",width:"26px",background:"rgba(128,128,128,0.15)",margin:"6px 0"}}),a.jsxs("div",{className:`strip-icon ${W==="settings"?"active":""}`,onClick:()=>G(_=>_==="settings"?null:"settings"),style:{borderRadius:"50%",padding:"0",border:W==="settings"?"2px solid var(--border)":"2px solid transparent",marginBottom:"6px"},children:[a.jsx(Xr,{index:we,size:26}),a.jsx("div",{className:"strip-icon-tooltip",children:"WORKSPACE"})]})]}),a.jsxs(Nn,{title:"EXPLORER",isOpen:W==="files",onClose:()=>G(null),defaultX:70,defaultY:70,defaultW:270,defaultH:480,children:[a.jsxs("div",{style:{padding:"8px 12px",borderBottom:"1px solid rgba(128,128,128,0.1)",display:"flex",gap:"6px",alignItems:"center"},children:[a.jsx("span",{style:{fontSize:"9px",opacity:.35,letterSpacing:"1px"},children:"GRAPH WORKSPACE"}),a.jsxs("span",{style:{marginLeft:"auto",fontSize:"9px",opacity:.3},children:[du," nodes · ",$y," edges"]})]}),a.jsx("div",{style:{flex:1,overflowY:"auto"},children:uu.map(_=>{const N=Cn.current.find(C=>C.nodeIds.includes(_.id));return a.jsxs("div",{className:"list-item",onClick:()=>ys(_.id),children:[a.jsx(Ht.FileIcon,{}),a.jsx("span",{style:{color:_.modified?"#ffc410":"inherit",flex:1},children:_.label}),N&&a.jsx("span",{style:{fontSize:"8px",color:N.color,padding:"1px 5px",border:`1px solid ${N.color}44`,borderRadius:"2px"},children:N.name}),_.modified&&a.jsx("span",{className:"list-item-sub",children:"M"})]},"e_"+_.id)})}),a.jsx("div",{style:{padding:"8px 12px",borderTop:"1px solid rgba(128,128,128,0.08)",display:"flex",gap:"6px"},children:a.jsxs("button",{className:"btn",style:{flex:1,fontSize:"9px",padding:"5px 8px"},onClick:()=>Te(!0),children:[a.jsx(Ht.Plus,{})," NEW FILE"]})})]}),a.jsxs(Nn,{title:"SEARCH",isOpen:W==="search",onClose:()=>G(null),defaultX:70,defaultY:70,defaultW:290,defaultH:420,children:[a.jsx("div",{style:{padding:"10px 12px",borderBottom:"1px solid rgba(128,128,128,0.1)"},children:a.jsx("input",{className:"side-input",value:ye,onChange:_=>Uy(_.target.value),placeholder:"Search labels and code...",autoFocus:W==="search"})}),a.jsxs("div",{style:{padding:"6px 14px",fontSize:"9px",opacity:.35,borderBottom:"1px solid rgba(128,128,128,0.07)"},children:[gp.length," RESULTS"]}),a.jsx("div",{style:{flex:1,overflowY:"auto"},children:gp.map(_=>a.jsxs("div",{className:"list-item",onClick:()=>ys(_.id),children:[a.jsx(Ht.FileIcon,{}),a.jsx("span",{style:{flex:1},children:_.label}),a.jsx("span",{className:"list-item-sub",children:_.type})]},"s_"+_.id))})]}),a.jsxs(Nn,{title:"SOURCE CONTROL",isOpen:W==="git",onClose:()=>G(null),defaultX:70,defaultY:70,defaultW:270,defaultH:400,children:[a.jsxs("div",{style:{padding:"8px 12px",borderBottom:"1px solid rgba(128,128,128,0.1)",fontSize:"9px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[a.jsx("span",{style:{opacity:.5},children:"main ← origin/main"}),a.jsxs("span",{style:{color:yn.length?"#ffc410":"#10b981"},children:[yn.length," unsaved"]})]}),a.jsx("div",{style:{flex:1,overflowY:"auto"},children:yn.length===0?a.jsx("div",{style:{padding:"20px",opacity:.3,fontSize:"10px",textAlign:"center"},children:"Working tree clean."}):yn.map(_=>a.jsxs("div",{className:"list-item",style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 12px"},onClick:()=>ys(_.id),children:[a.jsx(Ht.FileIcon,{}),a.jsx("span",{style:{color:"#ffc410",flex:1,fontSize:"10px"},children:_.label}),a.jsx("span",{style:{fontSize:"8px",color:"#ffc410",opacity:.7,fontFamily:"'JetBrains Mono',monospace"},children:"M"}),a.jsx("button",{style:{fontSize:"8px",padding:"2px 7px",background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:"3px",color:"#10b981",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace"},onClick:N=>{N.stopPropagation();const C=z.current.find(q=>q.id===_.id);C&&(C.modified=!1,U({}),Dr("NODE_EDITED",{nodeId:_.id,code:C.code,language:Fc(C.label),saved:!0}))},children:"SAVE"})]},"g_"+_.id))}),yn.length>0&&a.jsx("div",{style:{padding:"10px 12px",borderTop:"1px solid rgba(128,128,128,0.08)",flexShrink:0},children:a.jsxs("button",{className:"btn",style:{width:"100%",fontSize:"9px",color:"#10b981",borderColor:"rgba(16,185,129,0.3)",background:"rgba(16,185,129,0.05)"},onClick:()=>{z.current.forEach(_=>{_.modified&&(_.modified=!1,Dr("NODE_EDITED",{nodeId:_.id,code:_.code,language:Fc(_.label),saved:!0}))}),U({})},children:["✓ SAVE ALL ",yn.length," FILES"]})})]}),a.jsx(Nn,{title:"WORKSPACE",isOpen:W==="settings",onClose:()=>G(null),defaultX:70,defaultY:Math.max(50,window.innerHeight-500),defaultW:460,defaultH:460,children:a.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"},children:[a.jsxs("div",{style:{padding:"16px 20px",borderBottom:"1px solid rgba(128,128,128,0.1)"},children:[a.jsx("div",{style:{fontSize:"9px",opacity:.4,marginBottom:"10px",letterSpacing:"1.2px"},children:"OPERATOR IDENTITY"}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"14px"},children:[a.jsx("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:[0,1,2,3,4,5].map(_=>a.jsx(Xr,{index:_,size:40,selected:we===_,onClick:()=>j(_)},_))}),a.jsxs("div",{children:[a.jsx("div",{style:{fontWeight:"bold",fontSize:"12px",letterSpacing:"1px"},children:r||"OPERATOR"}),a.jsx("div",{style:{fontSize:"9px",opacity:.3,marginTop:"2px",fontFamily:"'JetBrains Mono',monospace"},children:i})]})]})]}),a.jsxs("div",{style:{padding:"16px 20px",borderBottom:"1px solid rgba(128,128,128,0.1)"},children:[a.jsx("div",{style:{fontSize:"9px",opacity:.4,marginBottom:"10px",letterSpacing:"1.2px"},children:"CURRENT WORKSPACE"}),a.jsxs("div",{style:{display:"flex",gap:"16px",fontSize:"10px"},children:[a.jsxs("div",{style:{flex:1},children:[a.jsx("div",{style:{fontWeight:"bold",fontSize:"13px",marginBottom:"4px"},children:o||"—"}),a.jsx("div",{style:{opacity:.3,fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",wordBreak:"break-all"},children:s})]}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"6px",fontSize:"9px",opacity:.5,textAlign:"right",flexShrink:0},children:[a.jsxs("span",{children:[z.current.length," nodes"]}),a.jsxs("span",{children:[D.current.length," edges"]}),a.jsxs("span",{children:[Cn.current.length," groups"]})]})]})]}),a.jsxs("div",{style:{padding:"16px 20px",borderBottom:"1px solid rgba(128,128,128,0.1)",flex:1,overflowY:"auto"},children:[a.jsxs("div",{style:{fontSize:"9px",opacity:.4,marginBottom:"10px",letterSpacing:"1.2px",display:"flex",justifyContent:"space-between"},children:[a.jsx("span",{children:"ONLINE OPERATORS"}),a.jsxs("span",{style:{color:"#10b981"},children:[Object.keys(An).length+1," ONLINE"]})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",padding:"6px 0",opacity:.7},children:[a.jsx(Xr,{index:we,size:28}),a.jsxs("div",{children:[a.jsxs("div",{style:{fontSize:"10px",fontWeight:"bold"},children:[r||"You"," ",a.jsx("span",{style:{color:"#10b981",fontSize:"8px",marginLeft:"4px"},children:"YOU"})]}),a.jsx("div",{style:{fontSize:"9px",opacity:.4},children:ce?((Np=z.current.find(_=>_.id===ce))==null?void 0:Np.label)||"editing":"browsing"})]})]}),Object.values(An).map((_,N)=>{var C;return a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",padding:"6px 0",borderTop:"1px solid rgba(255,255,255,0.04)"},children:[a.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"50%",background:_.color||"#4285f4",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",color:"#fff",fontWeight:"bold",flexShrink:0},children:(_.name||"?")[0].toUpperCase()}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:"10px",fontWeight:"bold"},children:_.name||"Operator"}),a.jsx("div",{style:{fontSize:"9px",opacity:.4},children:_.nodeId?((C=z.current.find(q=>q.id===_.nodeId))==null?void 0:C.label)||"editing":"browsing"})]}),a.jsx("div",{style:{marginLeft:"auto",width:"7px",height:"7px",borderRadius:"50%",background:"#10b981",boxShadow:"0 0 6px #10b981"}})]},N)}),Object.keys(An).length===0&&a.jsx("div",{style:{fontSize:"9px",opacity:.2,paddingTop:"8px"},children:"No other operators online"})]}),a.jsxs("div",{style:{padding:"12px 20px",display:"flex",gap:"8px",flexShrink:0,borderTop:"1px solid rgba(128,128,128,0.08)"},children:[a.jsx("button",{className:"btn",style:{fontSize:"9px",flex:1},onClick:()=>{G(null),H(!0)},children:"⬡ TEMPLATES"}),a.jsx("button",{className:"btn",style:{fontSize:"9px",flex:1},onClick:()=>G("feed"),children:"◈ ACTIVITY"}),a.jsx("button",{className:"btn",style:{fontSize:"9px",color:"#ff435a",borderColor:"rgba(255,67,90,0.3)"},onClick:()=>{confirm("Leave workspace?")&&window.location.reload()},children:"← LEAVE"})]})]})}),a.jsx(Nn,{title:"COMMUNICATIONS",isOpen:W==="chat",onClose:()=>G(null),defaultX:360,defaultY:70,defaultW:300,defaultH:400,children:a.jsxs("div",{className:"chat-wrap",children:[a.jsxs("div",{style:{padding:"6px 12px",borderBottom:"1px solid rgba(128,128,128,0.1)",fontSize:"9px",opacity:.4,display:"flex",gap:"10px",alignItems:"center"},children:[a.jsxs("span",{style:{color:"#10b981",display:"flex",alignItems:"center",gap:"4px"},children:[a.jsx("div",{style:{width:"5px",height:"5px",borderRadius:"50%",background:"#10b981"}}),Object.keys(An).length+1," online"]}),a.jsxs("span",{style:{marginLeft:"auto"},children:["#",o||"general"]})]}),a.jsxs("div",{className:"chat-messages",children:[dp.map(_=>a.jsxs("div",{className:`chat-msg ${_.self?"self":"other"}`,children:[a.jsxs("span",{style:{opacity:.5,fontSize:"9px"},children:[_.from," · ",_.time]}),a.jsx("br",{}),_.text]},_.id)),a.jsx("div",{ref:hp})]}),a.jsxs("div",{className:"chat-input-wrap",children:[a.jsx("input",{className:"side-input",value:au,onChange:_=>up(_.target.value),onKeyDown:_=>{_.key==="Enter"&&Rp()},placeholder:"Broadcast...",style:{flex:1,fontSize:"10px"}}),a.jsx("button",{className:"btn",style:{fontSize:"9px",flexShrink:0},onClick:Rp,children:"SEND"})]})]})}),a.jsxs(Nn,{title:"NOTES",isOpen:W==="note",onClose:()=>G(null),defaultX:100,defaultY:120,defaultW:300,defaultH:300,children:[a.jsxs("div",{style:{padding:"6px 12px",borderBottom:"1px solid rgba(128,128,128,0.08)",fontSize:"9px",opacity:.35,letterSpacing:"1px",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[a.jsx("span",{children:"OPERATOR SCRATCHPAD"}),a.jsxs("span",{style:{opacity:.6},children:[fp.split(`
`).length," lines"]})]}),a.jsx("textarea",{className:"code-area",value:fp,onChange:_=>Dy(_.target.value),style:{flex:1,width:"100%",resize:"none",color:"var(--text)",fontSize:"11px",fontFamily:"'JetBrains Mono',monospace",padding:"12px",background:"transparent",border:"none",outline:"none"},placeholder:"Personal notes...",spellCheck:"false"})]}),a.jsxs(Nn,{title:"UI COLOR ZONE",isOpen:W==="uipalette",onClose:()=>G(null),defaultX:70,defaultY:80,defaultW:260,defaultH:320,children:[a.jsx("div",{style:{padding:"8px 12px",borderBottom:"1px solid rgba(128,128,128,0.08)",fontSize:"9px",opacity:.35,letterSpacing:"1px"},children:"GLOBAL THEME ACCENT — controls node/zone colors"}),a.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"10px 12px",display:"flex",flexDirection:"column",gap:"12px"},children:[a.jsxs("div",{style:{padding:"10px 12px",background:"rgba(128,128,128,0.04)",border:"1px solid rgba(128,128,128,0.1)",borderRadius:"4px"},children:[a.jsx("div",{style:{fontSize:"8px",opacity:.35,letterSpacing:"1.3px",marginBottom:"6px"},children:"CURRENT ZONE"}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[a.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:vt[(ft==null?void 0:ft.themeIdx)%vt.length||0],boxShadow:`0 0 8px ${vt[(ft==null?void 0:ft.themeIdx)%vt.length||0]}`}}),a.jsx("span",{style:{fontSize:"10px",fontWeight:"bold"},children:(ft==null?void 0:ft.label)||"No file open"})]}),a.jsx("div",{style:{fontSize:"9px",opacity:.35,marginTop:"4px"},children:"Open a node to see its zone color"})]}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:"8px",opacity:.35,letterSpacing:"1.3px",marginBottom:"7px"},children:"ALL ACCENT COLORS"}),a.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"7px"},children:vt.map((_,N)=>a.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",cursor:"default"},children:[a.jsx("div",{style:{width:"22px",height:"22px",borderRadius:"50%",background:_,boxShadow:`0 0 6px ${_}66`,border:"1.5px solid rgba(255,255,255,0.08)"}}),a.jsx("span",{style:{fontSize:"7px",opacity:.3,fontFamily:"'JetBrains Mono',monospace"},children:N})]},N))})]}),a.jsxs("div",{style:{padding:"10px 12px",background:"rgba(128,128,128,0.03)",border:"1px solid rgba(128,128,128,0.08)",borderRadius:"4px",fontSize:"9px",opacity:.45,lineHeight:"1.7"},children:[a.jsx("strong",{children:"HOW IT WORKS"}),a.jsx("br",{}),"Each node carries a color index (0–15). The active open file's color tints the entire UI zone — border, background, text. Click the color dot on any node label to change its color."]})]})]}),(()=>{const N=Wf(`def process(data):
    # transform input
    result = []
    for x in data:
        if x > 0:
            result.append(x * 2)
    return result`);return a.jsxs(Nn,{title:"CODE PALETTE",isOpen:W==="codepalette",onClose:()=>G(null),defaultX:70,defaultY:80,defaultW:340,defaultH:560,children:[a.jsxs("div",{style:{padding:"8px 12px",borderBottom:"1px solid rgba(128,128,128,0.08)",fontSize:"9px",letterSpacing:"1px",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[a.jsx("span",{style:{opacity:.35},children:"EDITOR SYNTAX COLORS"}),a.jsx("span",{style:{color:je.kw,fontSize:"9px",fontWeight:"bold",opacity:.8},children:je.name})]}),a.jsxs("div",{style:{margin:"10px 12px 0",borderRadius:"6px",overflow:"hidden",border:`1px solid ${je.lineNum}44`,flexShrink:0},children:[a.jsxs("div",{style:{background:je.bg,padding:"3px 10px 3px 6px",display:"flex",gap:"5px",alignItems:"center",borderBottom:`1px solid ${je.lineNum}44`},children:[["#ff5f57","#febc2e","#28c840"].map((C,q)=>a.jsx("div",{style:{width:"7px",height:"7px",borderRadius:"50%",background:C,opacity:.7}},q)),a.jsx("span",{style:{fontSize:"8px",color:je.base,opacity:.4,marginLeft:"4px",fontFamily:"'JetBrains Mono',monospace"},children:"preview.py"})]}),a.jsx("div",{className:"editor-palette-scope",style:{background:je.bg,padding:"10px 12px","--syn-kw":je.kw,"--syn-str":je.str,"--syn-cmt":je.cmt,"--syn-num":je.num,"--syn-fn":je.fn,"--syn-bi":je.bi,"--syn-op":je.op},ref:C=>{C&&Object.entries({"--syn-kw":je.kw,"--syn-str":je.str,"--syn-cmt":je.cmt,"--syn-num":je.num,"--syn-fn":je.fn,"--syn-bi":je.bi,"--syn-op":je.op}).forEach(([q,F])=>C.style.setProperty(q,F))},children:a.jsx("pre",{style:{margin:0,fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",lineHeight:"1.65",color:je.base},dangerouslySetInnerHTML:{__html:N}})}),a.jsx("div",{style:{display:"flex",height:"4px",background:je.bg},children:[je.kw,je.str,je.fn,je.num,je.bi,je.cmt].map((C,q)=>a.jsx("div",{style:{flex:1,background:C,opacity:.8}},q))})]}),a.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"8px 12px",display:"flex",flexDirection:"column",gap:"4px"},children:[a.jsx("div",{style:{fontSize:"8px",opacity:.3,letterSpacing:"1.5px",padding:"4px 0 6px",fontFamily:"'JetBrains Mono',monospace"},children:"DARK"}),so.filter(C=>!["github","gruvlight","papercolor","flexoki"].includes(C.id)).map(C=>a.jsxs("div",{onClick:()=>pp(C),style:{display:"flex",alignItems:"center",gap:"10px",padding:"7px 10px",borderRadius:"5px",cursor:"pointer",background:je.id===C.id?C.bg+"ee":C.bg+"55",border:`1px solid ${je.id===C.id?C.swatches[0]+"88":"rgba(255,255,255,0.04)"}`,transition:"all 0.12s"},children:[a.jsx("div",{style:{display:"flex",gap:"3px",flexShrink:0},children:C.swatches.map((q,F)=>a.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:q}},F))}),a.jsx("span",{style:{fontSize:"10px",color:C.base,fontFamily:"'JetBrains Mono',monospace",flex:1,fontWeight:je.id===C.id?"bold":"normal"},children:C.name}),je.id===C.id&&a.jsx("div",{style:{width:"5px",height:"5px",borderRadius:"50%",background:C.swatches[0],boxShadow:`0 0 5px ${C.swatches[0]}`}})]},C.id)),a.jsx("div",{style:{fontSize:"8px",opacity:.3,letterSpacing:"1.5px",padding:"8px 0 6px",fontFamily:"'JetBrains Mono',monospace"},children:"LIGHT"}),so.filter(C=>["github","gruvlight","papercolor","flexoki"].includes(C.id)).map(C=>a.jsxs("div",{onClick:()=>pp(C),style:{display:"flex",alignItems:"center",gap:"10px",padding:"7px 10px",borderRadius:"5px",cursor:"pointer",background:je.id===C.id?C.bg+"ee":C.bg+"cc",border:`1px solid ${je.id===C.id?C.swatches[0]:"rgba(0,0,0,0.08)"}`,transition:"all 0.12s"},children:[a.jsx("div",{style:{display:"flex",gap:"3px",flexShrink:0},children:C.swatches.map((q,F)=>a.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:q}},F))}),a.jsx("span",{style:{fontSize:"10px",color:C.base,fontFamily:"'JetBrains Mono',monospace",flex:1,fontWeight:je.id===C.id?"bold":"normal"},children:C.name}),je.id===C.id&&a.jsx("div",{style:{width:"5px",height:"5px",borderRadius:"50%",background:C.swatches[0],boxShadow:`0 0 5px ${C.swatches[0]}`}})]},C.id))]})]})})(),a.jsx(Nn,{title:"PLANNING BOARD",isOpen:W==="board",onClose:()=>G(null),defaultX:100,defaultY:50,defaultW:920,defaultH:520,children:(()=>{const _=Ve.cards.filter(C=>C.colId==="c5").length,N=Ve.cards.length;return a.jsxs("div",{className:"board-wrap",style:{position:"relative"},children:[a.jsxs("div",{className:"board-topbar",children:[a.jsx("span",{style:{fontSize:"11px",fontWeight:"bold",opacity:.8,letterSpacing:"0.8px"},children:"FORBIDDEN / SPRINT-01"}),a.jsx("div",{style:{display:"flex",gap:"5px",marginLeft:"10px"},children:[0,1,2].map(C=>a.jsx(Xr,{index:C,size:16},C))}),a.jsxs("div",{className:"board-meta",children:[a.jsxs("span",{children:[_,"/",N," DONE"]}),a.jsxs("span",{style:{color:"#ffc410"},children:[Ve.cards.filter(C=>C.priority==="HIGH"&&C.colId!=="c5").length," HIGH-PRI"]})]})]}),a.jsx("div",{style:{height:"2px",background:"rgba(128,128,128,0.08)",flexShrink:0},children:a.jsx("div",{style:{height:"100%",width:`${_/Math.max(N,1)*100}%`,background:"#10b981",transition:"width 0.4s"}})}),a.jsx("div",{className:"board-cols",children:Ve.cols.map(C=>{const q=Ve.cards.filter(F=>F.colId===C.id);return a.jsxs("div",{className:"board-col",children:[a.jsxs("div",{className:"board-col-hdr",style:{background:C.color+"14",borderLeft:"2px solid "+C.color},children:[a.jsx("span",{style:{color:C.color},children:C.title}),a.jsx("span",{className:"board-col-count",style:{color:C.color},children:q.length})]}),q.map(F=>a.jsxs("div",{className:"board-card",onClick:()=>it(F.id),children:[a.jsx("div",{className:"board-card-accent",style:{background:Ur[F.priority]||"#555"}}),a.jsx("div",{className:"board-card-title",children:F.title}),F.tags.length>0&&a.jsx("div",{className:"board-card-tags",children:F.tags.map(xe=>a.jsx("span",{className:"board-tag",style:{color:C.color,borderColor:C.color+"33",background:C.color+"0e"},children:xe},xe))}),F.progress>0&&a.jsx("div",{className:"board-progress",children:a.jsx("div",{className:"board-progress-bar",style:{width:`${F.progress}%`,background:F.progress===100?"#10b981":Ur[F.priority]}})}),a.jsxs("div",{className:"board-card-footer",children:[a.jsx("span",{className:"board-priority",style:{color:Ur[F.priority],background:Ur[F.priority]+"14"},children:F.priority}),F.due&&a.jsxs("span",{children:["📅 ",F.due]}),F.assignee!=null&&a.jsx("div",{style:{marginLeft:"auto"},children:a.jsx(Xr,{index:F.assignee,size:13})})]})]},F.id)),Y===C.id?a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"5px",padding:"7px",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"4px",background:"rgba(255,255,255,0.02)"},children:[a.jsx("input",{className:"create-modal-input",value:Ue,onChange:F=>Oe(F.target.value),onKeyDown:F=>{F.key==="Enter"&&Ep(C.id),F.key==="Escape"&&Ee(null)},placeholder:"Card title...",autoFocus:!0,style:{fontSize:"10px",padding:"5px 9px"}}),a.jsxs("div",{style:{display:"flex",gap:"5px"},children:[a.jsx("button",{className:"editor-toolbar-btn",onClick:()=>Ep(C.id),style:{flex:1,justifyContent:"center",fontSize:"9px"},children:"ADD"}),a.jsx("button",{className:"editor-toolbar-btn",onClick:()=>Ee(null),style:{color:"#ff435a"},children:"✕"})]})]}):a.jsx("div",{className:"board-add-card",onClick:()=>{Ee(C.id),Oe("")},children:"+ ADD CARD"})]},C.id)})}),ze&&(()=>{const C=Ve.cards.find(F=>F.id===ze);if(!C)return null;const q=Ve.cols.find(F=>F.id===C.colId);return a.jsx("div",{className:"card-detail-overlay",onClick:()=>it(null),children:a.jsxs("div",{className:"card-detail-box",onClick:F=>F.stopPropagation(),children:[a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",gap:"8px"},children:[a.jsx("div",{style:{fontSize:"12px",fontWeight:"bold",lineHeight:1.4,flex:1},children:C.title}),a.jsx("div",{style:{cursor:"pointer",opacity:.5},onClick:()=>it(null),children:"✕"})]}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:"9px",opacity:.4,marginBottom:"6px",letterSpacing:"1px"},children:"PRIORITY"}),a.jsx("div",{style:{display:"flex",gap:"5px",flexWrap:"wrap"},children:["HIGH","MED","LOW","DONE"].map(F=>a.jsx("button",{className:"editor-toolbar-btn",onClick:()=>bp(C.id,{priority:F}),style:{color:Ur[F],borderColor:C.priority===F?Ur[F]:"rgba(128,128,128,0.2)",background:C.priority===F?Ur[F]+"14":"transparent",fontSize:"9px"},children:F},F))})]}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:"9px",opacity:.4,marginBottom:"6px",letterSpacing:"1px"},children:"MOVE TO"}),a.jsx("div",{style:{display:"flex",gap:"5px",flexWrap:"wrap"},children:Ve.cols.map(F=>a.jsx("button",{className:"editor-toolbar-btn",onClick:()=>Vy(C.id,F.id),style:{color:F.id===C.colId?F.color:"inherit",borderColor:F.id===C.colId?F.color:"rgba(128,128,128,0.2)",fontSize:"9px"},children:F.title},F.id))})]}),a.jsxs("div",{children:[a.jsxs("div",{style:{fontSize:"9px",opacity:.4,marginBottom:"5px",letterSpacing:"1px"},children:["PROGRESS — ",C.progress,"%"]}),a.jsx("input",{type:"range",min:"0",max:"100",value:C.progress,onChange:F=>bp(C.id,{progress:+F.target.value}),style:{width:"100%",accentColor:q?q.color:"#10b981"}})]}),a.jsx("button",{className:"editor-toolbar-btn",onClick:()=>Gy(C.id),style:{color:"#ff435a",borderColor:"#ff435a33",justifyContent:"center",fontSize:"9px"},children:"DELETE CARD"})]})})})()]})})()}),a.jsxs(Nn,{title:a.jsx("div",{style:{display:"flex",gap:"14px"},children:["terminal","timeline"].map(_=>a.jsx("span",{style:{cursor:"pointer",opacity:fe===_?1:.4,transition:"opacity 0.2s"},onClick:()=>De(_),children:_.toUpperCase()},_))}),isOpen:!!fe,onClose:()=>De(null),defaultX:180,defaultY:window.innerHeight-320,defaultW:780,defaultH:270,children:[fe==="terminal"&&a.jsxs("div",{style:{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",background:pt.bg,transition:"background 0.3s"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",padding:"5px 10px",borderBottom:`1px solid ${pt.border}`,background:pt.bg,flexShrink:0,minHeight:"32px"},children:[a.jsx("div",{style:{display:"flex",gap:"5px",marginRight:"4px"},children:["#ff5f57","#febc2e","#28c840"].map((_,N)=>a.jsx("div",{style:{width:"9px",height:"9px",borderRadius:"50%",background:_,opacity:.7}},N))}),a.jsx("div",{style:{width:"1px",height:"14px",background:pt.border,opacity:.6}}),a.jsx("span",{style:{fontSize:"9px",color:pt.prompt,fontFamily:"'JetBrains Mono',monospace",letterSpacing:"1px",opacity:.8},children:"TERMINAL"}),n&&s&&a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px",marginLeft:"8px"},children:[a.jsx("span",{style:{width:"5px",height:"5px",borderRadius:"50%",display:"inline-block",background:Kt?"#10b981":"#ff435a"}}),a.jsx("span",{style:{fontSize:"8px",opacity:.35,letterSpacing:"1px"},children:Kt?"PTY LIVE":"DISCONNECTED"})]}),a.jsxs("div",{style:{marginLeft:"auto",display:"flex",gap:"5px",alignItems:"center",position:"relative"},children:[a.jsx("button",{onClick:()=>{var _;(_=nt.current)==null||_.clear()},style:{padding:"3px 8px",border:`1px solid ${pt.border}`,borderRadius:"3px",background:"transparent",color:pt.dim,fontFamily:"'JetBrains Mono',monospace",fontSize:"8px",cursor:"pointer",letterSpacing:"0.8px",transition:"all 0.15s"},onMouseEnter:_=>{_.target.style.color=pt.error,_.target.style.borderColor=pt.error},onMouseLeave:_=>{_.target.style.color=pt.dim,_.target.style.borderColor=pt.border},children:"CLR"}),a.jsxs("button",{onClick:()=>Xa(_=>!_),style:{padding:"3px 10px",border:`1px solid ${Wa?pt.prompt:pt.border}`,borderRadius:"3px",background:Wa?pt.prompt+"18":"transparent",color:Wa?pt.prompt:pt.dim,fontFamily:"'JetBrains Mono',monospace",fontSize:"8px",cursor:"pointer",letterSpacing:"0.8px",display:"flex",alignItems:"center",gap:"5px",transition:"all 0.15s"},children:[a.jsx("div",{style:{width:"7px",height:"7px",borderRadius:"50%",background:pt.prompt,boxShadow:`0 0 5px ${pt.prompt}`}}),pt.name,a.jsx("span",{style:{opacity:.5,fontSize:"7px"},children:"▾"})]}),Wa&&a.jsxs("div",{style:{position:"absolute",top:"calc(100% + 6px)",right:0,zIndex:9999,background:"#0a0a0e",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"8px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px",minWidth:"300px",boxShadow:"0 16px 50px rgba(0,0,0,0.9)",maxHeight:"320px",overflowY:"auto"},onClick:_=>_.stopPropagation(),children:[a.jsx("div",{style:{gridColumn:"1/-1",fontSize:"8px",opacity:.3,letterSpacing:"1.5px",fontFamily:"'JetBrains Mono',monospace",padding:"2px 4px 6px"},children:"TERMINAL THEME"}),jg.map(_=>a.jsxs("div",{onClick:()=>{Iy(_),Xa(!1),nt.current&&(nt.current.options.theme={background:_.bg,foreground:_.text,cursor:_.cursor,selection:_.selection})},style:{display:"flex",alignItems:"center",gap:"8px",padding:"7px 10px",borderRadius:"5px",cursor:"pointer",background:pt.id===_.id?_.bg+"dd":_.bg+"88",border:`1px solid ${pt.id===_.id?_.prompt:_.border}`,transition:"all 0.12s"},children:[a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[_.prompt,_.error,_.warn,_.info].map((N,C)=>a.jsx("div",{style:{width:"16px",height:"3px",borderRadius:"1px",background:N,opacity:.9}},C))}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:"9px",color:_.text,fontFamily:"'JetBrains Mono',monospace",fontWeight:"bold"},children:_.name}),a.jsx("div",{style:{fontSize:"7px",color:_.dim,fontFamily:"'JetBrains Mono',monospace",marginTop:"1px"},children:_.bg})]}),pt.id===_.id&&a.jsx("div",{style:{marginLeft:"auto",width:"5px",height:"5px",borderRadius:"50%",background:_.prompt,boxShadow:`0 0 6px ${_.prompt}`}})]},_.id))]})]})]}),a.jsx("div",{ref:st,style:{flex:1,minHeight:0,overflow:"hidden",padding:"4px"},onClick:()=>{var _;Xa(!1),(_=nt.current)==null||_.focus()}})]}),fe==="timeline"&&a.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"},children:[a.jsxs("div",{style:{padding:"8px 14px 6px",borderBottom:"1px solid rgba(255,255,255,0.05)",flexShrink:0,background:"rgba(0,0,0,0.2)"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"},children:[a.jsx("span",{style:{fontSize:"8px",opacity:.35,letterSpacing:"2px",whiteSpace:"nowrap",fontFamily:"'JetBrains Mono',monospace"},children:"HISTORY"}),a.jsxs("div",{style:{flex:1,position:"relative",height:"20px",display:"flex",alignItems:"center"},children:[a.jsx("div",{style:{position:"absolute",inset:"0 0 0 0",display:"flex",alignItems:"center",pointerEvents:"none"},children:Ke.slice(0,40).map((_,N)=>a.jsx("div",{style:{position:"absolute",left:`${N/Math.max(Ke.length-1,1)*100}%`,width:"2px",height:"8px",background:_.accentColor||"rgba(255,255,255,0.15)",borderRadius:"1px",transform:"translateX(-50%)"}},N))}),a.jsx("input",{type:"range",min:"0",max:"100",step:"1",value:le,onChange:_=>Tp(Number(_.target.value)),style:{width:"100%",appearance:"none",height:"3px",background:`linear-gradient(to right, rgba(16,185,129,0.6) ${le}%, rgba(255,255,255,0.1) ${le}%)`,borderRadius:"2px",outline:"none",cursor:"pointer",position:"relative",zIndex:1}})]}),_e?a.jsx("button",{onClick:()=>Tp(100),style:{padding:"3px 10px",background:"rgba(255,67,90,0.12)",border:"1px solid rgba(255,67,90,0.3)",color:"#ff435a",borderRadius:"4px",fontSize:"8px",cursor:"pointer",fontFamily:"inherit",letterSpacing:"1px",whiteSpace:"nowrap",flexShrink:0},children:"↩ LIVE"}):a.jsx("span",{style:{fontSize:"8px",opacity:.3,letterSpacing:"1px",whiteSpace:"nowrap",flexShrink:0},children:"LIVE ●"})]}),_e&&a.jsx("div",{style:{fontSize:"8px",color:"#ff435a",opacity:.75,letterSpacing:"1px",textAlign:"center",padding:"2px 0",background:"rgba(255,67,90,0.07)",borderRadius:"3px"},children:"◀ HISTORY — READ ONLY — drag slider right to return to live"})]}),a.jsx("div",{style:{flex:1,overflowY:"auto",padding:"4px 0"},children:Le.length===0?a.jsx("div",{style:{textAlign:"center",padding:"32px",opacity:.2,fontSize:"11px",letterSpacing:"2px",fontFamily:"'JetBrains Mono',monospace"},children:n?"NO EVENTS YET":"CONNECT TO BACKEND TO SEE TIMELINE"}):Le.map((_,N)=>a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",padding:"6px 14px",borderBottom:"1px solid rgba(128,128,128,0.06)",cursor:"default",opacity:_e&&N===0?1:_e?.5:1,transition:"opacity 0.2s"},onMouseEnter:C=>C.currentTarget.style.background="rgba(255,255,255,0.02)",onMouseLeave:C=>C.currentTarget.style.background="transparent",children:[a.jsx("span",{style:{fontSize:"14px",minWidth:"18px",textAlign:"center"},children:_.icon||"◈"}),a.jsx("span",{style:{fontSize:"10px",flex:1,opacity:.7},children:_.label}),a.jsx("span",{style:{fontSize:"9px",opacity:.3,fontFamily:"'JetBrains Mono',monospace",whiteSpace:"nowrap"},children:_.createdAt?new Date(_.createdAt).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):""}),_.accentColor&&a.jsx("span",{style:{width:"4px",height:"4px",borderRadius:"50%",background:_.accentColor,flexShrink:0}})]},_.eventId||N))})]}),fe==="audit"&&a.jsx(Bw,{token:n,workspaceId:s})]}),a.jsx(Nn,{title:a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:["ACTIVITY FEED",Lr>0&&a.jsx("span",{style:{background:"#ff435a",color:"#fff",borderRadius:"10px",padding:"1px 6px",fontSize:"8px",fontWeight:"bold"},children:Lr})]}),isOpen:W==="feed",onClose:()=>{G(null),Ao(0),Ot("/api/feed/read-all",{method:"POST"},n).catch(()=>{})},defaultX:70,defaultY:70,defaultW:300,defaultH:500,children:a.jsx("div",{style:{flex:1,overflowY:"auto"},children:To.length===0?a.jsx("div",{style:{textAlign:"center",padding:"40px 20px",opacity:.2,fontSize:"10px",letterSpacing:"1px"},children:n?"No activity yet":"Connect to see activity"}):To.map((_,N)=>a.jsxs("div",{className:"list-item",style:{padding:"10px 14px",borderBottom:"1px solid rgba(128,128,128,0.08)",display:"flex",gap:"10px",alignItems:"flex-start"},children:[a.jsx("span",{style:{fontSize:"15px",flexShrink:0,marginTop:"1px"},children:_.icon||"◈"}),a.jsxs("div",{style:{flex:1,minWidth:0},children:[a.jsx("div",{style:{fontSize:"10px",opacity:.75,lineHeight:"1.5",wordBreak:"break-word"},children:_.label||_.type}),a.jsx("div",{style:{fontSize:"9px",opacity:.3,marginTop:"3px",fontFamily:"'JetBrains Mono',monospace"},children:_.createdAt?new Date(_.createdAt).toLocaleString("en-US",{hour:"2-digit",minute:"2-digit",month:"short",day:"numeric"}):""})]}),_.accentColor&&a.jsx("div",{style:{width:"3px",borderRadius:"2px",background:_.accentColor,alignSelf:"stretch",flexShrink:0}})]},_.eventId||N))})}),a.jsxs(Nn,{title:a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[a.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"#10b981",strokeWidth:"2",children:[a.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),a.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),"AI ASSISTANT"]}),isOpen:W==="ai",onClose:()=>G(null),defaultX:70,defaultY:70,defaultW:360,defaultH:540,children:[a.jsx("div",{style:{display:"flex",gap:"4px",padding:"8px 12px",borderBottom:"1px solid rgba(128,128,128,0.08)"},children:["explain","debug","refactor"].map(_=>a.jsx("button",{onClick:()=>vn(_),style:{flex:1,padding:"4px 0",fontSize:"9px",letterSpacing:"1px",border:`1px solid ${Qn===_?"rgba(16,185,129,0.5)":"rgba(255,255,255,0.08)"}`,background:Qn===_?"rgba(16,185,129,0.1)":"transparent",color:Qn===_?"#10b981":"inherit",cursor:"pointer",borderRadius:"3px",fontFamily:"inherit",textTransform:"uppercase"},children:_},_))}),ce&&a.jsxs("div",{style:{padding:"6px 12px",fontSize:"9px",opacity:.35,borderBottom:"1px solid rgba(128,128,128,0.05)"},children:[" Context: ",((Lp=z.current.find(_=>_.id===ce))==null?void 0:Lp.label)||"current node"]}),a.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"8px 12px",display:"flex",flexDirection:"column",gap:"10px"},children:[Jn.length===0&&a.jsxs("div",{style:{textAlign:"center",padding:"30px 10px",opacity:.2,fontSize:"10px",lineHeight:"1.7"},children:["Ask me to explain, debug, or refactor your current node's code.",a.jsx("br",{}),"I can see upstream nodes too."]}),Jn.map((_,N)=>a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"3px",alignItems:_.role==="user"?"flex-end":"flex-start"},children:[a.jsx("div",{style:{fontSize:"8px",opacity:.3,letterSpacing:"1px"},children:_.role==="user"?"YOU":"AI"}),a.jsx("div",{style:{maxWidth:"90%",padding:"8px 11px",borderRadius:"6px",fontSize:"10px",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word",background:_.role==="user"?"rgba(16,185,129,0.12)":"rgba(255,255,255,0.04)",border:`1px solid ${_.role==="user"?"rgba(16,185,129,0.2)":"rgba(255,255,255,0.06)"}`},children:_.content})]},N)),zt&&a.jsx("div",{style:{fontSize:"10px",opacity:.4,padding:"4px 0"},children:"▋ thinking..."})]}),a.jsxs("div",{style:{padding:"8px 12px",borderTop:"1px solid rgba(128,128,128,0.08)",display:"flex",gap:"6px"},children:[a.jsx("input",{value:gi,onChange:_=>xs(_.target.value),onKeyDown:_=>_.key==="Enter"&&!_.shiftKey&&(_.preventDefault(),Cp()),placeholder:`${Qn.charAt(0).toUpperCase()+Qn.slice(1)} this code...`,style:{flex:1,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"inherit",padding:"7px 10px",fontSize:"10px",borderRadius:"4px",outline:"none",fontFamily:"inherit"}}),a.jsx("button",{onClick:Cp,disabled:zt||!gi.trim(),style:{padding:"7px 12px",background:"rgba(16,185,129,0.15)",border:"1px solid rgba(16,185,129,0.3)",color:"#10b981",cursor:"pointer",borderRadius:"4px",fontSize:"10px",fontFamily:"inherit"},children:"▶"})]})]}),k&&a.jsx("div",{style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.7)",zIndex:1e3,display:"flex",alignItems:"center",justifyContent:"center"},onClick:()=>w(null),children:a.jsxs("div",{style:{background:"#0d0d1a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",padding:"28px",width:"420px",maxWidth:"90vw"},onClick:_=>_.stopPropagation(),children:[a.jsx("div",{style:{fontSize:"10px",opacity:.35,letterSpacing:"2px",marginBottom:"14px"},children:"SHARE LINK CREATED"}),k==="error"?a.jsx("div",{style:{color:"#ff435a",fontSize:"10px"},children:"Failed to create share link. Connect to backend first."}):a.jsxs(a.Fragment,{children:[a.jsx("div",{style:{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"5px",padding:"10px 12px",fontSize:"10px",fontFamily:"'JetBrains Mono',monospace",wordBreak:"break-all",color:"#10b981",marginBottom:"14px"},children:k}),a.jsx("div",{style:{fontSize:"9px",opacity:.3,marginBottom:"14px"},children:"Read-only snapshot. Expires in 24 hours."}),a.jsxs("div",{style:{display:"flex",gap:"8px"},children:[a.jsx("button",{onClick:()=>{navigator.clipboard.writeText(k).catch(()=>{})},style:{flex:1,padding:"8px",background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.3)",color:"#10b981",cursor:"pointer",borderRadius:"4px",fontSize:"10px",fontFamily:"inherit"},children:"COPY LINK"}),a.jsx("button",{onClick:()=>w(null),style:{padding:"8px 14px",background:"transparent",border:"1px solid rgba(255,255,255,0.1)",color:"inherit",cursor:"pointer",borderRadius:"4px",fontSize:"10px",fontFamily:"inherit"},children:"CLOSE"})]})]})]})}),Ro.length>0&&a.jsxs("div",{style:{position:"fixed",bottom:"20px",right:"20px",width:"320px",background:"rgba(8,8,16,0.95)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px",padding:"12px",zIndex:900,fontFamily:"'JetBrains Mono',monospace",fontSize:"9px"},children:[a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[a.jsxs("span",{style:{opacity:.4,letterSpacing:"2px"},children:["PIPELINE ",Ai?"▶ RUNNING":"■ DONE"]}),!Ai&&a.jsx("button",{onClick:()=>vs([]),style:{background:"transparent",border:"none",color:"inherit",opacity:.3,cursor:"pointer",fontSize:"10px"},children:"✕"})]}),a.jsxs("div",{style:{overflowY:"auto",maxHeight:"160px",display:"flex",flexDirection:"column",gap:"2px"},children:[Ro.map((_,N)=>a.jsx("div",{style:{opacity:.7,lineHeight:"1.6",color:_.includes("✗")||_.includes("failed")?"#ff435a":_.includes("✓")||_.includes("complete")?"#10b981":"inherit"},children:_},N)),Ai&&a.jsx("div",{style:{opacity:.4},children:"▋"})]})]}),a.jsxs(Nn,{title:"WORKSPACE TEMPLATES",isOpen:T,onClose:()=>H(!1),defaultX:Math.max(70,window.innerWidth/2-240),defaultY:Math.max(50,window.innerHeight/2-280),defaultW:480,defaultH:520,children:[a.jsx("div",{style:{padding:"10px 14px 4px",opacity:.35,fontSize:"9px",letterSpacing:"1px"},children:"Click a template to scaffold it into the current workspace."}),a.jsx("div",{style:{flex:1,overflowY:"auto",padding:"8px"},children:(K.length===0?[{id:"fastapi-service",name:"FastAPI Service",description:"FastAPI + Pydantic + SQLAlchemy",icon:"⚡",nodeCount:4},{id:"react-component",name:"React Component",description:"TS component + hook + CSS + test",icon:"⚛",nodeCount:4},{id:"data-pipeline",name:"Data Pipeline",description:"Source → Transform → Sink",icon:"⟳",nodeCount:5},{id:"cli-tool",name:"CLI Tool",description:"argparse + commands + utils",icon:"$_",nodeCount:3},{id:"rest-client",name:"REST Client",description:"HTTP client explorer + auth",icon:"↗",nodeCount:3}]:K).map(_=>a.jsxs("div",{className:"list-item",style:{padding:"14px",borderRadius:"6px",marginBottom:"6px",border:"1px solid rgba(255,255,255,0.06)",cursor:"pointer",display:"flex",gap:"12px",alignItems:"center",transition:"all 0.15s"},onMouseEnter:N=>{N.currentTarget.style.borderColor="rgba(16,185,129,0.3)",N.currentTarget.style.background="rgba(16,185,129,0.04)"},onMouseLeave:N=>{N.currentTarget.style.borderColor="rgba(255,255,255,0.06)",N.currentTarget.style.background="transparent"},onClick:async()=>{if(!n||!s){H(!1);return}try{await Ot(`/api/workspaces/${s}`,{method:"POST",body:JSON.stringify({templateId:_.id})},n);const N=await Ot(`/api/nodes/${s}`,{},n),C=zg(N);C.length>0&&(z.current=C.map(q=>{var F,xe;return{id:q.id,label:q.label,type:q.type||"function",isMain:q.isMain||!1,x:((F=q.position)==null?void 0:F.x)||(Math.random()-.5)*400,y:((xe=q.position)==null?void 0:xe.y)||(Math.random()-.5)*300,z:0,vx:0,vy:0,themeIdx:q.themeIdx??0,classId:q.groupId||null,code:q.code||"",modified:!1,language:q.language||"python",createdAt:q.createdAt?new Date(q.createdAt).getTime():Date.now()}}),U({})),H(!1)}catch(N){console.warn("Template apply failed:",N.message)}},children:[a.jsx("div",{style:{fontSize:"22px",flexShrink:0,width:"38px",height:"38px",borderRadius:"7px",background:"rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"center"},children:_.icon||"⬡"}),a.jsxs("div",{style:{flex:1,minWidth:0},children:[a.jsx("div",{style:{fontSize:"12px",fontWeight:"bold",letterSpacing:"0.5px"},children:_.name}),a.jsx("div",{style:{fontSize:"10px",opacity:.4,marginTop:"3px"},children:_.description}),a.jsxs("div",{style:{fontSize:"8px",opacity:.25,marginTop:"4px",letterSpacing:"0.5px"},children:[_.nodeCount||"?"," nodes"]})]}),a.jsx("span",{style:{opacity:.2,fontSize:"14px"},children:"→"})]},_.id))})]}),a.jsxs("div",{className:"main-view",children:[a.jsxs("div",{className:"graph-mode-bar",children:[a.jsx("span",{style:{fontSize:"8px",opacity:.3,letterSpacing:"1.5px",fontFamily:"'JetBrains Mono',monospace"},children:"GRAPH"}),a.jsx("div",{style:{width:"1px",height:"14px",background:"rgba(255,255,255,0.1)"}}),a.jsxs("button",{className:`graph-mode-btn ${ct==="join"?"active-join":""}`,onClick:()=>{Rt(_=>_==="join"?null:"join"),Jt(null)},title:"Join two nodes with an edge (J)",children:[ct==="join"&&a.jsx("span",{className:"join-pulse"}),ct==="join"?Pt?"→ CLICK TARGET":"→ CLICK SOURCE":"⟶ JOIN"]}),ct==="join"&&a.jsx("select",{value:dt,onChange:_=>$e(_.target.value),style:{fontSize:"9px",padding:"3px 6px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",color:"inherit",borderRadius:"3px",cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.5px"},children:["default","imports","calls","data-flow","inherits","test"].map(_=>a.jsx("option",{value:_,children:_.toUpperCase()},_))}),a.jsxs("button",{className:`graph-mode-btn ${ct==="cut"?"active-cut":""}`,onClick:()=>{Rt(_=>_==="cut"?null:"cut"),Jt(null)},title:"Remove an edge by clicking it (X)",children:[ct==="cut"&&a.jsx("span",{className:"cut-pulse"}),ct==="cut"?"✂ HOVER EDGE":"✂ CUT"]}),a.jsx("div",{style:{width:"1px",height:"14px",background:"rgba(255,255,255,0.08)"}}),a.jsx("button",{className:"graph-mode-btn",onClick:Ap,title:"Auto-layout graph with Dagre (L)",style:{color:"rgba(200,200,255,0.6)",borderColor:"rgba(130,130,200,0.2)"},children:"⟴ LAYOUT"}),ct&&a.jsxs("button",{className:"graph-mode-btn",style:{color:"rgba(255,255,255,0.25)",fontSize:"8px",letterSpacing:"0.5px"},onClick:()=>{Rt(null),Jt(null)},children:["ESC ",a.jsx("span",{style:{opacity:.4,fontFamily:"system-ui",marginLeft:"1px"},children:"⎋"})]})]}),a.jsx($w,{nodesRef:z,edgesRef:D,groupsRef:Cn,nodeExecStatus:x,peers:An,hoveredNodeId:Be,setHoveredNodeId:Xe,edgeMode:ct,joinFirstNode:Pt,hoveredEdgeId:Ir,setHoveredEdgeId:_t,openNodeInEditor:ys,handleNodeClickInMode:By,handleEdgeClickInMode:jy,setNodeColorPicker:Po,runNode:wp,activeTabId:ce,socketRef:h,workspaceId:s,operatorId:i,sessionIdRef:m,AVATAR_ACCENTS:vt,showCreateNode:Me,setShowCreateNode:Te}),a.jsx(Hw,{groups:Cn.current,nodes:z.current,onOpen:Fy,onRemove:zy}),Ci&&(()=>{const _=z.current.find(N=>N.id===Ci.nodeId);return _?a.jsxs("div",{style:{position:"fixed",left:Ci.x,top:Ci.y,zIndex:9999,background:"rgba(8,8,20,0.98)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:"8px",padding:"10px",display:"flex",flexWrap:"wrap",gap:"7px",width:"168px",boxShadow:"0 12px 40px rgba(0,0,0,0.9)",backdropFilter:"blur(8px)"},onPointerDown:N=>N.stopPropagation(),children:[a.jsx("div",{style:{width:"100%",fontSize:"8px",opacity:.35,letterSpacing:"1.3px",fontFamily:"'JetBrains Mono',monospace",marginBottom:"2px"},children:"NODE COLOR"}),["#8888aa","#ff435a","#ffc410","#1e836d","#4285f4","#28f1c3","#ff1650","#bb9af7","#5ccfe6","#ffbd5e","#e36209","#72f1b8","#ff8080","#89ddff","#e5c07b","#4ec9b0"].map((N,C)=>a.jsx("div",{style:{width:"20px",height:"20px",borderRadius:"50%",background:N,cursor:"pointer",border:_.themeIdx===C?"2.5px solid #fff":"2px solid transparent",boxShadow:_.themeIdx===C?`0 0 10px ${N}`:"none",transition:"all 0.12s",flexShrink:0},onClick:q=>{q.stopPropagation(),Hy(Ci.nodeId,C)}},C)),a.jsxs("div",{style:{width:"100%",borderTop:"1px solid rgba(255,255,255,0.08)",marginTop:"3px",paddingTop:"6px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[a.jsx("button",{style:{fontSize:"8px",padding:"3px 8px",background:"rgba(255,67,90,0.12)",border:"1px solid rgba(255,67,90,0.3)",borderRadius:"3px",color:"#ff435a",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",letterSpacing:"0.5px"},onClick:N=>{N.stopPropagation(),z.current=z.current.filter(C=>C.id!==Ci.nodeId),D.current=D.current.filter(C=>C.source!==Ci.nodeId&&C.target!==Ci.nodeId),Cn.current=Cn.current.map(C=>({...C,nodeIds:C.nodeIds.filter(q=>q!==Ci.nodeId)})),Po(null),U({})},children:"DELETE NODE"}),a.jsx("button",{style:{fontSize:"8px",padding:"3px 8px",background:"transparent",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"3px",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace"},onClick:N=>{N.stopPropagation(),Po(null)},children:"✕"})]})]}):null})()]})]}),a.jsxs("div",{className:"status-bar",children:[a.jsxs("div",{className:"status-group",children:[a.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[a.jsx("span",{className:"status-dot",style:{background:"#10b981",boxShadow:"0 0 5px #10b981"}}),"CONNECTED"]}),a.jsx("span",{style:{opacity:.3},children:"|"}),a.jsxs("span",{children:[du," NODES · ",D.current.length," EDGES"]}),a.jsx("span",{style:{opacity:.3},children:"|"}),a.jsx("span",{style:{opacity:.6},children:c.toUpperCase()}),ct&&a.jsxs(a.Fragment,{children:[a.jsx("span",{style:{opacity:.3},children:"|"}),a.jsx("span",{style:{color:ct==="join"?"#10b981":"#ff435a",fontWeight:"bold",letterSpacing:"1px"},children:ct==="join"?Pt?"JOIN: SELECT TARGET":"JOIN: SELECT SOURCE":"CUT MODE — HOVER EDGE TO DELETE"})]})]}),a.jsx("div",{className:"status-group",style:{gap:"10px"},children:[["N","node"],["G","group"],["J","join"],["X","cut"],["`","term"]].map(([_,N])=>a.jsxs("span",{style:{opacity:.25,fontSize:"9px",display:"flex",gap:"3px",alignItems:"center"},children:[a.jsx("span",{style:{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"2px",padding:"1px 4px",fontFamily:"'JetBrains Mono',monospace"},children:_}),a.jsx("span",{children:N})]},_))}),a.jsxs("div",{className:"status-group",children:[a.jsx("span",{style:{color:"#ffc410",fontWeight:"bold",fontSize:"10px"},children:o||"WORKSPACE"}),a.jsx("span",{style:{opacity:.3},children:"|"}),a.jsx("span",{style:{color:yn.length>0?"#ffc410":"#10b981",fontWeight:yn.length>0?"bold":"normal",fontSize:"9px"},children:yn.length>0?`● ${yn.length} unsaved`:"✓ all saved"}),a.jsx("span",{style:{opacity:.3},children:"|"}),a.jsx("span",{style:{opacity:.4,cursor:"pointer"},onClick:()=>he(!0),children:"⌘P"}),a.jsx("span",{style:{opacity:.3},children:"|"}),a.jsx("span",{style:{opacity:.4},children:p})]})]}),Me&&a.jsx("div",{className:"create-modal",onPointerDown:()=>Te(!1),children:a.jsxs("div",{className:"create-modal-box",onPointerDown:_=>_.stopPropagation(),style:{maxWidth:"560px",width:"90vw"},children:[a.jsx("div",{className:"create-modal-title",children:"CREATE FILE NODE"}),a.jsxs("div",{style:{display:"flex",gap:"16px",flex:1,minHeight:0},children:[a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"14px",flex:1,minWidth:0},children:[a.jsxs("div",{className:"create-modal-field",children:[a.jsx("div",{className:"create-modal-label",children:"NAME"}),a.jsx("input",{className:"create-modal-input",value:Ce,onChange:_=>qe(_.target.value),onKeyDown:_=>_.key==="Enter"&&_p(),placeholder:"my_function",autoFocus:!0})]}),a.jsxs("div",{className:"create-modal-field",children:[a.jsx("div",{className:"create-modal-label",children:"TYPE"}),a.jsx("div",{className:"type-grid",children:["function","entry","helper","hook","util","class"].map(_=>a.jsx("button",{className:`type-btn ${P===_?"selected":""}`,onClick:()=>E(_),children:_},_))})]}),a.jsxs("div",{className:"create-modal-field",children:[a.jsx("div",{className:"create-modal-label",children:"NODE COLOR"}),a.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"7px",marginTop:"2px"},children:["#8888aa","#ff435a","#ffc410","#1e836d","#4285f4","#28f1c3","#ff1650","#bb9af7","#5ccfe6","#ffbd5e","#e36209","#72f1b8","#ff8080","#89ddff","#e5c07b","#4ec9b0"].map((_,N)=>a.jsx("div",{className:`color-dot-btn ${X===N?"selected":""}`,style:{background:_,boxShadow:X===N?`0 0 10px ${_}`:"none"},onClick:()=>te(N),title:_},N))})]})]}),a.jsxs("div",{style:{width:"210px",flexShrink:0,display:"flex",flexDirection:"column",gap:"8px"},children:[a.jsx("div",{style:{fontSize:"9px",opacity:.35,letterSpacing:"1px",marginBottom:"2px"},children:"CODE PALETTE PREVIEW"}),a.jsxs("div",{style:{borderRadius:"5px",overflow:"hidden",border:`1px solid ${je.lineNum}55`,flex:1},children:[a.jsxs("div",{style:{background:je.bg,padding:"4px 8px",borderBottom:`1px solid ${je.lineNum}44`,display:"flex",alignItems:"center",gap:"5px"},children:[["#ff5f57","#febc2e","#28c840"].map((_,N)=>a.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:_,opacity:.7}},N)),a.jsxs("span",{style:{fontSize:"8px",marginLeft:"4px",color:vt[X%vt.length],fontFamily:"'JetBrains Mono',monospace",opacity:.8},children:[Ce||"untitled",".py"]})]}),a.jsx("div",{className:"editor-palette-scope",style:{background:je.bg,padding:"8px 10px"},ref:_=>{_&&[["--syn-kw",je.kw],["--syn-str",je.str],["--syn-cmt",je.cmt],["--syn-num",je.num],["--syn-fn",je.fn],["--syn-bi",je.bi],["--syn-op",je.op]].forEach(([N,C])=>_.style.setProperty(N,C))},children:a.jsx("pre",{style:{margin:0,fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",lineHeight:"1.65",color:je.base},dangerouslySetInnerHTML:{__html:Wf(`def ${Ce||"untitled"}():
    # ${P} node
    result = []
    return result`)}})}),a.jsx("div",{style:{display:"flex",height:"3px"},children:[je.kw,je.str,je.fn,je.num,je.bi].map((_,N)=>a.jsx("div",{style:{flex:1,background:_}},N))})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",padding:"6px 8px",background:"rgba(128,128,128,0.04)",borderRadius:"4px",border:"1px solid rgba(128,128,128,0.08)"},children:[a.jsx("div",{style:{display:"flex",gap:"3px"},children:je.swatches.map((_,N)=>a.jsx("div",{style:{width:"7px",height:"7px",borderRadius:"50%",background:_}},N))}),a.jsx("span",{style:{fontSize:"9px",flex:1,opacity:.6,fontFamily:"'JetBrains Mono',monospace"},children:je.name}),a.jsx("button",{style:{fontSize:"8px",padding:"2px 6px",border:"1px solid rgba(128,128,128,0.2)",borderRadius:"3px",background:"transparent",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace'",whiteSpace:"nowrap"},onClick:()=>G("codepalette"),children:"CHANGE"})]})]})]}),a.jsxs("div",{className:"create-modal-actions",children:[a.jsx("button",{className:"btn",style:{flex:1,borderColor:"rgba(16,185,129,0.5)",color:"#10b981",background:"rgba(16,185,129,0.05)"},onClick:_p,children:"CREATE"}),a.jsx("button",{className:"btn",onClick:()=>Te(!1),children:"CANCEL"})]})]})}),Z&&a.jsx("div",{className:"create-modal",onPointerDown:()=>oe(!1),children:a.jsxs("div",{className:"create-modal-box",onPointerDown:_=>_.stopPropagation(),children:[a.jsx("div",{className:"create-modal-title",children:"GROUP AS CLASS"}),a.jsxs("div",{className:"create-modal-field",children:[a.jsx("div",{className:"create-modal-label",children:"CLASS NAME"}),a.jsx("input",{className:"create-modal-input",value:Ne,onChange:_=>Se(_.target.value),onKeyDown:_=>_.key==="Enter"&&Sp(),placeholder:"MyClass",autoFocus:!0})]}),a.jsxs("div",{className:"create-modal-field",children:[a.jsx("div",{className:"create-modal-label",children:"THREAD COLOR"}),a.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"7px",marginTop:"2px"},children:["#10b981","#ff435a","#ffc410","#4285f4","#28f1c3","#ff1650","#bb9af7","#5ccfe6","#ffbd5e","#e36209","#72f1b8","#ff8080","#89ddff","#e5c07b","#4ec9b0","#c792ea"].map(_=>a.jsx("div",{className:`color-dot-btn ${ge===_?"selected":""}`,style:{background:_,boxShadow:ge===_?`0 0 10px ${_}`:"none"},onClick:()=>He(_),title:_},_))})]}),a.jsxs("div",{className:"create-modal-field",children:[a.jsx("div",{className:"create-modal-label",children:"MEMBER NODES (min 2)"}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"4px",maxHeight:"170px",overflowY:"auto",marginTop:"4px"},children:z.current.map(_=>a.jsxs("div",{onClick:()=>ke(N=>N.includes(_.id)?N.filter(C=>C!==_.id):[...N,_.id]),style:{padding:"7px 10px",border:"1px solid "+(me.includes(_.id)?ge:"rgba(128,128,128,0.15)"),background:me.includes(_.id)?ge+"10":"transparent",borderRadius:"3px",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",transition:"all 0.12s"},children:[a.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:me.includes(_.id)?ge:"rgba(128,128,128,0.25)",flexShrink:0}}),a.jsx("span",{style:{fontSize:"10px",flex:1,color:me.includes(_.id)?ge:"inherit"},children:_.label}),a.jsx("span",{style:{fontSize:"9px",opacity:.3},children:_.type})]},_.id))})]}),a.jsxs("div",{style:{fontSize:"9px",opacity:.35},children:[me.length," selected (need ≥2)"]}),a.jsxs("div",{className:"create-modal-actions",children:[a.jsx("button",{className:"btn",onClick:Sp,style:{flex:1,borderColor:me.length>=2&&Ne.trim()?ge+"88":"rgba(128,128,128,0.2)",color:me.length>=2&&Ne.trim()?ge:"rgba(128,128,128,0.3)"},children:"CREATE CLASS"}),a.jsx("button",{className:"btn",onClick:()=>oe(!1),children:"CANCEL"})]})]})}),ce&&a.jsx("div",{className:"grp-editor-overlay",onPointerDown:()=>ve(null),children:ft&&(()=>{const _=Cn.current.find(F=>F.nodeIds.includes(ft.id)),N=vt[ft.themeIdx%vt.length],C=(ft.code||"").split(`
`).length,q=(ft.code||"").trim()?(ft.code||"").trim().split(/\s+/).length:0;return a.jsxs("div",{className:"grp-editor-shell",onPointerDown:F=>F.stopPropagation(),children:[a.jsxs("div",{className:"grp-editor-chrome",children:[a.jsx("div",{className:"grp-chrome-dot",style:{background:"#ff5f57"},onClick:()=>ve(null)}),a.jsx("div",{className:"grp-chrome-dot",style:{background:"#febc2e"}}),a.jsx("div",{className:"grp-chrome-dot",style:{background:"#28c840"}}),a.jsx("div",{className:"grp-chrome-sep"}),a.jsx("div",{style:{display:"flex",gap:"0",overflow:"hidden",flex:1,borderRadius:"4px",background:"rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.06)"},children:Ye.map(F=>{const xe=z.current.find(bt=>bt.id===F);if(!xe)return null;const Pe=vt[xe.themeIdx%vt.length],Ge=ce===F;return a.jsxs("div",{onClick:()=>ve(F),style:{display:"flex",alignItems:"center",gap:"7px",padding:"5px 12px",cursor:"pointer",fontSize:"10px",fontFamily:"'JetBrains Mono',monospace",borderRight:"1px solid rgba(255,255,255,0.06)",background:Ge?"rgba(255,255,255,0.06)":"transparent",borderBottom:Ge?`2px solid ${Pe}`:"2px solid transparent",whiteSpace:"nowrap",transition:"all 0.15s",color:Ge?Pe:"rgba(255,255,255,0.4)",minWidth:"100px",justifyContent:"space-between"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"5px"},children:[a.jsx(Ht.FileIcon,{}),a.jsx("span",{children:xe.label}),xe.modified&&a.jsx("span",{style:{width:"5px",height:"5px",borderRadius:"50%",background:"#ffc410",display:"inline-block"}})]}),a.jsx("span",{style:{opacity:.35,cursor:"pointer",padding:"1px 3px",marginLeft:"4px"},onClick:bt=>{bt.stopPropagation();const mt=Ye.filter(tt=>tt!==F);J(mt),ce===F&&ve(mt.length?mt[mt.length-1]:null)},children:"✕"})]},F)})}),a.jsxs("span",{className:"grp-chrome-meta",style:{marginLeft:"10px"},children:[Ye.length," OPEN"]}),a.jsx("button",{className:"editor-toolbar-btn",style:{marginLeft:"8px",fontSize:"9px",flexShrink:0},onClick:()=>ve(null),children:"✕ CLOSE"})]}),a.jsxs("div",{className:"grp-editor-body",children:[a.jsxs("div",{className:"grp-sidebar",children:[a.jsxs("div",{className:"grp-sidebar-hdr",children:[a.jsx("div",{className:"grp-sidebar-sup",children:"FILE INFO"}),a.jsx("div",{className:"grp-sidebar-classname",style:{color:N},children:ft.label})]}),a.jsxs("div",{style:{padding:"10px 14px 10px",borderBottom:"1px solid rgba(255,255,255,0.05)"},children:[a.jsx("div",{style:{fontSize:"8px",opacity:.3,letterSpacing:"1.3px",marginBottom:"8px",fontFamily:"'JetBrains Mono',monospace"},children:"METADATA"}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"5px"},children:[["TYPE",ft.type],["STATUS",ft.modified?"MODIFIED":"CLEAN"],["GROUP",_?_.name:"—"]].map(([F,xe])=>a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"9px",fontFamily:"'JetBrains Mono',monospace"},children:[a.jsx("span",{style:{opacity:.3},children:F}),a.jsx("span",{style:{color:F==="STATUS"?ft.modified?"#ffc410":"#10b981":F==="GROUP"&&_?_.color:N,fontWeight:"bold"},children:xe})]},F))})]}),a.jsxs("div",{style:{padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"},children:[a.jsx("div",{style:{padding:"4px 14px 6px",fontSize:"8px",opacity:.3,letterSpacing:"1.3px",fontFamily:"'JetBrains Mono',monospace"},children:"OPEN FILES"}),Ye.map(F=>{const xe=z.current.find(Ge=>Ge.id===F);if(!xe)return null;const Pe=vt[xe.themeIdx%vt.length];return a.jsxs("div",{className:`grp-member-row ${ce===F?"active":""}`,style:{borderLeftColor:ce===F?Pe:"transparent",color:Pe},onClick:()=>ve(F),children:[a.jsx("div",{className:"grp-member-dot",style:{background:Pe,boxShadow:ce===F?`0 0 6px ${Pe}`:"none"}}),a.jsxs("div",{className:"grp-member-info",children:[a.jsx("div",{className:"grp-member-fname",children:xe.label}),a.jsx("div",{className:"grp-member-ftype",children:xe.type.toUpperCase()})]}),xe.modified&&a.jsx("div",{style:{width:"5px",height:"5px",borderRadius:"50%",background:"#ffc410",flexShrink:0}})]},F)})]}),a.jsxs("div",{className:"grp-sidebar-stats",children:[a.jsx("div",{style:{fontSize:"8px",opacity:.3,letterSpacing:"1.3px",marginBottom:"3px",fontFamily:"'JetBrains Mono',monospace"},children:"STATS"}),a.jsxs("div",{className:"grp-stat-row",children:[a.jsx("span",{className:"grp-stat-label",children:"LINES"}),a.jsx("span",{className:"grp-stat-val",style:{color:"#10b981"},children:C})]}),a.jsxs("div",{className:"grp-stat-row",children:[a.jsx("span",{className:"grp-stat-label",children:"WORDS"}),a.jsx("span",{className:"grp-stat-val",style:{color:"#ffc410"},children:q})]}),a.jsxs("div",{className:"grp-stat-row",children:[a.jsx("span",{className:"grp-stat-label",children:"SIZE"}),a.jsxs("span",{className:"grp-stat-val",style:{color:"#4285f4"},children:[((ft.code||"").length/1024).toFixed(1),"kb"]})]}),a.jsxs("div",{className:"grp-stat-row",children:[a.jsx("span",{className:"grp-stat-label",children:"OPEN TABS"}),a.jsx("span",{className:"grp-stat-val",style:{color:N},children:Ye.length})]})]})]}),a.jsx("div",{style:{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0},children:a.jsx(Lw,{node:ft,externalPalette:je,onRun:n?wp:null,execOutput:b[ft.id]||"",execStatus:x[ft.id]||"idle",ydoc:ms.current,awareness:Zi.current,onChange:F=>{const xe=z.current.find(Pe=>Pe.id===ft.id);xe&&(xe.code=F,xe.modified=!0,U({})),v(Pe=>({...Pe,[ft.id]:"idle"})),ft._editTimer&&clearTimeout(ft._editTimer),ft._editTimer=setTimeout(()=>{Dr("NODE_EDITED",{nodeId:ft.id,code:F,language:ft.language||"python"})},800)}})})]})]})})()}),Pp&&a.jsx(Vw,{group:Pp,nodes:z.current,onClose:yp,onOpenNode:_=>{yp(),ys(_)}})]})})}function Ww({initialTheme:t,initialAvatar:e,token:n,operatorId:i,operatorName:r,workspaceId:s,workspaceName:o,onLogout:l}){const[c,u]=ue(!1);return Nt(()=>{const p=f=>{(f.metaKey||f.ctrlKey)&&f.key==="p"&&(f.preventDefault(),u(h=>!h)),f.key==="Escape"&&u(!1)};return window.addEventListener("keydown",p),()=>window.removeEventListener("keydown",p)},[]),a.jsxs(a.Fragment,{children:[a.jsx(Gw,{initialTheme:t,initialAvatar:e,token:n,operatorId:i,operatorName:r,workspaceId:s,workspaceName:o,onLogout:l}),a.jsx(jw,{isOpen:c,onClose:()=>u(!1),onAction:()=>{}})]})}function Xw({token:t,operatorId:e,operatorName:n,avatar:i,theme:r,onSelect:s}){const[o,l]=ue([]),[c,u]=ue(!0),[p,f]=ue(!1),[h,m]=ue(""),[y,S]=ue("");Nt(()=>{Ot("/api/workspaces",{},t).then(d=>{l(Array.isArray(d)?d:d.workspaces||[]),u(!1)}).catch(()=>{u(!1),S("Could not load workspaces")})},[t]);const g=async()=>{if(h.trim()){f(!0);try{const d=await Ot("/api/workspaces",{method:"POST",body:JSON.stringify({name:h.trim()})},t);s(d.workspaceId,d.name||h.trim())}catch(d){S(d.message),f(!1)}}};return a.jsx("div",{className:"login-container",children:a.jsxs("div",{className:"login-box",style:{maxWidth:"520px"},children:[a.jsxs("div",{style:{textAlign:"center"},children:[a.jsx("div",{style:{fontSize:"10px",opacity:.25,letterSpacing:"4px",marginBottom:"8px",fontFamily:"'JetBrains Mono',monospace"},children:"03 // SELECT WORKSPACE"}),a.jsx("div",{style:{fontSize:"11px",opacity:.3,letterSpacing:"2px"},children:"FORBIDDEN"})]}),c?a.jsx("div",{style:{textAlign:"center",opacity:.3,fontSize:"11px",letterSpacing:"2px"},children:"LOADING..."}):a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[o.length===0&&!y&&a.jsx("div",{style:{textAlign:"center",opacity:.25,fontSize:"10px",letterSpacing:"1px",padding:"12px 0"},children:"No workspaces yet — create one below"}),o.map(d=>a.jsxs("div",{onClick:()=>s(d.workspaceId||d._id,d.name),style:{padding:"14px 18px",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"6px",cursor:"pointer",background:"rgba(255,255,255,0.02)",transition:"all 0.15s",display:"flex",alignItems:"center",gap:"12px"},onMouseEnter:x=>{x.currentTarget.style.borderColor="rgba(16,185,129,0.3)",x.currentTarget.style.background="rgba(16,185,129,0.04)"},onMouseLeave:x=>{x.currentTarget.style.borderColor="rgba(255,255,255,0.08)",x.currentTarget.style.background="rgba(255,255,255,0.02)"},children:[a.jsx("span",{style:{fontSize:"18px",opacity:.6},children:"⬡"}),a.jsxs("div",{children:[a.jsx("div",{style:{fontSize:"12px",fontWeight:600,letterSpacing:"1px"},children:d.name}),a.jsx("div",{style:{fontSize:"9px",opacity:.3,letterSpacing:"0.5px",marginTop:"2px",fontFamily:"'JetBrains Mono',monospace"},children:d.workspaceId||d._id})]}),a.jsx("span",{style:{marginLeft:"auto",fontSize:"11px",opacity:.25},children:"→"})]},d.workspaceId||d._id))]}),a.jsxs("div",{style:{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:"16px"},children:[a.jsx("div",{style:{fontSize:"9px",opacity:.3,letterSpacing:"2px",marginBottom:"10px"},children:"CREATE NEW WORKSPACE"}),a.jsxs("div",{style:{display:"flex",gap:"8px"},children:[a.jsx("input",{className:"login-input",placeholder:"workspace name...",value:h,onChange:d=>m(d.target.value),onKeyDown:d=>d.key==="Enter"&&g(),style:{flex:1}}),a.jsx("button",{className:"theme-btn cyber",disabled:!h.trim()||p,onClick:g,style:{padding:"10px 18px",fontSize:"11px",letterSpacing:"1px",minWidth:"unset"},children:p?"...":"CREATE"})]}),y&&a.jsx("div",{style:{color:"#ff435a",fontSize:"10px",marginTop:"8px",opacity:.8},children:y})]})]})})}function $w({nodesRef:t,edgesRef:e,groupsRef:n,nodeExecStatus:i,peers:r,hoveredNodeId:s,setHoveredNodeId:o,edgeMode:l,joinFirstNode:c,hoveredEdgeId:u,setHoveredEdgeId:p,openNodeInEditor:f,handleNodeClickInMode:h,handleEdgeClickInMode:m,setNodeColorPicker:y,runNode:S,activeTabId:g,socketRef:d,workspaceId:x,operatorId:v,sessionIdRef:b,AVATAR_ACCENTS:L,showCreateNode:R,setShowCreateNode:A}){const k=lt(null),w=lt({}),M=lt({}),B=lt({}),z=lt({}),D=lt(null),U=lt({}),ee=lt(null),ae=lt({theta:.55,phi:1.05,radius:820,tx:0,ty:0,tz:0}),ne=lt({down:!1,btn:-1,lx:0,ly:0,nodeId:null,dragged:!1}),I=lt(null),W=lt(null),G=lt({}),[fe,De]=ue([]),Ye=!!Xo,J={default:3816042,imports:9035263,calls:1096065,"data-flow":16761872,inherits:12294903,test:16728922,dependency:3816042,data:16761872,reference:8947967},ce=_i(Q=>{if(!Q.length)return[];const de=Q.map(X=>X.createdAt||Date.now()),he=Math.min(...de),Me=Math.max(...de),Te=24*60*60*1e3,Ce=new Date(he);Ce.setHours(0,0,0,0);const qe=new Date(Me+Te);qe.setHours(0,0,0,0);const P=[];let E=new Date(Ce);for(;E<=qe;){const X=E.getTime(),te=$r(X,he),Z=new Date().toDateString()===E.toDateString(),oe=Z?"TODAY":E.toLocaleDateString("en-US",{month:"short",day:"numeric"}),Ne=E.toISOString().slice(0,10);P.push({z:te,label:oe,dateStr:Ne,ts:X,isToday:Z}),E=new Date(E.getTime()+Te)}return P},[]);Nt(()=>{const Q=k.current;if(!Q)return;const de=Xo;I.current=new de.Raycaster;const he=new de.Scene,Me=new de.PerspectiveCamera(55,Q.clientWidth/Q.clientHeight,1,12e3),Te=new de.WebGLRenderer({antialias:!0,alpha:!0});Te.setPixelRatio(Math.min(window.devicePixelRatio,2)),Te.setSize(Q.clientWidth,Q.clientHeight),Te.setClearColor(0,0),Q.appendChild(Te.domElement),w.current={scene:he,cam:Me,renderer:Te},he.add(new de.AmbientLight(16777215,.22)),[[1096065,2.2,[400,400,400]],[4359668,1.8,[-400,-300,200]],[12294903,1.4,[0,-400,-300]]].forEach(([Z,oe,Ne])=>{const Se=new de.PointLight(Z,oe,1600);Se.position.set(...Ne),he.add(Se)});const Ce=new Float32Array(3e3*3);for(let Z=0;Z<Ce.length;Z++)Ce[Z]=(Math.random()-.5)*8e3;const qe=new de.BufferGeometry;qe.setAttribute("position",new de.BufferAttribute(Ce,3)),he.add(new de.Points(qe,new de.PointsMaterial({color:16777215,size:1.1,transparent:!0,opacity:.35})));const P=new de.BufferGeometry().setFromPoints([new de.Vector3(0,-220,-1e3),new de.Vector3(0,-220,1e3)]);he.add(new de.Line(P,new de.LineBasicMaterial({color:1096065,transparent:!0,opacity:.15})));const E=()=>{Me.aspect=Q.clientWidth/Q.clientHeight,Me.updateProjectionMatrix(),Te.setSize(Q.clientWidth,Q.clientHeight)},X=new ResizeObserver(E);X.observe(Q);const te=()=>{W.current=requestAnimationFrame(te);const Z=ae.current;Me.position.set(Z.tx+Z.radius*Math.sin(Z.phi)*Math.sin(Z.theta),Z.ty+Z.radius*Math.cos(Z.phi),Z.tz+Z.radius*Math.sin(Z.phi)*Math.cos(Z.theta)),Me.lookAt(Z.tx,Z.ty,Z.tz);const oe=t.current,Ne=e.current,Se=new Set,ge=new Set,He=oe.length?oe.reduce((re,Re)=>Math.min(re,Re.createdAt||Date.now()),Date.now()):Date.now(),me=ce(oe),ke=new Set;me.forEach(re=>{if(ke.add(re.dateStr),!G.current[re.dateStr]){const Re=new de.PlaneGeometry(800,500),ze=re.isToday,it=new de.MeshBasicMaterial({color:ze?1096065:4359668,transparent:!0,opacity:ze?.055:.025,side:de.DoubleSide,depthWrite:!1}),Le=new de.Mesh(Re,it);Le.rotation.x=Math.PI/2,Le.rotation.x=0,Le.rotation.y=0,Le.rotation.z=0,Le.position.set(0,0,re.z),he.add(Le),G.current[re.dateStr]=Le;const O=new de.GridHelper(600,8,ze?1096065:2767450,ze?1096065:1712192);O.rotation.x=Math.PI/2,O.position.set(0,0,re.z),O.material.transparent=!0,O.material.opacity=ze?.18:.08,he.add(O),G.current[re.dateStr+"_grid"]=O}}),Object.keys(G.current).forEach(re=>{const Re=re.replace("_grid","");ke.has(Re)||(he.remove(G.current[re]),delete G.current[re])}),oe.forEach(re=>{Se.add(re.id);const Re=L[re.themeIdx%L.length];if(!M.current[re.id]){const rt=new de.Color(Re),nt=new de.Mesh(new de.SphereGeometry(16,24,24),new de.MeshPhongMaterial({color:rt,emissive:rt.clone().multiplyScalar(.28),shininess:130})),yt=new de.Mesh(new de.SphereGeometry(27,14,14),new de.MeshBasicMaterial({color:rt,transparent:!0,opacity:.07,side:de.BackSide})),st=new de.BufferGeometry().setFromPoints([new de.Vector3(0,0,0),new de.Vector3(0,-180,0)]),Kt=new de.Line(st,new de.LineBasicMaterial({color:new de.Color(Re),transparent:!0,opacity:.18})),Ut=new de.Group;Ut.add(nt,yt,Kt),he.add(Ut),M.current[re.id]={grp:Ut,sphere:nt,halo:yt,dropLine:Kt,smat:nt.material,hmat:yt.material,dmat:Kt.material}}const{grp:ze,sphere:it,smat:Le,hmat:O,dmat:le}=M.current[re.id],ie=$r(re.createdAt||Date.now(),He);ze.position.set(re.x,re.y,ie),Le.color.set(Re),Le.emissive.set(Re),Le.emissive.multiplyScalar(.28),O.color.set(Re),le.color.set(Re);const _e=i[re.id],Ae=s===re.id,Ke=c===re.id;_e==="running"?(Le.emissive.setHex(16761872),Le.emissiveIntensity=.9,O.color.setHex(16761872),O.opacity=.2):_e==="success"?(Le.emissive.setHex(1096065),Le.emissiveIntensity=.7,O.opacity=.1):_e==="error"?(Le.emissive.setHex(16728922),Le.emissiveIntensity=.8,O.color.setHex(16728922),O.opacity=.18):(Le.emissiveIntensity=.28,O.opacity=.07),(Ae||Ke)&&(Le.emissiveIntensity=Math.max(Le.emissiveIntensity,.6),O.opacity=Math.max(O.opacity,.2)),it.scale.setScalar(Ae?1.35:Ke?1.2:re.isMain?1.18:1),ze.rotation.y+=.004}),Object.keys(M.current).forEach(re=>{Se.has(re)||(he.remove(M.current[re].grp),delete M.current[re])}),Ne.forEach(re=>{const Re=oe.find(rt=>rt.id===re.source),ze=oe.find(rt=>rt.id===re.target);if(!Re||!ze)return;ge.add(re.id);const it=$r(Re.createdAt||Date.now(),He),Le=$r(ze.createdAt||Date.now(),He),O=[new de.Vector3(Re.x,Re.y,it),new de.Vector3(ze.x,ze.y,Le)],le=re.edgeType||"default",ie=J[le]??J.default,_e=i[Re.id]==="error"&&(le==="calls"||le==="data-flow"),Ae=u===re.id&&l==="cut",Ke=Math.abs(it-Le)>20;if(B.current[re.id])B.current[re.id].geometry.setFromPoints(O),B.current[re.id].material.color.setHex(Ae||_e?16728922:ie),B.current[re.id].material.opacity=Ae?1:Ke?.5:.75;else{const rt=new de.BufferGeometry().setFromPoints(O),nt=new de.LineBasicMaterial({color:_e?16728922:ie,transparent:!0,opacity:Ke?.5:.75}),yt=new de.Line(rt,nt);he.add(yt),B.current[re.id]=yt}}),Object.keys(B.current).forEach(re=>{ge.has(re)||(he.remove(B.current[re]),delete B.current[re])}),Te.render(he,Me);const Ve=Q.clientWidth,Fe=Q.clientHeight;D.current&&oe.forEach(re=>{const Re=z.current[re.id];if(!Re)return;const ze=$r(re.createdAt||Date.now(),He),it=new de.Vector3(re.x,re.y,ze).project(Me);if(it.z>1){Re.style.display="none";return}Re.style.display="",Re.style.left=(it.x*.5+.5)*Ve+"px",Re.style.top=(-it.y*.5+.5)*Fe+23+"px"}),ee.current&&me.forEach(re=>{const Re=U.current[re.dateStr];if(!Re)return;const ze=new de.Vector3(-280,0,re.z).project(Me);if(ze.z>1){Re.style.display="none";return}Re.style.display="",Re.style.left=(ze.x*.5+.5)*Ve+"px",Re.style.top=(-ze.y*.5+.5)*Fe+"px"})};return te(),()=>{cancelAnimationFrame(W.current),X.disconnect(),Te.dispose(),Q.contains(Te.domElement)&&Q.removeChild(Te.domElement),Object.values(M.current).forEach(({grp:Z})=>he.remove(Z)),Object.values(B.current).forEach(Z=>he.remove(Z)),Object.values(G.current).forEach(Z=>he.remove(Z)),M.current={},B.current={},G.current={}}},[]);const ve=_i((Q,de)=>{var Z;const he=Xo,Me=I.current,Te=w.current.cam,Ce=k.current;if(!he||!Me||!Te||!Ce)return null;const qe=Ce.getBoundingClientRect(),P=(Q-qe.left)/qe.width*2-1,E=-((de-qe.top)/qe.height)*2+1;Me.setFromCamera({x:P,y:E},Te);const X=Object.entries(M.current).map(([oe,{sphere:Ne}])=>({id:oe,mesh:Ne})),te=Me.intersectObjects(X.map(oe=>oe.mesh));return te.length&&((Z=X.find(oe=>oe.mesh===te[0].object))==null?void 0:Z.id)||null},[]),ye=_i(Q=>{if(!Q.target.closest(".g3d-lbl,.floating-panel,.graph-mode-bar")&&(Q.currentTarget.setPointerCapture(Q.pointerId),ne.current={down:!0,btn:Q.button,lx:Q.clientX,ly:Q.clientY,nodeId:null,dragged:!1},Q.button===0)){const de=ve(Q.clientX,Q.clientY);de&&(ne.current.nodeId=de)}},[ve]),se=_i(Q=>{const de=Q.clientX-ne.current.lx,he=Q.clientY-ne.current.ly;if(!ne.current.down){const Me=ve(Q.clientX,Q.clientY);o(Me);return}if((Math.abs(de)>1||Math.abs(he)>1)&&(ne.current.dragged=!0),ne.current.nodeId&&ne.current.btn===0&&!l){const Me=Xo,Te=I.current,Ce=w.current.cam,P=k.current.getBoundingClientRect(),E=(Q.clientX-P.left)/P.width*2-1,X=-((Q.clientY-P.top)/P.height)*2+1;Te.setFromCamera({x:E,y:X},Ce);const te=t.current.find(Z=>Z.id===ne.current.nodeId);if(te){const Z=t.current.reduce((ge,He)=>Math.min(ge,He.createdAt||Date.now()),Date.now()),oe=$r(te.createdAt||Date.now(),Z),Ne=new Me.Plane(new Me.Vector3(0,0,1),-oe),Se=new Me.Vector3;Te.ray.intersectPlane(Ne,Se)&&(te.x=Se.x,te.y=Se.y,te.vx=0,te.vy=0)}}else if(!ne.current.nodeId){if(ne.current.btn===0)ae.current.theta-=de*.007,ae.current.phi=Math.max(.08,Math.min(Math.PI-.08,ae.current.phi-he*.007));else if(ne.current.btn===2||ne.current.btn===1){const Me=Xo,Te=w.current.cam;new Me.Vector3,Te.getWorldDirection(new Me.Vector3).cross(new Me.Vector3(0,1,0)).normalize(),ae.current.tx-=de*.55,ae.current.ty+=he*.55}}ne.current.lx=Q.clientX,ne.current.ly=Q.clientY},[l,ve,t]),we=_i(Q=>{var de;if(!ne.current.dragged&&ne.current.btn===0){const he=ne.current.nodeId||ve(Q.clientX,Q.clientY);he&&(l==="join"?h(he):l||f(he))}if(ne.current.nodeId&&ne.current.dragged){const he=t.current.find(Me=>Me.id===ne.current.nodeId);he&&((de=d.current)!=null&&de.connected)&&d.current.emit("node:edit",{workspaceId:x,nodeId:he.id,position:{x:he.x,y:he.y},operatorId:v,sessionId:b.current,...ua()?{clientEventId:ua()}:{}})}ne.current.down=!1,ne.current.nodeId=null},[l,ve,h,f,t]),j=_i(Q=>{Q.target.closest(".floating-panel")||(Q.preventDefault(),ae.current.radius=Math.max(80,Math.min(3500,ae.current.radius*(Q.deltaY>0?1.09:.92))))},[]),et=t.current;return a.jsxs("div",{style:{position:"relative",flex:1,overflow:"hidden"},onPointerDown:ye,onPointerMove:se,onPointerUp:we,onPointerLeave:()=>{ne.current.down=!1,ne.current.nodeId=null,o(null)},onWheel:j,onContextMenu:Q=>Q.preventDefault(),children:[!Ye&&a.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:20,background:"rgba(5,5,10,0.9)"},children:a.jsx("div",{style:{padding:"14px 18px",border:"1px solid rgba(255,67,90,0.25)",background:"rgba(255,67,90,0.06)",borderRadius:"8px",fontFamily:"'JetBrains Mono', monospace",fontSize:"10px",letterSpacing:"1px",color:"#ff8080"},children:"GRAPH RENDERER NOT LOADED"})}),a.jsx("div",{ref:k,style:{position:"absolute",inset:0}}),a.jsx("div",{ref:D,style:{position:"absolute",inset:0,pointerEvents:"none"},children:et.map(Q=>{const de=L[Q.themeIdx%L.length],he=i[Q.id],Me=Object.values(r).filter(Ce=>Ce.nodeId===Q.id),Te=Q.createdAt?new Date(Q.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"2-digit"}):"";return a.jsxs("div",{className:"g3d-lbl",ref:Ce=>{Ce?z.current[Q.id]=Ce:delete z.current[Q.id]},style:{position:"absolute",transform:"translateX(-50%)",pointerEvents:"auto",zIndex:5,cursor:"pointer",userSelect:"none"},children:[a.jsxs("div",{style:{background:"rgba(6,6,18,0.9)",border:`1px solid ${de}55`,borderRadius:"4px",padding:"2px 8px",fontSize:"9px",color:de,fontFamily:"'JetBrains Mono',monospace",letterSpacing:"0.5px",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:"5px",boxShadow:`0 0 14px ${de}22`},children:[a.jsx("span",{style:{width:"6px",height:"6px",borderRadius:"50%",background:de,flexShrink:0,boxShadow:`0 0 6px ${de}`}}),a.jsxs("span",{onClick:Ce=>{Ce.stopPropagation(),l==="join"?h(Q.id):f(Q.id)},children:[Q.label,Q.modified&&a.jsx("span",{style:{color:"#ffc410",marginLeft:"3px"},children:"●"})]}),he==="running"&&a.jsx("span",{style:{color:"#ffc410",animation:"pulse 0.8s infinite",fontSize:"8px"},children:"▶"}),he==="success"&&a.jsx("span",{style:{color:"#10b981",fontSize:"8px"},children:"✓"}),he==="error"&&a.jsx("span",{style:{color:"#ff435a",fontSize:"8px"},children:"✗"}),a.jsx("span",{style:{opacity:.4,fontSize:"8px",cursor:"pointer"},onPointerDown:Ce=>Ce.stopPropagation(),onClick:Ce=>{Ce.stopPropagation(),S(Q.id)},children:"▶"}),a.jsx("span",{style:{opacity:.3,fontSize:"8px",cursor:"pointer"},onPointerDown:Ce=>Ce.stopPropagation(),onClick:Ce=>{Ce.stopPropagation();const qe=Ce.currentTarget.getBoundingClientRect();y({nodeId:Q.id,x:qe.left,y:qe.bottom+6})},children:"●"})]}),Te&&a.jsx("div",{style:{fontSize:"7px",opacity:.3,fontFamily:"'JetBrains Mono',monospace",textAlign:"center",marginTop:"1px",letterSpacing:"0.3px",color:"rgba(255,255,255,0.4)"},children:Te}),Me.length>0&&a.jsx("div",{style:{display:"flex",justifyContent:"center",gap:"-2px",marginTop:"2px",pointerEvents:"none"},children:Me.slice(0,3).map((Ce,qe)=>a.jsx("div",{title:Ce.name,style:{width:"12px",height:"12px",borderRadius:"50%",background:Ce.color||"#10b981",border:"1.5px solid rgba(8,8,16,0.9)",marginLeft:qe>0?"-4px":"0",fontSize:"6px",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",boxShadow:`0 0 5px ${Ce.color||"#10b981"}88`},children:(Ce.name||"?")[0].toUpperCase()},qe))})]},Q.id)})}),a.jsx("div",{ref:ee,style:{position:"absolute",inset:0,pointerEvents:"none"},children:ce(et).map(Q=>a.jsx("div",{ref:de=>{de?U.current[Q.dateStr]=de:delete U.current[Q.dateStr]},style:{position:"absolute",transform:"translate(-50%,-50%)",whiteSpace:"nowrap"},children:a.jsx("div",{style:{fontSize:"9px",fontFamily:"'JetBrains Mono',monospace",letterSpacing:"2px",color:Q.isToday?"#10b981":"rgba(66,133,244,0.55)",background:Q.isToday?"rgba(16,185,129,0.08)":"rgba(0,0,0,0.55)",border:`1px solid ${Q.isToday?"rgba(16,185,129,0.3)":"rgba(66,133,244,0.2)"}`,borderRadius:"3px",padding:"2px 8px",textShadow:Q.isToday?"0 0 12px #10b981":"none"},children:Q.label})},Q.dateStr))}),et.length===0&&a.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",pointerEvents:"none",zIndex:2},children:[a.jsxs("div",{style:{textAlign:"center",opacity:.08,userSelect:"none"},children:[a.jsx("div",{style:{fontSize:"80px",fontFamily:"'JetBrains Mono',monospace",lineHeight:1},children:"⬡"}),a.jsx("div",{style:{fontSize:"13px",letterSpacing:"5px",marginTop:"14px",fontFamily:"'JetBrains Mono',monospace",fontWeight:900},children:"FORBIDDEN"}),a.jsx("div",{style:{fontSize:"9px",letterSpacing:"2.5px",marginTop:"5px",opacity:.7},children:"EMPTY WORKSPACE"})]}),a.jsxs("div",{style:{marginTop:"32px",display:"flex",flexDirection:"column",alignItems:"center",gap:"7px",opacity:.15,pointerEvents:"auto"},children:[a.jsx("button",{className:"btn hdr-pill",onClick:()=>A(!0),style:{fontSize:"9px",letterSpacing:"1.5px"},children:"＋ CREATE FIRST NODE"}),a.jsx("div",{style:{fontSize:"8px",opacity:.7,letterSpacing:"1px",fontFamily:"'JetBrains Mono',monospace"},children:"OR PRESS N"})]})]}),a.jsxs("div",{style:{position:"absolute",bottom:"12px",left:"50%",transform:"translateX(-50%)",zIndex:10,display:"flex",gap:"8px",alignItems:"center"},children:[a.jsx("div",{style:{background:"rgba(6,6,18,0.7)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"6px",padding:"4px 14px",fontSize:"8px",opacity:.4,letterSpacing:"1px",fontFamily:"'JetBrains Mono',monospace",pointerEvents:"none",whiteSpace:"nowrap"},children:"DRAG · ORBIT  |  RIGHT DRAG · PAN  |  SCROLL · ZOOM  |  Z-AXIS = TIME"}),a.jsx("button",{style:{padding:"4px 10px",background:"rgba(6,6,18,0.85)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"4px",color:"rgba(255,255,255,0.35)",fontSize:"8px",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",letterSpacing:"1px"},onClick:()=>{ae.current={theta:.55,phi:1.05,radius:820,tx:0,ty:0,tz:0}},children:"⌖ RESET"}),a.jsx("button",{style:{padding:"4px 10px",background:"rgba(6,6,18,0.85)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"4px",color:"rgba(255,255,255,0.35)",fontSize:"8px",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",letterSpacing:"1px"},onClick:()=>{ae.current.phi=.12,ae.current.theta=0,ae.current.radius=900},children:"↑ TOP"}),a.jsx("button",{style:{padding:"4px 10px",background:"rgba(6,6,18,0.85)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"4px",color:"rgba(16,185,129,0.5)",fontSize:"8px",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",letterSpacing:"1px",borderColor:"rgba(16,185,129,0.2)"},onClick:()=>{ae.current.theta=Math.PI/2,ae.current.phi=Math.PI/2,ae.current.radius=900},children:"⟶ TIMELINE"})]})]})}function Yw({shareToken:t}){var h;const[e,n]=ue(null),[i,r]=ue(""),[s,o]=ue(!0);if(Nt(()=>{fetch(`${ca}/share/${t}`).then(m=>m.ok?m.json():Promise.reject(m.statusText)).then(m=>{n(m),o(!1)}).catch(m=>{r(String(m)),o(!1)})},[t]),s)return a.jsx("div",{style:{width:"100vw",height:"100vh",background:"#050505",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.2)",fontFamily:"'JetBrains Mono',monospace",letterSpacing:"3px",fontSize:"11px"},children:"LOADING SNAPSHOT..."});if(i||!e)return a.jsxs("div",{style:{width:"100vw",height:"100vh",background:"#050505",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#ff435a",fontFamily:"'JetBrains Mono',monospace',gap:'12px"},children:[a.jsx("div",{style:{fontSize:"40px",opacity:.3},children:"⚠"}),a.jsx("div",{style:{letterSpacing:"2px",fontSize:"11px"},children:"SHARE LINK EXPIRED OR INVALID"}),a.jsx("div",{style:{fontSize:"9px",opacity:.3,marginTop:"4px"},children:i})]});const l=e.nodes||[],c=l.flatMap(m=>(m.edges||[]).map(y=>({id:`${m.id}-${y.targetId}`,source:m.id,target:y.targetId,edgeType:y.edgeType||"default"}))),[u,p]=ue(null),f=l.find(m=>m.id===u);return a.jsxs("div",{style:{width:"100vw",height:"100vh",background:"#080810",color:"#9494b0",fontFamily:"'JetBrains Mono',monospace",display:"flex",flexDirection:"column",overflow:"hidden"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px",padding:"10px 20px",borderBottom:"1px solid rgba(255,255,255,0.06)",background:"rgba(0,0,0,0.3)",flexShrink:0},children:[a.jsx("div",{style:{fontSize:"13px",fontWeight:900,letterSpacing:"4px",color:"rgba(255,255,255,0.8)"},children:"FORBIDDEN"}),a.jsx("div",{style:{width:"1px",height:"16px",background:"rgba(255,255,255,0.1)"}}),a.jsx("div",{style:{fontSize:"9px",opacity:.35,letterSpacing:"2px"},children:((h=e.snapshot)==null?void 0:h.workspaceId)||"SNAPSHOT"}),a.jsx("div",{style:{padding:"2px 10px",background:"rgba(255,67,90,0.1)",border:"1px solid rgba(255,67,90,0.3)",borderRadius:"20px",fontSize:"8px",color:"#ff435a",letterSpacing:"1px"},children:"READ ONLY"}),a.jsxs("div",{style:{fontSize:"8px",opacity:.2,marginLeft:"auto",letterSpacing:"1px"},children:["Expires: ",e.expiresAt?new Date(e.expiresAt).toLocaleString():"24h"]})]}),a.jsxs("div",{style:{flex:1,display:"flex",overflow:"hidden"},children:[a.jsxs("div",{style:{flex:1,position:"relative",overflow:"hidden"},children:[a.jsxs("svg",{style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"},children:[a.jsx("defs",{children:["default","imports","calls","data-flow","inherits","test"].map(m=>a.jsx("marker",{id:`sh-arrow-${m}`,markerWidth:"8",markerHeight:"8",refX:"6",refY:"3",orient:"auto",children:a.jsx("path",{d:"M0,0 L0,6 L8,3 z",fill:{default:"rgba(255,255,255,0.25)",imports:"#89ddff",calls:"#10b981","data-flow":"#ffc410",inherits:"#bb9af7",test:"#ff435a"}[m]||"rgba(255,255,255,0.25)"})},m))}),c.map(m=>{var v,b,L,R,A,k,w,M;const y=l.find(B=>B.id===m.source),S=l.find(B=>B.id===m.target);if(!y||!S)return null;const g=(((v=y.position)==null?void 0:v.x)||0+((b=S.position)==null?void 0:b.x)||0)/2,d=(((L=y.position)==null?void 0:L.y)||0+((R=S.position)==null?void 0:R.y)||0)/2-20,x={default:"rgba(255,255,255,0.18)",imports:"#89ddff",calls:"#10b981","data-flow":"#ffc410",inherits:"#bb9af7",test:"#ff435a"};return a.jsx("path",{d:`M${((A=y.position)==null?void 0:A.x)||0} ${((k=y.position)==null?void 0:k.y)||0} Q${g} ${d} ${((w=S.position)==null?void 0:w.x)||0} ${((M=S.position)==null?void 0:M.y)||0}`,fill:"none",stroke:x[m.edgeType]||x.default,strokeWidth:"1.5",opacity:"0.7",markerEnd:m.edgeType!=="default"?`url(#sh-arrow-${m.edgeType})`:void 0},m.id)})]}),a.jsx("div",{style:{position:"absolute",inset:0},children:l.map(m=>{var d,x;const y=vt[(m.themeIdx||0)%vt.length],S=((d=m.position)==null?void 0:d.x)||(Math.random()-.5)*400+400,g=((x=m.position)==null?void 0:x.y)||(Math.random()-.5)*300+300;return a.jsxs("div",{style:{position:"absolute",left:S+"px",top:g+"px",transform:"translate(-50%,-50%)",cursor:"pointer",zIndex:10},onClick:()=>p(v=>v===m.id?null:m.id),children:[a.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"50%",background:"#080810",border:`2px solid ${y}`,boxShadow:`0 0 12px ${y}66`,display:"flex",alignItems:"center",justifyContent:"center",transition:"transform 0.15s",transform:u===m.id?"scale(1.3)":"scale(1)"},children:a.jsx("span",{style:{fontSize:"10px",opacity:.6},children:m.type==="class"?"C":m.type==="test"?"T":"ƒ"})}),a.jsx("div",{style:{position:"absolute",top:"44px",left:"50%",transform:"translateX(-50%)",whiteSpace:"nowrap",fontSize:"9px",color:y,background:"rgba(8,8,16,0.85)",padding:"2px 6px",borderRadius:"3px",border:`1px solid ${y}33`,pointerEvents:"none"},children:m.label})]},m.id)})})]}),f&&a.jsxs("div",{style:{width:"400px",flexShrink:0,borderLeft:"1px solid rgba(255,255,255,0.06)",display:"flex",flexDirection:"column",overflow:"hidden"},children:[a.jsxs("div",{style:{padding:"10px 14px",borderBottom:"1px solid rgba(255,255,255,0.06)",fontSize:"10px",display:"flex",gap:"8px",alignItems:"center",flexShrink:0},children:[a.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:vt[(f.themeIdx||0)%vt.length],boxShadow:`0 0 6px ${vt[(f.themeIdx||0)%vt.length]}`}}),a.jsx("span",{style:{opacity:.8},children:f.label}),a.jsx("span",{style:{opacity:.3,fontSize:"9px",marginLeft:"auto"},children:f.type})]}),a.jsx("pre",{style:{flex:1,margin:0,padding:"14px",overflow:"auto",fontSize:"11px",fontFamily:"'JetBrains Mono',monospace",lineHeight:"1.7",color:"rgba(200,220,200,0.8)",background:"#040408",whiteSpace:"pre-wrap",wordBreak:"break-all",userSelect:"text"},children:f.code||"(empty)"})]})]}),a.jsxs("div",{style:{padding:"6px 20px",borderTop:"1px solid rgba(255,255,255,0.04)",fontSize:"8px",opacity:.2,letterSpacing:"1px",display:"flex",gap:"20px",flexShrink:0},children:[a.jsxs("span",{children:[l.length," nodes"]}),a.jsxs("span",{children:[c.length," edges"]}),a.jsx("span",{style:{marginLeft:"auto"},children:"FORBIDDEN — Read-Only Share"})]})]})}function qw(){const[t,e]=ue(()=>{try{const U=sessionStorage.getItem("forbidden:session");if(U){const ee=JSON.parse(U);if(ee.token&&ee.workspaceId)return"ide"}}catch{}return"identity"}),[n,i]=ue(()=>{try{return sessionStorage.getItem("forbidden:theme")||null}catch{return null}}),[r,s]=ue(()=>{try{const U=sessionStorage.getItem("forbidden:avatar");return U!==null?Number(U):null}catch{return null}}),[o,l]=ue(""),[c,u]=ue(""),[p,f]=ue(""),[h,m]=ue(!1),[y,S]=ue(()=>{var U;try{return((U=JSON.parse(sessionStorage.getItem("forbidden:session")||"null"))==null?void 0:U.token)||null}catch{return null}}),[g,d]=ue(()=>{var U;try{return((U=JSON.parse(sessionStorage.getItem("forbidden:session")||"null"))==null?void 0:U.operatorId)||""}catch{return""}}),[x,v]=ue(()=>{var U;try{return((U=JSON.parse(sessionStorage.getItem("forbidden:session")||"null"))==null?void 0:U.operatorName)||""}catch{return""}}),[b,L]=ue(()=>{var U;try{return((U=JSON.parse(sessionStorage.getItem("forbidden:session")||"null"))==null?void 0:U.workspaceId)||""}catch{return""}}),[R,A]=ue(()=>{var U;try{return((U=JSON.parse(sessionStorage.getItem("forbidden:session")||"null"))==null?void 0:U.workspaceName)||""}catch{return""}}),k=(U,ee,ae,ne,I)=>{try{sessionStorage.setItem("forbidden:session",JSON.stringify({token:U,operatorId:ee,operatorName:ae,workspaceId:ne,workspaceName:I}))}catch{}},w=U=>{i(U);try{sessionStorage.setItem("forbidden:theme",U)}catch{}r!==null&&e("credentials")},M=U=>{s(U);try{sessionStorage.setItem("forbidden:avatar",String(U))}catch{}},B=async()=>{var U,ee,ae,ne;if(!(!o.trim()||!c.trim())){m(!0),f("");try{const I=await Ot("/auth/login",{method:"POST",body:JSON.stringify({username:o.trim(),password:c})});S(I.token),d(((U=I.operator)==null?void 0:U.id)||((ee=I.operator)==null?void 0:ee.sub)||I.userId||o),v(((ae=I.operator)==null?void 0:ae.name)||((ne=I.operator)==null?void 0:ne.login)||o),e("workspace")}catch(I){f(I.status===401?"Invalid credentials":I.message)}finally{m(!1)}}},z=()=>{S("DEMO"),d("demo"),v("OPERATOR"),L("demo"),A("Demo Workspace"),e("ide")},D=()=>{try{sessionStorage.removeItem("forbidden:session")}catch{}S(null),L(""),A(""),e("identity")};return t==="ide"?a.jsx(Ww,{initialTheme:n||"cyber",initialAvatar:r||0,token:y==="DEMO"?null:y,operatorId:g,operatorName:x,workspaceId:b,workspaceName:R,onLogout:D}):t==="workspace"&&y?a.jsx(Xw,{token:y,operatorId:g,operatorName:x,avatar:r,theme:n,onSelect:(U,ee)=>{L(U),A(ee),e("ide"),k(y,g,x,U,ee)}}):a.jsx("div",{className:"login-container",children:a.jsxs("div",{className:"login-box",children:[a.jsxs("div",{style:{textAlign:"center"},children:[a.jsx("div",{style:{fontSize:"10px",opacity:.25,letterSpacing:"4px",marginBottom:"14px",fontFamily:"'JetBrains Mono',monospace"},children:"SYSTEM BOOT SEQUENCE"}),a.jsx("h1",{className:"boot-title",style:{fontSize:"34px",fontWeight:900,letterSpacing:"6px",fontFamily:"'JetBrains Mono',monospace",marginBottom:"6px"},children:"FORBIDDEN"}),a.jsx("div",{style:{fontSize:"10px",opacity:.2,letterSpacing:"3px"},children:"DUAL THEME GRAPH IDE"})]}),a.jsxs("div",{className:"boot-section",style:{animationDelay:"0.2s",opacity:0,background:"rgba(255,255,255,0.02)",padding:"28px",borderRadius:"6px",border:"1px solid rgba(255,255,255,0.06)"},children:[a.jsx("div",{style:{fontSize:"9px",opacity:.35,marginBottom:"20px",textAlign:"center",letterSpacing:"3px"},children:"01 // SELECT OPERATOR IDENTITY"}),a.jsx("div",{style:{display:"flex",gap:"14px",justifyContent:"center",flexWrap:"wrap"},children:[0,1,2,3,4,5].map(U=>a.jsxs("div",{onClick:()=>M(U),style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"7px",cursor:"pointer",transition:"transform 0.2s",transform:r===U?"translateY(-4px)":"none"},children:[a.jsx(Xr,{index:U,size:68,selected:r===U}),a.jsx("div",{style:{fontSize:"8px",letterSpacing:"1px",opacity:r===U?1:.25,color:vt[U],fontFamily:"'JetBrains Mono',monospace",transition:"opacity 0.2s"},children:Ly[U]})]},U))})]}),a.jsxs("div",{style:{opacity:r!==null?1:.15,transition:"opacity 0.4s",pointerEvents:r!==null?"auto":"none"},children:[a.jsx("div",{style:{fontSize:"9px",opacity:.35,marginBottom:"14px",textAlign:"center",letterSpacing:"3px"},children:"02 // INITIALIZE ENGINE"}),a.jsxs("div",{style:{display:"flex",gap:"16px"},children:[a.jsxs("button",{className:"theme-btn cyber",disabled:r===null,onClick:()=>w("cyber"),children:[a.jsx("div",{style:{fontSize:"20px",fontWeight:"bold",marginBottom:"6px",letterSpacing:"2px"},children:"OBSIDIAN"}),a.jsx("div",{style:{fontSize:"9px",opacity:.5,letterSpacing:"1px"},children:"DARK / CYBERPUNK"})]}),a.jsxs("button",{className:"theme-btn brutal",disabled:r===null,onClick:()=>w("brutal"),children:[a.jsx("div",{style:{fontSize:"20px",fontWeight:900,marginBottom:"6px",letterSpacing:"2px"},children:"FORSAKEN"}),a.jsx("div",{style:{fontSize:"9px",opacity:.6,fontWeight:"bold",letterSpacing:"1px"},children:"LIGHT / BRUTALIST"})]})]})]}),t==="credentials"&&a.jsxs("div",{style:{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:"20px",display:"flex",flexDirection:"column",gap:"10px"},children:[a.jsx("div",{style:{fontSize:"9px",opacity:.35,textAlign:"center",letterSpacing:"3px",marginBottom:"4px"},children:"03 // AUTHENTICATE"}),a.jsx("input",{className:"login-input",placeholder:"username",value:o,onChange:U=>l(U.target.value),onKeyDown:U=>U.key==="Enter"&&B(),autoFocus:!0}),a.jsx("input",{className:"login-input",type:"password",placeholder:"password",value:c,onChange:U=>u(U.target.value),onKeyDown:U=>U.key==="Enter"&&B()}),p&&a.jsx("div",{style:{color:"#ff435a",fontSize:"10px",opacity:.8},children:p}),a.jsxs("div",{style:{display:"flex",gap:"8px"},children:[a.jsx("button",{className:`theme-btn ${n}`,style:{flex:1},disabled:!o.trim()||!c.trim()||h,onClick:B,children:h?"CONNECTING...":"CONNECT"}),a.jsx("button",{onClick:z,style:{padding:"10px 14px",border:"1px solid rgba(255,255,255,0.1)",background:"transparent",color:"rgba(255,255,255,0.3)",cursor:"pointer",borderRadius:"4px",fontSize:"9px",letterSpacing:"1px",transition:"all 0.2s"},onMouseEnter:U=>{U.target.style.color="rgba(255,255,255,0.6)",U.target.style.borderColor="rgba(255,255,255,0.25)"},onMouseLeave:U=>{U.target.style.color="rgba(255,255,255,0.3)",U.target.style.borderColor="rgba(255,255,255,0.1)"},children:"DEMO"})]}),a.jsx("div",{style:{textAlign:"center",fontSize:"9px",opacity:.2,letterSpacing:"1px"},children:"No backend? Click DEMO to run offline."})]})]})})}function Kw(){const e=new URLSearchParams(window.location.search).get("share");return e?a.jsx(Yw,{shareToken:e}):a.jsx(qw,{})}iv(document.getElementById("root")).render(a.jsx(e0.StrictMode,{children:a.jsx(Kw,{})}));
