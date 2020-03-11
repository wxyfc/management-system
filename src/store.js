import Vue from 'vue'
import Vuex from 'vuex'

Vue.use ( Vuex )
export default new Vuex.Store ( {
    state : {
        userInfo : {} , //用户信息
        otherInfo : {} , //其他信息
        language : {} ,//语言
        briefInfo : {}
    } ,
    getters : {
        getUserInfo ( state ) {
            //获取用户信息
            return state.userInfo;
        } ,
        getOtherInfo ( state ) {
            //获取其他信息
            return state.otherInfo;
        } ,
        getLanguage ( state ) {
            return state.language;
        } ,
        getBriefInfo ( state ) {
            return state.briefInfo;
        }
    } ,
    mutations : {
        setUserInfo ( state , value ) { //设置用户信息
            for ( let key in value ) {
                Vue.set ( state.userInfo , key , value[ key ] );
            }
            // let time = new Date ();
            // Vue.set ( state.userInfo , "lastTime" , {
            //     date : time.toLocaleString () ,
            //     second : time.getTime ()
            // } );
        } ,
        lastUserInfo ( state , value = {} ) {
            let time = new Date ();
            let date;
            if ( value.hasOwnProperty ( "date" ) ) {
                date = value.date;
            } else {
                date = time.toLocaleString ();
            }
            let second;
            if ( value.hasOwnProperty ( "second" ) ) {
                second = value.second;
            } else {
                second = time.getTime ();
            }
            Vue.set ( state.userInfo , "lastTime" , { date , second } );
        } ,
        deleteUserInfo ( state , value ) {
            Vue.delete ( state.userInfo , value.key );
        } ,
        setOtherInfo ( state , value ) { //设置其他信息
            for ( let key in value ) {
                Vue.set ( state.otherInfo , key , value[ key ] );
            }
            // let time = new Date ();
            // Vue.set ( state.otherInfo , "lastTime" , {
            //     date : time.toLocaleString () ,
            //     second : time.getTime ()
            // } );
        } ,
        deleteOtherInfo ( state , value ) {
            Vue.delete ( state.otherInfo , value.key );
        } ,
        setLanguage ( state , value ) {
            for ( let key in value ) {
                Vue.set ( state.language , key , value[ key ] );
            }
            // let time = new Date ();
            // Vue.set ( state.language , "lastTime" , {
            //     date : time.toLocaleString () ,
            //     second : time.getTime ()
            // } );
        } ,
        setBriefInfo ( state , value ) { //设置其他信息
            for ( let key in value ) {
                Vue.set ( state.briefInfo , key , value[ key ] );
            }
        } ,
        deleteBriefInfo ( state , value ) {
            Vue.delete ( state.briefInfo , value.key );
        } ,
        clearVuex ( state ) {
            state.userInfo = {};
            state.otherInfo = {};
        }
    } ,
    actions : {
        upVuex ( context , data ) { //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
            context.commit ( data.mutations , data.value );
        }
    }
} )

/*
   updateOtherInfo(key, date) {
      //添加其他的信息
      this.$store.dispatch("upVuex", {
        mutations: "updateOtherInfo",
        value: {
          key: key,
          date: date
        }
      });
    },
    updateUserInfo(key, date) {
      //添加用户的信息
      this.$store.dispatch("upVuex", {
        mutations: "updateUserInfo",
        value: {
          key: key,
          date: date
        }
      });
    },
    updateUserInfo(state, value) { //更新用户信息
      Vue.set(state.userInfo, value.key, value.date);
    },
    updateOtherInfo(state, value) { //更新其他信息
      Vue.set(state.otherInfo, value.key, value.date);
    },
    */
