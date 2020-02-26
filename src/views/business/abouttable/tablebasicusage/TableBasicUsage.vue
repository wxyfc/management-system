<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <div class="padding1vw alnrit" style="height:5%;">
            <!--<el-switch v-model="buttonDisplay" active-value="show" inactive-value="display"></el-switch>-->
            <!--{{ language.switchButtonShowMode }}：{{ buttonDisplay=="show"? language.hide:language.prohibit}}-->
            {{ language.switchButtonShowMode }}：
            <el-radio-group v-model="buttonDisplay">
                <el-radio-button label="show">{{ language.hide }}</el-radio-button>
                <el-radio-button label="display">{{ language.prohibit }}</el-radio-button>
            </el-radio-group>
        </div>
        <div class="padding1vw" style="height:80%;">
            <UiPageTable
                    ref="tableBasicUsage"
                    :tableData="dataList"
                    :TableConfig="TableConfig"
                    :PageConfig="PageConfig"
                    :DataConfig="require('./TableBasicUsageDataConfig.js').default()"
                    @clickPage="clickPage"
                    @select="selectTable"
            ></UiPageTable>
        </div>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "tableBasicUsage" ,
        data () {
            return {
                page : 1 ,
                pageSize : 30 ,
                total : 0 ,
                dataList : [] ,
                selectTableItem : {} ,
                buttonDisplay : "display"
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
            TableConfig () {
                return {
                    border : true ,
                    stripe : true ,
                    highlight : true ,
                    // single : true ,
                    disabled : false ,
                    button : {
                        value : "state" ,
                        display : this.buttonDisplay ,
                        list : [ { text : "state:1,2" , type : "primary" , value : [ 1 , 2 ] } ,
                            { text : "state:1,3" , type : "success" , value : [ 1 , 3 ] } ,
                            { text : "state:1,4" , type : "warning" , value : [ 1 , 4 ] } ,
                            { text : "state:2,3" , type : "danger" , value : [ 2 , 3 ] } ,
                            { text : "state:2,4" , type : "info" , value : [ 2 , 4 ] } ,
                            { text : "state:3,4" , type : "" , value : [ 3 , 4 ] } ]
                    }
                }
            } ,
        } ,
        methods : {
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
                    maxState : 4 ,
                    page : this.page ,
                    pageSize : this.pageSize ,
                    data : [ "username" , "email" ]
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