<template>
    <el-dialog :visible.sync="show" width="30%" :before-close="handleClose" destroy-on-close>
        <div class="alncnt" v-if="showData.length>1">
            <mdb :disabledTime="1" icon="el-icon-arrow-left" class="margin1vw-r " :disabled="showIndex==0" @click="showIndex--"></mdb>
            <mdb :disabledTime="1" icon="el-icon-arrow-right" :disabled="showIndex==showData.length-1" @click="showIndex++"></mdb>
        </div>
        <img width="100%" class="margin1vw-t" :src="showData[showIndex]" style="object-fit:contain;">
        <div class="alncnt margin1vw-t" v-if="showData.length>1">
            <mdb :disabledTime="1" icon="el-icon-arrow-left" class="margin1vw-r " :disabled="showIndex==0" @click="showIndex--"></mdb>
            <mdb :disabledTime="1" icon="el-icon-arrow-right" :disabled="showIndex==showData.length-1" @click="showIndex++"></mdb>
        </div>
        <span slot="footer"></span>
    </el-dialog>
</template>

<script>
    export default {
        name : "ImgDialog" ,
        data () {
            return {
                showData : {} ,
                showIndex : 0 ,
            };
        } ,
        mounted () {
        } ,
        computed : {} ,
        props : {
            show : {
                type : Boolean ,
                default : false
            } ,
            data : {
                default : null
            } ,
            index : {
                type : Number ,
                default : 0
            }
        } ,
        watch : {
            data : {
                immediate : true ,
                deep : true ,
                handler : function ( nvalue , ovalue ) {
                    if ( nvalue != null ) {
                        this.handleData ();
                    }
                }
            } ,
            index : {
                immediate : true ,
                deep : true ,
                handler : function ( nvalue , ovalue ) {
                    this.showIndex = nvalue;
                }
            }
        } ,
        methods : {
            handleClose () {
                this.$emit ( "onColse" , false );
            } ,
            handleData () {
                if ( this.$type ( this.data ) == "[object String]" ) {
                    this.showData = this.data.split ( "," );
                } else if ( this.$type ( this.data ) == "[object Array]" ) {
                    this.showData = this.data;
                }
            }
        }
    };
</script>

