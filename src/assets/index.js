import Vue from 'vue'
let contexts = require.context('.', false, /\.vue$/)
// console.log(contexts)
contexts.keys().forEach(component => {
    // console.log(component)
    // console.log(contexts(component))
    // debugger;
    let componentEntity = contexts(component).default
    // console.log(componentEntity)
    // 使用内置的组件名称 进行全局组件注册
    Vue.component(componentEntity.name, componentEntity)
})
