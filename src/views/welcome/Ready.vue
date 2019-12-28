<template></template>
<script>
    // import { getLocal } from "@/function";
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "Ready" ,
        data () {
            return {};
        } ,
        methods : {
            hr ( l ) {
                let that = this;
                let rl = [];
                l.forEach ( le => {
                    let children = [];
                    if ( le.hasOwnProperty ( "children" ) && le.children.length > 0 ) {
                        children = that.hr ( le.children );
                    }
                    let ro;
                    // let icon = that.icon[le.name];
                    let lect = le.component;
                    if ( lect != undefined ) {
                        let component;
                        let ls = lect.split ( "/" );
                        if ( ls[ 0 ] == "welcome" ) {
                            component = () => import(`@/views/welcome/${ls[ 1 ]}`);
                        } else {
                            component = () => import(`@/views/business/${lect}`);
                        }
                        ro = {
                            path : le.path ,
                            name : le.name ,
                            component ,
                            // meta: { ...le.meta, icon },
                            meta : le.meta ,
                            children
                        };
                    } else {
                        ro = {
                            path : le.path ,
                            name : le.name ,
                            redirect : le.redirect ,
                            // meta: { ...le.meta, icon },
                            meta : le.meta ,
                            children
                        };
                    }
                    rl.push ( ro );
                } );
                return rl;
            } ,
            async ready () {
                let that = this;
                let redirect = that.$route.params.redirect;
                let pathMatch = that.$route.params.pathMatch;
                if ( redirect != undefined || pathMatch != undefined ) {

                    // let userMemory = getLocal("userMemory");
                    // let userId = userMemory.userInfo.userId;
                    let userId = this.userInfo.userId;

                    // let userRoutes = await that.$Get(`/web-config/routes.json`);
                    let userRoutes = require ( "@/web-config/routes.json" );
                    userRoutes = that.hr ( userRoutes );

                    // let t = setTimeout(() => {
                    that.$router.addRoutes ( userRoutes );
                    that.setOtherInfo ( { userRoutes } );

                    let name =
                        redirect != undefined
                            ? redirect
                            : pathMatch.substr ( 1 , pathMatch.length );
                    that.$router.replace ( { name } );
                    // this.$setTitle(this.language[this.otherInfo.helloTitle]);
                    this.$setIco ( this.otherInfo.webIco );
                    // clearTimeout(t);
                    // }, 2000);
                }
            }

        } ,
        mounted () {
            this.ready ();
        }
    };
</script>
