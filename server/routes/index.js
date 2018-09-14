/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/store'
})
const controllers = require('../controllers/');

// GET 查询所有门店信息
router.get('/select_all', controllers.store_select_all);
// GET 根据门店名称查询门店信息
router.get('/select_n', controllers.store_select_n);
// GET 根据状态查询门店信息
router.get('/select_s', controllers.store_select_s);
// GET 根据状态查询门店信息
router.get('/select_g', controllers.store_select_g);
// POST 添加门店信息
router.post('/store_insert', controllers.store_insert);
// GET 查询订单详情
router.get('/code_select', controllers.code_select);
// POST 添加门店信息
router.post('/code_insert', controllers.code_insert);
// GET 查询九田家的地图信息
router.get('/customer_map', controllers.customer_map);
// GET 查询客户整体信息
router.get('/cus_head_info_q', controllers.cus_head_info_q); 
// GET 查询客户用户信息
router.get('/cus_users_q', controllers.cus_users_q);
// GET 查询门店地址信息
router.get('/cus_store_map_q', controllers.cus_store_map_q);
// GET 查询门店进度信息
router.get('/cus_store_progress_q', controllers.cus_store_progress_q); 
// GET 根据状态查询门店信息
router.get('/cus_store_progress_g', controllers.cus_store_progress_g); 
// GET 根据状态查询门店信息
router.get('/cus_store_pcd_q', controllers.cus_store_pcd_q); 
// POST 添加门店-进度-地址信息
router.post('/cus_store_insert', controllers.cus_store_insert);

module.exports = router

