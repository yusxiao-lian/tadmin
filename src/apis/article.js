import axios from '@/utils/myaxios.js'

// 获取文章列表
export const getArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 获取文章分类
export const getCateList = () => {
  return axios({
    url: '/category'
  })
}

// 根据id获取文章详情
export const getArticleById = (id) => {
  return axios({
    url: `/post/${id}`
  })
}
