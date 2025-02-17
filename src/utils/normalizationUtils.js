function normalizeTmdbData(data) {
   return data.results.map(item => {
      const {
         title,
         name,
         overview,
         poster_path,
         origin_country,
         release_date,
         first_air_date,
         original_language,
         genre_ids
      } = item;
      return {
         type: title ? 'movie' : 'tvshow', // todo: find a better way to determine type
         name: title || name,
         description: overview,
         image: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : null,
         country: origin_country,
         date: release_date || first_air_date,
         language: original_language,
         // todo: store genres in a new database collection; services to get genres from each API
         genres: genre_ids,
         people: [], // todo: get main actors
         data: {
            ...item
         }
      };
   });
}

function normalizeGoogleBooksData(data) {
   return data.items.map(item => {
      const {
         saleInfo: { country },
         volumeInfo: {
            title,
            description,
            imageLinks,
            authors,
            publishedDate,
            language,
            categories
         }
      } = item;
      return {
         type: 'book',
         name: title,
         description,
         image: imageLinks ? imageLinks.thumbnail : null,
         country,
         date: publishedDate,
         language,
         // todo: store genres in a new database collection; services to get genres from each API
         genres: categories, // getGenreNames(categories, 'Book'),
         people: [authors ? [...authors] : ''],
         data: {
            ...item
         }
      };
   });
}

function normalizeGiantBombData(data) {
   return data.results.map(item => {
      const { name, deck, description, image, original_release_date } = item;
      return {
         type: 'videogame',
         name,
         description: deck || description,
         image: image ? image.medium_url : null,
         country: '', // todo: get country
         date: original_release_date,
         language: '', // todo: get language
         genres: [], // todo: get genres
         people: [], // todo: get people
         data: {
            ...item
         }
      };
   });
}

module.exports = {
   normalizeTmdbData,
   normalizeGoogleBooksData,
   normalizeGiantBombData
};
