import store from '@/store';

export default function f () {
    let language = store.getters.getLanguage;
    // align: "right",
    // width: "100",
    // prop: "test",
    // label: "test",
    // sortable: true,
    // fixed: true,
    // format: true,
    // json:true
    let arr = [
        {
            width : "220" ,
            prop : "username" ,
            align : "right" ,
            label : language.userName ,
            fixed : true ,
        } ,
        {
            width : "220" ,
            prop : "email" ,
            align : "right" ,
            label : language.email ,
            fixed : true ,
        } ,
        {
            width : "220" ,
            prop : "state" ,
            align : "center" ,
            label : language.switchState ,
            fixed : true ,
        } ,
    ]
    return arr;
};