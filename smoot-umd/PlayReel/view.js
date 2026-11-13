class View {
  constructor(root) { this.root = root; }

  page(content) {
    this.root.innerHTML = `<div class="container"><header class="brand">Play<span>Reel</span></header>${content}</div>`;
  }

  intro(title, subtitle) {
    return `<div class="intro"><section class="hero"><h1>${title}</h1><p>${subtitle}</p></section>
      <aside class="how"><b>How it works:</b><br>Build your watchlist by selecting games you enjoy.<br>The ‘algorithm’ will find the closest matching movies.</aside></div>`;
  }

  footer(back = false) {
    return `<footer class="${back ? 'list-footer' : ''}">
      <button class="text-button" data-action="${back ? 'back' : 'skip'}">${back ? 'Go back to Game Selection' : 'Skip'}</button>
      <button class="primary" data-action="${back ? 'download' : 'review'}">${back ? 'Download Watchlist' : 'Review Watchlist'}</button>
    </footer>`;
  }

  selection(model, filter) {
    const categories = ['All', 'Action', 'Adventure', 'Horror', 'RPG', 'Simulation'];
    this.page(`${this.intro('What kind of games do you <em>play</em>?', 'Discover films inspired by games you love.')}
      <nav class="filters">${categories.map(name => `<button class="filter ${filter === name ? 'active' : ''}" data-filter="${name}">${name}</button>`).join('')}</nav>
      <div class="games">${model.games.filter(game => filter === 'All' || game.genre === filter).map(game => `
        <button class="game" data-game="${game.id}" aria-label="Select ${game.title}" aria-pressed="${model.selected.has(game.id)}">
          <img src="images/${game.id}.png" alt="${game.title}">
          <span class="check ${model.selected.has(game.id) ? 'checked' : ''}">${model.selected.has(game.id) ? '✓' : ''}</span>
        </button>`).join('')}</div>${this.footer()}`);
    this.root.querySelector('[data-action="review"]').disabled = model.selected.size === 0;
  }

  watchlist(movies) {
    this.page(`${this.intro('Check out your next <em>flick</em>.', 'Level up your watchlist with these recommendations.')}
      <div class="movies">${movies.map(movie => `
        <button class="movie" data-movie="${movie.id}">
          <img src="${movie.id}" alt="${movie.title} poster"><div><h2>${movie.title}</h2>
          <span class="rating">Review: ${movie.rating}/10</span><p>${movie.plot}</p></div>
        </button>`).join('')}</div>${this.footer(true)}`);
  }

  detail(movie) {
    this.page(`<div class="detail-head"><button class="back-arrow" data-action="list">‹</button>
      <h1>${movie.title}</h1><span>Similar to: ${movie.similarTo}</span></div>
      <div class="detail-body"<img src="${movie.id}" alt="${movie.title} detail-poster"><article>
        <h3>Review: ${movie.rating}/10</h3><h3>Genre:</h3><p>${movie.genres.join(', ')}</p>
        <h3>Plot:</h3><p>${movie.plot}</p><p class="description">${movie.description}</p>
      </article></div><div class="detail-actions">${this.footer(true)}</div>`);
  }
}
