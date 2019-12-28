<template>
    <el-drawer
            :size=" otherInfo.menuCollapse ? '75%' : '35%' "
            :visible="otherInfo.drawerVisible"
            :direction="otherInfo.drawerDirection"
            :modal="true"
            :show-close="true"
            :append-to-body="false"
            :close-on-press-escape="false"
            :before-close="closeDrawer"
            :destroy-on-close="true"
    >
        <el-form label-width="30%">
            <el-divider content-position="left">{{ language.aboutTheme }}</el-divider>
            <el-form-item>
                <!--主题背景颜色-->
                <span slot="label" class="emphasize">{{language.themeBackgroundColor}}</span>
                <el-color-picker v-model="themeBackgroundColor" :disabled="configThemeDisabled"></el-color-picker>
            </el-form-item>
            <el-form-item>
                <!--主题文字颜色-->
                <span slot="label" class="emphasize">{{language.themeTextColor}}</span>
                <el-color-picker v-model="themeTextColor" :disabled="configThemeDisabled"></el-color-picker>
            </el-form-item>
            <el-form-item>
                <!--预置主题-->
                <span slot="label" class="emphasize">{{language.presetTheme}}</span>
                <el-col :span="2" v-for="(item,index) in otherInfo.themePresetList" :key="index">
                    <span :style="{background:`linear-gradient(135deg,${item.themeBackgroundColor} 0%,${item.themeBackgroundColor} 50%,
                        ${item.themeTextColor} 51%,${item.themeTextColor} 100%)`}" class="themeSpan inblock" @click="clickThemePreset(item)"></span>
                </el-col>
            </el-form-item>
            <el-form-item>
                <!--图标统一风格颜色-->
                <span slot="label" class="emphasize">{{language.iconUnifiedStyleColor}}</span>
                <el-color-picker v-model="iconUnifiedStyleColor" :disabled="configThemeDisabled"></el-color-picker>
            </el-form-item>
            <el-form-item>
                <!--图标统一风格大小-->
                <span slot="label" class="emphasize">{{language.iconUnifiedStyleFontSize}}</span>
                <el-slider v-model="iconUnifiedStyleFontSize" class="width50" :min="12" :max="28" input-size="mini"></el-slider>
            </el-form-item>
            <el-divider content-position="left">{{ language.aboutHomePage }}</el-divider>
            <el-form-item>
                <!--首页快捷导航-->
                <span slot="label" class="emphasize">{{language.homeQuickNav}}</span>
                <el-switch v-model="homeQuickNav"></el-switch>
            </el-form-item>
            <el-divider content-position="left">{{ language.aboutNavMenu }}</el-divider>
            <el-form-item>
                <!--显示菜单栏logo-->
                <span slot="label" class="emphasize">{{language.showMenuLogo}}</span>
                <el-switch v-model="showMenuLogo"></el-switch>
            </el-form-item>
            <el-form-item>
                <!--单个子菜单活动-->
                <span slot="label" class="emphasize">{{language.menuSonUnique}}</span>
                <!--<el-switch v-model="menuUnique"></el-switch>-->
                <el-radio-group v-model="menuUnique">
                    <el-radio-button :label="true">{{ language.singleInd }}</el-radio-button>
                    <el-radio-button :label="false">{{ language.multipleInd }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-divider content-position="left">{{ language.aboutTable }}</el-divider>
            <el-form-item>
                <!--表格适应宽度-->
                <span slot="label" class="emphasize">{{language.tableSelfAW}}</span>
                <el-switch v-model="tableSelfAW"></el-switch>
            </el-form-item>
            <el-form-item>
                <!--表格使用提示-->
                <span slot="label" class="emphasize">{{language.tableSwitch}}</span>
                <el-switch v-model="tableNotShow"></el-switch>
            </el-form-item>
            <el-divider content-position="left">{{ language.aboutSystem }}</el-divider>
            <el-form-item>
                <!--右键快捷菜单-->
                <span slot="label" class="emphasize">{{language.rightClickMenu}}</span>
                <!--<span slot="label" class="emphasize">{{rightClickMenu?language.rightClickMenu:language.systemClickMenu}}</span>-->
                <!--<el-switch v-model="rightClickMenu"></el-switch>-->
                <el-radio-group v-model="rightClickMenu">
                    <el-radio-button :label="true">{{ language.quickClickMenu }}</el-radio-button>
                    <el-radio-button :label="false">{{ language.systemClickMenu }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <!--选择语言-->
                <span slot="label" class="emphasize">{{language.selectLanguage}}</span>
                <SelectLanguage></SelectLanguage>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "drawer" ,
        data () {
            return {};
        } ,
        components : {
            SelectLanguage : () => import("@/assets/SelectLanguage")
        } ,
        computed : {
            homeQuickNav : {
                get () {
                    return this.otherInfo.homeQuickNav;
                } ,
                set ( v ) {
                    this.setOtherInfo ( { homeQuickNav : v } );
                }
            } ,
            showMenuLogo : {
                get () {
                    return this.otherInfo.showMenuLogo;
                } ,
                set ( v ) {
                    this.setOtherInfo ( { showMenuLogo : v } );
                }
            } ,
            tableSelfAW : {
                get () {
                    return this.otherInfo.tableSelfAW;
                } ,
                set ( v ) {
                    this.setOtherInfo ( { tableSelfAW : v } );
                }
            } ,
            menuUnique : {
                get () {
                    return this.otherInfo.menuUnique;
                } ,
                set ( v ) {
                    this.setOtherInfo ( { menuUnique : v } );
                }
            } ,
            tableNotShow : {
                get () {
                    return !this.otherInfo.tableNotShow;
                } ,
                set ( v ) {
                    this.setOtherInfo ( { tableNotShow : !v } );
                }
            } ,
            rightClickMenu : {
                get () {
                    return this.otherInfo.rightClickMenu;
                } ,
                set ( v ) {
                    this.setOtherInfo ( { rightClickMenu : v } );
                }
            } ,
            configThemeDisabled () {
                let d = this.otherInfo.configThemeDisabled;
                return d;
            } ,
            themeBackgroundColor : {
                get () {
                    let c = this.otherInfo.themeBackgroundColor;
                    return c;
                } ,
                set ( v ) {
                    this.setOtherInfo ( { themeBackgroundColor : v } );
                }
            } ,
            themeTextColor : {
                get () {
                    let c = this.otherInfo.themeTextColor;
                    return c;
                } ,
                set ( v ) {
                    this.setOtherInfo ( { themeTextColor : v } );
                }
            } ,
            iconUnifiedStyleColor : {
                get () {
                    let c = this.otherInfo.iconUnifiedStyleColor;
                    return c;
                } ,
                set ( v ) {
                    this.setOtherInfo ( { iconUnifiedStyleColor : v } );
                }
            } ,
            iconUnifiedStyleFontSize : {
                get () {
                    let c = this.otherInfo.iconUnifiedStyleFontSize;
                    return c;
                } ,
                set ( v ) {
                    this.setOtherInfo ( { iconUnifiedStyleFontSize : v } );
                }
            }
        } ,
        methods : {
            clickThemePreset ( item ) {
                this.setOtherInfo ( {
                    themeBackgroundColor : item.themeBackgroundColor ,
                    themeTextColor : item.themeTextColor
                } );
            } ,
            closeDrawer ( d ) {
                this.setOtherInfo ( { drawerVisible : !this.otherInfo.drawerVisible } );
                d ();
            }
        }
    };
</script>