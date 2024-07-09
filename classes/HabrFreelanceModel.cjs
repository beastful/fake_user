const ParseModel = require('./ParseModel.cjs')

module.exports = class HabrFreelanceModel extends ParseModel {
    constructor(...args) {
        super(...args)
        let arr = this.from(".task_list").collect(
            [".task__title a", ".task__price", ".params__published-at", ".task__title a", ".task__title a"],
            ["name", "price", "time", "id", "url"],
            [(el) => el.textContent, (el) => el.textContent, (el) => el.textContent, (el) => el.href.split("/")[2], (el) => el.href])
        console.log(arr)
    }
}