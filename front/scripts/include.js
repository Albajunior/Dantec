let header = document.querySelector("#header");

if(header){
header.innerHTML = 
`
<header>
<div class="limitedWidthBlockContainer informations">
  <div class="limitedWidthBlock">
    <ul>
      <li>
        <img
          src="../images/icons/phone.svg"
          alt="logo de téléphone"
          class="informations__phone"
        />33 823 58 96 
      </li>
      <li>
        <img
          src="../images/icons/mail.svg"
          alt="logo d'une enveloppe"
          class="informations__mail"
        />contact@dantecblood.com
      </li>
      <li>
        <img
          src="../images/icons/adress.svg"
          alt="logo d'un point de géolocalisation"
          class="informations__address"
        />Dakar - Plateau
      </li>
    </ul>
  </div>
</div>
<div class="limitedWidthBlockContainer menu">
  <div class="limitedWidthBlock">
    <a href="./index.html">
      <img
        class="logo"
        src="../images/logo.png"
        alt="Logo de l'entreprise"
      />
    </a>
    <nav>
      <ul>
        <a href="./index.html"><li>Accueil</li></a>
        <a href="./connexion.html" id="deconnexion"
          ><li>Deconnexion</li></a
        >
      </ul>
    </nav>
  </div>
</div>
</header>
`;
};


let footer = document.querySelector("#footer");

footer.innerHTML =
`
<footer>
<div class="limitedWidthBlockContainer footerMain">
  <div class="limitedWidthBlock">
    <div>
      <img
        class="logo"
        src="../images/logo.png"
        alt="Logo de l'entreprise"
      />
    </div>
    <div>
      <p> Rue Place 79, Dakar, Senegal</p>
    </div>
    <div>
      <p>Téléphone : 33 823 58 96  </p>
    </div>
    <div>
      <p>Email : contact@dantecblood.com</p>
    </div>
  </div>
</div>
<div class="limitedWidthBlockContainer footerSecondary">
  <div class="limitedWidthBlock">
    <p>
      © Copyright 2023 - 2040 | Dantec-Blood by G_Digital | All
      Rights Reserved | Powered by <3
    </p>
  </div>
</div>
</footer>
`;

document.getElementById("deconnexion").addEventListener("click", function (e) {  
    sessionStorage.clear('Token');
});