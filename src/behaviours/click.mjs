export default async function click({ page, helpers }) {
    try {
        const { height, width } = await page.evaluate(() => ({
            height: window.innerHeight,
            width: window.innerWidth
        }));

        const x = Math.round(Math.random() * height);
        const y = Math.round(Math.random() * width);

        await page.mouse.click(x, y);

        return void helpers.log('click', `Performed a click at ${x}, ${y}`);
    } catch {}
}
