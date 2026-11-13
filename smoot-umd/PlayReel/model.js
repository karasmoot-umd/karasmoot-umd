class Model {
  constructor() {
    this.games = [
      {id:'cyberpunk',title:'Cyberpunk 2077',genre:'RPG',tags:['Sci-Fi']},
      {id:'forza',title:'Forza Horizon',genre:'Simulation',tags:['Sport']},
      {id:'gran-turismo',title:'Gran Turismo',genre:'Simulation',tags:['Sport']},
      {id:'gta',title:'Grand Theft Auto VI',genre:'Action',tags:['Action']},
      {id:'horizon',title:'Horizon Forbidden West',genre:'Adventure',tags:['Adventure']},
      {id:'red-dead',title:'Red Dead Redemption II',genre:'Action',tags:['Action']},
      {id:'resident-evil',title:'Resident Evil',genre:'Horror',tags:['Horror']},
      {id:'silent-hill',title:'Silent Hill 2',genre:'Horror',tags:['Horror']},
      {id:'starfield',title:'Starfield',genre:'RPG',tags:['Sci-Fi']},
      {id:'uncharted',title:'Uncharted',genre:'Adventure',tags:['Adventure']}
    ];
    this.movies = [
      {id:'blade-runner',title:'Blade Runner',genres:['Sci-Fi'],rating:8.0,plot:'A young blade runner discovers a secret that leads him on a quest to find a missing legend.',description:'A visually striking science-fiction mystery set in a futuristic world.', poster: "images/blade-runner.png"},
      {id:'ford-v-ferrari',title:'Ford vs. Ferrari',genres:['Sport'],rating:7.2,plot:'A talented gamer earns a chance to become a professional race car driver.',description:'Based on the true story of a gamer who turns virtual racing into a real-world career.', poster: "images/ford-v-ferrari.png"},
      {id:'resident-evil-movie',title:'Resident Evil',genres:['Horror'],rating:6.6,plot:'A special military unit battles a deadly outbreak inside a secret underground research facility.',description:'A survival-horror action film inspired by the video game series.', poster: "images/resident-evil-movie.png"},
      {id:'silent-hill-movie',title:'Silent Hill',genres:['Horror'],rating:6.5,plot:'A mother searches for her missing daughter in a fog-covered town filled with terrifying secrets.',description:'A supernatural horror film based on the atmospheric video game series.', poster: "images/silent-hill-movie.png"},
      {id:'tomb-raider-movie',title:'Tomb Raider',genres:['Adventure'],rating:6.3,plot:'A young treasure hunter travels the world in pursuit of a legendary fortune.',description:'An action-adventure movie based on the popular games.', poster: "images/tomb-raider-movie.png"},
      {id:'drive',title:'Drive',genres:['Action'],rating:7.1,plot:'A bank teller discovers he is a background character in an open-world video game.',description:'An action comedy about finding freedom inside a video game.', poster: "images/drive.png"},
      {id:'jurassic-world',title:'Jurassic World',genres:['Sci-Fi'],rating:8.0,plot:'An astronaut stranded on Mars must use his ingenuity to survive.',description:'A science-fiction survival adventure.', poster: "images/jurassic-world.png"},
      {id:'interstellar',title:'Interstellar',genres:['Sci-Fi'],rating:6.3,plot:'Lara Croft journeys to a mysterious island in search of her missing father.',description:'A globe-trotting adventure based on the video game.', poster: "images/interstellar.png"},
      {id:'fast-and-furious',title:'Fast & Furious',genres:['Sport'],rating:6.4,plot:'A street racer joins a cross-country race to seek justice.',description:'A high-speed action movie based on the racing franchise.', poster: "images/fast-and-furious.png"},
      {id:'scarface',title:'Scarface',genres:['Action'],rating:8.8,plot:'Three gunslingers compete to find buried gold during the American Civil War.',description:'A classic Western adventure.', poster: "images/scarface.png"}
    ];
    this.selected = new Set();
  }

  toggle(id) {
    if (this.selected.has(id)) this.selected.delete(id);
    else this.selected.add(id);
  }

  recommend() {
    const games = this.games.filter(game => this.selected.has(game.id));
    return this.movies
      .map(movie => {
        const matches = games.filter(game => game.tags.some(tag => movie.genres.includes(tag)));
        return { ...movie, score: matches.length, similarTo: matches.map(game => game.title).join(', ') };
      })
      .filter(movie => movie.score > 0)
      .sort((a, b) => b.score - a.score || b.rating - a.rating)
      .slice(0, 4);
  }
}
