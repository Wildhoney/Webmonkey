export default function click(page) {
    return page.evaluate(() => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        document.elementFromPoint(x, y).click();
        document.elementFromPoint(530, 67).click();
    });
}
