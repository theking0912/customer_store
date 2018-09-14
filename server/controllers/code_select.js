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
  await knex('tb_scan_detail').select('order_number', 'order_line', 'weight', 'production_time').then(res => {
    console.log(res);
    ctx.state.data = res;
  })
}