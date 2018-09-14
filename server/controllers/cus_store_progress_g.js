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
  await knex('wx_tb_store_list')
    .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
    .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
    .select('wx_tb_store_progress.status', knex.raw('count(1) as num')).where({
      'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id
    })
    .groupByRaw('wx_tb_store_progress.status')
    .orderBy('wx_tb_store_progress.status', 'desc')
    .then(res => {
      console.log(res);
      ctx.state.data = res;
    })
  // await knex.select('status', knex.raw('count(1) as num'))
  //   .from('tb_store_status')
  //   .groupByRaw('status')
  //   .orderBy('status', 'desc')
  //   .catch(function(e) {
  //     console.error(e);
  //   })
  //   .then(
  //     function(data) {
  //       console.log(data);
  //       ctx.response.body = data;
  //       console.log("searchRecords by dateInfo success")
  //     }
  //   );
}