<template>
 <div>
   <div class="header">
       <div>
           <el-button type="primary" @click="look">查看</el-button>
           <el-button type="danger" @click="submit">发布</el-button>
       </div>
   </div>
   <div class="main">
     <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章标题" prop="title" required >
        <el-input v-model="ruleForm.title"></el-input>
       </el-form-item>
       <el-form-item label="文章摘要" prop="abstract" required >
        <el-input v-model="ruleForm.abstract"></el-input>
       </el-form-item>
        <el-form :inline="true" class="ruleForm"  ref="ruleForm" :model="ruleForm" >
          <el-form-item label="作者" prop="author"  required  >
              <el-input v-model="ruleForm.author"></el-input>
          </el-form-item>
          <el-form-item label="类目" prop="category"  required>
             <el-select v-model="ruleForm.category" placeholder="请选择类目">
              <el-option label="Vue" value="Vue"></el-option>
              <el-option label="Html" value="Html"></el-option>
              <el-option label="Js" value="Js"></el-option>
              <el-option label="Css" value="Css"></el-option>
               </el-select>
          </el-form-item>
           <el-form-item label="来源" prop="source"  required>
              <el-select v-model="ruleForm.source" placeholder="请选择来源">
              <el-option label="原创" value="原创"></el-option>
              <el-option label="转载" value="转载"></el-option>
              <el-option label="合作" value="合作"></el-option>
               </el-select>
          </el-form-item>
           <el-form-item label="重要性" prop="star"  required>
              <el-input v-model="ruleForm.star"></el-input>
          </el-form-item>
          <el-form-item label="发布时间" prop="date"  required>
               <el-col :span="11">
                <el-form-item prop="date">
                   <el-date-picker
                    v-model="ruleForm.date"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
               </el-col>
          </el-form-item>
           <el-form-item label="发布内容" prop="text"  required>
              <mavon-editor v-model="ruleForm.text"></mavon-editor>
          </el-form-item>
          <el-form-item>
               <el-button @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
      
       </el-form>
   </div>
   <div>
     
   </div>
     
 </div>
</template>

<script>
 export default {
   data () {
     return {
         ruleForm: {
           title: '',
           abstract: '',
           author:  '',
           category: '',
           source:'',
           date: '',
           text:  '',
        },
          rules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
          ],
          abstract: [
            { required: true, message: '请选择文章摘要', trigger: 'blur' }
          ],
           author: [
            { required: true, message: '请填写作者', trigger: 'blur' }
          ],
           source: [
            { required: true, message: '请选择来源', trigger: 'change' }
          ],
           category: [
            {  required: true, message: '请至少选择一个类目', trigger: 'change' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
        }
     }
   },
   components: {

   },
   methods: {
      submit(){
        this.$axios.req('/article/create ',this.ruleForm).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
      },

       look(){

       },
   },
  
   mounted() {
    // this.getData()
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.header{
  width: 100%;
  height: 50px;
  background:	#008B8Bcc;
   div{
     float: right;
     line-height: 50px;
   }
}
.ruleForm{
  margin-left: 50px;
 
}
</style>