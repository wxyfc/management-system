import Vue from 'vue'
export default function test(n, o) {
    let s = {
        alignment: {
            horizontal: "center", vertical: "center"
        },
        font: {
            name: "仿宋",
            sz: 12,
            color: "#000000",
            bold: true
        }
    };
    let exc = {
        SheetNames: [],
        Sheets: {}
    }
    o.forEach(e => {
        let p = {};
        Vue.set(p, "!cols", [{ wch: 24 }]);
        Vue.set(p, "!merges", [{ s: { c: 0, r: 0 }, e: { c: 4, r: 0 } }]);

        Vue.set(p, "A1", { v: e.content, s });

        Vue.set(p, "!ref", "A1:H2");
        exc.SheetNames.push(e.title);
        Vue.set(exc.Sheets, e.title, p);

    });
    require("@/function/excel.js").default(n, exc);
}

