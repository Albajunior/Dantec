if (!sessionStorage.getItem("Token")) {
  window.location.href = "connexion.html";
  console.log(" No Token");
}

const Token = sessionStorage.getItem("Token");

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + Token,
  },
};


getAllPoche();

function getAllPoche() {
  fetch("http://localhost:3000/api/poche/readAll", options)
    .then(function (response) {
      return response.json();
    })
    .catch((error) => {
      alert(
        "Error. Veuillez lancé le serveur local (Port 3000) ? Si le problème persiste, contactez-nous.",
        error
      );
      // Recharge la page actuelle
      location.reload();
    })
    .then(function (data) {
      console.log(data);

      let panier = [];
      let items1 = document.querySelector("#items1");

      for (m = 0; m < data.length; m++) {

          panier =
            panier +
            `
            <div class="col">
            <div class="card" style="width: 18rem; background-color: #44a7e7">
              <div class="card-body">
                <h4 class="card-title" style="text-align: center">${data[m].Groupe}</h4>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Id:${data[m]._id}</li>
                <li class="list-group-item">Stock: ${data[m].Stock} poches</li>
                <li class="list-group-item">
                  Date : ${data[m].createDate}
                </li>
              </ul>
              <div class="card-body" style="text-align: center">
                  <button id="delete" class="edit" value="${data[m]._id}" onclick="confirmerEdit()">Modifier Stock</button>
              </div>
            </div>
          </div> `;
          items1.innerHTML = panier;   
      }
    });
}

function confirmerEdit() {
    const Stock = prompt('Veuillez saisir le nouveau stock :', '');
    if (Stock !== null && Stock > 0) {
        const bouton = document.getElementById("delete");
        const idpoche = bouton.value;

        const NewStock = {
            Stock,
            createDate: new Date()
        }

        const optionEdit = {
            method: "PUT",
            body: JSON.stringify(NewStock),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + Token,
            },
        };
        console.log(optionEdit);

        edit(idpoche, optionEdit);   

      }else if(Stock < 0) {
        alert('valeur incorrect'); 
      } else {
        alert('Opération annulée.');
      }
}

  function edit(id, optionEdit) {
    fetch("http://localhost:3000/api/poche/update/" + id, optionEdit)
    .then(response => {
      if (response.status === 200){
        alert('Stock Modifier');
       // location.reload();
      }else {
        console.log('bad requete');
      }
    })
    .catch(error => {
        console.error('Erreur lors de la requête :', error);
    });

  }
