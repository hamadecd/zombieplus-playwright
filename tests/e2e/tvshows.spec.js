const { test } = require('../support/index');
const data = require('../support/fixtures/tvshows.json');
const { executeSQL } = require('../support/fixtures/database');

test.beforeAll(async () => {
    await executeSQL(`DELETE FROM tvshows`);
})

test('deve ser possível cadastrar uma nova série', async ({ page }) => {
    const tvshow = data.create;
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvshows.create(tvshow);
    await page.popup.haveText(`A série '${tvshow.title}' foi adicionada ao catálogo.`);
});

test('deve ser possível remover série cadastrada', async ({ page, request }) => {
    const tvshow = data.to_remove;
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await request.api.postTvShow(tvshow);

    await page.tvshows.remove(tvshow.title);

    await page.popup.haveText(`Série removida com sucesso.`);
});

test('não permitir o cadastro de séries com títulos já existentes', async ({ page, request }) => {
    const tvshow = data.duplicate;
    await request.api.postTvShow(tvshow);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvshows.create(tvshow);
    await page.popup.haveText(`O título '${tvshow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`);
});

test('série não deve ser cadastrada sem os campos obrigatórios preenchidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvshows.goForm();
    await page.tvshows.submit();

    await page.tvshows.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'
    ]);
});

test('busca por séries com o termo zumbi', async ({ page, request }) => {
    const tvshows = data.search;
    tvshows.data.forEach(async (tvshow) => {
        await request.api.postTvShow(tvshow)
    });

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvshows.navigateToPage();
    await page.tvshows.search(tvshows.input);
    await page.tvshows.tableHave(tvshows.outputs);
});