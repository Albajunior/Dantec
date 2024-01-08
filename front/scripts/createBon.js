if (!sessionStorage.getItem("User")) {
  window.location.href = "connexion.html";
}

//fonction du bouton valider

document.getElementById("btnAdd").addEventListener("click", function (e) {
  e.preventDefault();
  const Token = sessionStorage.getItem("Token");

  let NomPatient = document.querySelector("#NomPatient").value;
  let PrenomPatient = document.querySelector("#PrenomPatient").value;
  let sexe = document.querySelector("#sexe").value;
  let age = document.querySelector("#age").value;
  let service = document.querySelector("#service").value;
  let groupe_Sanguin = document.querySelector("#groupe_Sanguin").value;
  let degres_urgence = document.getElementById("degres_urgence").value;
  let nombre_Poche = document.querySelector("#nombre_Poche").value;
  let numero_Salle = document.querySelector("#numero_Salle").value;
  
  controleNom();
  controlePrenom();
  controleNombrePoche();
  controleNumero_Salle();

  if (controleNom() && controlePrenom() && controleNombrePoche() && controleNumero_Salle()) {
    const Bon = {
      NomPatient: NomPatient,
      PrenomPatient: PrenomPatient,
      sexe: sexe,
      age: age,
      Service: service,
      Groupe_Sanguin: groupe_Sanguin,
      Degres_urgence: degres_urgence,
      Nombre_Poche: nombre_Poche,
      Numero_Salle: numero_Salle,
      createDate: new Date(),
    };

    // // Création de l'entête de la requête
    const options = {
      method: "POST",
      body: JSON.stringify(Bon),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    };
    console.log(options);

    fetch("http://localhost:3000/api/bon/create", options)
      .then((response) => {
        if (response.status === 201) {
          // Récupérer les données renvoyées par la requête
          response.json().then((data) => {
            alert("Bon de Cmd creer avec succès :");
            window.location.href = "profile.html";
          });
        } else {
          // Le statut de la réponse n'est pas 201
          console.log("La requête n'a pas abouti");
          alert("Bad rqwuest");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  }
});

let NomPatientErrorMsg = document.querySelector("#NomPatientErrorMsg");
let PrenomPatientErrorMsg = document.querySelector("#PrenomPatientErrorMsg");
let ageErrorMsg = document.querySelector("#ageErrorMsg");
let nombre_PocheErrorMsg = document.querySelector("#nombre_PocheErrorMsg");
let numero_SalleErrorMsg = document.querySelector("#numero_SalleErrorMsg");

function controlePrenom() {
  if (!NomPatient.checkValidity()) {
    // Si le champ n'est pas valide
    NomPatientErrorMsg.textContent =
      "Le prenom doit contenir entre 3 et 20 lettres.";
    NomPatientErrorMsg.style.color = "red";
    return false;
  } else {
    // Réinitialise le message d'erreur s'il est valide
    NomPatientErrorMsg.textContent = "";
    return true;
  }
}

function controleNom() {
  if (!PrenomPatient.checkValidity()) {
    PrenomPatientErrorMsg.textContent =
      "Le nom doit contenir entre 3 et 20 lettres.";
    PrenomPatientErrorMsg.style.color = "red";
    return false;
  } else {
    PrenomPatientErrorMsg.textContent = "";
    return true;
  }
}

function controleNombrePoche() {
  if (!nombre_Poche.checkValidity()) {
    nombre_PocheErrorMsg.textContent = "Valeur non correct ";
    nombre_PocheErrorMsg.style.color = "red";
    return false;
  } else {
    nombre_PocheErrorMsg.textContent = "";
    return true;
  }
}


function controleNumero_Salle() {
  if (!numero_Salle.checkValidity()) {
    numero_SalleErrorMsg.textContent = "Numero de Salle incorect ";
    numero_SalleErrorMsg.style.color = "red";
    return false;
  } else {
    numero_SalleErrorMsg.textContent = "";
    return true;
  }
}
