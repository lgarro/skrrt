/* eslint-disable import/order */
import Router from 'koa-router'
import Static from './../models/Static'

export default new Router({ prefix: '/static' })
    .get('/', async (ctx) => {
        try {
            const results = await Static.find({})
            ctx.body = results[0]
        } catch (e) {
            throw e
        }
    })
