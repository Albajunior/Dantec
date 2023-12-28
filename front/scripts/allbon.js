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

const optionsDelete = {
  method: "DELETE",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + Token,
  },
};


getAllBon();


function getAllBon() {
  fetch("http://localhost:3000/api/bon/readAll", options)
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

      let titre1 = document.getElementById('titre1');
      let titre2 = document.getElementById('titre2');

      let panierEncours = [], panierEnd = [];
      let items1 = document.querySelector("#items1");
      let items2 = document.querySelector("#items2");

      titre2.style.display = 'none';
      items2.style.display = 'none';
      
      for (m = 0; m < data.length; m++) {

        if (data[m].Nombre_Poche == 2){

          panierEncours = panierEncours +
          `
          <div class="col">
              <div class="card text-bg-danger" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${data[m].NomPatient} ${data[m].PrenomPatient} </h5>
                  <p class="card-text">Service : ${data[m].Service} </p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">ID : ${data[m]._id}</li>
                  <li class="list-group-item">Groupe Sanguin : ${data[m].Groupe_Sanguin}</li>
                  <li class="list-group-item">Nombre de Poche : ${data[m].Nombre_Poche}</li>
                  <li class="list-group-item">Degres d'urdence : ${data[m].Degres_urgence}</li>
                  <li class="list-group-item">${data[m].Numero_Salle}</li>
                  <li class="list-group-item">Medecin : ${data[m].Nom_Medecin}</li>
                  <li class="list-group-item">${data[m].createDate}</li>
                </ul>
                <div class="card-body">
                  <a href="editbon.html?id=${data[m]._id}"> <button class="edit" >Modifier</button></a>
                  <button id="delete" value="${data[m]._id}" onclick="confirmerSuppression()">Supprimer</button>
                </div>
              </div>
            </div>`;
            items1.innerHTML = panierEncours;

        }else {
          panierEnd = panierEnd +
           `
            <div class="col">
              <div class="card text-bg-success" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${data[m].NomPatient} ${data[m].PrenomPatient} </h5>
                  <p class="card-text">Service : ${data[m].Service} </p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">ID : ${data[m]._id}</li>
                  <li class="list-group-item">Groupe Sanguin : ${data[m].Groupe_Sanguin}</li>
                  <li class="list-group-item">Nombre de Poche : ${data[m].Nombre_Poche}</li>
                  <li class="list-group-item">Degres d'urdence : ${data[m].Degres_urgence}</li>
                  <li class="list-group-item">${data[m].Numero_Salle}</li>
                  <li class="list-group-item">Medecin : ${data[m].Nom_Medecin}</li>
                  <li class="list-group-item">${data[m].createDate}</li>
                </ul>
                <div class="card-body">
                  <a href="editbon.html?id=${data[m]._id}"> <button class="edit" >Modifier</button></a>
                  <button id="delete" value="${data[m]._id}" onclick="confirmerSuppression()">Supprimer</button>
                </div>
              </div>
            </div>`;
            items2.innerHTML = panierEnd;
        }
      }

      document.getElementById("end").addEventListener('click', () => {

        titre1.style.display = 'none';
        items1.style.display = 'none';

        titre2.style.display = 'block';
        items2.style.display = 'flex';

      })

      document.getElementById("en_cours").addEventListener('click', () => {

        titre2.style.display = 'none';
        items2.style.display = 'none';

        titre1.style.display = 'block';
        items1.style.display = 'flex';

      })



    });
}

function confirmerSuppression() {
  if (confirm("Voulez-vous supprimer cet utilisateur ?")) {
    const bouton = document.getElementById("delete");
    const valeur = bouton.value;
    deletebon(valeur, optionsDelete);
  } else {
    // Si l'utilisateur clique sur 'Annuler' dans le pop-up, ne rien faire
    alert("Suppression annulée !");
  }
}


function deletebon(id_bon, optionsDelete) {
  fetch("http://localhost:3000/api/bon/delete/" + id_bon, optionsDelete)
  .then(response => {
    if (response.status === 204){
      alert('Delete Good');
      location.reload();
    }else {
      console.log('bad requete');
    }
  })
  .catch(error => {
      console.error('Erreur lors de la requête :', error);
  });

}


