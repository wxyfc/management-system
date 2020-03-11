<template>
    <div id="mainOverallSituation">
        <!-- @contextmenu.prevent="rightClick" -->
        <RightClickMenu
                v-if="RightClickMenuShow"
                :RightClickMenu="RightClickMenu"
                :PrintingEle="PrintingEle"
                @close="RightClickMenuClose"
        ></RightClickMenu>
        <el-container class="h9999">
            <el-aside :width="asideWidth">
                <MainMenu></MainMenu>
            </el-aside>
            <el-container>
                <!--5%-->
                <el-header style="padding:0;height: 5%;">
                    <MainHeader></MainHeader>
                </el-header>
                <!--5%-->
                <el-header style="padding:0.4%;max-height:4%;height:auto;">
                    <MainTag></MainTag>
                </el-header>
                <el-main style="padding:0.4%;height: 90%;">
                    <MainApp></MainApp>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    // import { setLocal } from "@/function";

    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "main-main" ,
        data () {
            return {
                RightClickMenu : { x : 0 , y : 0 } ,
                RightClickMenuShow : false ,
                PrintingEle : null
            };
        } ,
        components : {
            MainMenu : () => import("@/views/framework/MainMenu") ,
            MainHeader : () => import("@/views/framework/MainHeader") ,
            MainTag : () => import("@/views/framework/MainTag") ,
            MainApp : () => import("@/views/framework/MainApp") ,
            RightClickMenu : () => import("@/views/framework/RightClickMenu")
        } ,
        computed : {
            asideWidth () {
                return this.otherInfo.asideVisible
                    ? this.otherInfo.menuCollapse
                        ? "auto"
                        : "11%"
                    : "0%";
            }
        } ,
        watch : {
            "otherInfo.rightClickMenu" : {
                deep : true ,
                // immediate: true,
                handler ( newv , oldv ) {
                    this.registerRight ( newv );
                }
            }
        } ,
        methods : {
            RightClickMenuClose () {
                this.RightClickMenuShow = false;
            } ,
            // beforeunloadFn ( e ) {
            //     setLocal ( "userMemory" , {
            //         userInfo : this.userInfo ,
            //         otherInfo : this.otherInfo ,
            //         language : this.language
            //     } );
            //     let confirmationMessage = "user-yun";
            //     ( e || window.event ).returnValue = confirmationMessage; // Gecko and Trident
            //     return confirmationMessage;
            // } ,
            rightClick ( e ) {
                e.preventDefault ();
                this.PrintingEle = e;
                this.$set ( this.RightClickMenu , "x" , e.x );
                this.$set ( this.RightClickMenu , "y" , e.y );
                this.RightClickMenuShow = true;
            } ,
            registerRight ( i ) {
                let rig = document.getElementById ( "mainOverallSituation" );
                if ( i && rig ) {
                    rig.addEventListener ( "contextmenu" , this.rightClick , true );
                } else if ( rig ) {
                    rig.removeEventListener ( "contextmenu" , this.rightClick , true );
                }
            }
            // resizeHandler() {
            //   let clientWidth = document.body.clientWidth;
            //   let clientHeight = document.body.clientHeight;
            //   if (clientWidth <= 992 || clientHeight <= 558) {
            //     this.setOtherInfo({ menuCollapse: true });
            //   } else {
            //     this.setOtherInfo({ menuCollapse: false });
            //   }
            // }
        } ,
        mounted () {
            // this.resizeHandler();
            // window.addEventListener("resize", this.resizeHandler);
            this.registerRight ( this.otherInfo.rightClickMenu );
            // window.addEventListener ( "beforeunload" , this.beforeunloadFn , true );
        } ,
        beforeDestroy () {
            // window.removeEventListener("resize", this.resizeHandler);
            // window.removeEventListener ( "beforeunload" , this.beforeunloadFn , true );
        }
    };
</script>