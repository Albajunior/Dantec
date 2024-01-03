if (!sessionStorage.getItem("Token")) {
  window.location.href = "connexion.html";
  console.log(" Info existe dans le sessionStorage");
}

let firstName = document.querySelector("#firstName").value;
let lastName = document.querySelector("#lastName").value;
let telephone = document.querySelector("#telephone").value;
let sexe = document.querySelector("#sexe").value;
let specialite = document.querySelector("#specialite").value;
let email = document.querySelector("#email").value;
let password = document.getElementById("password").value;

let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg").value;
let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg").value;
let telephoneErrorMsg = document.querySelector("#telephoneErrorMsg").value;
let sexeErrorMsg = document.querySelector("#sexeErrorMsg").value;
let emailErrorMsg = document.querySelector("#emailErrorMsg").value;
let passwordErrorMsg = document.getElementById("passwordErrorMsg").value;

document.getElementById("btnform").addEventListener("click", function (e) {
  e.preventDefault();

  controlePrenom();
  controleEmail();
  controleNom();
  controleTelephone();
  controlePassword();

  if (
    controlePrenom() &&
    controleEmail() &&
    controleNom() &&
    controleTelephone() &&
    controlePassword()
  ) {
    const medecin = {
      prenom: firstName,
      nom: lastName,
      telephone: telephone,
      sexe: sexe,
      specialite: specialite,
      email: email,
      password: password,
      createDate: new Date(),
    };
    console.log(medecin);

    // // Création de l'entête de la requête
    const options = {
      method: "POST",
      body: JSON.stringify(medecin),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      },
    };
    console.log(options);

    fetch("http://localhost:3000/api/auth/signup", options)
      .then((response) => {
        if (response.status === 201) {
          // Récupérer les données renvoyées par la requête
          response.json().then((data) => {
            console.log("Données récupérées avec succès :", data);
            sessionStorage.setItem("InfoMedecin", JSON.stringify(data));
            // Faites quelque chose avec les données récupérées ici
          });
        } else {
          // Le statut de la réponse n'est pas 201
          console.log("La requête n'a pas abouti avec un statut 201");
          alert("Error, email existe deja");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  }
});

//   //controle prenom

function controlePrenom() {
  if (!firstName.checkValidity()) {
    // Si le champ n'est pas valide 
    firstNameErrorMsg.textContent =
      "Le prenom doit contenir entre 3 et 20 lettres.";
    firstNameErrorMsg.style.color = "red";
    return false;
  } else {
    // Réinitialise le message d'erreur s'il est valide
    firstNameErrorMsg.textContent = "";
    return true;
  }
}

function controleNom() {
  if (!lastName.checkValidity()) {
    // Si le champ n'est pas valide 
    lastNameErrorMsg.textContent =
      "Le nom doit contenir entre 3 et 20 lettres.";
    lastNameErrorMsg.style.color = "red";
    return false;
  } else {
    // Réinitialise le message d'erreur s'il est valide
    lastNameErrorMsg.textContent = "";
    return true;
  }
}

function controleTelephone() {
  if (!telephone.checkValidity()) {
    // Si le champ n'est pas valide 
    telephoneErrorMsg.textContent = "Format non correct ";
    telephoneErrorMsg.style.color = "red";
    return false;
  } else {
    // Réinitialise le message d'erreur s'il est valide
    telephoneErrorMsg.textContent = "";
    return true;
  }
}

function controleEmail() {
  if (!email.checkValidity()) {
    // Si le champ n'est pas valide 
    emailErrorMsg.textContent = "Email non valide. ";
    emailErrorMsg.style.color = "red";
    return false;
  } else {
    // Réinitialise le message d'erreur s'il est valide
    emailErrorMsg.textContent = "";
    return true;
  }
}

function controlePassword() {
  if (!password.checkValidity()) {
    // Si le champ n'est pas valide 
    passwordErrorMsg.textContent = "Mot de passe non valide. ";
    passwordErrorMsg.style.color = "red";
    return false;
  } else {
    // Réinitialise le message d'erreur s'il est valide
    passwordErrorMsg.textContent = "";
    return true;
  }
}
