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
                  width="100">
              </el-table-column>
              <el-table-column
                  label="日期"
                  width='150'>
                  <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.user.create_date|dateFormat }}</span>
                  </template>
              </el-table-column>
                <el-table-column label="操作" width='250'>
                  <template slot-scope="scope">
                      <el-button size="mini" type='success'  @click="handleEdit(scope.row)">编辑</el-button>
                      <el-button size="mini" type='success'  @click="sharedialogFormVisible=true">分享</el-button>
                      <el-button  size="mini" type="danger"  @click="handleDelete(scope.row)">删除</el-button>
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
      <!-- dialog -->
      <el-dialog title="分享" :visible.sync="sharedialogFormVisible">
      <el-form :model="shareForm">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="shareForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="shareForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sharedialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sharedialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getArticleList } from '@/apis/article.js'
import { dateFormat } from '@/utils/myfilters.js'
export default {
  data () {
    return {
      formLabelWidth: '120px',
      sharedialogFormVisible: false,
      ArticleList: [],
      pageIndex: 1,
      pageSize: 2,
      total: '',
      shareForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
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
      this.$router.push({ path: `articlePublish/${row.id}` })
    },
    // 点击删除
    handleDelete (row) {
      console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 写删除操作
        console.log(row.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
