/**
 * Structure of the Amazon product data
 * that we want to scrape from the Amazon product page.
 */
export interface AmazonProduct {
    title: string;
    rating: string;
    ratingCount: string;
    imageUrl: string;
}
