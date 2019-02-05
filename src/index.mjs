import puppeteer from 'puppeteer';

export default async function main(hooks) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await hooks.create(page);
    await page.goto('https://www.google.com/');
    await browser.close();
    await hooks.destroy(page);
}
