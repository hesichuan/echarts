import{d as b,o as nt,a as it,c as n,m as pt,r as ct,b as lt,e as ft}from"./@vue-c25b4755.js";import{k as L}from"./classnames-f98c4d67.js";import{d as ht,e as at,u as $t,s as N,r as z}from"./lodash-es-d501d8a3.js";import{l as bt}from"./@jiaminghi-ceb7225a.js";let gt="dv-";function P(e,t=!0){return`${t?".":""}${gt}${e}`}function v(e){return P(e,!1)}function yt(e,t){const r=P(t);return`.__STYLED__ {${e.toString()}}`.replaceAll(".__STYLED__",r)}function p(e){return t=>{const r=document.createElement("style"),s=c=>{r.innerHTML=yt(t,c),document.querySelector("head").appendChild(r)},u=()=>document.querySelector("head").removeChild(r);return c=>{const d=e,i=P(c,!1);return b({setup(a,{slots:o}){return nt(()=>{s(c)}),it(()=>{u()}),()=>n(d,pt(a,{class:i}),{default:()=>{var l;return[(l=o==null?void 0:o.default)==null?void 0:l.call(o)]}})}})}}}p.span=p((e,{slots:t})=>n("span",e,[t==null?void 0:t.default()]));p.div=p((e,{slots:t})=>n("div",e,[t==null?void 0:t.default()]));p.img=p(e=>n("img",e,null));p.svg=p((e,{slots:t})=>n("svg",e,[t==null?void 0:t.default()]));function mt(e,t){const r=new MutationObserver(t);return r.observe(e,{attributes:!0,attributeFilter:["class","style"],attributeOldValue:!0}),r}function vt(e,t){const{clientWidth:r=0,clientHeight:s=0}=e||{};e?(!r||!s)&&console.warn("DataV: Component width or height is 0px, rendering abnormality may occur!"):console.warn("DataV: Failed to get dom node, component rendering may be abnormal!"),t.width=r,t.height=s}function y(){const e=ct(),t=[],r=lt({width:0,height:0}),s=()=>{vt(e.value,r)},u=ht(s,100);return nt(()=>{s();const c=mt(e.value,u);window.addEventListener("resize",u),t.push(()=>{c.disconnect()},()=>{window.removeEventListener("resize",u)})}),it(()=>{t.forEach(c=>c())}),{domRef:e,domSize:r}}function g(e){const t=e;return t.install=function(r){r.component(t.displayName||t.name,e)},e}const st=e=>e,wt=(e,t)=>{const r=Math.abs(e[0]-t[0]),s=Math.abs(e[1]-t[1]);return Math.sqrt(Math.pow(r,2)+Math.pow(s,2))};function w(e,t=[]){return at(e,t)}function _(){return{color:{type:st(Array),default:()=>[]},backgroundColor:{type:String,default:"transparent"}}}function k(e,t=[]){return at(e,t)}const x=p.div`
  position: relative;
  width: 100%;
  height: 100%;
`("border-box"),S=p.div`
  position: relative;
  width: 100%;
  height: 100%;
`("border-box-content");p.svg`
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
`("border");p.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.__STYLED__ > polyline {
  fill: none;
  stroke-width: 1;
`("border-svg-container");p.svg`
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
`("border-svg-container");var _t=Object.defineProperty,kt=Object.defineProperties,xt=Object.getOwnPropertyDescriptors,A=Object.getOwnPropertySymbols,St=Object.prototype.hasOwnProperty,Ot=Object.prototype.propertyIsEnumerable,B=(e,t,r)=>t in e?_t(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Dt=(e,t)=>{for(var r in t||(t={}))St.call(t,r)&&B(e,r,t[r]);if(A)for(var r of A(t))Ot.call(t,r)&&B(e,r,t[r]);return e},jt=(e,t)=>kt(e,xt(t));const Lt=["red","rgba(0,0,255,0.8)"],Pt=p.svg`
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
`("border-svg-container"),Et=()=>jt(Dt({},_()),{reverse:{type:Boolean,default:!1}});b({name:"BorderBox4",props:Et(),setup(e,{slots:t}){const{domRef:r,domSize:s}=y();return()=>{const{color:u,backgroundColor:c,reverse:d}=e,{width:i,height:a}=s,o=k(Lt,u);return n(x,{class:v("border-box-4"),ref:l=>r.value=l.$el},{default:()=>[n(Pt,{class:L({reverse:d}),width:i,height:a},{default:()=>[n("polygon",{fill:c,points:`${i-15}, 22 170, 22 150, 7 40, 7 28, 21 32, 24
                16, 42 16, ${a-32} 41, ${a-7} ${i-15}, ${a-7}`},null),n("polyline",{class:"stroke-width1",stroke:o[0],points:`145, ${a-5} 40, ${a-5} 10, ${a-35} 10, 40 40, 5 150, 5 170, 20 ${i-15}, 20`},null),n("polyline",{stroke:o[1],class:"stroke-width1",points:`245, ${a-1} 36, ${a-1} 14, ${a-23} 14, ${a-100}`},null),n("polyline",{class:"stroke-width3",stroke:o[0],points:`7, ${a-40} 7, ${a-75}`},null),n("polyline",{class:"stroke-width3",stroke:o[0],points:"28, 24 13, 41 13, 64"},null),n("polyline",{class:"stroke-width1",stroke:o[0],points:"5, 45 5, 140"},null),n("polyline",{class:"stroke-width1",stroke:o[1],points:"14, 75 14, 180"},null),n("polyline",{class:"stroke-width1",stroke:o[1],points:"55, 11 147, 11 167, 26 250, 26"},null),n("polyline",{class:"stroke-width3",stroke:o[1],points:"158, 5 173, 16"},null),n("polyline",{class:"stroke-width3",style:{strokeDasharray:"100 250"},stroke:o[0],points:`200, 17 ${i-10}, 17`},null),n("polyline",{class:"stroke-width1",style:{strokeDasharray:"80 270"},stroke:o[1],points:`385, 17 ${i-10}, 17`},null)]}),n(S,null,{default:()=>{var l;return[n("slot",null,[(l=t.default)==null?void 0:l.call(t)])]}})]})}}});var Tt=Object.defineProperty,Ct=Object.defineProperties,Yt=Object.getOwnPropertyDescriptors,R=Object.getOwnPropertySymbols,Mt=Object.prototype.hasOwnProperty,Nt=Object.prototype.propertyIsEnumerable,I=(e,t,r)=>t in e?Tt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,zt=(e,t)=>{for(var r in t||(t={}))Mt.call(t,r)&&I(e,r,t[r]);if(R)for(var r of R(t))Nt.call(t,r)&&I(e,r,t[r]);return e},At=(e,t)=>Ct(e,Yt(t));const Bt=["rgba(255, 255, 255, 0.35)","rgba(255, 255, 255, 0.20)"],Rt=p.svg`
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
`("border-svg-container"),It=()=>At(zt({},_()),{reverse:{type:Boolean,default:!1}});b({name:"BorderBox5",props:It(),setup(e,{slots:t}){const{domRef:r,domSize:s}=y();return()=>{const{color:u,backgroundColor:c,reverse:d}=e,{width:i,height:a}=s,o=k(Bt,u);return n(x,{class:v("border-box-5"),ref:l=>r.value=l.$el},{default:()=>[n(Rt,{class:L({reverse:d}),width:i,height:a},{default:()=>[n("polygon",{fill:c,points:`
                  10, 22 ${i-22}, 22 ${i-22}, ${a-86} ${i-84}, ${a-24} 10, ${a-24}`},null),n("polyline",{class:"stroke-width1",stroke:o[0],points:`8, 5 ${i-5}, 5 ${i-5}, ${a-100}
                  ${i-100}, ${a-5} 8, ${a-5} 8, 5`},null),n("polyline",{class:"stroke-width1",stroke:o[1],points:`3, 5 ${i-20}, 5 ${i-20}, ${a-60}
                  ${i-74}, ${a-5} 3, ${a-5} 3, 5`},null),n("polyline",{class:"stroke-width5",stroke:o[1],points:`50, 13 ${i-35}, 13`},null),n("polyline",{class:"stroke-width2",stroke:o[1],points:`15, 20 ${i-35}, 20`},null),n("polyline",{class:"stroke-width2",stroke:o[1],points:`15, ${a-20} ${i-110}, ${a-20}`},null),n("polyline",{class:"stroke-width5",stroke:o[1],points:`15, ${a-13} ${i-110}, ${a-13}`},null)]}),n(S,null,{default:()=>{var l;return[n("slot",null,[(l=t.default)==null?void 0:l.call(t)])]}})]})}}});p.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.__STYLED__ > polyline {
  fill: none;
  stroke-width: 1;
`("border-svg-container");p.svg`
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
`("border-svg-container");function ut(){return ft(lt({id:$t("datav_uuid")}))}var Xt=Object.defineProperty,Vt=Object.defineProperties,Gt=Object.getOwnPropertyDescriptors,X=Object.getOwnPropertySymbols,Wt=Object.prototype.hasOwnProperty,qt=Object.prototype.propertyIsEnumerable,V=(e,t,r)=>t in e?Xt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Ft=(e,t)=>{for(var r in t||(t={}))Wt.call(t,r)&&V(e,r,t[r]);if(X)for(var r of X(t))qt.call(t,r)&&V(e,r,t[r]);return e},Ht=(e,t)=>Vt(e,Gt(t));const Ut=["#235fa7","#4fd2dd"],Jt=p.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
`("border-svg-container"),Kt=()=>Ht(Ft({},_()),{dur:{type:Number,default:3},reverse:{type:Boolean,default:!1}});b({name:"BorderBox8",props:Kt(),setup(e,{slots:t}){const{domRef:r,domSize:s}=y(),u=ut();return()=>{const{color:c,backgroundColor:d,dur:i,reverse:a}=e,{width:o,height:l}=s,f=k(Ut,c),h=`border-box-8-path-${u.id}`,$=`border-box-8-gradient-${u.id}`,Y=`border-box-8-mask-${u.id}`,M=a?`M 2.5, 2.5 L 2.5, ${l-2.5} L ${o-2.5}, ${l-2.5} L ${o-2.5}, 2.5 L 2.5, 2.5`:`M2.5, 2.5 L${o-2.5}, 2.5 L${o-2.5}, ${l-2.5} L2.5, ${l-2.5} L2.5, 2.5`;return n(x,{class:v("border-box-8"),ref:m=>r.value=m.$el},{default:()=>[n(Jt,{width:o,height:l},{default:()=>[n("defs",null,[n("path",{id:h,d:M,fill:"transparent"},null),n("radialGradient",{id:$,cx:"50%",cy:"50%",r:"50%"},[n("stop",{offset:"0%","stop-color":"#fff","stop-opacity":"1"},null),n("stop",{offset:"100%","stop-color":"#fff","stop-opacity":"0"},null)]),n("mask",{id:Y},[n("circle",{cx:"0",cy:"0",r:"150",fill:`url(#${$})`},[n("animateMotion",{dur:`${i}s`,path:M,rotate:"auto",repeatCount:"indefinite"},null)])])]),n("polygon",{fill:d,points:`5, 5 ${o-5}, 5 ${o-5} ${l-5} 5, ${l-5}`},null),n("use",{stroke:f[0],"stroke-width":"1","xlink:href":`#${h}`},null),n("use",{stroke:f[1],"stroke-width":"3","xlink:href":`#${h}`,mask:`url(#${Y})`},[n("animate",{attributeName:"stroke-dasharray",from:`0, ${length}`,to:`${length}, 0`,dur:`${i}s`,repeatCount:"indefinite"},null)])]}),n(S,null,{default:()=>{var m;return[n("slot",null,[(m=t.default)==null?void 0:m.call(t)])]}})]})}}});p.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
`("border-svg-container");p.svg`
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
`("border-svg-container");var Qt=Object.defineProperty,Zt=Object.defineProperties,te=Object.getOwnPropertyDescriptors,G=Object.getOwnPropertySymbols,ee=Object.prototype.hasOwnProperty,re=Object.prototype.propertyIsEnumerable,W=(e,t,r)=>t in e?Qt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,oe=(e,t)=>{for(var r in t||(t={}))ee.call(t,r)&&W(e,r,t[r]);if(G)for(var r of G(t))re.call(t,r)&&W(e,r,t[r]);return e},ne=(e,t)=>Zt(e,te(t));const q=["#8aaafb","#1f33a2"],ie=p.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.__STYLED__ > polyline {
  fill: none;
  stroke-width: 1;
`("border-svg-container"),le=()=>ne(oe({},_()),{titleWidth:{type:Number,default:250},title:{type:String,default:""}}),Ze=g(b({name:"BorderBox11",props:le(),setup(e,{slots:t}){const{domRef:r,domSize:s}=y(),u=ut();return()=>{const{color:c,backgroundColor:d,titleWidth:i,title:a}=e,{width:o,height:l}=s,f=k(q,c),h=`border-box-11-filterId-${u}`;return n(x,{class:v("border-box-11"),ref:$=>r.value=$.$el},{default:()=>[n(ie,{width:o,height:l},{default:()=>[n("defs",null,[n("filter",{id:h,height:"150%",width:"150%",x:"-25%",y:"-25%"},[n("feMorphology",{operator:"dilate",radius:"2",in:"SourceAlpha",result:"thicken"},null),n("feGaussianBlur",{in:"thicken",stdDeviation:"3",result:"blurred"},null),n("feFlood",{"flood-color":f[1],result:"glowColor"},null),n("feComposite",{in:"glowColor",in2:"blurred",operator:"in",result:"softGlowColored"},null),n("feMerge",null,[n("feMergeNode",{in:"softGlowColored"},null),n("feMergeNode",{in:"SourceGraphic"},null)])])]),n("polygon",{fill:d,points:`
                  20, 32 ${o*.5-i/2}, 32 ${o*.5-i/2+20}, 53
                  ${o*.5+i/2-20}, 53 ${o*.5+i/2}, 32
                  ${o-20}, 32 ${o-8}, 48 ${o-8}, ${l-25} ${o-20}, ${l-8}
                  20, ${l-8} 8, ${l-25} 8, 50
                `},null),n("polyline",{stroke:f[0],filter:`url(#${h})`,points:`
                  ${(o-i)/2}, 30
                  20, 30 7, 50 7, ${50+(l-167)/2}
                  13, ${55+(l-167)/2} 13, ${135+(l-167)/2}
                  7, ${140+(l-167)/2} 7, ${l-27}
                  20, ${l-7} ${o-20}, ${l-7} ${o-7}, ${l-27}
                  ${o-7}, ${140+(l-167)/2} ${o-13}, ${135+(l-167)/2}
                  ${o-13}, ${55+(l-167)/2} ${o-7}, ${50+(l-167)/2}
                  ${o-7}, 50 ${o-20}, 30 ${(o+i)/2}, 30
                  ${(o+i)/2-20}, 7 ${(o-i)/2+20}, 7
                  ${(o-i)/2}, 30 ${(o-i)/2+20}, 52
                  ${(o+i)/2-20}, 52 ${(o+i)/2}, 30
                `},null),n("polygon",{stroke:f[0],fill:"transparent",points:`
                  ${(o+i)/2-5}, 30 ${(o+i)/2-21}, 11
                  ${(o+i)/2-27}, 11 ${(o+i)/2-8}, 34
                `},null),n("polygon",{stroke:f[0],fill:"transparent",points:`
                  ${(o-i)/2+5}, 30 ${(o-i)/2+22}, 49
                  ${(o-i)/2+28}, 49 ${(o-i)/2+8}, 26
                `},null),n("polygon",{stroke:f[0],fill:bt.fade(f[1]||q[1],30),filter:`url(#${h})`,points:`
                  ${(o+i)/2-11}, 37 ${(o+i)/2-32}, 11
                  ${(o-i)/2+23}, 11 ${(o-i)/2+11}, 23
                  ${(o-i)/2+33}, 49 ${(o+i)/2-22}, 49
                `},null),n("polygon",{filter:`url(#${h})`,fill:f[0],opacity:"1",points:`
                  ${(o-i)/2-10}, 37 ${(o-i)/2-31}, 37
                  ${(o-i)/2-25}, 46 ${(o-i)/2-4}, 46
                `},[n("animate",{attributeName:"opacity",values:"1;0.7;1",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n("polygon",{filter:`url(#${h})`,fill:f[0],opacity:"0.7",points:`
                  ${(o-i)/2-40}, 37 ${(o-i)/2-61}, 37
                  ${(o-i)/2-55}, 46 ${(o-i)/2-34}, 46
                `},[n("animate",{attributeName:"opacity",values:"0.7;0.4;0.7",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n("polygon",{filter:`url(#${h})`,fill:f[0],opacity:"0.5",points:`
                  ${(o-i)/2-70}, 37 ${(o-i)/2-91}, 37
                  ${(o-i)/2-85}, 46 ${(o-i)/2-64}, 46
                `},[n("animate",{attributeName:"opacity",values:"0.5;0.2;0.5",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n("polygon",{filter:`url(#${h})`,fill:f[0],opacity:"1",points:`
                  ${(o+i)/2+30}, 37 ${(o+i)/2+9}, 37
                  ${(o+i)/2+3}, 46 ${(o+i)/2+24}, 46
                `},[n("animate",{attributeName:"opacity",values:"1;0.7;1",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n("polygon",{filter:`url(#${h})`,fill:f[0],opacity:"0.7",points:`
                  ${(o+i)/2+60}, 37 ${(o+i)/2+39}, 37
                  ${(o+i)/2+33}, 46 ${(o+i)/2+54}, 46
                `},[n("animate",{attributeName:"opacity",values:"0.7;0.4;0.7",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n("polygon",{filter:`url(#${h})`,fill:f[0],opacity:"0.5",points:`
                  ${(o+i)/2+90}, 37 ${(o+i)/2+69}, 37
                  ${(o+i)/2+63}, 46 ${(o+i)/2+84}, 46
                `},[n("animate",{attributeName:"opacity",values:"0.5;0.2;0.5",dur:"2s",begin:"0s",repeatCount:"indefinite"},null)]),n("text",{class:"dv-border-box-11-title",x:`${o/2}`,y:"32",fill:"#fff","font-size":"18","text-anchor":"middle","dominant-baseline":"middle"},[a]),n("polygon",{fill:f[0],filter:`url(#${h})`,points:`
                  7, ${53+(l-167)/2} 11, ${57+(l-167)/2}
                  11, ${133+(l-167)/2} 7, ${137+(l-167)/2}
                `},null),n("polygon",{fill:f[0],filter:`url(#${h})`,points:`
                  ${o-7}, ${53+(l-167)/2} ${o-11}, ${57+(l-167)/2}
                  ${o-11}, ${133+(l-167)/2} ${o-7}, ${137+(l-167)/2}
                `},null)]}),n(S,null,{default:()=>{var $;return[n("slot",null,[($=t.default)==null?void 0:$.call(t)])]}})]})}}}));p.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`("border-svg-container");p.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`("border-svg-container");function O(){return{color:{type:st(Array),default:()=>[]}}}function E(){return{reverse:{type:Boolean,default:!1}}}function T(e){return{duration:{type:Number,default:e}}}function ae({width:e,height:t,rowPoints:r,rowCount:s}){const u=e/(r+1),c=t/(s+1);return new Array(s).fill(0).map((d,i)=>new Array(r).fill(0).map((a,o)=>[u*(o+1),c*(i+1)])).reduce((d,i)=>[...d,...i],[])}const se=200,ue=50,C=20,de=4,dt=ae({width:se,height:ue,rowPoints:C,rowCount:de});dt[C*2-1];dt[C*2-3];p.div`
  width: 100%;
  height: 100%;
}
.__STYLED__ svg {
  transform-origin: left top;
`("decoration-1");var pe=Object.defineProperty,F=Object.getOwnPropertySymbols,ce=Object.prototype.hasOwnProperty,fe=Object.prototype.propertyIsEnumerable,H=(e,t,r)=>t in e?pe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,D=(e,t)=>{for(var r in t||(t={}))ce.call(t,r)&&H(e,r,t[r]);if(F)for(var r of F(t))fe.call(t,r)&&H(e,r,t[r]);return e};const he=["#3faacb","#fff"];function $e(){return D(D(D({},O()),E()),T(6))}function be(e,t,r){return e?{width:1,height:r,x:t/2,y:0}:{width:t,height:1,x:0,y:r/2}}const ge=p.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`("decoration-2");b({name:"Decoration2",props:$e(),setup(e){const{domRef:t,domSize:r}=y();return()=>{const{width:s,height:u}=r,{color:c,reverse:d,duration:i}=e,a=w(he,c),{x:o,y:l,width:f,height:h}=be(d,s,u);return n(ge,{ref:$=>t.value=$.$el},{default:()=>[n("svg",{width:s,height:u},[n("rect",{x:o,y:l,width:f,height:h,fill:a[0]},[n("animate",{attributeName:d?"height":"width",from:"0",to:d?u:s,dur:`${i}s`,calcMode:"spline",keyTimes:"0;1",keySplines:".42,0,.58,1",repeatCount:"indefinite"},null)]),n("rect",{x:o,y:l,width:"1",height:"1",fill:a[1]},[n("animate",{attributeName:d?"y":"x",from:"0",to:d?u:s,dur:`${i}s`,calcMode:"spline",keyTimes:"0;1",keySplines:"0.42,0,0.58,1",repeatCount:"indefinite"},null)])])]})}}});function ye({width:e,height:t,rowPoints:r,rowCount:s}){const u=e/(r+1),c=t/(s+1);return new Array(s).fill(0).map((d,i)=>new Array(r).fill(0).map((a,o)=>[u*(o+1),c*(i+1)])).reduce((d,i)=>[...d,...i],[])}const me=300,ve=35,we=25,_e=2;ye({width:me,height:ve,rowPoints:we,rowCount:_e});p.div`
  width: 100%;
  height: 100%;
}
.__STYLED__ svg {
  transform-origin: left top;
`("decoration-3");var ke=Object.defineProperty,U=Object.getOwnPropertySymbols,xe=Object.prototype.hasOwnProperty,Se=Object.prototype.propertyIsEnumerable,J=(e,t,r)=>t in e?ke(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,j=(e,t)=>{for(var r in t||(t={}))xe.call(t,r)&&J(e,r,t[r]);if(U)for(var r of U(t))Se.call(t,r)&&J(e,r,t[r]);return e};function Oe(){return j(j(j({},O()),E()),T(3))}const De=["rgba(255, 255, 255, 0.3)","rgba(255, 255, 255, 0.3)"],je=p.div`
  position: relative;
  width: 100%;
  height: 100%;
`("decoration-4"),Le=p.div`
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
`("decoration-content"),tr=g(b({name:"Decoration4",props:Oe(),setup(e){const{domRef:t,domSize:r}=y();return()=>{const{width:s,height:u}=r,{color:c,reverse:d,duration:i}=e,a=w(De,c),o=d?s:5,l=d?5:u,f={width:`${o}px`,height:`${l}px`,animationDuration:`${i}s`},h=d?`0, 2.5 ${s}, 2.5`:`2.5, 0 2.5, ${u}`;return n(je,{ref:$=>t.value=$.$el},{default:()=>[n(Le,{class:L(d?"reverse":"normal"),style:f},{default:()=>[n("svg",{width:o,height:l},[n("polyline",{stroke:a[0],points:h},null),n("polyline",{class:"bold-line",stroke:a[1],"stroke-width":"3","stroke-dasharray":"20, 80","stroke-dashoffset":"-30",points:h},null)])]})]})}}}));var Pe=Object.defineProperty,K=Object.getOwnPropertySymbols,Ee=Object.prototype.hasOwnProperty,Te=Object.prototype.propertyIsEnumerable,Q=(e,t,r)=>t in e?Pe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Z=(e,t)=>{for(var r in t||(t={}))Ee.call(t,r)&&Q(e,r,t[r]);if(K)for(var r of K(t))Te.call(t,r)&&Q(e,r,t[r]);return e};const Ce=["#3f96a5","#3f96a5"];function Ye(){return Z(Z({},O()),T(1.2))}function tt(e){return new Array(e.length-1).fill(0).map((t,r)=>wt(e[r],e[r+1]))}function Me(e,t){const r=[[0,t*.2],[e*.18,t*.2],[e*.2,t*.4],[e*.25,t*.4],[e*.27,t*.6],[e*.72,t*.6],[e*.75,t*.4],[e*.8,t*.4],[e*.82,t*.2],[e,t*.2]],s=[[e*.3,t*.8],[e*.7,t*.8]];return{line1Sum:N(tt(r)),line2Sum:N(tt(s)),line1Point:r.map(u=>u.join(",")).join(" "),line2Point:s.map(u=>u.join(",")).join(" ")}}const Ne=p.div`
  width: 100%;
  height: 100%;
`("decoration-5");b({name:"Decoration5",props:Ye(),setup(e){const{domRef:t,domSize:r}=y();return()=>{const{width:s,height:u}=r,{color:c,duration:d}=e,i=w(Ce,c),{line1Sum:a,line2Sum:o,line1Point:l,line2Point:f}=Me(s,u);return n(Ne,{ref:h=>t.value=h.$el},{default:()=>[n("svg",{width:s,height:u},[n("polyline",{fill:"transparent",stroke:i[0],"stroke-width":"3",points:l},[n("animate",{attributeName:"stroke-dasharray",attributeType:"XML",from:`0, ${a/2}, 0, ${a/2}`,to:`0, 0, ${a}, 0`,dur:`${d}s`,begin:"0s",calcMode:"spline",keyTimes:"0;1",keySplines:"0.4,1,0.49,0.98",repeatCount:"indefinite"},null)]),n("polyline",{fill:"transparent",stroke:i[1],"stroke-width":"2",points:f},[n("animate",{attributeName:"stroke-dasharray",attributeType:"XML",from:`0, ${o/2}, 0, ${o/2}`,to:`0, 0, ${o}, 0`,dur:`${d}s`,begin:"0s",calcMode:"spline",keyTimes:"0;1",keySplines:".4,1,.49,.98",repeatCount:"indefinite"},null)])])]})}}});const ze=300,Ae=35,Be=1,Re=40;p.div`
  width: 100%;
  height: 100%;
}
.__STYLED__ .svg-origin {
  transform-origin: left top;
`("decoration-6");function Ie({width:e,height:t,rowPoints:r,rowCount:s}){const u=e/(r+1),c=t/(s+1),d=new Array(s).fill(0).map((l,f)=>new Array(r).fill(0).map((h,$)=>[u*($+1),c*(f+1)])).reduce((l,f)=>[...l,...f],[]),i=new Array(s*r).fill(0).map(()=>Math.random()>.8?z(.7*t,t):z(.2*t,.5*t)),a=new Array(s*r).fill(0).map((l,f)=>i[f]*Math.random()),o=new Array(s*r).fill(0).map(()=>Math.random()+1.5);return{points:d,heights:i,minHeights:a,randoms:o}}Ie({width:ze,height:Ae,rowPoints:Re,rowCount:Be});p.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`("decoration-7");var Xe=Object.defineProperty,et=Object.getOwnPropertySymbols,Ve=Object.prototype.hasOwnProperty,Ge=Object.prototype.propertyIsEnumerable,rt=(e,t,r)=>t in e?Xe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ot=(e,t)=>{for(var r in t||(t={}))Ve.call(t,r)&&rt(e,r,t[r]);if(et)for(var r of et(t))Ge.call(t,r)&&rt(e,r,t[r]);return e};const We=["#3f96a5","#3f96a5"];function qe(){return ot(ot({},O()),E())}const Fe=p.div`
  display: flex;
  width: 100%;
  height: 100%;
`("decoration-8");b({name:"Decoration8",props:qe(),setup(e){const{domRef:t,domSize:r}=y();return()=>{const{color:s,reverse:u}=e,{width:c,height:d}=r,i=o=>u?c-o:o,a=w(We,s);return n(Fe,{ref:o=>t.value=o.$el},{default:()=>[n("svg",{width:c,height:d},[n("polyline",{stroke:a[0],"stroke-width":"2",fill:"transparent",points:`${i(0)}, 0 ${i(30)}, ${d/2}`},null),n("polyline",{stroke:a[0],"stroke-width":"2",fill:"transparent",points:`${i(20)}, 0 ${i(50)}, ${d/2} ${i(c)}, ${d/2}`},null),n("polyline",{stroke:a[1],fill:"transparent","stroke-width":"3",points:`${i(0)}, ${d-3}, ${i(200)}, ${d-3}`},null)])]})}}});const He=p.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.__STYLED__ .loading-tip {
  font-size: 15px;
`("loading"),er=g(b({name:"Loading",setup(e,{slots:t}){return()=>n(He,null,{default:()=>{var r;return[n("svg",{width:"50px",height:"50px"},[n("circle",{cx:"25",cy:"25",r:"20",fill:"transparent","stroke-width":"3","stroke-dasharray":"31.415, 31.415",stroke:"#02bcfe","stroke-linecap":"round"},[n("animateTransform",{attributeName:"transform",type:"rotate",values:"0, 25 25;360, 25 25",dur:"1.5s",repeatCount:"indefinite"},null),n("animate",{attributeName:"stroke",values:"#02bcfe;#3be6cb;#02bcfe",dur:"3s",repeatCount:"indefinite"},null)]),n("circle",{cx:"25",cy:"25",r:"10",fill:"transparent","stroke-width":"3","stroke-dasharray":"15.7, 15.7",stroke:"#3be6cb","stroke-linecap":"round"},[n("animateTransform",{attributeName:"transform",type:"rotate",values:"360, 25 25;0, 25 25",dur:"1.5s",repeatCount:"indefinite"},null),n("animate",{attributeName:"stroke",values:"#3be6cb;#02bcfe;#3be6cb",dur:"3s",repeatCount:"indefinite"},null)])]),n("div",{class:"loading-tip"},[(r=t.default)==null?void 0:r.call(t)])]}})}}));export{tr as A,Ze as J,er as f};
