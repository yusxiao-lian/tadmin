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
