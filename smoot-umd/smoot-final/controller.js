const controller = class {
  constructor() {
    this.model = new Model();
    this.view = new View();

    this.filter = "All";
    this.page = 1;

    this.showGames();
  }

  showGames() {
    this.page = 1;

    this.view.renderGames(
      this.model.games,
      this.model.selectedGames,
      this.filter,
      this.model.genres
    );

    document.querySelectorAll(".filter-btn").forEach(button => {
      button.addEventListener("click", () => {
        this.filter = button.dataset.filter;
        this.showGames();
      });
    });

    document.querySelectorAll(".game-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = Number(card.dataset.id);

        this.model.toggleGame(id);
        this.showGames();
      });
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
      if (this.model.selectedGames.length > 0) {
        this.showReview();
      }
    });
  }

  showReview() {
    this.page = 2;

    const games = this.model.getSelectedGames();

    this.view.renderReview(games);

    document.getElementById("backBtn").addEventListener("click", () => {
      this.showGames();
    });

    document.getElementById("generateBtn").addEventListener("click", () => {
      this.showWatchlist();
    });
  }

  showWatchlist() {
    this.page = 3;

    const movies = this.model.getRecommendations();
    const genres = this.model.getSelectedGenres();

    this.view.renderWatchlist(movies, genres);

    document.getElementById("restartBtn").addEventListener("click", () => {
      this.showGames();
    });

    document.querySelectorAll(".movie-card").forEach(card => {
      card.addEventListener("click", event => {
        event.preventDefault();

        const movieId = card.getAttribute("href").split("/").pop();
        this.showMovieDetail(movieId);
      });
    });
  }

  showMovieDetail(id) {
    const movie = this.model.getMovieById(id);

    if (movie) {
      this.view.renderMovieDetail(movie);

      document.querySelectorAll(
        ".back-link, .detail-back-button"
      ).forEach(button => {
        button.addEventListener("click", event => {
          event.preventDefault();
          this.showWatchlist();
        });
      });
    }
  }
};