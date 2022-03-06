(function(){"use strict";var e={41017:function(e,t,n){n(20750),n(56639),n(48803),n(5967);var o=n(92847),r=n(71831);function i(e,t,n,o,i,a){var l=(0,r.up)("the-form"),c=(0,r.up)("base-form");return(0,r.wg)(),(0,r.j4)(c,{header:"Заявка на ремонт"},{default:(0,r.w5)((function(){return[(0,r.Wm)(l)]})),_:1})}var a=n(55335),l=(n(6458),n(70361)),c=(n(95155),n(80663)),u=(n(45376),n(36150)),s=(n(57559),n(76641),n(47979),n(64603)),d=(n(32878),n(45423),n(33537),(0,r.Uk)("+375")),f={style:{"margin-left":"auto","margin-right":"0"}},m=(0,r.Uk)("Очистить"),g=(0,r.Uk)(" Отправить ");function h(e,t,n,o,i,h){var p=s.EZ,b=a.nH,v=u.BT,y=u.km,w=c.OF,_=l.mi,x=a.ly;return(0,r.wg)(),(0,r.j4)(x,{ref:"formRef","label-position":"top",model:i.form,rules:i.rules},{default:(0,r.w5)((function(){return[(0,r.Wm)(b,{label:"Ф.И.О.",prop:"clientName"},{default:(0,r.w5)((function(){return[(0,r.Wm)(p,{modelValue:i.form.clientName,"onUpdate:modelValue":t[0]||(t[0]=function(e){return i.form.clientName=e}),placeholder:"Иванов Иван Иванович",disabled:i.disable.clientName,maxlength:"128","show-word-limit":"",clearable:"",style:{"max-width":"132ch"}},null,8,["modelValue","disabled"])]})),_:1}),(0,r.Wm)(b,{label:"Телефон",prop:"clientPhone"},{default:(0,r.w5)((function(){return[(0,r.Wm)(p,{modelValue:i.form.clientPhone,"onUpdate:modelValue":t[1]||(t[1]=function(e){return i.form.clientPhone=e}),placeholder:"(33) 123-12-12",disabled:i.disable.clientPhone,maxlength:"14",style:{"max-width":"32ch"},onInput:t[2]||(t[2]=function(e){return h.formatPhone()})},{prepend:(0,r.w5)((function(){return[d]})),_:1},8,["modelValue","disabled"])]})),_:1}),(0,r.Wm)(b,{label:"Кабинет",prop:"cabinet"},{default:(0,r.w5)((function(){return[(0,r.Wm)(y,{modelValue:i.form.cabinet,"onUpdate:modelValue":t[3]||(t[3]=function(e){return i.form.cabinet=e}),placeholder:"Пожалуйста, выберите кабинет",loading:i.cabinet.loading,disabled:i.disable.cabinet,"loading-text":"Загрузка","no-data-text":"Упс! Что-то пошло не так!",style:{width:"100%","max-width":"132ch"}},{default:(0,r.w5)((function(){return[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(i.cabinet.options,(function(e){return(0,r.wg)(),(0,r.j4)(v,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","loading","disabled"])]})),_:1}),(0,r.Wm)(b,{label:"Срочность",prop:"urgency"},{default:(0,r.w5)((function(){return[(0,r.Wm)(y,{modelValue:i.form.urgency,"onUpdate:modelValue":t[4]||(t[4]=function(e){return i.form.urgency=e}),placeholder:"Пожалуйста, выберите срочность",loading:i.urgency.loading,disabled:i.disable.urgency,"loading-text":"Загрузка","no-data-text":"Упс! Что-то пошло не так!",style:{width:"100%","max-width":"132ch"}},{default:(0,r.w5)((function(){return[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(i.urgency.options,(function(e){return(0,r.wg)(),(0,r.j4)(v,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","loading","disabled"])]})),_:1}),(0,r.Wm)(b,{label:"Неисправности",prop:"defects"},{default:(0,r.w5)((function(){return[(0,r.Wm)(w,{modelValue:i.form.defects,"onUpdate:modelValue":t[5]||(t[5]=function(e){return i.form.defects=e}),placeholder:"Пожалуйста, выберите неисправности",options:i.defects.options,loading:i.defects.loading,disabled:i.disable.defects,multiple:"","allow-create":"",filterable:"",clearable:"","loading-text":"Загрузка","no-data-text":"Упс! Что-то пошло не так!",style:{width:"100%","max-width":"132ch"}},null,8,["modelValue","options","loading","disabled"])]})),_:1}),(0,r.Wm)(b,{label:"Подробности неисправностей",prop:"description"},{default:(0,r.w5)((function(){return[(0,r.Wm)(p,{type:"textarea",modelValue:i.form.description,"onUpdate:modelValue":t[6]||(t[6]=function(e){return i.form.description=e}),placeholder:"В 9.15 сломался комьютер",disabled:i.disable.description,autosize:{minRows:3}},null,8,["modelValue","disabled"])]})),_:1}),(0,r.Wm)(b,null,{default:(0,r.w5)((function(){return[(0,r._)("div",f,[(0,r.Wm)(_,{onClick:t[7]||(t[7]=function(e){return h.resetForm()})},{default:(0,r.w5)((function(){return[m]})),_:1}),(0,r.Wm)(_,{type:"primary",loading:i.disable.submit,onClick:t[8]||(t[8]=function(e){return h.submitForm()})},{default:(0,r.w5)((function(){return[g]})),_:1},8,["loading"])])]})),_:1})]})),_:1},8,["model","rules"])}n(19701),n(53541),n(31014),n(50098),n(49966),n(7579),n(31599),n(47328),n(65205),n(63831),n(97244),n(776);var p=n(4659),b=(n(84491),n(1489)),v=n.n(b),y="https://mtec-support.herokuapp.com/",w=v().create({baseURL:"".concat(y,"/support/api"),headers:{"Content-type":"application/json"},withCredentials:!0}),_=w,x={data:function(){return{socket:null,cabinet:{options:[],loading:!0},urgency:{options:[],loading:!0},defects:{options:[],loading:!0},disable:{clientName:!1,clientPhone:!1,cabinet:!1,urgency:!1,defects:!1,description:!1,submit:!1},form:{clientName:"",clientPhone:"",cabinet:"",urgency:"",defects:[],description:""},rules:{clientName:[{required:!0,message:"Пожалуйста, введите ваше Ф.И.О.",trigger:"blur"},{min:5,message:"Ф.И.О. должно содержать более 4 символов",trigger:"blur"}],clientPhone:[{pattern:/\(\d{2}\) \d{3}-\d{2}-\d{2}/,message:"Телефон должен быть действительным",trigger:"blur"}],cabinet:[{required:!0,message:"Пожалуйста, укажите кабинет",trigger:"change"}],urgency:[{required:!0,message:"Пожалуйста, укажите срочность",trigger:"change"}],defects:[{required:!0,message:"Пожалуйста, укажите неисправности",trigger:"change"}]}}},methods:{submitForm:function(){var e=this;this.$refs.formRef.validate((function(t){return!!t&&(e.toggleAll(),e.sendData(),!0)}))},resetForm:function(){this.$refs.formRef.resetFields()},formatPhone:function(){var e=this.form.clientPhone.replace(/\D/g,"").match(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);this.form.clientPhone=e[2]?"(".concat(e[1],") ").concat(e[2]).concat(e[3]?"-".concat(e[3]):"").concat(e[4]?"-".concat(e[4]):""):e[1]},toggleAll:function(){var e=this;Object.keys(this.disable).forEach((function(t){e.disable[t]=!e.disable[t]}))},sendData:function(){var e=this,t={client_name:this.form.clientName,client_phone:this.form.clientPhone,urgency:this.form.urgency,cabinet:this.form.cabinet,defects:this.form.defects.sort().join("; "),defect_description:this.form.description};_.post("/request",t).then((function(){(0,p.z8)({message:"Успешно отправлено",type:"success"}),e.setLocalStorate(),e.resetForm(),e.getLocalStorage(),e.toggleAll()})).catch((function(){p.z8.error("Упс! Мы не смогли отправить заявку. Повторите попытку позже либо обратитесь к администратору"),e.toggleAll()}))},getLocalStorage:function(){this.form.clientName=localStorage.getItem("request-client-name"),this.form.clientPhone=localStorage.getItem("request-client-phone"),this.form.urgency=localStorage.getItem("request-urgency"),this.form.cabinet=localStorage.getItem("request-client-cabinet")},setLocalStorate:function(){localStorage.setItem("request-client-name",this.form.clientName),localStorage.setItem("request-client-phone",this.form.clientPhone),localStorage.setItem("request-urgency",this.form.urgency),localStorage.setItem("request-client-cabinet",this.form.cabinet)},getDefects:function(){var e=this;return _.get("/request/defects").then((function(t){return e.defects.options=t.data.map((function(e){return{value:e,label:e}})),e.defects.loading=!1,!0}))},getCabinets:function(){var e=this;return _.get("/request/cabinets").then((function(t){return e.cabinet.options=t.data,e.cabinet.loading=!1,!0}))},getUrgencies:function(){var e=this;return _.get("/request/urgency").then((function(t){return e.urgency.options=t.data,e.urgency.loading=!1,!0}))}},mounted:function(){var e=this;Promise.all([this.getCabinets(),this.getDefects(),this.getUrgencies()]).then((function(){e.getLocalStorage(),e.toggleAll()})).catch((function(){p.z8.error("Упс! Мы не смогли загрузить данные. Пожалуйста, обратитесь к администратору.")}))},beforeMount:function(){this.toggleAll()}},P=n(12505);const S=(0,P.Z)(x,[["render",h]]);var V=S,W=n(36253),j=(n(91121),n(26923)),k={class:"container"},q={class:"header"};function O(e,t,n,o,i,a){var l=W.os;return(0,r.wg)(),(0,r.iD)("div",k,[(0,r._)("div",q,[(0,r._)("h1",null,(0,j.zw)(n.header),1),(0,r.Wm)(l,{class:"divider"})]),(0,r.WI)(e.$slots,"default",{},void 0,!0)])}var U={props:["header"]};const I=(0,P.Z)(U,[["render",O],["__scopeId","data-v-bde77ed2"]]);var F=I,N={components:{TheForm:V,BaseForm:F}};const C=(0,P.Z)(N,[["render",i]]);var D=C;(0,o.ri)(D).mount("#app")}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,o,r,i){if(!o){var a=1/0;for(s=0;s<e.length;s++){o=e[s][0],r=e[s][1],i=e[s][2];for(var l=!0,c=0;c<o.length;c++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[c])}))?o.splice(c--,1):(l=!1,i<a&&(a=i));if(l){e.splice(s--,1);var u=r();void 0!==u&&(t=u)}}return t}i=i||0;for(var s=e.length;s>0&&e[s-1][2]>i;s--)e[s]=e[s-1];e[s]=[o,r,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.j=826}(),function(){var e={826:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,i,a=o[0],l=o[1],c=o[2],u=0;if(a.some((function(t){return 0!==e[t]}))){for(r in l)n.o(l,r)&&(n.m[r]=l[r]);if(c)var s=c(n)}for(t&&t(o);u<a.length;u++)i=a[u],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(s)},o=self["webpackChunkdiploma_front"]=self["webpackChunkdiploma_front"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(41017)}));o=n.O(o)})();
//# sourceMappingURL=index-legacy.1f36c24e.js.map