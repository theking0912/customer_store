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
  await knex.select('status', knex.raw('count(1) as num'))
    .from('tb_store_status')
    .groupByRaw('status')
    .orderBy('status', 'desc')
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