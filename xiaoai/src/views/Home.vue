<template class="container">
 <div  class="container">
<el-container class="container">
  <el-header>
     <div class="left">
      <span>欢迎{{data}}来到小爱管理系统</span>
    </div>
   <div class="right">
     <div class="r-msg">
      <span>下午好,</span>
      <span>亲爱的{{data}}</span>
      </div>
      <span>登录时间{{user}}</span>
    </div> 
  </el-header>
  <el-container>
    <el-aside width="200px">
        <el-row class="tac">
       <el-col :span="24">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item  v-for="(item,index) in rts" :key="index" :index="item.path"  @click="routes(item)">
               <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
     </el-aside>
    <el-main>
       <router-view></router-view>
    </el-main>
     
  </el-container>
</el-container>
<!--   -->
 </div>
</template>

<script>
 export default {
   data () {
     return {
      user:null,
      data:null,
      rts:
      [{name:'首页',path:'/',           icon:'el-icon-menu'},
      {name:'分页表格',path:'publish',   icon:'el-icon-menu'},
      {name:'标签页',path:'/tag',  icon:'el-icon-menu'},
      {name:'图片上传',path:'/upload',icon:'el-icon-menu'},
      {name:'已发表',path:'/statistics',       icon:'el-icon-menu'},
      {name:'发表文章',path:'/markdown',  icon:'el-icon-menu'},
       {name:'统计',path:'/total',  icon:'el-icon-menu'},
      {name:'导出excel',path:'/excel',  icon:'el-icon-menu'},
      {name:'退出系统',path:'/lgout',   icon:'el-icon-menu'},
      ]
     }
   },
  //  beforeRouteLeave (to, from, next) {
  //     this.rts=to.path
  //     console.log(rts)
  //  },
   components: {

   },
   methods: {
     routes(item){  
          this.$router.push(item.path)
    
       },
      
   },
   mounted() {
       this.data=localStorage.getItem('username')
       this.user=this.$dayjs(Date.parse(new Date()),).format('YYYY年MM月DD日HH时mm分ss秒')   
   },
   watch: {

   },
   computed: {

   }
 }
 
</script>

<style scoped lang='scss'>
*{
  margin: 0 !important;
  padding: 0 !important;
}
.el-header{
    background-color: rgb(168, 66, 106);
    color: rgb(51, 51, 51);
      line-height: 60px;
    .left{
      float: left;
      margin-left: 13% !important;
   
    }
   .right{
     float: right;
      margin-right: 5% !important;
      .r-msg{
        float: left;
        margin-right: 20px !important;
      }
     } 
  }
.container{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  top: 0;
  bottom: 0;
}
  .el-aside {
     height: 100%;
    background-color:rgb(84, 92, 100);
    color: #333;
   
  }
  .el-main{
    background-color:#ccc;
  }
  .el-menu-vertical-demo{
    width: 100%;
  }
     
  .el-menu-item{
 margin-left:  15px !important;
  }
  

</style>