<template>
 <div>
   <div class="box">
      <el-table :data="list" style="width: 100%">
      <el-table-column label="标题" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="摘要" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.abstract}}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类目" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.category }}</span>
        </template>
      </el-table-column>
       <el-table-column label="来源" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.source }}</span>
        </template>
      </el-table-column>
        <el-table-column label="重要性" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.star }}</span>
        </template>
      </el-table-column>
        <el-table-column label="文章内容" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.text }}</span>
        </template>
      </el-table-column>
       <el-table-column label="发布时间" width="220">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{$dayjs($dayjs(scope.row.date).valueOf()).format('YYYY年MM月DD日HH时mm分ss秒')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
           <el-button type="primary" size="small"  @click="dialog(scope.$index, scope.row)" >编辑</el-button>
          <el-dialog title="编辑页面" :visible.sync="centerDialogVisible"  width="30%" center>
            <el-form :model="obj">
              <el-form-item>
                 标题：<el-input v-model="obj.title" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                内容：<el-input v-model="obj.text" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                等级：<el-input v-model="obj.category" autocomplete="off"></el-input>
              </el-form-item>
               <el-form-item>
                时间： <el-date-picker
                        v-model="obj.date"
                        type="datetime"
                        placeholder="选择日期时间"
                        align="right"
                        :picker-options="pickerOptions">
                      </el-date-picker>
              </el-form-item>
           </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="edit1">取 消</el-button>
              <el-button type="primary" @click="edit1(scope.$index, scope.row)">确 定</el-button>
            </span>
          </el-dialog>
    <el-button size="small"  @click="handleDelete(scope.row,scope.index)" type="danger" style="margin-left:7px">删除</el-button>
           
    <el-button type="primary" size="small"  @click="look(scope.$index, scope.row)" >查看</el-button>
          <el-dialog title="查看页面" :visible.sync="centerDialogVisible"  width="30%" center>
            <el-form :model="obj">
              <el-form-item>
                 标题：<el-input v-model="obj.title" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item>
                内容：<el-input v-model="obj.text" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item>
                等级：<el-input v-model="obj.category" autocomplete="off" ></el-input>
              </el-form-item>
               <el-form-item>
                时间：<el-input v-model="obj.date" autocomplete="off" ></el-input>
              </el-form-item>
           </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="edit1">取 消</el-button>
              <el-button type="primary" @click="edit1()">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
   </div>
  
 </div>
</template>

<script>
 export default {
   data () {
     return {
       pickerOptions:null,
        list:null,
        obj:{
          title:'',
          text:'',
          category:'',
          date:''
        },
        centerDialogVisible: false,
     }
   },
   components: {

   },
   methods: {
        handleDelete(row,index) {
            console.log(row._id)
           this.$axios.req('/article/delete',{_id:row._id}).then(res => {
            this.list = this.list.filter(item => {
            return item !== row;
             console.log(删除成功)
          });
          }).catch(err => {
              console.log(err)
          });
         
        },

        dialog(index,row){
        this.centerDialogVisible =true
          this.obj =row
        },
        look(index,row){
        this.centerDialogVisible =true,
        this.obj =row
        },
        edit1(index,row){
          this.centerDialogVisible =false
          this.$axios.req('/article/update',{_id:row._id}).then(res => {
            console.log(res)
          }).catch(err => {
              console.log(err)
          });  
         
        },

          getData(){
        this.$axios.req('/article/allArticle').then(res => {
            this.list = res.data
        }).catch(err => {
            console.log(err)
        });

      }
   },
   mounted() {
     this.getData()
   },
   watch: {

   },
   computed: {
       
   }
 }
</script>

<style scoped lang='scss'>
.box{
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>