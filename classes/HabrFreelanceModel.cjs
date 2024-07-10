const ParseModel = require('./ParseModel.cjs')
const { FakeUserOk, FakeUserEnd } = require('./FakeUserState.cjs')

module.exports = class HabrFreelanceModel extends ParseModel {
    constructor(data, instance) {
        super(data, instance) 
        this.__fakeuser__ = instance
    }
    getCollected() {
        return this.from(".task_list").collect(
            [".task__title a", ".task__price", ".params__published-at", ".task__title a", ".task__title a"],
            ["name", "price", "time", "id", "url"],
            [(el) => el.textContent, (el) => el.textContent, (el) => el.textContent, (el) => el.href.split("/")[2], (el) => el.href])
    }
    check() {
        if(this.getSingle(".empty-block")) {
            this.__fakeuser__.setState(new FakeUserEnd(this.__fakeuser__))
        } else {
            this.__fakeuser__.setState(new FakeUserOk(this.__fakeuser__))
        }
        return !!this.getSingle(".empty-block")
    }
}