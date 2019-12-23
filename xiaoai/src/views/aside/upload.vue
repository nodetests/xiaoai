<template>
 <div>
   <div class="box">
   <div class="header">
     <h2>支持拖拽</h2>
     <div>Element UI自带组件</div>
   </div>
   <div class="main">
     <el-upload
      class="upload-demo"
      drag
      action="api/upload"
    
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="true"
      multiple>
      <div>
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </div> 
    </el-upload>
   </div>

   <div class="bottom">
     <h2>支持裁剪</h2>
        <el-button type="primary" class="btn" @click="toggleShow">设置头像</el-button>
     <my-upload  
     @crop-success="cropSuccess" 
     @crop-upload-success="cropUploadSuccess"
    @crop-upload-fail="cropUploadFail"
     v-model="show" 
     :width="200" 
     :height="200" 
     img-format="png" 
     :size="size"
     langType='zh'
     :noRotate='false'
     field="file"
     url="api/upload"></my-upload>
     <img :src="imgDataUrl">
   </div>

  </div>
 </div>
</template>

<script>
import 'babel-polyfill'
import myUpload from 'vue-image-crop-upload'
 export default {
   data () {
     return {
       fileList:[],
        imgDataUrl: "",
        show: false,
        size:2.1
     }
   },
   components: {
    "my-upload": myUpload
   },
   methods: {
          submitUpload() {
           this.$refs.upload.submit();
          },
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePreview(file) {
            console.log(file);
      }, 
              toggleShow() {
            this.show = !this.show;
        },
        cropSuccess(imgDataUrl, field) {
          this.imgDataUrl =imgDataUrl
            // console.log('-------- crop success --------',imgDataUrl, field);
        },
        //上传成功回调
        cropUploadSuccess(jsonData, field){
            console.log('-------- upload success --------');
            this.imgDataUrl = jsonData.files.file;
            // console.log(jsonData);
            // console.log('field: ' + field);
        },
        //上传失败回调
        cropUploadFail(status, field){
            // console.log('-------- upload fail --------');
            // console.log('上传失败状态'+ status);
            // console.log('field: ' + field);
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
.box{
  width: 90%;
  height: 700px;
   background: #fff;
   .header{ 
     width: 80%;
     margin-left: 3%;
     margin-bottom: 1%;
     h2{
       height: 30px;
      font-size: 30px;
     }
     div{
      height: 30px;
      font-size: 22px;
      margin-top: 20px;
       background: #ccc;
     }
 }
 .main{
     width: 80%;
     margin-left: 3%;
 }
 .bottom{
     width: 80%;
     margin-left: 3%;
     margin-top: 1%;
       h2{
       height: 30px;
      font-size: 30px;
     }
     div{ 
        .cropper {
            width: auto;
            height: 300px;
        }

     }
 }
}
 
</style>