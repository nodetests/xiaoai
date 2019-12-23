<template>
  <div>
    <div>
      <el-input placeholder="请输入内容" v-model="keyword" @input="serach"></el-input>
    </div>
    <el-table :data="serach()" style="width: 100%">
      <el-table-column label="名称" width="270">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.NAME }}</span>
        </template>
      </el-table-column>

      <el-table-column label="编号" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.GOODS_SERIAL_NUMBER }}</span>
        </template>
      </el-table-column>
      <el-table-column label="原价" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ORI_PRICE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="现价" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.PRESENT_PRICE }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
           
           <el-button type="success" size="mini" @click="dialog(scope.$index, scope.row)" >编辑</el-button>
          <el-dialog title="编辑页面" :visible.sync="centerDialogVisible"  width="30%" center>
            <el-form :model="obj">
              <el-form-item>
                 <el-input v-model="obj.NAME" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                 <el-input v-model="obj.ORI_PRICE" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                 <el-input v-model="obj.PRESENT_PRICE" autocomplete="off"></el-input>
              </el-form-item>
           </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="edit1">取 消</el-button>
              <el-button type="primary" @click="edit1">确 定</el-button>
            </span>
          </el-dialog>

          <el-button size="mini" type="danger" @click="handleDelete(scope.row,scope.index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      small
      layout="prev, pager, next"
      :total="num"
    ></el-pagination>
    
    <download-excel
    class = "export-excel-wrapper"
    :data = "list"
    :fields = "json_fields"
    name = "filename.xls">
    <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
    <el-button type="primary" size="small">导出EXCEL</el-button>
</download-excel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      json_fields:{'名称':'NAME','编号':'GOODS_SERIAL_NUMBER','原价':'ORI_PRICE','现价':'PRESENT_PRICE'},
     
      list: null,
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      keyword: null,
      value: null,
      num:null,
      centerDialogVisible: false,
      obj:{},
      
    };
  },
  components: {},
  methods: {
    getData() {
      this.$axios
        .req("/tableData")
        .then(res => {
          this.list = res.data;
          // console.log(this.list);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      // console.log(this.currentPage); //点击第几页
    },
    handleDelete(row,index) {
      this.list = this.list.filter(item => {
        return item !== row;
      });
    },
   
    serach() {
      let arr = this.list;
      console.log(arr);
      arr = arr.filter(item => JSON.stringify(item).includes(this.keyword));
      console.log(arr);
      this.num=arr.length
      return arr.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    dialog(index,row){
     this.centerDialogVisible =true,
     this.obj =row
     console.log(row)
     },
     edit1(){
       this.centerDialogVisible =false
     }
  },
  mounted() {
    this.getData();
  },
  watch: {
    // keyword(val){
    //    this.value =this.keyword
    // }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.el-table-column -column{
  text-align: center
}
</style>