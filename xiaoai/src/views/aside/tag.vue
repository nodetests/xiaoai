<template>
  <div>
    <div class="header">
      <ul>
        <li @click="msg(1)">未读消息({{list.length}})</li>
        <li @click="msg(2)">已读消息({{list2.length}})</li>
        <li @click="msg(3)">回收站({{list3.length}})</li>
      </ul>
    </div>
    <div class="main">
      <div v-if="flag===1">
        <div v-for="item in list" :key="item.id" class="f1">
          <div class="msg">
            <span>{{item.msg}}</span>
            <span>{{$dayjs(item.time).format('YYYY年MM月DD日HH时mm分ss秒')}}</span>
            <span>
              <el-button type="primary" plain @click="fresh(item)">标记已读</el-button>
            </span>
          </div>
        </div>
        <div>
          <el-button type="primary" @click="all">全部标记已读</el-button>
        </div>
         
      </div>

      <div v-if="flag===2">
        <div v-for="item in list2" :key="item.id" class="f1">
          <div class="msg">
            <span>{{item.msg}}</span>
            <span>{{$dayjs(item.time).format('YYYY年MM月DD日HH时mm分ss秒')}}</span>
            <span>
              <el-button type="primary" plain @click="fresh2(item)">扔到回收站</el-button>
            </span>
          </div>
        </div>
        <div>
          <el-button type="primary" @click="all2">全部扔到回收站</el-button>
        </div>
      </div>

      <div v-if="flag===3">
        <div v-for="item in list3" :key="item.id" class="f1">
          <div class="msg">
            <span>{{item.msg}}</span>
            <span>{{$dayjs(item.time).format('YYYY年MM月DD日HH时mm分ss秒')}}</span>
            <span>
              <el-button type="primary" plain @click="fresh3(item)">删除</el-button>
            </span>
          </div>
        </div>
        <div>
          <el-button type="primary" @click="all3">全部删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rmsg from "./tag/rmsg";
import nmsg from "./tag/nmsg";
import recycle from "./tag/recycle";
export default {
  data() {
    return {
      flag: 1,
      list: [
        { msg: "今天想写1个组件1", time: Date.parse(new Date()) },
        { msg: "今天想写2个组件2", time: Date.parse(new Date()) },
        { msg: "今天想写3个组件3", time: Date.parse(new Date()) },
        { msg: "今天想写4个组件4", time: Date.parse(new Date()) },
        { msg: "今天想写5个组件5", time: Date.parse(new Date()) }
      ],
      list2: [],
      list3: []
    };
  },
  components: {
    rmsg,
    nmsg,
    recycle
  },
  methods: {
    msg(n) {
      this.flag = n;
    },
    fresh(rms) {
      this.list2.push(this.list.filter(item => {return item === rms;})[0]);
      this.list = this.list.filter(item => { return item !== rms})
    },

     fresh2(rms) {
      this.list3.push(this.list2.filter(item => {return item === rms})[0])
      this.list2 = this.list2.filter(item => {return item !== rms })
    },
     fresh3(rms) {
      this.list3 = this.list3.filter(item => {return item !== rms })
    },
    all(){
      // this.list2.push(...this.list)
      // this.list.splice(0)
      this.list2 = this.list
      this.list = this.list.filter(item=>{return !item })
    },
    all2(){
      this.list3 = this.list2
      this.list2 = this.list2.filter(item=>{return !item })
    },
    all3(){
      this.list3 = this.list3.filter(item=>{return !item })
    },

  },
  mounted() {
    console.log(this.list2);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.header {
  width: 100%;
  height: 100px;
  background: #8fbc8f;
  ul {
    border-bottom: 1px solid rgb(82, 80, 80);
    li {
      width: 30%;
      height: 100px;
      float: left;
      text-align: center;
      line-height: 100px;
    }
  }
}
.main {
  width: 90%;
  height: 600px;
  margin-left: 5%;
  //  border: 1px solid #000;
  background: #fff;
  .f1 {
    width: 100%;
    height: 60px;

    line-height: 60px;
    .msg {
      width: 90%;
      height: 60px;
      border-bottom: 1px solid #ccc;
      margin-left: 5%;
      display: flex;
      span {
        flex: 1;
      }
    }
  }
}
</style>