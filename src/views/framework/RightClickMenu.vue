<template>
    <div id="rightClickMenuId" :style="`position: fixed;top:${show.y}px;left:${show.x}px;z-index:5235;width:200px;`" @mouseleave="runMenu" @mouseover="clear">
        <mdb :long="true" @click="copy">{{language.copy}}</mdb>
        <mdb :long="true" @click="backUpPage">{{language.backUpPage}}</mdb>
        <mdb :long="true" @click="reloadThisPage">{{language.reloadThisPage}}</mdb>
        <mdb :long="true" @click="printCurrentElement" v-if="isPrint">{{language.printCurrentElement}}</mdb>
        <mdb :long="true" @click="quickFeedback">{{language.quickFeedback}}</mdb>
        <mdb :long="true" @click="openSetUp">{{language.openSetUp}}</mdb>
        <mdb :long="true" @click="signOutLogin">{{language.signOutLogin}}</mdb>
    </div>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "RightClickMenu" ,
        data () {
            return {
                rmTime : null ,
                idEle : null ,
                show : { x : 0 , y : 0 }
            };
        } ,
        props : {
            RightClickMenu : {
                type : Object ,
                default : () => {
                    return { x : 0 , y : 0 };
                }
            } ,
            PrintingEle : {
                default : ""
            }
        } ,
        watch : {
            RightClickMenu : {
                deep : true ,
                handler ( newv , oldv ) {
                    this.handShow ();
                }
            }
        } ,
        computed : {
            isPrint () {
                let path = this.PrintingEle.path;
                for ( let i = 0 , l = path.length ; i < l ; i++ ) {
                    let id = path[ i ].id;
                    if ( id == "PrintBody" ) {
                        // id != "" && id != "app" && id != null && id != undefined && id != "rightClickMenuId"
                        this.idEle = document.getElementById ( id );
                        return true;
                    }
                }
                return false;
            }
        } ,
        methods : {
            copy () {
                document.execCommand ( "Copy" );
            } ,
            quickFeedback () {
                this.$router.replace ( { name : "quickFeedback" } );
            } ,
            backUpPage () {
                this.$router.go ( -1 );
            } ,
            reloadThisPage () {
                history.go ( 0 );
            } ,
            printCurrentElement () {
                let that = this;
                let newwindow = window.open ( window.location.href );
                let t = setTimeout ( () => {
                    newwindow.document.body.innerHTML = that.idEle.innerHTML;
                    newwindow.print ();
                    newwindow.close ();
                    clearTimeout ( t );
                } , 1000 );
            } ,
            openSetUp () {
                this.setOtherInfo ( { drawerVisible : !this.otherInfo.drawerVisible } );
            } ,
            signOutLogin () {
                this.$router.replace ( { name : "login" } );
            } ,
            clear () {
                clearTimeout ( this.rmTime );
                this.rmTime = null;
            } ,
            close () {
                this.clear ();
                this.$emit ( "close" );
                window.removeEventListener ( "click" , this.close );
            } ,
            runMenu () {
                let that = this;
                window.addEventListener ( "click" , this.close );
                if ( that.rmTime == null ) {
                    that.rmTime = setTimeout ( () => {
                        that.close ();
                    } , 600 );
                }
            } ,
            handShow () {
                let clientWidth = document.body.clientWidth;
                let clientHeight = document.body.clientHeight;
                let rcm = document.getElementById ( "rightClickMenuId" );
                let rcmW = rcm.clientWidth;
                let rcmH = rcm.clientHeight;
                let x = this.RightClickMenu.x;
                let y = this.RightClickMenu.y;
                if ( x + rcmW >= clientWidth ) {
                    this.$set ( this.show , "x" , x - rcmW );
                } else {
                    this.$set ( this.show , "x" , x );
                }
                if ( y + rcmH >= clientHeight ) {
                    this.$set ( this.show , "y" , y - rcmH );
                } else {
                    this.$set ( this.show , "y" , y );
                }
            }
        } ,
        mounted () {
            this.runMenu ();
            this.handShow ();
        } ,
        beforeDestroy () {
            this.close ();
        }
    };
</script>