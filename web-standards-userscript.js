var L=Object.defineProperty,O=(l,o,a)=>o in l?L(l,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):l[o]=a,u=(l,o,a)=>(O(l,typeof o!="symbol"?o+"":o,a),a);(function(){"use strict";const l="";class o{constructor(e,n,i,r){u(this,"serialize"),u(this,"deserialize"),this.key=e,this.initialValue=n,this.storage=i,this.serialize=s=>r!=null&&r.serialize?r.serialize(s):JSON.stringify(s),this.deserialize=s=>r!=null&&r.deserialize?r.deserialize(s):JSON.parse(s)}get values(){try{const e=this.storage.getItem(this.key);return e?this.deserialize(e):this.initialValue}catch{return this.initialValue}}write(e){e instanceof Function&&(e=e(this.values));try{this.storage.setItem(this.key,this.serialize(e))}catch(n){return console.error(`Failed to save (${this.key}):`,n.message),this.initialValue}return e}reset(){this.write(this.initialValue)}}class a extends o{constructor(e,n,i){super(e,n,localStorage,i)}}const c=new a("podcast-options",[]);function y(t){return c.values.find(e=>e.id===t)}function h(t,e){c.write(n=>{const i=n.findIndex(r=>r.id===t);return i!==-1&&(n[i]={...n[i],...e}),n})}function g(t){c.write(e=>(e.push(t),e))}function _(t){const e=location.pathname.split("/").filter(Boolean).pop();if(!e)return;const n={id:e,time:0,volume:.1},i=y(e);i||g(n),t.addEventListener("timeupdate",()=>{h(e,{time:t.currentTime})}),t.addEventListener("volumechange",()=>{h(e,{volume:t.volume})}),t.currentTime=i?.time??n.time,t.volume=i?.volume??n.volume}function b(t,e,...n){const i=document.createElement(t);return typeof e=="string"?i.append(z(e)):Array.isArray(e)?i.append(...e):(Object.assign(i,e),Object.assign(i.style,e?.style)),n.length&&i.append(...n),i}function z(t){return document.createTextNode(t)}function d(t){return t=Math.abs(t),t>9?`${t}`:`0${t}`}function w(t){for(const e of c.values){const n=t.find(x=>{var v;return((v=x.textContent)==null?void 0:v.trim())===e.id});if(!n)continue;const i=e.time,r=Math.floor(i/3600),s=Math.floor((i-r*3600)/60),S=Math.floor(i-r*3600-s*60),$=`/ ${d(r)}:${d(s)}:${d(S)}`,k=b("span",$);n.appendChild(k),n.classList.add("visited")}}const p=document.querySelector(".page__war");p&&p.remove();const m=document.querySelector(".podcast__player");m&&_(m);const f=[...document.querySelectorAll(".podcast-preview__number")];f.length&&w(f),GM_addStyle("body,.article-card__photo,.links__icon,.blob__photo,.colors,img{filter:invert(1)}.header{background-color:#fff}.podcast__player{filter:initial}.podcast-preview__number.visited{color:#b8860b}")})();
