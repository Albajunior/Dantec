//on recupere l'id stocker dans le lien
const idBon_url = window.location.search;
const urlParam = new URLSearchParams(idBon_url);
const idBon = urlParam.get("id");

const token = sessionStorage.getItem("Token");
const token2 = token.slice(0);

console.log(token2);

if (!idBon || !token) {
  window.location.href = "connexion.html";
} else {
  console.log(idBon);
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  console.log(options);

  getBon();

  function getBon() {
    fetch("http://localhost:3000/api/bon/findOne/" + idBon, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.bon_Cmd._id);

        let items = document.querySelector("#items2");

        items.innerHTML=
          `
    <section class="cart">
    <div class="cart__order">
      <form method="post" class="cart__order__form">
        <div class="cart__order__form__question">
          <label for="NomPatient">Nom : </label>
          <input
            type="text"
            name="NomPatient"
            id="NomPatient"
            pattern="^[a-zA-Z]{3,20}$"
            required
            value="${data.bon_Cmd.NomPatient}"
          />
          <p id="NomPatientErrorMsg"></p>
        </div>
        <div class="cart__order__form__question">
          <label for="Prenom">Nom: </label>
          <input
            type="text"
            name="PrenomPatient"
            id="PrenomPatient"
            pattern="^[a-zA-Z]{3,20}$"
            required
            value="${data.bon_Cmd.PrenomPatient}"
          />
          <p id="PrenomPatientErrorMsg"></p>
        </div>
    
        <div class="cart__order__form__question">
          <label for="sexe">Sexe: </label>
          <select id="sexe" name="sexe" >
            <option value=""></option>
            <option value="F">Féminin</option>
            <option value="M">Masculin</option>
          </select>
          <p id="sexeErrorMsg"></p>
        </div>

        <div class="cart__order__form__question">
          <label for="service">Service Demandeur: </label>
          <select id="service" name="service">
            <option value=""> </option>
            <option value="Generaliste">Generaliste</option>
            <option value="AAAAA">AAAAA</option>
            <option value="MMMM">MMMM</option>
          </select>
          <p id="serviceeErrorMsg"></p>
        </div>

        <div class="cart__order__form__question">
          <label for="groupe_Sanguin">Groupe_Sanguin: </label>
          <input type="groupe_Sanguin" name="groupe_Sanguin" id="groupe_Sanguin" required value="${data.bon_Cmd.Groupe_Sanguin}"/>
          <p id="groupe_SanguinErrorMsg"></p>
        </div>

        <div class="cart__order__form__question">
          <label for="degres_urgence">Degres d'urgence: </label>
          <input
            type="degres_urgence"
            name="degres_urgence"
            id="degres_urgence"
            required
            value="${data.bon_Cmd.Degres_urgence}"
          />
          <p id="degres_urgencerrorMsg"></p>
        </div>

        <div class="cart__order__form__question">
            <label for="nombre_Poche">Nombre de Poche: </label>
            <input type="nombre_Poche" name="nombre_Poche"
             id="nombre_Poche" required
             value="${data.bon_Cmd.Nombre_Poche}" />
            <p id="nombre_PocheErrorMsg"></p>
        </div>

        <div class="cart__order__form__question">
            <label for="numero_Salle">numero Salle Patient: </label>
            <input type="numero_Salle" name="numero_Salle" 
            id="numero_Salle" required 
            value="${data.bon_Cmd.Numero_Salle}" />
            <p id="numero_SalleErrorMsg"></p>
        </div>

        <div class="cart__order__form__submit">
          <input id="btnEdit" type="submit" value=" Modifier !" />
        </div>
      </form>
    </div>
  </section>
    `;

        //clique btn modifier
        document.getElementById('btnEdit').addEventListener('click', function (e){

            let NomPatient = document.querySelector('#NomPatient').value;
            let PrenomPatient = document.querySelector('#PrenomPatient').value;
            let sexe = document.querySelector('#sexe').value;
            let service = document.querySelector('#service').value;
            let groupe_Sanguin = document.querySelector('#groupe_Sanguin').value;
            let degres_urgence = document.getElementById("degres_urgence").value;
            let nombre_Poche = document.querySelector('#nombre_Poche').value;
            let numero_Salle = document.querySelector('#numero_Salle').value;      
        
            e.preventDefault();
                     
            const Bon = {
                  NomPatient: NomPatient,
                  PrenomPatient: PrenomPatient,
                  sexe: sexe,
                  Service: service,
                  Groupe_Sanguin: groupe_Sanguin,
                  Degres_urgence: degres_urgence,
                  Nombre_Poche: nombre_Poche,
                  Numero_Salle: numero_Salle,
                  createDate: new Date()
            };
          //   console.log(medecin);
        
             // // Création de l'entête de la requête
          const optionsEdit = {
              method: "PUT",
              body: JSON.stringify(Bon),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' +token,
              },
            };
            console.log(optionsEdit);

            editbon(idBon, optionsEdit);
        });


      })
      .catch((error) => {
        alert("Error 404 ", error);
        // Recharge la page actuelle
        // location.reload();
      });
  }
}


function editbon(idBon, optionsEdit) {
    fetch("http://localhost:3000/api/bon/update/" + idBon, optionsEdit)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(" Bon Cmd modifie avec succes");
        window.location.href = "allbon.html";
    })
    .catch((error) => {
      alert("Error 404 ", error);
      // Recharge la page actuelle
      // location.reload();
    });

}