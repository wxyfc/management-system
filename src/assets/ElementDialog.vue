<template>
    <el-dialog :visible.sync="dialogVisible" :width="width" :destroy-on-close="true">
        <slot name="title" slot="title" v-if="title">
            <div class="element-dialog-title">{{ title }}</div>
        </slot>
        <slot></slot>
        <slot name="footer" slot="footer">
            <div v-if="sure||cancel">
                <mdb class="margin1vw-r" v-if="cancel" type @click="handCancel">{{ cancel.text||language.cancel }}</mdb>
                <mdb class="margin1vw-r" v-if="sure" @click="handSure">{{sure.text|| language.sure }}</mdb>
            </div>
        </slot>
    </el-dialog>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "ElementDialog" ,
        model : {
            prop : 'showDialog' ,
            event : 'updata'
        } ,
        props : {
            showDialog : {
                type : Boolean ,
                default : () => {
                    return false
                }
            } ,
            width : {
                type : String ,
                default : "50%"
            } ,
            title : {
                type : String ,
                default : ""
            } ,
            sure : {} ,
            cancel : {}
        } ,
        computed : {
            dialogVisible : {
                get () {
                    return this.showDialog
                } ,
                set ( v ) {
                    this.$emit ( 'updata' , v )
                }
            }
        } ,
        data () {
            return {};
        } ,
        methods : {
            handCancel () {
                if ( this.cancel.function ) {
                    this.cancel.function ()
                } else {
                    this.dialogVisible = false
                }
            } ,
            handSure () {
                if ( this.sure.function ) {
                    this.sure.function ()
                } else {
                    this.dialogVisible = false
                }
            }

        } ,
        mounted () {
        }
    };
</script>