(this["webpackJsonpecommerce-store-client"]=this["webpackJsonpecommerce-store-client"]||[]).push([[0],{444:function(e,t,a){e.exports=a.p+"static/media/NotoSans-Regular.5a87cce8.ttf"},445:function(e,t,a){e.exports=a.p+"static/media/NotoSans-Bold.98f0cacc.ttf"},462:function(e,t,a){e.exports=a.p+"static/media/header-bg.08aaf026.png"},488:function(e,t,a){e.exports=a(667)},656:function(e,t,a){},657:function(e,t,a){e.exports=a.p+"static/media/temsandconditions.4f16f917.md"},667:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(24),o=a.n(i),c=a(216),l=a(18),u=a(701),s=a(707),m=a(121),d=a.n(m),p=a(131),f=a(135),g=a(471),h=a(435),E=a(436),b=a(469),v=a(443),y=a(470),O=a(28),j=a(132),x=a(71),S=function(e){var t=e.errorCode,a=e.errorMessage;return r.a.createElement(j.a,{elevation:3},r.a.createElement(x.a,{variant:"caption",color:"primary"},t),r.a.createElement(x.a,{variant:"body1"},a))},C=a(163),w=a(444),k=a.n(w),N=a(445),T=a.n(N),P={fontFamily:"Noto Sans",fontStyle:"normal",fontDisplay:"swap",fontWeight:100,src:"\n    local('Noto Sans'),\n    local('NotoSans-Regular'),\n    url(".concat(k.a,") format('ttf')\n  ")},_={fontFamily:"Noto Sans Bold",fontStyle:"normal",fontDisplay:"swap",fontWeight:"normal",src:"\n    local('Noto Sans'),\n    local('NotoSans-Bold'),\n    url(".concat(T.a,") format('ttf')\n  ")},q={fontFamily:['"Noto Sans"','"Roboto"','"Helvetica"'].join(","),overrides:{MuiCssBaseline:{"@global":{"@font-face":[P,_]}}}},R=Object(C.a)({palette:{primary:{main:"#f99028"},secondary:{main:"#2490ff"}},typography:q,themeName:"Sea Buckthorn Dodger Blue Goats"}),$=function(e,t){switch(t.type){case"SET_PRODUCTS":return t.products;default:return e}},B=r.a.createContext(),I=function(e){var t=e.children,a=r.a.useReducer($,{products:[]}),n=Object(l.a)(a,2),i=n[0],o=n[1];return r.a.createElement(B.Provider,{value:{state:i,dispatch:o}},t)},D=a(124),A=function(){return d.a.get("signedin")},F={total:0,products:[]},L=function(){return JSON.parse(localStorage.getItem("cart"))},U=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return localStorage.setItem("cart",JSON.stringify(e?F:{total:t,products:a}))},z=function(e){var t,a=L(),n=!1;return a.products.map((function(a){return a._id.toString()===e._id.toString()&&(a.quantity+=1,n=!0,t=a,!0)})),n||(e.quantity=1,a.products.push(e),t=e),a.total+=1,U(!1,a.total,a.products),t},M=function(e){var t=L(),a=0,n=t.products.filter((function(t){return t._id!==e||(a=t.quantity,!1)}));return t.total-=a,t.products=n,U(!1,t.total,t.products),t},W=function(e,t){var a,n=L();return n.products.map((function(n){return n._id.toString()===e.toString()&&(a=n.quantity,n.quantity=t,!0)})),n.total+=t-a,U(!1,n.total,n.products),n},Q=function(e,t){switch(t.type){case"SET_USER":return{user:Object(D.a)({guest:!1},t.user)};case"SET_GUEST":case"REMOVE_USER":return{user:{guest:!0,cart:L()}};case"UPDATE_CART":return{user:Object(D.a)(Object(D.a)({},e.user),{},{cart:t.cart.cartChanged})};case"ADD_PRODUCT_TO_CART":var a=!1;return e.user.cart.products.map((function(e){return e._id===t.product._id&&(e.quantity+=1,a=!0),!0})),e.user.cart.total+=1,a||e.user.cart.products.push(t.product),{user:Object(D.a)(Object(D.a)({},e.user),{},{cart:Object(D.a)({},e.user.cart)})};case"EMPTY_CART":return{user:Object(D.a)(Object(D.a)({},e.user),{},{cart:{total:0,products:[]}})};default:return e}},H=r.a.createContext(),Y={user:{guest:!0,cart:{total:0,products:[]}}},G=function(e){var t=e.children,a=r.a.useReducer(Q,Y),n=Object(l.a)(a,2),i=n[0],o=n[1];return r.a.createElement(H.Provider,{value:{state:i,dispatch:o}},t)},J=a(25),K=a.n(J),V=a(46),X=(a(334),a(305)),Z=a(80),ee=a(256),te=a(151),ae=a(704),ne=a(705),re=a(706),ie=a(356),oe=a.n(ie),ce=a(294),le=a.n(ce),ue=a(453),se=a.n(ue),me=function(e){var t=e.productsData,a=e.removeItem,n=e.changeQuantity;return r.a.createElement(oe.a,{options:{showFirstLastPageButtons:!1,search:!1,sorting:!1,draggable:!1,emptyRowsWhenPaging:!1,padding:"dense",pageSizeOptions:[],pageSize:10,headerStyle:{fontWeight:"800"},actionsCellStyle:{padding:"0 16px"}},title:"Cart Summary",columns:[{title:"Product",field:"title"},{title:"Price",field:"price"},{title:"Quantity",field:"quantity",render:function(e){return r.a.createElement(se.a,{min:1,max:50,value:e.quantity,onChange:function(t){return n(e._id,t)}})}}],data:t,components:{Pagination:function(e){var t=e.count;return t%e.rowsPerPage===t?null:r.a.createElement(ie.MTablePagination,e)}},actions:[{icon:function(){return r.a.createElement(le.a,{color:"secondary"})},tooltip:"Remove Item",onClick:function(e,t){a(t._id)}}]})},de=a(51),pe=a(42),fe=a.n(pe);function ge(){var e=Object(de.a)(["\n  mutation updateProductRating($id: Int!, $rating: Int!) {\n    updateProductRating(id: $id, rating: $rating) {\n      _id\n      rating\n      voters\n    }\n  }\n"]);return ge=function(){return e},e}function he(){var e=Object(de.a)(["\n  query getProduct($id: Int) {\n    product(id: $id) {\n      _id\n      title\n      thumbnail\n      price\n      rating\n      voters\n    }\n  }\n"]);return he=function(){return e},e}function Ee(){var e=Object(de.a)(["\n  query getProducts($limit: Int, $category: String) {\n    products(limit: $limit, category: $category) {\n      _id\n      title\n      category\n      thumbnail\n      price\n      rating\n      voters\n    }\n  }\n"]);return Ee=function(){return e},e}function be(){var e=Object(de.a)(["\n  query getLimit {\n    limit @client\n  }\n"]);return be=function(){return e},e}function ve(){var e=Object(de.a)(["\n  subscription cartChanged {\n    cartChanged {\n      total\n      products {\n        _id\n        title\n        price\n        quantity\n      }\n    }\n  }\n"]);return ve=function(){return e},e}function ye(){var e=Object(de.a)(["\n  mutation emptyCart {\n    emptyCart\n  }\n"]);return ye=function(){return e},e}function Oe(){var e=Object(de.a)(["\n  mutation changeQuantity($productId: String!, $quantity: Int!) {\n    changeQuantity(productId: $productId, quantity: $quantity) {\n      total\n      products {\n        _id\n        title\n        price\n        quantity\n      }\n    }\n  }\n"]);return Oe=function(){return e},e}function je(){var e=Object(de.a)(["\n  mutation removeFromCart($productId: String!) {\n    removeFromCart(productId: $productId) {\n      total\n      products {\n        _id\n        title\n        price\n        quantity\n      }\n    }\n  }\n"]);return je=function(){return e},e}function xe(){var e=Object(de.a)(["\n  mutation addToCart($productId: String!) {\n    addToCart(productId: $productId) {\n      _id\n      title\n      price\n      quantity\n    }\n  }\n"]);return xe=function(){return e},e}function Se(){var e=Object(de.a)(["\n  mutation logoutUser {\n    logoutUser\n  }\n"]);return Se=function(){return e},e}function Ce(){var e=Object(de.a)(["\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      success\n    }\n  }\n"]);return Ce=function(){return e},e}function we(){var e=Object(de.a)(["\n  query getUser {\n    getUser {\n      _id\n      firstName\n      lastName\n      cart {\n        total\n        products {\n          _id\n          title\n          price\n          quantity\n        }\n      }\n    }\n  }\n"]);return we=function(){return e},e}function ke(){var e=Object(de.a)(["\n  mutation user(\n    $firstName: String!\n    $lastName: String!\n    $birthDate: Date!\n    $email: String!\n    $password: String!\n  ) {\n    user(\n      firstName: $firstName\n      lastName: $lastName\n      birthDate: $birthDate\n      email: $email\n      password: $password\n    ) {\n      _id\n      email\n    }\n  }\n"]);return ke=function(){return e},e}function Ne(){var e=Object(de.a)(["\n  query cart {\n    cart {\n      total\n      products {\n        _id\n        title\n        price\n        quantity\n      }\n    }\n  }\n"]);return Ne=function(){return e},e}function Te(){var e=Object(de.a)(["\n  mutation category($title: String!) {\n    category(title: $title) {\n      title\n    }\n  }\n"]);return Te=function(){return e},e}function Pe(){var e=Object(de.a)(["\n  query category($id: String!) {\n    category(id: $id) {\n      title\n    }\n  }\n"]);return Pe=function(){return e},e}function _e(){var e=Object(de.a)(["\n  query categories {\n    categories {\n      _id\n      title\n    }\n  }\n"]);return _e=function(){return e},e}var qe=fe()(_e()),Re=(fe()(Pe()),fe()(Te()),fe()(Ne())),$e=(fe()(ke()),fe()(we())),Be=fe()(Ce()),Ie=fe()(Se()),De=fe()(xe()),Ae=fe()(je()),Fe=fe()(Oe()),Le=fe()(ye()),Ue=fe()(ve()),ze=fe()(be()),Me=fe()(Ee()),We=(fe()(he()),fe()(ge())),Qe=Object(Z.a)({card:{margin:"8px 0"}}),He=Object(ee.a)("div")({margin:"0 48px"}),Ye=function(e){var t=e.history,a=Qe(),n=r.a.useState(0),i=Object(l.a)(n,2),o=i[0],c=i[1],u=r.a.useContext(H),s=u.state,m=u.dispatch;r.a.useEffect((function(){return c(function(){var e=0;return s.user.cart.products.map((function(t){return e+=t.price*t.quantity,!0})),Math.round(100*e)/100}())}),[s.user.cart.total]);var d=Object(X.a)(Ae),p=Object(l.a)(d,1)[0],f=function(){var e=Object(V.a)(K.a.mark((function e(t){var a;return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s.user.guest){e.next=5;break}return e.next=3,p({variables:{productId:t}});case 3:e.next=7;break;case 5:a=M(t),m({type:"UPDATE_CART",cart:{cartChanged:a}});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),g=Object(X.a)(Fe),h=Object(l.a)(g,1)[0],E=function(){var e=Object(V.a)(K.a.mark((function e(t,a){var n;return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s.user.guest){e.next=5;break}return e.next=3,h({variables:{productId:t,quantity:a}});case 3:e.next=7;break;case 5:n=W(t,a),m({type:"UPDATE_CART",cart:{cartChanged:n}});case 7:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(He,null,r.a.createElement(me,{productsData:s.user.cart.products,removeItem:f,changeQuantity:E}),r.a.createElement(ae.a,{className:a.card},r.a.createElement(re.a,null,"Total For Payment: ",o,"$"),r.a.createElement(ne.a,null,r.a.createElement(te.a,{onClick:function(){t.push("/checkout")}},"Continue to checkout")))))},Ge=a(699),Je=a(306),Ke=a(343),Ve=a(709),Xe=Object(Z.a)((function(e){return{root:{padding:"0 1% 0 2%",color:e.palette.grey[400],fontSize:"1.5rem","-o-transition":".5s","-ms-transition":".5s","-moz-transition":".5s","-webkit-transition":".5s",transition:".5s","&:first-child":{paddingLeft:0},"&:hover":{color:e.palette.primary.main}}}})),Ze=function(e){var t=e.history,a=Xe();return r.a.createElement(r.a.Fragment,null,t,r.a.createElement(Ke.a,null,r.a.createElement(Je.b,{query:qe},(function(e){var t=e.loading,n=e.error,i=e.data;return t||n?t?"Loading...":n:i.categories.map((function(e){return r.a.createElement(Ve.a,{className:a.root,variant:"body1",href:"/category/".concat(e._id),key:e._id},e.title)}))}))))},et=a(715),tt=a(476),at=a(455),nt=a.n(at),rt=a(454),it=a.n(rt),ot=Object(Z.a)({root:{maxWidth:"350px"},ratingIconButton:{padding:"4px"},media:{width:"350px"},content:{paddingBottom:"0",whiteSpace:"no-wrap"},actions:{display:"flex",justifyContent:"space-between"}}),ct=function(e){var t=e.data,a=r.a.useContext(H),n=a.state,i=a.dispatch,o=r.a.useState(!0),c=Object(l.a)(o,2),u=c[0],s=c[1],m=r.a.useState(Math.round(t.voters/t.rating)),d=Object(l.a)(m,2),p=d[0],f=d[1],g=r.a.useState(!1),h=Object(l.a)(g,2),E=h[0],b=h[1],v=(Boolean(A()),ot());return r.a.createElement(ae.a,{className:v.root},u&&r.a.createElement(et.a,{animation:"wave",variant:"rect",className:v.media,style:{height:"350px"}}),r.a.createElement("img",{onLoad:function(){return s(!1)},src:t.thumbnail,className:v.media,alt:t.title}),r.a.createElement(re.a,{className:v.content},r.a.createElement(x.a,{gutterBottom:!0,variant:"h6",align:"center"},t.title),r.a.createElement(x.a,{gutterBottom:!0,variant:"subtitle1",align:"center",color:"primary"},t.price,"$")),r.a.createElement(ne.a,{className:v.actions},r.a.createElement(Je.a,{mutation:We,update:function(e,t){var a=t.data.updateProductRating;return f(Math.round(a.voters/a.rating))}},(function(e,a){var n=a.called;return r.a.createElement(it.a,{classes:{iconButton:v.ratingIconButton},value:p,onChange:function(a){n||e({variables:{id:t.id,rating:a}})}})})),r.a.createElement(Je.a,{mutation:De,ignoreResults:!1},(function(e){return r.a.createElement(te.a,{productId:t.id,variant:"outlined",color:"primary",onClick:Object(V.a)(K.a.mark((function a(){var r;return K.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(n.user.guest){a.next=5;break}return a.next=3,e({variables:{productId:t._id}});case 3:a.next=7;break;case 5:r=z(t),i({type:"ADD_PRODUCT_TO_CART",product:r});case 7:case"end":return a.stop()}}),a)}))),onMouseEnter:function(){return b(!0)},onMouseOver:function(e){return e.stopPropagation()},onMouseLeave:function(){return b(!1)},onFocus:function(){return b(!0)},onBlur:function(){return b(!1)}},E&&r.a.createElement(tt.a,{in:E,timeout:1e3},r.a.createElement(nt.a,null))," ","ADD TO CART")}))))},lt=Object(Z.a)({media:{width:"350px",height:"350px"},content:{paddingBottom:"0"},actions:{display:"flex",justifyContent:"space-between",height:"50px"},buttons:{height:"50px"}}),ut=function(e){var t=e.limit,a=lt();return r.a.createElement(r.a.Fragment,null,Array(t).fill().map((function(e,t){return r.a.createElement(Ge.a,{item:!0,md:3,key:t},r.a.createElement(ae.a,null,r.a.createElement(et.a,{animation:"wave",variant:"rect",className:a.media}),r.a.createElement(re.a,{className:a.content},r.a.createElement(et.a,{animation:"wave",variant:"text"}),r.a.createElement(et.a,{animation:"wave",variant:"text"})),r.a.createElement(ne.a,{className:a.actions},r.a.createElement(et.a,{animation:"wave",variant:"rect",className:a.buttons}),r.a.createElement(et.a,{animation:"wave",variant:"rect",className:a.buttons}))))})))},st=a(716),mt=a(355),dt=Object(Z.a)({gridItem:{maxHeight:"36px"}}),pt=Object(st.a)((function(e){var t=e.limit,a=e.client,n=dt();return r.a.createElement(r.a.Fragment,null,r.a.createElement(x.a,{display:"inline",variant:"button"},"Number of products:"," "),r.a.createElement(mt.a,{className:n.gridItem,variant:"outlined",id:"limit",value:t,onChange:function(e){return a.writeData({data:{limit:e.target.value}})}},r.a.createElement("option",{value:4},"4"),r.a.createElement("option",{value:16},"16"),r.a.createElement("option",{value:64},"64")))}));function ft(){var e=Object(de.a)(["\n  width: 100%;\n  text-align: center;\n"]);return ft=function(){return e},e}var gt=Object(Z.a)((function(e){return{root:{margin:e.spacing(6)}}})),ht=Object(ee.a)("span")(ft()),Et=function(){var e=gt(),t=r.a.useContext(B),a=t.state,n=t.dispatch,i=Object(X.b)(ze).data,o=Object(X.b)(Me,{variables:{limit:i.limit}}),c=o.loading,l=o.error,u=o.data;return r.a.useEffect((function(){c||n({type:"SET_PRODUCTS",products:u})}),[u,c,n]),c?r.a.createElement(Ge.a,{container:!0,spacing:3,classes:{container:e.root}},r.a.createElement(ut,{limit:i.limit})):l?r.a.createElement(ht,null,l):r.a.createElement(Ge.a,{container:!0,spacing:3,classes:{container:e.root}},r.a.createElement(Ge.a,{item:!0,md:8},r.a.createElement(Ze,null)),r.a.createElement(Ge.a,{item:!0,md:4,alignItems:"flex-end"},r.a.createElement(pt,{limit:parseInt(i.limit,10)})),a.products.map((function(e){return r.a.createElement(Ge.a,{item:!0,md:3,key:e._id.toString()},r.a.createElement(ct,{key:e._id.toString(),data:e}))})))},bt=a(6),vt=a(702),yt=a(346),Ot=a(225),jt=a(459),xt=a.n(jt),St=a(703),Ct=a(460),wt=a.n(Ct),kt=a(461),Nt=a.n(kt),Tt=a(410),Pt=a(708),_t=a(457),qt=a.n(_t),Rt=a(255),$t=Object(Z.a)((function(e){return{root:{textDecoration:"none",padding:"0 1% 0 2%",color:e.palette.grey[400],"-o-transition":".5s","-ms-transition":".5s","-moz-transition":".5s","-webkit-transition":".5s",transition:".5s","&:hover":{color:e.palette.primary.main}},list:{"& > li":{padding:"8px 12px 6px 4px"}}}})),Bt=function(e){var t=e.anchorEl,a=e.open,n=e.onClose,i=e.emptyCart,o=$t();return r.a.createElement(Rt.a,{classes:{list:o.list},anchorEl:t,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:a,onClose:n},r.a.createElement(Tt.a,{className:o.root},r.a.createElement(c.b,{to:"/cart",className:o.root},"View Cart")),r.a.createElement(Pt.a,null),r.a.createElement(Tt.a,{className:o.root},r.a.createElement(qt.a,{color:"primary",fontSize:"small"}),"\xa0 Purchase"),r.a.createElement(Tt.a,{className:o.root,onClick:i},r.a.createElement(le.a,{color:"primary",fontSize:"small"}),"\xa0 Empty Cart"))},It=a(458),Dt=a.n(It),At=Object(Z.a)((function(e){return{root:{textDecoration:"none",padding:"0 1% 0 2%",color:e.palette.grey[400],"-o-transition":".5s","-ms-transition":".5s","-moz-transition":".5s","-webkit-transition":".5s",transition:".5s","&:hover":{color:e.palette.primary.main}},list:{"& > li":{padding:"8px 12px 6px 4px"}}}})),Ft=function(e){var t=e.anchorEl,a=e.open,n=e.onClose,i=e.logout,o=At();return r.a.createElement(Rt.a,{classes:{list:o.list},anchorEl:t,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:a,onClose:n},r.a.createElement(Tt.a,{className:o.root,onClick:i},r.a.createElement(Dt.a,{color:"secondary",fontSize:"small"}),"\xa0 Logout"))},Lt=Object(Z.a)((function(e){return{root:{flexGrow:1},button:{padding:"5px",margin:"5px"},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}})),Ut=Object(bt.a)((function(e){return{badge:{right:-3,top:13,border:"2px solid ".concat(e.palette.background.paper),padding:"0 4px"}}}))(St.a),zt=function(){var e=r.a.useContext(H),t=e.state,a=e.dispatch,n=Object(X.b)($e),i=n.loading,o=n.data,c=Object(X.c)(Ue),u=c.data,s=c.loading;r.a.useEffect((function(){A()?!s&&u?a({type:"UPDATE_CART",cart:u}):!i&&o&&a({type:"SET_USER",user:o.getUser}):(L()||U(!0),a({type:"SET_GUEST"}),d.a.remove("signedin"))}),[o,i,u,s]);var m=r.a.useState(null),p=Object(l.a)(m,2),f=p[0],g=p[1],h=r.a.useState(null),E=Object(l.a)(h,2),b=E[0],v=E[1],y=Lt(),O=Object(X.a)(Le),j=Object(l.a)(O,1)[0],S=function(){var e=Object(V.a)(K.a.mark((function e(){return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!A()){e.next=5;break}return e.next=3,j();case 3:e.next=7;break;case 5:U(!0),a({type:"EMPTY_CART"});case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),C=Object(X.a)(Ie),w=Object(l.a)(C,1)[0];return r.a.createElement("div",{className:y.root},r.a.createElement(vt.a,{position:"fixed"},r.a.createElement(yt.a,null,r.a.createElement(Ot.a,{edge:"start",className:y.menuButton,color:"inherit","aria-label":"menu"},r.a.createElement(xt.a,null)),r.a.createElement(x.a,{variant:"h6",className:y.title},"Photos"),r.a.createElement("div",null,t.user.guest&&r.a.createElement(r.a.Fragment,null,r.a.createElement(te.a,{href:"/login/",className:y.button,color:"secondary",disableElevation:!0},"Login"),r.a.createElement(te.a,{className:y.button,variant:"outlined",color:"secondary"},"Sign Up")),!t.user.guest&&r.a.createElement(r.a.Fragment,null,r.a.createElement(Ot.a,{"aria-label":"account of current user","aria-haspopup":"true",onClick:function(e){v(e.currentTarget)},color:"inherit"},r.a.createElement(wt.a,{fontSize:"large",color:"secondary"})),r.a.createElement(Ft,{anchorEl:b,open:Boolean(b),onClose:function(e){v(null)},logout:function(){w()&&(d.a.remove("signedin"),a({type:"REMOVE_USER"}))}})),r.a.createElement(Ot.a,{edge:"end","aria-label":"shopping cart","aria-haspopup":"true",onClick:function(e){g(e.currentTarget)}},r.a.createElement(Ut,{badgeContent:t.user.cart.total,color:"secondary"},r.a.createElement(Nt.a,{fontSize:"large",color:"secondary"}))),r.a.createElement(Bt,{anchorEl:f,open:Boolean(f),onClose:function(e){g(null)},emptyCart:S})))))},Mt=a(462),Wt=a.n(Mt),Qt=Object(Z.a)((function(e){return{gridItem:{margin:"auto"},mainFeaturedPost:{position:"relative",backgroundColor:e.palette.background.default,color:e.palette.text.primary,marginTop:e.spacing(8),marginBottom:e.spacing(4),backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},mainFeaturedPostContent:{position:"relative",padding:e.spacing(5),[e.breakpoints.up("md")]:{padding:e.spacing(6),paddingRight:0}}}})),Ht=function(){return r.a.createElement("img",{src:Wt.a,alt:"Header",style:{width:"100%"}})},Yt=function(e){var t=Qt(),a=e.post;return r.a.createElement(Ge.a,{container:!0,className:t.mainFeaturedPost},r.a.createElement(Ge.a,{item:!0,md:6,classes:{item:t.gridItem}},r.a.createElement("div",{className:t.mainFeaturedPostContent},r.a.createElement(x.a,{component:"h1",variant:"h3",color:"inherit",gutterBottom:!0},a.title),r.a.createElement(x.a,{variant:"h5",color:"inherit",paragraph:!0},a.description),r.a.createElement(Ve.a,{variant:"subtitle1",href:"#"},a.linkText))),r.a.createElement(Ge.a,{item:!0,md:6},r.a.createElement(Ht,null)))};Yt.defaultProps={post:{imageText:Ht,title:"shopping",description:"the place to shop",linkText:""}};var Gt=Yt,Jt=a(276),Kt=a(179),Vt=a(710),Xt=a(717),Zt=Object(Z.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}})),ea=function(e){var t=e.open,a=e.severity,n=e.message,i=Zt();return r.a.createElement("div",{className:i.root},r.a.createElement(Vt.a,{open:t,autoHideDuration:6e3},r.a.createElement(Xt.a,{elevation:6,variant:"filled",severity:a},n)))},ta=Object(Z.a)({form:{display:"flex",justifyContent:"space-between",flexDirection:"column",width:"30%",margin:" 2% auto"},input:{marginBottom:"8px"}}),aa=function(e){var t=e.history,a=ta(),n=Object(X.a)(Be),i=Object(l.a)(n,2),o=i[0],c=(i[1].error,r.a.useState("")),u=Object(l.a)(c,2),s=u[0],m=u[1],p=r.a.useState(""),f=Object(l.a)(p,2),g=f[0],h=f[1],E=r.a.useState(!1),b=Object(l.a)(E,2),v=b[0],y=b[1],O=r.a.useState(""),j=Object(l.a)(O,2),x=j[0],S=j[1],C=r.a.useState(""),w=Object(l.a)(C,2),k=w[0],N=w[1],T=Object(Kt.a)(),P=T.register,_=T.handleSubmit,q=T.errors,R=function(){var e=Object(V.a)(K.a.mark((function e(){var a,n;return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o({variables:{email:s,password:g},errorPolicy:"all",refetchQueries:[{query:Re},{query:$e}]});case 2:if(a=e.sent,!(n=a.data).loginUser){e.next=10;break}if(!n.loginUser.success){e.next=8;break}return d.a.set("signedin",!0,{expires:1}),e.abrupt("return",t.goBack());case 8:e.next=13;break;case 10:S("Login failed. Please make sure the email address and password are correct"),N("error"),y(!0);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("form",{onSubmit:_(R),className:a.form},r.a.createElement(Jt.a,{name:"email",id:"email",variant:"outlined",onChange:function(e){return m(e.target.value)},placeholder:"Your email",className:a.input,inputProps:{ref:P({required:"Oops! This field is required.",pattern:{value:/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,message:"Oh oh! You must enter a valid email address"}})},error:q.email,helperText:q.email&&q.email.message}),r.a.createElement(Jt.a,{name:"password",id:"password",variant:"outlined",onChange:function(e){return h(e.target.value)},type:"password",placeholder:"Your password",className:a.input,inputProps:{ref:P({required:"Oops! This field is required."})},error:q.password,helperText:q.password&&q.password.message}),r.a.createElement(te.a,{variant:"contained",color:"primary",type:"submit"},"Login"),r.a.createElement(ea,{message:x,severity:k,open:v}))},na=a(714),ra=a(711),ia=a(712),oa=a(713),ca=a(152),la=a(463),ua=a(464),sa=a.n(ua),ma=a(432),da=a(412),pa=a(409),fa=a(427),ga=a(413),ha=function(e){var t=e.products,a=e.totalForPayment;return r.a.createElement(ma.a,{"aria-label":"OrderReview Table"},r.a.createElement(fa.a,null,r.a.createElement(pa.a,null,r.a.createElement(x.a,{variant:"h6"},"Product Name")),r.a.createElement(pa.a,{align:"right"},r.a.createElement(x.a,{variant:"h6"},"Quantity")),r.a.createElement(pa.a,{align:"right"},r.a.createElement(x.a,{variant:"h6"},"Total Price"))),r.a.createElement(da.a,null,t.map((function(e){return r.a.createElement(ga.a,{key:e._id},r.a.createElement(pa.a,null,e.title),r.a.createElement(pa.a,{align:"right"},e.quantity),r.a.createElement(pa.a,{align:"right"},Math.round(e.price*e.quantity*100)/100,"$"))})),r.a.createElement(ga.a,null,r.a.createElement(pa.a,{colSpan:1}),r.a.createElement(pa.a,{align:"right"},r.a.createElement(x.a,{variant:"h6"},"Total For Payment")),r.a.createElement(pa.a,{align:"right"},r.a.createElement(x.a,{variant:"h6"},a,"$")))))},Ea=a(472),ba=a(347),va=a(677),ya=a(38),Oa=a(339),ja=Object(Z.a)((function(e){return{button:{marginTop:e.spacing(1),marginRight:e.spacing(1)}}})),xa=function(e){var t=e.handleBack,a=e.handleNext,n=r.a.useState(""),i=Object(l.a)(n,2),o=i[0],c=i[1],u=r.a.useState(""),s=Object(l.a)(u,2),m=s[0],d=s[1],p=r.a.useState(""),f=Object(l.a)(p,2),g=f[0],h=f[1],E=r.a.useState(),b=Object(l.a)(E,2),v=b[0],y=b[1],O=Object(Kt.a)(),j=O.register,x=O.handleSubmit,S=O.errors,C=ja();return r.a.createElement("form",{onSubmit:x((function(){return a()}))},r.a.createElement(Ge.a,{container:!0,spacing:2,style:{with:"680px"}},r.a.createElement(Ge.a,{item:!0,md:6},r.a.createElement(ba.a,null,r.a.createElement(va.a,null,"First Name"),r.a.createElement(Jt.a,{name:"firstName",variant:"outlined",value:o,onChange:function(e){return c(e.target.value)},inputProps:{ref:j({required:"Oops! This field is required."})},error:S.firstName,helperText:S.firstName&&S.firstName.message}))),r.a.createElement(Ge.a,{item:!0,md:6},r.a.createElement(ba.a,null,r.a.createElement(va.a,null,"Last Name"),r.a.createElement(Jt.a,{name:"lastName",variant:"outlined",value:m,onChange:function(e){return d(e.target.value)},inputProps:{ref:j({required:"Oops! This field is required."})},error:S.lastName,helperText:S.lastName&&S.lastName.message}))),r.a.createElement(Ge.a,{item:!0,md:7},r.a.createElement(ba.a,null,r.a.createElement(ya.a,{utils:Ea.a},r.a.createElement(Oa.b,{margin:"normal",id:"date-picker-dialog",label:"Birth Date",format:"MM/dd/yyyy",value:v,onChange:function(e){return y(e)},KeyboardButtonProps:{"aria-label":"change date"}})))),r.a.createElement(Ge.a,{item:!0,md:5},r.a.createElement(ba.a,null,r.a.createElement(va.a,null,"Email Address"),r.a.createElement(Jt.a,{name:"email",variant:"outlined",value:g,onChange:function(e){return h(e.target.value)},inputProps:{ref:j({required:"Oops! This field is required.",pattern:{value:/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,message:"Oh oh! You must enter a valid email address"}})},error:S.email,helperText:S.email&&S.email.message}))),r.a.createElement(te.a,{onClick:function(){return t()},className:C.button},"Back"),r.a.createElement(te.a,{type:"submit",variant:"contained",color:"primary"},"Submit and Continue")))},Sa=a(466),Ca=a(467),wa=a.n(Ca),ka=function(e){var t=e.handleNext,a=e.handleBack,n=e.setAdrress,i=r.a.useState(""),o=Object(l.a)(i,2),c=o[0],u=o[1],s=r.a.useState(""),m=Object(l.a)(s,2),d=m[0],p=m[1],f=r.a.useState(""),g=Object(l.a)(f,2),h=g[0],E=g[1],b=r.a.useState(""),v=Object(l.a)(b,2),y=v[0],O=v[1],j=r.a.useState(""),x=Object(l.a)(j,2),S=x[0],C=x[1],w=r.a.useState(""),k=Object(l.a)(w,2),N=k[0],T=k[1],P=r.a.useState(""),_=Object(l.a)(P,2),q=_[0],R=_[1],$=Object(Kt.a)(),B=$.register,I=$.handleSubmit,D=$.errors;return r.a.createElement("form",{onSubmit:I((function(){n({firmName:c,recipientName:d,address1:h,address2:y,country:S,city:N,zipcode:q}),t()}))},r.a.createElement(Ge.a,{container:!0,spacing:2},r.a.createElement(Ge.a,{item:!0,md:12},r.a.createElement(ba.a,null,r.a.createElement(va.a,null,"Firm Name"),r.a.createElement(Jt.a,{name:"firmName",value:c,helperText:"Optional",onChange:function(e){return u(e.target.value)}}))),r.a.createElement(Ge.a,{item:!0,md:12},r.a.createElement(ba.a,null,r.a.createElement(va.a,null,"Recipient Name"),r.a.createElement(Jt.a,{name:"recepientName",value:d,onChange:function(e){return p(e.target.value)},inputProps:{ref:B({required:"Oops! This field is required."})},error:D.recepientName,helperText:D.recepientName&&D.recepientName.message}))),r.a.createElement(Ge.a,{item:!0,md:12},r.a.createElement(ba.a,null,r.a.createElement(va.a,null,"Address 1"),r.a.createElement(Jt.a,{name:"address1",value:h,onChange:function(e){return E(e.target.value)},inputProps:{ref:B({required:"Oops! This field is required."})},error:D.address1,helperText:D.address1&&D.address1.message}))),r.a.createElement(Ge.a,{item:!0,md:12},r.a.createElement(ba.a,null,r.a.createElement(va.a,null,"Address 2"),r.a.createElement(Jt.a,{name:"address2",value:y,helperText:"Optional",onChange:function(e){return O(e.target.value)}}))),r.a.createElement(Ge.a,{item:!0,md:12},r.a.createElement(ba.a,null,r.a.createElement(va.a,null,"Country"),r.a.createElement(mt.a,{name:"country",onChange:function(e){return C(e.target.value)},value:S},Sa.map((function(e){return r.a.createElement("option",{key:e.abbreviation,value:e.abbreviation},e.country)}))))),r.a.createElement(Ge.a,{item:!0,md:6},r.a.createElement(ba.a,null,r.a.createElement(va.a,null,"City"),r.a.createElement(Jt.a,{name:"city",value:N,onChange:function(e){return T(e.target.value)},inputProps:{ref:B({required:"Oops! This field is required."})},error:D.city,helperText:D.city&&D.city.message}))),r.a.createElement(Ge.a,{item:!0,md:6},r.a.createElement(ba.a,null,r.a.createElement(va.a,null,"Zip Code"),r.a.createElement(Jt.a,{disabled:!S,name:"zipcode",value:q,onChange:function(e){return R(e.target.value)},helperText:S?D.zipcode&&D.zipcode.message:"Please select country first",error:D.zipcode,inputProps:{ref:B({validate:function(e){return!0===wa.a.validate(S,e)||"zipcode is not valid"}})}})))),r.a.createElement(te.a,{onClick:function(){return a()}},"Back"),r.a.createElement(te.a,{type:"submit",variant:"contained",color:"primary"},"Submit and Continue"))},Na=(a(656),{style:{base:{color:"#32325d",fontFamily:'"Helvetica Neue", Helvetica, sans-serif',fontSmoothing:"antialiased",fontSize:"16px","::placeholder":{color:"#aab7c4"}},invalid:{color:"#fa755a",iconColor:"#fa755a"}}}),Ta=function(e){var t=e.address,a=e.totalPayment,n=Object(ca.useStripe)(),i=Object(ca.useElements)(),o=function(){var e=Object(V.a)(K.a.mark((function e(t){var r,i,c,l;return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.error){e.next=3;break}e.next=23;break;case 3:if(!t.requires_action){e.next=22;break}return e.next=6,n.handleCardAction(t.payment_intent_client_secret);case 6:if(r=e.sent,i=r.error,c=r.paymentIntent,!i){e.next=12;break}e.next=20;break;case 12:return e.next=14,fetch("http://localhost:4000/payment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({payment_intent_id:c.id,payment_total:100*a})});case 14:return l=e.sent,e.t0=o,e.next=18,l.json();case 18:e.t1=e.sent,(0,e.t0)(e.t1);case 20:e.next=23;break;case 22:console.log("success");case 23:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),c=function(){var e=Object(V.a)(K.a.mark((function e(t){var n,r;return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.error){e.next=4;break}console.log(t.error),e.next=11;break;case 4:return e.next=6,fetch("http://localhost:4000/payment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({payment_method_id:t.paymentMethod.id,payment_total:100*a})});case 6:return n=e.sent,e.next=9,n.json();case 9:r=e.sent,o(r);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(V.a)(K.a.mark((function e(a){var r;return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),e.next=3,n.createPaymentMethod({type:"card",card:i.getElement(ca.CardElement),billing_details:{address:{city:t.city,country:t.country,line1:t.address1,line2:t.address2,postal_code:t.zipcode,state:null},email:null,name:t.recipientName}});case 3:r=e.sent,c(r);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("form",{onSubmit:l},"Card details",r.a.createElement(ca.CardElement,{options:Na}),r.a.createElement(te.a,{type:"submit",disabled:!n},"Submit Payment"))},Pa=Object(Z.a)((function(e){return{root:{width:"100%"},button:{marginTop:e.spacing(1),marginRight:e.spacing(1)},actionsContainer:{marginBottom:e.spacing(2)},resetContainer:{padding:e.spacing(3)}}})),_a=function(e){var t=e.history,n=e.items,i=e.totalForPayment,o=r.a.useState(),c=Object(l.a)(o,2),u=c[0],s=c[1],m=["Purchase Summary","Personal Details","Delivery","Terms & Conditions","Payment"],d=function(){var e=a(657);fetch(e).then((function(e){return e.text()})).then((function(e){return s(sa()(e))})).catch(console.log)},p=r.a.useState(!1),f=Object(l.a)(p,2),g=f[0],h=f[1],E=Pa(),b=r.a.useState(0),v=Object(l.a)(b,2),y=v[0],O=v[1],S=r.a.useState({}),C=Object(l.a)(S,2),w=C[0],k=C[1];r.a.useEffect((function(){return d}),[y]);var N=function(){O((function(e){return e+1}))},T=function(){O((function(e){return e-1}))},P=r.a.useState(!1),_=Object(l.a)(P,2),q=_[0],R=_[1];r.a.useEffect((function(){R(g)}),[g]),r.a.useEffect((function(){2===y&&R(!0)}),[y]);var $=Object(la.a)("pk_test_8u9bKgTYKQsLEKv4YZ0THX8b00XCTueNVx"),B=function(e){switch(e){case 0:case 2:return{labelLeft:"Back",functionLeft:function(){return T()},labelRight:"Next",functionRight:function(){return N()}};case 1:return{labelLeft:A()?"Back":"Continue as a guest",functionLeft:function(){return A()?T():h(!0)},labelRight:A()?"Next":"Login",functionRight:function(){return A()?N():void t.push("/login")}};case 3:return{labelLeft:"Back",functionLeft:function(){return T()},labelRight:"I Agree",functionRight:function(){return N()}};case 4:return{labelLeft:"Back",functionLeft:function(){return T()},labelRight:"Complete Purchase",functionRight:function(){return"Finshed"}};default:return"Unknown button configuration"}},I=function(e){switch(e){case 0:return r.a.createElement(ha,{products:n,totalForPayment:i});case 1:return A()?null:r.a.createElement(r.a.Fragment,null,g?r.a.createElement(xa,{handleBack:function(){h(!1),T()},handleNext:function(){return N()}}):r.a.createElement(x.a,{variant:"body1",color:"primary"},"It seems you are not connected to your account.",r.a.createElement("br",null),"Would you like to continue as a guest, or would you rather login to your account?",r.a.createElement("br",null),r.a.createElement("br",null)));case 2:return r.a.createElement(ka,{handleBack:function(){R(!1),T()},handleNext:function(){R(!1),N()},setAdrress:function(e){return function(e){k(e)}(e)}});case 3:return r.a.createElement("div",{dangerouslySetInnerHTML:{__html:u},style:{width:"100%",maxHeight:"400px",overflowY:"scroll"}});case 4:return r.a.createElement(Ta,{address:w,totalPayment:i});default:return"Unknown Step"}};return r.a.createElement(ca.Elements,{stripe:$},r.a.createElement(na.a,{activeStep:y,orientation:"vertical"},m.map((function(e,t){return r.a.createElement(ra.a,{key:e},r.a.createElement(ia.a,null,e),r.a.createElement(oa.a,null,r.a.createElement(x.a,null,I(t)),r.a.createElement("div",{className:E.actionsContainer},r.a.createElement("div",null,q?null:r.a.createElement(r.a.Fragment,null,r.a.createElement(te.a,{disabled:0===y,onClick:B(y).functionLeft,className:E.button},B(y).labelLeft),r.a.createElement(te.a,{variant:"contained",color:"primary",onClick:B(y).functionRight,className:E.button},B(y).labelRight))))))}))),y===m.length&&r.a.createElement(j.a,{square:!0,elevation:0,className:E.resetContainer},r.a.createElement(x.a,null,"All steps completed - you're finished"),r.a.createElement(te.a,{onClick:function(){O(0)},className:E.button},"Reset")))},qa=new g.a,Ra=new h.a({uri:"http://localhost:4000/graphql",credentials:"include"}),$a=new y.a({uri:"ws://localhost:4000/graphql",options:{reconnect:!0}}),Ba=Object(b.a)((function(e){var t=e.graphQLErrors,a=e.networkError;if(t&&t.map((function(e){var t=e.message,a=e.locations,n=e.path;"UNAUTHENTICATED"===e.extensions.code&&d.a.remove("signedin"),console.log("[GraphQL error]: Message: ".concat(t,", Location: ").concat(a,", Path: ").concat(n))})),a)return r.a.createElement(S,{errorCode:a.code,errorMessage:a.message})})),Ia=Object(E.a)((function(e){var t=e.query,a=Object(v.a)(t);return"OperationDefinition"===a.kind&&"subscription"===a.operation}),$a,Ra),Da=new f.c({link:Ba.concat(Ia),cache:qa,resolvers:{},typeDefs:"\n    extend type Query {\n      limit: Int!\n    }\n  ",connectToDevTools:!0});qa.writeData({data:{limit:16}});var Aa=function(){var e=Object(p.f)(),t=r.a.useState(),a=Object(l.a)(t,2),n=a[0],i=a[1],o=r.a.useState(),c=Object(l.a)(o,2),m=c[0],d=c[1],f=r.a.useState(),g=Object(l.a)(f,2),h=g[0],E=g[1],b=function(e){i(e)},v=function(e){d(e)},y=function(e){E(e)};return r.a.createElement(O.b,{client:Da},r.a.createElement(I,null,r.a.createElement(G,null,r.a.createElement(s.a,null),r.a.createElement(u.a,{theme:R},r.a.createElement(zt,{updateEmptyLocalCart:function(){return b(0)},changeToLocalCart:function(){return b(L().total)},cartTotal:n}),"/"===e.pathname?r.a.createElement(Gt,null):null,r.a.createElement(p.c,null,r.a.createElement(p.a,{exact:!0,path:"/",render:function(e){return r.a.createElement(Et,Object.assign({updateTotal:b},e))}}),r.a.createElement(p.a,{path:"/category/:id",component:Et}),r.a.createElement(p.a,{path:"/cart",render:function(e){return r.a.createElement(Ye,Object.assign({updateCartTotal:b,itemsForCheckout:v,totalForPayment:y},e))}}),r.a.createElement(p.a,{path:"/checkout",render:function(e){return r.a.createElement(_a,Object.assign({items:m,totalForPayment:h},e))}}),r.a.createElement(p.a,{path:"/login/",component:aa}))))))},Fa=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function La(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.a.render(r.a.createElement(c.a,null,r.a.createElement(Aa,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");Fa?(!function(e,t){fetch(e).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):La(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):La(t,e)}))}}()}},[[488,1,2]]]);
//# sourceMappingURL=main.cecef25b.chunk.js.map