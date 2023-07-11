// ==UserScript==
// @name        web-standards-userscript
// @version     0.2.0
// @license     MIT
// @homepage    https://crashmax-dev.github.io/web-standards-userscript/
// @icon        https://www.google.com/s2/favicons?sz=64&domain=web-standards.ru
// @match       https://web-standards.ru/*
// @grant       GM_addStyle
// @updateURL   https://crashmax-dev.github.io/web-standards-userscript/web-standards-userscript.meta.js
// @downloadURL https://crashmax-dev.github.io/web-standards-userscript/web-standards-userscript.user.js
// ==/UserScript==

(function(){"use strict";function s(n,t,...e){const a=document.createElement(n);return t instanceof Node?a.append(t):typeof t=="string"?a.append(f(t)):Array.isArray(t)?a.append(...t):(Object.assign(a,t),Object.assign(a.style,t?.style)),a.append(...e),a}function f(n){return document.createTextNode(n)}function d(n){return n=Math.abs(n),n>9?`${n}`:`0${n}`}class _{#e;#t;#n;#r;#a;constructor(t,e,a,r){this.#e=t,this.#t=e,this.#a=a,this.#n=o=>r?.encode?r.encode(o):JSON.stringify(o),this.#r=o=>r?.decode?r.decode(o):JSON.parse(o),this.has()||this.write(this.#t)}get initialValue(){return this.#t}get value(){try{const t=this.#a.getItem(this.#e);return t?this.#r(t):this.#t}catch(t){return console.error(t),this.#t}}write(t){t instanceof Function&&(t=t(this.value));try{this.#a.setItem(this.#e,this.#n(t))}catch(e){return console.error(e),this.#t}return t}has(){return this.#a.getItem(this.#e)!==null}reset(){this.write(this.#t)}}class b extends _{constructor(t,e,a){super(t,e,localStorage,a)}}const c=new b("podcast-options",[]);function g(n){return c.value.find(t=>t.id===n)}function u(n,t){c.write(e=>{const a=e.findIndex(r=>r.id===n);return a!==-1&&(e[a]={...e[a],...t}),e})}function v(n){c.write(t=>(t.push(n),t))}function k(){return location.pathname.split("/").filter(Boolean).pop()}function x(n){for(const t of c.value){const e=n.find(I=>I.textContent?.trim()===t.id);if(!e)continue;const a=t.time,r=Math.floor(a/3600),o=Math.floor((a-r*3600)/60),l=Math.floor(a-r*3600-o*60),p=`/ ${d(r)}:${d(o)}:${d(l)}`,i=s("span",p);e.appendChild(i),e.classList.add("visited")}}function w(n){const t=k();if(!t)return;const e=n.cloneNode(),a={id:t,time:0,volume:.1,rate:e.playbackRate},r=g(t);r||v(a),e.currentTime=r?.time??a.time,e.volume=r?.volume??a.volume,e.playbackRate=r?.rate??a.rate;const o=s("div",{className:"player__container"}),l=s("input",{name:"player__playbackrate",type:"range",value:`${e.playbackRate}`,step:"0.25",min:"0.75",max:"2",oninput:()=>{const i=parseFloat(l.value);e.playbackRate=i,p.textContent=`${i}x`,u(t,{rate:i})}}),p=s("label",{className:"player__playbackrate-label",htmlFor:"player__playbackrate"},`${e.playbackRate}x`);o.append(e,l,p),n.replaceWith(o),e.addEventListener("timeupdate",()=>{u(t,{time:e.currentTime})}),e.addEventListener("volumechange",()=>{u(t,{volume:e.volume})})}const O="",y=document.querySelector(".page__war");y&&y.remove();const m=document.querySelector(".podcast__player");m&&w(m);const h=Array.from(document.querySelectorAll(".podcast-preview__number"));h.length&&x(h),GM_addStyle("body,.article-card__photo,.links__icon,.blob__photo,.colors,img{filter:invert(1)}.header{background-color:#fff}.podcast__player{filter:initial}.podcast-preview__number.visited{color:#b8860b}.player__container{grid-column:1/-1;display:flex}.player__playbackrate-label{align-self:center;margin-left:4px;width:4rem}")})();
