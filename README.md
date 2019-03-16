IMDB Reviews Scraper
=======

### Installation

```
npm install imdb-reviews-scraper
```

### Usage

```js
const imdbReviews = require('imdb-reviews-scraper')

// All properties are optional
const options = {
  sort: 'helpfulnessScore', // helpfulnessScore | submissionDate | totalVotes | reviewVolume | userRating
  ratingFilter: '0', // 0 (Show all) | 1...10
  spoilers: '',      // hide | null
  paginationKey: ''  // IMDB uses a key to get the next page. You will find that with the response
}

imdbReviews(<IMDB_id>, options).then(reviews => {
  console.log(reviews)
})
```

### Response

```js
{ 
  data: [
     { 
       title: '',
       body: '',
       rating: '10/10',
       author: '',
       date: '16 March 2019',
       spoilers: true 
     }
  ],
  nextPageKey: ''
}
```
