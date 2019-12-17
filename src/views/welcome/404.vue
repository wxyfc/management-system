<template>
    <el-card class="h9999">
        <h1 class="alncnt">404</h1>
        <!-- <el-input v-model="city">
          <mdb slot="append" icon="el-icon-search" @click="get"></mdb>
        </el-input>-->
        <br>
        <span v-if="weather.hasOwnProperty('country')">
      <img
              :src="`https://www.tianqiapi.com/static/skin/${img[Math.floor(Math.random()*Math.floor(6))]}/${weather.wea_img}.png`"
      >
      <br>
      {{weather.country}}
      {{weather.city}}
      {{weather.date}}
      {{weather.week}}
      {{weather.wea}}
      {{weather.win}}
      {{weather.win_speed}}
      {{weather.air_tips}}
    </span>
    </el-card>
</template>

<script>
    export default {
        name : "error-404" ,
        data () {
            return {
                weather : {} ,
                city : "上海" ,
                img : [ "cherry" , "durian" , "cucumber" , "pitaya" , "pear" , "peach" , "mango" ]
            };
        } ,
        methods : {
            async req () {
                let version = "v6";
                let appid = "25161667";
                let appsecret = "y5cW8f2j";
                // let cityid = "101020100";
                this.weather = await this.$Get ( "/weather" , {
                    appid ,
                    appsecret ,
                    version ,
                    city : this.city
                } );
            }
        } ,
        mounted () {
            // this.req();
        } ,
        beforeDestroy () {
            if ( this.$route.name == "ready" ) {
                this.$router.go ( -1 );
            }
        }
    };
</script>
