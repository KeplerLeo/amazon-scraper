import axios from 'axios';

const searchInput = document.getElementById('searchInput');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const results = document.getElementById('results');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  
  if (!query) {
    showError('Please enter a search term');
    return;
  }

  try {
    // Clear previous results and errors
    results.innerHTML = '';
    hideError();
    showLoading();
    
    // Call backend API
    const { data: { data: products } } = await axios.get(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(query)}`);
    
    if (products.length === 0) {
      results.innerHTML = '<p>No products found</p>';
      return;
    }
    
    // Display results
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      productElement.innerHTML = `
        <img src="${product.imageUrl || ''}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>Number of Reviews: ${product.ratingCount || 'N/A'}</p>
        <p>Rating: ${product.rating || 'N/A'}</p>
      `;
      results.appendChild(productElement);
    });
  } catch (err) {
    showError(err.data?.data?.message || 'An error occurred while fetching data');
  } finally {
    hideLoading();
  }
});

function showLoading() {
  loading.classList.remove('hidden');
}

function hideLoading() {
  loading.classList.add('hidden');
}

function showError(message) {
  error.textContent = message;
  error.classList.remove('hidden');
}

function hideError() {
  error.classList.add('hidden');
}