import store from '@/store';

export default function f() {
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
            width: "220",
            prop: "rolename",
            align: "right",
            label: language.roleName,
            fixed: true,
        },
    ]
    return arr;
};