const request = require('request')
const cheerio = require('cheerio')

module.exports = function(id, opts = {}) {

  // Make url
  opts = {
    sort: opts.sort || 'helpfulnessScore',    // helpfulnessScore | submissionDate | totalVotes | reviewVolume | userRating
    rateFilter: opts.rateFilter || '0',      // 0 = show all | 1...10
    spoilers: opts.spoilers || 'show',      // hide | null
    paginationKey: opts.paginationKey || ''
  }
  let url = `https://www.imdb.com/title/${id}/reviews/_ajax?spoiler=${opts.spoilers}&sort=${opts.sort}&ratingFilter=${opts.rateFilter}&paginationKey=${opts.paginationKey}`

  // Fetch reviews
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
        if (err) { reject(err); return }

        let $ = cheerio.load(body)
        if (!$('.lister-list').length) { reject(null); return }
        
        let reviews = {
          data: [],
          nextPageKey: $('.load-more-data').length ? $('.load-more-data').attr('data-key') : null
        }
        
        $('.imdb-user-review').each(function() {
          reviews.data.push({
            author: $(this).find('.display-name-link').text(),
            date:   $(this).find('.review-date').text(),
            title:  $(this).find('.title').text().trim(),
            rating: $(this).find('.rating-other-user-rating').text().trim(),
            body:   $(this).find('.text').text(),
            spoilers: !!$(this).find('.spoiler-warning').length,
          })
        })

        resolve(reviews)
      })
  })
}
