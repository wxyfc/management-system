(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e5dae"],{"95ea":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"th4 mainTag"},t._l(t.routerTag,function(e,n){return o("fragment",{key:n},[e.meta.noQuickTabs?t._e():o("el-tag",{staticClass:"emphasize",staticStyle:{"margin-right":"0.2vw"},style:{cursor:e.path==t.$route.path?"not-allowed":"pointer"},attrs:{closable:t.closable,"disable-transitions":"",color:e.path==t.$route.path?t.otherInfo.themeBackgroundColor:"#C0C4CC",size:t.size},on:{click:function(e){return t.TagClick(n)},close:function(o){return t.TagClose(e)}}},[o("span",{style:{color:e.path==t.$route.path?t.otherInfo.themeTextColor:"#909399"}},[o("mi",{attrs:{icon:e.meta.icon,iconClass:""}}),t._v("\n        "+t._s(t.language[n])+"\n      ")],1)])],1)}),1)},a=[],r=(o("a481"),o("7f7f"),o("ac6a"),o("456d"),{mixins:[o("a496").default],name:"mainTag",computed:{routerTag:function(){var t={},e=this.otherInfo.routerHistory;for(var o in e)e[o].meta.noQuickTabs||this.$set(t,o,e[o]);return t},closable:function(){return Object.keys(this.otherInfo.routerHistory).length>1},size:function(){return this.otherInfo.menuCollapse?"mini":"medium"}},methods:{TagClose:function(t){var e=this.otherInfo.routerHistory;this.$delete(e,t.name);var o=Object.keys(e),n=o.length;t.path==this.$route.path&&(n>0?this.$router.replace({name:o[n-1]}):this.$router.go(-1))},TagClick:function(t){this.$router.replace({name:t})}}}),i=r,s=o("2877"),l=Object(s["a"])(i,n,a,!1,null,null,null);e["default"]=l.exports}}]);