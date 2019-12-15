<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <div class="margin1vw" style="height:80%;">
            <UiPageTable
                    ref="newTable"
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
                TableConfig : {
                    border : true ,
                    stripe : true ,
                    highlight : true ,
                    single : true ,
                    disabled : false ,
                    button : {
                        value : "state" ,
                        display : "show" ,
                        list : [ { text : "add" , type : "primary" , value : [ 1 ] } ,
                            { text : "success" , type : "success" , value : [ 1 , 2 ] } ,
                            { text : "warning" , type : "warning" , value : [ 1 , 3 ] } ,
                            { text : "delete" , type : "danger" , value : [ 2 , 3 ] } ]
                    }
                } ,
                page : 1 ,
                pageSize : 30 ,
                total : 0 ,
                dataList : [ { username : 123 , email : 456 , state : 1 } ,
                    { username : 123 , email : 456 , state : 2 } ,
                    { username : 123 , email : 456 , state : 3 } ,
                    { username : 123 , email : 456 , state : 4 } ] ,
                selectTableItem : {}
            };
        } ,
        components : {
            UiPageTable : () => import("@/assets/UiPageTable")
        } ,
        props : {
            // test: {
            //   type: String,
            //   default: () => {
            //     let colors = require("@/web-config/color.js");
            //     return colors[Math.ceil(Math.random() * colors.length - 1)];
            //   }
            // }
        } ,
        computed : {
            PageConfig () {
                return {
                    total : this.total ,
                    size : this.pageSize
                };
            }
        } ,
        watch : {
            //监听数据变化
            // test: {
            //   deep: true,
            //   immediate: true,
            //   handler(newv, oldv) {}
            // }
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
                let projectId = this.userInfo.projectId;
                let userProject = this.userInfo.userProject;
                this.get ( `/zone/1231321/${userProject}` , {} ).then ( res => {
                    let data = res.Data;
                    this.List = data;
                } );
            } ,
            postRequest () {
                let projectId = this.userInfo.projectId;
                let userProject = this.userInfo.userProject;
                this.post ( "/auth/login" , {} ).then ( res => {
                    let data = res.Data;
                    this.List = data;
                } );
            }
        } ,
        mounted () {
        }
    };
</script>