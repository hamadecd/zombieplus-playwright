const { test: base, expect } = require('@playwright/test');

const { Login } = require('../support/actions/Login');
const { Popup } = require('../support/actions/Components');
const { Movies } = require('../support/actions/Movies');
const { Leads } = require('../support/actions/Leads');

const { Api } = require('./api');

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page;
        context['leads'] = new Leads(page);
        context['login'] = new Login(page);
        context['movies'] = new Movies(page);
        context['popup'] = new Popup(page);

        await use(context);
    },
    request: async ({ request }, use) => {
        const context = request;
        context['api'] = new Api(request);

        await context['api'].setToken();

        await use(context);
    }
})

export { test, expect }