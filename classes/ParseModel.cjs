const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = class ParseModel {
    constructor(data) {
        this.okFun = null;
        this.endFun = null;
        this.__rawdata__ = data;
        this.__dom__ = new JSDOM(this.__rawdata__);
        this.__recordclass__ = null;
    }
    ok(fun) {
        this.okFun = fun;
    }
    end(fun) {
        this.okFun = fun;
    }
    from(classname) {
        this.__recordclass__ = classname
        return this
    }
    collect(arr, names, fun) {
        const data = []
        const el = this.__dom__.window
            .document.querySelectorAll(this.__recordclass__)
        for (let i = 0; i < el.length; i++) {
            let record = {}
            for (let j = 0; j < arr.length; j++) {
                let s = el[i].querySelector(arr[j])
                let n = names[j]
                record[n] = fun[j](s);
            }
            data.push(record)
        }
        return data
    }
}