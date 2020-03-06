import Vue from 'vue'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import router from './router';
import store from './store';
import { getLocal , clearLocal } from "@/function";

function isTrue ( o ) {
    return Vue.prototype.$isTrue ( o );
}

function setRouterHistory ( toHandler , to ) {
    // if (!to.meta.noQuickTabs && !to.meta.noKeepAlive && to.meta.icon) {
    if ( ( !!to.meta.icon && !to.meta.noKeepAlive ) || ( !!to.meta.icon && !to.meta.noQuickTabs ) ) {
        let routerHistory = store.state.otherInfo.routerHistory
        if ( isTrue ( routerHistory ) ) {
            Vue.set ( routerHistory , to.name , toHandler );
            store.dispatch ( "upVuex" , {
                mutations : "setOtherInfo" ,
                value : {
                    routerHistory : routerHistory
                }
            } );
        } else {
            let rhObj = {};
            Vue.set ( rhObj , to.name , toHandler );
            store.dispatch ( "upVuex" , {
                mutations : "setOtherInfo" ,
                value : {
                    routerHistory : rhObj
                }
            } );
        }
    }
}

function notAllowMessage ( to , next ) {
    Vue.prototype.$message ( {
        message : store.state.language.functionNotEnabled ,
        type : "error" ,
        duration : 8000 ,
        customClass : "messageBox"
    } );
    // next(false);
    // router.go(-1);
    nextTo ( "404" , to , next );
}

function nextTo ( name , to , next ) {
    next ( { name , params : { redirect : to.name } } );
}

router.beforeEach ( ( to , from , next ) => {
    NProgress.start ();
    let toHandler = {
        name : to.name ,
        path : to.path ,
        meta : to.meta ,
    }
    
    let meta = to.meta;
    if ( meta.intercept == false ) { //是否需要拦截 否
        setRouterHistory ( toHandler , to );
        next ();
    } else if ( meta.intercept == true ) {
        let userRole = store.state.userInfo.userRole;
        if ( isTrue ( userRole ) ) { //是否拥有角色 是
            if ( meta.role.includes ( userRole ) ) { //是否角色可以跳转路由 是
                setRouterHistory ( toHandler , to );
                next ();
            } else {
                notAllowMessage ( to , next );
            }
        } else { //有角色就可以跳转 等待加时间限制
            let userMemory = getLocal ( "userMemory" );
            if ( isTrue ( userMemory ) ) { //是否本地有记忆 有
                let second = userMemory.userInfo.lastTime.second;
                let nowSecond = new Date ().getTime ();
                let obsoleteTime = 1 * 60 * 60 * 1000 * 24; //用户登录时间判断拦截
                if ( nowSecond - second < obsoleteTime ) {
                    store.dispatch ( "upVuex" , {
                        mutations : "setUserInfo" ,
                        value : userMemory.userInfo
                    } );
                    store.dispatch ( "upVuex" , {
                        mutations : "setOtherInfo" ,
                        value : userMemory.otherInfo
                    } );
                    store.dispatch ( "upVuex" , {
                        mutations : "setLanguage" ,
                        value : userMemory.language
                    } );
                    let userMRole = store.state.userInfo.userRole;
                    if ( meta.role.includes ( userMRole ) ) { //是否角色可以跳转路由 是
                        setRouterHistory ( toHandler , to );
                        next ();
                    } else {
                        notAllowMessage ( to , next );
                    }
                } else {
                    // clearLocal();
                    nextTo ( "login" , to , next );
                }
            } else { // 否
                nextTo ( "login" , to , next );
            }
        }
    } else if ( from.name == "login" ) {
        nextTo ( "ready" , to , next );
    } else {
        notAllowMessage ( to , next );
    }
    NProgress.done ();
} );

router.afterEach ( transition => {
    NProgress.done ();
} );