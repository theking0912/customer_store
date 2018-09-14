module.exports = async(ctx, next) => {
  const {
    mysql: config
  } = require('../config');
  var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.pass,
      database: config.db,
      charset: config.char,
      multipleStatements: true
    }
  });
  var wx_tb_customer_id = ctx.request.query.wx_tb_customer_id
  if (wx_tb_customer_id == 'all') {
    await knex('wx_tb_customer_head')
      .join('wx_tb_customer_info', 'wx_tb_customer_head.wx_tb_customer_id', '=', 'wx_tb_customer_info.wx_tb_customer_id')
      .select('wx_tb_customer_head.wx_tb_customer_id',
        'wx_tb_customer_head.customer_name',
        'wx_tb_customer_info.map_url',
        'wx_tb_customer_info.progress_url',
        'wx_tb_customer_info.add_url',
        'wx_tb_customer_info.image_url').orderBy('wx_tb_customer_head.wx_tb_customer_id', 'asc')
      .then(res => {
        console.log(res);
        ctx.state.data = res;
      })
  } else {
    await knex('wx_tb_customer_head')
      .join('wx_tb_customer_info', 'wx_tb_customer_head.wx_tb_customer_id', '=', 'wx_tb_customer_info.wx_tb_customer_id')
      .select('wx_tb_customer_head.wx_tb_customer_id',
        'wx_tb_customer_head.customer_name',
        'wx_tb_customer_info.map_url',
        'wx_tb_customer_info.progress_url',
        'wx_tb_customer_info.add_url',
        'wx_tb_customer_info.image_url')
      .where('wx_tb_customer_head.wx_tb_customer_id', wx_tb_customer_id)
      .orderBy('wx_tb_customer_head.wx_tb_customer_id', 'asc')
      .then(res => {
        console.log(res);
        ctx.state.data = res;
      })
  }
}