<template>
    <!-- <div class="w100 h100 alncnt"  v-if="isActivated"> -->
    <div class="w100 h100 alncnt">
        <el-tooltip
                placement="top-end"
                :disabled="!(TableConfig.multiple || TableConfig.single)||thisNotShow"
                class="bttooltip"
        >
            <div slot="content">
                {{language.tableSelectTooltip}}
                <br>
                <mdb type="text" @click="thisNotShow=true">{{language.thisNotShow}}</mdb>
                <mdb type="text" @click="tableNotShowFun">{{language.tableNotShow}}</mdb>
            </div>
            <el-table
                    ref="meltable"
                    :data="tableData"
                    :border="TableConfig.border"
                    :stripe="TableConfig.stripe"
                    :highlight-current-row="TableConfig.highlight"
                    :height="TableConfig.disabled ? '99.7%':'95%'"
                    :header-cell-style="headerCellStyle"
                    :cell-style="cellStyle"
                    @cell-dblclick="cellDblClick"
                    @select="select"
                    @row-dblclick="rowDb"
                    @selection-change="selectionChange"
                    @expand-change="expandChange"
            >
                <!-- 单选或者多选列 -->
                <el-table-column
                        v-if="TableConfig.multiple || TableConfig.single"
                        type="selection"
                        width="50"
                        fixed
                ></el-table-column>
                <!-- 索引列 -->
                <el-table-column type="index" width="60" align="center" fixed></el-table-column>
                <!-- 主要显示列 -->
                <el-table-column
                        v-for="(item,index) in handlerDataConfig.table"
                        :key="index"
                        :align="item.align"
                        :width="item.width*widthScale"
                        :prop="item.prop"
                        :label=" item.label ? item.label : item.prop "
                        :sortable="item.sortable"
                        :fixed="item.fixed"
                >
                    <template slot="header" slot-scope="scope">
                        <span :class="item.class ? item.class: 'tableClass' ">{{scope.column.label}}</span>
                    </template>
                    <template slot-scope="scope">
                        <pre v-if="item.json" :class="item.class ? item.class: 'tableClass' ">{{dataFormat(item.format,scope.row,scope.column)}}</pre>
                        <span
                                v-else
                                :class="item.class ? item.class: 'tableClass' "
                                v-html="dataFormat(item.format,scope.row,scope.column)"
                        ></span>
                    </template>
                </el-table-column>
                <!-- 展开列 -->
                <el-table-column v-if="handlerDataConfig.expand.length>0" type="expand">
                    <template slot-scope="scope">
                        <el-form class="w100" inline label-width="40%">
                            <fragment v-for="(item,index) in handlerDataConfig.expand" :key="index">
                                <el-form-item style="width:31%">
                  <span
                          slot="label"
                          :class="item.class ? item.class: 'tableClass' "
                  >{{item.label ? item.label : item.prop }}</span>
                                    <span
                                            :class="item.class ? item.class: 'tableClass' "
                                            v-html="dataFormat(item.format,scope.row,{property:item.prop})"
                                    ></span>
                                </el-form-item>
                            </fragment>
                        </el-form>
                    </template>
                </el-table-column>
                <!-- 可能会用到的按钮列-->
                <fragment v-if="TableConfig.button">
                    <el-table-column
                            :width="TableConfig.button.width*widthScale"
                            :fixed="TableConfig.button.fixed?TableConfig.button.fixed:'right'"
                            :label="TableConfig.button.label?TableConfig.button.label:'*'"
                            :align="TableConfig.button.align?TableConfig.button.align:'center'"
                    >
                        <template slot-scope="scope">
                            <fragment v-for="(btitem,bti) in TableConfig.button.list" :key="bti">
                                <mdb v-if="TableConfig.button.display=='show'"
                                     v-show="btitem.value.includes(scope.row[TableConfig.button.value])"
                                     :type="btitem.type"
                                     @click="handleButton(scope.row,btitem.text)"
                                     class="margin1vw-r"
                                >{{btitem.text}}
                                </mdb>
                                <mdb v-else
                                     :disabled="!btitem.value.includes(scope.row[TableConfig.button.value])"
                                     :type="btitem.type"
                                     @click="handleButton(scope.row,btitem.text)"
                                     class="margin1vw-r"
                                >{{btitem.text}}
                                </mdb>
                            </fragment>
                        </template>
                    </el-table-column>
                </fragment>
            </el-table>
        </el-tooltip>
        <!-- 分页 -->
        <el-pagination
                v-if="!TableConfig.disabled"
                :small="otherInfo.menuCollapse"
                background
                :pager-count="7"
                :layout="paginationLayout"
                :total="PageConfig.total"
                :page-size="PageConfig.size"
                :current-page="page"
                @current-change="clickPage"
                @size-change="sizeChange"
        ></el-pagination>
        <!-- layout="total, sizes, prev, pager, next, jumper" -->
    </div>
</template>

