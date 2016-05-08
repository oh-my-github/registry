import fs from 'fs'
import colors from 'colors'
import cheerio from 'cheerio'

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  /*eslint-disable no-console */
  if (err) {
    return console.log(err)
  }

  const $ = cheerio.load(markup)

  fs.writeFile('dist/index.html', $.html(), 'utf8', function (err) {
    if (err) {
      return console.log(err)
    }
  })

  console.log('index.html written to /dist'.green)
  /*eslint-enable no-console */
})

