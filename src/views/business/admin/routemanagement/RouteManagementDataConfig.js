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
            prop: "name",
            align: "right",
            label: language.menuName,
            fixed: true,
        },
        {
            width: "220",
            prop: "url",
            align: "right",
            label: language.menuUrl,
            fixed: true,
        },
        {
            width: "220",
            prop: "requestMode",
            align: "right",
            label: language.requestMode,
            fixed: true,
        },
    ]
    return arr;
};