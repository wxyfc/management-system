<template>
    <el-dialog :visible.sync="dialogVisible" :width="width" :destroy-on-close="true">
        <slot name="title" slot="title">
            <div class="element-dialog-title">{{ title }}</div>
        </slot>
        <slot></slot>
        <slot name="footer" slot="footer">
            <div>footer</div>
        </slot>
    </el-dialog>
</template>

<script>
    export default {
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
                default : "dialog-title"
            }

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
        watch : {
            //监听数据变化
            // test: {
            //   deep: true,
            //   immediate: true,
            //   handler(newv, oldv) {
            // this.();
            // this.();
            // }
            // }
        } ,
        methods : {} ,
        mounted () {
        }
    };
</script>