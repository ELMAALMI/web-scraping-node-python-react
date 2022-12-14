import axios from 'axios';

class ProductService {
    async fetch_product() {
        try {
            const res = await axios.get('/products');
            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async scrape_product() {
        try {
            const res = await axios.post('/start-scrapping');
            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async fetch_categories() {
        try {
            const res = await axios.get('/categories');
            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async fetch_products_by_categories(categorie: string) {
        try {
            const res = await axios.get(`/products/${categorie}`);
            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
const productService = new ProductService();

export default productService;
