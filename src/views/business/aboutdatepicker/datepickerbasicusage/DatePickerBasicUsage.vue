<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="8" style="height: 80%;" class="padding1vw">
            <el-form label-width="50%">
                <el-form-item>
                    <!--默认值-->
                    <span slot="label" class="emphasize">{{language.defaultValue}}</span>
                    <DatePicker @change="defaultValueFun"></DatePicker>
                </el-form-item>
                <el-form-item>
                    <!--默认值-->
                    <span slot="label" class="emphasize">{{language.defaultValue}}</span>
                    {{ defaultValue }}
                </el-form-item>
                <el-form-item>
                    <!--其他默认值-->
                    <span slot="label" class="emphasize">{{language.otherDefaultValue}}</span>
                    <DatePicker @change="otherDefaultValueFun" :dayNum="10" :clearable="true"></DatePicker>
                </el-form-item>
                <el-form-item>
                    <!--其他默认值-->
                    <span slot="label" class="emphasize">{{language.otherDefaultValue}}</span>
                    {{ otherDefaultValue }}
                </el-form-item>
                <el-form-item>
                    <!--更改默认值-->
                    <span slot="label" class="emphasize">{{language.updataDefaultValue}}</span>
                    <DatePicker @change="updataDefaultValueFun" :dayNum="updataDefaultValueNum"></DatePicker>
                </el-form-item>
                <el-form-item>
                    <!--更改默认值-->
                    <span slot="label" class="emphasize">{{language.updataDefaultValue}}</span>
                    {{ updataDefaultValue }}
                </el-form-item>
                <el-form-item>
                    <!--更改默认值-->
                    <span slot="label" class="emphasize">{{language.updataDefaultValue}}</span>
                    <el-slider v-model="updataDefaultValueNum" class="width50" :min="0" :max="60"></el-slider>
                </el-form-item>
                <el-form-item>
                    <!--没有默认值-->
                    <span slot="label" class="emphasize">{{language.notDefaultValue}}</span>
                    <DatePicker @change="notDefaultValueFun" :default="false" :clearable="true"></DatePicker>
                </el-form-item>
                <el-form-item>
                    <!--没有默认值-->
                    <span slot="label" class="emphasize">{{language.notDefaultValue}}</span>
                    {{ notDefaultValue }}
                </el-form-item>
                <el-form-item>
                    <!--切换状态-->
                    <span slot="label" class="emphasize">{{language.switchState}}</span>
                    <DatePicker @change="switchStateFun" :type="switchStateNum"></DatePicker>
                </el-form-item>
                <el-form-item>
                    <!--切换状态-->
                    <span slot="label" class="emphasize">{{language.switchState}}</span>
                    {{ switchState }}
                    <el-switch v-model="switchStateNum" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item>
                    <!--综合-->
                    <span slot="label" class="emphasize">{{language.comprehensive}}</span>
                    <DatePicker @change="comprehensiveFun" :type="comprehensiveNum" :dayNum="comprehensiveDayNum"></DatePicker>
                </el-form-item>
                <el-form-item>
                    <!--综合-->
                    <span slot="label" class="emphasize">{{language.comprehensive}}</span>
                    {{ comprehensive }}
                </el-form-item>
                <el-form-item>
                    <!--综合-->
                    <span slot="label" class="emphasize">{{language.comprehensive}}</span>
                    <el-switch v-model="comprehensiveNum" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item>
                    <!--综合-->
                    <span slot="label" class="emphasize">{{language.comprehensive}}</span>
                    <el-slider v-model="comprehensiveDayNum" class="width50" :min="0" :max="60"></el-slider>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "datePickerBasicUsage" ,
        data () {
            return {
                defaultValue : "" ,
                otherDefaultValue : "" ,
                updataDefaultValue : "" ,
                updataDefaultValueNum : 20 ,
                notDefaultValue : "" ,
                switchState : "" ,
                switchStateNum : 0 ,
                comprehensive : "" ,
                comprehensiveNum : 0 ,
                comprehensiveDayNum : 30
            };
        } ,
        components : {
            DatePicker : () => import("@/assets/DatePicker")
        } ,
        methods : {
            defaultValueFun ( i ) {
                this.defaultValue = i;
            } ,
            otherDefaultValueFun ( i ) {
                this.otherDefaultValue = i;
            } ,
            updataDefaultValueFun ( i ) {
                this.updataDefaultValue = i;
            } ,
            notDefaultValueFun ( i ) {
                this.notDefaultValue = i;
            } ,
            switchStateFun ( i ) {
                this.switchState = i;
            } ,
            comprehensiveFun ( i ) {
                this.comprehensive = i;
            }
        } ,
        mounted () {
        }
    };
</script>