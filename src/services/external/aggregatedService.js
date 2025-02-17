const TmdbService = require('./tmdbService');
const GoogleBooksService = require('./googleBooksService');
const GiantBombService = require('./giantBombService');

class AggregatedService {
   constructor() {
      this.tmdbService = new TmdbService();
      this.googleBooksService = new GoogleBooksService();
      this.giantBombService = new GiantBombService();
   }

   async search(
      query,
      type = 'tvshow' /* types = ['tvshow', 'book', 'movie', 'videogame'] */
   ) {
      try {
         // const results = {};
         let results = {};

         // const normalizedTypes = types.map(type => type.toLowerCase().replace(/ /g, ''));
         // console.log('bb ~ aggregatedService.js ~ normalizedTypes:', normalizedTypes);

         // for (const type of normalizedTypes) {
         if (/* type === 'all' ||  */ type === 'movie' || type === 'tvshow') {
            // let tmdbType = 'multi';
            // if (type !== 'all') {
            //    if (type === 'movie') {
            //       tmdbType = 'movie';
            //    } else if (type === 'tvshow') {
            //       tmdbType = 'tv';
            //    }
            // }
            let tmdbType = 'tv';
            if (type === 'movie') {
               tmdbType = 'movie';
            }
            console.log('bb ~ aggregatedService.js ~ tmdbType:', tmdbType);

            results /* [type] */ /* .tmdb */ = await this.tmdbService.search({
               query,
               type: tmdbType
            });
         }

         if (/* type === 'all' ||  */ type === 'book') {
            results /* [type] */ = await this.googleBooksService.search({
               query
            });
         }

         if (/* type === 'all' ||  */ type === 'videogame') {
            results /* [type] */ /* .giantBomb */ = await this.giantBombService.search({
               query
            });
         }
         // }

         return results;
      } catch (error) {
         console.error('Error fetching data from external APIs:', error);
         throw error;
      }
   }
}

module.exports = AggregatedService;

// const TmdbService = require('./tmdbService');
// const GoogleBooksService = require('./googleBooksService');
// const GiantBombService = require('./giantBombService');

// class AggregatedService {
//    constructor() {
//       this.tmdbService = new TmdbService();
//       this.googleBooksService = new GoogleBooksService();
//       this.giantBombService = new GiantBombService();
//    }

//    async search({ query, types = ['tv show'] }) {
//       console.log('bb ~ aggregatedService.js ~ { query, types }:', { query, types });
//       try {
//          const results = {};

//          const normalizedTypes = types.map(type => type.toLowerCase());
//          console.log('bb ~ aggregatedService.js ~ normalizedTypes:', normalizedTypes);

//          if (
//             normalizedTypes.includes('all') ||
//             normalizedTypes.includes('movie') ||
//             normalizedTypes.includes('tv show')
//          ) {
//             let tmdbType = 'multi';
//             if (!normalizedTypes.includes('all')) {
//                if (
//                   normalizedTypes.includes('movie') &&
//                   !normalizedTypes.includes('tv show')
//                ) {
//                   tmdbType = 'movie';
//                } else if (
//                   normalizedTypes.includes('tv show') &&
//                   !normalizedTypes.includes('movie')
//                ) {
//                   tmdbType = 'tv';
//                }
//             }
//             console.log('bb ~ aggregatedService.js ~ tmdbType:', tmdbType);

//             results.tmdb = await this.tmdbService.search({
//                query,
//                type: tmdbType
//             });
//          }

//          if (normalizedTypes.includes('all') || normalizedTypes.includes('book')) {
//             results.googleBooks = await this.googleBooksService.search({
//                query
//             });
//          }

//          if (normalizedTypes.includes('all') || normalizedTypes.includes('video game')) {
//             results.giantBomb = await this.giantBombService.search({ query });
//          }

//          return results;
//       } catch (error) {
//          console.error('Error fetching data from external APIs:', error);
//          throw error;
//       }
//    }
// }

// module.exports = AggregatedService;
