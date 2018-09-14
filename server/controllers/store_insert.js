module.exports = async (ctx, next) => {
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
  status_key = ctx.request.body.status
  if (status_key == "招商") {
    status_seq_value = ((1 / 7) * 100).toFixed(2)
  } else if (status_key == "签约") {
    status_seq_value = ((2 / 7) * 100).toFixed(2)
  } else if (status_key == "选址") {
    status_seq_value = ((3 / 7) * 100).toFixed(2)
  } else if (status_key == "装修") {
    status_seq_value = ((4 / 7) * 100).toFixed(2)
  } else if (status_key == "培训") {
    status_seq_value = ((5 / 7) * 100).toFixed(2)
  } else if (status_key == "试营") {
    status_seq_value = ((6 / 7) * 100).toFixed(2)
  } else if (status_key == "开业") {
    status_seq_value = ((7 / 7) * 100).toFixed(2)
  } else { }
  let store = {
    store_name: ctx.request.body.store_name,
    person_charge: ctx.request.body.person_charge,
    design_area: ctx.request.body.design_area,
    status_seq: status_seq_value,
    status: ctx.request.body.status,
    start_time: ctx.request.body.start_time,
    plan_start_time: ctx.request.body.plan_start_time,
    expected_transfer_time: ctx.request.body.expected_transfer_time
  };
  await knex('tb_store_status')
    .insert(store)
    .catch(function (e) {
      console.error(e);
    })
    .then(
      console.log("feedback columns insert success")
    );
  console.log(store);
  return ctx.response.body = store;
}