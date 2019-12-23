<template>
 <div>
  <div v-for="item in list1" :key="item.id" class="f1">
           <div class="msg">
             <span>{{item.msg}}</span>
             <span>{{$dayjs(item.time).format('YYYY年MM月DD日HH时mm分ss秒')}}</span> 
             <span><el-button type="primary" plain @click="fresh(item)">标记已读</el-button></span> 
           </div>
        
        </div>
 </div> 
</template>

<script>
 export default {
   props:{
    list: {
        // 数据类型
        type: Array,
        // 默认值
        default: '我是默认值',
        // 是否是必传项
        required: true
      },
   },
   data () {
     return {
        list1:null,
        arr:null
     }
   },
   components: {
    
   },
   methods: {
     fresh(rms){
         this.list1 = this.list1.filter(item=>{
                return item !== rms
                // this.arr=this.arr.push(rms)   
               
          })
          console.log(this.arr)
     }
   },
   mounted() {
       this.list1 =this.list
       console.log(this.list1)
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
 .f1{
     width: 100%;
     height: 60px;
   
     line-height: 60px;
     .msg{
       width: 90%;
       height: 60px;  
       border-bottom: 1px solid #ccc;
       margin-left: 5%;
       display: flex;
       span{
         flex: 1
       }
     }
   }
</style>