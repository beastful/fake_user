const FakeUser = require('./FakeUser.cjs')
const { FakeUserOk, FakeUserEnd, FakeUserState } = require('./FakeUserState.cjs')

module.exports = class Parser {
    constructor(url, model, ctx, itter) {
        this.__url__ = url;
        this.__model__ = model
        this.__ctx__ = ctx
        this.__itter__ = itter
        this.__fakeuser__ = new FakeUser(this.__url__, this.__ctx__)
    }
    perPage(fun, cb) {
        const ret = (self) => {
            self.__fakeuser__.retrieve(() => { }).then(d => {
                if ((this.__fakeuser__.getState() instanceof FakeUserEnd)) {
                    cb();
                    return;
                }
                fun(d.model((data, inst) => {
                    return new this.__model__(data, inst)
                }).getCollected())
                self.__ctx__.page += 1;
                ret(self)
            })
        }
        ret(this)
    }
}