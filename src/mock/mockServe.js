import Mock from 'mockjs'
import data from './data.json'

// 返回商家信息接口
Mock.mock('/info', {
  code: 0,
  data: data.info
})
// 返回食品分类接口
Mock.mock('/goods', {
  code: 0,
  data: data.goods
})
// 返回评论信息接口
Mock.mock('/ratings', {
  code: 0,
  data: data.ratings
})
