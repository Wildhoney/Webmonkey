#!/usr/bin/env node

import puppeteer from 'puppeteer';

async function main() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');
    await browser.close();
}

main();
