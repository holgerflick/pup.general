import puppeteer from 'puppeteer';
async function getBrowser() {
    const headless = process.env.HEADLESS === 'true';
    const browser = await puppeteer.launch({
        headless: headless,
    });
    const page = await browser.newPage();
    page.setViewport({ width: 1920, height: 1080 });
    const ua = process.env.USER_AGENT;
    if (!ua) {
        throw new Error('USER_AGENT is required in environment.');
    }
    await page.setUserAgent(ua);
    return { browser, page };
}
export default getBrowser;
//# sourceMappingURL=browser.js.map