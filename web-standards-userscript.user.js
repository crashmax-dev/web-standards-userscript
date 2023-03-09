// ==UserScript==
// @name        web-standards-userscript
// @version     0.0.1
// @license     MIT
// @homepage    https://crashmax-dev.github.io/web-standards-userscript/
// @icon        https://www.google.com/s2/favicons?sz=64&domain=web-standards.ru
// @match       https://web-standards.ru/*
// @grant       GM_addStyle
// @updateURL   https://crashmax-dev.github.io/web-standards-userscript/web-standards-userscript.meta.js
// @downloadURL https://crashmax-dev.github.io/web-standards-userscript/web-standards-userscript.user.js
// ==/UserScript==

var L=Object.defineProperty,O=(l,o,a)=>o in l?L(l,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):l[o]=a,u=(l,o,a)=>(O(l,typeof o!="symbol"?o+"":o,a),a);(function(){"use strict";const l="";class o{constructor(e,n,t,r){u(this,"serialize"),u(this,"deserialize"),this.key=e,this.initialValue=n,this.storage=t,this.serialize=s=>r!=null&&r.serialize?r.serialize(s):JSON.stringify(s),this.deserialize=s=>r!=null&&r.deserialize?r.deserialize(s):JSON.parse(s)}get values(){try{const e=this.storage.getItem(this.key);return e?this.deserialize(e):this.initialValue}catch{return this.initialValue}}write(e){e instanceof Function&&(e=e(this.values));try{this.storage.setItem(this.key,this.serialize(e))}catch(n){return console.error(`Failed to save (${this.key}):`,n.message),this.initialValue}return e}reset(){this.write(this.initialValue)}}class a extends o{constructor(e,n,t){super(e,n,localStorage,t)}}const c=new a("podcast-options",[]);function y(i){return c.values.find(e=>e.id===i)}function h(i,e){c.write(n=>{const t=n.findIndex(r=>r.id===i);return t!==-1&&(n[t]={...n[t],...e}),n})}function g(i){c.write(e=>(e.push(i),e))}function b(i){const e=location.pathname.split("/").filter(Boolean).pop();if(!e)return;const n={id:e,time:0,volume:.1},t=y(e);t||g(n),i.addEventListener("timeupdate",()=>{h(e,{time:i.currentTime})}),i.addEventListener("volumechange",()=>{h(e,{volume:i.volume})}),i.currentTime=t?.time??n.time,i.volume=t?.volume??n.volume}function _(i,e,...n){const t=document.createElement(i);return typeof e=="string"?t.append(z(e)):Array.isArray(e)?t.append(...e):(Object.assign(t,e),Object.assign(t.style,e?.style)),n.length&&t.append(...n),t}function z(i){return document.createTextNode(i)}function d(i){return i.toString().padStart(2,"0")}function w(i){for(const e of c.values){const n=i.find(V=>{var v;return((v=V.textContent)==null?void 0:v.trim())===e.id});if(!n)continue;const t=e.time,r=Math.floor(t/3600),s=Math.floor((t-r*3600)/60),S=Math.floor(t-r*3600-s*60),k=`/ ${d(r)}:${d(s)}:${d(S)}`,x=_("span",k);n.appendChild(x),n.classList.add("visited")}}const p=document.querySelector(".page__war");p&&p.remove();const f=document.querySelector(".podcast__player");f&&b(f);const m=[...document.querySelectorAll(".podcast-preview__number")];m.length&&w(m),GM_addStyle("body{filter:invert(1)}.header{background-color:#fff}.podcast__player{filter:initial}.podcast-preview__number.visited{color:#b8860b}")})();
