const { test, expect } = require('../support/index');
const { faker } = require('@faker-js/faker');

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(leadName, leadEmail);
  const messageToast = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await page.toast.containText(messageToast);
});

test('não deve cadastrar quando o email já existe', async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      email: leadEmail,
      name: leadName
    }
  })

  expect(newLead.status()).toBe(201);

  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(leadName, leadEmail);

  const messageToast = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.';
  await page.toast.containText(messageToast);
});

test('não deve cadastrar com email incorreto', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('Ragnar Lothbrok', 'ragnar.viking.com.br');

  await page.landing.alertHaveText('Email incorreto');
});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('', 'ragnar@viking.com');

  await page.landing.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar com email não preenchido', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('Ragnar Lothbrok', '');

  await page.landing.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar com email e nome não preenchidos', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('', '');

  await page.landing.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);
});