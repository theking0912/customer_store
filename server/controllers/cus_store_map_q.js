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
  var user_region_city = ctx.request.query.user_region_city
  var user_store_type = ctx.request.query.user_store_type
  if (user_region_city == 'all') {
    if (user_store_type == 'all') {
      await knex('wx_tb_store_list')
        .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
        .select('wx_tb_store_list.wx_tb_store_id',
          'wx_tb_store_list.store_name',
          'wx_tb_store_address.province',
          'wx_tb_store_address.city',
          'wx_tb_store_address.district',
          'wx_tb_store_address.street',
          'wx_tb_store_address.street_number',
          'wx_tb_store_address.lat',
          'wx_tb_store_address.lng').where({
          'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id
        })
        .then(res => {
          console.log(res);
          ctx.state.data = res;
        })
    } else {
      await knex('wx_tb_store_list')
        .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
        .select('wx_tb_store_list.wx_tb_store_id',
          'wx_tb_store_list.store_name',
          'wx_tb_store_address.province',
          'wx_tb_store_address.city',
          'wx_tb_store_address.district',
          'wx_tb_store_address.street',
          'wx_tb_store_address.street_number',
          'wx_tb_store_address.lat',
          'wx_tb_store_address.lng').where({
          'wx_tb_customer_id': wx_tb_customer_id,
          'wx_tb_store_list.store_type': user_store_type
        }).orderBy('wx_tb_store_list.wx_tb_store_id', 'asc')
        .then(res => {
          console.log(res);
          ctx.state.data = res;
        })
    }
  } else if (user_region_city != 'all') {
    if (user_store_type == 'all') {
      await knex('wx_tb_store_list')
        .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
        .select('wx_tb_store_list.wx_tb_store_id',
          'wx_tb_store_list.store_name',
          'wx_tb_store_address.province',
          'wx_tb_store_address.city',
          'wx_tb_store_address.district',
          'wx_tb_store_address.street',
          'wx_tb_store_address.street_number',
          'wx_tb_store_address.lat',
          'wx_tb_store_address.lng').where({
          'wx_tb_customer_id': wx_tb_customer_id,
          'wx_tb_store_address.city': user_region_city
        }).orderBy('wx_tb_store_list.wx_tb_store_id', 'asc')
        .then(res => {
          console.log(res);
          ctx.state.data = res;
        })
    } else if (user_store_type == 'PER') {
      await knex('wx_tb_store_list')
        .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
        .select('wx_tb_store_list.wx_tb_store_id',
          'wx_tb_store_list.store_name',
          'wx_tb_store_address.province',
          'wx_tb_store_address.city',
          'wx_tb_store_address.district',
          'wx_tb_store_address.street',
          'wx_tb_store_address.street_number',
          'wx_tb_store_address.lat',
          'wx_tb_store_address.lng').where({
          'wx_tb_customer_id': wx_tb_customer_id,
          'wx_tb_store_address.city': user_region_city,
          'wx_tb_store_list.store_type': user_store_type,
          'wx_tb_store_list.wx_tb_store_id': wx_tb_store_id
        }).orderBy('wx_tb_store_list.wx_tb_store_id', 'asc')
        .then(res => {
          console.log(res);
          ctx.state.data = res;
        })
    } else {
      await knex('wx_tb_store_list')
        .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
        .select('wx_tb_store_list.wx_tb_store_id',
          'wx_tb_store_list.store_name',
          'wx_tb_store_address.province',
          'wx_tb_store_address.city',
          'wx_tb_store_address.district',
          'wx_tb_store_address.street',
          'wx_tb_store_address.street_number',
          'wx_tb_store_address.lat',
          'wx_tb_store_address.lng').where({
          'wx_tb_customer_id': wx_tb_customer_id,
          'wx_tb_store_address.city': user_region_city,
          'wx_tb_store_list.store_type': user_store_type
        }).orderBy('wx_tb_store_list.wx_tb_store_id', 'asc')
        .then(res => {
          console.log(res);
          ctx.state.data = res;
        })
    }
  }
}