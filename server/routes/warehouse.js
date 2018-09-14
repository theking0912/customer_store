/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
  prefix: '/warehouse'
})
const controllers = require('../controllers/warehouse.js')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// GET demo
router.get('/select_all', controllers.store)

module.exports = router
