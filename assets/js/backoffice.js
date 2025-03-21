const hideSpinner = function () {
  const div = document.getElementById('spinner-container');
  div.classList.add('d-none');
};
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
      hideSpinner();
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
  console.log('priceInput.value:', priceInput.value);
  console.log('typeof priceInput.value:', typeof priceInput.value);

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
    method: methodToUse,
    body: JSON.stringify(game),
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWU5OTM4MzRiZjAwMTUwMDA2ZjAiLCJpYXQiOjE3NDI1NDQ1MzgsImV4cCI6MTc0Mzc1NDEzOH0.J7KGFh9DOjoPA6bRLypVJeFfExEU4jsOjM2N98yFMD4',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        alert('SALVATAGGIO COMPLETATO!');

        form.reset(); //
      } else {
        throw new Error('ricevuta response non ok dal backend');
      }
    })
    .then((data) => {
      // Carica i dettagli del gioco nel form
      document.getElementById('name').value = data.name;
      document.getElementById('brand').value = data.brand;
      document.getElementById('imageUrl').value = data.imageUrl;
      document.getElementById('description').value = data.description;
      document.getElementById('price').value = data.price;
    })
    .catch((err) => {
      console.log('errore nel salvataggio!', err);
    });
});

document.addEventListener('DOMContentLoaded', function () {
  const resetButton = document.getElementById('reset-Button');
  resetButton.addEventListener('click', function (event) {
    // Mostra la finestra di conferma
    const confirmation = window.confirm(
      'Sei sicuro di voler resettare i dati? Questa azione è irreversibile.'
    );

    if (confirmation) {
      resetForm();
    }
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const add = document.getElementById('add');
  resetButton.addEventListener('click', function () {
    const confirmation = window.confirm('Aggiungiamo?');

    if (confirmation) {
      resetForm();
    }
  });
});
