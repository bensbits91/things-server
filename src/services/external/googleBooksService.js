const axios = require('axios');
const { makeSafeQueryString } = require('../../utils/stringUtils');
const { normalizeGoogleBooksData } = require('../../utils/normalizationUtils');

class GoogleBooksService {
   async search({ query }) {
      const safeSearchTerm = makeSafeQueryString(query);
      const url = `${process.env.GOOGLE_BOOKS_BASE_URL}?q=${safeSearchTerm}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
      const options = {
         method: 'GET',
         headers: {
            accept: 'application/json'
         }
      };
      try {
         const response = await axios.get(url, options);
         return normalizeGoogleBooksData(response.data);
      } catch (error) {
         console.error('Error fetching data from Google Books API:', error);
         throw new Error(JSON.stringify(error));
      }
   }
}

module.exports = GoogleBooksService;
