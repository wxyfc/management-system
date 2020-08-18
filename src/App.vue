<template>
    <div id="app" @mousemove="mousemove">
        <router-view class="w9999 h9999" v-if="YouAreSmart" key="app"/>
    </div>
</template>
<script>
    import { setLocal , clearLocal } from "@/function";

    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "app" ,
        data () {
            return {
                YouAreSmart : true ,
                KickOutInterval : null ,
                KickOutTime : 0 ,
                KickOutNum : 1 * 60 * 60 * 1000 * 24
            };
        } ,
        methods : {
            mousemove () {
                this.KickOutTime = 0;
            } ,
            beforeunloadFn ( e ) {
                if ( this.$route.name != "login" ) {
                    setLocal ( "userMemory" , {
                        userInfo : this.userInfo ,
                        otherInfo : this.otherInfo ,
                        language : this.language
                    } );
                }
                let confirmationMessage = "user-yun";
                ( e || window.event ).returnValue = confirmationMessage; // Gecko and Trident
                return confirmationMessage;
            } ,
            resizeHandler () {
                let clientWidth = document.body.clientWidth;
                let clientHeight = document.body.clientHeight;
                if ( clientWidth <= 992 || clientHeight <= 558 ) {
                    this.setOtherInfo ( { menuCollapse : true } );
                } else {
                    this.setOtherInfo ( { menuCollapse : false } );
                }
            } ,
            setOtherInfo ( v ) {
                //设置其他的信息
                this.$store.dispatch ( "upVuex" , {
                    mutations : "setOtherInfo" ,
                    value : v
                } );
            } ,
            clear () {
                clearInterval ( this.KickOutInterval );
                this.KickOutInterval = null;
            }
        } ,
        watch : {
            KickOutTime ( n ) {
                if ( n >= 7 ) {
                    // clearLocal();
                    this.KickOutTime = 0;
                    this.$router.replace ( { path : "/" } );
                }
            } ,
            $route : {
                handler : function ( n , o ) {
                    if ( n.name == "login" ) {
                        this.clear ();
                    } else {
                        if ( this.KickOutInterval == null ) {
                            this.KickOutInterval = setInterval ( () => {
                                this.KickOutTime++;
                            } , this.KickOutNum );
                        }
                    }
                } ,
                deep : true
            }
        } ,
        mounted () {
            this.resizeHandler ();
            window.addEventListener ( "resize" , this.resizeHandler );
            window.addEventListener ( "beforeunload" , this.beforeunloadFn , true );
            // let i = 1593475200000;
            // if ( new Date ().getTime () > i ) {
            //     this.YouAreSmart = false;
            // }
        } ,
        beforeDestroy () {
            window.removeEventListener ( "resize" , this.resizeHandler );
            window.removeEventListener ( "beforeunload" , this.beforeunloadFn , true );
            this.clear ();
        }
    };
</script>
