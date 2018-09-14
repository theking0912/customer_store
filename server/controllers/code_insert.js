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
  // ctx是对应koa的，res是对应knex的
  let store = {
    order_number: ctx.request.body.order_number,
    order_line: ctx.request.body.order_line,
    initial_code: ctx.request.body.initial_code,
    weight: ctx.request.body.weight,
    production_time: ctx.request.body.production_time,
    order_time: ctx.request.body.order_time
  };
  await knex('tb_scan_detail')
    .insert(store)
    .catch(function(e) {
      console.error(e);
    })
    .then(
      console.log("feedback columns insert success")
    );
  console.log(store);
  return ctx.response.body = store;
}