// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const router = require('./router/index')
const config = require('./config/index')
const path = require('path')
// 创建一个Koa对象表示web app本身:
const app = new Koa()

app.use(serve(path.resolve(__dirname, '..'), { extensions: ['html']}))
app.use(bodyParser())
app.use(router.routes())
app.listen(config[process.argv[2]].port)