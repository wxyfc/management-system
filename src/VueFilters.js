import Vue from 'vue';

//首字母大写
function capitalize ( value ) {
    if ( !value ) return ''
    value = value.toString ()
    return value.charAt ( 0 ).toUpperCase () + value.slice ( 1 )
}

//日期格式化
function dataFormat ( datastr ) {
    let date = new Date ( datastr );
    let y = ( date.getFullYear () ).toString ().padStart ( 2 , '0' );
    let m = ( date.getMonth () + 1 ).toString ().padStart ( 2 , '0' );
    let d = ( date.getDate () ).toString ().padStart ( 2 , '0' );
    let hh = ( date.getHours () ).toString ().padStart ( 2 , '0' );
    let mm = ( date.getMinutes () ).toString ().padStart ( 2 , '0' );
    let ss = ( date.getSeconds () ).toString ().padStart ( 2 , '0' );
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}

//首字母大写
Vue.filter ( 'capitalize' , capitalize )
//日期格式化
Vue.filter ( 'dataFormat' , dataFormat )
