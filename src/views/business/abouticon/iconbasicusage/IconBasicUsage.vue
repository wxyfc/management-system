<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <div style="height: 30%;" class="padding1vw alncnt">
            <el-col :span="24"> {{ language.iconUnifiedStyle }}</el-col>
            <el-col :xs="4" :sm="3" :md="2" :lg="2" :xl="1" v-for="(icon,i) in iconList" class="margin1vw-t" :key="i">
                <mi :icon="icon" :tooltip="icon" @click="clickIcon" :unified="true"></mi>
            </el-col>
        </div>
        <div style="height:50%;">
            <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="8">
                <el-form label-width="50%">
                    <el-form-item>
                        <!--图标统一风格大小-->
                        <span slot="label" class="emphasize">{{language.iconUnifiedStyleFontSize}}</span>
                        <el-slider v-model="iconUnifiedStyleFontSize" class="width50" :min="12" :max="28"></el-slider>
                    </el-form-item>
                    <el-form-item>
                        <!--图标统一风格颜色-->
                        <span slot="label" class="emphasize">{{language.iconUnifiedStyleColor}}</span>
                        <el-color-picker v-model="iconUnifiedStyleColor"></el-color-picker>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="8">
                <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6" class="margin1vw-t">
                    {{ language.notUnifiedStyle }}
                    <br>
                    <mi icon="el-icon-sunny" :tooltip="language.notUnifiedStyle" @click="clickIcon(language.notUnifiedStyle)"></mi>
                </el-col>
                <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6" class="margin1vw-t">
                    {{ language.unifiedStyle }}
                    <br>
                    <mi icon="el-icon-moon" :tooltip="language.unifiedStyle" @click="clickIcon(language.unifiedStyle)" :unified="true"></mi>
                </el-col>
                <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6" class="margin1vw-t">
                    {{ language.notFontTooltip }}
                    <br>
                    <mi icon="el-icon-cloudy" @click="clickIcon(language.notFontTooltip)"></mi>
                </el-col>
                <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6" class="margin1vw-t">
                    {{ language.controlUnifiedStyle }}
                    <el-switch v-model="controlUnifiedStyle"></el-switch>
                    <br>
                    <mi icon="el-icon-cloudy" @click="clickIcon(language.controlUnifiedStyle)" :unified="controlUnifiedStyle"></mi>
                </el-col>
            </el-col>
        </div>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "iconBasicUsage" ,
        data () {
            return {
                controlUnifiedStyle : true ,
                iconList : require ( `@/web-config/iconList.json` )
            };
        } ,
        computed : {
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
            clickIcon ( i ) {
                this.eleNotify ( i )
            }
        } ,
    };
</script>