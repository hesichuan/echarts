import{d as g,o as st,a as ut,c as n,m as ct,r as ht,b as dt,e as gt}from"./@vue-df245e2a.js";import{d as bt,e as pt,u as mt,s as R,r as A}from"./lodash-es-d501d8a3.js";import{k as P}from"./classnames-e8ccfb6c.js";import{l as S}from"./@jiaminghi-ceb7225a.js";let yt="dv-";function E(e,t=!0){return`${t?".":""}${yt}${e}`}function y(e){return E(e,!1)}function vt(e,t){const r=E(t);return`.__STYLED__ {${e.toString()}}`.replaceAll(".__STYLED__",r)}function f(e){return t=>{const r=document.createElement("style"),u=p=>{r.innerHTML=vt(t,p),document.querySelector("head").appendChild(r)},d=()=>document.querySelector("head").removeChild(r);return p=>{const s=e,o=E(p,!1);return g({setup(i,{slots:l}){return st(()=>{u(p)}),ut(()=>{d()}),()=>n(s,ct(i,{class:o}),{default:()=>{var a;return[(a=l==null?void 0:l.default)==null?void 0:a.call(l)]}})}})}}}f.span=f((e,{slots:t})=>n("span",e,[t==null?void 0:t.default()]));f.div=f((e,{slots:t})=>n("div",e,[t==null?void 0:t.default()]));f.img=f(e=>n("img",e,null));f.svg=f((e,{slots:t})=>n("svg",e,[t==null?void 0:t.default()]));function wt(e,t){const r=new MutationObserver(t);return r.observe(e,{attributes:!0,attributeFilter:["class","style"],attributeOldValue:!0}),r}function kt(e,t){const{clientWidth:r=0,clientHeight:u=0}=e||{};e?(!r||!u)&&console.warn("DataV: Component width or height is 0px, rendering abnormality may occur!"):console.warn("DataV: Failed to get dom node, component rendering may be abnormal!"),t.width=r,t.height=u}function m(){const e=ht(),t=[],r=dt({width:0,height:0}),u=()=>{kt(e.value,r)},d=bt(u,100);return st(()=>{u();const p=wt(e.value,d);window.addEventListener("resize",d),t.push(()=>{p.disconnect()},()=>{window.removeEventListener("resize",d)})}),ut(()=>{t.forEach(p=>p())}),{domRef:e,domSize:r}}function b(e){const t=e;return t.install=function(r){r.component(t.displayName||t.name,e)},e}const $t=e=>e,_t=(e,t)=>{const r=Math.abs(e[0]-t[0]),u=Math.abs(e[1]-t[1]);return Math.sqrt(Math.pow(r,2)+Math.pow(u,2))};function L(e,t=[]){return pt(e,t)}function v(){return{color:{type:$t(Array),default:()=>[]},backgroundColor:{type:String,default:"transparent"}}}function w(e,t=[]){return pt(e,t)}const k=f.div`
  position: relative;
  width: 100%;
  height: 100%;
`("border-box"),_=f.div`
  position: relative;
  width: 100%;
  height: 100%;
`("border-box-content"),xt=["#4fd2dd","#235fa7"],St=["left-top","right-top","left-bottom","right-bottom"],I=f.svg`
  position: absolute;
  display: block;
}
.__STYLED__.right-top {
  right: 0px;
  transform: rotateY(180deg);
}
.__STYLED__.left-bottom {
  bottom: 0px;
  transform: rotateX(180deg);
}
.__STYLED__.right-bottom {
  right: 0px;
  bottom: 0px;
  transform: rotateX(180deg) rotateY(180deg);
`("border"),nr=b(g({name:"BorderBox1",props:v(),setup(e,{slots:t}){const{domRef:r,domSize:u}=m();return()=>{const{color:d,backgroundColor:p}=e,{width:s,height:o}=u,i=w(xt,d);return n(k,{class:y("border-box-1"),ref:l=>r.value=l.$el},{default:()=>[n(I,{width:s,height:o},{default:()=>[n("polygon",{fill:p,points:`10, 27 10, ${o-27} 13, ${o-24} 13, ${o-21} 24, ${o-11} 38, ${o-11}
                41, ${o-8} 73, ${o-8} 75, ${o-10} 81, ${o-10} 85, ${o-6}
                ${s-85}, ${o-6} ${s-81}, ${o-10} ${s-75}, ${o-10}
                ${s-73}, ${o-8} ${s-41}, ${o-8} ${s-38}, ${o-11}
                ${s-24}, ${o-11} ${s-13}, ${o-21} ${s-13}, ${o-24}
                ${s-10}, ${o-27} ${s-10}, 27 ${s-13}, 25 ${s-13}, 21
                ${s-24}, 11 ${s-38}, 11 ${s-41}, 8 ${s-73}, 8 ${s-75}, 10
                ${s-81}, 10 ${s-85}, 6 85, 6 81, 10 75, 10 73, 8 41, 8 38, 11 24, 11 13, 21 13, 24`},null)]}),St.map(l=>n(I,{key:l,width:"150",height:"150",class:l},{default:()=>[n("polygon",{fill:i[0],points:"6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63"},[n("animate",{attributeName:"fill",values:`${i[0]};${i[1]};${i[0]}`,dur:"0.5s",begin:"0s",repeatCount:"indefinite"},null)]),n("polygon",{fill:i[1],points:"27.6,4.8 38.4,4.8 35.4,7.8 30.6,7.8"},[n("animate",{attributeName:"fill",values:`${i[1]};${i[0]};${i[1]}`,dur:"0.5s",begin:"0s",repeatCount:"indefinite"},null)]),n("polygon",{fill:i[0],points:"9,54 9,63 7.2,66 7.2,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54"},[n("animate",{attributeName:"fill",values:`${i[0]};${i[1]};transparent`,dur:"1s",begin:"0s",repeatCount:"indefinite"},null)])]})),n(_,null,{default:()=>{var l;return[(l=t.default)==null?void 0:l.call(t)]}})]})}}}));f.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.__STYLED__ > polyline {
  fill: none;
  stroke-width: 1;
`("border-svg-container");f.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.__STYLED__ > polyline {
  fill: none;
}
.__STYLED__ .stroke-width-1 {
  stroke-width: 1;
}
.__STYLED__ .stroke-width-3 {
  stroke-width: 3;
`("border-svg-container");var Ot=Object.defineProperty,Lt=Object.defineProperties,Dt=Object.getOwnPropertyDescriptors,G=Object.getOwnPropertySymbols,Ct=Object.prototype.hasOwnProperty,jt=Object.prototype.propertyIsEnumerable,Q=(e,t,r)=>t in e?Ot(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Pt=(e,t)=>{for(var r in t||(t={}))Ct.call(t,r)&&Q(e,r,t[r]);if(G)for(var r of G(t))jt.call(t,r)&&Q(e,r,t[r]);return e},Et=(e,t)=>Lt(e,Dt(t));const Tt=["red","rgba(0,0,255,0.8)"],Yt=f.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.__STYLED__ > polyline {
  fill: none;
}
.__STYLED__.reverse {
  transform: rotate(180deg);
}
.__STYLED__ .stroke-width1 {
  stroke-width: 1;
}
.__STYLED__ .stroke-width3 {
  stroke-width: 3px;
  stroke-linecap: round;
`("border-svg-container"),Mt=()=>Et(Pt({},v()),{reverse:{type:Boolean,default:!1}});g({name:"BorderBox4",props:Mt(),setup(e,{slots:t}){const{domRef:r,domSize:u}=m();return()=>{const{color:d,backgroundColor:p,reverse:s}=e,{width:o,height:i}=u,l=w(Tt,d);return n(k,{class:y("border-box-4"),ref:a=>r.value=a.$el},{default:()=>[n(Yt,{class:P({reverse:s}),width:o,height:i},{default:()=>[n("polygon",{fill:p,points:`${o-15}, 22 170, 22 150, 7 40, 7 28, 21 32, 24
                16, 42 16, ${i-32} 41, ${i-7} ${o-15}, ${i-7}`},null),n("polyline",{class:"stroke-width1",stroke:l[0],points:`145, ${i-5} 40, ${i-5} 10, ${i-35} 10, 40 40, 5 150, 5 170, 20 ${o-15}, 20`},null),n("polyline",{stroke:l[1],class:"stroke-width1",points:`245, ${i-1} 36, ${i-1} 14, ${i-23} 14, ${i-100}`},null),n("polyline",{class:"stroke-width3",stroke:l[0],points:`7, ${i-40} 7, ${i-75}`},null),n("polyline",{class:"stroke-width3",stroke:l[0],points:"28, 24 13, 41 13, 64"},null),n("polyline",{class:"stroke-width1",stroke:l[0],points:"5, 45 5, 140"},null),n("polyline",{class:"stroke-width1",stroke:l[1],points:"14, 75 14, 180"},null),n("polyline",{class:"stroke-width1",stroke:l[1],points:"55, 11 147, 11 167, 26 250, 26"},null),n("polyline",{class:"stroke-width3",stroke:l[1],points:"158, 5 173, 16"},null),n("polyline",{class:"stroke-width3",style:{strokeDasharray:"100 250"},stroke:l[0],points:`200, 17 ${o-10}, 17`},null),n("polyline",{class:"stroke-width1",style:{strokeDasharray:"80 270"},stroke:l[1],points:`385, 17 ${o-10}, 17`},null)]}),n(_,null,{default:()=>{var a;return[n("slot",null,[(a=t.default)==null?void 0:a.call(t)])]}})]})}}});var Nt=Object.defineProperty,zt=Object.defineProperties,Bt=Object.getOwnPropertyDescriptors,X=Object.getOwnPropertySymbols,Rt=Object.prototype.hasOwnProperty,At=Object.prototype.propertyIsEnumerable,V=(e,t,r)=>t in e?Nt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,It=(e,t)=>{for(var r in t||(t={}))Rt.call(t,r)&&V(e,r,t[r]);if(X)for(var r of X(t))At.call(t,r)&&V(e,r,t[r]);return e},Gt=(e,t)=>zt(e,Bt(t));const Qt=["rgba(255, 255, 255, 0.35)","rgba(255, 255, 255, 0.20)"],Xt=f.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.__STYLED__ > polyline {
  fill: none;
}
.__STYLED__.reverse {
  transform: rotate(180deg);
}
.__STYLED__ .stroke-width1 {
  stroke-width: 1;
}
.__STYLED__ .stroke-width2 {
  stroke-width: 2px;
}
.__STYLED__ .stroke-width5 {
  stroke-width: 5px;
`("border-svg-container"),Vt=()=>Gt(It({},v()),{reverse:{type:Boolean,default:!1}});g({name:"BorderBox5",props:Vt(),setup(e,{slots:t}){const{domRef:r,domSize:u}=m();return()=>{const{color:d,backgroundColor:p,reverse:s}=e,{width:o,height:i}=u,l=w(Qt,d);return n(k,{class:y("border-box-5"),ref:a=>r.value=a.$el},{default:()=>[n(Xt,{class:P({reverse:s}),width:o,height:i},{default:()=>[n("polygon",{fill:p,points:`
                  10, 22 ${o-22}, 22 ${o-22}, ${i-86} ${o-84}, ${i-24} 10, ${i-24}`},null),n("polyline",{class:"stroke-width1",stroke:l[0],points:`8, 5 ${o-5}, 5 ${o-5}, ${i-100}
                  ${o-100}, ${i-5} 8, ${i-5} 8, 5`},null),n("polyline",{class:"stroke-width1",stroke:l[1],points:`3, 5 ${o-20}, 5 ${o-20}, ${i-60}
                  ${o-74}, ${i-5} 3, ${i-5} 3, 5`},null),n("polyline",{class:"stroke-width5",stroke:l[1],points:`50, 13 ${o-35}, 13`},null),n("polyline",{class:"stroke-width2",stroke:l[1],points:`15, 20 ${o-35}, 20`},null),n("polyline",{class:"stroke-width2",stroke:l[1],points:`15, ${i-20} ${o-110}, ${i-20}`},null),n("polyline",{class:"stroke-width5",stroke:l[1],points:`15, ${i-13} ${o-110}, ${i-13}`},null)]}),n(_,null,{default:()=>{var a;return[n("slot",null,[(a=t.default)==null?void 0:a.call(t)])]}})]})}}});f.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.__STYLED__ > polyline {
  fill: none;
  stroke-width: 1;
`("border-svg-container");f.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.__STYLED__ > polyline {
  fill: none;
  stroke-linecap: round;
}
.__STYLED__ .stroke-width2 {
  stroke-width: 2px;
}
.__STYLED__ .stroke-width5 {
  stroke-width: 5px;
`("border-svg-container");function T(){return gt(dt({id:mt("datav_uuid")}))}var Wt=Object.defineProperty,qt=Object.defineProperties,Ft=Object.getOwnPropertyDescriptors,W=Object.getOwnPropertySymbols,Ht=Object.prototype.hasOwnProperty,Ut=Object.prototype.propertyIsEnumerable,q=(e,t,r)=>t in e?Wt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Jt=(e,t)=>{for(var r in t||(t={}))Ht.call(t,r)&&q(e,r,t[r]);if(W)for(var r of W(t))Ut.call(t,r)&&q(e,r,t[r]);return e},Kt=(e,t)=>qt(e,Ft(t));const Zt=["#235fa7","#4fd2dd"],te=f.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
`("border-svg-container"),ee=()=>Kt(Jt({},v()),{dur:{type:Number,default:3},reverse:{type:Boolean,default:!1}});g({name:"BorderBox8",props:ee(),setup(e,{slots:t}){const{domRef:r,domSize:u}=m(),d=T();return()=>{const{color:p,backgroundColor:s,dur:o,reverse:i}=e,{width:l,height:a}=u,$=w(Zt,p),c=`border-box-8-path-${d.id}`,h=`border-box-8-gradient-${d.id}`,z=`border-box-8-mask-${d.id}`,B=i?`M 2.5, 2.5 L 2.5, ${a-2.5} L ${l-2.5}, ${a-2.5} L ${l-2.5}, 2.5 L 2.5, 2.5`:`M2.5, 2.5 L${l-2.5}, 2.5 L${l-2.5}, ${a-2.5} L2.5, ${a-2.5} L2.5, 2.5`;return n(k,{class:y("border-box-8"),ref:O=>r.value=O.$el},{default:()=>[n(te,{width:l,height:a},{default:()=>[n("defs",null,[n("path",{id:c,d:B,fill:"transparent"},null),n("radialGradient",{id:h,cx:"50%",cy:"50%",r:"50%"},[n("stop",{offset:"0%","stop-color":"#fff","stop-opacity":"1"},null),n("stop",{offset:"100%","stop-color":"#fff","stop-opacity":"0"},null)]),n("mask",{id:z},[n("circle",{cx:"0",cy:"0",r:"150",fill:`url(#${h})`},[n("animateMotion",{dur:`${o}s`,path:B,rotate:"auto",repeatCount:"indefinite"},null)])])]),n("polygon",{fill:s,points:`5, 5 ${l-5}, 5 ${l-5} ${a-5} 5, ${a-5}`},null),n("use",{stroke:$[0],"stroke-width":"1","xlink:href":`#${c}`},null),n("use",{stroke:$[1],"stroke-width":"3","xlink:href":`#${c}`,mask:`url(#${z})`},[n("animate",{attributeName:"stroke-dasharray",from:`0, ${length}`,to:`${length}, 0`,dur:`${o}s`,repeatCount:"indefinite"},null)])]}),n(_,null,{default:()=>{var O;return[n("slot",null,[(O=t.default)==null?void 0:O.call(t)])]}})]})}}});f.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
`("border-svg-container");f.svg`
  position: absolute;
  display: block;
}
.__STYLED__.right-top {
  right: 0px;
  transform: rotateY(180deg);
}
.__STYLED__.left-bottom {
  bottom: 0px;
  transform: rotateX(180deg);
}
.__STYLED__.right-bottom {
  right: 0px;
  bottom: 0px;
  transform: rotateX(180deg) rotateY(180deg);
`("border-svg-container");var re=Object.defineProperty,oe=Object.defineProperties,ne=Object.getOwnPropertyDescriptors,F=Object.getOwnPropertySymbols,le=Object.prototype.hasOwnProperty,ie=Object.prototype.propertyIsEnumerable,H=(e,t,r)=>t in e?re(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ae=(e,t)=>{for(var r in t||(t={}))le.call(t,r)&&H(e,r,t[r]);if(F)for(var r of F(t))ie.call(t,r)&&H(e,r,t[r]);return e},se=(e,t)=>oe(e,ne(t));const U=["#8aaafb","#1f33a2"],ue=f.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.__STYLED__ > polyline {
  fill: none;
  stroke-width: 1;
`("border-svg-container"),de=()=>se(ae({},v()),{titleWidth:{type:Number,default:250},title:{type:String,default:""}});g({name:"BorderBox11",props:de(),setup(e,{slots:t}){const{domRef:r,domSize:u}=m(),d=T();return()=>{const{color:p,backgroundColor:s,titleWidth:o,title:i}=e,{width:l,height:a}=u,$=w(U,p),c=`border-box-11-filterId-${d}`;return n(k,{class:y("border-box-11"),ref:h=>r.value=h.$el},{default:()=>[n(ue,{width:l,height:a},{default:()=>[n("defs",null,[n("filter",{id:c,height:"150%",width:"150%",x:"-25%",y:"-25%"},[n("feMorphology",{operator:"dilate",radius:"2",in:"SourceAlpha",result:"thicken"},null),n("feGaussianBlur",{in:"thicken",stdDeviation:"3",result:"blurred"},null),n("feFlood",{"flood-color":$[1],result:"glowColor"},null),n("feComposite",{in:"glowColor",in2:"blurred",operator:"in",result:"softGlowColored"},null),n("feMerge",null,[n("feMergeNode",{in:"softGlowColored"},null),n("feMergeNode",{in:"SourceGraphic"},null)])])]),n("polygon",{fill:s,points:`
                  20, 32 ${l*.5-o/2}, 32 ${l*.5-o/2+20}, 53
                  ${l*.5+o/2-20}, 53 ${l*.5+o/2}, 32
                  ${l-20}, 32 ${l-8}, 48 ${l-8}, ${a-25} ${l-20}, ${a-8}
                  20, ${a-8} 8, ${a-25} 8, 50
                `},null),n("polyline",{stroke:$[0],filter:`url(#${c})`,points:`
                  ${(l-o)/2}, 30
                  20, 30 7, 50 7, ${50+(a-167)/2}
                  13, ${55+(a-167)/2} 13, ${135+(a-167)/2}
                  7, ${140+(a-167)/2} 7, ${a-27}
                  20, ${a-7} ${l-20}, ${a-7} ${l-7}, ${a-27}
                  ${l-7}, ${140+(a-167)/2} ${l-13}, ${135+(a-167)/2}
                  ${l-13}, ${55+(a-167)/2} ${l-7}, ${50+(a-167)/2}
                  ${l-7}, 50 ${l-20}, 30 ${(l+o)/2}, 30
                  ${(l+o)/2-20}, 7 ${(l-o)/2+20}, 7
                  ${(l-o)/2}, 30 ${(l-o)/2+20}, 52
                  ${(l+o)/2-20}, 52 ${(l+o)/2}, 30
                `},null),n("polygon",{stroke:$[0],fill:"transparent",points:`
                  ${(l+o)/2-5}, 30 ${(l+o)/2-21}, 11
                  ${(l+o)/2-27}, 11 ${(l+o)/2-8}, 34
                `},null),n("polygon",{stroke:$[0],fill:"transparent",points:`
                  ${(l-o)/2+5}, 30 ${(l-o)/2+22}, 49
                  ${(l-o)/2+28}, 49 ${(l-o)/2+8}, 26
                `},null),n("polygon",{stroke:$[0],fill:S.fade($[1]||U[1],30),filter:`url(#${c})`,points:`
                  ${(l+o)/2-11}, 37 ${(l+o)/2-32}, 11
                  ${(l-o)/2+23}, 11 ${(l-o)/2+11}, 23
                  ${(l-o)/2+33}, 49 ${(l+o)/2-22}, 49
                `},null),n("polygon",{filter:`url(#${c})`,fill:$[0],opacity:"1",points:`
                  ${(l-o)/2-10}, 37 ${(l-o)/2-31}, 37
                  ${(l-o)/2-25}, 46 ${(l-o)/2-4}, 46
                `},[n("animate",{attributeName:"opacity",values:"1;0.7;1",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n("polygon",{filter:`url(#${c})`,fill:$[0],opacity:"0.7",points:`
                  ${(l-o)/2-40}, 37 ${(l-o)/2-61}, 37
                  ${(l-o)/2-55}, 46 ${(l-o)/2-34}, 46
                `},[n("animate",{attributeName:"opacity",values:"0.7;0.4;0.7",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n("polygon",{filter:`url(#${c})`,fill:$[0],opacity:"0.5",points:`
                  ${(l-o)/2-70}, 37 ${(l-o)/2-91}, 37
                  ${(l-o)/2-85}, 46 ${(l-o)/2-64}, 46
                `},[n("animate",{attributeName:"opacity",values:"0.5;0.2;0.5",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n("polygon",{filter:`url(#${c})`,fill:$[0],opacity:"1",points:`
                  ${(l+o)/2+30}, 37 ${(l+o)/2+9}, 37
                  ${(l+o)/2+3}, 46 ${(l+o)/2+24}, 46
                `},[n("animate",{attributeName:"opacity",values:"1;0.7;1",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n("polygon",{filter:`url(#${c})`,fill:$[0],opacity:"0.7",points:`
                  ${(l+o)/2+60}, 37 ${(l+o)/2+39}, 37
                  ${(l+o)/2+33}, 46 ${(l+o)/2+54}, 46
                `},[n("animate",{attributeName:"opacity",values:"0.7;0.4;0.7",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n("polygon",{filter:`url(#${c})`,fill:$[0],opacity:"0.5",points:`
                  ${(l+o)/2+90}, 37 ${(l+o)/2+69}, 37
                  ${(l+o)/2+63}, 46 ${(l+o)/2+84}, 46
                `},[n("animate",{attributeName:"opacity",values:"0.5;0.2;0.5",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n("text",{class:"dv-border-box-11-title",x:`${l/2}`,y:"32",fill:"#fff","font-size":"18","text-anchor":"middle","dominant-baseline":"middle"},[i]),n("polygon",{fill:$[0],filter:`url(#${c})`,points:`
                  7, ${53+(a-167)/2} 11, ${57+(a-167)/2}
                  11, ${133+(a-167)/2} 7, ${137+(a-167)/2}
                `},null),n("polygon",{fill:$[0],filter:`url(#${c})`,points:`
                  ${l-7}, ${53+(a-167)/2} ${l-11}, ${57+(a-167)/2}
                  ${l-11}, ${133+(a-167)/2} ${l-7}, ${137+(a-167)/2}
                `},null)]}),n(_,null,{default:()=>{var h;return[n("slot",null,[(h=t.default)==null?void 0:h.call(t)])]}})]})}}});const x=["#2e6099","#7ce7fd"],pe=f.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`("border-svg-container"),lr=b(g({name:"BorderBox12",props:v(),setup(e,{slots:t}){const{domRef:r,domSize:u}=m(),d=T();return()=>{const{color:p,backgroundColor:s}=e,{width:o,height:i}=u,l=w(x,p),a=`border-box-12-filterId-${d}`;return n(k,{class:y("border-box-12"),ref:$=>r.value=$.$el},{default:()=>[n(pe,{width:o,height:i},{default:()=>[n("defs",null,[n("filter",{id:a,height:"150%",width:"150%",x:"-25%",y:"-25%"},[n("feMorphology",{operator:"dilate",radius:"1",in:"SourceAlpha",result:"thicken"},null),n("feGaussianBlur",{in:"thicken",stdDeviation:"2",result:"blurred"},null),n("feFlood",{"flood-color":S.fade(l[1]||x[1],70),result:"glowColor"},[n("animate",{attributeName:"flood-color",values:`
                        ${S.fade(l[1]||x[1],70)};
                        ${S.fade(l[1]||x[1],30)};
                        ${S.fade(l[1]||x[1],70)};
                      `,dur:"3s",begin:"0s",repeatCount:"indefinite"},null)]),n("feComposite",{in:"glowColor",in2:"blurred",operator:"in",result:"softGlowColored"},null),n("feMerge",null,[n("feMergeNode",{in:"softGlowColored"},null),n("feMergeNode",{in:"SourceGraphic"},null)])])]),o&&i&&n("path",{fill:s,"stroke-width":"2",stroke:l[0],d:`
                    M15 5 L ${o-15} 5 Q ${o-5} 5, ${o-5} 15
                    L ${o-5} ${i-15} Q ${o-5} ${i-5}, ${o-15} ${i-5}
                    L 15, ${i-5} Q 5 ${i-5} 5 ${i-15} L 5 15
                    Q 5 5 15 5
                  `},null),n("path",{"stroke-width":"2",fill:"transparent","stroke-linecap":"round",filter:`url(#${a})`,stroke:l[1],d:"M 20 5 L 15 5 Q 5 5 5 15 L 5 20"},null),n("path",{"stroke-width":"2",fill:"transparent","stroke-linecap":"round",filter:`url(#${a})`,stroke:l[1],d:`M ${o-20} 5 L ${o-15} 5 Q ${o-5} 5 ${o-5} 15 L ${o-5} 20`},null),n("path",{"stroke-width":"2",fill:"transparent","stroke-linecap":"round",filter:`url(#${a})`,stroke:l[1],d:`
                  M ${o-20} ${i-5} L ${o-15} ${i-5}
                  Q ${o-5} ${i-5} ${o-5} ${i-15}
                  L ${o-5} ${i-20}
                `},null),n("path",{"stroke-width":"2",fill:"transparent","stroke-linecap":"round",filter:`url(#${a})`,stroke:l[1],d:`
                  M 20 ${i-5} L 15 ${i-5}
                  Q 5 ${i-5} 5 ${i-15}
                  L 5 ${i-20}
                `},null)]}),n(_,null,{default:()=>{var $;return[n("slot",null,[($=t.default)==null?void 0:$.call(t)])]}})]})}}}));f.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`("border-svg-container");function D(){return{color:{type:$t(Array),default:()=>[]}}}function Y(){return{reverse:{type:Boolean,default:!1}}}function M(e){return{duration:{type:Number,default:e}}}function $e({width:e,height:t,rowPoints:r,rowCount:u}){const d=e/(r+1),p=t/(u+1);return new Array(u).fill(0).map((s,o)=>new Array(r).fill(0).map((i,l)=>[d*(l+1),p*(o+1)])).reduce((s,o)=>[...s,...o],[])}const fe=200,ce=50,N=20,he=4,ft=$e({width:fe,height:ce,rowPoints:N,rowCount:he});ft[N*2-1];ft[N*2-3];f.div`
  width: 100%;
  height: 100%;
}
.__STYLED__ svg {
  transform-origin: left top;
`("decoration-1");var ge=Object.defineProperty,J=Object.getOwnPropertySymbols,be=Object.prototype.hasOwnProperty,me=Object.prototype.propertyIsEnumerable,K=(e,t,r)=>t in e?ge(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,C=(e,t)=>{for(var r in t||(t={}))be.call(t,r)&&K(e,r,t[r]);if(J)for(var r of J(t))me.call(t,r)&&K(e,r,t[r]);return e};const ye=["#3faacb","#fff"];function ve(){return C(C(C({},D()),Y()),M(6))}function we(e,t,r){return e?{width:1,height:r,x:t/2,y:0}:{width:t,height:1,x:0,y:r/2}}const ke=f.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`("decoration-2");g({name:"Decoration2",props:ve(),setup(e){const{domRef:t,domSize:r}=m();return()=>{const{width:u,height:d}=r,{color:p,reverse:s,duration:o}=e,i=L(ye,p),{x:l,y:a,width:$,height:c}=we(s,u,d);return n(ke,{ref:h=>t.value=h.$el},{default:()=>[n("svg",{width:u,height:d},[n("rect",{x:l,y:a,width:$,height:c,fill:i[0]},[n("animate",{attributeName:s?"height":"width",from:"0",to:s?d:u,dur:`${o}s`,calcMode:"spline",keyTimes:"0;1",keySplines:".42,0,.58,1",repeatCount:"indefinite"},null)]),n("rect",{x:l,y:a,width:"1",height:"1",fill:i[1]},[n("animate",{attributeName:s?"y":"x",from:"0",to:s?d:u,dur:`${o}s`,calcMode:"spline",keyTimes:"0;1",keySplines:"0.42,0,0.58,1",repeatCount:"indefinite"},null)])])]})}}});function _e({width:e,height:t,rowPoints:r,rowCount:u}){const d=e/(r+1),p=t/(u+1);return new Array(u).fill(0).map((s,o)=>new Array(r).fill(0).map((i,l)=>[d*(l+1),p*(o+1)])).reduce((s,o)=>[...s,...o],[])}const xe=300,Se=35,Oe=25,Le=2;_e({width:xe,height:Se,rowPoints:Oe,rowCount:Le});f.div`
  width: 100%;
  height: 100%;
}
.__STYLED__ svg {
  transform-origin: left top;
`("decoration-3");var De=Object.defineProperty,Z=Object.getOwnPropertySymbols,Ce=Object.prototype.hasOwnProperty,je=Object.prototype.propertyIsEnumerable,tt=(e,t,r)=>t in e?De(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,j=(e,t)=>{for(var r in t||(t={}))Ce.call(t,r)&&tt(e,r,t[r]);if(Z)for(var r of Z(t))je.call(t,r)&&tt(e,r,t[r]);return e};function Pe(){return j(j(j({},D()),Y()),M(3))}const Ee=["rgba(255, 255, 255, 0.3)","rgba(255, 255, 255, 0.3)"],Te=f.div`
  position: relative;
  width: 100%;
  height: 100%;
`("decoration-4"),Ye=f.div`
  display: flex;
  overflow: hidden;
  position: absolute;
  flex: 1;
}
.__STYLED__.normal {
  animation: ani-height ease-in-out infinite;
  left: 50%;
  margin-left: -2px;
}
.__STYLED__.reverse {
  animation: ani-width ease-in-out infinite;
  top: 50%;
  margin-top: -2px;
}
@keyframes ani-height {
  0% {
    height: 0%;
  }
  70% {
    height: 100%;
  }
  100% {
    height: 100%;
  }
}
@keyframes ani-width {
  0% {
    width: 0%;
  }
  70% {
    width: 100%;
  }
  100% {
    width: 100%;
  }
`("decoration-content"),ir=b(g({name:"Decoration4",props:Pe(),setup(e){const{domRef:t,domSize:r}=m();return()=>{const{width:u,height:d}=r,{color:p,reverse:s,duration:o}=e,i=L(Ee,p),l=s?u:5,a=s?5:d,$={width:`${l}px`,height:`${a}px`,animationDuration:`${o}s`},c=s?`0, 2.5 ${u}, 2.5`:`2.5, 0 2.5, ${d}`;return n(Te,{ref:h=>t.value=h.$el},{default:()=>[n(Ye,{class:P(s?"reverse":"normal"),style:$},{default:()=>[n("svg",{width:l,height:a},[n("polyline",{stroke:i[0],points:c},null),n("polyline",{class:"bold-line",stroke:i[1],"stroke-width":"3","stroke-dasharray":"20, 80","stroke-dashoffset":"-30",points:c},null)])]})]})}}}));var Me=Object.defineProperty,et=Object.getOwnPropertySymbols,Ne=Object.prototype.hasOwnProperty,ze=Object.prototype.propertyIsEnumerable,rt=(e,t,r)=>t in e?Me(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ot=(e,t)=>{for(var r in t||(t={}))Ne.call(t,r)&&rt(e,r,t[r]);if(et)for(var r of et(t))ze.call(t,r)&&rt(e,r,t[r]);return e};const Be=["#3f96a5","#3f96a5"];function Re(){return ot(ot({},D()),M(1.2))}function nt(e){return new Array(e.length-1).fill(0).map((t,r)=>_t(e[r],e[r+1]))}function Ae(e,t){const r=[[0,t*.2],[e*.18,t*.2],[e*.2,t*.4],[e*.25,t*.4],[e*.27,t*.6],[e*.72,t*.6],[e*.75,t*.4],[e*.8,t*.4],[e*.82,t*.2],[e,t*.2]],u=[[e*.3,t*.8],[e*.7,t*.8]];return{line1Sum:R(nt(r)),line2Sum:R(nt(u)),line1Point:r.map(d=>d.join(",")).join(" "),line2Point:u.map(d=>d.join(",")).join(" ")}}const Ie=f.div`
  width: 100%;
  height: 100%;
`("decoration-5");g({name:"Decoration5",props:Re(),setup(e){const{domRef:t,domSize:r}=m();return()=>{const{width:u,height:d}=r,{color:p,duration:s}=e,o=L(Be,p),{line1Sum:i,line2Sum:l,line1Point:a,line2Point:$}=Ae(u,d);return n(Ie,{ref:c=>t.value=c.$el},{default:()=>[n("svg",{width:u,height:d},[n("polyline",{fill:"transparent",stroke:o[0],"stroke-width":"3",points:a},[n("animate",{attributeName:"stroke-dasharray",attributeType:"XML",from:`0, ${i/2}, 0, ${i/2}`,to:`0, 0, ${i}, 0`,dur:`${s}s`,begin:"0s",calcMode:"spline",keyTimes:"0;1",keySplines:"0.4,1,0.49,0.98",repeatCount:"indefinite"},null)]),n("polyline",{fill:"transparent",stroke:o[1],"stroke-width":"2",points:$},[n("animate",{attributeName:"stroke-dasharray",attributeType:"XML",from:`0, ${l/2}, 0, ${l/2}`,to:`0, 0, ${l}, 0`,dur:`${s}s`,begin:"0s",calcMode:"spline",keyTimes:"0;1",keySplines:".4,1,.49,.98",repeatCount:"indefinite"},null)])])]})}}});const Ge=300,Qe=35,Xe=1,Ve=40;f.div`
  width: 100%;
  height: 100%;
}
.__STYLED__ .svg-origin {
  transform-origin: left top;
`("decoration-6");function We({width:e,height:t,rowPoints:r,rowCount:u}){const d=e/(r+1),p=t/(u+1),s=new Array(u).fill(0).map((a,$)=>new Array(r).fill(0).map((c,h)=>[d*(h+1),p*($+1)])).reduce((a,$)=>[...a,...$],[]),o=new Array(u*r).fill(0).map(()=>Math.random()>.8?A(.7*t,t):A(.2*t,.5*t)),i=new Array(u*r).fill(0).map((a,$)=>o[$]*Math.random()),l=new Array(u*r).fill(0).map(()=>Math.random()+1.5);return{points:s,heights:o,minHeights:i,randoms:l}}We({width:Ge,height:Qe,rowPoints:Ve,rowCount:Xe});f.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`("decoration-7");var qe=Object.defineProperty,lt=Object.getOwnPropertySymbols,Fe=Object.prototype.hasOwnProperty,He=Object.prototype.propertyIsEnumerable,it=(e,t,r)=>t in e?qe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,at=(e,t)=>{for(var r in t||(t={}))Fe.call(t,r)&&it(e,r,t[r]);if(lt)for(var r of lt(t))He.call(t,r)&&it(e,r,t[r]);return e};const Ue=["#3f96a5","#3f96a5"];function Je(){return at(at({},D()),Y())}const Ke=f.div`
  display: flex;
  width: 100%;
  height: 100%;
`("decoration-8");g({name:"Decoration8",props:Je(),setup(e){const{domRef:t,domSize:r}=m();return()=>{const{color:u,reverse:d}=e,{width:p,height:s}=r,o=l=>d?p-l:l,i=L(Ue,u);return n(Ke,{ref:l=>t.value=l.$el},{default:()=>[n("svg",{width:p,height:s},[n("polyline",{stroke:i[0],"stroke-width":"2",fill:"transparent",points:`${o(0)}, 0 ${o(30)}, ${s/2}`},null),n("polyline",{stroke:i[0],"stroke-width":"2",fill:"transparent",points:`${o(20)}, 0 ${o(50)}, ${s/2} ${o(p)}, ${s/2}`},null),n("polyline",{stroke:i[1],fill:"transparent","stroke-width":"3",points:`${o(0)}, ${s-3}, ${o(200)}, ${s-3}`},null)])]})}}});const Ze=f.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.__STYLED__ .loading-tip {
  font-size: 15px;
`("loading"),ar=b(g({name:"Loading",setup(e,{slots:t}){return()=>n(Ze,null,{default:()=>{var r;return[n("svg",{width:"50px",height:"50px"},[n("circle",{cx:"25",cy:"25",r:"20",fill:"transparent","stroke-width":"3","stroke-dasharray":"31.415, 31.415",stroke:"#02bcfe","stroke-linecap":"round"},[n("animateTransform",{attributeName:"transform",type:"rotate",values:"0, 25 25;360, 25 25",dur:"1.5s",repeatCount:"indefinite"},null),n("animate",{attributeName:"stroke",values:"#02bcfe;#3be6cb;#02bcfe",dur:"3s",repeatCount:"indefinite"},null)]),n("circle",{cx:"25",cy:"25",r:"10",fill:"transparent","stroke-width":"3","stroke-dasharray":"15.7, 15.7",stroke:"#3be6cb","stroke-linecap":"round"},[n("animateTransform",{attributeName:"transform",type:"rotate",values:"360, 25 25;0, 25 25",dur:"1.5s",repeatCount:"indefinite"},null),n("animate",{attributeName:"stroke",values:"#3be6cb;#02bcfe;#3be6cb",dur:"3s",repeatCount:"indefinite"},null)])]),n("div",{class:"loading-tip"},[(r=t.default)==null?void 0:r.call(t)])]}})}}));export{ir as A,nr as D,lr as R,ar as f};
