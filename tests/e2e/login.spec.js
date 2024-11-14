const { test } = require('../support/index');

test('deve logar como administrador', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', 'pwd123');
    await page.movies.isLoggedIn();
});

test('não deve logar com senha incorreta', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', 'abc123');
    const messageToast = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
    await page.toast.containText(messageToast);
});

test('não deve logar quando o email é inválido', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('ragnar.viking.com.br', 'pwd123');
    await page.login.alertHaveText('Email incorreto');
});

test('não deve logar quando o email não é preenchido', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('', 'pwd123');
    await page.login.alertHaveText('Campo obrigatório');
});

test('não deve logar quando a senha não é preenchida', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('ragnar@viking.com', '');
    await page.login.alertHaveText('Campo obrigatório');
});

test('não deve logar quando nenhum campo é preenchida', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('', '');
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório']);
});