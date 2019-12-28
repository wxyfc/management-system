<template>
  <span>
    <el-tooltip :content="tooltip" :disabled="tipDis" class="bttooltip">
      <i :class="[iconClass,icon]" :style="unified?unifiedStyle:mStyle" @click.stop="iconClick"></i>
    </el-tooltip>
  </span>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "MyTooltipIcon" ,
        data () {
            return {
                tipDis : false
            };
        } ,
        computed : {
            unifiedStyle () {
                return `font-size:${this.otherInfo.iconUnifiedStyleFontSize}px;color:${this.otherInfo.iconUnifiedStyleColor}`
            }
        } ,
        props : {
            tooltip : {
                type : String ,
                default : ""
            } ,
            icon : {
                type : String ,
                default : "el-icon-question"
            } ,
            iconClass : {
                type : String ,
                default : "icon"
            } ,
            mStyle : {} ,
            unified : {
                type : Boolean ,
                default : false
            }
        } ,
        methods : {
            iconClick () {
                this.$emit ( "click" , this.icon );
            }
        } ,
        mounted () {
            if ( this.tooltip == "" ) {
                this.tipDis = true;
            }
        }
    };
</script>