<template>
  <div class="app">
   <div class="box">
       <input type="text" v-model="username"> <span>{{already}}</span><br>
       <input type="text" v-model="password"><br>
       <button @click="register">注册</button>
   </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
     username:null,
     password:null,
     already:'',
     }
   },
   components: {

   },
   methods: {
   
     register(){
        this.$axios.req('/user/register',{username: this.username,password: this.password}).then((res)=>{
               console.log(res)
               if(res.code===200){
                this.$router.push({path:'/Login'})
               }else if(res.code===1){
                    this.already='用户已存在'
               }else if(res.code===500){
                   this.already='不能为空'
               }
           }).catch((err)=>{
                console.log(err)
           })
      } 
    },
   mounted() {
          
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.app{
  width: 100%;
   height: 100%;
  background-image: url('../../assets/login1.jpg');
   background-repeat: repeat; 
    img{
      height: 100%;
    }
  // background: red;
}
.box{
  width: 30%;
  height: 300px;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  border: 1px solid #000;
  margin: 10% auto;
  z-index: 200;
  background: sandybrown;

}
</style>