<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-row class="padding1vw alnrit" style="height:15%;">
            <el-col :xs="24" :sm="24" :md="12" :lg="14" :xl="16" class="margin1vw-t">
                {{ language.tableSingMultUsage }}：
                <el-radio-group v-model="tableSingMultUsageMode">
                    <el-radio-button label="multiple">{{ language.multipleSelect }}</el-radio-button>
                    <el-radio-button label="single">{{ language.singleSelect }}</el-radio-button>
                </el-radio-group>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8" class="margin1vw-t">
                <mdb :tooltip="language.excelSelectRecordedInfoTooltip" class="margin1vw-r" :disabled="buttonSelectDisabled" @click="exportSelectItemFun">{{ language.exportSelectItem }}</mdb>
                <mdb :disabled="buttonSelectDisabled" @click="showLastSelectFun">{{ language.showLastSelect }}</mdb>
            </el-col>
        </el-row>
        <el-row style="height:80%;" class="padding1vw">
            <el-col :xs="24" :sm="24" :md="12" :lg="14" :xl="16" class="margin1vw-t h100">
                <UiPageTable
                        ref="tableSingMultUsage"
                        :tableData="dataList"
                        :TableConfig="TableConfig"
                        :PageConfig="PageConfig"
                        :DataConfig="DataConfig"
                        @clickPage="clickPage"
                        @select="selectTable"
                ></UiPageTable>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8" class="margin1vw-t h100">
                <el-form label-width="50%">
                    <el-form-item>
                        <span slot="label" class="emphasize"></span>
                        {{ language.addExportItem }}
                    </el-form-item>
                    <el-form-item>
                        <span slot="label" class="emphasize">{{language.tableItemShowWidth}}</span>
                        <el-input-number v-model="addDataConfigFormItem.width" :min="100" :max="400" class="width50"></el-input-number>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label" class="emphasize">{{language.tableItemShowTh}}</span>
                        <el-input v-model="addDataConfigFormItem.label" class="width50"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label" class="emphasize">{{language.tableItemShowValue}}</span>
                        <el-input v-model="addDataConfigFormItem.prop" class="width50"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label" class="emphasize">{{language.tableItemShowAlignMethod}}</span>
                        <el-radio-group v-model="addDataConfigFormItem.align">
                            <el-radio-button label="left"></el-radio-button>
                            <el-radio-button label="center"></el-radio-button>
                            <el-radio-button label="right"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label" class="emphasize">{{language.isExpandItem}}</span>
                        <el-radio-group v-model="addDataConfigFormItem.type">
                            <el-radio-button label="expand">{{ language.expand }}</el-radio-button>
                            <el-radio-button label="common">{{ language.common }}</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <mdb :tooltip="language.isTableItemShowValueNullNotAddTooltip" :disabled="addDataConfigFormItem.prop==''" @click="tableExpandUsageAddTableItemFun">{{ language.sureAdd }}</mdb>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <component :is="is" :show="dialogShow" :data="dialogData" @onColse="onColse"></component>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "tableSingMultUsage" ,
        data () {
            return {
                TableConfig : {
                    border : true ,
                    stripe : true ,
                    highlight : true ,
                    multiple : false ,
                    single : false ,
                    disabled : false
                } ,
                page : 1 ,
                pageSize : 30 ,
                total : 0 ,
                dataList : [] ,
                selectTableItem : null ,
                addDataConfig : [] ,
                addDataConfigForm : {} ,
                addDataConfigFormItem : {
                    width : 220 ,
                    prop : "export" ,
                    align : "left" ,
                    label : "addTest" ,
                    type : "common"
                } ,
                tableSingMultUsageMode : "single" ,
                TableSingMultUsageDataConfig : require ( "./TableSingMultUsageDataConfig.js" ).default () ,
                dialogData : {} ,
                dialogShow : false ,
                is : "TableSingMultUsageDialog"
            };
        } ,
        components : {
            UiPageTable : () => import("@/assets/UiPageTable") ,
            TableSingMultUsageDialog : () => import("./TableSingMultUsageDialog")
        } ,
        watch : {
            tableSingMultUsageMode : {
                deep : true ,
                immediate : true ,
                handler ( newv , oldv ) {
                    this.$set ( this.TableConfig , "multiple" , false );
                    this.$set ( this.TableConfig , "single" , false );
                    this.$set ( this.TableConfig , newv , true );
                }
            }
        } ,
        computed : {
            buttonSelectDisabled () {
                if ( this.TableConfig.single == true && this.selectTableItem != null ) {
                    return !this.selectTableItem.hasOwnProperty ( 'username' );
                }
                else if ( this.TableConfig.multiple == true && this.selectTableItem != null ) {
                    return !this.selectTableItem.length > 0;
                } else {
                    return true
                }
            } ,
            PageConfig () {
                return {
                    total : this.total ,
                    size : this.pageSize
                };
            } ,
            addRequestDataConfig () {
                let list = [ "username" , "email" , "remarks" ];
                return list.concat ( Object.keys ( this.addDataConfigForm ) );
                
            } ,
            DataConfig () {
                return this.TableSingMultUsageDataConfig.concat ( this.addDataConfig );
            }
        } ,
        methods : {
            onColse ( v ) {
                this.dialogShow = v;
            } ,
            showLastSelectFun () {
                if ( this.TableConfig.single == true && this.selectTableItem != null ) {
                    this.dialogData = this.selectTableItem;
                }
                else if ( this.TableConfig.multiple == true && this.selectTableItem != null ) {
                    this.dialogData = this.selectTableItem[ this.selectTableItem.length - 1 ];
                }
                this.dialogShow = true;
            } ,
            exportSelectItemFun () {
                let list = [];
                if ( this.TableConfig.single == true && this.selectTableItem != null ) {
                    list = [ this.selectTableItem ];
                }
                else if ( this.TableConfig.multiple == true && this.selectTableItem != null ) {
                    list = this.selectTableItem;
                }
                require ( "@/excelformat/seeGetExcel.js" ).default (
                    this.language[ this.$options.name ] ,
                    [
                        {
                            name : this.language[ this.$options.name ] ,
                            list ,
                        }
                    ] ,
                    this.DataConfig
                );
            } ,
            tableExpandUsageAddTableItemFun () {
                let obj = this.$avoid ( this.addDataConfigFormItem );
                this.$set ( this.addDataConfigForm , this.addDataConfigFormItem.prop , obj );
                this.addDataConfig = Object.values ( this.addDataConfigForm );
                this.$refs.tableSingMultUsage.resetPage ();
            } ,
            clickPage ( d , l ) {
                this.page = d;
                this.pageSize = l;
                this.getRequest ();
            } ,
            selectTable ( t ) {
                if ( this.TableConfig.single == true ) {
                    let l = t.length;
                    this.selectTableItem = l > 0 ? this.$avoid ( t[ l - 1 ] ) : {};
                }
                else if ( this.TableConfig.multiple == true ) {
                    this.selectTableItem = t;
                }
            } ,
            getRequest () {
                this.post ( `/data/table` , {
                    page : this.page ,
                    pageSize : this.pageSize ,
                    data : this.addRequestDataConfig
                } ).then ( res => {
                    this.dataList = res.data;
                    this.total = res.total;
                } );
            } ,
        } ,
        mounted () {
            this.getRequest ();
        }
    };
</script>