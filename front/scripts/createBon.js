if (!sessionStorage.getItem("Token")) {
    window.location.href = "connexion.html";
    console.log(" Info existe dans le sessionStorage");
}


//fonction du bouton valider  

document.getElementById('btnAdd').addEventListener('click', function (e){

    // Récupération du token depuis sessionStorage
    const Token = sessionStorage.getItem('Token');
    // const tokenSansGuillemets = token.replace(/"/g, '');
    // console.log(tokenSansGuillemets);

    let NomPatient = document.querySelector('#NomPatient').value;
    let PrenomPatient = document.querySelector('#PrenomPatient').value;
    let telephone = document.querySelector('#telephone').value;
    let sexe = document.querySelector('#sexe').value;
    let age = document.querySelector('#age').value;
    let service = document.querySelector('#service').value;
    let groupe_Sanguin = document.querySelector('#groupe_Sanguin').value;
    let degres_urgence = document.getElementById("degres_urgence").value;
    let nombre_Poche = document.querySelector('#nombre_Poche').value;
    let numero_Salle = document.querySelector('#numero_Salle').value;


    e.preventDefault();

    //Si les donnes saisis sont valides , on envoi les donnees saisi et on affiche la paage confirmation 
  //   controlePrenom();
  //   controleAdress();
  //   controleNom();
  //   controlePrenom();
  //   controlegroupe_Sanguin();
   
     
    const Bon = {
          NomPatient: NomPatient,
          PrenomPatient: PrenomPatient,
          telephone: telephone,
          sexe: sexe,
          age: age,
          Service: service,
          Groupe_Sanguin: groupe_Sanguin,
          Degres_urgence: degres_urgence,
          Nombre_Poche: nombre_Poche,
          Numero_Salle: numero_Salle,
          createDate: new Date()
    };
  //   console.log(medecin);

     // // Création de l'entête de la requête
  const options = {
      method: "POST",
      body: JSON.stringify(Bon),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' +Token,
      },
    };
    console.log(options);

    fetch("http://localhost:3000/api/bon/create", options)
      
      .then(response => {
          if (response.status === 201) {
            // Récupérer les données renvoyées par la requête
            response.json().then(data => {
              console.log('Bon de Cmd creer avec succès :', data);
              console.log( data.age);
            });
          } else {
            // Le statut de la réponse n'est pas 201
            console.log('La requête n\'a pas abouti');
            alert("Bad rqwuest")
          }
        })
        .catch(error => {
          console.error('Erreur lors de la requête :', error);
        });

  }
);