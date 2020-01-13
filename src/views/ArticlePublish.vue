<template>
  <div class="articlePublish">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">文章管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
        <el-form ref="form" :model="postList" label-width="80px">
            <!-- 标题 -->
            <el-form-item label="标题:">
                <el-input v-model="postList.title"></el-input>
            </el-form-item>
            <!-- 单选框 -->
            <el-form-item label="类型:">
                <el-radio-group v-model="postList.type">
                    <el-radio :label="1">文章</el-radio>
                    <el-radio :label="2">视频</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 内容 -->
            <el-form-item label="内容:">
                <!-- 文章 -->
                <VueEditor :config="config" v-if="postList.type===1" ref="content"/>
                <!-- 视频 -->
                <el-upload class="upload-demo"  action v-if="postList.type===2">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传视频</div>
                </el-upload>
            </el-form-item>
            <!-- 栏目 -->
            <el-form-item label="栏目:">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="postList.categories" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="cate in cateList" :label="cate.id" :key="cate.id">{{cate.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <!-- 按钮 -->
            <el-button @click="publish" type="primary">发布</el-button>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
import { getCateList } from '@/apis/article.js'
export default {
  data () {
    return {
      postList: {
        title: '',
        type: 1,
        categories: [],
        content: '',
        cover: []
      },
      isIndeterminate: false,
      checkAll: false,
      cateList: [],
      // 富文本框配置
      config: {
        // 上传图片的配置
        uploadImage: {
          headers: this.getToken(),
          url: 'http://localhost:3000/upload',
          name: 'file',
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            console.log(res)
            insert('http://localhost:3000' + res.data.data.url)
          }
        },
        // 上传视频的配置
        uploadVideo: {
          headers: this.getToken(),
          url: 'http://localhost:3000/upload',
          name: 'file',
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          }
        }
      }
    }
  },
  components: {
    VueEditor
  },
  methods: {
    // 获取token
    getToken () {
      let token = localStorage.getItem('admin_token')
      return { Authorization: token }
    },
    handleCheckAllChange (val) {
      // this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      // let checkedCount = value.length
      // this.checkAll = checkedCount === this.cateList.length
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cateList.length
    },
    // 点击发布
    publish () {
      // console.log(this.postList)
      this.postList.content = this.$refs.content.editor.root.innerHTML
      console.log(this.postList)
    }
  },
  async mounted () {
    let res = await getCateList()
    console.log(res)
    this.cateList = res.data.data.splice(1)
    console.log(this.cateList)
  }
}
</script>

<style lang='less' scoped>
.box-card{
  margin-top: 20px;
}
</style>
