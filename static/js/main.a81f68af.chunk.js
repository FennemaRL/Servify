(this.webpackJsonpwebservify=this.webpackJsonpwebservify||[]).push([[0],{244:function(e,a,t){e.exports=t.p+"static/media/404.9638c3e3.jpg"},245:function(e,a,t){e.exports=t.p+"static/media/logofinal.f6b65991.png"},252:function(e,a,t){e.exports=t(463)},257:function(e,a,t){},258:function(e,a,t){},463:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),c=t(10),o=t.n(c),i=(t(257),t(251)),l=(t(258),t(28)),s=t(39),m=t(465),u=t(5),p=t(22),d=t.n(p),f=t(467),g=t(472),v=t(96),E=t(58),b=t(473),h=t(231),y=t(154),j=t(149),N=f.a.Title,O=f.a.Paragraph,w=g.a.Meta;function S(){var e=Object(r.useState)([]),a=Object(u.a)(e,2),t=a[0],c=a[1];return Object(r.useEffect)((function(){d.a.get("".concat("https://api-servify.herokuapp.com","/api/categories")).then((function(e){return c(e.data)})).catch((function(e){return console.error(e)}))}),[]),n.a.createElement("div",{style:{width:"90vw"}},n.a.createElement(N,{level:3,style:{textAlign:"center"}},"Servicios"),n.a.createElement(v.a,{gutter:[24,16],justify:"space-around"},t.map((function(e,a){return function(e,a){return n.a.createElement(E.a,{ms:12,lg:8,xl:4,key:e},n.a.createElement(s.b,{to:"/Servify/search/".concat(a.categoryName)},n.a.createElement(g.a,{hoverable:!0,className:"cardResize",cover:n.a.createElement("img",{alt:a.categoryName,src:a.imageURL})},n.a.createElement(w,{title:a.categoryName}))))}(a,e)}))))}function x(){var e=Object(r.useState)([]),a=Object(u.a)(e,2),t=a[0],c=a[1];return Object(r.useEffect)((function(){d.a.get("".concat("https://api-servify.herokuapp.com","/api/providers/bestRated")).then((function(e){c(e.data)})).catch((function(e){return console.error(e)}))}),[]),n.a.createElement("div",null,n.a.createElement(N,{level:3,style:{textAlign:"center"}},"Prestadores recomendados"),n.a.createElement(y.b,{itemLayout:"horizontal",dataSource:t,renderItem:function(e){return n.a.createElement(s.b,{to:"/Servify/view/".concat(e.username)},n.a.createElement(y.b.Item,null,n.a.createElement(y.b.Item.Meta,{avatar:n.a.createElement(h.a,{src:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}),title:n.a.createElement("p",null,e.username),description:n.a.createElement("div",null,n.a.createElement(j.a,{allowHalf:!0,disabled:!0,defaultValue:e.averageRating}),n.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}},e.services.map((function(e){return n.a.createElement(b.a,{key:e.category.categoryName},e.category.categoryName)}))))})))}}))}var I=function(){return n.a.createElement("div",{style:{display:"flex",flexDirection:"column",minHeight:"80vh",alignItems:"center",justifyContent:"center"}},n.a.createElement(N,{level:2},"Sobre Nosotros"),n.a.createElement(O,{ellipsis:{rows:2,expandable:!0,symbol:"more"}},"Somos un sitio que naci\xf3 por la necesitad de conectar personas que buscan algun tipo de servicio con aquellas que lo brindan."),n.a.createElement("div",{style:{marginTop:"10vh"}}),n.a.createElement(S,null),n.a.createElement(x,null))},C=t(30),k=t(183),F=t(250),T=t(475),P=f.a.Title;var A=function(){var e=Object(l.h)(),a=e.category,t=e.zone,c=Object(r.useState)([]),o=Object(u.a)(c,2),i=o[0],m=o[1],p=Object(r.useState)(),f=Object(u.a)(p,2),g=f[0],v=f[1],E=n.a.createElement(k.a,null,n.a.createElement(k.a.Item,null,n.a.createElement("a",{target:"ratings_desc",onClick:function(){m((function(e){return Object(C.a)(e).sort((function(e,a){return e.average<a.average?1:-1}))}))}},"Mejor rating")));return Object(r.useEffect)((function(){d.a.get("".concat("https://api-servify.herokuapp.com","/api/services/").concat(a),{params:{scope:t}}).then((function(e){m(e.data)})).catch((function(e){return v(e.response.data)}))}),[a,t]),n.a.createElement(n.a.Fragment,null,g&&n.a.createElement(l.a,{to:{pathname:"/Servify/Error",state:{message:g}}})||n.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},n.a.createElement(n.a.Fragment,null,n.a.createElement(P,{style:{textAlign:"center"},level:2},"B\xfasqueda de ",a),t&&n.a.createElement(P,{style:{textAlign:"center"},level:4},"en zona ",t)),n.a.createElement("div",{style:{display:"flex",flexDirection:"row-reverse",minWidth:441}},function(){var e=i.length>=1;return n.a.createElement(F.a,{overlay:E,disabled:!e},n.a.createElement("a",{className:"ant-dropdown-link",onClick:function(e){return e.preventDefault()}},"Ordenar por ",n.a.createElement(T.a,null)))}()),n.a.createElement("div",{style:{backgroundColor:"#d9d9d9",width:"45vw"}},n.a.createElement(y.b,{itemLayout:"horizontal",dataSource:i,size:"large",renderItem:function(e){return n.a.createElement(y.b.Item,{style:{backgroundColor:"#d9d9d9",borderRadius:5}},n.a.createElement(s.b,{to:"/Servify/view/".concat(e.username,"/").concat(a)},n.a.createElement(y.b.Item.Meta,{title:n.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignContent:"center",width:200,alignItems:"center"}},n.a.createElement("p",{style:{marginTop:24}},e.username),n.a.createElement(j.a,{allowHalf:!0,disabled:!0,value:e.average})),description:n.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}},e.description?e.description:"No contiene descripci\xf3n")})))}}))))},q=t(46),R=t(469),B=t(248),V=t(38),z=t(476),L=function(){var e=R.a.useForm(),a=Object(u.a)(e,1)[0],t=R.a.useForm(),c=Object(u.a)(t,1)[0],o=Object(r.useState)(),i=Object(u.a)(o,2)[1];Object(r.useEffect)((function(){i({})}),[]);return n.a.createElement("div",null,n.a.createElement("h2",null,"Agregar Prestador"),n.a.createElement(R.a,{form:a,name:"horizontal_login",layout:"inline",onFinish:function(e){d.a.post("".concat("https://api-servify.herokuapp.com","/api/provider"),{name:e.username,phoneNmbr:"1234",celPhoneNmbr:"12346",webPage:"www.google.com",residence:"Ezeiza"}).then((function(e){return alert("Se agreg\xf3 con \xe9xito")})).catch((function(e){return alert(e.response.data)}))}},n.a.createElement(R.a.Item,{name:"username",rules:[{required:!0,message:"Por favor ingrese una categoria"}]},n.a.createElement(B.a,{prefix:n.a.createElement(z.a,{className:"site-form-item-icon"}),placeholder:"username"})),n.a.createElement(R.a.Item,{shouldUpdate:!0},(function(){return n.a.createElement(V.a,{type:"primary",htmlType:"submit",disabled:!a.isFieldsTouched(!0)||a.getFieldsError().filter((function(e){return e.errors.length})).length},"Send")}))),n.a.createElement(R.a,{form:c,name:"horizontal_login",layout:"inline",onFinish:function(e){d.a.post("".concat("https://api-servify.herokuapp.com","/api/provider/service/description"),Object(q.a)({},e)).then((function(e){return alert("Se agreg\xf3 con \xe9xito")})).catch((function(e){return alert(e.response.data)}))}},n.a.createElement(R.a.Item,{name:"category",rules:[{required:!0,message:"Por favor ingrese una categoria"}]},n.a.createElement(B.a,{prefix:n.a.createElement(z.a,{className:"site-form-item-icon"}),placeholder:"category"})),n.a.createElement(R.a.Item,{name:"username",rules:[{required:!0,message:"Por favor ingrese un username"}]},n.a.createElement(B.a,{prefix:n.a.createElement(z.a,{className:"site-form-item-icon"}),placeholder:"username"})),n.a.createElement(R.a.Item,{name:"description",rules:[{required:!0,message:"Por favor ingrese una descripcion"}]},n.a.createElement(B.a,{prefix:n.a.createElement(z.a,{className:"site-form-item-icon"}),placeholder:"description"})),n.a.createElement(R.a.Item,{shouldUpdate:!0},(function(){return n.a.createElement(V.a,{type:"primary",htmlType:"submit",disabled:!c.isFieldsTouched(!0)||c.getFieldsError().filter((function(e){return e.errors.length})).length},"Send")}))))},U=t(182),G=t(224),H=t(470),D=t(55);function M(){return localStorage.getItem("token")}var W=B.a.TextArea;function Y(e){var a=e.username,t=e.service,r=R.a.useForm(),c=Object(u.a)(r,1)[0];return n.a.createElement(R.a,{form:c,name:"horizontal_login",layout:"inline",onFinish:function(e){d.a.post("".concat("https://api-servify.herokuapp.com","/api/provider/service/description"),{username:a,description:e.description,category:t.category.categoryName},{headers:{token:"Bearer "+M()}}).then((function(e){G.a.success("se modifico la descripcion del servicio "+t.category.categoryName+" con exito")})).catch((function(e){G.a.error(e.response.data)}))}},n.a.createElement(R.a.Item,{initialValue:t.description,name:"description",rules:[{required:!0,message:"Ingrese una descripcion por favor"}]},n.a.createElement(W,{rows:3,maxLength:150,placeholder:"Ingrese una descripcion "})),n.a.createElement(R.a.Item,{shouldUpdate:!0},(function(){return n.a.createElement(V.a,{type:"primary",htmlType:"submit",disabled:!c.isFieldsTouched(!0)||c.getFieldsError().filter((function(e){return e.errors.length})).length},"Modificar")})))}function _(e){var a=e.service;return n.a.createElement("div",{name:"description"},a.description?a.description:"este proveedor por el momento no posee descripci\xf3n del servicio")}var J=[{value:"Plomeria",label:" Plomeria"},{value:"Electricidad",label:"Electricidad"},{value:"Mecanica",label:"Mecanica"},{value:"Carpinteria",label:"Carpinteria"},{value:"Gas Natural",label:"Gas Natural"}],K=[{value:"CABA",label:"CABA"},{value:"GBA SUR",label:"GBA SUR"},{value:"GBA NORTE",label:"GBA NORTE"},{value:"GBA ESTE",label:"GBA ESTE"},{value:"GBA OESTE",label:"GBA OESTE"}],Q=["CABA","GBA SUR","GBA NORTE","GBA ESTE","GBA OESTE"],X=t(468);var Z=function(e){var a=e.serviceName,t=e.username,c=e.addCalification,o=Object(r.useState)(!1),i=Object(u.a)(o,2),l=i[0],s=i[1],m=R.a.useForm(),p=Object(u.a)(m,1)[0];function f(e,a,t){return n.a.createElement(R.a.Item,{label:e,name:a,rules:t},n.a.createElement(B.a,null))}return n.a.createElement("div",{style:{display:"flex",flexdirection:"row",alignItems:"center",marginTop:"1vh"}},n.a.createElement(V.a,{type:"primary",onClick:function(){s(!0)}},"Calificar"),n.a.createElement(X.a,{title:"Califica",visible:l,onCancel:function(e){s(!1)},footer:null},n.a.createElement(R.a,{form:p,onFinish:function(e){s(!1),c(a,{providerName:t,serviceCategory:a,calificationValue:e.rating,message:e.comment,consumerName:e.consumerName,consumerEmail:e.consumerEmail}),d.a.post("".concat("https://api-servify.herokuapp.com","/api/provider/service/calification"),{providerName:t,serviceCategory:a,calificationValue:e.rating,message:e.comment,consumerName:e.consumerName,consumerEmail:e.consumerEmail}).then((function(e){return G.a.success("This is a success message")})).catch((function(e){G.a.error(e.response.data+" se recargara la pagina"),setTimeout((function(){return window.location.reload(!0)}),700)}))}},f("Nombre y Apellido","consumerName",[{required:!0,message:"Por favor completa con tu nombre completo"}]),f("Correo electr\xf3nico","consumerEmail",[{required:!0,message:"Por favor completa con tu correo electr\xf3nico"}]),n.a.createElement(R.a.Item,{name:"comment",label:"Escrib\xed tu opini\xf3n"},n.a.createElement(B.a.TextArea,null)),n.a.createElement(R.a.Item,{name:"rating",label:"Seleccion\xe1 un puntaje",rules:[{required:!0,message:"Por favor completa el puntaje"}]},n.a.createElement(j.a,null)),n.a.createElement(R.a.Item,{shouldUpdate:!0},(function(){return n.a.createElement(V.a,{type:"primary",htmlType:"submit",disabled:!p.isFieldsTouched(["consumerName"])||!p.isFieldsTouched(["consumerEmail"])||!p.isFieldsTouched(["rating"])||p.getFieldsError().filter((function(e){return e.errors.length})).length},"Enviar")})))))};var $=function(e){var a=e.serviceName,t=e.username,r=e.service,c=e.addCalification;return n.a.createElement("div",{style:{display:"flex",flexdirection:"row",alignItems:"center",marginTop:"2vh",marginBottom:"1vw"}},n.a.createElement("p",null,"Calificaci\xf3n: "),n.a.createElement(j.a,{style:{marginLeft:"1vw"},disabled:!0,defaultValue:r.calificationAverage}),n.a.createElement(Z,{serviceName:a,username:t,addCalification:c}))};var ee=function(e){var a=e.service;return n.a.createElement(n.a.Fragment,null,!!a.scopes.length&&n.a.createElement("div",{styles:{display:"flex"}},n.a.createElement("p",{style:{textAlign:"left",marginTop:"2vh",marginBottom:"1vh"}},"Zonas de alcance:"),a.scopes.map((function(e){return n.a.createElement(b.a,{key:e.scope},e.scope)}))))};var ae=function(e){var a=e.califications;return n.a.createElement("div",null,n.a.createElement("div",{style:{backgroundColor:"#F7F9FC",maxHeight:"20vh",overflowY:"scroll",marginLeft:"6.5vw",marginRight:"6.5vw"}},n.a.createElement(y.b,{bordered:!0,itemLayout:"horizontal",dataSource:a,renderItem:function(e){return n.a.createElement(y.b.Item,null,n.a.createElement(y.b.Item.Meta,{title:n.a.createElement("div",null,n.a.createElement("p",null,e.consumer.name),n.a.createElement(j.a,{allowHalf:!0,disabled:!0,defaultValue:e.calificationValue})),description:e.message}))}})))},te=t(112);var re=function(e){var a=e.name,t=e.service,c=Object(r.useState)([]),o=Object(u.a)(c,2),i=o[0],l=o[1],s=te.a.Option,m=[],p=Q.filter((function(e){return!i.includes(e)}));return Q.map((function(e){return m.push(n.a.createElement(s,{key:e},e))})),Object(r.useEffect)((function(){t.scopes&&l(t.scopes.map((function(e){return e.scope})))}),[t]),n.a.createElement("div",{styles:{display:"flex"}},n.a.createElement("p",{style:{textAlign:"left",marginTop:"2vh",marginBottom:"1vh"}},"Zonas de alcance:"),n.a.createElement(te.a,{mode:"multiple",style:{width:"55%",marginRight:"1vw"},placeholder:"Por favor seleccione una zona",value:i,onChange:function(e){l(e)}},p.map((function(e){return n.a.createElement(s,{key:e},e)}))),n.a.createElement(V.a,{type:"primary",onClick:function(){d.a.put("".concat("https://api-servify.herokuapp.com","/api/provider/service/scope"),{providerName:a,serviceCategory:t.category.categoryName,scopes:i}).then((function(){G.a.success("Se modificaron las zonas de alcance con \xe9xito")})).catch((function(e){G.a.error(e.response.data)}))}},"Guardar"))},ne=t(464);var ce=function(e){var a=e.question,t=e.consumerName,r=e.providerName,c=e.answer,o=e.actions;return n.a.createElement(ne.a,{author:n.a.createElement("p",null,t),content:n.a.createElement("p",null,a),actions:o},c&&n.a.createElement(ne.a,{author:n.a.createElement("p",null,r),content:n.a.createElement("p",null,c)}))};var oe=function(e){var a=e.providerName,t=e.serviceName,c=e.addQuestion,o=R.a.useForm(),i=Object(u.a)(o,1)[0],l=Object(r.useState)(),s=Object(u.a)(l,2)[1];Object(r.useEffect)((function(){s({})}),[]);return n.a.createElement(R.a,{form:i,name:"horizontal",layout:"inline",onFinish:function(e){d.a.post("".concat("https://api-servify.herokuapp.com","/api/provider/service/question"),Object(q.a)({providerName:a,serviceCategory:t},e)).then((function(){G.a.success("se agrego la pregunta con exito"),i.setFieldsValue({question:""})})).catch((function(e){G.a.error(e.response.data+" se recargara la pagina"),setTimeout((function(){return window.location.reload(!0)}),700)})),c(Object(q.a)(Object(q.a)({providerName:a,serviceCategory:t},e),{},{id:Date.now.toString}))}},n.a.createElement(v.a,{gutter:[24,8]},n.a.createElement(E.a,{span:12},n.a.createElement(R.a.Item,{name:"consumerName",rules:[{required:!0,message:"Por favor ingrese su nombre!"}]},n.a.createElement(B.a,{placeholder:"Ingrese su nombre"}))),n.a.createElement(E.a,{span:12},n.a.createElement(R.a.Item,{name:"consumerEmail",rules:[{required:!0,message:"Por favor ingrese su mail!"}]},n.a.createElement(B.a,{placeholder:"Ingrese su mail"}))),n.a.createElement(E.a,{span:24},n.a.createElement(R.a.Item,{name:"question",rules:[{required:!0,message:"Porfavor ingrese su pregunta"}]},n.a.createElement(B.a.TextArea,{placeholder:"Ingrese su pregunta",autoSize:{minRows:2,maxRows:4}}))),n.a.createElement(E.a,{span:8},n.a.createElement(R.a.Item,{shouldUpdate:!0},(function(){return n.a.createElement(V.a,{type:"primary",htmlType:"submit",disabled:!i.isFieldsTouched(!0)||i.getFieldsError().filter((function(e){return e.errors.length})).length||150<(i.getFieldsValue().question?i.getFieldsValue().question.length:0)},"Enviar")})))))},ie=function(e){var a=e.questionsback,t=e.serviceName,c=e.providerName,o=Object(r.useState)([]),i=Object(u.a)(o,2),l=i[0],s=i[1];return Object(r.useEffect)((function(){s((function(e){return[].concat(Object(C.a)(e),Object(C.a)(a))}))}),[a]),n.a.createElement("div",{style:{marginTop:"2vh"}},n.a.createElement("p",null,"Realiza una pregunta"),n.a.createElement("div",{style:{marginLeft:"6.5vw",marginRight:"6.5vw",marginTop:"1vh"}},n.a.createElement(oe,{serviceName:t,providerName:c,addQuestion:function(e){s((function(a){return[e].concat(Object(C.a)(a))}))}}),n.a.createElement("div",{style:{backgroundColor:"#F7F9FC",maxHeight:"20vh",overflowY:"scroll",marginTop:"1vh",padding:"3vh"}},l.map((function(e){return n.a.createElement(ce,Object.assign({},e,{key:e.id,providerName:c}))})))))};function le(e){var a=e.questionsback,t=e.providerName,c=e.serviceName,o=Object(r.useState)([]),i=Object(u.a)(o,2),l=i[0],s=i[1],m=Object(r.useState)(!1),p=Object(u.a)(m,2),f=p[0],g=p[1],v=Object(r.useState)(-1),E=Object(u.a)(v,2),b=E[0],h=E[1];Object(r.useEffect)((function(){s(a)}),[a]);var y=function(e,a){return[n.a.createElement("span",{onClick:function(){return function(e){h(e),g(!0)}(e)},key:"comment-basic-reply-to"},"Reply to")]};return n.a.createElement("div",{style:{marginTop:"2vh"}},n.a.createElement("p",null,"Lista de preguntas pregunta"),n.a.createElement(X.a,{visible:f,onCancel:function(){return g(!1)},footer:null,title:n.a.createElement("p",{style:{textAlign:"center"}},l[b]?l[b].consumerName:void 0)},n.a.createElement("p",{style:{textAlign:"center"}},l[b]?l[b].question:void 0),n.a.createElement(se,{onFinish:function(e){l[b]&&(s((function(a){var t=Object(C.a)(a);return t[b].answer=e.answer,t})),d.a.post("".concat("https://api-servify.herokuapp.com","/api/provider/service/questionAnswer"),Object(q.a)(Object(q.a)({},e),{},{providerName:t,serviceCategory:c,question:l[b].question}),{headers:{token:"Bearer "+M()}}).then((function(){G.a.success("se respondio la pregunta con exito")})).catch((function(e){G.a.error(e.response.data+" se recargara la pagina"),setTimeout((function(){return window.location.reload(!0)}),700)}))),g(!1)}})),n.a.createElement("div",{style:{marginLeft:"6.5vw",marginRight:"6.5vw",marginTop:"1vh",backgroundColor:"#F7F9FC",maxHeight:"20vh",overflowY:"scroll",padding:"3vh"}},l.map((function(e,a){return n.a.createElement(ce,Object.assign({},e,{key:e.id,providerName:t,actions:e.answer?void 0:y(a)}))}))))}var se=function(e){var a=e.onFinish,t=R.a.useForm(),c=Object(u.a)(t,1)[0],o=Object(r.useState)(),i=Object(u.a)(o,2)[1];Object(r.useEffect)((function(){i({})}),[]);return n.a.createElement(R.a,{form:c,name:"basic",initialValues:{remember:!0},onFinish:function(e){a(e),c.setFieldsValue({answer:void 0})}},n.a.createElement(R.a.Item,{label:"Respuesta",name:"answer",rules:[{required:!0,message:"Ingrese su respuesta!"}]},n.a.createElement(B.a.TextArea,{autoSize:{minRows:2,maxRows:4}})),n.a.createElement(R.a.Item,{shouldUpdate:!0},(function(){return n.a.createElement(V.a,{type:"primary",htmlType:"submit",disabled:!c.isFieldsTouched(!0)||c.getFieldsError().filter((function(e){return e.errors.length})).length},"Responder")})))},me=t(80),ue=t.n(me),pe=t(153),de=t(477),fe=t(478),ge=t(466);function ve(e){return new Promise((function(a,t){var r=new FileReader;r.readAsDataURL(e),r.onload=function(){return a(r.result)},r.onerror=function(e){return t(e)}}))}function Ee(e){var a=e.images,t=e.providerName,c=e.serviceName,o=e.viewMode,i=Object(r.useState)([]),l=Object(u.a)(i,2),s=l[0],m=l[1],p=Object(r.useState)(!1),f=Object(u.a)(p,2),g=f[0],v=f[1],E=Object(r.useState)(""),b=Object(u.a)(E,2),h=b[0],y=b[1],j=Object(r.useState)(""),N=Object(u.a)(j,2),O=N[0],w=N[1],S=Object(r.useState)(0),x=Object(u.a)(S,2);x[0],x[1];Object(r.useEffect)((function(){m((function(e){return[].concat(Object(C.a)(e),Object(C.a)(a.map((function(e){return{uid:e.id,name:e.name,status:"done",type:e.type,preview:"data:".concat(e.type,";base64,")+e.bytes,thumbUrl:"data:".concat(e.type,";base64,")+e.bytes}}))))}))}),[a,t,c]);var I=n.a.createElement("div",null,n.a.createElement(de.a,null),n.a.createElement("div",{className:"ant-upload-text"},"Upload")),k=function(){var e=Object(pe.a)(ue.a.mark((function e(a){return ue.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.url||a.preview){e.next=4;break}return e.next=3,ve(a.originFileObj);case 3:a.preview=e.sent;case 4:v(!0),w(a.url||a.preview),y(a.name||a.url.substring(a.url.lastIndexOf("/")+1));case 7:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),F=function(){var e=Object(pe.a)(ue.a.mark((function e(a){var r,n,o,i;return ue.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a.onSuccess,n=a.onError,o=a.file,(i=new FormData).append("imageFile",o),i.append("name",o.name),i.append("type",o.type),i.append("providerName",t),i.append("serviceName",c),e.next=9,d.a.post("".concat("https://api-servify.herokuapp.com","/api/provider/service/img"),i,{headers:{accept:"application/json","Accept-Language":"en-US,en;q=0.8","Content-Type":"multipart/form-data; boundary=".concat(i._boundary),token:"Bearer "+M()}}).then((function(e){r("Ok"),G.a.success(e.data)})).catch((function(e){console.log("Eroor: ",e),G.a.error(e.response.data),n(Object(q.a)({},e))}));case 9:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return n.a.createElement("div",{style:{marginTop:"2vh"}},n.a.createElement("p",null,"Imagenes del servicio"),n.a.createElement("div",{className:"clearfix",style:{marginLeft:"6.5vw",marginRight:"6.5vw",marginTop:"1vh",backgroundColor:"#F7F9FC",maxHeight:"30vh",overflowY:"scroll",padding:"3vh"}},n.a.createElement(ge.a,{listType:"picture-card",fileList:s,onPreview:k,customRequest:o?null:F,onChange:o?null:function(e){e.file;var a=e.fileList;e.event;m(a)},onRemove:o?null:function(e){d.a.delete("".concat("https://api-servify.herokuapp.com","/api/provider/service/img"),{data:{providerName:t,serviceName:c,nameImg:e.name,type:e.type},headers:{accept:"application/json",token:"Bearer "+M()}}).then((function(e){G.a.success(e.data)})).catch((function(a){G.a.error(a.response.data),m((function(a){return[].concat(Object(C.a)(a),[e])}))})),m((function(a){return a.filter((function(a){return a.uid===e.uid}))}))},accept:".png, .jpg"},s.length>=8?null:I),n.a.createElement(X.a,{visible:g,title:h,footer:null,onCancel:function(){v(!1),y(""),w("")}},n.a.createElement("img",{alt:"example",style:{width:"100%"},src:O}))))}function be(e){var a=e.images,t=e.providerName,c=e.serviceName,o=(e.viewMode,Object(r.useState)([])),i=Object(u.a)(o,2),l=i[0],s=i[1],m=Object(r.useState)(!1),p=Object(u.a)(m,2),d=p[0],f=p[1],g=Object(r.useState)(""),v=Object(u.a)(g,2),E=v[0],b=v[1],h=Object(r.useState)(""),y=Object(u.a)(h,2),j=y[0],N=y[1],O=Object(r.useState)(0),w=Object(u.a)(O,2);w[0],w[1];Object(r.useEffect)((function(){s((function(e){return[].concat(Object(C.a)(e),Object(C.a)(a.map((function(e){return{uid:e.id,name:e.name,status:"done",type:e.type,preview:"data:".concat(e.type,";base64,")+e.bytes,thumbUrl:"data:".concat(e.type,";base64,")+e.bytes}}))))}))}),[a,t,c]);var S=function(){var e=Object(pe.a)(ue.a.mark((function e(a){return ue.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.url||a.preview){e.next=4;break}return e.next=3,ve(a.originFileObj);case 3:a.preview=e.sent;case 4:f(!0),N(a.url||a.preview),b(a.name||a.url.substring(a.url.lastIndexOf("/")+1));case 7:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return n.a.createElement(n.a.Fragment,null,l.length&&n.a.createElement("div",{style:{marginTop:"2vh"}},n.a.createElement("p",null,"Imagenes del servicio"),n.a.createElement("div",{style:{marginLeft:"6.5vw",display:"flex",marginRight:"6.5vw",marginTop:"1vh",backgroundColor:"#F7F9FC",maxHeight:"30vh",overflowY:"scroll",padding:"3vh"}},l.map((function(e){return n.a.createElement("div",{className:"shadowhoverImage"},n.a.createElement("img",{src:e.url||e.preview,alt:"",height:120}),n.a.createElement("div",{className:"shadow"}),n.a.createElement("span",{className:"ico",onClick:function(){return S(e)}},n.a.createElement(fe.a,null)))})),n.a.createElement(X.a,{visible:d,title:E,footer:null,onCancel:function(){f(!1),b(""),N("")}},n.a.createElement("img",{alt:"example",style:{width:"100%"},src:j})))))}var he=f.a.Title,ye=U.a.TabPane;function je(e){var a=e.username,t=e.providerSevices,c=e.setproviderSevices,o=e.err,i=Object(r.useState)([]),s=Object(u.a)(i,2),m=s[0],p=s[1],f=Object(r.useState)(),g=Object(u.a)(f,2),v=g[0],E=g[1];Object(r.useEffect)((function(){E(t[0]?t[0].categoryName:null)}),[t]);var b=function(){if(m[0]&&t.filter((function(e){return e.category.categoryName===m[0]})).length)return alert("ya brindas ese servicio");m[0]&&(c((function(e){return[].concat(Object(C.a)(e),[{category:{categoryName:m[0]},questions:[]}])})),E(m),d.a.post("".concat("https://api-servify.herokuapp.com","/api/provider/service"),{username:a,category:m[0]},{headers:{token:"Bearer "+M()}}).then((function(){G.a.success("se agrego el servicio "+m[0]+" con exito")})).catch((function(e){G.a.error(e.response.data+" se recargara la pagina"),setTimeout((function(){return window.location.reload(!0)}),700)})))},h=n.a.createElement("div",{style:{display:"flex"}},n.a.createElement(H.a,{options:J,onChange:function(e){return p(e)},style:{width:140},placeholder:"Seleccione Una categoria"}),n.a.createElement(D.a,{title:m[0]?"agrega la categoria":"Seleccione una categoria primero"},n.a.createElement(V.a,{type:"primary",onClick:b,disabled:!m[0]},"add")));return n.a.createElement(n.a.Fragment,null,o&&n.a.createElement(l.a,{to:{pathname:"/Servify/error",state:{message:o}}})||n.a.createElement("div",{className:"catOfferSize"},n.a.createElement(he,{style:{textAlign:"center"},level:4},"Categorias ofrecidas"),n.a.createElement("div",{className:"card-container"},n.a.createElement(U.a,{tabBarExtraContent:h,type:"editable-card",style:{minHeight:"70vh"},onChange:function(e){return E(e)},activeKey:v,onEdit:function(e,r){return"add"===r?b():function(e){c((function(a){return Object(C.a)(a).filter((function(a){return a.category.categoryName!==e}))})),E(t[0].category?t[0].category.categoryName:null),d.a.delete("".concat("https://api-servify.herokuapp.com","/api/provider/service"),{data:{username:a,category:e},headers:{token:"Bearer "+M()}}).then((function(){G.a.success("se borro el servicio "+e+" con exito")})).catch((function(e){G.a.error(e.response.data+" se recargara la pagina"),setTimeout((function(){return window.location.reload(!0)}),700)}))}(e)},hideAdd:!0},t.map((function(e){return n.a.createElement(ye,{tab:e.category.categoryName,key:e.category.categoryName,closable:!0},n.a.createElement(Y,{username:a,service:e}),n.a.createElement(re,{name:a,service:e}),n.a.createElement(le,{questionsback:e.questions,providerName:a,serviceName:e.category.categoryName}),n.a.createElement(Ee,{images:e.images?e.images:[],providerName:a,serviceName:e.category.categoryName}))}))))))}function Ne(e){var a=e.username,t=e.providerSevices,c=e.category,o=e.err,i=e.addCalification,s=Object(r.useState)(),m=Object(u.a)(s,2),p=m[0],d=m[1];return Object(r.useEffect)((function(){d(c||(t[0]?t[0].categoryName:null))}),[t,c]),n.a.createElement(n.a.Fragment,null,o&&n.a.createElement(l.a,{to:{pathname:"/Servify/Error",state:{message:o}}})||n.a.createElement("div",{style:{width:"70vw"}},n.a.createElement(he,{style:{textAlign:"center"},level:4},"Categorias ofrecidas"),n.a.createElement("div",{className:"card-container"},n.a.createElement(U.a,{type:"editable-card",activeKey:p,onChange:function(e){return d(e)},hideAdd:!0},t.map((function(e){return n.a.createElement(ye,{tab:e.category.categoryName,key:e.category.categoryName,closable:!1},n.a.createElement("div",null,n.a.createElement(_,{username:a,service:e}),n.a.createElement($,{service:e,serviceName:e.category.categoryName,username:a,addCalification:i}),n.a.createElement(ae,{califications:e.califications}),n.a.createElement(be,{viewMode:!0,images:e.images?e.images:[],providerName:a,serviceName:e.category.categoryName}),n.a.createElement(ee,{service:e}),n.a.createElement(ie,{questionsback:e.questions,serviceName:e.category.categoryName,providerName:a})))}))))))}var Oe=t(471),we=f.a.Title;function Se(e){var a=e.personalInfo,t=n.a.createRef(),c={wrapperCol:{offset:8,span:16}};function o(e,a,t,r){return n.a.createElement(R.a.Item,{label:e,name:a,rules:t},n.a.createElement(B.a,{type:r}))}return Object(r.useEffect)((function(){t.current.setFieldsValue({username:a.providerName,phoneNmbr:a.phoneNumber,celPhoneNmbr:a.cellNumber,webPage:a.webPage,residence:a.residence})}),[t,a]),n.a.createElement("div",null,n.a.createElement(we,{style:{textAlign:"center"},level:4},"Informacion Personal"),n.a.createElement(R.a,Object.assign({className:"formEditableInfo",ref:t},{labelCol:{span:12},wrapperCol:{span:16}},{name:"basic",initialValues:{remember:!0},onFinish:function(e){d.a.put("".concat("https://api-servify.herokuapp.com","/api/provider"),{originalName:a.providerName,newName:e.username,newPhoneNmbr:e.phoneNmbr,newCellPhoneNmbr:e.celPhoneNmbr,newWebPage:e.webPage,newResidence:e.residence},{headers:{token:"Bearer "+M()}}).then((function(){G.a.success("Se modifico al informacion personal con exito")})).catch((function(e){G.a.error(e)}))}}),o("Nombre","username",[{required:!0,message:"Please input your username!"}]),o("Telefono","phoneNmbr",[{required:!0,message:"Please input your phone number"}],"number"),o("Celular","celPhoneNmbr",[{required:!0,message:"Please input your celphone number"}],"number"),o("Pagina Web","webPage",[{required:!0,message:"Please input your web page!"}]),o("Localidad","residence",[{required:!0,message:"Please input your residence!"}]),n.a.createElement(R.a.Item,c,n.a.createElement(V.a,{type:"primary",htmlType:"submit"},"Guardar Cambios"))))}function xe(e){var a=e.personalInfo;return n.a.createElement("div",{style:{width:"70vw"}},n.a.createElement(Oe.a,{title:n.a.createElement(we,{style:{textAlign:"center"},level:4},"Informacion Personal")},n.a.createElement(Oe.a.Item,{label:"Nombre"}," ",a.providerName," "),n.a.createElement(Oe.a.Item,{label:"N\xfamero de celular"}," ",a.cellNumber?a.cellNumber:"Este usuario no cuenta con n\xfamero de celular"," "),n.a.createElement(Oe.a.Item,{label:"N\xfamero de telefono"}," ",a.phoneNumber?a.phoneNumber:"Este usuario no cuenta con n\xfamero de tel\xe9fono"),n.a.createElement(Oe.a.Item,{label:"Sitio Web"},a.webPage?a.webPage:"Este usuario no cuenta con sitio web"),n.a.createElement(Oe.a.Item,{label:"Residencia"}," ",a.residence?a.residence:"Este usuario no cuenta con una localidad")))}function Ie(){return n.a.createElement(ke,{ComponentViewService:je,ComponentViewProfileInfo:Se})}function Ce(){return n.a.createElement(ke,{ComponentViewService:Ne,ComponentViewProfileInfo:xe})}var ke=function(e){var a=e.ComponentViewService,t=e.ComponentViewProfileInfo,c=function(){var e=Object(l.h)(),a=e.username,t=e.category,n=Object(r.useState)([]),c=Object(u.a)(n,2),o=c[0],i=c[1],s=Object(r.useState)(),m=Object(u.a)(s,2),p=m[0],f=m[1],g=Object(r.useState)({}),v=Object(u.a)(g,2),E=v[0],b=v[1];return Object(r.useEffect)((function(){d.a.get("".concat("https://api-servify.herokuapp.com","/api/provider/").concat(a)).then((function(e){i(e.data.offerServices),b({providerName:e.data.name,phoneNumber:e.data.phoneNmbr,cellNumber:e.data.celNmbr,webPage:e.data.webPage,residence:e.data.residence})})).catch((function(e){return f(e.response.data)}))}),[a]),{username:a,providerSevices:o,setproviderSevices:i,personalInfo:E,setPersonalInfo:b,category:t,err:p,addCalification:function(e,a){var t=Object(C.a)(o).filter((function(a){return a.category.categoryName===e}));t.length&&(t[0].califications.push({calificationValue:a.calificationValue,message:a.message,consumer:{email:a.consumerEmail,name:a.consumerName}}),i(t))}}}();return n.a.createElement("div",{style:{display:"flex",minHeight:"70vh",flexDirection:"column",alignItems:"center",justifyContent:"center"}},n.a.createElement(t,c),n.a.createElement("div",{style:{marginTop:"7vh"}}),n.a.createElement(a,c))},Fe=t(244),Te=t.n(Fe);var Pe=function(e){return n.a.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}},!e.location.state&&n.a.createElement(l.a,{to:"/Servify/"})||n.a.createElement(n.a.Fragment,null,n.a.createElement("h2",null,"Lo sentimos ocurrio un error:"),n.a.createElement("h3",null,e.location.state.message),n.a.createElement("img",{style:{width:"45vw"},src:Te.a,alt:"error 404"})))},Ae=t(474),qe=t(479),Re=function(e){var a=e.closeSession,t=e.userName,r=Object(l.g)();return n.a.createElement("div",{style:{display:"flex"}},n.a.createElement(s.b,{to:"/Servify/Profile/".concat(t),exact:!0,activeStyle:{borderBottom:"4px solid #1890ff",borderRadius:"2px"},style:{minWidth:"6vw",textAlign:"center"}},n.a.createElement("h4",null,"Ver Perfil")),n.a.createElement(V.a,{onClick:function(){a(),r.push("/Servify/")},danger:!0,type:"text",style:{marginLeft:"1vw",marginTop:"8px"}},"Cerrar Sesi\xf3n"))},Be=function(e){var a=e.openSession,t=Object(l.g)(),c=R.a.useForm(),o=Object(u.a)(c,1)[0],i=Object(r.useState)(),s=Object(u.a)(i,2)[1];Object(r.useEffect)((function(){s({})}),[]);return n.a.createElement(R.a,{form:o,name:"normal_login",className:"login-form",onFinish:function(e){d.a.post("".concat("https://api-servify.herokuapp.com","/api/provider/login"),Object(q.a)({},e)).then((function(r){a(r.data.token,e.username),t.push("/Servify/Profile/".concat(e.username))})).catch((function(e){return G.a.error(e.response.data)}))}},n.a.createElement(R.a.Item,{name:"username",rules:[{required:!0,message:"Ingrese su usuario por favor!"}]},n.a.createElement(B.a,{prefix:n.a.createElement(z.a,{className:"site-form-item-icon"}),placeholder:"Usuario"})),n.a.createElement(R.a.Item,{name:"password",rules:[{required:!0,message:"Ingrese su contrase\xf1a por favor!"}]},n.a.createElement(B.a,{prefix:n.a.createElement(qe.a,{className:"site-form-item-icon"}),type:"password",placeholder:"Contrase\xf1a"})),n.a.createElement(R.a.Item,{shouldUpdate:!0},(function(){return n.a.createElement(D.a,{title:!o.isFieldsTouched(!0)||o.getFieldsError().filter((function(e){return e.errors.length})).length?"Ingrese primero usuario y contrase\xf1a para ingresar ":"Ingresa"},n.a.createElement(V.a,{type:"primary",htmlType:"submit",disabled:!o.isFieldsTouched(!0)||o.getFieldsError().filter((function(e){return e.errors.length})).length},"Log in"))})))},Ve=function(e){var a=e.openSession;return n.a.createElement(Ae.a,{placement:"topLeft",content:n.a.createElement(Be,{openSession:a}),trigger:"click"},n.a.createElement("p",{style:{marginRight:"1vw",marginLeft:"1vw",cursor:"pointer"}}," Ingres\xe1"))};var ze=function(e){var a=e.islog,t=e.closeSession,r=e.openSession,c=e.userName;return a?n.a.createElement(Re,{closeSession:t,userName:c}):n.a.createElement(Ve,{openSession:r})},Le=t(480),Ue=t(245),Ge=t.n(Ue);var He=function(){var e=Object(l.g)(),a=Object(r.useState)(),t=Object(u.a)(a,2),c=t[0],o=t[1],i=Object(r.useState)(),s=Object(u.a)(i,2),m=s[0],p=s[1];return n.a.createElement("div",{key:"space0",style:{border:"2px solid rgba(28,110,164,0.12)",borderRadius:"12px",padding:"10px",marginTop:"-10px",height:"65px",position:"relative"}},n.a.createElement("span",{style:{position:"absolute",zIndex:"1",top:-12,left:10,height:30,fontWeight:"500"}},"busca un servicio"),n.a.createElement(H.a,{options:J,className:"cascaderMobile",onChange:function(e){o(e[0])},placeholder:"Selecciona una categoria"}),n.a.createElement(H.a,{options:K,className:"cascaderMobile",onChange:function(e){p(e[0])},placeholder:"Selecciona una zona"}),n.a.createElement(D.a,{title:c?"Buscar":"Seleccione una categoria primero para buscar"},n.a.createElement(V.a,{type:"primary",shape:"round",icon:n.a.createElement(Le.a,null),onClick:function(){e.push(m?"/Servify/search/".concat(c,"/").concat(m):"/Servify/search/".concat(c))},disabled:!c})))},De=function(e){var a=e.islog,t=e.closeSession,r=e.openSession,c=e.userName;return n.a.createElement(k.a,{mode:"horizontal",style:{backgroundColor:"#f1f6f5",boxShadow:"0 4px 6px -6px #222",height:"85px",marginLeft:"2vw",marginRight:"2vw",paddingTop:"15px",width:"96vw",display:"flex",justifyContent:"space-around"}},n.a.createElement(k.a.Item,null,n.a.createElement(s.b,{to:"/Servify/",exact:!0,activeStyle:{borderBottom:"4px solid #1890ff",borderRadius:"2px"}},n.a.createElement("div",{style:{display:"flex"}}," ",n.a.createElement("img",{src:Ge.a,style:{width:"25px",height:"30px"},alt:"logo de la pagina"}),n.a.createElement("h3",{style:{color:"#045454",fontWeight:"bold"}}," ervify ")))),n.a.createElement(He,null),n.a.createElement(ze,{closeSession:t,openSession:r,islog:a,userName:c}))},Me=m.a.Content,We=m.a.Footer;function Ye(e){var a=e.children,t=e.islog,r=Object(i.a)(e,["children","islog"]);return n.a.createElement(l.b,Object.assign({},r,{render:function(e){var r=e.location;return t?a:n.a.createElement(l.a,{to:{pathname:"/Servify/",state:{from:r}}})}}))}var _e=function(){var e=function(){var e=Object(r.useState)(!1),a=Object(u.a)(e,2),t=a[0],n=a[1],c=Object(r.useState)(""),o=Object(u.a)(c,2),i=o[0],l=o[1];return Object(r.useEffect)((function(){var e=localStorage.getItem("token"),a=localStorage.getItem("userName");e&&a&&d.a.post("".concat("https://api-servify.herokuapp.com","/api/tokenVerify"),{username:localStorage.getItem("userName")},{headers:{token:"Bearer "+localStorage.getItem("token")}}).then((function(e){n(!0),l(localStorage.getItem("userName"))})).catch((function(e){return function(){}}))}),[]),{islog:t,closeSession:function(){localStorage.removeItem("userName"),localStorage.removeItem("token"),l(""),n(!1)},openSession:function(e,a){localStorage.removeItem("userName"),localStorage.removeItem("token"),localStorage.setItem("userName",a),localStorage.setItem("token",e),l(a),n(!0)},userName:i}}(),a=e.islog,t=e.closeSession,c=e.openSession,o=e.userName;return n.a.createElement(m.a,{style:{minHeight:"100vh"}},n.a.createElement(s.a,null,n.a.createElement(De,{closeSession:t,openSession:c,islog:a,userName:o}),n.a.createElement(m.a,{style:{marginTop:"2vh",minHeight:"70vh",display:"flex",alignItems:"center",justifyContent:"center"}},n.a.createElement(Me,null,n.a.createElement(l.d,null,n.a.createElement(l.b,{exact:!0,path:"/Servify/search/:category/:zone?",component:A}),n.a.createElement(l.b,{exact:!0,path:"/Servify/testadd"},n.a.createElement(L,null)),n.a.createElement(Ye,{exact:!0,path:"/Servify/profile/:username",children:n.a.createElement(Ie,null),islog:a}),n.a.createElement(l.b,{path:"/Servify/view/:username/:category?",component:Ce}),n.a.createElement(l.b,{path:"/Servify/error",component:Pe}),n.a.createElement(l.b,{exact:!0,path:"/Servify/"},n.a.createElement(I,null)),n.a.createElement(l.a,{to:{pathname:"/Servify/"}}))))),n.a.createElement(We,{style:{backgroundColor:"#1f1f1f",color:"#e6fffb",textAlign:"center",height:"10vh"}},n.a.createElement("p",{style:{color:"#e6fffb"}},"\xa9 Copyright 2020 ")))};t(462);o.a.render(n.a.createElement(_e,null),document.getElementById("root"))}},[[252,1,2]]]);
//# sourceMappingURL=main.a81f68af.chunk.js.map