<script>
    import { cellDataFormat , $addCSS , $dataFormat } from "@/function";

    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "UiPageTable" ,
        data () {
            return {
                page : 1 ,
                pageSize : 10 ,
                widthScale : 1 ,
                singleRow : {} ,
                thisNotShow : false
                // isActivated: true
            };
        } ,
        props : {
            tableData : {
                type : Array ,
                default : () => {
                    let arr = [ { test : "test" } ];
                    return arr;
                }
            } ,
            cellStyle : {
                default : () => {
                    let c = { padding : "2px 1px" };
                    return c;
                }
            } ,
            PageConfig : {
                type : Object ,
                default : () => {
                    let obj = {
                        total : 100 ,
                        size : 10
                    };
                    return obj;
                }
            } ,
            TableConfig : {
                type : Object ,
                default : () => {
                    let obj = {
                        border : true ,
                        stripe : true ,
                        highlight : true ,
                        disabled : true
                        // multiple: false,
                        // single: false,
                        // button: {
                        //   fixed: "right",
                        //   label: "manage",
                        //   width: 100,
                        //   value:"state",
                        //   display:"show"
                        //   list: [
                        //     { text: "add", type: "primary" ,value:[] },
                        //     { text: "delete", type: "danger",value:[] }
                        //   ]
                        // }
                    };
                    return obj;
                }
            } ,
            DataConfig : {
                type : Array ,
                default : () => {
                    let arr = [
                        {
                            align : "right" ,
                            width : "100" ,
                            prop : "test" ,
                            label : "test" ,
                            sortable : true ,
                            fixed : true ,
                            format : true ,
                            json : true ,
                            type : "expand"
                        }
                    ];
                    return arr;
                }
            }
        } ,
        computed : {
            paginationLayout () {
                if ( this.otherInfo.menuCollapse == true ) {
                    return "prev, pager, next"
                } else {
                    return "total, prev, pager, next, jumper"
                }
            } ,
            handlerDataConfig () {
                let table = [];
                let expand = [];
                this.DataConfig.forEach ( e => {
                    if ( e.type == "expand" ) {
                        expand.push ( e );
                    } else {
                        table.push ( e );
                    }
                } );
                return { table , expand };
            }
        } ,
        watch : {
            "otherInfo.tableNotShow" : {
                deep : true ,
                immediate : true ,
                handler ( newv , oldv ) {
                    this.thisNotShow = newv;
                }
            } ,
            DataConfig : {
                deep : true ,
                handler ( newv , oldv ) {
                    let that = this;
                    this.$nextTick ( () => {
                        that.doLayout ();
                    } )
                }
            } ,
            TableConfig : {
                deep : true ,
                handler ( newv , oldv ) {
                    let that = this;
                    this.$nextTick ( () => {
                        that.$refs.meltable.clearSelection ();
                        that.doLayout ();
                        that.handCss ();
                    } )
                }
            } ,
        } ,
        methods : {
            widthScaleHandler () {
                if ( this.otherInfo.tableSelfAW ) {
                    let w = document.body.clientWidth;
                    let ws = w / 1920 <= 0.6 ? 0.6 : w / 1920;
                    this.widthScale = ws;
                }
                this.doLayout ();
            } ,
            handCss () {
                if ( this.TableConfig.single ) {
                    $addCSS ( ".el-checkbox__inner{ border-radius:7px;}" );
                } else {
                    $addCSS ( ".el-checkbox__inner{ border-radius:2px;}" );
                }
            } ,
            dataFormat ( is , r , c ) {
                let that = this;
                let data = cellDataFormat ( r , c );
                if ( !is ) return data;
                return that.$dataFormat ( data );
            } ,
            headerCellStyle ( o ) {
                this.handCss ();
                if ( o.columnIndex == 0 && this.TableConfig.single ) {
                    return { pointerEvents : "none" , opacity : 0.2 };
                }
            } ,
            refSelectAll () {
                this.$refs.meltable.toggleAllSelection ();
            } ,
            expandChange ( r ) {
                event.stopPropagation ();
            } ,
            cellDblClick ( r , co ) {
                if ( this.$isTrue ( co.property ) ) {
                    this.$emit ( "cellDblClick" , r , co );
                }
            } ,
            rowDb ( r , c , e ) {
                if ( this.TableConfig.single ) {
                    this.$refs.meltable.clearSelection ();
                    if ( this.singleRow != r ) {
                        this.$refs.meltable.toggleRowSelection ( r );
                        this.singleRow = r;
                        return;
                    } else {
                        this.singleRow = {};
                        return;
                    }
                } else {
                    this.$refs.meltable.toggleRowSelection ( r );
                }
            } ,
            selectionChange ( s ) {
                if ( this.TableConfig.single ) {
                    this.$emit ( "select" , s.slice ( -1 ) );
                } else {
                    this.$emit ( "select" , s );
                }
            } ,
            select ( s , r ) {
                if ( this.TableConfig.single ) {
                    this.$refs.meltable.clearSelection ();
                    if ( this.singleRow != r ) {
                        this.$refs.meltable.toggleRowSelection ( r );
                        this.singleRow = r;
                        return;
                    } else {
                        this.singleRow = {};
                        return;
                    }
                }
            } ,
            clickPage ( i ) {
                this.page = i;
                this.$emit ( "clickPage" , i , this.pageSize );
            } ,
            sizeChange ( l ) {
                this.pageSize = l;
                this.page = 1;
                this.$emit ( "clickPage" , this.page , l );
            } ,
            resetPage () {
                this.page = 1;
                this.$emit ( "clickPage" , this.page , this.pageSize );
            } ,
            handleButton ( r , b ) {
                this.$emit ( "clickButton" , r , b );
            } ,
            tableNotShowFun () {
                this.thisNotShow = true;
                this.setOtherInfo ( { tableNotShow : true } );
            } ,
            doLayout () {
                this.$nextTick ( () => {
                    this.$refs.meltable.doLayout ();
                } )
            }
        } ,
        mounted () {
            this.pageSize = this.PageConfig.size;
            window.addEventListener ( "resize" , this.widthScaleHandler );
            // this.$emit("clickPage", this.page, this.pageSize);
        } ,
        beforeDestroy () {
            window.removeEventListener ( "resize" , this.widthScaleHandler );
        } ,
        activated () {
            this.handCss ();
            this.doLayout ();
            // this.isActivated = true;
        }
        // deactivated() {
        //   this.isActivated = false;
        // }
    };
</script>