<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <div class="margin1vw alnrit" style="height:5%;">
            <mdb :disabled="true">{{ language.showSelect }}</mdb>
        </div>
        <el-col :xs="24" :sm="24" :md="12" :lg="14" :xl="16" class="margin1vw-t" style="height:80%;">
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
        <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8" class="margin1vw-t" style="height:80%;">
            123
        </el-col>
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
                    single : true ,
                    disabled : false
                } ,
                page : 1 ,
                pageSize : 30 ,
                total : 0 ,
                dataList : [] ,
                selectTableItem : {} ,
                addDataConfig : [] ,
                addRequestDataConfig : [ "username" , "email" ] ,
                TableSingMultUsageDataConfig : require ( "./TableSingMultUsageDataConfig.js" ).default ()
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
            DataConfig () {
                return this.TableSingMultUsageDataConfig.concat ( this.addDataConfig );
            }
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