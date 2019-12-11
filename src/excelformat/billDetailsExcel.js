import Vue from 'vue'
function align(t, tt) {
    let sz = 12;
    let bold = false;
    if (tt) {
        sz = 14;
        bold = true
    }
    return { alignment: { horizontal: t, vertical: 'center' }, font: { name: "仿宋", sz, color: "#000000", bold } }
}
export default function test(n, o) {
    let exc = {
        SheetNames: [],
        Sheets: {}
    }
    o.forEach(e => {
        let p = {};
        Vue.set(p, "!cols", [{ wch: 24 }]);
        Vue.set(p, "!merges", [{ s: { c: 0, r: 0 }, e: { c: 4, r: 0 } }]);

        Vue.set(p, "A1", { v: e.content, s: align("center") });

        Vue.set(p, "!ref", "A1:H2");
        exc.SheetNames.push(e.title);
        Vue.set(exc.Sheets, e.title, p);

    });
    require("@/function/excel.js").default(n, exc);
}

