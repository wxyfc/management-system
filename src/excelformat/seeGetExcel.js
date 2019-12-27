import Vue from 'vue'

function align ( t , tt ) {
    let sz = 12;
    let bold = false;
    if ( tt ) {
        sz = 14;
        bold = true
    }
    return { alignment : { horizontal : t , vertical : 'center' } , font : { name : "仿宋" , sz , color : "#000000" , bold } }
}

export default function sg ( n , o , c ) {
    let t = 'n';
    let exc = {
        SheetNames : [] ,
        Sheets : {}
    }
    let row = [ "A" , "B" , "C" , "D" , "E" , "F" , "G" , "H" , "I" , "J" , "K" , "L" , "M" , "N" , "O" , "P" , "Q" , "R" , "S" , "T" , "U" , "V" , "W" , "X" , "Y" , "Z" ]
    o.forEach ( ( oe , oei ) => {
        let p = {};
        Vue.set ( p , "!cols" , [] );
        // Vue.set(p, "!rows", []);
        Vue.set ( p , "!merges" , [ { s : { c : 0 , r : 0 } , e : { c : c.length - 1 , r : 0 } } ] );
        Vue.set ( p , "A1" , { v : oe.name , s : align ( "center" , true ) } );
        let i = 2;
        c.forEach ( ( ce , cei ) => {
            p[ "!cols" ].push ( { wch : parseInt ( ce.width ) / 8 } );
            Vue.set ( p , row[ cei ] + i , { v : ce.label ? ce.label : ce.prop , s : align ( ce.align ? ce.align : "center" ) } );
        } )
        oe.list.forEach ( ( oee , oeei ) => {
            i++;
            // p["!rows"].push({ hpx: 40 });
            c.forEach ( ( ce , cei ) => {
                let ipf = ce.prop.indexOf ( "/" );
                let v;
                if ( ipf != -1 ) {
                    let ago = ce.prop.substring ( 0 , ipf );
                    let back = ce.prop.substring ( ipf + 1 , ce.prop.length );
                    v = `${oee[ ago ]}\n${oee[ back ]}`;
                } else {
                    v = oee[ ce.prop ]
                }
                Vue.set ( p , row[ cei ] + i , { v , s : align ( ce.align ? ce.align : "center" ) , t : ce.number == true ? "n" : "" } );
            } )
        } );
        Vue.set ( p , "!ref" , "A1:" + row[ c.length - 1 ] + i );
        exc.SheetNames.push ( oe.name );
        Vue.set ( exc.Sheets , oe.name , p );
    } );
    require ( "@/function/excel.js" ).default ( n , exc );
}