import axios from 'axios';
<template>
 <div class="ibox">
   <!-- 头部 -->
    <div class="header">
      <ul class="total">
        <li>
          <div class="h-left">
            <img src="../../assets/people.svg" alt="">
          </div>
          <div class="h-right">
            <span class="visit">New Visit</span> <br>
            <span class="num">102,130</span>
          </div>
        </li>
        <li>
           <div class="h-left">
            <img src="../../assets/news.svg" alt="">
          </div>
          <div class="h-right">
            <span class="visit">New Visit</span> <br>
            <span class="num">102,130</span>
          </div>
        </li>
        <li>
           <div class="h-left">
            <img src="../../assets/money.svg" alt="">
          </div>
          <div class="h-right">
            <span class="visit">New Visit</span> <br>
            <span class="num">102,130</span>
          </div>
        </li>
        <li>
           <div class="h-left">
            <img src="../../assets/car.svg" alt="">
          </div>
          <div class="h-right">
            <span class="visit">New Visit</span> <br>
            <span class="num">102,130</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="main">
       <div class="pross">
        <ve-line :data="chartData"></ve-line>
      </div>
      <div class="progress">
        <div> <ve-radar :data="radarChat"></ve-radar></div>
        <div><ve-pie :data="ringChat" ></ve-pie></div>
        <div><ve-histogram :data="chartData"></ve-histogram></div>
      </div>
    </div>
    <div class="bootom">
        <div class="left">
          <el-table :data="order" style="width: 100%" >
              <el-table-column
                prop="num"
                label="数量"
                width="300">
              </el-table-column>
              <el-table-column
                prop="price"
                label="单价"
                width="180">
              </el-table-column>
              <!-- <el-table-column
                prop="status"
                label="状态"
                 width="180">  
              </el-table-column> -->
              
              <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="warning" size="medium" v-if="scope.row.status===0">rending</el-button>
               <el-button type="primary" size="medium" v-if="scope.row.status===1">success</el-button>
            </template>
          </el-table-column>
            </el-table>
             </div>
        <div class="right">
          <div class="rone">
                  <div v-for ="item in list" :key="item.id">
                    <el-checkbox  :label="item.name" v-model="item.checked" border></el-checkbox>
                  </div>

                    <el-button @click="del">del</el-button>
                    <el-button @click="all">All</el-button>
                    <el-button @click="active">Active</el-button> 
                    <el-button @click="component">Componented</el-button>                
          </div>
          <div class="rtow">
             <img src="../../assets/s1.png" alt="">
             <div class="process">
              <div v-for="item in process" :key="item.id">
                <span> {{item.name}}</span>
                  <el-progress :text-inside="true"  :stroke-width="16" :percentage="item.progress*100"></el-progress> 
              </div>
             </div>
          </div>
         
        </div>
       
        
    </div>
 </div>
</template>

<script>
 export default {
      data () {
       this.ringChat = {
        roseType: 'radius'
      }
     return {
       process:null,
        list1:null,
          list: [
        {
          name: "star this repository",
          checked: false
        },
        {
          name: "fork this repository",
          checked: false
        },
        {
          name: "follow author",
          checked: false
        },
        {
          name: "vue-admin",
          checked: false
        },
        {
          name: "vue",
          checked: false
        },
        {
          name: "element-ui",
          checked: false
        },
        {
          name: "axios",
          checked: true
        },
        {
          name: "webpack",
          checked: true
        }
      ],
     
      chartData: {
          columns: ['date', 'expected', 'actual'],
          rows: null 
        },
      radarChat:{
        columns: ['name','sales', 'ministration', 'techology','delelopmer','marketing'],
        rows: null 
      },
      ringChat:{
         columns: ['name','data'],
         rows: null 
      },
       order:null,
      
     }
   },
   components: {

   },
   methods: {
     //各种图形
        getChat(){
        this.$axios.req('/homeChat').then(res=>{
          this.chartData.rows=res.data
            // console.log(this.rows)
        }).catch(err=>{
          console.log(err)
        })
      },
       getRander(){
        this.$axios.req('/radarChat').then(res=>{
          this.radarChat.rows=res.data
            // console.log(this.radarChat.rows)
        }).catch(err=>{
          console.log(err)
        })
      },
      getRing(){
         this.$axios.req('/ringChat ').then(res=>{
          this.ringChat.rows=res.data
            // console.log(this.ringChat.rows)
        }).catch(err=>{
          console.log(err)
        })
      },
       getOrder(){
         this.$axios.req('/orderData').then(res=>{
            this.order=res.data
            // console.log(this.order)
        }).catch(err=>{
          console.log(err)
        })
      },
      cheked(item){item.checked=!item.checked},
      //todolist
     del(){
       this.list= this.list.filter(item=>{
         return !item.checked
       })
       this.list1=this.list
     },
      all(){
     this.list = this.list1
     },
     active(){
      this.list= this.list1.filter(item=>{
          return item.checked===true
       })
     },
     component(){
       this.list= this.list1.filter(item=>{
                return item.checked===false
       })
     },
    //进度条
    getProcess(){
        this.$axios.req('/progress').then(res=>{
          this.process=res.data
          console.log(this.process)
        }).catch(err=>{
          console.log(err)
        })
    }
   
   },
   mounted() {
    this.list1=this.list
     this.getChat()
     this.getRander()
     this.getRing()
     this.getOrder()
     this.getProcess()
    
   },
   watch: {

   },
   computed: {
      status(){
           let status =this.order.status
           if(status===0){
             return 
           }
          }
   }
 }
</script>

<style scoped lang='scss'>
*{
  margin: 0;
  padding: 0;
}
.ibox{
 width: 100%;
  height: 100%;
  margin-top: 20px;
  // background: #ccc;
}
.header{
  width: 100%;
  margin-top:20px;
  .total{
    width: 100%;
    height: 100px;
  }
  li{
    width: 320px;
    height: 100px;
    float: left;
    margin-left: 20px;
    background: #fff;
    .h-left{
      height: 100%;
      float: left;
      width: 50%;
      img{
        width: 50%;
        height: 50%;
        margin-top: 12.5%;  
      }
    }
    .h-right{
      height: 100%;
      width: 50%;
      float: left ;
      line-height: 50px;
      text-align: center;
       span{
         margin-right: 15%
       }
    }
  }
  
}
.main{
  .pross,.progress{
    width: 100%;
    height: 400px;
    margin-top: 2%;
    border: 1px solid #000;
    background: #fff
  }
  .progress{
    display: flex;
    div{
      width: 300px;
      height: 200px;
      flex: 1;
      margin-left: 20px;
      margin-top: 20px;
    }
  }
}
.bootom{
  width: 100%;
  margin-top: 30px;
  .left{
    width: 42%;
   float: left;
  }
 .right{
   width: 50%;
   float: left;
   margin-left: 3%;
   .rone{
    width: 45%;
    float: left;
    height: 432px;
     background: #fff
    }
 
   }
   .rtow{
     margin-left: 5%;
      width: 50%;
      float: left;
      background: #fff;
     img{
       width: 100%;
       height: 50%;
     }
     .process{
        width: 100%;
       height: 222px;
     }
   }
 

}
</style>