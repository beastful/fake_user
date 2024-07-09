class FakeUserState {
    constructor(fakeuser) {
        this.__fakeuser__ = fakeuser
        this.__rawdata__ = null
    }
    async retrieve(changeContext) {
        changeContext(this.__fakeuser__.ctx)
        this.__fakeuser__.applyContext()
        await this.__fetch__()
        return this
    }
    model(fun) {
        let mod = fun(this.__rawdata__)
        mod.ok(() => {
            this.__fakeuser__.setState(new FakeUserOk(this.__fakeuser__))
        })
        mod.end(() => {
            this.__fakeuser__.setState(new FakeUserEnd(this.__fakeuser__))
        })
        return mod
    }
    async __fetch__() {
        let url = this.__fakeuser__.url
        let res = await fetch(url)
        let text = await res.text()
        this.__rawdata__ = text
    }
}

class FakeUserOk extends FakeUserState {
    constructor(...args) {
        super(...args)
    }
}

class FakeUserEnd extends FakeUserState {
    constructor(...args) {
        super(...args)
    }
}

module.exports.FakeUserState = FakeUserState

module.exports.FakeUserOk = FakeUserOk

module.exports.FakeUserEnd = FakeUserEnd
