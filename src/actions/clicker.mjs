import chalk from 'chalk';

export default async function clicker({ page, log }) {
    try {
        const { height, width } = await page.evaluate(() => ({
            height: window.innerHeight,
            width: window.innerWidth
        }));

        const x = Math.round(Math.random() * height);
        const y = Math.round(Math.random() * width);

        await page.evaluate(
            ({ x, y }) => {
                const scrollTop = document.documentElement.scrollTop;
                const scrollLeft = document.documentElement.scrollLeft;

                const node = document.createElement('div');
                node.style.all = 'initial';
                node.style.transform = `translate(${x + scrollTop}px, ${y +
                    scrollLeft}px)`;
                node.style.width = '3px';
                node.style.height = '3px';
                node.style.backgroundColor = 'black';
                node.style.borderRadius = '50%';
                node.style.position = 'absolute';
                node.style.zIndex = Number.MAX_SAFE_INTEGER;
                node.style.top = 0;
                node.style.left = 0;
                node.style.pointerEvents = 'none';
                document.body.appendChild(node);
            },
            { x, y }
        );

        await page.mouse.click(x, y);

        return void log(
            'clicker',
            `${chalk.whiteBright(x)}${chalk.gray('px')}`,
            chalk.gray('/'),
            `${chalk.whiteBright(y)}${chalk.gray('px')}`
        );
    } catch {}
}
