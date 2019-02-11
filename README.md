<img src="media/logo.png" alt="Webmonkey" width="350">

> Robust and versatile headless monkey testing for the modern web with reproducible steps, error alerts, strategy sharing and many other good things.

![Travis](http://img.shields.io/travis/Wildhoney/Webmonkey.svg?style=for-the-badge)
&nbsp;
![npm](http://img.shields.io/npm/v/webmonkey.svg?style=for-the-badge)
&nbsp;
![License MIT](http://img.shields.io/badge/license-mit-lightgrey.svg?style=for-the-badge)
&nbsp;
![Coveralls](https://img.shields.io/coveralls/Wildhoney/Webmonkey.svg?style=for-the-badge)
&nbsp;
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

It's important to remember that [monkey testing](https://en.wikipedia.org/wiki/Monkey_testing) should be used in conjunction with smarter tests such as [integration tests](https://en.wikipedia.org/wiki/Integration_testing).

![Screenshot](media/screenshot.png)

## Getting Started

Once `webmonkey` has been installed globally, you can begin testing by supplying the `--url` parameter you'd like to test. As that's the only required field, testing begins immediately and proceeds with 50 actions.

```console
foo@bar:~$ webmonkey --url https://news.bbc.co.uk/
```

For other parameters you can type `webmonkey --help` at any time.

### Authenticating

Oftentimes you'll want to authenticate before proceeded with the testing. In cases such as these `webmonkey` provides a hooks file where you export two optional functions &mdash; `create` and `destroy` &mdash; you can specify the location of the hooks file with the `--hooks` parameter.

The hooks file **must** be in the `*.mjs` format &ndash; for instance to authenticate on a fictitious website one might implement the following.

```javascript
export const create = async page => {
    await page.goto('https://www.example.com/');
    await page.focus('#username'));
    await page.keyboard.type('webmonkey');
    await page.focus('#password'));
    await page.keyboard.type('monkeynuts');
    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
};
```

## Meet the Team

Currently we have the following set of monkeys that perform various actions on your supplied domain:

* `clicker` performs clicks in random regions of the visible viewport.
* `networker` cycles through a list of preset network conditions.
* `scroller` scrolls the viewport to different areas of the page.
* `sizer` randomly selects a different height and width for the viewport.
* `toucher` similar to the `clicker` action but instead performs touches.
* `typer` focuses on random input fields and types random characters.
