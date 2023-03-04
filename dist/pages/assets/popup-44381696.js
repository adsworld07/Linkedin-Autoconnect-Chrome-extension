import{y as f,$ as L,j as E,a as C,d as h,C as pe,z as w,c as ge,f as v,u as fe,o as U,g as he,b as c,e as m,I as ve,h as ye,i as Ce,k as xe,l as T,m as b,n as V,R as r,V as Se,B as S,p as P,q as ke,r as be,s as Pe,H as Ee,t as we,v as Te,w as Ne,x as Ae}from"./darkChakraTheme-d35cca31.js";const H=f(async()=>{const[e]=await chrome.tabs.query({active:!0,currentWindow:!0});return e}),_e=H.doneData,ze=L(_e,{filter:({id:e})=>e!==void 0}).map(({id:e})=>e),je=E(ze,0),W=f(e=>chrome.tabs.connect(e));C({from:je.updates,to:W});const O=h(),$=h(),Le=f(e=>{e.onMessage.addListener(t=>{$({message:t,port:e})})});C({from:O,to:Le});C({from:W.doneData,to:O});var i=(e=>(e[e.ConnectionEstablished=0]="ConnectionEstablished",e[e.RunningStateUpdated=1]="RunningStateUpdated",e[e.ButtonClicksCountUpdated=2]="ButtonClicksCountUpdated",e[e.StartAutoConnect=3]="StartAutoConnect",e[e.StopAutoConnect=4]="StopAutoConnect",e))(i||{});const B=pe($,{[i.ConnectionEstablished]:({message:e})=>e.id===i.ConnectionEstablished,[i.RunningStateUpdated]:({message:e})=>e.id===i.RunningStateUpdated,[i.ButtonClicksCountUpdated]:({message:e})=>e.id===i.ButtonClicksCountUpdated,[i.StartAutoConnect]:({message:e})=>e.id===i.StartAutoConnect,[i.StopAutoConnect]:({message:e})=>e.id===i.StopAutoConnect}),F=h(),G=h(),q=h();w({clock:B[i.ConnectionEstablished],target:F});C({from:B[i.RunningStateUpdated].map(({message:e})=>e.content),to:q});C({from:B[i.ButtonClicksCountUpdated].map(({message:e})=>e.content),to:G});const R=h();var[Oe,Y]=ge({name:"ListStylesContext",errorMessage:`useListStyles returned is 'undefined'. Seems you forgot to wrap the components in "<List />" `}),N=v(function(t,n){const a=fe("List",t),{children:o,styleType:l="none",stylePosition:d,spacing:u,...s}=U(t),p=he(o),y=u?{["& > *:not(style) ~ *:not(style)"]:{mt:u}}:{};return c.jsx(Oe,{value:a,children:c.jsx(m.ul,{ref:n,listStyleType:l,listStylePosition:d,role:"list",__css:{...a.container,...y},...s,children:p})})});N.displayName="List";var Be=v((e,t)=>{const{as:n,...a}=e;return c.jsx(N,{ref:t,as:"ol",styleType:"decimal",marginStart:"1em",...a})});Be.displayName="OrderedList";var Re=v(function(t,n){const{as:a,...o}=t;return c.jsx(N,{ref:n,as:"ul",styleType:"initial",marginStart:"1em",...o})});Re.displayName="UnorderedList";var z=v(function(t,n){const a=Y();return c.jsx(m.li,{ref:n,...t,__css:a.item})});z.displayName="ListItem";var De=v(function(t,n){const a=Y();return c.jsx(ve,{ref:n,role:"presentation",...t,__css:a.icon})});De.displayName="ListIcon";var K=m("div",{baseStyle:{flex:1,justifySelf:"stretch",alignSelf:"stretch"}});K.displayName="Spacer";var X=v(function(t,n){const a=ye("Text",t),{className:o,align:l,decoration:d,casing:u,...s}=U(t),p=Ce({textAlign:t.align,textDecoration:t.decoration,textTransform:t.casing});return c.jsx(m.p,{ref:n,className:xe("chakra-text",t.className),...p,...s,__css:a})});X.displayName="Text";var J=v(function(t,n){const{direction:a,align:o,justify:l,wrap:d,basis:u,grow:s,shrink:p,...k}=t,y={display:"flex",flexDirection:a,alignItems:o,justifyContent:l,flexWrap:d,flexBasis:u,flexGrow:s,flexShrink:p};return c.jsx(m.div,{ref:n,__css:y,...k})});J.displayName="Flex";var Q=m("div",{baseStyle:{fontSize:"0.24em",top:"50%",left:"50%",width:"100%",textAlign:"center",position:"absolute",transform:"translate(-50%, -50%)"}});Q.displayName="CircularProgressLabel";var j=e=>c.jsx(m.circle,{cx:50,cy:50,r:42,fill:"transparent",...e});j.displayName="Circle";function Me(e,t,n){return(e-t)*100/(n-t)}var Ie=T({"0%":{strokeDasharray:"1, 400",strokeDashoffset:"0"},"50%":{strokeDasharray:"400, 400",strokeDashoffset:"-100"},"100%":{strokeDasharray:"400, 400",strokeDashoffset:"-260"}}),Ue=T({"0%":{transform:"rotate(0deg)"},"100%":{transform:"rotate(360deg)"}});T({"0%":{left:"-40%"},"100%":{left:"100%"}});T({from:{backgroundPosition:"1rem 0"},to:{backgroundPosition:"0 0"}});function Ve(e){const{value:t=0,min:n,max:a,valueText:o,getValueText:l,isIndeterminate:d,role:u="progressbar"}=e,s=Me(t,n,a);return{bind:{"data-indeterminate":d?"":void 0,"aria-valuemax":a,"aria-valuemin":n,"aria-valuenow":d?void 0:t,"aria-valuetext":(()=>{if(t!=null)return typeof l=="function"?l(t,s):o})(),role:u},percent:s,value:t}}var Z=e=>{const{size:t,isIndeterminate:n,...a}=e;return c.jsx(m.svg,{viewBox:"0 0 100 100",__css:{width:t,height:t,animation:n?`${Ue} 2s linear infinite`:void 0},...a})};Z.displayName="Shape";var ee=v((e,t)=>{var n;const{size:a="48px",max:o=100,min:l=0,valueText:d,getValueText:u,value:s,capIsRound:p,children:k,thickness:y="10px",color:ie="#0078d4",trackColor:ce="#edebe9",isIndeterminate:x,...le}=e,A=Ve({min:l,max:o,value:s,valueText:d,getValueText:u,isIndeterminate:x}),_=x?void 0:((n=A.percent)!=null?n:0)*2.64,ue=_==null?void 0:`${_} ${264-_}`,de=x?{css:{animation:`${Ie} 1.5s linear infinite`}}:{strokeDashoffset:66,strokeDasharray:ue,transitionProperty:"stroke-dasharray, stroke",transitionDuration:"0.6s",transitionTimingFunction:"ease"},me={display:"inline-block",position:"relative",verticalAlign:"middle",fontSize:a};return c.jsxs(m.div,{ref:t,className:"chakra-progress",...A.bind,...le,__css:me,children:[c.jsxs(Z,{size:a,isIndeterminate:x,children:[c.jsx(j,{stroke:ce,strokeWidth:y,className:"chakra-progress__track"}),c.jsx(j,{stroke:ie,strokeWidth:y,className:"chakra-progress__indicator",strokeLinecap:p?"round":void 0,opacity:A.value===0&&!x?0:void 0,...de})]}),k]})});ee.displayName="CircularProgress";const te=h(),ne=h(),He=E(q,!1),We=E(G,0);function $e(){const e=b(He),t=b(We),n=b(V);return r.createElement(Se,{spacing:"3"},r.createElement(S,null,r.createElement(X,{fontSize:"18px"},"Invitations Sent")),r.createElement(S,null,r.createElement(ee,{value:t/Number(n)*100,color:"green.400",size:"100px"},r.createElement(Q,null,t))),r.createElement(S,null,r.createElement(P,{colorScheme:e?"red":"green",onClick:()=>e?te():ne(),width:"full"},e?"STOP":"START"," CONNECTING")))}var ae={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},I=r.createContext&&r.createContext(ae),g=globalThis&&globalThis.__assign||function(){return g=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++){t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},g.apply(this,arguments)},Fe=globalThis&&globalThis.__rest||function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(n[a[o]]=e[a[o]]);return n};function re(e){return e&&e.map(function(t,n){return r.createElement(t.tag,g({key:n},t.attr),re(t.child))})}function D(e){return function(t){return r.createElement(Ge,g({attr:g({},e.attr)},t),re(e.child))}}function Ge(e){var t=function(n){var a=e.attr,o=e.size,l=e.title,d=Fe(e,["attr","size","title"]),u=o||n.size||"1em",s;return n.className&&(s=n.className),e.className&&(s=(s?s+" ":"")+e.className),r.createElement("svg",g({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},n.attr,a,d,{className:s,style:g(g({color:e.color||n.color},n.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),l&&r.createElement("title",null,l),e.children)};return I!==void 0?r.createElement(I.Consumer,null,function(n){return t(n)}):t(ae)}function qe(e){return D({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"}},{tag:"path",attr:{d:"M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}}]})(e)}function Ye(e){return D({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0V0z"}},{tag:"path",attr:{d:"M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"}}]})(e)}function Ke(e){return D({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"}},{tag:"path",attr:{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"}}]})(e)}var M=(e=>(e.SearchPeoplePage="https://www.linkedin.com/search/results/people/",e.MyNetworkPage="https://www.linkedin.com/mynetwork/",e.PatternOfSearchPage="linkedin.com/search/results/people",e.PatternOfMyNetworkPage="linkedin.com/mynetwork",e))(M||{});const Xe=f(()=>{chrome.tabs.create({url:M.SearchPeoplePage})}),Je=f(()=>{chrome.tabs.create({url:M.MyNetworkPage})});function Qe(){return r.createElement(N,{spacing:3},r.createElement(z,null,r.createElement(P,{onClick:()=>Je(),leftIcon:r.createElement(Ke,null),width:"full"},"People You May Know")),r.createElement(z,null,r.createElement(P,{onClick:()=>Xe(),leftIcon:r.createElement(qe,null),width:"full"},"Search People")))}const Ze=f(()=>{chrome.runtime.openOptionsPage()}),et=ke(!1).on(F,()=>!0);function tt(){const e=b(et);return r.createElement(be,{theme:Pe},r.createElement(J,{paddingX:5,paddingY:2,backgroundColor:"black",align:"center",width:"260px"},r.createElement(S,null,r.createElement(Ee,{size:"sm"},"LinkedIn AutoConnect")),r.createElement(K,null),r.createElement(S,null,r.createElement(P,{size:"sm",onClick:()=>Ze()},r.createElement(Ye,null)))),r.createElement(we,{padding:"5"},e?r.createElement($e,null):r.createElement(Qe,null)))}const nt=f(()=>{Te.render(r.createElement(tt),document.body.appendChild(document.createElement("div")))});C({from:R,to:[nt,H]});w({clock:R,source:Ne({maximumAutoConnectionsPerSession:V}),target:Ae});const oe=E(O,null),se=f(e=>{const{message:t,port:n}=e;n.postMessage(t)});L({clock:w({clock:ne,source:oe,fn:e=>({message:{id:i.StartAutoConnect},port:e})}),filter:e=>e.port!==null,target:se});L({clock:w({clock:te,source:oe,fn:e=>({message:{id:i.StopAutoConnect},port:e})}),filter:e=>e.port!==null,target:se});R();
