// import Mock from 'mockjs';
import { $random } from "@/function"

const Mock = require ( 'mockjs' );
const h = `http://localhost:5233`
const role = { admin : 5233 , tourist : 5232 , users : 5231 , other : 5230 }
const success = { code : 200 , message : "成功" }
const warning = { code : 300 , message : "未成功" }
const danger = { code : 400 , message : "失败" }
const login = function ( r ) {
    let b = JSON.parse ( r.body );
    let u = b.username;
    if ( u == b.password ) {
        let userrole;
        let userid;
        if ( role.hasOwnProperty ( u ) ) {
            userrole = role[ u ];
            userid = `userid_${u}`;
        } else {
            userrole = role.other;
            userid = `userid_other`;
        }
        let res = {
            data : { username : Mock.mock ( `@name` ) , userrole , userid , token : Mock.mock ( `@String(30)` ) } ,
            ...success
        }
        return res;
    } else {
        return danger;
    }
}
const table = function ( r ) {
    let b = JSON.parse ( r.body );
    let page = b.page;
    let pageSize = b.pageSize;
    let reqData = b.data;
    let maxState = b.maxState;
    
    if ( page < 1 || page == undefined ) {
        page = 1
    }
    if ( pageSize == undefined ) {
        pageSize = 30;
    }
    if ( maxState == undefined ) {
        maxState = 4;
    }
    
    let start = ( page - 1 ) * pageSize
    let end = page * pageSize;
    
    let resData = [];
    for ( start ; start < end ; start++ ) {
        let handReqData = reqData.map ( ( e , i ) => {
            return e + ( start + 1 );
        } );
        let resObj = {};
        reqData.forEach ( ( e , i ) => {
            resObj[ e ] = handReqData[ i ]
        } );
        resData.push ( { ...resObj , state : $random ( 1 , maxState ) } )
    }
    
    let res = {
        data : resData ,
        total : 300 ,
        ...success
    }
    return res;
}
Mock.mock ( h + `/user/login` , 'post' , login );
Mock.mock ( h + `/data/table` , 'post' , table );
export default Mock;
