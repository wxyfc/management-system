
import colors from "@/web-config/color.js";
function hf(data, dataC) {
    let d = []
    data.forEach(e => {
        let c = [];
        if (e[dataC.children] != null && e[dataC.children].length >= 1) {
            c = hf(e[dataC.children], dataC);
        }
        let itemStyle = {};
        let label = {};
        let Color = colors[e[dataC.type]];
        let opacity = e.opacity;
        // if (e.type == 998) {
        //     itemStyle = {
        //         borderColor: Color ? Color : "#666",
        //         color: Color ? Color : "#666",
        //         borderType: "dotted",
        //         opacity: opacity == 0 ? opacity : 1,
        //         borderWidth: 1
        //     }
        // } else {
        itemStyle = {
            borderColor: Color ? Color : "#000",
            color: Color ? Color : "#000",
            borderType: "solid",
            opacity: opacity == 0 ? 0.1 : 1,
            borderWidth: 2
        }
        label = {
            color: Color ? Color : "#000"
        }
        // }
        d.push({
            children: c,
            name: e[dataC.name] + "\n" + e[dataC.id],
            id: e[dataC.id],
            layer: e.layer,
            type: e[dataC.type],
            itemStyle,
            label,
        });
    });
    return d;
}
function hd(l) {
    let w1 = [{ top: '15%', left: '15%', bottom: '15%', right: '15%' }]

    let w2 = [{ top: '15%', left: '15%', bottom: '55%', right: '15%' },
    { top: '55%', left: '15%', bottom: '15%', right: '15%' }]

    let w4 = [{ top: '15%', left: '15%', bottom: '55%', right: '55%' },
    { top: '15%', left: '55%', bottom: '55%', right: '15%' },
    { top: '55%', left: '15%', bottom: '15%', right: '55%' },
    { top: '55%', left: '55%', bottom: '15%', right: '15%' }]

    let wl = [0, w1, w2, w4, w4]
    return wl[l]
}
export default function (data, orient, dataC) {
    if (!orient) orient = "LR"
    let wl = hd(data.length)
    let series = []
    if (!dataC) {
        dataC = { name: "name", id: "id", type: "type", children: "children" }
    }
    data.forEach((e, i) => {
        let w = wl[i]
        let o = Object.assign({
            type: 'tree',
            data: hf(e, dataC),
            orient,
            initialTreeDepth: -1,
            symbolSize: 20,
            label: {
                normal: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 14,
                },
            },
            lineStyle: {
                curveness: 1
            },
            leaves: {
                label: {
                    normal: {
                        position: 'bottom',
                        verticalAlign: 'top',
                        align: 'center'
                    }
                }
            },
        }, w);
        series.push(o)
    });
    let option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series
    };
    return option;
}