const { expect } = require('@playwright/test');

export class TvShows {
    constructor(page) {
        this.page = page;
    }

    async navigateToPage() {
        await this.page.locator('a[href="/admin/tvshows"]').click();
    }

    async goForm() {
        await this.navigateToPage();
        await this.page.locator('a[href="/admin/tvshows/register"]').click();
    }

    async create(tvshow) {
        await this.goForm();

        await this.page.getByLabel('Titulo da série').fill(tvshow.title);
        await this.page.getByLabel('Sinopse').fill(tvshow.overview);

        await this.page.locator('#select_company_id .react-select__indicator').click();
        await this.page.locator('.react-select__option').filter({ hasText: tvshow.company }).click();

        await this.page.locator('#select_year .react-select__indicator').click();
        await this.page.locator('.react-select__option').filter({ hasText: tvshow.release_year }).click();

        await this.page.getByLabel('Temporadas').fill(tvshow.seasons.toString());

        await this.page.locator('input[name="cover"]').setInputFiles('tests/support/fixtures' + tvshow.cover);

        if (tvshow.featured) {
            await this.page.locator('.featured .react-switch').click();
        }

        await this.submit();
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    }

    async remove(title) {
        await this.navigateToPage();
        await this.page.getByRole('row', { name: title }).getByRole('button').click();
        await this.page.locator('.confirm-removal').click();
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target);
    }

    async search(target) {
        await this.page.getByPlaceholder('Busque pelo nome').fill(target);
        await this.page.locator('button.sc-hmdomO.dOqjiy').click();
    }

    async tableHave(content) {
        const rows = this.page.getByRole('row').locator('.title');
        await expect(rows).toContainText(content);
    }
}