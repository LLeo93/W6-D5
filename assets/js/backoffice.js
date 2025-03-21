const getData = function () {
  fetch('https://striveschool-api.herokuapp.com/api/product/', {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWU5OTM4MzRiZjAwMTUwMDA2ZjAiLCJpYXQiOjE3NDI1NDQ1MzgsImV4cCI6MTc0Mzc1NDEzOH0.J7KGFh9DOjoPA6bRLypVJeFfExEU4jsOjM2N98yFMD4',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log('ci siamo');
        return response.json();
      } else {
        throw new Error('la risposta non era valida');
      }
    })
    .then((data) => {
      console.log('DATI RICEVUTI DAL SERVER', data);
    })
    .catch((error) => {
      console.log('si è verificato un errore', error);
    });
};
getData();

class Game {
  constructor(_name, _brand, _imageUrl, _description, _price) {
    this.name = _name;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
    this.description = _description;
  }
}
const URLparameters = new URLSearchParams(location.search);
const gameId = URLparameters.get('id');

//riferimento dal form
const nameInput = document.getElementById('name');
const urlInput = document.getElementById('imageUrl');
const descriptionInput = document.getElementById('description');
const priceInput = document.getElementById('price');
const brandInput = document.getElementById('brand');

const gameURL = 'https://striveschool-api.herokuapp.com/api/product/';
const form = document.getElementById('game-form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const game = new Game(
    nameInput.value,
    brandInput.value,
    urlInput.value,
    descriptionInput.value,
    parseFloat(priceInput.value)
  );

  console.log('gioco', game);
  console.log('priceInput.value:', priceInput.value); // Aggiungi questo log
  console.log('typeof priceInput.value:', typeof priceInput.value); // Verifica il tipo

  // ora il bello: lo salviamo in modo persistente nel DB
  // nota positiva: in un'API di tipo RESTFUL, l'URL su cui fate la GET generica
  // è anche l'URL per fare una POST!

  let methodToUse;
  let URLtoUse;

  if (gameId) {
    methodToUse = 'PUT';
    URLtoUse = gameURL + '/' + gameId;
  } else {
    methodToUse = 'POST';
    URLtoUse = gameURL;
  }

  fetch(URLtoUse, {
    method: methodToUse, // metodo post per creazione nuovo gioco
    body: JSON.stringify(game), // oggetto game convertito in stringa JSON
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWU5OTM4MzRiZjAwMTUwMDA2ZjAiLCJpYXQiOjE3NDI1NDQ1MzgsImV4cCI6MTc0Mzc1NDEzOH0.J7KGFh9DOjoPA6bRLypVJeFfExEU4jsOjM2N98yFMD4',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      // la response ci dice se il salvataggio del nostro concerto è andato a buon fine o meno
      if (response.ok) {
        // il salvataggio ha funzionato!
        alert('SALVATAGGIO COMPLETATO!');
        // io nella pagina backoffice non avrei bisogno di recuperare il JSON dalla response
        // direi che potremmo semplicemente svuotare il form e finire qua
        form.reset(); // svuoto il form
      } else {
        // 400, 401, 500 etc.
        throw new Error('ricevuta response non ok dal backend');
      }
    })
    .catch((err) => {
      console.log('errore nel salvataggio!', err);
    });
});
