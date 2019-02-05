import puppeteer from 'puppeteer';

export default async function main({ url, hooks }) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await hooks.create(page);
    await page.goto(url);
    await browser.close();
    await hooks.destroy(page);
}
