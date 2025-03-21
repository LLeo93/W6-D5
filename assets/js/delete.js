const URLparameters = new URLSearchParams(location.search);

const gameId = URLparameters.get('id');
console.log('gameId:', gameId);

// URL dell'API per ottenere i dettagli del gioco
const gameURL = 'https://striveschool-api.herokuapp.com/api/product/';

// Funzione per recuperare i dettagli del gioco tramite GET
const getGameDetails = function () {
  fetch(gameURL + '/' + gameId, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWU5OTM4MzRiZjAwMTUwMDA2ZjAiLCJpYXQiOjE3NDI1NDQ1MzgsImV4cCI6MTc0Mzc1NDEzOH0.J7KGFh9DOjoPA6bRLypVJeFfExEU4jsOjM2N98yFMD4',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      console.log('response', response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Errore nel recupero dei dettagli del gioco');
      }
    })
    .then((data) => {
      console.log('DETTAGLI GIOCO', data);
      // Riempio i dettagli nella pagina
      const nameInput = document.getElementById('name');
      const descriptionInput = document.getElementById('description');
      const brandInput = document.getElementById('brand');
      const priceInput = document.getElementById('price');
      const rowGames = document.getElementById('games');

      // Aggiungi l'immagine corretta della card
      rowGames.innerHTML = `<img src="${data.imageUrl}" class="card-img-top" style="height:200px" alt="${data.name}" />`;

      // Popola gli altri dettagli
      nameInput.innerText = data.name;
      descriptionInput.innerText = data.description;
      brandInput.innerText = data.brand;
      priceInput.innerText = data.price + '€';
    })
    .catch((err) => {
      console.log('ERRORE NEL RECUPERO DATI GIOCO', err);
    });
};

// Funzione per modificare il gioco
const editGame = function () {
  location.assign('../html/backoffice.html?id=' + gameId);
};

// Funzione per eliminare il gioco
const deleteGame = function () {
  fetch(gameURL + gameId, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        alert('GIOCO ELIMINATO');
        location.assign('../html/homepage.html'); // Riporta l'utente alla home
      } else {
        throw new Error('Eliminazione NON riuscita!');
      }
    })
    .catch((err) => {
      console.log('ERRORE NELLA CANCELLAZIONE', err);
    });
};

// Aggiungi gli event listeners per i bottoni
document.querySelector('.edit').addEventListener('click', editGame);
document.querySelector('.delete').addEventListener('click', deleteGame);

// Recupera i dettagli del gioco
getGameDetails();
