const view = class {
  constructor() {
    this.app = document.getElementById("app");
  }
  showHeader(step) {
    return `
      <header>
        <div class="logo">🎮 Watchlist Game</div>
        <h1>Pick Your Game Titles</h1>
        <p>Select games you like to get movie recommendations.</p>
        <p class="progress">Step ${step} of 3</p>
      </header>
    `;
  }

  renderGames(games, selectedGames, filter, genres) {
    let html = this.showHeader(1);

    html += `<div class="filters">`;

    const allGenres = ["All", ...genres];

    allGenres.forEach(genre => {
      let active = filter === genre ? "active" : "";

      html += `
        <button class="filter-btn ${active}" data-filter="${genre}">
          ${genre}
        </button>
      `;
    });

    html += `</div><div class="game-grid">`;

    games.forEach(game => {
      if (filter === "All" || game.genre === filter) {
        let selected = selectedGames.includes(game.id) ? "selected" : "";

        html += `
          <div class="game-card ${selected}" data-id="${game.id}">
            <img src="${game.image}" alt="${game.title}">
            <span class="checkbox"></span>
            <h3>${game.title}</h3>
          </div>
        `;
      }
    });

    html += `
      </div>
      <div class="actions">
        <button id="nextBtn" class="primary-btn"
          ${selectedGames.length === 0 ? "disabled" : ""}>
          Review Picks (${selectedGames.length}) →
        </button>
      </div>
    `;

    this.app.innerHTML = html;
  }

  renderReview(games) {
    let html = this.showHeader(2);

    html += `
      <section class="panel">
        <h2>Review Your Picks</h2>
        <p>You selected ${games.length} games.</p>
        <ul>
    `;

    games.forEach(game => {
      html += `<li>${game.title} (${game.genre})</li>`;
    });

    html += `
        </ul>
        <div class="actions">
          <button id="backBtn" class="secondary-btn">← Back</button>
          <button id="generateBtn" class="primary-btn">
            Create My Watchlist →
          </button>
        </div>
      </section>
    `;

    this.app.innerHTML = html;
  }

  renderWatchlist(movies, genres) {
    let html = this.showHeader(3);

    html += `
      <div class="info-grid">
        <div class="info-card">
          <h2>🎬 Check out your next flick.</h2>
          <p>Level up your watchlist with these recommendations.</p>
        </div>

        <div class="info-card">
          <h2>Your Movie Profile</h2>
          <div class="genre-pills">
    `;

    genres.forEach(genre => {
      html += `<span class="genre-pill">${genre}</span>`;
    });

    html += `
          </div>
        </div>
      </div>

      <h2>Your Recommended Movies</h2>
      <p class="movie-count">${movies.length} movies recommended</p>

      <div class="movie-grid">
    `;

    movies.forEach(movie => {
      html += `
        <a class="movie-card" href="#/movie/${movie.id}">
          <img src="${movie.image}" alt="${movie.title} poster">

          <div class="movie-info">
            <h3>${movie.title}</h3>
            <p class="rating">Rating: ${movie.rating}</p>
            <p class="synopsis">${movie.synopsis}</p>
          </div>
        </a>
      `;
    });

    html += `
      </div>
      <div class="actions">
        <button id="restartBtn" class="secondary-btn">
          ← Choose Different Games
        </button>
      </div>
    `;

    this.app.innerHTML = html;
  }

  renderMovieDetail(movie) {
    this.app.innerHTML = `
      <div class="detail-page">
        <a href="#/watchlist" class="back-link">
          ← Back to Watchlist
        </a>

        <div class="detail-card">
          <img src="${movie.image}" alt="${movie.title} poster">

          <div>
            <h1>${movie.title}</h1>
            <span class="genre-pill">${movie.genre}</span>
            <p class="rating">Rating: ${movie.rating}</p>

            <h2>Synopsis</h2>
            <p>${movie.synopsis}</p>

            <a href="#/watchlist" class="detail-back-button">
              Return to Watchlist
            </a>
          </div>
        </div>
      </div>
    `;
  }
};
console.log("View.js loaded");