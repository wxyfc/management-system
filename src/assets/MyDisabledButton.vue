<template>
    <el-tooltip :content="tooltip" :disabled="tipDis" class="bttooltip">
        <div class="inblock" :style="longStyle">
            <el-button :type="type" :size="size" :icon="icon" class="w100" :loading="handlerLoading&&!showDisabledTime"
                       :disabled="handlerDisabled" @click.stop="emtiClick" :plain="plain" :round="round" :circle="circle">
                <span v-if="showDisabledTime&&disabledTimeNum>0">{{ disabledTimeNum }}</span>
                <slot></slot>
            </el-button>
        </div>
    </el-tooltip>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "myDisabledButton" ,
        data () {
            return {
                handlerDisabled : false ,
                handlerLoading : false ,
                tipDis : false ,
                disabledTimeNum : 0
            };
        } ,
        computed : {
            longStyle () {
                let data = "";
                if ( this.long == true || this.long == undefined ) {
                    data = "width:100%";
                } else if ( this.long != false ) {
                    data = `width:${this.long}%`;
                }
                return data;
            }
        } ,
        props : {
            type : {
                type : String ,
                default : "primary"
            } ,
            tooltip : {
                type : String ,
                default : ""
            } ,
            size : {
                type : String ,
                default : "mini"
            } ,
            icon : {
                type : String ,
                default : ""
            } ,
            disabled : {
                type : Boolean ,
                default : false
            } ,
            loading : {
                type : Boolean ,
                default : false
            } ,
            long : {
                type : Boolean ,
                default : false
            } ,
            disabledTime : {
                type : Number ,
                default : 3
            } ,
            showDisabledTime : {
                type : Boolean ,
                default : false
            } ,
            plain : {
                type : Boolean ,
                default : false
            } ,
            round : {
                type : Boolean ,
                default : false
            } ,
            circle : {
                type : Boolean ,
                default : false
            }
        } ,
        watch : {
            disabled : {
                deep : true ,
                immediate : true ,
                handler ( newv , oldv ) {
                    this.handlerDisabled = newv;
                }
            } ,
            loading : {
                deep : true ,
                immediate : true ,
                handler ( newv , oldv ) {
                    this.handlerLoading = newv;
                }
            }
        } ,
        methods : {
            clickDis () {
                let that = this;
                this.handlerDisabled = true;
                this.handlerLoading = true;
                this.disabledTimeNum = that.$avoid ( that.disabledTime );
                let t = setInterval ( () => {
                    that.disabledTimeNum--;
                    if ( that.disabledTimeNum < 0 ) {
                        that.handlerDisabled = that.disabled;
                        that.handlerLoading = false;
                        clearTimeout ( t );
                    }
                } , 1000 );
            } ,
            emtiClick () {
                this.$emit ( "click" );
                this.clickDis ();
            }
        } ,
        mounted () {
            if ( this.tooltip == "" ) {
                this.tipDis = true;
            }
        }
    };
</script>