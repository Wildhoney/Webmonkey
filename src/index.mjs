import puppeteer from 'puppeteer';

export default async function main(config) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await config.setup(page);
    await page.goto('https://www.google.com/');
    await browser.close();
}
