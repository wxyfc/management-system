import Vue from 'vue'
import Router from 'vue-router'

Vue.use ( Router )
let router = [
    {
        path : '/' ,
        redirect : { name : "login" } ,
        meta : {
            intercept : false ,
            noQuickTabs : true ,
        }
    } ,
    {
        path : '/login' ,
        name : 'login' ,
        component : () => import('@/views/welcome/AdminLogin.vue') ,
        meta : {
            intercept : false ,
            noQuickTabs : true ,
        }
    } ,
    {
        path : '*' ,
        redirect : { name : "ready" } ,
        meta : {
            intercept : false ,
            noQuickTabs : true ,
        }
    } ,
    {
        path : '/404' ,
        name : '404' ,
        component : () => import('@/views/welcome/404.vue') ,
        meta : {
            intercept : false ,
            noQuickTabs : true ,
        }
    } ,
    {
        path : '/ready' ,
        name : 'ready' ,
        component : () => import('@/views/welcome/Ready.vue') ,
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
