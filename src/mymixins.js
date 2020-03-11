let m = {
    data () {
        return {
            h : "http://localhost:5233"//全局请求地址
        };
    } ,
    computed : {
        userInfo () {
            return this.$store.getters.getUserInfo;
        } ,
        otherInfo () {
            return this.$store.getters.getOtherInfo;
        } ,
        language () {
            return this.$store.getters.getLanguage;
        } ,
        briefInfo () {
            return this.$store.getters.getBriefInfo;
        }
    } ,
    watch : {
        // userInfo: {
        //   handler(newValue, oldValue) {
        //     this.$log({ text: "userInfo", newValue });
        //   },
        //   immediate: true, //最初监听
        //   deep: true //深度监听
        // },
        // otherInfo: {
        //   handler(newValue, oldValue) {
        //     this.$log({ text: "otherInfo", newValue });
        //   },
        //   immediate: true, //最初监听
        //   deep: true //深度监听
        // }
    } ,
    methods : {
        deleteOtherInfo ( k ) {
            //删除其他的信息
            this.$store.dispatch ( "upVuex" , {
                mutations : "deleteOtherInfo" ,
                value : {
                    key : k
                }
            } );
        } ,
        setOtherInfo ( v ) {
            //设置其他的信息
            this.$store.dispatch ( "upVuex" , {
                mutations : "setOtherInfo" ,
                value : v
            } );
        } ,
        deleteUserInfo ( k ) {
            //删除用户的信息
            this.$store.dispatch ( "upVuex" , {
                mutations : "deleteUserInfo" ,
                value : {
                    key : k
                }
            } );
        } ,
        setUserInfo ( v ) {
            //设置用户的信息
            this.$store.dispatch ( "upVuex" , {
                mutations : "setUserInfo" ,
                value : v
            } );
        } ,
        lastUserInfo ( v = {} ) {
            //设置用户的信息
            this.$store.dispatch ( "upVuex" , {
                mutations : "lastUserInfo" ,
                value : v
            } );
        } ,
        setBriefInfo ( v ) {
            //设置临时的信息
            this.$store.dispatch ( "upVuex" , {
                mutations : "setBriefInfo" ,
                value : v
            } );
        } ,
        deleteBriefInfo ( k ) {
            //删除临时的信息
            this.$store.dispatch ( "upVuex" , {
                mutations : "deleteBriefInfo" ,
                value : {
                    key : k
                }
            } );
        } ,
        post ( u , p , f , ts ) {
            let that = this;
            return new Promise ( ( resolve , reject ) => {
                this.$Post ( this.h + u , p , f ).then ( res => {
                    that.backRequest ( u , res , ts );
                    resolve ( res )
                } ).catch ( ( e ) => {
                    reject ( e )
                } );
            } );
        } ,
        get ( u , p , f , ts ) {
            let that = this;
            return new Promise ( ( resolve , reject ) => {
                this.$Get ( this.h + u , p , f ).then ( res => {
                    that.backRequest ( u , res , ts );
                    resolve ( res )
                } ).catch ( ( e ) => {
                    reject ( e )
                } );
            } );
        } ,
        backRequest ( u , res , ts ) {
            this.$log ( {
                u ,
                res
            } );
            let c = res.ErrCode || res.Code || res.errCode || res.code || res.Errcode || res.errcode;
            let i = this.ifServerCode ( c )
            if ( i != 1 || ts ) {
                this.eleNotify ( res.ErrMsg || res.message || res.Message , i );
            }
        } ,
        eleNotify ( t , i = 0 ) {
            //message
            //notify
            let ml = [ "info" , "success" , "warning" , "error" ]
            this.$message ( {
                message : t ,
                type : ml[ i ] ,
                duration : 3000 ,
                offset : 100 ,
                customClass : "messageBox"
            } );
        } ,
        ifServerCode ( i ) {
            let s = [ 200 ];//成功
            let w = [ 300 ];//警告
            let e = [ 400 ];//失败
            if ( s.includes ( i ) ) {
                return 1;
            } else if ( w.includes ( i ) ) {
                return 2;
            } else if ( e.includes ( i ) ) {
                return 3;
            } else return 0;
        }
    }
};
export default m;