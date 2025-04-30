import express from 'express';
import { scrapeAmazon } from './scraper';

const app = express();
const PORT = 3000;

// Parse JSON request bodies
app.use(express.json());

/**
 * CORS Configuration
 * Enables cross-origin requests from specified frontend origin
 */
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

/**
 * API Endpoint: GET /api/scrape
 * 
 * Scrapes Amazon products based on search keyword
 * Query Parameters:
 *   - keyword: string (required) Search term for Amazon products
 * 
 * Responses:
 *   - 200: Returns array of product objects
 *   - 400: Invalid or missing keyword parameter
 *   - 500: Server error during scraping
 */
app.get('/api/scrape', async (req, res) => {
  try {
    // Validate and extract keyword from query params
    const { keyword } = req.query;

    if (!keyword || typeof keyword !== 'string') {
      return res.status(400).json({
        error: 'InvalidRequest',
        message: 'Keyword parameter must be a non-empty string',
        example: '/api/scrape?keyword=laptop'
      });
    }

    // Execute scraping process
    const products = await scrapeAmazon(keyword);

    // Return successful response with product data
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    // Log full error for debugging
    console.error(`[${new Date().toISOString()}] Scraping Error:`, error);

    // Return user-friendly error response
    return res.status(500).json({
      error: 'ScrapingFailed',
      message: 'Failed to retrieve Amazon products'
    });
  }
});

// Start server with error handling
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});