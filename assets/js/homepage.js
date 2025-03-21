const getGames = function () {
  const gameURL = 'https://striveschool-api.herokuapp.com/api/product/';
  //   con questo URL ora facciamo un'operazione di GET per recuperare gli eventi
  // attualmente salvati
  fetch(gameURL, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWU5OTM4MzRiZjAwMTUwMDA2ZjAiLCJpYXQiOjE3NDI1NDQ1MzgsImV4cCI6MTc0Mzc1NDEzOH0.J7KGFh9DOjoPA6bRLypVJeFfExEU4jsOjM2N98yFMD4',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      // response è un oggetto JS che comprende un po' di proprietà interessanti
      // tra cui una proprietà chiamata "ok" che in un semplice booleano riassume
      // l'esito della chiamata
      if (response.ok) {
        // possiamo sperare di recuperare i dati da questa response!
        return response.json();
      } else {
        // vuol dire che la response è arrivata ma che ha un problema
        // se finiamo nell'else, lanciamoci nel blocco .catch()
        throw new Error('la risposta non era valida');
      }
    })
    .then((data) => {
      console.log('DATI RICEVUTI DAL SERVER', data);

      // prendo un riferimento alla row definita in HTML
      const row = document.getElementById('games-row');
      // ora devo ciclare l'array "data" e per ogni oggetto (concerto) devo creare
      // una colonna con dentro una card

      data.forEach((game) => {
        row.innerHTML =
          row.innerHTML +
          `
            <div class="col col-12  justify-content-center col-lg-3 col-md-4 col-sm-6 mb-2 mt-1 ">
              <div class="card w-75 border border-secondary shadow-lg">
              
                <img src="${game.imageUrl}" class="card-img-top" style="height:200px" alt="${game.name}" />
                <div class="card-body pb-0  d-flex flex-column bg-secondary" style="height:355px">
                
                  <h5 class="card-title">${game.name}</h5>
                  <p class="card-text" style="font-size:0.4em">${game.description}</p>
                  <div class=" mt-auto mb-1">
                  <p class="card-text mt-auto" style="font-size:0.4em">${game.brand}</p>
                  <p class="card-text" style="font-size:0.4em">${game.price}€
                     <div>
                  <a href="../html/details.html?id=${game._id}" class="btn btn-success style="font-size:0.5em">Giochiamo!</a>
                  <a href="../html/details.html?id=${game._id}" class="btn btn-success style="font-size:0.em">Modifica</a>
                </div>
                </div>
              </div>
            </div>
          `;
      });
    })
    .catch((error) => {
      console.log('si è verificato un errore', error);
    });
};

getGames();
