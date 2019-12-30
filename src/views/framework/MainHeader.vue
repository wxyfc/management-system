<template>
    <div :style="{backgroundColor:otherInfo.themeBackgroundColor }" class="h100">
        <el-row type="flex" align="middle" class="h100">
            <el-col :xs="9" :sm="13" :md="15" :lg="16" :xl="20">
                <mi :icon="iClassAsideVisible" :mStyle="{color:otherInfo.themeTextColor}" :tooltip="language.stowOpenNavMenu" @click="iClassAsideVisibleOnClick"></mi>
                <mi :icon="iClassMenuCollapse" :mStyle="{color:otherInfo.themeTextColor}" :tooltip="language.foldOpenNavMenu" @click="iClassMenuCollapseOnClick"></mi>
            </el-col>
            <el-col :xs="3" :sm="3" :md="2" :lg="2" :xl="1">
                <mi icon="el-icon-setting" :tooltip="language.openSetUp" :mStyle="{color:otherInfo.themeTextColor}" @click="iClassDrawerCollapseOnClick"></mi>
            </el-col>
            <el-col :xs="3" :sm="3" :md="2" :lg="2" :xl="1">
                <el-dropdown :size="otherInfo.menuCollapse?'medium':'default'" @command="noticeSelect">
                    <el-badge is-dot>
                        <mi icon="el-icon-bell" :mStyle="{color:otherInfo.themeTextColor}"></mi>
                    </el-badge>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                                v-for="(item) in noticeMenuList"
                                :key="item.command"
                                :command="item.command"
                                icon="el-icon-chat-dot-square"
                        >
                            <span class="emphasize">{{item.title}}</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="systemLog" divided icon="el-icon-chat-line-square">
                            <span class="emphasize">{{language.systemLog}}</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :xs="9" :sm="5" :md="5" :lg="4" :xl="2">
                <el-dropdown :size="otherInfo.menuCollapse?'medium':'default'" @command="menuSelect">
          <span class="emphasize" :style="{color:otherInfo.themeTextColor}">
            <mi icon="el-icon-user icon"></mi>
            {{userInfo.userName}}
          </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                                v-for="(item) in mainMenuList"
                                :key="item.route"
                                :command="item.route"
                                :icon="item.icon"
                        >
                            <span class="emphasize">{{language[item.title]}}</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
        <ConfigDrawer v-if="otherInfo.drawerVisible"></ConfigDrawer>
    </div>
</template>

<script>
    import { $addCSS , $ColorReverse } from "@/function";

    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "mainHeader" ,
        data () {
            return {
                mainMenuList : [
                    {
                        icon : "el-icon-switch-button" ,
                        title : "signOut" ,
                        route : "login"
                    }
                ]
            };
        } ,
        components : {
            ConfigDrawer : () => import("@/views/framework/ConfigDrawer")
        } ,
        computed : {
            iClassAsideVisible () {
                return this.otherInfo.asideVisible
                    ? "el-icon-s-fold"
                    : "el-icon-s-unfold";
            } ,
            iClassMenuCollapse () {
                return this.otherInfo.menuCollapse ? "el-icon-s-grid" : "el-icon-menu";
            } ,
            noticeMenuList () {
                return [ { title : this.language.unreadMessage , command : "read" } ];
            }
        } ,
        watch : {
            "otherInfo.themeBackgroundColor" : {
                deep : true ,
                // immediate: true,
                handler ( newv , oldv ) {
                    $addCSS (
                        `.el-badge__content{ background-color:${$ColorReverse (
                            this.otherInfo.themeBackgroundColor
                        )};}`
                    );
                }
            }
        } ,
        methods : {
            menuSelect ( name ) {
                this.$router.replace ( { name } );
            } ,
            noticeSelect ( i ) {
                if ( i == "systemLog" ) {
                    this.$router.replace ( { name : i } );
                }
            } ,
            iClassAsideVisibleOnClick () {
                this.setOtherInfo ( { asideVisible : !this.otherInfo.asideVisible } );
            } ,
            iClassMenuCollapseOnClick () {
                this.setOtherInfo ( { menuCollapse : !this.otherInfo.menuCollapse } );
            } ,
            iClassDrawerCollapseOnClick () {
                this.setOtherInfo ( { drawerVisible : !this.otherInfo.drawerVisible } );
            }
        }
    };
</script>