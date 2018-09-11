import BackendServer from './../backend.server'

describe('Started', () => {
    let server = null
    beforeAll(() => {
        server = new BackendServer()
    })
    test('should start and trigger a callback', async () => {
        const promise = server.start()
        await expect(promise).resolves.toBe('Backend listening in port 3000')
    })
    test('should stop and trigger a callback', async () => {
        const promise = server.stop()
        await expect(promise).resolves.toBeUndefined()
    })
})
