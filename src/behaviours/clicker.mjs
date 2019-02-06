export default async function clicker({ page, helpers }) {
    try {
        const { height, width } = await page.evaluate(() => ({
            height: window.innerHeight,
            width: window.innerWidth
        }));

        const x = Math.round(Math.random() * height);
        const y = Math.round(Math.random() * width);
        await page.mouse.click(x, y);

        return void helpers.log('clicker', `Performed a click at ${x}, ${y}`);
    } catch {}
}
