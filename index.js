const request = require('request')
const cheerio = require('cheerio')

module.exports = function(id, opts = {}) {
  opts = {
    sort: opts.sort || 'helpfulnessScore',
    ratingFilter: opts.rateFilter || '0',
    spoilers: opts.spoilers || 'show',
    paginationKey: opts.paginationKey || ''
  }
  
  let url = `https://www.imdb.com/title/${id}/reviews/_ajax?spoiler=${opts.spoilers}&sort=${opts.sort}&ratingFilter=${opts.ratingFilter}&paginationKey=${opts.paginationKey}`

  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
        if (err) { reject(err); return }

        let $ = cheerio.load(body)
        if (!$('.lister-list').length) { reject(null); return }
        
        let reviews = {
          data: [],
          nextPageKey: $('.load-more-data').length ? $('.load-more-data').attr('data-key') : ''
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
