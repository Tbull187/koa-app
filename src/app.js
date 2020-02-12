const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
require('./globals');

const app = new Koa();
const router = require('./routes/index');

app.use(logger());
app.use(bodyParser());
app.use(router());

const server = app.listen(3000);
module.exports = server;
