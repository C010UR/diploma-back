(self["webpackChunkdiploma_front"]=self["webpackChunkdiploma_front"]||[]).push([[460],{983:function(e,t,r){"use strict";var n=r(6187).charAt;e.exports=function(e,t,r){return t+(r?n(e,t).length:1)}},6250:function(e,t,r){"use strict";r(9701);var n=r(9528),l=r(6333),a=r(2405),i=r(4984),o=r(1072),s=r(4994),u=o("species"),c=RegExp.prototype;e.exports=function(e,t,r,d){var v=o(e),f=!i((function(){var t={};return t[v]=function(){return 7},7!=""[e](t)})),g=f&&!i((function(){var t=!1,r=/a/;return"split"===e&&(r={},r.constructor={},r.constructor[u]=function(){return r},r.flags="",r[v]=/./[v]),r.exec=function(){return t=!0,null},r[v](""),!t}));if(!f||!g||r){var m=n(/./[v]),p=t(v,""[e],(function(e,t,r,l,i){var o=n(e),s=t.exec;return s===a||s===c.exec?f&&!i?{done:!0,value:m(t,r,l)}:{done:!0,value:o(r,t,l)}:{done:!1}}));l(String.prototype,e,p[0]),l(c,v,p[1])}d&&s(c[v],"sham",!0)}},7439:function(e,t,r){var n=r(9528),l=r(447),a=Math.floor,i=n("".charAt),o=n("".replace),s=n("".slice),u=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,c=/\$([$&'`]|\d{1,2})/g;e.exports=function(e,t,r,n,d,v){var f=r+e.length,g=n.length,m=c;return void 0!==d&&(d=l(d),m=u),o(v,m,(function(l,o){var u;switch(i(o,0)){case"$":return"$";case"&":return e;case"`":return s(t,0,r);case"'":return s(t,f);case"<":u=d[s(o,1,-1)];break;default:var c=+o;if(0===c)return l;if(c>g){var v=a(c/10);return 0===v?l:v<=g?void 0===n[v-1]?i(o,1):n[v-1]+i(o,1):l}u=n[c-1]}return void 0===u?"":u}))}},6292:function(e,t,r){var n=r(3371),l=r(4709),a=r(4713),i=r(8211),o=r(7513),s=r(2405),u=n.TypeError;e.exports=function(e,t){var r=e.exec;if(i(r)){var n=l(r,e,t);return null!==n&&a(n),n}if("RegExp"===o(e))return l(s,e,t);throw u("RegExp#exec called on incompatible receiver")}},2405:function(e,t,r){"use strict";var n=r(4709),l=r(9528),a=r(9927),i=r(1732),o=r(3564),s=r(8339),u=r(6747),c=r(6123).get,d=r(7082),v=r(7795),f=s("native-string-replace",String.prototype.replace),g=RegExp.prototype.exec,m=g,p=l("".charAt),h=l("".indexOf),b=l("".replace),w=l("".slice),y=function(){var e=/a/,t=/b*/g;return n(g,e,"a"),n(g,t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),x=o.BROKEN_CARET,k=void 0!==/()??/.exec("")[1],_=y||k||x||d||v;_&&(m=function(e){var t,r,l,o,s,d,v,_=this,$=c(_),W=a(e),I=$.raw;if(I)return I.lastIndex=_.lastIndex,t=n(m,I,W),_.lastIndex=I.lastIndex,t;var R=$.groups,C=x&&_.sticky,E=n(i,_),U=_.source,V=0,q=W;if(C&&(E=b(E,"y",""),-1===h(E,"g")&&(E+="g"),q=w(W,_.lastIndex),_.lastIndex>0&&(!_.multiline||_.multiline&&"\n"!==p(W,_.lastIndex-1))&&(U="(?: "+U+")",q=" "+q,V++),r=new RegExp("^(?:"+U+")",E)),k&&(r=new RegExp("^"+U+"$(?!\\s)",E)),y&&(l=_.lastIndex),o=n(g,C?r:_,q),C?o?(o.input=w(o.input,V),o[0]=w(o[0],V),o.index=_.lastIndex,_.lastIndex+=o[0].length):_.lastIndex=0:y&&o&&(_.lastIndex=_.global?o.index+o[0].length:l),k&&o&&o.length>1&&n(f,o[0],r,(function(){for(s=1;s<arguments.length-2;s++)void 0===arguments[s]&&(o[s]=void 0)})),o&&R)for(o.groups=d=u(null),s=0;s<R.length;s++)v=R[s],d[v[0]]=o[v[1]];return o}),e.exports=m},1732:function(e,t,r){"use strict";var n=r(4713);e.exports=function(){var e=n(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},3564:function(e,t,r){var n=r(4984),l=r(3371),a=l.RegExp,i=n((function(){var e=a("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),o=i||n((function(){return!a("a","y").sticky})),s=i||n((function(){var e=a("^r","gy");return e.lastIndex=2,null!=e.exec("str")}));e.exports={BROKEN_CARET:s,MISSED_STICKY:o,UNSUPPORTED_Y:i}},7082:function(e,t,r){var n=r(4984),l=r(3371),a=l.RegExp;e.exports=n((function(){var e=a(".","s");return!(e.dotAll&&e.exec("\n")&&"s"===e.flags)}))},7795:function(e,t,r){var n=r(4984),l=r(3371),a=l.RegExp;e.exports=n((function(){var e=a("(?<a>b)","g");return"b"!==e.exec("b").groups.a||"bc"!=="b".replace(e,"$<a>c")}))},9701:function(e,t,r){"use strict";var n=r(1094),l=r(2405);n({target:"RegExp",proto:!0,forced:/./.exec!==l},{exec:l})},1014:function(e,t,r){"use strict";var n=r(3990),l=r(4709),a=r(9528),i=r(6250),o=r(4984),s=r(4713),u=r(8211),c=r(7020),d=r(4187),v=r(9927),f=r(3326),g=r(983),m=r(1153),p=r(7439),h=r(6292),b=r(1072),w=b("replace"),y=Math.max,x=Math.min,k=a([].concat),_=a([].push),$=a("".indexOf),W=a("".slice),I=function(e){return void 0===e?e:String(e)},R=function(){return"$0"==="a".replace(/./,"$0")}(),C=function(){return!!/./[w]&&""===/./[w]("a","$0")}(),E=!o((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}));i("replace",(function(e,t,r){var a=C?"$":"$0";return[function(e,r){var n=f(this),a=void 0==e?void 0:m(e,w);return a?l(a,e,n,r):l(t,v(n),e,r)},function(e,l){var i=s(this),o=v(e);if("string"==typeof l&&-1===$(l,a)&&-1===$(l,"$<")){var f=r(t,i,o,l);if(f.done)return f.value}var m=u(l);m||(l=v(l));var b=i.global;if(b){var w=i.unicode;i.lastIndex=0}var R=[];while(1){var C=h(i,o);if(null===C)break;if(_(R,C),!b)break;var E=v(C[0]);""===E&&(i.lastIndex=g(o,d(i.lastIndex),w))}for(var U="",V=0,q=0;q<R.length;q++){C=R[q];for(var D=v(C[0]),S=y(x(c(C.index),o.length),0),j=[],Z=1;Z<C.length;Z++)_(j,I(C[Z]));var A=C.groups;if(m){var M=k([D],j,S,o);void 0!==A&&_(M,A);var O=v(n(l,void 0,M))}else O=p(D,o,S,j,A,l);S>=V&&(U+=W(o,V,S)+O,V=S+D.length)}return U+W(o,V)}]}),!E||!R||C)},460:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return F}});var n=r(433),l=(r(2275),r(9653),r(9517),r(9903)),a=(r(7258),r(7698)),i=(r(3075),r(6253)),o=(r(1121),r(2799)),s=(r(3047),r(361)),u=(r(5155),r(1831));const c=(0,u.Uk)(" Меню "),d=(0,u._)("h2",null,"Администрирование",-1),v={style:{position:"absolute",right:"1rem",top:"1rem"}};function f(e,t,r,f,g,m){const p=(0,u.up)("base-menu"),h=s.mi,b=o.dq,w=i.os,y=a.vs,x=l.i1,k=n.nZ,_=(0,u.up)("controls-table"),$=n.b2,W=n.G4;return(0,u.wg)(),(0,u.j4)(W,{style:{height:"100vh"}},{default:(0,u.w5)((()=>[(0,u.Wm)(W,{style:{"background-color":"white"}},{default:(0,u.w5)((()=>[(0,u.Wm)(p,{modelValue:f.drawer,"onUpdate:modelValue":t[0]||(t[0]=e=>f.drawer=e)},null,8,["modelValue"]),(0,u.Wm)(k,{height:"auto"},{default:(0,u.w5)((()=>[(0,u.Wm)(b,null,{default:(0,u.w5)((()=>[(0,u.Wm)(h,{onClick:f.toggleDrawer,type:"text",icon:f.Menu,size:"large",style:{"margin-right":"1rem","margin-top":"0.9rem"}},{default:(0,u.w5)((()=>[c])),_:1},8,["onClick","icon"]),d])),_:1}),(0,u.Wm)(w),(0,u._)("div",v,[(0,u.Wm)(x,{"confirm-button-text":"Да","cancel-button-text":"Нет",title:"Вы уверены, что хотите выйти?",onConfirm:f.logout},{reference:(0,u.w5)((()=>[(0,u.Wm)(y,{icon:f.UserFilled},null,8,["icon"])])),_:1},8,["onConfirm"])])])),_:1}),(0,u.Wm)($,{class:"main"},{default:(0,u.w5)((()=>[(0,u._)("div",null,[(0,u._)("section",{class:"section",id:"masters",ref:e=>f.refs.masters=e},[(0,u.Wm)(_,{table:"technicians",label:"Мастера"}),(0,u.Wm)(w,{class:"divider"})],512),(0,u._)("section",{class:"section",id:"common_works",ref:e=>f.refs.common_works=e},[(0,u.Wm)(_,{table:"works",label:"Проделанные работы"}),(0,u.Wm)(w,{class:"divider"})],512),(0,u._)("section",{class:"section",id:"common_defects",ref:e=>f.refs.common_defects=e},[(0,u.Wm)(_,{table:"defects",label:"Неисправности"}),(0,u.Wm)(w,{class:"divider"})],512),(0,u._)("section",{class:"section",id:"cabinets",ref:e=>f.refs.cabinets=e},[(0,u.Wm)(_,{table:"cabinets",label:"Кабинеты"}),(0,u.Wm)(w,{class:"divider"})],512),(0,u._)("section",{class:"section",id:"urgency",ref:e=>f.refs.urgency=e},[(0,u.Wm)(_,{table:"urgency",label:"Срочности",isUrgency:""}),(0,u.Wm)(w,{class:"divider"})],512),(0,u._)("section",{class:"section",id:"administrators",ref:e=>f.refs.administrators=e},[(0,u.Wm)(_,{table:"administrators",label:"Администраторы",isAdministrator:""}),(0,u.Wm)(w,{class:"divider"})],512)])])),_:1})])),_:1})])),_:1})}r(776),r(9701),r(1014);var g=r(1222),m=r(5130),p=r(8140),h=r(8848),b=r(3130),w=r(5335),y=(r(6458),r(7979),r(6096)),x=(r(3631),r(8483),r(4603)),k=(r(2878),r(6923));const _={style:{height:"70vh","margin-bottom":"1rem"}},$={key:1},W={key:1},I=(0,u.Uk)(" Изменить "),R=(0,u.Uk)("Удалить"),C=(0,u.Uk)(" Сохранить "),E=(0,u.Uk)(" Отменить "),U=(0,u.Uk)("Сохранить");function V(e,t,r,n,a,i){const o=x.EZ,c=y.$Y,d=s.mi,v=l.i1,f=y.eI,g=w.nH,m=w.ly;return(0,u.wg)(),(0,u.iD)(u.HY,null,[(0,u._)("h2",null,(0,k.zw)(r.label),1),(0,u._)("div",_,[(0,u.Wm)(f,{data:n.tableData,"row-key":n.tableData.value,stripe:"","empty-text":"Данные отсутствуют",style:{width:"100%",padding:"0"},height:"100%",border:""},{default:(0,u.w5)((()=>[(0,u.Wm)(c,{label:"Значение",prop:"label"},{default:(0,u.w5)((e=>[e.row.edit?((0,u.wg)(),(0,u.j4)(o,{key:0,modelValue:n.tableData[e.$index].editValue,"onUpdate:modelValue":t=>n.tableData[e.$index].editValue=t,style:{width:"50ch"}},null,8,["modelValue","onUpdate:modelValue"])):((0,u.wg)(),(0,u.iD)("span",$,(0,k.zw)(e.row.label),1))])),_:1}),r.isUrgency?((0,u.wg)(),(0,u.j4)(c,{key:0,label:"Интервал",prop:"interval"},{default:(0,u.w5)((e=>[e.row.edit?((0,u.wg)(),(0,u.j4)(o,{key:0,modelValue:n.tableData[e.$index].editInterval,"onUpdate:modelValue":t=>n.tableData[e.$index].editInterval=t,style:{width:"50ch"}},null,8,["modelValue","onUpdate:modelValue"])):((0,u.wg)(),(0,u.iD)("span",W,(0,k.zw)(e.row.interval),1))])),_:1})):(0,u.kq)("",!0),(0,u.Wm)(c,{fixed:"right",label:"Операции",width:r.isAdministrator?100:180},{default:(0,u.w5)((e=>[r.isAdministrator||e.row.edit?(0,u.kq)("",!0):((0,u.wg)(),(0,u.j4)(d,{key:0,type:"text",onClick:t=>n.toggleEdit(e.$index)},{default:(0,u.w5)((()=>[I])),_:2},1032,["onClick"])),e.row.edit?(0,u.kq)("",!0):((0,u.wg)(),(0,u.j4)(v,{key:1,"confirm-button-text":"Да","cancel-button-text":"Нет",title:"Вы уверены, что хотите удалить это поле?",onConfirm:t=>n.deleteRow(e.$index)},{reference:(0,u.w5)((()=>[(0,u.Wm)(d,{type:"text"},{default:(0,u.w5)((()=>[R])),_:1})])),_:2},1032,["onConfirm"])),e.row.edit?((0,u.wg)(),(0,u.j4)(d,{key:2,type:"text",onClick:t=>n.editRow(e.$index)},{default:(0,u.w5)((()=>[C])),_:2},1032,["onClick"])):(0,u.kq)("",!0),e.row.edit?((0,u.wg)(),(0,u.j4)(d,{key:3,type:"text",onClick:t=>n.toggleEdit(e.$index)},{default:(0,u.w5)((()=>[E])),_:2},1032,["onClick"])):(0,u.kq)("",!0)])),_:1},8,["width"])])),_:1},8,["data","row-key"])]),r.isAdministrator?(0,u.kq)("",!0):((0,u.wg)(),(0,u.j4)(m,{key:0,inline:"",model:n.addForm,ref:"formRef",rules:n.rules},{default:(0,u.w5)((()=>[(0,u.Wm)(g,{label:"Значение",prop:"value"},{default:(0,u.w5)((()=>[(0,u.Wm)(o,{modelValue:n.addForm.value,"onUpdate:modelValue":t[0]||(t[0]=e=>n.addForm.value=e),style:{width:"50ch"}},null,8,["modelValue"])])),_:1}),r.isUrgency?((0,u.wg)(),(0,u.j4)(g,{key:0,label:"Интервал",prop:"interval"},{default:(0,u.w5)((()=>[(0,u.Wm)(o,{modelValue:n.addForm.interval,"onUpdate:modelValue":t[1]||(t[1]=e=>n.addForm.interval=e),style:{width:"50ch"}},null,8,["modelValue"])])),_:1})):(0,u.kq)("",!0),(0,u.Wm)(g,null,{default:(0,u.w5)((()=>[(0,u.Wm)(d,{onClick:t[2]||(t[2]=e=>n.addRow()),type:"primary"},{default:(0,u.w5)((()=>[U])),_:1})])),_:1})])),_:1},8,["model","rules"]))],64)}var q=r(7067),D=(r(3540),r(2807)),S={props:{isUrgency:{type:Boolean,required:!1,default:!1},isAdministrator:{type:Boolean,required:!1,default:!1},table:{type:String,required:!0},label:{type:String,required:!0}},setup(e){const t=(0,g.iH)([]),r=()=>{(0,q.bM)({title:"Ошибка",message:(0,u.h)("i",{style:"color: teal"},`Ошибка в таблице ${e.label}`),type:"error"})},n=()=>{D.Z.get(`/dashboard/control/${e.table}`).then((e=>{t.value=e.data})).catch((()=>{r()}))},l=l=>{D.Z["delete"](`/dashboard/control/${e.table}`,{data:{id:t.value[l].value}}).then((()=>{n(),(0,q.bM)({title:"Успешно удалено",message:(0,u.h)("i",{style:"color: teal"},`Удалено в таблице ${e.label}`),type:"success"})})).catch((()=>{r()}))},a=e=>{t.value[e].edit=!t.value[e].edit,t.value[e].editValue=t.value[e].label,t.value[e].editInterval=t.value[e].interval},i=l=>{const a={id:t.value[l].value,field:t.value[l].editValue};e.isUrgency&&(a.interval=t.value[l].editInterval),D.Z.patch(`/dashboard/control/${e.table}`,a).then((()=>{n(),(0,q.bM)({title:"Успешно изменено",message:(0,u.h)("i",{style:"color: teal"},`Заменено в таблице ${e.label}`),type:"success"})})).catch((()=>{r()}))},o=(0,g.iH)(null),s=(0,g.qj)({value:null,interval:null}),c={value:[{required:!0,message:"Пожалуйста, укажите значение",trigger:"blur"}],interval:[{required:!0,message:"Пожалуйста, укажите интервал",trigger:"blur"}]},d=()=>{o.value.validate((t=>{if(t){const t=e.isUrgency?{field:s.value,interval:s.interval}:{field:s.value};return D.Z.post(`/dashboard/control/${e.table}`,t).then((()=>{n(),(0,q.bM)({title:"Успешно добавлено",message:(0,u.h)("i",{style:"color: teal"},`Добавлено в таблицу ${e.label}`),type:"success"})})).catch((()=>{r()})),!0}return!1}))};return(0,u.bv)((()=>{n()})),{tableData:t,deleteRow:l,toggleEdit:a,editRow:i,formRef:o,addForm:s,rules:c,addRow:d}}},j=r(2505);const Z=(0,j.Z)(S,[["render",V]]);var A=Z,M={components:{BaseMenu:b.Z,ControlsTable:A},setup(){const e=(0,m.tv)(),t=(0,m.yj)(),r=(0,g.iH)(!1),n=(0,g.iH)({}),l=()=>{r.value=!r.value},a=()=>{D.Z.post("/dashboard/auth/logout").then((()=>{e.push("/dashboard/login")}))},i=e=>{const t=n.value[e];t.scrollIntoView({behavior:"smooth"})},o=(0,g.qj)({sectionObserver:null}),s=r=>{for(const n of r)if(n.isIntersecting){const r=n.target.id;e.replace({name:t.name,hash:`#${r}`,query:{isObserver:!0}})}},c=()=>{const e={rootMargin:"0px 0px",threshold:.5};o.sectionObserver=new IntersectionObserver(s,e);const t=document.querySelectorAll(".section");t.forEach((e=>{o.sectionObserver.observe(e)}))};return(0,u.YP)((()=>e.currentRoute.value.hash),(()=>{e.currentRoute.value.hash&&!e.currentRoute.value.query.isObserver&&i(e.currentRoute.value.hash.slice(1))})),(0,u.bv)((()=>{e.currentRoute.value.hash&&i(e.currentRoute.value.hash.slice(1)),c()})),{drawer:r,refs:n,toggleDrawer:l,logout:a,UserFilled:p.Z,Menu:h.Z}}};const O=(0,j.Z)(M,[["render",f]]);var F=O},6253:function(e,t,r){"use strict";r.d(t,{os:function(){return f}});var n=r(1831),l=r(6923),a=r(4214);const i=(0,a.o8)({direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},contentPosition:{type:String,values:["left","center","right"],default:"center"},borderStyle:{type:(0,a.Cq)(String),default:"solid"}});var o=r(7739),s=r(4264);const u=(0,n.aZ)({name:"ElDivider",props:i,setup(e){const t=(0,s.s)("divider"),r=(0,n.Fl)((()=>({"--el-border-style":e.borderStyle})));return{ns:t,dividerStyle:r}}});function c(e,t,r,a,i,o){return(0,n.wg)(),(0,n.iD)("div",{class:(0,l.C_)([e.ns.b(),e.ns.m(e.direction)]),style:(0,l.j5)(e.dividerStyle)},[e.$slots.default&&"vertical"!==e.direction?((0,n.wg)(),(0,n.iD)("div",{key:0,class:(0,l.C_)([e.ns.e("text"),e.ns.is(e.contentPosition)])},[(0,n.WI)(e.$slots,"default")],2)):(0,n.kq)("v-if",!0)],6)}var d=(0,o.Z)(u,[["render",c]]),v=r(656);const f=(0,v.nz)(d)},1121:function(e,t,r){"use strict";r(7471)}}]);
//# sourceMappingURL=460.736520f9.js.map