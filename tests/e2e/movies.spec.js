const { test, expect } = require('../support/index');
const data = require('../support/fixtures/movies.json');
const { executeSQL } = require('../support/fixtures/database');

test.beforeAll(async () => {
    await executeSQL(`DELETE FROM movies`);
})

test('deve poder cadastrar novo filme', async ({ page }) => {
    const movie = data.create;
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.create(movie);
    await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`);
});

test('deve poder remover um filme', async ({ page, request }) => {
    const movie = data.to_remove;
    await request.api.postMovie(movie);
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.movies.remove(movie.title);
    await page.popup.haveText('Filme removido com sucesso.');
});

test('não deve cadastrar quando o título é duplicado', async ({ page, request }) => {
    const movie = data.duplicate;
    await request.api.postMovie(movie);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.create(movie);
    await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`);
});

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.goForm();
    await page.movies.submit();

    await page.movies.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ]);
});

test('deve realizar busca pelo termo zumbi', async ({ page, request }) => {
    const movies = data.search;
    movies.data.forEach(async (movie) => {
        await request.api.postMovie(movie)
    });

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.movies.search(movies.input);
    await page.movies.tableHave(movies.outputs);

    // comentado aqui para seguir o padrão de automação usando encapsulamento, e levar a validação para Movies.js
    // const rows = page.getByRole('row');
    // await expect(rows).toContainText(movies.outputs);
});