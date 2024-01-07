//on recupere l'id stocker dans le lien
const idMedecin_url = window.location.search;
const urlParam = new URLSearchParams(idMedecin_url);
const idMedecin = urlParam.get("id");

const token = sessionStorage.getItem("Token");

if (!idMedecin || !token) {
  window.location.href = "connexion.html";
} else {
    
  console.log(idMedecin);

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  console.log(options);

  //getMedecin();

  const url = 'http://localhost:3000/api/auth/findOne/'; 
  findOneUser(url);
  async function findOneUser(url) {
    try {
      const response = await fetch(url +idMedecin, options);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
  
      const user = await response.json();

      if (user){
      console.log('Utilisateur trouvé :', user);
      console.log(user.medecin._id);

        let valueMedecin = [];
      let items = document.querySelector("#items2");

      valueMedecin =
        valueMedecin +
        `
        <div class="cart__order">
        <form method="post" class="cart__order__form">
          <div class="cart__order__form__question">
            <label for="firstName">Prénom: </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              pattern="^[a-zA-Z]{3,20}$"
              required
              value="${user.medecin.prenom}"
            />
            <p id="firstNameErrorMsg"></p>
          </div>
          <div class="cart__order__form__question">
            <label for="lastName">Nom: </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              pattern="^[a-zA-Z]{3,20}$"
              required
              value="${user.medecin.nom}"
            />
            <p id="lastNameErrorMsg"></p>
          </div>
          <div class="cart__order__form__question">
            <label for="telephone">Telephone: </label>
            <input
              type="text"
              name="telephone"
              id="telephone"
              pattern="^[0-9]{1,3}[a-zA-Z0-9 ]{10,50}$"
              required
              value="${user.medecin.telephone}"
            />
            <p id="telephoneErrorMsg"></p>
          </div>
          <div class="cart__order__form__question">
            <label for="sexe">Sexe: </label>
            <select id="sexe" name="sexe">
              <option value="F">Féminin</option>
              <option value="M">Masculin</option>
            </select>
            <p id="sexeErrorMsg"></p>
          </div>
          
          <div class="cart__order__form__question">
            <label for="specialite">Specialite: </label>
            <select id="specialite" name="sexe">
              <option value="gyneco">Gyneco</option>
              <option value="odontologie">Odontologie</option>
              <option value="pediatrie">Pédiatrie</option>
              <option value="cardiologie">Cardiologie</option>
              <option value="chirurgieInfantile">Chirurgie Infantile</option>
            </select>
            <p id="sexeErrorMsg"></p>
          </div>
          <div class="cart__order__form__question">
            <label for="email">Email: </label>
            <input type="email" name="email" id="email" required value="${user.medecin.email}" />
            <p id="emailErrorMsg"></p>
          </div>
          <div class="cart__order__form__question">
            <label for="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              required
            />
            <p id="passwordrrorMsg"></p>
          </div>

          <div class="cart__order__form__submit">
            <input id="btnEdit" type="submit" value="Modifier !" />
          </div>
        </form>
      </div>
     `;
      items.innerHTML = valueMedecin;

            //clique btn modifier
            document.getElementById('btnEdit').addEventListener('click', function (e){

              let firstName = document.querySelector('#firstName').value;
              let lastName = document.querySelector('#lastName').value;
              let telephone = document.querySelector('#telephone').value;
              let sexe = document.querySelector('#sexe').value;
              let specialite = document.querySelector('#specialite').value;
              let email = document.querySelector('#email').value;
              let password = document.getElementById("password").value;    
          
              e.preventDefault();
            
              const medecin = {
                    prenom: firstName,
                    nom: lastName,
                    telephone: telephone,
                    sexe: sexe,
                    specialite: specialite,
                    email: email,
                    password: password
              };
          
            // Création de l'entête de la requête
            const optionsEdit = {
                method: "PUT",
                body: JSON.stringify(medecin),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  'Authorization': 'Bearer ' +token,
                },
              };
              console.log(optionsEdit);
    
              editMedecin(idMedecin, optionsEdit);
          });    
      }
  
    } catch (error) {
      console.error('Erreur :', error.message);
      alert('Une erreur est survenue lors de la récupération des données');
    }
  }

  function getMedecin() {
    fetch("http://localhost:3000/api/auth/findOne/" + idMedecin, options)
    
      .then((response) => response.json()
      )
      .then((data) => {

        console.log(data);

      }).catch((erreur) => {
        alert("Error 404 ", erreur);
        // Recharge la page actuelle
        //location.reload();
      });
  }
}

async function findOneUser(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }

    const user = await response.json();
    console.log('Utilisateur trouvé :', user);
    // Affichage d'un message ou traitement des données de l'utilisateur trouvé

  } catch (error) {
    console.error('Erreur :', error.message);
    alert('Une erreur est survenue lors de la récupération des données');
  }
}

function editMedecin(idMedecin, optionsEdit) {
    fetch("http://localhost:3000/api/auth/update/" + idMedecin, optionsEdit)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(" User modifie avec succes");
        window.location.href = "gestion_medecin.html";
    })
    .catch((erreur) => {
      alert("Error 4044 ", erreur);
      // Recharge la page actuelle
      // location.reload();
    });

}
