<template>
    <el-menu
            :default-active="activityMenu"
            :collapse="otherInfo.menuCollapse"
            :background-color="otherInfo.themeBackgroundColor"
            :text-color="otherInfo.themeTextColor"
            :active-text-color="activeColor"
            :unique-opened="otherInfo.menuUnique"
            router
            class="h9999 overflowauto"
    >
        <el-menu-item index="logo" style="padding:0;pointerEvents:none" v-if="otherInfo.showMenuLogo">
            <img
                    width="100%"
                    height="100%"
                    :src="otherInfo.menuLogo"
                    style="object-fit:contain"
            >
            <!-- :width="otherInfo.menuCollapse?`100%`:`100%`" -->
            <!-- :style="otherInfo.menuCollapse?'transform:scale(0.9)':'transform:scale(0.9)'" -->
            <!-- <span slot="title" class="emphasize">{{userInfo.headerTitle}}</span> -->
        </el-menu-item>
        <!-- <el-menu-item index="cooplogo" style="padding:0;pointerEvents:none"> -->
        <!-- <img
            width="100%"
            height="100%"
            :src="'http://www.abchina.com/cn/images/logo_ue2.png'"
            style="object-fit:contain"
        >-->
        <!-- :width="otherInfo.menuCollapse?`100%`:`100%`" -->
        <!-- :style="otherInfo.menuCollapse?'transform:scale(0.9)':'transform:scale(0.9)'" -->
        <!-- <span slot="title" class="emphasize">{{userInfo.cooperativePartner}}</span> -->
        <!-- </el-menu-item> -->
        <RecursionMenu v-if="RecursionMenuHandler" :mList="menuList" :activeColor="activeColor"></RecursionMenu>
    </el-menu>
    <!-- <keep-alive> </keep-alive> <component></component> -->
</template>

<script>
    import { $ColorReverse } from "@/function";

    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "mainMenu" ,
        data () {
            return {
                RecursionMenuHandler : true
            };
        } ,
        components : {
            RecursionMenu : () => import("@/views/framework/RecursionMenu")
        } ,
        computed : {
            menuList () {
                return this.otherInfo.menuList;
            } ,
            activeColor () {
                return $ColorReverse ( this.otherInfo.themeBackgroundColor );
            } ,
            activityMenu () {
                let route = this.$route
                return route.meta.menu || route.path
            }
        } ,
        created () {
            this.handlerMenu ();
        } ,
        watch : {
            menuList : {
                deep : true ,
                handler ( newv , oldv ) {
                    let that = this;
                    this.RecursionMenuHandler = false;
                    this.$nextTick ( () => {
                        that.RecursionMenuHandler = true;
                    } )
                }
            }
        } ,
        methods : {
            handlerMenu () {
                let that = this;
                let allMenuList = this.$avoid ( that.otherInfo.userRoutes );
                let menuList = that.handFor ( allMenuList );
                that.setOtherInfo ( { menuList } );
            } ,
            handFor ( l ) {
                let that = this;
                let ur = that.userInfo.userRole;
                let lm = [];
                l.forEach ( e => {
                    if ( e.meta.icon && e.meta.role.includes ( ur ) ) {
                        if ( e.children && e.children.length > 0 ) {
                            that.$set ( e , "children" , that.handFor ( e.children ) );
                        }
                        lm.push ( e );
                    }
                } );
                return lm;
            }
        }
    };
</script>
