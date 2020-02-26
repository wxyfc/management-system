import Vue from 'vue'
import Router from 'vue-router'

Vue.use ( Router )
let router = [
    {
        path : '/' ,
        redirect : { name : "login" } ,
        replace : true ,
        meta : {
            intercept : false ,
            noQuickTabs : true ,
        }
    } ,
    {
        path : '/login' ,
        name : 'login' ,
        replace : true ,
        component : () => import('@/views/welcome/AdminLogin') ,
        meta : {
            intercept : false ,
            noQuickTabs : true ,
        }
    } ,
    {
        path : '*' ,
        redirect : { name : "ready" } ,
        replace : true ,
        meta : {
            intercept : false ,
            noQuickTabs : true ,
        }
    } ,
    {
        path : '/404' ,
        name : '404' ,
        replace : true ,
        component : () => import('@/views/welcome/404') ,
        meta : {
            intercept : false ,
            noQuickTabs : true ,
        }
    } ,
    {
        path : '/ready' ,
        name : 'ready' ,
        replace : true ,
        component : () => import('@/views/welcome/Ready') ,
        meta : {
            intercept : true ,
            noQuickTabs : true ,
            role : [ 5233 , 5232 , 5231 , 5231 ]
        }
    }
]

export default new Router ( {
    // mode: 'history',
    mode : 'hash' ,
    base : process.env.BASE_URL ,
    routes : router
} )
