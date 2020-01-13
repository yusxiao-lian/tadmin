<template>
  <div class="articleList">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">文章管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 文章列表 -->
        <template>
          <el-table :data="ArticleList" style="width: 100%;margin-top:20px;" :border='true'>
              <el-table-column
                  prop="date"
                  width="80"
                  type='index'
                  >
              </el-table-column>
              <el-table-column
                  prop="title"
                  label="标题"
                  width="500"
                  >
              </el-table-column>
              <el-table-column label="类型"  width="80">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.type===1?'文章':'视频' }}</span>
                  </template>
              </el-table-column>
              <el-table-column
                  prop="user.nickname"
                  label="作者"
                  width="130">
              </el-table-column>
              <el-table-column
                  label="日期"
                  width='200'>
                  <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.user.create_date|dateFormat }}</span>
                  </template>
              </el-table-column>
                <el-table-column label="操作" width='150'>
                  <template slot-scope="scope">
                      <el-button
                      size="mini"
                      type='success'
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
              </el-table-column>
          </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total || 0">
      </el-pagination>
  </div>
</template>

<script>
import { getArticleList } from '@/apis/article.js'
import { dateFormat } from '@/utils/myfilters.js'
export default {
  data () {
    return {
      ArticleList: [],
      pageIndex: 1,
      pageSize: 2,
      total: ''
    }
  },
  methods: {
    // 每页展示数据条数改变时
    handleSizeChange (val) {
      console.log(val)
      this.pageSize = val
      this.init()
    },
    // 跳转页
    handleCurrentChange (val) {
      console.log(val)
      this.pageIndex = val
      this.init()
    },
    //
    handleEdit (row) {
      console.log(row)
    },
    handleDelete (row) {
      console.log(row)
    },
    // 加载数据
    async init () {
      let res = await getArticleList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      console.log(res)
      this.ArticleList = res.data.data
      this.total = res.data.total
    }
  },
  mounted () {
    this.init()
  },
  filters: {
    dateFormat
  }
}
</script>

<style lang='less' scoped>
/deep/.el-table{
  margin-top: 30px;
}
</style>
