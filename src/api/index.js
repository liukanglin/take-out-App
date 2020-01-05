/* 
  与后台交互模块
*/
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
// const BASE_URL = '/api'

// 1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)
export const reqAddress = geohash => ajax('/api/position/' + geohash)
// [2、获取食品分类列表](#2获取食品分类列表)
export const reqCategorys = () => ajax('/api/index_category')
// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)
export const reqShops = ({ latitude, longitude }) => ajax('/api/shops', { latitude, longitude })
// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)
export const reqSearchShops = (geohash, keyword) => ajax('/api/search_shops', { geohash, keyword })
// [5、获取一次性验证码](#5获取一次性验证码)
export const reqCaptcha = () => ajax('/api/captcha')
// [6、用户名密码登陆](#6用户名密码登陆)
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax('/api/login_pwd', { name, pwd, captcha }, "POST")
// [7、发送短信验证码](#7发送短信验证码)
export const reqSendcode = (phone) => ajax('/api/sendcode', { phone })
// export const reqSendCode = (phone) => ajax(BASE_URL+'/sendcode', {phone})
// [8、手机号验证码登陆](#8手机号验证码登陆)
export const reqSenLogin = (phone, code) => ajax('/api/login_sms', { phone, code }, 'POST')
// [9、根据会话获取用户信息](#9根据会话获取用户信息)
export const reqUserInfo = () => ajax('/api/userinfo')
// [10、用户登出
export const reqLogout = () => ajax('/api/logout')
// 获取商家信息
export const reqShopInfo = () => ajax('/info')
// 获取商家食品数组
export const reqShopGoods = () => ajax('/goods')
// 获取商家评论数组
export const reqShopRatings = () => ajax('/ratings')

