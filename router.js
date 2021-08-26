const fs = require('fs')
const path = require('path')
const koaRouter = require('koa-router')
const router = new koaRouter()

module.exports = function (app) {
    fs.readdirSync('router').forEach(r => {
        let module = require(`./router/${r}`)
        router.use(`/${path.basename(r, '.js')}`, module.routes(), module.allowedMethods())
    })
    app.use(router.routes())
}