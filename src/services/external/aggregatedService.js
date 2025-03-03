const TmdbService = require('./tmdbService');
const GoogleBooksService = require('./googleBooksService');
const GiantBombService = require('./giantBombService');

class AggregatedService {
   constructor() {
      this.tmdbService = new TmdbService();
      this.googleBooksService = new GoogleBooksService();
      this.giantBombService = new GiantBombService();
   }

   async search(query, type = 'TV Show') {
      try {
         let results = {};

         if (type === 'Movie' || type === 'TV Show') {
            let tmdbType = 'tv';
            if (type === 'Movie') tmdbType = 'movie';
            results = await this.tmdbService.search({
               query,
               type: tmdbType
            });
         }

         if (type === 'Book') {
            results = await this.googleBooksService.search({
               query
            });
         }

         if (type === 'Video Game') {
            results = await this.giantBombService.search({
               query
            });
         }

         return results;
      } catch (error) {
         console.error('Error fetching data from external APIs:', error);
         throw error;
      }
   }
}

module.exports = AggregatedService;
