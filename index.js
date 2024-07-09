const Koa = require('koa');
const FakeUser = require('./classes/FakeUser.cjs')
const HabrFreelanceModel = require('./classes/HabrFreelanceModel.cjs');
const app = new Koa();

app.use(async ctx => {
    const fake_user = new FakeUser("https://freelance.habr.com/tasks", { page: 1 })

    const fakeuser_data = await fake_user.retrieve((ctx) => {
        ctx.page += 3
    })

    const fakeuser_model = fakeuser_data.model((data) => {
        return new HabrFreelanceModel(data)
    })

    ctx.body = 'Hello World 4';
});

app.listen(3000);
