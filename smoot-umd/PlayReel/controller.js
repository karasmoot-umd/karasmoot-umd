const model = new Model();
const view = new View(document.querySelector('#app'));
let filter = 'All';
let movies = [];

function showGames() { view.selection(model, filter); }
function showMovies() { movies = model.recommend(); view.watchlist(movies); }

showGames();

document.querySelector('#app').addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;

  if (button.dataset.filter) {
    filter = button.dataset.filter;
    showGames();
  } else if (button.dataset.game) {
    model.toggle(button.dataset.game);
    showGames();
  } else if (button.dataset.movie) {
    view.detail(movies.find(movie => movie.id === button.dataset.movie));
  } else {
    switch (button.dataset.action) {
      case 'review': showMovies(); break;
      case 'list': view.watchlist(movies); break;
      case 'back': showGames(); break;
      case 'skip':
        model.selected = new Set(model.games.map(game => game.id));
        showMovies();
        break;
      case 'download': downloadPDF(); break;
    }
  }
});

function downloadPDF() {
  const pdf = new window.jspdf.jsPDF();
  pdf.setFontSize(20);
  pdf.text('PlayReel Watchlist', 20, 20);
  pdf.setFontSize(11);
  let y = 35;
  movies.forEach((movie, index) => {
    const lines = pdf.splitTextToSize(`${index + 1}. ${movie.title} (${movie.rating}/10) - ${movie.genres.join(', ')}\n${movie.plot}`, 170);
    if (y + lines.length * 6 > 275) { pdf.addPage(); y = 20; }
    pdf.text(lines, 20, y);
    y += lines.length * 6 + 10;
  });
  pdf.save('PlayReel-Watchlist.pdf');
}
