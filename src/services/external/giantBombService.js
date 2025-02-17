const axios = require('axios');
const { makeSafeQueryString } = require('../../utils/stringUtils');
const { normalizeGiantBombData } = require('../../utils/normalizationUtils');

class GiantBombService {
   async search({ query }) {
      const safeSearchTerm = makeSafeQueryString(query);
      console.log('bb ~ giantBombService.js ~ safeSearchTerm:', safeSearchTerm);

      const url = `${process.env.GIANTBOMB_BASE_URL}/search?query=${safeSearchTerm}&api_key=${process.env.GIANTBOMB_API_KEY}&format=json`;
      console.log('bb ~ giantBombService.js ~ url:', url);
      const options = {
         method: 'GET',
         headers: {
            accept: 'application/json'
         }
      };
      try {
         const response = await axios.get(url, options);
         return normalizeGiantBombData(response.data);
      } catch (error) {
         console.error('Error fetching data from GiantBomb API:', error);
         throw new Error(JSON.stringify(error));
      }
   }
}

module.exports = GiantBombService;
