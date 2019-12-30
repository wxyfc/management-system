<template>
    <el-card
            shadow="always"
            :body-style="{ padding: '10px'}"
            @mouseover.native="bsMove"
            @mouseout.native="bsMove"
            style="height:calc(5% - 10px)"
    >
        <el-row type="flex" align="middle" justify="space-between" class="h100">
            <el-col
                    :span="5"
                    :style="{ background: iBsColor ,borderRadius: '0.52083vw',textAlign:'center',fontSize: '3.62962vh'}"
                    :class="bsIcon"
            ></el-col>
            <el-col
                    :span="19"
                    :style="{textAlign:'right',fontSize:'1.25vw',fontWeight:'530',color:color}"
            >
                {{bsTitle}}
                <CountTo :start-val="0" :end-val="bsCountTo.end" :duration="4000" :decimals="bsCountTo.dec"></CountTo>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    let colors = require ( "@/web-config/color.js" );
    export default {
        components : {
            CountTo : () => import("vue-count-to")
        } ,
        name : "BriefSee" ,
        data () {
            return {
                isMove : false
            };
        } ,
        props : {
            isColor : {
                type : String ,
                default : () => {
                    return colors[ Math.ceil ( Math.random () * colors.length - 1 ) ];
                }
            } ,
            color : {
                type : String ,
                default : () => {
                    return colors[ Math.ceil ( Math.random () * colors.length - 1 ) ];
                }
            } ,
            bsIcon : {
                type : String ,
                default : "el-icon-medal-1"
            } ,
            bsTitle : {
                type : String ,
                default : "此处是文字"
            } ,
            bsCountTo : {
                type : Object ,
                default : () => ( { end : 100 , dec : 0 } )
            }
        } ,
        computed : {
            iBsColor () {
                return this.isMove ? this.isColor : this.color;
            }
        } ,
        watch : {} ,
        methods : {
            bsMove ( e ) {
                this.isMove = !this.isMove;
            }
        }
    };
</script>