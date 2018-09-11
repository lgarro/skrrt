import Router from 'koa-router'
import staticRoutes from './../controllers/static.controller'

const router = new Router({ prefix: '/api' })
    .use(staticRoutes.routes())
    .get('/skrrt', async (ctx) => {
        ctx.status = 201
        ctx.body = 'Take my shoes and walk a mile something you can\'t do'
    })

export default router
