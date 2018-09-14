/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
  prefix: '/customer'
})
const controllers = require('../controllers/');

// GET 查询所有门店信息
router.get('/map_jiu', controllers.customer_select_jiu);
// POST 添加门店信息
// router.post('/code_insert', controllers.code_insert);

module.exports = router

