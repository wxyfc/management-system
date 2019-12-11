require("file-saver");
let XLSX = require("xlsx");
//需要xlsx 现在换为了xlsx-style
export default function exportExcel(id) {
    let t = XLSX.utils.table_to_book(document.getElementById(id));
    let xw = XLSX.write(t, { bookType: 'xlsx', bookSST: true, type: 'array' });
    try {
        let td = new Blob([xw], { type: "application/octet-stream" });
        saveAs(td, id + ".xlsx")
    } catch (e) {
        console.error(e, xw);
    }
}