import Vue from "vue";

export function getNumberOfDays ( date1 , date2 ) {//获得天数
    //date1：开始日期，date2结束日期  时间戳相减，然后除以天数
    return Math.ceil ( ( Date.parse ( new Date ( date2 ) ) - Date.parse ( new Date ( date1 ) ) ) / ( 1000 * 60 * 60 * 24 ) )
};

export function fileReader ( file , type ) {
    //异步加载文件
    return new Promise ( function ( resolve , reject ) {
        let reader = new FileReader ();
        if ( type != undefined ) {
            reader.readAsText ( file , type )//如果传入第二个参数，代表读取文件内容，以怎样的格式解码内容，目前是乱码
        } else {
            reader.readAsDataURL ( file );
        }
        reader.onload = e => {
            // return e.target.result;
            resolve ( e.target.result )
        }
    } );
}

export function bytesToSize ( bytes ) {
    //字节转换kb大小
    if ( bytes === 0 ) return '0 B';
    var k = 1000 , // or 1024
        sizes = [ 'B' , 'KB' , 'MB' , 'GB' , 'TB' , 'PB' , 'EB' , 'ZB' , 'YB' ] ,
        i = Math.floor ( Math.log ( bytes ) / Math.log ( k ) );
    
    return ( bytes / Math.pow ( k , i ) ).toPrecision ( 3 ) + ' ' + sizes[ i ];
}

export function jsonToParams ( data ) {
    //json 转 url拼接参数
    try {
        let tempArr = [];
        for ( let i in data ) {
            let key = encodeURIComponent ( i );
            let value = encodeURIComponent ( data[ i ] );
            tempArr.push ( key + '=' + value );
        }
        let urlParamsStr = tempArr.join ( '&' );
        return urlParamsStr;
    } catch ( err ) {
        return '';
    }
}

export function getQueryObject ( url ) {
    //url 拼接参数转json
    url = url == null ? window.location.href : url;
    let search = url.substring ( url.lastIndexOf ( "?" ) + 1 );
    let obj = {};
    let reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace ( reg , function ( rs , $1 , $2 ) {
        let name = decodeURIComponent ( $1 );
        let val = decodeURIComponent ( $2 );
        val = String ( val );
        obj[ name ] = val;
        return rs;
    } );
    return obj;
}

