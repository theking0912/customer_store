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
  var customer_user_account = ctx.request.query.customer_user_account
  await knex('wx_tb_customer_users').select('wx_tb_customer_id', 'wx_tb_store_id', 'user_region_province', 'user_region_city', 'user_region_district', 'user_store_type', 'customer_user_account', 'customer_user_pass', 'customer_user_name', 'customer_user_email', 'customer_user_tel', 'wx_tb_log_head_id').where('customer_user_account', customer_user_account).then(res => {
    console.log(res);
    ctx.state.data = res;
  })
}