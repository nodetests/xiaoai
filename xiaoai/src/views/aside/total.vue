<template>
  <div>
    <div class="header">
      <ul>
        <li @click="msg(1)" class="now">
          <span>今日发布</span>
          <i class="el-icon-check"></i>
        </li>
        <li @click="msg(2)" class="atl">
          <span>原创文章</span>
          <i class="el-icon-s-order"></i>
        </li>
        <li @click="msg(3)" class="msg">
          <span>新留言</span>
          <i class="el-icon-message-solid"></i>
        </li>
        <li @click="msg(4)" class="news">
          <span>新消息</span>
          <i class="el-icon-chat-dot-round"></i>
        </li>
      </ul>
    </div>

    <div v-if="flag===1">
      <div class="main">
        <div class="canvas">
          <ve-pie :data="ringChat"></ve-pie>
        </div>
        <div class="canvas">
          <ve-pie :data="ringChat1"></ve-pie>
        </div>

        <div class="canvas1">
          <ve-histogram :data="charDate"></ve-histogram>
        </div>
      </div>
    </div>

    <div v-if="flag===2"></div>

    <div v-if="flag===3"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: 1,
      list: null,
      category: null,
      source: null,
      charDate: {
        columns: ["name", "value"],
        rows: []
      },
      ringChat: {
        columns: ["name", "value"],
        rows: []
      },
      ringChat1: {
        columns: ["name", "value"],
        rows: []
      }
    };
  },
  components: {},
  methods: {
    msg(n) {
      this.flag = n;
    },
    getNum(arrs, items) {
      return arrs.filter(item => {
        return item.category === items;
      }).length;
    },

    getNum1(arrs, items) {
      return arrs.filter(item => {
        return item.source === items;
      }).length;
    },
    getNum2(arrs, items) {
      return arrs.filter(item => {
        return item.date === items;
      }).length;
    },

    getData() {
      this.$axios
        .req("/article/allArticle")
        .then(res => {
          let arr = res.data;
          let obj = {};
          // arr.map(item=>{
          //     if(this.ringChat.rows.every(items=>{
          //       return items.category!==item.category
          //     })) {
          //     this.ringChat.rows.push({
          //     category:item.category,
          //     num:this.getNum(res.data,item.category)
          //   })
          //  }
          // })
          // console.log(arr)
          //类目
          arr.map(item => {
            obj[item.category] = obj[item.category] + 1 || 1;
            //  console.log(obj)
          });
          Object.keys(obj).map(item => {
            return this.ringChat.rows.push({ name: item, value: obj[item] });
          });
          //source
          let obj1 = {};
          arr.map(item => {
            obj1[item.source] = obj1[item.source] + 1 || 1;
            //  console.log(obj)
          });
          Object.keys(obj1).map(item => {
            return this.ringChat1.rows.push({ name: item, value: obj1[item] });
          });
          //时间
          let obj2 = {};

          arr.map(item => {
            console.log(item);
            item.date = this.$dayjs(item.date).format("YYYY-MM-DD");
            //  item.date =this.$dayjs(item.date).valueOf()
            obj2[item.date] = obj2[item.date] + 1 || 1;
            // console.log(obj2);
          });

          Object.keys(obj2).map(item => {
            return this.charDate.rows.push({ name: item, value: obj2[item] });
          });
          // console.log(this.charDate.rows)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getData();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.header {
  width: 100%;
  height: 100px;
  // background: #8fbc8f;
  ul {
    border-bottom: 1px solid rgb(82, 80, 80);
    li {
      width: 25%;
      height: 100px;
      float: left;
      text-align: center;
      line-height: 100px;
    }
    .now {
      background: #8ee5ee;
    }
    .atl {
      background: #f4a460;
    }
    .msg {
      background: #8470ff;
    }
    .news {
      background: #87ceeb;
    }
  }
}
.main {
  width: 100%;
  height: 900px;
  //  border: 1px solid #000;
  background: #fff;
  .canvas {
    width: 40%;
    height: 300px;
    float: left;
    margin-left: 5%;
  }
  .canvas1 {
    width: 90%;
    height: 400px;
    float: left;
    margin-left: 5%;
  }
}
</style>