const Koa = require('koa');
const HabrFreelanceModel = require('./classes/HabrFreelanceModel.cjs');
const Parser = require('./classes/Parser.cjs');
const sqlite3 = require('sqlite3').verbose();
const app = new Koa();
const db = new sqlite3.Database('data.db');

class InsertQuerry {
    constructor() { }
    makeFH(arr) {
        const stmt = db.prepare("INSERT OR IGNORE INTO habr VALUES (?, ?, ?, ?, ?)");
        arr.map(e => {
            stmt.run(e.id, e.name, e.price, e.time, e.url);
        })
        stmt.finalize();
    }
}

app.use(async ctx => {
    const parser = new Parser("https://freelance.habr.com/tasks", HabrFreelanceModel,
        {
            page: 1
        }, (ctx) => {
            ctx.page += 1
        })
    
    console.log("Parsing...")
    parser.perPage((page) => {
        let q = new InsertQuerry()
        q.makeFH(page)
    }, () => {
        console.log("End")
    })

    ctx.body = "Parsing, check console for more info"
});

app.listen(3000);
