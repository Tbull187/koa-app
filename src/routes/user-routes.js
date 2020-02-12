const Router = require('koa-router');
const userService = require('../services/user-service');
const _ = require('lodash');

const router = new Router();
router.allowedMethods();

router.get('/users', async (ctx, next) => {
    const users = await userService.getAllUsers();
    ctx.body = users;
    ctx.status = 200;
});

router.post('/users', async (ctx, next) => {
    const name = ctx.request.body.name;
    const email = ctx.request.body.email;

    if (_.isEmpty(name)) {
        ctx.body = 'name is a required property';
        ctx.status = 400;
    }
    if (_.isEmpty(email)) {
        ctx.body = 'email is a required property';
        ctx.status = 400;
    }
    else {
        // needs error handling
        const userId = await userService.createUser(name, email);
        ctx.body = {
            status: 200,
            message: `created user with id ${userId}`,
            id: userId
        };
        ctx.status = 200;
    }
});

router.get('/users/:id', async (ctx, next) => {
    ctx.body = await userService.getUser(ctx.params.id);
});

router.put('/users/:id', async (ctx, next) => {
    const id = ctx.params.id;
    const { name, email } = ctx.request.body;

    if (_.isEmpty(name)) {
        ctx.body = 'name parameter is required';
        ctx.status = 400;
    }
    else if (_.isEmpty(email)) {
        ctx.body = 'email parameter is required';
        ctx.status = 400;
    }
    else {
        const returnId = await userService.updateUser(id, name, email);
        ctx.body = {
            status: 200,
            message: `updated user with id ${returnId}`
        };
    }
});

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

module.exports = router;
