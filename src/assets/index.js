import Vue from 'vue'

let contexts = require.context ( '.' , false , /\.vue$/ )
contexts.keys ().forEach ( component => {
    let componentEntity = contexts ( component ).default
    Vue.component ( componentEntity.name , componentEntity )
} )
