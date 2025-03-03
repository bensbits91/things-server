function normalizeTmdbData(data) {
   return data.results.map(item => {
      const {
         id,
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
         name: title || name,
         type: title ? 'Movie' : 'TV Show', // todo: find a better way to determine type
         description: overview,
         main_image_url: poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : null,
         country: origin_country?.join(', '),
         date: release_date || first_air_date, // todo: convert to date?
         language: original_language,
         // todo: store genres in a new database collection; services to get genres from each API
         genres: genre_ids,
         people: [], // todo: get main actors
         external_id: id,
         external_data: {
            ...item
         }
      };
   });
}

function normalizeGoogleBooksData(data) {
   return data.items.map(item => {
      const {
         id,
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
         name: title,
         type: 'Book',
         description,
         main_image_url: imageLinks ? imageLinks.thumbnail : null,
         country,
         date: publishedDate, // todo: convert to date?
         language,
         // todo: store genres in a new database collection; services to get genres from each API
         genres: categories, // getGenreNames(categories, 'Book'),
         people: authors ? authors : [],
         external_id: id,
         external_data: {
            ...item
         }
      };
   });
}

function normalizeGiantBombData(data) {
   return data.results.map(item => {
      const { id, name, deck, description, image, original_release_date } = item;
      return {
         name,
         type: 'Video Game',
         description: deck || description,
         main_image_url: image ? image.medium_url : null,
         country: '', // todo: get country
         date: original_release_date, // todo: convert to date?
         language: '', // todo: get language
         genres: [], // todo: get genres
         people: [], // todo: get people
         external_id: id,
         external_data: {
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
