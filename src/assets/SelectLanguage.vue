<template>
    <el-select v-show="!otherInfo.menuCollapse" v-model="otherInfo.languageOpt" @change="selectChange" size="mini" popper-class="transparent02">
        <el-option v-for="(value,key) in otherInfo.languageList" :key="key" :value="key" :label="value">
            <span class="normal float-l">{{value}}</span>
            <span class="normal float-r">{{key}}</span>
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name : "SelectLanguage" ,
        data () {
            return {};
        } ,
        components : {} ,
        props : {} ,
        computed : {
            otherInfo () {
                return this.$store.getters.getOtherInfo;
            } ,
            language () {
                return this.$store.getters.getLanguage;
            }
        } ,
        watch : {
            "otherInfo.languageOpt" : {
                handler ( newValue , oldValue ) {
                    if ( this.$isTrue ( newValue ) ) this.getLanguageJson ();
                } ,
                immediate : true , //最初监听
                deep : true //深度监听
            }
        } ,
        methods : {
            selectChange ( value ) {
                this.setOtherInfo ( {
                    languageOpt : value
                } );
            } ,
            setOtherInfo ( value ) {
                //设置其他的信息
                this.$store.dispatch ( "upVuex" , {
                    mutations : "setOtherInfo" ,
                    value : value
                } );
            } ,
            async getLanguageJson () {
                // let language = await this.$Get(
                //   `/language/${this.otherInfo.languageOpt}.json`
                // );
                let language = require ( `@/language/${this.otherInfo.languageOpt}.json` );
                this.$store.dispatch ( "upVuex" , {
                    mutations : "setLanguage" ,
                    value : language
                } );
            }
        }
    };
</script>