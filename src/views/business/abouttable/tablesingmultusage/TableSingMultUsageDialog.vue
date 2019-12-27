<template>
    <el-dialog :visible.sync="show" :before-close="handleClose" destroy-on-close>
        <pre v-if="typeof showData == 'object'">{{showData}}</pre>
        <div v-else>{{showData}}</div>
        <span slot="footer"></span>
    </el-dialog>
</template>

<script>
    export default {
        name : "TableSingMultUsageDialog" ,
        data () {
            return {
                showData : {}
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
            }
        } ,
        watch : {
            data : {
                immediate : true ,
                deep : true ,
                handler : function ( nvalue , ovalue ) {
                    try {
                        if ( nvalue ) this.showData = JSON.parse ( nvalue );
                    } catch ( error ) {
                        this.showData = nvalue;
                    }
                }
            }
        } ,
        methods : {
            handleClose () {
                this.$emit ( "onColse" , false );
            }
        }
    };
</script>

