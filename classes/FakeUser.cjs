const { FakeUserEnd, FakeUserOk } = require('./FakeUserState.cjs')

module.exports = class FakeUser {
    constructor(url, ctx) {
        this.url = url
        this.ctx = ctx
        this.initUrl()
        this.__state__ = new FakeUserOk(this)
    }
    applyContext() {
        let url = new URL(this.url)
        for (let key of Object.keys(this.ctx)) {
            url.searchParams.set(key, this.ctx[key])
        }
        this.url = url.href
    }
    initUrl() {
        let url = new URL(this.url)
        for (let key of Object.keys(this.ctx)) {
            url.searchParams.append(key, this.ctx[key])
        }
        this.url = url.href
    }
    setState(state) {
        this.__state__ = state
    }
    async retrieve(fun) {
        return await this.__state__.retrieve(fun)
    }
    model(...args) {
        return this.__state__.model(...args)
    }
    getUrl() {
        return this.url
    }
    getState() {
        return this.__state__
    }
}