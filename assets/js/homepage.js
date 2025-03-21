const getGames = function () {
  const gameURL = 'https://striveschool-api.herokuapp.com/api/product/';

  const hideSpinner = function () {
    const div = document.getElementById('spinner-container');
    div.classList.add('d-none');
  };

  fetch(gameURL, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWU5OTM4MzRiZjAwMTUwMDA2ZjAiLCJpYXQiOjE3NDI1NDQ1MzgsImV4cCI6MTc0Mzc1NDEzOH0.J7KGFh9DOjoPA6bRLypVJeFfExEU4jsOjM2N98yFMD4',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('la risposta non era valida');
      }
    })
    .then((data) => {
      hideSpinner();
      console.log('DATI RICEVUTI DAL SERVER', data);

      const row = document.getElementById('games-row');

      data.forEach((game) => {
        row.innerHTML =
          row.innerHTML +
          `
            <div class="col col-12  justify-content-center col-lg-3 col-md-4 col-sm-6 mb-2 mt-1 ">
              <div class="card w-75 border border-secondary shadow-lg">
     
                <img src="${game.imageUrl}" class="card-img-top" style="height:200px" alt="${game.name}" />
                <div class="card-body pb-0  d-flex flex-column bg-secondary" style="height:355px">
                 <a href="details.html?id=${game._id}" style=" text-decoration: none"> 
                  <h5 class="card-title">${game.name}</h5>
                  <p class="card-text" style="font-size:0.4em; text-decoration:none;">${game.description}</p>
                  <div class=" mt-auto mb-1">
                  <p class="card-text mt-auto" style="font-size:0.4em; text-decoration:none;">${game.brand}</p>
                  <p class="card-text" style="font-size:0.4em; text-decoration:none;">${game.price}€
                     <div>
                  <a href="../html/details.html?id=${game._id}" class="btn btn-success" style="font-size: 0.5em;">Gioca!</a>
<a href="../html/backoffice.html?id=${game._id}" class="btn btn-warning" style="font-size: 0.5em;">Modifica</a>

                </div>
                </div>
              </div>
            </div>
          `;
        // <a href="details.html?id=${game._id}" style=" text-decoration: none"> ho rimosso questo perchè sottolinea tutto e non capisco
        //bene se i due pulsanti funzionano o meno
        //cliccando sulla card con questo tag a, l'esercizio funziona
      });
    })
    .catch((error) => {
      console.log('si è verificato un errore', error);
    });
};

getGames();
