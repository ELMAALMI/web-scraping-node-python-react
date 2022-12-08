from bs4 import BeautifulSoup
import requests


PC_SITE_URL = "https://www.mediamarkt.es/es/category/convertibles-2-en-1-160.html?page=10"


def scrap_product_link():
    links = []
    webpage = requests.get(PC_SITE_URL, headers={'User-Agent': 'Mozilla/5.0'})
    soup = BeautifulSoup(webpage.content, "html.parser")
    data = soup.findAll(
        "div", {"data-test": "mms-search-srp-productlist-item"})
    for _d in data:
        link = _d.find("a", {
                       "data-test": ["mms-product-list-item-link", "mms-product-list-item-link_mp"]})
        if link:
            links.append(link["href"])
    print("link size :", len(links))
    return links


scrap_product_link()
