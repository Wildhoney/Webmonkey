export default async function clicker({ page, helpers }) {
    try {
        const { height, width } = await page.evaluate(() => ({
            height: window.innerHeight,
            width: window.innerWidth
        }));

        const x = Math.round(Math.random() * height);
        const y = Math.round(Math.random() * width);

        await page.evaluate(
            ({ x, y }) => {
                const node = document.createElement('div');
                node.style.all = 'initial';
                node.style.transform = `translate(${x}px, ${y}px)`;
                node.style.width = '10px';
                node.style.height = '10px';
                node.style.borderRadius = '50%';
                node.style.border = '5px solid red';
                node.style.position = 'absolute';
                node.style.zIndex = 10000;
                node.style.top = 0;
                node.style.left = 0;
                document.body.appendChild(node);
            },
            { x, y }
        );

        await page.mouse.click(x, y);

        return void helpers.log('clicker', `Clicked at ${x}, ${y}`);
    } catch {}
}
