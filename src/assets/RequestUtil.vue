<template>
  <span class="alnlft">
    <el-row class="padding1vw">
      <el-col :xs="24" :sm="12" :md="12" :lg="14" :xl="16" class="margin1vw-t">
        {{language.requestAddress}}：
        <el-autocomplete v-model="inputUrl" :placeholder="language.requestAddress" class="width80" :fetch-suggestions="querySearch" @select="handleSelect"></el-autocomplete>
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="5" :xl="4" class="margin1vw-t">
        {{language.requestMode}}：
        <el-select v-model="select" class="width50">
          <el-option value="get"></el-option>
          <el-option value="post"></el-option>
        </el-select>
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="5" :xl="4" class="margin1vw-t">
        <mdb icon="el-icon-search" type="primary" :disabled=" inputUrl == '' " @click="Request" :long="true">{{language.sureRequest}}</mdb>
      </el-col>
    </el-row>
    <el-row v-for="(v,k) in testData" :key="k" class="padding1vw">
      <el-col :xs="12" :sm="6" :md="6" :lg="7" :xl="8" class="margin1vw-t">key：{{k}}</el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="7" :xl="8" class="margin1vw-t">value：{{v}}</el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="5" :xl="4" class="margin1vw-t">
        <mi icon="el-icon-edit" :tooltip="language.modify" @click="modifyData(k)"></mi>
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="5" :xl="4" class="margin1vw-t">
        <mi icon="el-icon-delete" :tooltip="language.delete" @click="deleData(k)"></mi>
      </el-col>
    </el-row>
    <el-row class="padding1vw">
      <el-col :xs="12" :sm="6" :md="6" :lg="7" :xl="8" class="margin1vw-t">
        key：
        <el-input v-model="inputKey" class="width80" placeholder="key"></el-input>
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="7" :xl="8" class="margin1vw-t">
        value：
        <el-input v-model="inputValue" class="width80" placeholder="value"></el-input>
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="5" :xl="4" class="margin1vw-t">
        valueType：
        <el-select v-model="valueType" class="width50">
          <el-option value="string"></el-option>
          <el-option value="number"></el-option>
        </el-select>
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="5" :xl="4" class="margin1vw-t">
        <mdb type="primary" @click="inputAdd" :long="true">{{language.sureAdd}}</mdb>
      </el-col>
    </el-row>
    <el-row class="margin5vw-t">
      {{language.requestParamPrev}}
      <pre>{{testData}}</pre>
    </el-row>
    <el-row class="margin5vw-t">
      {{language.requestResult}}
      <pre>{{reqTest}}</pre>
    </el-row>
  </span>
</template>

<script>
    import { setLocal , getLocal , clearLocal } from "@/function";

    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "RequestUtil" ,
        data () {
            return {
                select : "get" ,
                valueType : "string" ,
                inputUrl : "" ,
                inputKey : "" ,
                inputValue : "" ,
                testData : {} ,
                reqTest : {} ,
                historicalRequest : {}
            };
        } ,
        methods : {
            handleSelect ( item ) {
                this.inputUrl = item.value;
                this.testData = this.$avoid ( item.testData );
            } ,
            querySearch ( q , cb ) {
                let that = this;
                let options = [];
                if ( !!q ) {
                    for ( let k in that.historicalRequest ) {
                        if ( k.includes ( q ) ) {
                            options.push ( { testData : this.$avoid ( that.historicalRequest[ k ] ) , value : k } );
                        }
                    }
                } else {
                    for ( let k in that.historicalRequest ) {
                        options.push ( { testData : this.$avoid ( that.historicalRequest[ k ] ) , value : k } );
                    }
                }
                cb ( options );
            } ,
            modifyData ( k ) {
                this.inputKey = k;
                this.inputValue = this.testData[ k ];
            }
            ,
            deleData ( k ) {
                this.$delete ( this.testData , k );
            }
            ,
            inputAdd () {
                if ( this.valueType == "string" ) {
                    this.$set ( this.testData , this.inputKey , this.inputValue );
                } else {
                    this.$set ( this.testData , this.inputKey , +this.inputValue );
                }
            }
            ,
            async Request () {
                this.$set ( this.historicalRequest , this.inputUrl , this.$avoid ( this.testData ) )
                if ( this.select == "get" )
                    this.reqTest = await
                        this.$Get ( this.inputUrl , this.$avoid ( this.testData ) );
                else if ( this.select == "post" )
                    this.reqTest = await
                        this.$Post ( this.inputUrl , this.$avoid ( this.testData ) );
            }
        } ,
        mounted () {
            this.historicalRequest = getLocal ( "historicalRequest" , {} )
        }
        ,
        beforeDestroy () {
            setLocal ( "historicalRequest" , this.historicalRequest );
        }
    }
    ;
</script>