import axios from 'axios';
import { JSDOM } from 'jsdom';
import { AmazonProduct } from './types';

const AMAZON_BASE_URL = 'https://www.amazon.com/s';
const DEFAULT_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept': 'text/html,application/xhtml+xml',
    'Referer': 'https://www.google.com/'
};

/**
 * Extracts product data from a DOM element
 * @param item - DOM element containing product information
 * @returns Cleaned AmazonProduct object or null if invalid
 */
const extractProductData = (item: Element): AmazonProduct | null => {
    try {
        const titleEl = item.querySelector(".s-title-instructions-style > a > h2 span");
        const ratingEl = item.querySelector(".a-icon-alt");
        const reviewsEl = item.querySelector("div.a-row.a-size-small > span.rush-component > div > a span");
        const imageEl = item.querySelector(".s-image");

        return {
            title: titleEl?.textContent?.trim() || 'N/A',
            rating: ratingEl?.textContent?.split(' ')[0] || 'N/A',
            ratingCount: reviewsEl?.textContent?.replace(/,/g, '') || '0',
            imageUrl: imageEl?.getAttribute('src') || ''
        };
    } catch (error) {
        console.warn('Failed to parse product element:', error);
        return null;
    }
};

/**
 * Scrapes Amazon search results for a given keyword
 * @param keyword - Search term to query Amazon
 * @returns Promise resolving to array of AmazonProduct
 * @throws Error if scraping fails after retries
 */
export async function scrapeAmazon(keyword: string): Promise<AmazonProduct[]> {
    try {
        // Fetch Amazon search page
        const response = await axios.get(AMAZON_BASE_URL, {
            params: {
                k: keyword,
                ref: 'nb_sb_noss' // Common Amazon query parameter
            },
            headers: DEFAULT_HEADERS,
            timeout: 10000 // Fail fast if no response
        });

        // Parse and extract product data
        const dom = new JSDOM(response.data);
        const products: AmazonProduct[] = [];

        dom.window.document.querySelectorAll(
            "div.s-main-slot div[data-component-type='s-search-result']"
        ).forEach(item => {
            const product = extractProductData(item);
            if (product) products.push(product);
        });

        // Validate we found products
        if (products.length === 0) {
            throw new Error('No products found - page structure may have changed');
        }

        return products;
    } catch (error) {
        console.error(`Scraping failed for keyword "${keyword}":`, error);
        throw new Error(
            axios.isAxiosError(error)
                ? `Network error: ${error.message}`
                : 'Failed to parse Amazon results'
        );
    }
}