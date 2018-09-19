/* eslint-disable import/order */
import Router from 'koa-router'
import StaticModel from './../models/Static.model'

export default new Router({ prefix: '/static' })
    .get('/', async (ctx) => {
        try {
            const staticDataScan = await StaticModel.scan().exec()
            ctx.body = staticDataScan[0]
        } catch (e) {
            throw e
        }
    })
