<template>
    <div
            class="shadow w100 h100 mainTag"
            ref="VertRollS"
            :style="{height:DHeight}"
            @mousewheel="VetMouseWheel"
            @mouseleave="autoFun"
            @mouseover="clearTimer"
    >
        <transition-group>
            <el-row
                    v-for=" (items,index) in data "
                    :ref="`VertRollSItem`"
                    :style=" {height:height} "
                    :key="items.index"
                    class="list-complete-item w100"
                    @click.native="liCilck(items)"
                    type="flex"
                    align="middle"
            >
                <fragment v-if=" index < showNum " :key="items.index">
                    <el-col
                            v-for=" (item,index) in items.obj "
                            :key="index"
                            :span=" item.length"
                            :style=" { height:height,textAlign:item.align ? item.align : 'left' ,
            background: item.background ? item.background : '',
            borderRadius:'0.26041vw',lineHeight:height} "
                            :offset=" item.offset ? item.offset : 0 "
                            class="notLineFeed"
                    >{{item.text}}
                    </el-col>
                </fragment>
            </el-row>
        </transition-group>
    </div>
</template>

<script>
    import { $addCSS } from "@/function";

    export default {
        name : "VertRollS" ,
        data () {
            return {
                timer : null ,
                s : 0 ,
                data : [
                    {
                        index : 1 ,
                        obj : [
                            {
                                length : 18 ,
                                text : "这是隔6长18居中" ,
                                align : "center" ,
                                offset : 6 ,
                                background : "#e366b3"
                            }
                        ]
                    } , {
                        index : 2 ,
                        obj : [
                            {
                                length : 4 ,
                                text : "这是隔4长4居中" ,
                                align : "center" ,
                                offset : 4 ,
                                background : "#78ffe4"
                            } ,
                            {
                                length : 6 ,
                                text : "这是隔18长6居中" ,
                                align : "center" ,
                                offset : 10 ,
                                background : "#c8ff66"
                            }
                        ]
                    } , {
                        index : 3 ,
                        obj : [
                            {
                                length : 6 ,
                                text : "这是隔3长6居右" ,
                                align : "right" ,
                                offset : 3 ,
                                background : "#49f8a8"
                            } ,
                            {
                                length : 12 ,
                                text : "这是隔3长12居左" ,
                                align : "left" ,
                                offset : 3 ,
                                background : "#f16ad0"
                            }
                        ]
                    } , {
                        index : 4 ,
                        obj : [
                            {
                                length : 6 ,
                                text : "这是隔2长6居左" ,
                                align : "left" ,
                                offset : 2 ,
                                background : "#eb3049"
                            } ,
                            {
                                length : 6 ,
                                text : "这是隔2长6居中" ,
                                align : "center" ,
                                offset : 2 ,
                                background : "#1b5aff"
                            } ,
                            {
                                length : 8 ,
                                text : "这是隔0长8居右" ,
                                align : "right" ,
                                offset : 0 ,
                                background : "#26ff5c"
                            }
                        ]
                    } , {
                        index : 5 ,
                        obj : [
                            {
                                length : 5 ,
                                text : "这是隔1长5居右" ,
                                align : "right" ,
                                offset : 1 ,
                                background : "#3dbf45"
                            } ,
                            {
                                length : 6 ,
                                text :
                                    "这是隔0长6居左" ,
                                align : "left" ,
                                offset : 0 ,
                                background : "#e7a05c"
                            } ,
                            {
                                length : 4 ,
                                text : "这是隔2长4居右" ,
                                align : "right" ,
                                offset : 2 ,
                                background : "#3ab5bf"
                            } ,
                            {
                                length : 6 ,
                                text : "这是隔0长6居右" ,
                                align : "right" ,
                                offset : 0 ,
                            }
                        ]
                    } , {
                        index : 6 ,
                        obj : [
                            {
                                length : 24 ,
                                text : "这是长24居中" ,
                                align : "center" ,
                                offset : 0 ,
                                background : "#ffe4df"
                            }
                        ]
                    } , {
                        index : 7 ,
                        obj : [
                            {
                                length : 24 ,
                                text : "这是长24居左无颜色" ,
                                align : "left" ,
                                offset : 0 ,
                            }
                        ]
                    } , {
                        index : 8 ,
                        obj : [
                            {
                                length : 24 ,
                                text : "这是长24居右颜色" ,
                                align : "right" ,
                                offset : 0 ,
                                background : "#dae6de"
                            }
                        ]
                    } , {
                        index : 9 ,
                        obj : [
                            {
                                length : 8 ,
                                text : "这是长8居右" ,
                                align : "right" ,
                                offset : 0 ,
                                background : "#a4e6da"
                            } , {
                                length : 8 ,
                                text : "这是长8居中" ,
                                align : "center" ,
                                offset : 0 ,
                                background : "#e6d0c8"
                            } , {
                                length : 4 ,
                                text : "这是长4居左" ,
                                align : "left" ,
                                offset : 0 ,
                                background : "#ade6e0"
                            }
                        ]
                    } , {
                        index : 10 ,
                        obj : [
                            {
                                length : 12 ,
                                text : "这是长12居右" ,
                                align : "right" ,
                                offset : 0 ,
                                background : "#e6ad4b"
                            } , {
                                length : 12 ,
                                text : "这是长12居中" ,
                                align : "center" ,
                                offset : 0 ,
                                background : "#d775e6"
                            }
                        ]
                    } , {
                        index : 11 ,
                        obj : [
                            {
                                length : 5 ,
                                text : "这是隔1长5居右" ,
                                align : "right" ,
                                offset : 1 ,
                                background : "#3dbf45"
                            } ,
                            {
                                length : 6 ,
                                text :
                                    "这是隔0长6居左" ,
                                align : "left" ,
                                offset : 0 ,
                                background : "#e7a05c"
                            } ,
                            {
                                length : 4 ,
                                text : "这是隔2长4居右" ,
                                align : "right" ,
                                offset : 2 ,
                                background : "#3ab5bf"
                            } ,
                            {
                                length : 3 ,
                                text : "这是隔0长3居右" ,
                                align : "right" ,
                                offset : 0 ,
                                background : "#e6a038"
                            }
                        ]
                    } , {
                        index : 12 ,
                        obj : [
                            {
                                length : 6 ,
                                text : "这是隔2长6居左" ,
                                align : "left" ,
                                offset : 2 ,
                                background : "#2eebb7"
                            } ,
                            {
                                length : 8 ,
                                text : "这是隔0长8居中" ,
                                align : "center" ,
                                offset : 0 ,
                                background : "#53fcff"
                            } ,
                            {
                                length : 8 ,
                                text : "这是隔0长8居右" ,
                                align : "right" ,
                                offset : 0 ,
                                background : "#ec14ff"
                            }
                        ]
                    } , {
                        index : 13 ,
                        obj : [
                            {
                                length : 12 ,
                                text : "这是长12居左" ,
                                align : "left" ,
                                offset : 0 ,
                                background : "#cdffc0"
                            }
                        ]
                    } , {
                        index : 14 ,
                        obj : [
                            {
                                length : 12 ,
                                text : "这是长12居左" ,
                                align : "left" ,
                                offset : 12 ,
                                background : "#71fffc"
                            }
                        ]
                    } , {
                        index : 15 ,
                        obj : [
                            {
                                length : 12 ,
                                text : "这是隔12长12居左" ,
                                align : "left" ,
                                offset : 12 ,
                                background : "#ffac55"
                            }
                        ]
                    } , {
                        index : 16 ,
                        obj : [
                            {
                                length : 12 ,
                                text : "这是隔6长12居左" ,
                                align : "center" ,
                                offset : 6 ,
                                background : "#abb8ff"
                            }
                        ]
                    }
                ]
            };
        } ,
        props : {
            vShowNum : {
                type : Number ,
                default : 99
            } ,
            aniTime : {
                type : Number ,
                default : 4
            } ,
            height : {
                type : String ,
                default : "30px"
            } ,
            DHeight : {
                type : String ,
                default : "99.9%"
            } ,
            vData : {
                type : Array ,
                default : null
            }
        } ,
        computed : {
            showNum : {
                get () {
                    return this.s;
                } ,
                set ( v ) {
                    this.s = v;
                }
            }
        } ,
        watch : {
            vData : {
                handler ( n , o ) {
                    if ( n != null ) this.data = n;
                } ,
                deep : true ,
                immediate : true
            }
        } ,
        methods : {
            handlerHeight () {
                // let dh = parseFloat ( this.DHeight );
                let dh = parseFloat ( this.$refs.VertRollS.offsetHeight );
                let h = parseFloat ( this.height );
                let n = this.vShowNum;
                let i = Math.floor ( dh / h );
                if ( n > i ) {
                    this.s = i;
                }
            } ,
            shuffle : function ( i ) {
                $addCSS (
                    `.list-complete-item{transition: all ${i ? i : 4}s;display: block;}`
                );
                let item = this.data[ 0 ];
                this.data.splice ( this.data.length , 0 , item );
                this.data.splice ( 0 , 1 );
            } ,
            adShuffle () {
                $addCSS ( ".list-complete-item{transition: all 0s;display: block;}" );
                let item = this.data[ this.data.length - 1 ];
                this.data.splice ( 0 , 0 , item );
                this.data.splice ( this.data.length - 1 , 1 );
            } ,
            liCilck ( items ) {
                this.$emit ( "onClick" , items );
            } ,
            autoFun () {
                if ( this.timer == null ) {
                    if ( this.showNum < this.data.length ) {
                        this.timer = setInterval ( this.shuffle , this.aniTime * 1000 );
                    }
                }
            } ,
            clearTimer () {
                if ( this.timer != null ) {
                    clearInterval ( this.timer ); //关闭
                }
                this.timer = null;
            } ,
            VetMouseWheel ( e ) {
                let isDown = e.deltaY > 0;
                if ( isDown ) {
                    this.shuffle ( 0.1 );
                } else {
                    this.adShuffle ();
                }
            }
        } ,
        mounted () {
            this.handlerHeight ();
            this.autoFun ();
            window.addEventListener ( "resize" , this.handlerHeight );
        } ,
        beforeDestroy () {
            this.clearTimer ();
            window.removeEventListener ( "resize" , this.handlerHeight );
        }
    };
</script>