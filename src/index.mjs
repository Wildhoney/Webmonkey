import puppeteer from 'puppeteer';

export default async function main() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');
    await browser.close();
}
