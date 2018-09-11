/* eslint-disable no-console */
import koaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import apiRoutes from './routes'

const Koa = require('koa')

const port = 3000
export default class BackendServer {
    constructor() {
        this.app = new Koa()
        this.app
            .use(cors())
            .use(async (ctx, next) => {
                const start = Date.now()
                await next()
                const ms = Date.now() - start
                console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
            })
            .use(bodyParser())
            .use(apiRoutes.routes())

        if (process.env.NODE_ENV === 'production') {
            this.productionSetup()
        }
    }

    productionSetup() {
        this.app.use(koaStatic('dist/public'))
    }

    async start() {
        return new Promise((resolve, reject) => {
            try {
                this.server = this.app.listen(port, () => {
                    resolve(`Backend listening in port ${port}`)
                })
            } catch (e) {
                reject(e)
            }
        })
    }
    stop() {
        return new Promise((resolve, reject) => {
            try {
                this.server.close(() => {
                    resolve()
                })
            } catch (e) {
                reject(e)
            }
        })
    }
}
