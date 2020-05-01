<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-row class="padding1vw alnrit" style="height:15%;">
            <el-col :xs="24" :sm="24" :md="12" :lg="14" :xl="16" class="margin1vw-t">
                {{ language.updataExpandItem }}：
                <el-radio-group v-model="addDataConfigItemType">
                    <el-radio-button label="expand">{{ language.expand }}</el-radio-button>
                    <el-radio-button label="common">{{ language.common }}</el-radio-button>
                </el-radio-group>
            </el-col>
        </el-row>
        <el-row style="height:80%;" class="padding1vw">
            <el-col :xs="24" :sm="24" :md="12" :lg="14" :xl="16" class="margin1vw-t h100">
                <UiPageTable
                        ref="tableExpandUsage"
                        :tableData="dataList"
                        :TableConfig="TableConfig"
                        :PageConfig="PageConfig"
                        :DataConfig="DataConfig"
                        @clickPage="clickPage"
                        @select="selectTable"
                        @clickButton="handleTableButton"
                ></UiPageTable>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8" class="margin1vw-t h100">
                <el-form label-width="50%">
                    <el-form-item>
                        <span slot="label" class="emphasize"></span>
                        {{ language.addExpandItem }}
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
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "tableExpandUsage" ,
        data () {
            return {
                TableConfig : {
                    border : true ,
                    stripe : true ,
                    highlight : true ,
                    // single : true ,
                    disabled : false ,
                    // button : {
                    //     value : "state" ,
                    //     display : "show" ,
                    //     list : [ { text : ">" , type : "text" , value : [ 1 ] } ]
                    // }
                } ,
                page : 1 ,
                pageSize : 30 ,
                total : 0 ,
                dataList : [] ,
                selectTableItem : {} ,
                addDataConfig : [] ,
                addDataConfigForm : {} ,
                addDataConfigFormItem : {
                    width : 220 ,
                    prop : "expand" ,
                    align : "left" ,
                    label : "addtest" ,
                    type : "expand"
                } ,
                addDataConfigItemType : "expand" ,
                TableExpandUsageDataConfig : require ( "./TableExpandUsageDataConfig.js" ).default ()
            };
        } ,
        components : {
            UiPageTable : () => import("@/assets/UiPageTable")
        } ,
        computed : {
            PageConfig () {
                return {
                    total : this.total ,
                    size : this.pageSize
                };
            } ,
            addDataConfigItem () {
                return {
                    width : "220" ,
                    prop : "expand" ,
                    align : "right" ,
                    // label : this.language.tableExpandUsage ,
                    label : this.language.tableExpandUsage ,
                    type : this.addDataConfigItemType
                }
            } ,
            addRequestDataConfig () {
                let list = [ "username" , "email" , "expand" ];
                return list.concat ( Object.keys ( this.addDataConfigForm ) );
                
            } ,
            DataConfig () {
                return this.TableExpandUsageDataConfig.concat ( [ this.addDataConfigItem ] , this.addDataConfig );
            }
        } ,
        methods : {
            handleTableButton ( row , bttext ) {
                this.$log ( { row , bttext } );
            } ,
            tableExpandUsageAddTableItemFun () {
                let obj = this.$avoid ( this.addDataConfigFormItem );
                this.$set ( this.addDataConfigForm , this.addDataConfigFormItem.prop , obj );
                this.addDataConfig = Object.values ( this.addDataConfigForm );
                this.$refs.tableExpandUsage.resetPage ();
            } ,
            clickPage ( d , l ) {
                this.page = d;
                this.pageSize = l;
                this.getRequest ();
            } ,
            selectTable ( t ) {
                this.selectTableItem = t.length > 0 ? this.$avoid ( t[ 0 ] ) : {};
            } ,
            getRequest () {
                this.post ( `/data/table` , {
                    maxState : 1 ,
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