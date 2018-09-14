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
  var store_name = '%' + ctx.request.query.store_name + '%'
  await knex('tb_store_status')
    .where('store_name', 'like', store_name)
    .select()
    .catch(function(e) {
      console.error(e);
    })
    .then(
      function(data) {
        console.log(data);
        ctx.response.body = data;
        console.log("searchRecords by dateInfo success")
      }
    );
}