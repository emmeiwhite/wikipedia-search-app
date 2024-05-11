document.addEventListener('DOMContentLoaded', function () {
  console.log('We are here')
  const url =
    'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch='
  // Imperative Approach in Pure JavaScript
  const form = document.querySelector('.form')
  const input = document.querySelector('.form-input')
  const results = document.querySelector('.results')

  const error = document.querySelector('.error')

  form.addEventListener('submit', function (e) {
    e.preventDefault()

    if (!input.value) {
      error.classList.add('show-error')
      return
    }

    error.classList.remove('show-error')

    const searchTerm = input.value

    let searchURL = `${url}${searchTerm}`

    input.value = ''
    //   Make API call
    fetchResults(searchURL)
  })

  async function fetchResults(url) {
    results.innerHTML = `<div class="loading"></div>`
    try {
      const response = fetch(url).then(response => {
        console.log(response)
      })
    } catch (error) {}
  }
})
