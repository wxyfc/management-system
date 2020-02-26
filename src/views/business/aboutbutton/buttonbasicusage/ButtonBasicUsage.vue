<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="8" style="height: 80%;" class="padding1vw">
            <el-form label-width="50%">
                <el-form-item>
                    <!--文字提示按钮-->
                    <span slot="label" class="emphasize">{{language.fontTooltip}}</span>
                    <mdb :tooltip="language.fontTooltip" :disabledTime="0">{{ language.fontTooltip }}</mdb>
                </el-form-item>
                <el-form-item>
                    <!--自动禁用按钮-->
                    <span slot="label" class="emphasize">{{language.autoDisabled}}</span>
                    <mdb :tooltip="language.autoDisabled">{{ language.autoDisabled }}</mdb>
                </el-form-item>
                <el-form-item>
                    <!--显示禁用时间-->
                    <span slot="label" class="emphasize">{{language.showDisabledTime}}</span>
                    <mdb :tooltip="language.showDisabledTime" :showDisabledTime="true">{{ language.showDisabledTime }}</mdb>
                </el-form-item>
                <el-form-item>
                    <!--设置禁用时间-->
                    <span slot="label" class="emphasize">{{language.setDisabledTime}}</span>
                    <mdb :tooltip="language.setDisabledTime" :showDisabledTime="true" :disabledTime="disabledTime">{{ language.setDisabledTime }}</mdb>
                </el-form-item>
                <el-form-item>
                    <el-slider v-model="disabledTime" class="width50" :min="0" :max="60"></el-slider>
                </el-form-item>
                <el-form-item>
                    <span slot="label" class="emphasize">{{language.moreUsage}}</span>
                    <mdb :tooltip="language.aboutIcon" icon="el-icon-cloudy">{{ language.aboutIcon }}</mdb>
                </el-form-item>
                <el-form-item>
                    <mdb :tooltip="language.plainButton" icon="el-icon-cloudy" :plain="true">{{ language.plainButton }}</mdb>
                </el-form-item>
                <el-form-item>
                    <mdb :tooltip="language.roundButton" icon="el-icon-cloudy" :round="true">{{ language.roundButton }}</mdb>
                </el-form-item>
                <el-form-item>
                    <mdb :tooltip="language.circleButton" icon="el-icon-cloudy" :circle="true"></mdb>
                </el-form-item>
                <el-form-item>
                    <mdb :tooltip="language.aboutIcon" icon="el-icon-cloudy" type>{{ language.aboutIcon }}</mdb>
                </el-form-item>
                <el-form-item>
                    <mdb type="success">{{ language.notFontTooltip }}</mdb>
                </el-form-item>
                <el-form-item>
                    <mdb :tooltip="language.aboutButton" icon="el-icon-cloudy" type="warning">{{ language.aboutButton }}</mdb>
                </el-form-item>
                <el-form-item>
                    <mdb :tooltip="language.aboutButton" :disabled="true" type="danger">{{ language.aboutButton }}</mdb>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "buttonBasicUsage" ,
        data () {
            return {
                disabledTime : 3
            };
        } ,
    };
</script>