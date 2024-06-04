async function searchShows() {
  const query = document.getElementById('searchInput').value;
  const url = `https://api.tvmaze.com/singlesearch/shows?q=${query}`;

  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          displayResults(data);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });

  document.getElementById('searchInput').value = '';
}

function displayResults(data) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  const showDiv = document.createElement('div');
  showDiv.classList.add('show');
  showDiv.addEventListener('click', function() {
      window.open(data.url, '_blank');
  });

  const title = data.name;
  const summary = data.summary || 'No summary available';
  const image = data.image ? data.image.medium : 'https://via.placeholder.com/210x295?text=No+Image';

  showDiv.innerHTML = `
      <img src="${image}" alt="${title}">
      <div class="show-details">
          <h2>${title}</h2>
          <p>${summary}</p>
      </div>
  `;

  resultsDiv.appendChild(showDiv);
}