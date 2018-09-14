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
  sub_data = ctx.request.body
  let in_list_data = {
    wx_tb_customer_id: sub_data.wx_tb_customer_id,
    store_name: sub_data.store_name,
    store_type: sub_data.store_type,
    store_type_desc: sub_data.store_type_desc,
    wx_tb_log_head_id: sub_data.wx_tb_log_head_id,
    create_time: sub_data.create_time
  }

  await knex('wx_tb_store_list')
    .insert(in_list_data)
    .catch(function(e) {
      console.error(e);
    })
    .then(
      console.log("feedback columns insert success")
    );

  let wx_tb_store_list = await knex('wx_tb_store_list')
    .select('wx_tb_store_list.wx_tb_store_id')
    .where('wx_tb_store_list.create_time', '=', sub_data.create_time)

  let in_address_data = {
    wx_tb_store_id: wx_tb_store_list[0].wx_tb_store_id,
    address: sub_data.address,
    province: sub_data.province,
    city: sub_data.city,
    district: sub_data.district,
    street: sub_data.street,
    street_number: sub_data.street_number,
    lat: sub_data.lat,
    lng: sub_data.lng,
    wx_tb_log_head_id: sub_data.wx_tb_log_head_id
  }
  let in_progress_data = {
    wx_tb_store_id: wx_tb_store_list[0].wx_tb_store_id,
    person_charge: sub_data.person_charge,
    design_area: sub_data.design_area,
    status_seq: sub_data.status_seq,
    status: sub_data.status,
    start_time: sub_data.start_time,
    plan_start_time: sub_data.plan_start_time,
    expected_transfer_time: sub_data.expected_transfer_time,
    wx_tb_log_head_id: sub_data.wx_tb_log_head_id
  }
  await knex('wx_tb_store_address')
    .insert(in_address_data)
    .catch(function(e) {
      console.error(e);
    })
    .then(
      console.log("feedback columns insert success")
    );

  await knex('wx_tb_store_progress')
    .insert(in_progress_data)
    .catch(function(e) {
      console.error(e);
    })
    .then(
      console.log("feedback columns insert success")
    );

  return ctx.response.body = sub_data;
}