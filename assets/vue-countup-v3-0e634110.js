import{d as b,r as V,w,o as S,a as A,C as P,D as O,E as y,F as N}from"./@vue-df245e2a.js";var D=Object.defineProperty,C=Object.defineProperties,x=Object.getOwnPropertyDescriptors,E=Object.getOwnPropertySymbols,T=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable,F=(i,e,n)=>e in i?D(i,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[e]=n,_=(i,e)=>{for(var n in e||(e={}))T.call(e,n)&&F(i,n,e[n]);if(E)for(var n of E(e))B.call(e,n)&&F(i,n,e[n]);return i},I=(i,e)=>C(i,x(e)),v=function(){return v=Object.assign||function(i){for(var e,n=1,a=arguments.length;n<a;n++)for(var t in e=arguments[n])Object.prototype.hasOwnProperty.call(e,t)&&(i[t]=e[t]);return i},v.apply(this,arguments)},U=function(){function i(e,n,a){var t=this;this.endVal=n,this.options=a,this.version="2.6.2",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,useIndianSeparators:!1,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:"",enableScrollSpy:!1,scrollSpyDelay:200,scrollSpyOnce:!1},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.once=!1,this.count=function(s){t.startTime||(t.startTime=s);var o=s-t.startTime;t.remaining=t.duration-o,t.useEasing?t.countDown?t.frameVal=t.startVal-t.easingFn(o,0,t.startVal-t.endVal,t.duration):t.frameVal=t.easingFn(o,t.startVal,t.endVal-t.startVal,t.duration):t.frameVal=t.startVal+(t.endVal-t.startVal)*(o/t.duration);var r=t.countDown?t.frameVal<t.endVal:t.frameVal>t.endVal;t.frameVal=r?t.endVal:t.frameVal,t.frameVal=Number(t.frameVal.toFixed(t.options.decimalPlaces)),t.printValue(t.frameVal),o<t.duration?t.rAF=requestAnimationFrame(t.count):t.finalEndVal!==null?t.update(t.finalEndVal):t.options.onCompleteCallback&&t.options.onCompleteCallback()},this.formatNumber=function(s){var o,r,u,p,c=s<0?"-":"";o=Math.abs(s).toFixed(t.options.decimalPlaces);var f=(o+="").split(".");if(r=f[0],u=f.length>1?t.options.decimal+f[1]:"",t.options.useGrouping){p="";for(var l=3,h=0,d=0,m=r.length;d<m;++d)t.options.useIndianSeparators&&d===4&&(l=2,h=1),d!==0&&h%l==0&&(p=t.options.separator+p),h++,p=r[m-d-1]+p;r=p}return t.options.numerals&&t.options.numerals.length&&(r=r.replace(/[0-9]/g,function(g){return t.options.numerals[+g]}),u=u.replace(/[0-9]/g,function(g){return t.options.numerals[+g]})),c+t.options.prefix+r+u+t.options.suffix},this.easeOutExpo=function(s,o,r,u){return r*(1-Math.pow(2,-10*s/u))*1024/1023+o},this.options=v(v({},this.defaults),a),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(n),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,this.options.separator===""&&(this.options.useGrouping=!1),this.el=typeof e=="string"?document.getElementById(e):e,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined",typeof window<"u"&&this.options.enableScrollSpy&&(this.error?console.error(this.error,e):(window.onScrollFns=window.onScrollFns||[],window.onScrollFns.push(function(){return t.handleScroll(t)}),window.onscroll=function(){window.onScrollFns.forEach(function(s){return s()})},this.handleScroll(this)))}return i.prototype.handleScroll=function(e){if(e&&window&&!e.once){var n=window.innerHeight+window.scrollY,a=e.el.getBoundingClientRect(),t=a.top+window.pageYOffset,s=a.top+a.height+window.pageYOffset;s<n&&s>window.scrollY&&e.paused?(e.paused=!1,setTimeout(function(){return e.start()},e.options.scrollSpyDelay),e.options.scrollSpyOnce&&(e.once=!0)):(window.scrollY>s||t>n)&&!e.paused&&e.reset()}},i.prototype.determineDirectionAndSmartEasing=function(){var e=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>e;var n=e-this.startVal;if(Math.abs(n)>this.options.smartEasingThreshold&&this.options.useEasing){this.finalEndVal=e;var a=this.countDown?1:-1;this.endVal=e+a*this.options.smartEasingAmount,this.duration=this.duration/2}else this.endVal=e,this.finalEndVal=null;this.finalEndVal!==null?this.useEasing=!1:this.useEasing=this.options.useEasing},i.prototype.start=function(e){this.error||(e&&(this.options.onCompleteCallback=e),this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},i.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},i.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},i.prototype.update=function(e){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(e),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal==null&&this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},i.prototype.printValue=function(e){var n;if(this.el){var a=this.formattingFn(e);!((n=this.options.plugin)===null||n===void 0)&&n.render?this.options.plugin.render(this.el,a):this.el.tagName==="INPUT"?this.el.value=a:this.el.tagName==="text"||this.el.tagName==="tspan"?this.el.textContent=a:this.el.innerHTML=a}},i.prototype.ensureNumber=function(e){return typeof e=="number"&&!isNaN(e)},i.prototype.validateValue=function(e){var n=Number(e);return this.ensureNumber(n)?n:(this.error="[CountUp] invalid start or end value: ".concat(e),null)},i.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},i}();function j(i,e=1){const n=V(-1);let a;function t(o){a||(a=o),o-a<e*1e3?n.value=requestAnimationFrame(t):i()}n.value=requestAnimationFrame(t);function s(){window.cancelAnimationFrame(n.value)}return{cancel:s}}const q={class:"countup-wrap"},M={name:"CountUp"},Y=b(I(_({},M),{props:{endVal:null,startVal:{default:0},duration:{default:2.5},decimalPlaces:{default:0},autoplay:{type:Boolean,default:!0},loop:{type:[Boolean,Number],default:!1},delay:{default:0},options:{default:void 0}},emits:["init","finished"],setup(i,{expose:e,emit:n}){const a=i;let t=V(),s=V(),o=0;const r=V(!1);let u;function p(){if(!t.value){console.warn("[vue-countup-v3]","elRef can't found");return}o=0,r.value=!1;const l=Number(a.startVal),h=Number(a.endVal),d=Number(a.duration);if(s.value=new U(t.value,h,_({startVal:l,duration:d,decimalPlaces:a.decimalPlaces},a.options)),s.value.error){console.error("[vue-countup-v3]",s.value.error);return}n("init",s.value)}function c(){var l;s.value||p(),(l=s.value)==null||l.start(h),o++;function h(){typeof a.loop=="boolean"&&a.loop||a.loop>o?u=j(()=>{var m;(m=s.value)==null||m.reset(),c()},a.delay):r.value=!0}}function f(){u==null||u.cancel(),p(),c()}return w([()=>a.startVal,()=>a.endVal],()=>{a.autoplay&&f()}),w(r,l=>{l&&n("finished")}),S(()=>{p(),a.autoplay&&c()}),A(()=>{var l;u==null||u.cancel(),(l=s.value)==null||l.reset()}),e({init:p,restart:f}),(l,h)=>(P(),O("div",q,[y(l.$slots,"prefix"),N("span",{ref_key:"elRef",ref:t},null,512),y(l.$slots,"suffix")]))}}));export{Y as _};
