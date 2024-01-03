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

getAllMedecins();

function getAllMedecins() {
  fetch("http://localhost:3000/api/auth/readall", options)
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

      let theadtablte = [];
      let thead = document.querySelector("#theaddark");

      theadtablte =
          theadtablte +
      `
            <tr>
            <th scope="col">ID</th>
            <th scope="col">Nom</th>
            <th scope="col">Prenom</th>
            <th scope="col">Sexe</th>
            <th scope="col">Services</th>
            <th scope="col">Numero</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
            </tr>
      `;
      thead.innerHTML = theadtablte;

      let medecins = [];
      let items = document.querySelector("#tbody2");

      for (m = 0; m < data.length; m++) {
        medecins =
          medecins +
          `<tr>
            <td>${data[m]._id}</td>
            <td>${data[m].nom}</td>
            <td>${data[m].prenom}</td>
            <td>${data[m].sexe}</td>
            <td>${data[m].specialite}</td>
            <td>${data[m].telephone}</td>
            <td>${data[m].email}</td>
            <td>
            <a href="editmedecin.html?id=${data[m]._id}"> <button class="edit" >Modifier</button></a>
            <button id="delete" value="${data[m]._id}" onclick="confirmerSuppression()">Supprimer</button>
            </td>
          </tr>
        `;
        items.innerHTML = medecins;
      }

    });
}

function confirmerSuppression() {
  if (confirm("Voulez-vous supprimer cet utilisateur ?")) {
    const bouton = document.getElementById("delete");
    const valeur = bouton.value;
    deleteUser(valeur, optionsDelete);
  } else {
    // Si l'utilisateur clique sur 'Annuler' dans le pop-up, ne rien faire
    alert("Suppression annulée !");
  }
}

function deleteUser(id_medecin, optionsDelete) {
  fetch("http://localhost:3000/api/auth/delete/" + id_medecin, optionsDelete)
    .then((response) => {
      if (response.status === 204) {
        alert("Delete Good");
        location.reload();
      } else {
        console.log("bad requete");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la requête :", error);
    });
}
