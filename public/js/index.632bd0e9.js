(function(){"use strict";var e={71739:function(e,t,o){o(20750),o(56639),o(48803),o(5967);var n=o(92847),a=o(71831);function l(e,t,o,n,l,i){const r=(0,a.up)("the-form"),s=(0,a.up)("base-form");return(0,a.wg)(),(0,a.j4)(s,{header:"Заявка на ремонт"},{default:(0,a.w5)((()=>[(0,a.Wm)(r)])),_:1})}var i=o(55335),r=(o(6458),o(70361)),s=(o(95155),o(80663)),c=(o(45376),o(36150)),d=(o(57559),o(76641),o(47979),o(27245));o(32878),o(33537);const u=(0,a.Uk)("+375"),m={style:{"margin-left":"auto","margin-right":"0"}},g=(0,a.Uk)("Очистить"),f=(0,a.Uk)(" Отправить ");function h(e,t,o,n,l,h){const p=d.EZ,b=i.nH,y=c.BT,w=c.km,v=s.OF,_=r.mi,x=i.ly;return(0,a.wg)(),(0,a.j4)(x,{ref:"formRef","label-position":"top",model:l.form,rules:l.rules},{default:(0,a.w5)((()=>[(0,a.Wm)(b,{label:"Ф.И.О.",prop:"clientName"},{default:(0,a.w5)((()=>[(0,a.Wm)(p,{modelValue:l.form.clientName,"onUpdate:modelValue":t[0]||(t[0]=e=>l.form.clientName=e),placeholder:"Иванов Иван Иванович",disabled:l.disable.clientName,maxlength:"64","show-word-limit":"",clearable:"",style:{"max-width":"132ch"}},null,8,["modelValue","disabled"])])),_:1}),(0,a.Wm)(b,{label:"Телефон",prop:"clientPhone"},{default:(0,a.w5)((()=>[(0,a.Wm)(p,{modelValue:l.form.clientPhone,"onUpdate:modelValue":t[1]||(t[1]=e=>l.form.clientPhone=e),placeholder:"(33) 123-12-12",disabled:l.disable.clientPhone,maxlength:"14",style:{"max-width":"32ch"},onInput:t[2]||(t[2]=e=>h.formatPhone())},{prepend:(0,a.w5)((()=>[u])),_:1},8,["modelValue","disabled"])])),_:1}),(0,a.Wm)(b,{label:"Кабинет",prop:"cabinet"},{default:(0,a.w5)((()=>[(0,a.Wm)(w,{modelValue:l.form.cabinet,"onUpdate:modelValue":t[3]||(t[3]=e=>l.form.cabinet=e),placeholder:"Пожалуйста, выберите кабинет",loading:l.cabinet.loading,disabled:l.disable.cabinet,"loading-text":"Загрузка","no-data-text":"Упс! Что-то пошло не так!",style:{width:"100%","max-width":"132ch"}},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(l.cabinet.options,(e=>((0,a.wg)(),(0,a.j4)(y,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue","loading","disabled"])])),_:1}),(0,a.Wm)(b,{label:"Срочность",prop:"urgency"},{default:(0,a.w5)((()=>[(0,a.Wm)(w,{modelValue:l.form.urgency,"onUpdate:modelValue":t[4]||(t[4]=e=>l.form.urgency=e),placeholder:"Пожалуйста, выберите срочность",loading:l.urgency.loading,disabled:l.disable.urgency,"loading-text":"Загрузка","no-data-text":"Упс! Что-то пошло не так!",style:{width:"100%","max-width":"132ch"}},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(l.urgency.options,(e=>((0,a.wg)(),(0,a.j4)(y,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue","loading","disabled"])])),_:1}),(0,a.Wm)(b,{label:"Неисправности",prop:"defects"},{default:(0,a.w5)((()=>[(0,a.Wm)(v,{modelValue:l.form.defects,"onUpdate:modelValue":t[5]||(t[5]=e=>l.form.defects=e),placeholder:"Пожалуйста, выберите неисправности",options:l.defects.options,loading:l.defects.loading,disabled:l.disable.defects,multiple:"","allow-create":"",filterable:"",clearable:"","loading-text":"Загрузка","no-data-text":"Упс! Что-то пошло не так!",style:{width:"100%","max-width":"132ch"}},null,8,["modelValue","options","loading","disabled"])])),_:1}),(0,a.Wm)(b,{label:"Подробности неисправностей",prop:"description"},{default:(0,a.w5)((()=>[(0,a.Wm)(p,{type:"textarea",modelValue:l.form.description,"onUpdate:modelValue":t[6]||(t[6]=e=>l.form.description=e),maxlength:"255","show-word-limit":"",placeholder:"В 9.15 сломался комьютер",disabled:l.disable.description,autosize:{minRows:3}},null,8,["modelValue","disabled"])])),_:1}),(0,a.Wm)(b,null,{default:(0,a.w5)((()=>[(0,a._)("div",m,[(0,a.Wm)(_,{onClick:t[7]||(t[7]=e=>h.resetForm())},{default:(0,a.w5)((()=>[g])),_:1}),(0,a.Wm)(_,{type:"primary",loading:l.disable.submit,onClick:t[8]||(t[8]=e=>h.submitForm())},{default:(0,a.w5)((()=>[f])),_:1},8,["loading"])])])),_:1})])),_:1},8,["model","rules"])}o(19701),o(53541),o(31014),o(65205),o(776);var p=o(4659),b=(o(13540),o(84491),o(85045)),y=o(23912);function w(e){(0,p.z8)({message:e,grouping:!0,type:"error"});const t=new Audio(b);t.play()}function v(e){(0,p.z8)({message:e,grouping:!0,type:"success"});const t=new Audio(y);t.play()}var _=o(1489),x=o.n(_);const S="https://mtec-support.herokuapp.com",q=x().create({baseURL:`${S}/support/api/v1`,headers:{"Content-type":"application/json"},withCredentials:!0});var P=q,k={data(){return{socket:null,cabinet:{options:[],loading:!0},urgency:{options:[],loading:!0},defects:{options:[],loading:!0},disable:{clientName:!1,clientPhone:!1,cabinet:!1,urgency:!1,defects:!1,description:!1,submit:!1},form:{clientName:"",clientPhone:"",cabinet:"",urgency:"",defects:[],description:""},rules:{clientName:[{required:!0,message:"Пожалуйста, введите ваше Ф.И.О.",trigger:"blur"},{min:5,message:"Ф.И.О. должно содержать более 4 символов",trigger:"blur"}],clientPhone:[{pattern:/\(\d{2}\) \d{3}-\d{2}-\d{2}/,message:"Телефон должен быть действительным",trigger:"blur"}],cabinet:[{required:!0,message:"Пожалуйста, укажите кабинет",trigger:"change"}],urgency:[{required:!0,message:"Пожалуйста, укажите срочность",trigger:"change"}],defects:[{required:!0,message:"Пожалуйста, укажите неисправности",trigger:"change"}]}}},methods:{submitForm(){this.$refs.formRef.validate((e=>!!e&&(this.toggleAll(),this.sendData(),!0)))},resetForm(){this.$refs.formRef.resetFields()},formatPhone(){const e=this.form.clientPhone.replace(/\D/g,"").match(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);this.form.clientPhone=e[2]?`(${e[1]}) ${e[2]}${e[3]?`-${e[3]}`:""}${e[4]?`-${e[4]}`:""}`:e[1]},toggleAll(){Object.keys(this.disable).forEach((e=>{this.disable[e]=!this.disable[e]}))},sendData(){const e={client_name:this.form.clientName,client_phone:this.form.clientPhone,urgency:this.form.urgency,cabinet:this.form.cabinet,defects:this.form.defects.sort().join("; "),defect_description:this.form.description};P.post("/request",e).then((()=>{v("Успешно отправлено"),this.setLocalStorate(),this.resetForm(),this.getLocalStorage(),this.toggleAll()})).catch((()=>{w("Упс! Мы не смогли отправить заявку. Повторите попытку позже либо обратитесь к администратору"),this.toggleAll()}))},getLocalStorage(){this.form.clientName=localStorage.getItem("request-client-name"),this.form.clientPhone=localStorage.getItem("request-client-phone"),localStorage.getItem("request-urgency")&&(this.form.urgency=localStorage.getItem("request-urgency")),localStorage.getItem("request-client-cabinet")&&(this.form.cabinet=localStorage.getItem("request-client-cabinet"))},setLocalStorate(){localStorage.setItem("request-client-name",this.form.clientName),localStorage.setItem("request-client-phone",this.form.clientPhone),localStorage.setItem("request-urgency",this.form.urgency),localStorage.setItem("request-client-cabinet",this.form.cabinet)},getDefects(){return P.get("/request/defects").then((e=>(this.defects.options=e.data.map((e=>({value:e,label:e}))),this.defects.loading=!1,!0)))},getCabinets(){return P.get("/request/cabinets").then((e=>(this.cabinet.options=e.data,this.cabinet.loading=!1,!0)))},getUrgencies(){return P.get("/request/urgency").then((e=>(this.urgency.options=e.data,this.urgency.loading=!1,!0)))}},mounted(){},beforeMount(){Promise.all([this.getCabinets(),this.getDefects(),this.getUrgencies()]).then((()=>{this.getLocalStorage()})).catch((()=>{w("Упс! Мы не смогли загрузить данные. Пожалуйста, обратитесь к администратору."),this.toggleAll()}))}},V=o(12505);const W=(0,V.Z)(k,[["render",h]]);var j=W,O=o(36253),I=(o(91121),o(26923));const U={class:"container"},F={key:0,class:"header"};function N(e,t,o,n,l,i){const r=O.os;return(0,a.wg)(),(0,a.iD)("div",U,[o.header?((0,a.wg)(),(0,a.iD)("div",F,[(0,a._)("h1",null,(0,I.zw)(o.header),1),(0,a.Wm)(r,{class:"divider"})])):(0,a.kq)("",!0),(0,a.WI)(e.$slots,"default",{},void 0,!0)])}var $={props:["header"]};const D=(0,V.Z)($,[["render",N],["__scopeId","data-v-08a232da"]]);var C=D,A={components:{TheForm:j,BaseForm:C}};const L=(0,V.Z)(A,[["render",l]]);var T=L;(0,n.ri)(T).mount("#app")},85045:function(e,t,o){e.exports=o.p+"media/error.3e0a2ea7.ogg"},23912:function(e,t,o){e.exports=o.p+"media/notification.b9a65643.ogg"}},t={};function o(n){var a=t[n];if(void 0!==a)return a.exports;var l=t[n]={exports:{}};return e[n].call(l.exports,l,l.exports,o),l.exports}o.m=e,function(){var e=[];o.O=function(t,n,a,l){if(!n){var i=1/0;for(d=0;d<e.length;d++){n=e[d][0],a=e[d][1],l=e[d][2];for(var r=!0,s=0;s<n.length;s++)(!1&l||i>=l)&&Object.keys(o.O).every((function(e){return o.O[e](n[s])}))?n.splice(s--,1):(r=!1,l<i&&(i=l));if(r){e.splice(d--,1);var c=a();void 0!==c&&(t=c)}}return t}l=l||0;for(var d=e.length;d>0&&e[d-1][2]>l;d--)e[d]=e[d-1];e[d]=[n,a,l]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){o.j=826}(),function(){o.p="/"}(),function(){var e={826:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,l,i=n[0],r=n[1],s=n[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(a in r)o.o(r,a)&&(o.m[a]=r[a]);if(s)var d=s(o)}for(t&&t(n);c<i.length;c++)l=i[c],o.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return o.O(d)},n=self["webpackChunkdiploma_front"]=self["webpackChunkdiploma_front"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(71739)}));n=o.O(n)})();
//# sourceMappingURL=index.632bd0e9.js.map