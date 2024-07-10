class FakeUserState {
    constructor(fakeuser) {
        this.__fakeuser__ = fakeuser
        this.__rawdata__ = null
    }
    async retrieve(changeContext) {
        changeContext(this.__fakeuser__.ctx)
        this.__fakeuser__.applyContext()
        await this.__fetch__()
        return this.__fakeuser__
    }
    model(fun) {
        let mod = fun(this.__rawdata__, this.__fakeuser__)
        mod.check()
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
    constructor(fakeuser) {
        super(fakeuser)
    }
}

class FakeUserEnd extends FakeUserState {
    constructor(fakeuser) {
        super(fakeuser)
    }
    async retrieve() {
        return this.__fakeuser__
    }
    model(fun) {
        return null
    }
}

module.exports.FakeUserState = FakeUserState

module.exports.FakeUserOk = FakeUserOk

module.exports.FakeUserEnd = FakeUserEnd
