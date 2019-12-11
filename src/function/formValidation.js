import store from '@/store';

const language = store.getters.getLanguage;

let regularTel = (rule, value, callback) => {
    // let p= /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$|(0\d{10})$/;
    // let z = /^1(3|4|5|6|7|8)\d{9}$/;
    if (value === "") {
        callback(new Error(language.pleaseTel));
    } else if (/^((0\d{2,3}-\d{7,8})|(1[73584]\d{9}))$/.test(value)) {
        callback();
    } else {
        callback(new Error(language.illegalTel));
    }
};
let regularPostel = (rule, value, callback) => {
    if (value === "") {
        callback(new Error(language.pleasePostel));
    } else if (!/^[0-9]{6}$/.test(value)) {
        callback(new Error(language.illegalPostel));
    } else {
        callback();
    }
};
let regularMail = (rule, value, callback) => {
    if (value === "") {
        callback(new Error(language.pleaseEail));
    } else if (
        !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
            value
        )
    ) {
        callback(new Error(language.illegalEail));
    } else {
        callback();
    }
};

let regularNumber = (rule, value, callback) => {
    // let patten = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
    let patten = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    if (!value || value == "") {
        callback(new Error(language.pleaseNumber));
    } else if (!patten.test(value) || value <= 0) {
        callback(new Error(language.illegalNumber));
    } else {
        callback();
    }
};

let regularCardID = (rule, value, callback) => {
    // let patten = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    let patten = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (!value || value == "") {
        callback(new Error(language.pleaseCardID));
    } else if (!patten.test(value)) {
        callback(new Error(language.illegalCardID));
    } else {
        callback();
    }
};

let regularBool = (rule, value, callback) => {
    if (!value || value == "") {
        callback(new Error(language.unselected));
    } else {
        callback();
    }
};

let regularObj = (rule, value, callback) => {
    if (!value || value == undefined || Object.keys(value).length == 0) {
        callback(new Error(language.unselected));
    } else {
        callback();
    }
};

let regularText = (rule, value, callback) => {
    if (!value || value == "" || value.length == 0) {
        callback(new Error(language.uninput));
    } else {
        callback();
    }
};

let msgUnSelect = { required: true, message: language.unselected, trigger: ['blur'] };//必须选择
let msgUnRegInput = { validator: regularText, trigger: ['blur'] };//必须选择
let msgUnInput = { required: true, message: language.uninput, trigger: ['blur'] };//必须输入
let msgNumType = { type: 'number', message: language.pleaseNumber, trigger: ['blur'] };//必须为数值类型
let msgTNumType = { validator: regularNumber, trigger: ['blur'] };//数值或者两位小数
let msgMail = { validator: regularMail, trigger: ['blur'] };//邮箱
let msgPostel = { validator: regularPostel, trigger: ['blur'] };//邮编
let msgTel = { validator: regularTel, trigger: ['blur'] };//电话或者手机
let msgCardID = { validator: regularCardID, trigger: ['blur'] };//身份证号
let msgBool = { validator: regularBool, trigger: ['blur'] };//boolean
let msgObj = { validator: regularObj, trigger: ['blur'] };//object

let formVali = {
    factors: [msgUnInput],
    mode: [msgUnSelect],
    title: [msgUnSelect],
    name: [msgUnInput],
    preiod: [msgUnSelect],
    outputduty: [msgUnSelect],
    code: [msgUnInput],
    sourcecode: [msgUnInput],
    outputcode: [msgUnInput],
    Zongid: [msgUnSelect],
    Pid: [msgUnSelect],
    Type: [msgUnSelect],
    type: [msgUnSelect],
    Status: [msgUnSelect],
    numType: [msgNumType, msgUnInput],
    numTType: [msgTNumType, msgUnInput],
    mail: [msgMail, msgUnInput],
    postel: [msgPostel, msgUnInput],
    tel: [msgTel, msgUnInput],
    cardId: [msgCardID, msgUnInput],
    input: [msgUnRegInput],
    select: [msgUnSelect],
    boolean: [msgBool],
    object: [msgObj],
}
export default formVali;