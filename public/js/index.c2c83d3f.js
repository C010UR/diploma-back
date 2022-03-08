(function(){"use strict";var e={5714:function(e,t,o){o(750),o(6639),o(8803),o(5967);var n=o(2847),l=o(1831);function a(e,t,o,n,a,r){const i=(0,l.up)("the-form"),s=(0,l.up)("base-form");return(0,l.wg)(),(0,l.j4)(s,{header:"Заявка на ремонт"},{default:(0,l.w5)((()=>[(0,l.Wm)(i)])),_:1})}var r=o(5335),i=(o(6458),o(361)),s=(o(5155),o(663)),c=(o(5376),o(6150)),d=(o(7559),o(6641),o(7979),o(4603));o(2878),o(3537);const u=(0,l.Uk)("+375"),m={style:{"margin-left":"auto","margin-right":"0"}},f=(0,l.Uk)("Очистить"),g=(0,l.Uk)(" Отправить ");function h(e,t,o,n,a,h){const p=d.EZ,b=r.nH,y=c.BT,v=c.km,w=s.OF,_=i.mi,S=r.ly;return(0,l.wg)(),(0,l.j4)(S,{ref:"formRef","label-position":"top",model:a.form,rules:a.rules},{default:(0,l.w5)((()=>[(0,l.Wm)(b,{label:"Ф.И.О.",prop:"clientName"},{default:(0,l.w5)((()=>[(0,l.Wm)(p,{modelValue:a.form.clientName,"onUpdate:modelValue":t[0]||(t[0]=e=>a.form.clientName=e),placeholder:"Иванов Иван Иванович",disabled:a.disable.clientName,maxlength:"128","show-word-limit":"",clearable:"",style:{"max-width":"132ch"}},null,8,["modelValue","disabled"])])),_:1}),(0,l.Wm)(b,{label:"Телефон",prop:"clientPhone"},{default:(0,l.w5)((()=>[(0,l.Wm)(p,{modelValue:a.form.clientPhone,"onUpdate:modelValue":t[1]||(t[1]=e=>a.form.clientPhone=e),placeholder:"(33) 123-12-12",disabled:a.disable.clientPhone,maxlength:"14",style:{"max-width":"32ch"},onInput:t[2]||(t[2]=e=>h.formatPhone())},{prepend:(0,l.w5)((()=>[u])),_:1},8,["modelValue","disabled"])])),_:1}),(0,l.Wm)(b,{label:"Кабинет",prop:"cabinet"},{default:(0,l.w5)((()=>[(0,l.Wm)(v,{modelValue:a.form.cabinet,"onUpdate:modelValue":t[3]||(t[3]=e=>a.form.cabinet=e),placeholder:"Пожалуйста, выберите кабинет",loading:a.cabinet.loading,disabled:a.disable.cabinet,"loading-text":"Загрузка","no-data-text":"Упс! Что-то пошло не так!",style:{width:"100%","max-width":"132ch"}},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(a.cabinet.options,(e=>((0,l.wg)(),(0,l.j4)(y,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue","loading","disabled"])])),_:1}),(0,l.Wm)(b,{label:"Срочность",prop:"urgency"},{default:(0,l.w5)((()=>[(0,l.Wm)(v,{modelValue:a.form.urgency,"onUpdate:modelValue":t[4]||(t[4]=e=>a.form.urgency=e),placeholder:"Пожалуйста, выберите срочность",loading:a.urgency.loading,disabled:a.disable.urgency,"loading-text":"Загрузка","no-data-text":"Упс! Что-то пошло не так!",style:{width:"100%","max-width":"132ch"}},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(a.urgency.options,(e=>((0,l.wg)(),(0,l.j4)(y,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue","loading","disabled"])])),_:1}),(0,l.Wm)(b,{label:"Неисправности",prop:"defects"},{default:(0,l.w5)((()=>[(0,l.Wm)(w,{modelValue:a.form.defects,"onUpdate:modelValue":t[5]||(t[5]=e=>a.form.defects=e),placeholder:"Пожалуйста, выберите неисправности",options:a.defects.options,loading:a.defects.loading,disabled:a.disable.defects,multiple:"","allow-create":"",filterable:"",clearable:"","loading-text":"Загрузка","no-data-text":"Упс! Что-то пошло не так!",style:{width:"100%","max-width":"132ch"}},null,8,["modelValue","options","loading","disabled"])])),_:1}),(0,l.Wm)(b,{label:"Подробности неисправностей",prop:"description"},{default:(0,l.w5)((()=>[(0,l.Wm)(p,{type:"textarea",modelValue:a.form.description,"onUpdate:modelValue":t[6]||(t[6]=e=>a.form.description=e),placeholder:"В 9.15 сломался комьютер",disabled:a.disable.description,autosize:{minRows:3}},null,8,["modelValue","disabled"])])),_:1}),(0,l.Wm)(b,null,{default:(0,l.w5)((()=>[(0,l._)("div",m,[(0,l.Wm)(_,{onClick:t[7]||(t[7]=e=>h.resetForm())},{default:(0,l.w5)((()=>[f])),_:1}),(0,l.Wm)(_,{type:"primary",loading:a.disable.submit,onClick:t[8]||(t[8]=e=>h.submitForm())},{default:(0,l.w5)((()=>[g])),_:1},8,["loading"])])])),_:1})])),_:1},8,["model","rules"])}o(9701),o(3541),o(1014),o(5205),o(776);var p=o(4659),b=(o(4491),o(1489)),y=o.n(b);const v="https://mtec-support.herokuapp.com/",w=y().create({baseURL:`${v}/support/api`,headers:{"Content-type":"application/json"},withCredentials:!0});var _=w,S={data(){return{socket:null,cabinet:{options:[],loading:!0},urgency:{options:[],loading:!0},defects:{options:[],loading:!0},disable:{clientName:!1,clientPhone:!1,cabinet:!1,urgency:!1,defects:!1,description:!1,submit:!1},form:{clientName:"",clientPhone:"",cabinet:"",urgency:"",defects:[],description:""},rules:{clientName:[{required:!0,message:"Пожалуйста, введите ваше Ф.И.О.",trigger:"blur"},{min:5,message:"Ф.И.О. должно содержать более 4 символов",trigger:"blur"}],clientPhone:[{pattern:/\(\d{2}\) \d{3}-\d{2}-\d{2}/,message:"Телефон должен быть действительным",trigger:"blur"}],cabinet:[{required:!0,message:"Пожалуйста, укажите кабинет",trigger:"change"}],urgency:[{required:!0,message:"Пожалуйста, укажите срочность",trigger:"change"}],defects:[{required:!0,message:"Пожалуйста, укажите неисправности",trigger:"change"}]}}},methods:{submitForm(){this.$refs.formRef.validate((e=>!!e&&(this.toggleAll(),this.sendData(),!0)))},resetForm(){this.$refs.formRef.resetFields()},formatPhone(){const e=this.form.clientPhone.replace(/\D/g,"").match(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);this.form.clientPhone=e[2]?`(${e[1]}) ${e[2]}${e[3]?`-${e[3]}`:""}${e[4]?`-${e[4]}`:""}`:e[1]},toggleAll(){Object.keys(this.disable).forEach((e=>{this.disable[e]=!this.disable[e]}))},sendData(){const e={client_name:this.form.clientName,client_phone:this.form.clientPhone,urgency:this.form.urgency,cabinet:this.form.cabinet,defects:this.form.defects.sort().join("; "),defect_description:this.form.description};_.post("/request",e).then((()=>{(0,p.z8)({message:"Успешно отправлено",type:"success"}),this.setLocalStorate(),this.resetForm(),this.getLocalStorage(),this.toggleAll()})).catch((()=>{p.z8.error("Упс! Мы не смогли отправить заявку. Повторите попытку позже либо обратитесь к администратору"),this.toggleAll()}))},getLocalStorage(){this.form.clientName=localStorage.getItem("request-client-name"),this.form.clientPhone=localStorage.getItem("request-client-phone"),localStorage.getItem("request-urgency")&&(this.form.urgency=localStorage.getItem("request-urgency")),localStorage.getItem("request-client-cabinet")&&(this.form.cabinet=localStorage.getItem("request-client-cabinet"))},setLocalStorate(){localStorage.setItem("request-client-name",this.form.clientName),localStorage.setItem("request-client-phone",this.form.clientPhone),localStorage.setItem("request-urgency",this.form.urgency),localStorage.setItem("request-client-cabinet",this.form.cabinet)},getDefects(){return _.get("/request/defects").then((e=>(this.defects.options=e.data.map((e=>({value:e,label:e}))),this.defects.loading=!1,!0)))},getCabinets(){return _.get("/request/cabinets").then((e=>(this.cabinet.options=e.data,this.cabinet.loading=!1,!0)))},getUrgencies(){return _.get("/request/urgency").then((e=>(this.urgency.options=e.data,this.urgency.loading=!1,!0)))}},mounted(){},beforeMount(){Promise.all([this.getCabinets(),this.getDefects(),this.getUrgencies()]).then((()=>{this.getLocalStorage()})).catch((()=>{p.z8.error("Упс! Мы не смогли загрузить данные. Пожалуйста, обратитесь к администратору."),this.toggleAll()}))}},x=o(2505);const P=(0,x.Z)(S,[["render",h]]);var q=P,V=o(6253),W=(o(1121),o(6923));const j={class:"container"},k={class:"header"};function O(e,t,o,n,a,r){const i=V.os;return(0,l.wg)(),(0,l.iD)("div",j,[(0,l._)("div",k,[(0,l._)("h1",null,(0,W.zw)(o.header),1),(0,l.Wm)(i,{class:"divider"})]),(0,l.WI)(e.$slots,"default",{},void 0,!0)])}var I={props:["header"]};const U=(0,x.Z)(I,[["render",O],["__scopeId","data-v-bde77ed2"]]);var F=U,N={components:{TheForm:q,BaseForm:F}};const $=(0,x.Z)(N,[["render",a]]);var C=$;(0,n.ri)(C).mount("#app")}},t={};function o(n){var l=t[n];if(void 0!==l)return l.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,o),a.exports}o.m=e,function(){var e=[];o.O=function(t,n,l,a){if(!n){var r=1/0;for(d=0;d<e.length;d++){n=e[d][0],l=e[d][1],a=e[d][2];for(var i=!0,s=0;s<n.length;s++)(!1&a||r>=a)&&Object.keys(o.O).every((function(e){return o.O[e](n[s])}))?n.splice(s--,1):(i=!1,a<r&&(r=a));if(i){e.splice(d--,1);var c=l();void 0!==c&&(t=c)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[n,l,a]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){o.j=826}(),function(){var e={826:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var l,a,r=n[0],i=n[1],s=n[2],c=0;if(r.some((function(t){return 0!==e[t]}))){for(l in i)o.o(i,l)&&(o.m[l]=i[l]);if(s)var d=s(o)}for(t&&t(n);c<r.length;c++)a=r[c],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(d)},n=self["webpackChunkdiploma_front"]=self["webpackChunkdiploma_front"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(5714)}));n=o.O(n)})();
//# sourceMappingURL=index.c2c83d3f.js.map