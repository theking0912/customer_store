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
  var wx_tb_store_id = ctx.request.query.wx_tb_store_id
  var user_region_province = ctx.request.query.user_region_province
  var user_region_city = ctx.request.query.user_region_city
  var user_region_district = ctx.request.query.user_region_district
  var user_store_type = ctx.request.query.user_store_type
  var user_status = ctx.request.query.status
  var user_store_name = ctx.request.query.store_name

  if (user_region_province == 'all') {
    user_region_province = '%'
  }
  if (user_region_city == 'all') {
    user_region_city = '%'
  }
  if (user_region_district == 'all') {
    user_region_district = '%'
  }
  if (user_status == 'all') {
    user_status = '%'
  }
  if (user_store_name == 'all') {
    user_store_name = '%'
  }
  if (user_store_type == 'all') {
    user_store_type = '%'
  } else if (user_store_type == 'PER') {
    await knex('wx_tb_store_list')
      .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
      .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
      .select('wx_tb_store_list.wx_tb_store_id',
        'wx_tb_store_list.store_name',
        'wx_tb_store_progress.person_charge',
        'wx_tb_store_progress.design_area',
        'wx_tb_store_progress.status_seq',
        'wx_tb_store_progress.status',
        'wx_tb_store_progress.start_time',
        'wx_tb_store_progress.plan_start_time',
        'wx_tb_store_progress.expected_transfer_time')
      .where({
        'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
        'wx_tb_store_list.wx_tb_store_id': wx_tb_store_id
      })
      .then(res => {
        console.log(res);
        ctx.state.data = res;
      })
  } else {
    var province = '%' + user_region_province + '%'
    var city = '%' + user_region_city + '%'
    var district = '%' + user_region_district + '%'
    var store_type = '%' + user_store_type + '%'
    var status = '%' + user_status + '%'
    var store_name = '%' + user_store_name + '%'

    await knex('wx_tb_store_list')
      .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
      .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
      .select('wx_tb_store_list.wx_tb_store_id',
        'wx_tb_store_list.store_name',
        'wx_tb_store_progress.person_charge',
        'wx_tb_store_progress.design_area',
        'wx_tb_store_progress.status_seq',
        'wx_tb_store_progress.status',
        'wx_tb_store_progress.start_time',
        'wx_tb_store_progress.plan_start_time',
        'wx_tb_store_progress.expected_transfer_time')
      .where('wx_tb_store_list.wx_tb_customer_id', wx_tb_customer_id)
      .andWhere('wx_tb_store_address.province', 'like', province)
      .andWhere('wx_tb_store_address.city', 'like', city)
      .andWhere('wx_tb_store_address.district', 'like', district)
      .andWhere('wx_tb_store_list.store_type', 'like', store_type)
      .andWhere('wx_tb_store_progress.status', 'like', status)
      .andWhere('wx_tb_store_list.store_name', 'like', store_name)
      .then(res => {
        console.log(res);
        ctx.state.data = res;
      })
  }

  // if (user_region_city == 'all') {
  //   if (user_store_type == 'all') {
  //     await knex('wx_tb_store_list')
  //       .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //       .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //       .select('wx_tb_store_list.wx_tb_store_id',
  //         'wx_tb_store_list.store_name',
  //         'wx_tb_store_progress.person_charge',
  //         'wx_tb_store_progress.design_area',
  //         'wx_tb_store_progress.status_seq',
  //         'wx_tb_store_progress.status',
  //         'wx_tb_store_progress.start_time',
  //         'wx_tb_store_progress.plan_start_time',
  //         'wx_tb_store_progress.expected_transfer_time').where({
  //         'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id
  //       })
  //       .then(res => {
  //         console.log(res);
  //         ctx.state.data = res;
  //       })
  //   } else {
  //     await knex('wx_tb_store_list')
  //       .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //       .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //       .select('wx_tb_store_list.wx_tb_store_id',
  //         'wx_tb_store_list.store_name',
  //         'wx_tb_store_progress.person_charge',
  //         'wx_tb_store_progress.design_area',
  //         'wx_tb_store_progress.status_seq',
  //         'wx_tb_store_progress.status',
  //         'wx_tb_store_progress.start_time',
  //         'wx_tb_store_progress.plan_start_time',
  //         'wx_tb_store_progress.expected_transfer_time').where({
  //         'wx_tb_customer_id': wx_tb_customer_id,
  //         'wx_tb_store_list.store_type': user_store_type
  //       }).orderBy('wx_tb_store_list.wx_tb_store_id', 'asc')
  //       .then(res => {
  //         console.log(res);
  //         ctx.state.data = res;
  //       })
  //   }
  // } else if (user_region_city != 'all') {
  //   if (user_store_type == 'all') {
  //     await knex('wx_tb_store_list')
  //       .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //       .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //       .select('wx_tb_store_list.wx_tb_store_id',
  //         'wx_tb_store_list.store_name',
  //         'wx_tb_store_progress.person_charge',
  //         'wx_tb_store_progress.design_area',
  //         'wx_tb_store_progress.status_seq',
  //         'wx_tb_store_progress.status',
  //         'wx_tb_store_progress.start_time',
  //         'wx_tb_store_progress.plan_start_time',
  //         'wx_tb_store_progress.expected_transfer_time').where({
  //         'wx_tb_customer_id': wx_tb_customer_id,
  //         'wx_tb_store_address.city': user_region_city
  //       }).orderBy('wx_tb_store_list.wx_tb_store_id', 'asc')
  //       .then(res => {
  //         console.log(res);
  //         ctx.state.data = res;
  //       })
  //   } else if (user_store_type == 'PER') {
  //     await knex('wx_tb_store_list')
  //       .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //       .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //       .select('wx_tb_store_list.wx_tb_store_id',
  //         'wx_tb_store_list.store_name',
  //         'wx_tb_store_progress.person_charge',
  //         'wx_tb_store_progress.design_area',
  //         'wx_tb_store_progress.status_seq',
  //         'wx_tb_store_progress.status',
  //         'wx_tb_store_progress.start_time',
  //         'wx_tb_store_progress.plan_start_time',
  //         'wx_tb_store_progress.expected_transfer_time').where({
  //         'wx_tb_customer_id': wx_tb_customer_id,
  //         'wx_tb_store_address.city': user_region_city,
  //         'wx_tb_store_list.store_type': user_store_type,
  //         'wx_tb_store_list.wx_tb_store_id': wx_tb_store_id
  //       }).orderBy('wx_tb_store_list.wx_tb_store_id', 'asc')
  //       .then(res => {
  //         console.log(res);
  //         ctx.state.data = res;
  //       })
  //   } else {
  //     await knex('wx_tb_store_list')
  //       .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //       .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //       .select('wx_tb_store_list.wx_tb_store_id',
  //         'wx_tb_store_list.store_name',
  //         'wx_tb_store_progress.person_charge',
  //         'wx_tb_store_progress.design_area',
  //         'wx_tb_store_progress.status_seq',
  //         'wx_tb_store_progress.status',
  //         'wx_tb_store_progress.start_time',
  //         'wx_tb_store_progress.plan_start_time',
  //         'wx_tb_store_progress.expected_transfer_time').where({
  //         'wx_tb_customer_id': wx_tb_customer_id,
  //         'wx_tb_store_address.city': user_region_city,
  //         'wx_tb_store_list.store_type': user_store_type
  //       }).orderBy('wx_tb_store_list.wx_tb_store_id', 'asc')
  //       .then(res => {
  //         console.log(res);
  //         ctx.state.data = res;
  //       })
  //   }
  // }
}