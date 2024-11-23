const { test: base, expect } = require('@playwright/test');

const { Login } = require('../support/actions/Login');
const { Toast } = require('../support/actions/Components');
const { Movies } = require('../support/actions/Movies');
const { Leads } = require('../support/actions/Leads');

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page;
        context['leads'] = new Leads(page);
        context['login'] = new Login(page);
        context['movies'] = new Movies(page);
        context['toast'] = new Toast(page);

        await use(context);
    }
})

export { test, expect }