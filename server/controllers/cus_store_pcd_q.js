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
  var user_region_province = ctx.request.query.user_region_province
  var user_region_city = ctx.request.query.user_region_city
  var user_region_district = ctx.request.query.user_region_district
  var user_store_type = ctx.request.query.user_store_type

  if (user_region_province == 'all') {
    user_region_province = '%'
  }
  if (user_region_city == 'all') {
    user_region_city = '%'
  }
  if (user_region_district == 'all') {
    user_region_district = '%'
  }
  if (user_store_type == 'all') {
    user_store_type = '%'
  }

  var province = '%' + user_region_province + '%'
  var city = '%' + user_region_city + '%'
  var district = '%' + user_region_district + '%'
  var store_type = '%' + user_store_type + '%'


  let province_list = await knex('wx_tb_store_list')
    .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
    .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
    .distinct('wx_tb_store_address.province')
    .select()
    .where('wx_tb_store_list.wx_tb_customer_id', wx_tb_customer_id)
    .andWhere('wx_tb_store_address.province', 'like', province)
    .andWhere('wx_tb_store_address.city', 'like', city)
    .andWhere('wx_tb_store_address.district', 'like', district)
    .andWhere('wx_tb_store_list.store_type', 'like', store_type)


  let city_list = await knex('wx_tb_store_list')
    .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
    .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
    .distinct('wx_tb_store_address.city')
    .select()
    .where('wx_tb_store_list.wx_tb_customer_id', wx_tb_customer_id)
    .andWhere('wx_tb_store_address.province', 'like', province)
    .andWhere('wx_tb_store_address.city', 'like', city)
    .andWhere('wx_tb_store_address.district', 'like', district)
    .andWhere('wx_tb_store_list.store_type', 'like', store_type)

  let district_list = await knex('wx_tb_store_list')
    .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
    .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
    .distinct('wx_tb_store_address.district')
    .select()
    .where('wx_tb_store_list.wx_tb_customer_id', wx_tb_customer_id)
    .andWhere('wx_tb_store_address.province', 'like', province)
    .andWhere('wx_tb_store_address.city', 'like', city)
    .andWhere('wx_tb_store_address.district', 'like', district)
    .andWhere('wx_tb_store_list.store_type', 'like', store_type)

  let store_type_list = await knex('wx_tb_store_list')
    .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
    .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
    .distinct('wx_tb_store_list.store_type_desc')
    .select()
    .where('wx_tb_store_list.wx_tb_customer_id', wx_tb_customer_id)
    .andWhere('wx_tb_store_address.province', 'like', province)
    .andWhere('wx_tb_store_address.city', 'like', city)
    .andWhere('wx_tb_store_address.district', 'like', district)
    .andWhere('wx_tb_store_list.store_type', 'like', store_type)

  let status_list = await knex('wx_tb_store_list')
    .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
    .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
    .distinct('wx_tb_store_progress.status')
    .select()
    .where('wx_tb_store_list.wx_tb_customer_id', wx_tb_customer_id)
    .andWhere('wx_tb_store_address.province', 'like', province)
    .andWhere('wx_tb_store_address.city', 'like', city)
    .andWhere('wx_tb_store_address.district', 'like', district)
    .andWhere('wx_tb_store_list.store_type', 'like', store_type)

  let store_list = await knex('wx_tb_store_list')
    .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
    .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
    .distinct('wx_tb_store_list.store_name')
    .select()
    .where('wx_tb_store_list.wx_tb_customer_id', wx_tb_customer_id)
    .andWhere('wx_tb_store_address.province', 'like', province)
    .andWhere('wx_tb_store_address.city', 'like', city)
    .andWhere('wx_tb_store_address.district', 'like', district)
    .andWhere('wx_tb_store_list.store_type', 'like', store_type)

  ctx.state.data = {
    province_list: province_list,
    city_list: city_list,
    district_list: district_list,
    store_type_list: store_type_list,
    status_list: status_list,
    store_list: store_list
  }

  // if (query_type == 'all') {

  //   // ---status
  //   let status_list = await knex('wx_tb_store_list')
  //     .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //     .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //     .distinct('wx_tb_store_progress.status')
  //     .select()
  //     .where({
  //       'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id
  //     })
  //   // ================================================================================================
  //   if (user_region_province == 'all') {
  //     //PROVINCE
  //     let province_list = await knex('wx_tb_store_list')
  //       .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //       .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //       .distinct('wx_tb_store_address.province')
  //       .select()
  //       .where({
  //         'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id
  //       })
  //     if (user_region_city == 'all') {
  //       //CITY
  //       let city_list = await knex('wx_tb_store_list')
  //         .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //         .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //         .distinct('wx_tb_store_address.city')
  //         .select()
  //         .where({
  //           'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id
  //         })
  //       if (user_region_district == 'all') {
  //         //DISTRICT
  //         let district_list = await knex('wx_tb_store_list')
  //           .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //           .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //           .distinct('wx_tb_store_address.district')
  //           .select()
  //           .where({
  //             'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id
  //           })
  //         if (user_store_type == 'all') {
  //           //STORE_TYPE
  //           let store_type_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_type_desc')
  //             .select()
  //           //STORE_LIST
  //           let store_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_name')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id
  //             })
  //           ctx.state.data = {
  //             province_list: province_list,
  //             city_list: city_list,
  //             district_list: district_list,
  //             store_type_list: store_type_list,
  //             status_list: status_list,
  //             store_list: store_list
  //           }
  //         } else {
  //           //STORE_TYPE
  //           let store_type_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_type_desc')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.store_type': user_store_type
  //             })
  //           //STORE_LIST
  //           let store_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_name')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //               'wx_tb_store_list.store_type': user_store_type
  //             })
  //           ctx.state.data = {
  //             province_list: province_list,
  //             city_list: city_list,
  //             district_list: district_list,
  //             store_type_list: store_type_list,
  //             status_list: status_list,
  //             store_list: store_list
  //           }
  //         }
  //       } else {
  //         //DISTRICT
  //         let district_list = await knex('wx_tb_store_list')
  //           .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //           .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //           .distinct('wx_tb_store_address.district')
  //           .select()
  //           .where({
  //             'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //             'wx_tb_store_address.district': user_region_district
  //           })
  //         if (user_store_type == 'all') {
  //           //STORE_TYPE
  //           let store_type_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_type_desc')
  //             .select()
  //           //STORE_LIST
  //           let store_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_name')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //               'wx_tb_store_address.district': user_region_district
  //             })
  //           ctx.state.data = {
  //             province_list: province_list,
  //             city_list: city_list,
  //             district_list: district_list,
  //             store_type_list: store_type_list,
  //             status_list: status_list,
  //             store_list: store_list
  //           }
  //         } else {
  //           //STORE_TYPE
  //           let store_type_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_type_desc')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.store_type': user_store_type
  //             })
  //           //STORE_LIST
  //           let store_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_name')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //               'wx_tb_store_address.district': user_region_district,
  //               'wx_tb_store_list.store_type': user_store_type
  //             })
  //           ctx.state.data = {
  //             province_list: province_list,
  //             city_list: city_list,
  //             district_list: district_list,
  //             store_type_list: store_type_list,
  //             status_list: status_list,
  //             store_list: store_list
  //           }
  //         }
  //       }
  //     } else {
  //       //CITY
  //       let city_list = await knex('wx_tb_store_list')
  //         .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //         .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //         .distinct('wx_tb_store_address.city')
  //         .select()
  //         .where({
  //           'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //           'wx_tb_store_address.city': user_region_city
  //         })
  //       if (user_region_district == 'all') {
  //         //DISTRICT
  //         let district_list = await knex('wx_tb_store_list')
  //           .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //           .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //           .distinct('wx_tb_store_address.district')
  //           .select()
  //           .where({
  //             'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //             'wx_tb_store_address.city': user_region_city
  //           })
  //         if (user_store_type == 'all') {
  //           //STORE_TYPE
  //           let store_type_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_type_desc')
  //             .select()
  //           //STORE_LIST
  //           let store_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_name')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //               'wx_tb_store_address.city': user_region_city
  //             })
  //           ctx.state.data = {
  //             province_list: province_list,
  //             city_list: city_list,
  //             district_list: district_list,
  //             store_type_list: store_type_list,
  //             status_list: status_list,
  //             store_list: store_list
  //           }
  //         } else {
  //           //STORE_TYPE
  //           let store_type_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_type_desc')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.store_type': user_store_type
  //             })
  //           //STORE_LIST
  //           let store_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_name')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //               'wx_tb_store_address.city': user_region_city,
  //               'wx_tb_store_list.store_type': user_store_type
  //             })
  //           ctx.state.data = {
  //             province_list: province_list,
  //             city_list: city_list,
  //             district_list: district_list,
  //             store_type_list: store_type_list,
  //             status_list: status_list,
  //             store_list: store_list
  //           }
  //         }
  //       } else {
  //         //DISTRICT
  //         let district_list = await knex('wx_tb_store_list')
  //           .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //           .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //           .distinct('wx_tb_store_address.district')
  //           .select()
  //           .where({
  //             'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //             'wx_tb_store_address.city': user_region_city,
  //             'wx_tb_store_address.district': user_region_district
  //           })
  //         if (user_store_type == 'all') {
  //           //STORE_TYPE
  //           let store_type_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_type_desc')
  //             .select()
  //           //STORE_LIST
  //           let store_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_name')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //               'wx_tb_store_address.city': user_region_city,
  //               'wx_tb_store_address.district': user_region_district
  //             })
  //           ctx.state.data = {
  //             province_list: province_list,
  //             city_list: city_list,
  //             district_list: district_list,
  //             store_type_list: store_type_list,
  //             status_list: status_list,
  //             store_list: store_list
  //           }
  //         } else {
  //           //STORE_TYPE
  //           let store_type_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_type_desc')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.store_type': user_store_type
  //             })
  //           //STORE_LIST
  //           let store_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_name')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //               'wx_tb_store_address.city': user_region_city,
  //               'wx_tb_store_address.district': user_region_district,
  //               'wx_tb_store_list.store_type': user_store_type
  //             })
  //           ctx.state.data = {
  //             province_list: province_list,
  //             city_list: city_list,
  //             district_list: district_list,
  //             store_type_list: store_type_list,
  //             status_list: status_list,
  //             store_list: store_list
  //           }
  //         }
  //       }
  //     }
  //   } else {
  //     //PROVINCE
  //     let province_list = await knex('wx_tb_store_list')
  //       .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //       .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //       .distinct('wx_tb_store_address.province')
  //       .select()
  //       .where({
  //         'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //         'wx_tb_store_address.province': user_region_province
  //       })
  //     if (user_region_city == 'all') {
  //       //CITY
  //       let city_list = await knex('wx_tb_store_list')
  //         .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //         .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //         .distinct('wx_tb_store_address.city')
  //         .select()
  //         .where({
  //           'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //           'wx_tb_store_address.province': user_region_province
  //         })
  //       if (user_region_district == 'all') {
  //         //DISTRICT
  //         let district_list = await knex('wx_tb_store_list')
  //           .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //           .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //           .distinct('wx_tb_store_address.district')
  //           .select()
  //           .where({
  //             'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //             'wx_tb_store_address.province': user_region_province
  //           })
  //         if (user_store_type == 'all') {
  //           //STORE_TYPE
  //           let store_type_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_type_desc')
  //             .select()
  //           //STORE_LIST
  //           let store_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_name')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //               'wx_tb_store_address.province': user_region_province
  //             })
  //           ctx.state.data = {
  //             province_list: province_list,
  //             city_list: city_list,
  //             district_list: district_list,
  //             store_type_list: store_type_list,
  //             status_list: status_list,
  //             store_list: store_list
  //           }
  //         } else {
  //           //STORE_TYPE
  //           let store_type_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_type_desc')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.store_type': user_store_type
  //             })
  //           //STORE_LIST
  //           let store_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_name')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //               'wx_tb_store_address.province': user_region_province,
  //               'wx_tb_store_list.store_type': user_store_type
  //             })
  //           ctx.state.data = {
  //             province_list: province_list,
  //             city_list: city_list,
  //             district_list: district_list,
  //             store_type_list: store_type_list,
  //             status_list: status_list,
  //             store_list: store_list
  //           }
  //         }
  //       } else {
  //         //DISTRICT
  //         let district_list = await knex('wx_tb_store_list')
  //           .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //           .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //           .distinct('wx_tb_store_address.district')
  //           .select()
  //           .where({
  //             'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //             'wx_tb_store_address.province': user_region_province,
  //             'wx_tb_store_address.district': user_region_district
  //           })
  //         if (user_store_type == 'all') {
  //           //STORE_TYPE
  //           let store_type_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_type_desc')
  //             .select()
  //           //STORE_LIST
  //           let store_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_name')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //               'wx_tb_store_address.province': user_region_province,
  //               'wx_tb_store_address.district': user_region_district
  //             })
  //           ctx.state.data = {
  //             province_list: province_list,
  //             city_list: city_list,
  //             district_list: district_list,
  //             store_type_list: store_type_list,
  //             status_list: status_list,
  //             store_list: store_list
  //           }
  //         } else {
  //           //STORE_TYPE
  //           let store_type_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_type_desc')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.store_type': user_store_type
  //             })
  //           //STORE_LIST
  //           let store_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_name')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //               'wx_tb_store_address.province': user_region_province,
  //               'wx_tb_store_address.district': user_region_district,
  //               'wx_tb_store_list.store_type': user_store_type
  //             })
  //           ctx.state.data = {
  //             province_list: province_list,
  //             city_list: city_list,
  //             district_list: district_list,
  //             store_type_list: store_type_list,
  //             status_list: status_list,
  //             store_list: store_list
  //           }
  //         }
  //       }
  //     } else {
  //       //CITY
  //       let city_list = await knex('wx_tb_store_list')
  //         .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //         .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //         .distinct('wx_tb_store_address.city')
  //         .select()
  //         .where({
  //           'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //           'wx_tb_store_address.province': user_region_province,
  //           'wx_tb_store_address.city': user_region_city
  //         })
  //       if (user_region_district == 'all') {
  //         //DISTRICT
  //         let district_list = await knex('wx_tb_store_list')
  //           .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //           .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //           .distinct('wx_tb_store_address.district')
  //           .select()
  //           .where({
  //             'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //             'wx_tb_store_address.province': user_region_province,
  //             'wx_tb_store_address.city': user_region_city
  //           })
  //         if (user_store_type == 'all') {
  //           //STORE_TYPE
  //           let store_type_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_type_desc')
  //             .select()
  //           //STORE_LIST
  //           let store_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_name')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //               'wx_tb_store_address.province': user_region_province,
  //               'wx_tb_store_address.city': user_region_city
  //             })
  //           ctx.state.data = {
  //             province_list: province_list,
  //             city_list: city_list,
  //             district_list: district_list,
  //             store_type_list: store_type_list,
  //             status_list: status_list,
  //             store_list: store_list
  //           }
  //         } else {
  //           //STORE_TYPE
  //           let store_type_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_type_desc')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.store_type': user_store_type
  //             })
  //           //STORE_LIST
  //           let store_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_name')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //               'wx_tb_store_address.province': user_region_province,
  //               'wx_tb_store_address.city': user_region_city,
  //               'wx_tb_store_list.store_type': user_store_type
  //             })
  //           ctx.state.data = {
  //             province_list: province_list,
  //             city_list: city_list,
  //             district_list: district_list,
  //             store_type_list: store_type_list,
  //             status_list: status_list,
  //             store_list: store_list
  //           }
  //         }
  //       } else {
  //         //DISTRICT
  //         let district_list = await knex('wx_tb_store_list')
  //           .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //           .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //           .distinct('wx_tb_store_address.district')
  //           .select()
  //           .where({
  //             'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //             'wx_tb_store_address.province': user_region_province,
  //             'wx_tb_store_address.city': user_region_city,
  //             'wx_tb_store_address.district': user_region_district
  //           })
  //         if (user_store_type == 'all') {
  //           //STORE_TYPE
  //           let store_type_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_type_desc')
  //             .select()
  //           //STORE_LIST
  //           let store_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_name')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //               'wx_tb_store_address.province': user_region_province,
  //               'wx_tb_store_address.city': user_region_city,
  //               'wx_tb_store_address.district': user_region_district
  //             })
  //           ctx.state.data = {
  //             province_list: province_list,
  //             city_list: city_list,
  //             district_list: district_list,
  //             store_type_list: store_type_list,
  //             status_list: status_list,
  //             store_list: store_list
  //           }
  //         } else {
  //           //STORE_TYPE
  //           let store_type_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_type_desc')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.store_type': user_store_type
  //             })
  //           //STORE_LIST
  //           let store_list = await knex('wx_tb_store_list')
  //             .join('wx_tb_store_address', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_address.wx_tb_store_id')
  //             .join('wx_tb_store_progress', 'wx_tb_store_list.wx_tb_store_id', '=', 'wx_tb_store_progress.wx_tb_store_id')
  //             .distinct('wx_tb_store_list.store_name')
  //             .select()
  //             .where({
  //               'wx_tb_store_list.wx_tb_customer_id': wx_tb_customer_id,
  //               'wx_tb_store_address.province': user_region_province,
  //               'wx_tb_store_address.city': user_region_city,
  //               'wx_tb_store_address.district': user_region_district,
  //               'wx_tb_store_list.store_type': user_store_type
  //             })
  //           ctx.state.data = {
  //             province_list: province_list,
  //             city_list: city_list,
  //             district_list: district_list,
  //             store_type_list: store_type_list,
  //             status_list: status_list,
  //             store_list: store_list
  //           }
  //         }
  //       }
  //     }
  //   }
  //   // ================================================================================================
  // } else {
  //   return Error
  // }
}