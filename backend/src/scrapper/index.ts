import puppeteer from 'puppeteer';

class Scrapper {
    private WEB_SITE_URL = 'https://www.mediamarkt.es/';

    async start() {
        try {
            console.log('******** start scrapping ********');
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(this.WEB_SITE_URL);
            await page.waitForSelector('#root');

            console.log(page.content);
        } catch (error) {
            console.log(error);
        }
    }
}

const scrapper = new Scrapper();

export default scrapper;
