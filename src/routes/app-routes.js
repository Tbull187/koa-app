const router = require('koa-router');

router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
});

module.export = router;
