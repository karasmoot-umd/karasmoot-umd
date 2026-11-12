const model = class {
constructor() {
    this.genres = [
        "Action",
        "Adventure",
        "Horror",
        "Racing",
        "RPG"
    ];
    this.games = [
    {id: 1, title: "Red Dead Redemption 2", genre: "Action", image: "images/games//Users/karasmoot/Red_Dead_Redemption_2.png"},
    {id: 2, title: "Grand Theft Auto VI", genre: "Action", image: "images/games/GTA_6.png"},
    {id: 3, title: "Ucharted", genre: "Adventure", image:"images/games/Uncharted.png"},
    {id: 4, title: "Horizon Forbidden West", genre: "Adventure", image:"images/games/Horizon_Forbiden_West.png"},
    {id: 5, title: "Resident Evil", genre: "Horror", image:"images/games/Resident_Evil.png"},
    {id: 6, title: "Silent Hill", genre: "Horror", image:"images/games/Silent_Hill_2.png"},
    {id: 7, title: "Grand Turismo", genre: "Racing", image:"images/games/Gran_Turismo.png"},
    {id: 8, title: "Forza Horizon Zero", genre: "Racing", image:"images/games/Forza_Horizon_Zero.png"},
    {id: 9, title: "Cyberpunk 2077", genre: "RPG", image:"images/games/Cyberpunk_2077.png"},
    {id: 10, title: "Starfield", genre: "RPG", image:"images/games/Starfield.png"}
    ];

this.movies = [
    {
    id: "scarface",
    title: "Scarface",
    genre: "Action",
    rating: 8/10,
    image: "images/movies/scarface.jpg",
    synopsis: "A Cuban immigrant rises through Miami's criminal underworld, building a powerful empire while facing the consequences of ambition and greed."
    },
    {
        id: "drive",
        title: "Drive",
        genre: "Action",
        image: "",
        rating: 7.8/10,
        synopsis: "A mysterious Hollywood stunt driver becomes involved in a dangerous criminal plot while trying to protect the people he cares about."
    },
    {
            id: "tomb-raider",
            title: "Tomb Raider",
            genre: "Adventure",
            rating: 6/10,
            image: "",
            synopsis: "Lara Croft travels to a mysterious island in search of her missing father and discovers an ancient secret filled with deadly challengesLara Croft travels to a mysterious island in search of her missing father and discovers an ancient secret filled with deadly challenges."
        },
    {
                id: "jurassic-world",
                title: "Jurassic World",
                genre: "Adventure",
                rating: 8/10,
                image: "",
                synopsis: "A dinosaur theme park descends into chaos when a genetically engineered predator escapes, putting visitors and staff in danger."},
    {
        id: "resident-evil",
        title: "Resident Evil",
        genre: "Horror",
        rating: 8/10,
        image:"",
        synopsis: "Medical courier Bryan unwittingly finds himself fighting for survival as one fateful, horrifying night collapses around him in chaos."},
    {
        id: "silent-hill",
        title: "Silent Hill",
        genre: "Horror",
        rating: 6/10,
        image:"",
        synopsis: "A mother searches for her missing daughter in an abandoned town filled with disturbing creatures, strange mysteries, and supernatural horrors."
    }, 
    { 
        id: "ford-vs-ferrari",
        title: "Ford v Ferrari",
        genre: "Racing",
        rating: 9/10,
        image: "",
        synopsis: "An automotive designer and a fearless race car driver join forces to challenge Ferrari at the legendary 24 Hours of Le Mans."
    },
    {
        id: "fast-and-furious",
        title: "Fast & Furious",
        genre: "Racing",
        rating: 7/10,
        image: "",
        synopsis: "An undercover police officer enters the world of underground street racing and finds himself torn between duty and loyalty."
    },
    {
        id: "blade-runner",
        title: "Blade Runner",
        genre: "RPG",
        rating: 9/10,
        image: "",
        synopsis: "In a futuristic city, a detective hunts artificial humans while questioning the boundaries between humanity, memory, and identity."
    },
    {
        id: "interstellar",
        title: "Interstellar",
        genre: "RPG",
        rating: 9/10,
        image:"",
        synopsis: "A team of astronauts travels through a wormhole in search of a new home for humanity as Earth faces an environmental crisis."
    }];
    this.selectedGames = [];
}
  toggleGame(id) {
    if (this.selectedGames.includes(id)) {
      this.selectedGames = this.selectedGames.filter(gameId => gameId !== id);
    } else {
      this.selectedGames.push(id);
    }
  }
  getSelectedGames() {
    return this.games.filter(game =>
      this.selectedGames.includes(game.id)
    );
  }
  getSelectedGenres() {
    const genres = this.getSelectedGames().map(game => game.genre);
    return [...new Set(genres)];
  }

  getRecommendations() {
    const genres = this.getSelectedGenres();

    return this.movies.filter(movie =>
      genres.includes(movie.genre)
    );
  }

  getMovieById(id) {
    return this.movies.find(movie => movie.id === id);
  }
};