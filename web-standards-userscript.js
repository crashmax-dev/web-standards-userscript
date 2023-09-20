(function(){"use strict";function l(o,t,...e){const n=document.createElement(o);return t instanceof Node?n.append(t):typeof t=="string"?n.append(y(t)):Array.isArray(t)?n.append(...t):(Object.assign(n,t),Object.assign(n.style,t?.style)),n.append(...e),n}function y(o){return document.createTextNode(o)}function p(o){return o=Math.abs(o),o>9?`${o}`:`0${o}`}class f{#e;#t;#o;#a;#n;constructor(t,e,n,a){this.#e=t,this.#t=e,this.#n=n,this.#o=r=>a?.encode?a.encode(r):JSON.stringify(r),this.#a=r=>a?.decode?a.decode(r):JSON.parse(r),this.has()||this.write(this.#t)}get initialValue(){return this.#t}get value(){try{const t=this.#n.getItem(this.#e);return t?this.#a(t):this.#t}catch(t){return console.error(t),this.#t}}write(t){t instanceof Function&&(t=t(this.value));try{this.#n.setItem(this.#e,this.#o(t))}catch(e){return console.error(e),this.#t}return t}has(){return this.#n.getItem(this.#e)!==null}reset(){this.write(this.#t)}}class b extends f{constructor(t,e,n){super(t,e,localStorage,n)}}const s=new b("podcast-options",[]);function _(o){return s.value.find(t=>t.id===o)}function u(o,t){s.write(e=>{const n=e.findIndex(a=>a.id===o);return n!==-1&&(e[n]={...e[n],...t}),e})}function g(o){s.write(t=>(t.push(o),t))}function v(){return location.pathname.split("/").filter(Boolean).pop()}function k(o){for(const t of s.value){const e=o.find(S=>S.textContent?.trim()===t.id);if(!e)continue;const n=t.time,a=Math.floor(n/3600),r=Math.floor((n-a*3600)/60),c=Math.floor(n-a*3600-r*60),i=`/ ${p(a)}:${p(r)}:${p(c)}`,P=l("span",i);e.appendChild(P),e.classList.add("visited")}}function x(o){const t=v();if(!t)return;const e=o.querySelector("audio");if(!e)return;const n={id:t,time:0,volume:.1,rate:e.playbackRate},a=_(t);a||g(n),e.currentTime=a?.time??n.time,e.volume=a?.volume??n.volume,e.playbackRate=a?.rate??n.rate;const r=l("input",{name:"player__playbackrate",type:"range",value:`${e.playbackRate}`,step:"0.25",min:"0.75",max:"2",oninput:()=>{const i=parseFloat(r.value);e.playbackRate=i,c.textContent=`${i}x`,u(t,{rate:i})}}),c=l("label",{htmlFor:"player__playbackrate"},`${e.playbackRate}x`);o.append(r,c),e.addEventListener("timeupdate",()=>{u(t,{time:e.currentTime})}),e.addEventListener("volumechange",()=>{u(t,{volume:e.volume})})}const w="",d=document.querySelector(".page__war");d&&d.remove();const h=document.querySelector(".podcast__player");h&&x(h);const m=Array.from(document.querySelectorAll(".podcast-preview__number"));m.length&&k(m),GM_addStyle("html,.article-card__photo,.links__icon,.blob__photo,.colors,img{filter:invert(1)}.header{background-color:#fff}.podcast__player{filter:initial}.podcast-preview__number.visited{color:#b8860b}.player__container{grid-column:1/-1;display:flex}")})();
