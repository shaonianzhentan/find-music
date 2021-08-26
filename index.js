const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
app.use(koaBody());

const swagger = require('./swagger')
const { koaSwagger } = require('koa2-swagger-ui')
// 接口文档配置
app.use(swagger.routes(), swagger.allowedMethods())
app.use(koaSwagger({
    routePrefix: '/',
    swaggerOptions: {
        url: '/swagger.json',
    }
}))

const router = require('./router.js')
router(app)

const PORT = 3002
app.listen(PORT);
console.log(`http://localhost:${PORT}`)