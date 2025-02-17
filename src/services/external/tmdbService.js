const axios = require('axios');
const { makeSafeQueryString } = require('../../utils/stringUtils');
const { normalizeTmdbData } = require('../../utils/normalizationUtils');

// todo: 'multi' includes people results, which we want to handle.

class TmdbService {
   async search({ query, type = 'multi' }) {
      console.log('bb ~ tmdbService.js ~ { query, type }:', {
         query,
         type
      });
      const safeType = makeSafeQueryString(type); // todo: do we need to make this safe? It's a string we control. Remove if not needed or problematic.
      const safeSearchTerm = makeSafeQueryString(query);

      const url = `${process.env.TMDB_BASE_URL}/search/${safeType}?query=${safeSearchTerm}&include_adult=false&language=en-US&page=1`;
      console.log('bb ~ tmdbService.js ~ url:', url);
      const options = {
         method: 'GET',
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
         }
      };
      try {
         const response = await axios.get(url, options);
         return normalizeTmdbData(response.data);
      } catch (error) {
         console.error('Error fetching data from TMDB API:', error);
         throw new Error(JSON.stringify(error));
      }
   }
}

module.exports = TmdbService;
