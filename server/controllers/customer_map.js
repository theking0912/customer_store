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
  // select tb_address_test_id,storename,latitude_TC,longitude_TC from tb_address_jiutianjia;
  var marker_type = ctx.request.query.marker_type
  if (marker_type == 'marker_jiu') {
    table_name = 'tb_address_jiutianjia';
    id = 'tb_address_test_id';
    name = 'storename'
  } else
  if (marker_type == 'marker_jia') {
    table_name = 'tb_address_jiamengshang';
    id = 'tb_address_test_id';
    name = 'storename'
  } else if (marker_type == 'marker_rong') {
    table_name = 'tb_address_rongchuang';
    id = 'tb_address_test_id';
    name = 'storename'
  } else if (marker_type == 'marker_xian') {
    table_name = 'tb_address_xianyuxian';
    id = 'tb_address_test_id';
    name = 'storename'
  } else if (marker_type == 'marker_yu') {
    table_name = 'tb_address_yurenjie';
    id = 'tb_address_test_id';
    name = 'storename'
  } else if (marker_type == 'marker_wh') {
    table_name = 'tb_address_wh';
    id = 'wh_id';
    name = 'wh_name'
  } else {
    return Error
  }

  await knex(table_name)
    .select(id, name, 'latitude_TC', 'longitude_TC')
    .then(res => {
      console.log(res);
      ctx.state.data = res;
    })
}