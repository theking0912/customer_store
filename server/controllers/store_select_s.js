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
  var status = ctx.request.query.status
  await knex('tb_store_status')
    .where('status', status)
    .select()
    .catch(function(e) {
      console.error(e);
    }).then(
      function(data) {
        console.log(data);
        ctx.response.body = data;
        console.log("searchRecords by dateInfo success")
      }
    );
}