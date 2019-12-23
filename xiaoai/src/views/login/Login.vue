<template>
  <div class="app">
    
    <div class="box">
     <div>
          请输入账号：
      <input type="text" v-model="username" required />
      <br /> 请输入密码：
      <input type="text" v-model="password" />
       <div class="code">
      请输验证码：
       <input type="text" v-model="codes" />
       <span v-html="inputCode" @click="reCode">{{inputCode}}</span>
      </div>  
      <button @click="login">登录</button>
      <button @click="register">注册</button>
      </div>
    </div>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
      inputCode: null,
      codes:null,
      list:[],
    };
  },
  components: {},
  methods: {
    reCode(){
       this.$axios.req('/captcha').then((res)=>{
            this.inputCode=res
            // console.log(this.inputCode)
          }).catch((err)=>{
            console.log(err)
          })
    },
    createCode(){
          this.$axios.req('/captcha').then((res)=>{
            this.inputCode=res
            // console.log(this.inputCode)
          }).catch((err)=>{
            console.log(err)
          })
    },
    login() {
      this.$axios.req("/user/login", {
        username: this.username,password: this.password,code:this.codes
        }).then(res => {
        this.list=res
        console.log(this.list)
         if(this.list.code==1){
           alert(this.list.message)
        }else if(this.list.code==200){
             let user =this.list.data[0]
              console.log(user)
           localStorage.setItem('username',user.username)
           localStorage.setItem('password',user.password)
           this.$store.state.username =localStorage.getItem('username')
           this.$store.state.password =localStorage.getItem('password')
           this.$router.push({name:'index',params:{data:this.list.data[0]}})
        }
        }).catch(err => {
          console.log(err);
        });
       
    },
    register() {
      this.$router.push("/Register");
    }
  },
  mounted() {
    this.createCode();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
body{
  position: relative;
}
.app {
 position: absolute;
 top: 0;
 bottom: 0;
 left: 0;
 right: 0;;
background-image: url("../../assets/login1.jpg");  
}
.box {
  width: 36%;
  height: 300px;
  border: 1px solid #000;
  margin: 0 auto;
margin-top: 10%;
  z-index: 200;
  background: sandybrown;
  opacity: 0.8;
  input{
   width: 200px;
   height: 30px;
   margin-top: 5px;
   margin: 0;
   padding: 0;
  }
  .code{
    height: 50px;
   
    input{
     line-height: 50px;
    }
  }
  button{
     margin-top: 20px;
  }
}
</style>