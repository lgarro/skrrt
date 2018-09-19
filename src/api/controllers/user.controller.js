/* eslint-disable import/order */
import Router from 'koa-router'
import UserModel from './../models/User.model'

export default new Router({ prefix: '/users' })
    .get('/', async (ctx) => {
        try {
            const usersDataScan = await UserModel.scan().exec()
            ctx.body = usersDataScan
        } catch (e) {
            throw e
        }
    })
    .post('/', async (ctx) => {
        const newUser = new UserModel(ctx.request.body)
        await newUser.save()
        ctx.body = newUser
    })
