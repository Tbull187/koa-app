const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const userService = require('./services/user-service')
const _ = require('lodash');

require('./globals');

const app = new Koa();
const router = new Router();

app.use(logger());
app.use(bodyParser());

// ROUTES
router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
});

// returns all users
router.get('/users', (ctx, next) => {
    ctx.body = mockUsers;
    ctx.status = 200;
});

// returns an array of users
router.get('/users/:id', (ctx, next) => {
    ctx.body = userService.getUser(ctx.params.id);
});

// creates a new user and returns that user
// expects body with name
router.post('/users', (ctx, next) => {
    const name = ctx.request.body.name;

    if (_.isEmpty(name)) {
        ctx.body = 'name is a required property';
        ctx.status = 400;
    }
    else {
        ctx.body = userService.createUser(name);
        ctx.status = 200;
    }
});

// updates a user and returns that user
router.put('/users/:id', (ctx, next) => {
    const id = ctx.params.id;
    const updateConfig = ctx.request.body;

    if (_.isEmpty(updateConfig.name)) {
        ctx.body = 'name parameter is required';
        ctx.status = 400;
    }
    else if (_.isEmpty(updateConfig.metadata)) {
        ctx.body = 'metadata parameter is required';
        ctx.status = 400;
    }
    else {
        ctx.body = userService.updateUser(id, updateConfig);
        ctx.status = 200;
    }
});

// deletes user and returns that user
router.delete('/users/:id', (ctx, next) => {
    const id = ctx.params.id;

    if (_.isEmpty(id)) {
        ctx.body = 'id is a required propery';
        ctx.status = 400;
    }
    else {
        ctx.body = userService.deleteUser(id);
        ctx.status = 200;
    };
});



app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(3000);
module.exports = server;