export function getParams ( url ) {
    //url 拼接参数转json
    url = url == null ? window.location.href : url;
    try {
        let index = url.indexOf ( '?' );
        url = url.match ( /\?([^#]+)/ )[ 1 ];
        let obj = {} , arr = url.split ( '&' );
        for ( let i = 0 ; i < arr.length ; i++ ) {
            let subArr = arr[ i ].split ( '=' );
            let key = decodeURIComponent ( subArr[ 0 ] );
            let value = decodeURIComponent ( subArr[ 1 ] );
            obj[ key ] = value;
        }
        return obj;
        
    } catch ( err ) {
        return null;
    }
}

export function GetDistance ( lat1 , lng1 , lat2 , lng2 ) {
    //根据经纬度转换成公里 误差0.2公里 （200米）
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin ( Math.sqrt ( Math.pow ( Math.sin ( a / 2 ) , 2 ) +
        Math.cos ( radLat1 ) * Math.cos ( radLat2 ) * Math.pow ( Math.sin ( b / 2 ) , 2 ) ) );
    s = s * 6378.137;// EARTH_RADIUS;
    s = Math.round ( s * 10000 ) / 10000;
    return s;
}

export function cellDataFormat ( r , c ) {
    //新表格格式方法
    let ipf = c.property.indexOf ( "/" );
    let iof = c.property.indexOf ( "." );
    if ( ipf != -1 ) {
        let ago = c.property.substring ( 0 , ipf );
        let back = c.property.substring ( ipf + 1 , c.property.length );
        let agoValue = r[ ago ];
        let backValue = r[ back ];
        let ipfLabel = c.label.indexOf ( "/" );
        if ( ipfLabel != -1 ) {
            ago = c.label.substring ( 0 , ipfLabel );
            back = c.label.substring ( ipfLabel + 1 , c.label.length );
        }
        let data = {};
        this.$set ( data , ago , agoValue );
        this.$set ( data , back , backValue );
        return data;
    } else if ( iof == -1 ) {
        return r[ c.property ];
    } else {
        let s = c.property.substring ( 0 , iof );
        let e = c.property.substring ( iof + 1 , c.property.length );
        let data = r[ s ][ e ];
        return data;
        // return {
        //   data,
        //   s,
        //   e
        // };
    }
}

export function $addCSS ( cssText ) {
    //动态添加css
    let ti = null;
    let style = document.createElement ( 'style' ) , //创建一个style元素
        head = document.head || document.getElementsByTagName ( 'head' )[ 0 ]; //获取head元素
    style.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
    if ( style.styleSheet ) { //IE
        let func = function () {
            try { //防止IE中stylesheet数量超过限制而发生错误
                style.styleSheet.cssText = cssText;
            } catch ( e ) {
            }
            if ( ti != null ) {
                // clearImmediate
                clearTimeout ( ti );
            }
        }
        //如果当前styleSheet还不能用，则放到异步中则行
        if ( style.styleSheet.disabled ) {
            ti = setTimeout ( func , 100 );
        } else {
            func ();
        }
    } else { //w3c
        //w3c浏览器中只要创建文本节点插入到style元素中就行了
        let textNode = document.createTextNode ( cssText );
        style.appendChild ( textNode );
    }
    head.appendChild ( style ); //把创建的style元素插入到head中
}

export function $ColorReverse ( o ) {
    //反转颜色
    o = "0x" + o.replace ( /#/g , "" );
    let str = "000000" + ( 0xffffff - o ).toString ( 16 );
    return "#" + str.substring ( str.length - 6 , str.length );
}

export function $dataFormat ( data ) {
    let colors = require ( "@/web-config/color.js" );
    try {
        switch ( Vue.prototype.$type ( data ) ) {
            case "[object String]":
                return data.substr ( 0 , 10 );
            case "[object Number]":
                return data.toFixed ( 2 );
            case "[object Array]":
                let ahtml = "";
                if ( data.length > 0 ) {
                    if ( Vue.prototype.$type ( data[ 0 ] ) == "[object Object]" ) {
                        ahtml = JSON.stringify ( data ).substr ( 0 , 10 );
                    } else {
                        data.forEach ( e => {
                            ahtml += e;
                        } );
                    }
                }
                return ahtml;
            case "[object Object]":
                let ohtml = "";
                let colorio = 0;
                for ( let k in data ) {
                    if ( data.hasOwnProperty ( k ) ) {
                        let e = `<div style="color:${colors[ colorio ]}">${k}:${
                            data[ k ]
                            }</div>`;
                        ohtml += e;
                        colorio++;
                    }
                }
                return ohtml;
            default:
                return JSON.stringify ( data ).substr ( 0 , 10 );
        }
    } catch ( e ) {
        return JSON.stringify ( data );
    }
}

export function $analogKeyboard ( el , evtType , keyCode ) {
    let evtObj;
    if ( document.createEvent ) {
        if ( window.KeyEvent ) { //firefox 浏览器下模拟事件
            evtObj = document.createEvent ( 'KeyEvents' );
            evtObj.initKeyEvent ( evtType , true , true , window , true , false , false , false , keyCode , 0 );
        } else { //chrome 浏览器下模拟事件
            evtObj = document.createEvent ( 'UIEvents' );
            evtObj.initUIEvent ( evtType , true , true , window , 1 );
            
            delete evtObj.keyCode;
            if ( typeof evtObj.keyCode === undefined ) { //为了模拟keycode
                Object.defineProperty ( evtObj , "keyCode" , {
                    value : keyCode
                } );
            } else {
                evtObj.key = String.fromCharCode ( keyCode );
            }
            
            if ( typeof evtObj.ctrlKey === 'undefined' ) { //为了模拟ctrl键
                Object.defineProperty ( evtObj , "ctrlKey" , {
                    value : true
                } );
            } else {
                evtObj.ctrlKey = true;
            }
        }
        el.dispatchEvent ( evtObj );
        
    } else if ( document.createEventObject ) { //IE 浏览器下模拟事件
        evtObj = document.createEventObject ();
        evtObj.keyCode = keyCode
        el.fireEvent ( 'on' + evtType , evtObj );
    }
}

/**
 * 产生随机整数，包含下限值，包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之间的一个随机整数
 */
export function $random ( lower , upper ) {
    return Math.floor ( Math.random () * ( upper - lower + 1 ) ) + lower;
}

export function $randomColor () {
    // 随机生成 rgb 值，每个颜色值在 0 - 255 之间
    var r = random ( 0 , 256 ) ,
        g = random ( 0 , 256 ) ,
        b = random ( 0 , 256 );
    // 连接字符串的结果
    var result = "rgb(" + r + "," + g + "," + b + ")";
    // 返回结果
    return result;
}

// cellDataFormat(r, c) {
//   let iof = c.property.indexOf(".");
//   if (iof == -1) {
//     return r[c.property];
//   } else {
//     let s = c.property.substring(0, iof);
//     let e = c.property.substring(iof + 1, c.property.length);
//     let data = r[s][e];
//     return {
//       data,
//       s,
//       e,
//     };
//   }
// },

export function formData ( item ) {
    //转换成表单
    let form = new FormData ();
    // let logF = object.entries();
    // for (; ;) {
    //   let i = logF.next();
    //   if (i.done) break;
    // }
    for ( let key in item ) {
        form.append ( key , item[ key ] );
    }
    return form;
}

/*-----------------cookie---------------------*/

/*设置cookie*/
export function setCookie ( name , value , day ) {
    let setting = arguments[ 0 ];
    if ( Object.prototype.toString.call ( setting ).slice ( 8 , -1 ) === 'Object' ) {
        for ( let i in setting ) {
            let oDate = new Date ();
            oDate.setDate ( oDate.getDate () + day );
            document.cookie = i + '=' + setting[ i ] + ';expires=' + oDate;
        }
    } else {
        let oDate = new Date ();
        oDate.setDate ( oDate.getDate () + day );
        document.cookie = name + '=' + value + ';expires=' + oDate;
    }
}

/*获取cookie*/
export function getCookie ( name ) {
    let arr = document.cookie.split ( '; ' );
    for ( let i = 0 ; i < arr.length ; i++ ) {
        let arr2 = arr[ i ].split ( '=' );
        if ( arr2[ 0 ] == name ) {
            return arr2[ 1 ];
        }
    }
    return '';
}

/*删除cookie*/
export function removeCookie ( name ) {
    setCookie ( name , 1 , -1 );
}

/*-----------------localStorage---------------------*/

/*设置localStorage*/
export function setLocal ( key , val ) {
    let ls = window.localStorage;
    // let setting = arguments[0];
    // if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
    //     for (let i in setting) {
    //         ls.setItem(i, JSON.stringify(setting[i]))
    //     }
    // } else {
    let allLoacl = getLocal ( "allLoacl" );
    // if ( allLoacl == null ) {
    //     let nullObj = {};
    //     nullObj[ key ] = val;
    //     ls.setItem ( "allLoacl" , JSON.stringify ( nullObj ) )
    // } else {
    allLoacl[ key ] = val;
    ls.setItem ( "allLoacl" , JSON.stringify ( allLoacl ) );
    // }
    // }
}

/*获取localStorage*/
export function getLocal ( key , value = {} ) {
    let ls = window.localStorage;
    try {
        let data = JSON.parse ( ls.getItem ( "allLoacl" ) );
        if ( data == null ) {
            return value;
        } else if ( key === "allLoacl" ) {
            return data;
        } else if ( !!data[ key ] && data[ key ] != undefined ) {
            return data[ key ];
        } else {
            return value;
        }
    } catch ( error ) {
        return value;
    }
    
}

/*移除localStorage*/
export function removeLocal ( key ) {
    let ls = window.localStorage;
    ls.removeItem ( key )
}

/*移除所有localStorage*/
export function clearLocal () {
    let ls = window.localStorage;
    ls.clear ()
}

/*-----------------sessionStorage---------------------*/

/*设置sessionStorage*/
export function setSession ( key , val ) {
    let ss = window.sessionStorage;
    let setting = arguments[ 0 ];
    if ( Object.prototype.toString.call ( setting ).slice ( 8 , -1 ) === 'Object' ) {
        for ( let i in setting ) {
            ss.setItem ( i , JSON.stringify ( setting[ i ] ) )
        }
        
    } else {
        ss.setItem ( key , JSON.stringify ( val ) )
    }
}

/*获取sessionStorage*/
export function getSession ( key ) {
    let ss = window.sessionStorage;
    if ( key ) return JSON.parse ( ss.getItem ( key ) )
    return null;
}

/*移除sessionStorage*/
export function removeSession ( key ) {
    let ss = window.sessionStorage;
    ss.removeItem ( key )
}

/*移除所有sessionStorage*/
export function clearSession () {
    let ss = window.sessionStorage;
    ss.clear ()
}
