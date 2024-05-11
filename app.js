document.addEventListener('DOMContentLoaded', function () {
  console.log('We are here')
  const url =
    'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch='
  // Imperative Approach in Pure JavaScript
  const form = document.querySelector('.form')
  const input = document.querySelector('.form-input')
  const resultsDOM = document.querySelector('.results')

  //   const error = document.querySelector('.error')

  form.addEventListener('submit', function (e) {
    e.preventDefault()

    if (!input.value) {
      console.log('No value provided')
      resultsDOM.innerHTML = `<div class="error">Please provide a valid input</div>`

      return
    }

    const searchTerm = input.value

    let searchURL = `${url}${searchTerm}`

    // input.value = ''
    //   Make API call
    fetchResults(searchURL)
  })

  async function fetchResults(url) {
    resultsDOM.innerHTML = `<div class="loading"></div>`
    try {
      const response = await fetch(url)
      const data = await response.json()

      const results = data.query.search

      if (results.length < 1) {
        resultsDOM.innerHTML = '<div class="error"> No matching results. Please try again</div>'
        return
      }

      renderResults(results)
    } catch (error) {
      console.log('In the Error Block!')
      resultsDOM.innerHTML = `<div class="error"> There was error loading the page</div>`
    }
  }

  // render the results

  function renderResults(list) {
    console.log(list)
    const cardList = list
      .map(item => {
        const { title, pageid, snippet } = item
        return `
          <a
            href="http://en.wikipedia.org/?curid=${pageid}"
            target="_blank"
          >
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>
     `
      })
      .join('')

    resultsDOM.innerHTML = `<div class="articles">${cardList}</div>`
  }
})
