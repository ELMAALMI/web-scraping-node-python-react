import puppeteer from 'puppeteer';
import { Category } from '../model/Category';
import { IProduct, Product } from '../model/Product';
class Scrapper {
    async wait(sec: number) {
        return await new Promise((resolve) => setTimeout(resolve, sec));
    }
    async autoScroll(page: any) {
        await page.evaluate(async () => {
            await new Promise((resolve: any) => {
                let totalHeight = 0;
                const distance = 100;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= scrollHeight - window.innerHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
    }
    async start() {
        try {
            const URLS_SCRAPPER: string[] = [
                'https://www.mediamarkt.es/es/category/convertibles-2-en-1-160.html',
                'https://www.mediamarkt.es/es/category/smartphones-263.html',
                'https://www.mediamarkt.es/es/category/tv-65-70-pulgadas-405.html'
            ];
            try {
                await Product.db.dropCollection('products');
                await Category.db.dropCollection('categories');
            } catch (error: any) {
                console.log(error.message);
            }
            console.log('******** start scrapping ********');
            for (let url of URLS_SCRAPPER) {
                console.log(url);
                const data = await this.scrap_data(url);
                await this.save_data(data);
            }
            console.log('******** end scrapping ********');
        } catch (error) {
            console.log(error);
        }
    }
    async save_data(data: IProduct[]) {
        try {
            for (let product of data) {
                console.log(product);
                if (product.name?.length != 0) {
                    const category = await Category.findOne({ name: product.category?.name });
                    if (category) {
                        product.category = category;
                    } else {
                        const cc = new Category(product.category);
                        await cc.save();
                        product.category = cc;
                    }
                    const p = new Product(product);
                    await p.save();
                }
            }
        } catch (error) {
            console.log('save data \n');
            console.log(error);
        }
    }
    async scrap_data(url: string) {
        try {
            const browser = await puppeteer.launch({ headless: true });
            const [page] = await browser.pages();
            await page.goto(url, { waitUntil: 'load' });
            await page.waitForSelector('#main-content');
            try {
                // wait html to load
                await this.wait(5000);
                // accept cookies
                const cookie_btn = await page.$('[data-test="pwa-consent-layer-accept-all"]');
                await cookie_btn?.evaluate((form: any) => form.click());
                await this.wait(3000);
                // load more data
                const load_more = await page.$('[data-test="mms-search-srp-loadmore"]');
                await load_more?.evaluate((form: any) => form.click());
                await this.wait(3000);
                await this.autoScroll(page);
                await this.wait(5000);
            } catch (error) {
                console.log('load data error');
                console.log(error);
            }

            // fetch data from html source
            const ecom_data = await page.evaluate(() => {
                const data: IProduct[] = [];
                const BASE_URL = 'https://www.mediamarkt.es';
                const arr_data = document.querySelectorAll(
                    '[data-test="mms-search-srp-productlist-item"]'
                );
                const category =
                    document.querySelector<HTMLInputElement>('.eBQzgU')?.outerText ?? '';

                arr_data.forEach((item) => {
                    const name =
                        item.querySelector<HTMLInputElement>('[data-test="product-title"]')
                            ?.outerText ?? '';

                    const url =
                        BASE_URL +
                            item.querySelector<HTMLInputElement>('.dRrAGE')?.getAttribute('href') ??
                        '';

                    const img =
                        item
                            .querySelector<HTMLInputElement>('.kxRAeT > picture > img')
                            ?.getAttribute('src') ?? '';

                    const feature =
                        item.querySelector<HTMLInputElement>('[data-test="feature-list"]')
                            ?.outerText ?? '';

                    const delivery = item.querySelector<HTMLInputElement>('.jHdjHy')?.outerText;

                    const availability =
                        item.querySelector<HTMLInputElement>(
                            "[data-test='mms-delivery-online-availability_AVAILABLE'] > div"
                        )?.outerText ?? '';

                    const price = Number.parseFloat(
                        item.querySelector<HTMLInputElement>('.ddPMiu')?.outerText ?? '0'
                    );

                    data.push({
                        name,
                        img,
                        price,
                        availability,
                        url,
                        delivery,
                        feature,
                        category: {
                            name: category
                        }
                    });
                });
                return data;
            });
            await browser.close();
            return ecom_data;
        } catch (error) {
            console.log(error);
        }
        return [];
    }
}

const scrapper = new Scrapper();
export default scrapper;
