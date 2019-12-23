<template>
 <div>
  <el-button type="primary" @click="exit" v-if="flag">退出登录</el-button>
  <div>
    <img src="../../assets/exit.jpg" alt="" v-if="!flag">
  </div>
  
 </div>
</template>

<script>
 export default {
   data () {
     return {
          flag:true
     }
   },
   components: {

   },
   methods: {
      exit(){
        this.flag=false
       localStorage.removeItem('username')
      }
   },
   mounted() {
         this.name=  localStorage.getItem('username')
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>