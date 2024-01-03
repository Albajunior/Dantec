// Vérification de l'existence d'un user dans le sessionStorage
if (sessionStorage.getItem("InfoUser")) {
  window.location.href = "index.html";
  console.log(" Info existe dans le sessionStorage");
}

document.getElementById("loginForm").addEventListener("click", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (validateEmail(email) && validatePassword(password)) {
    const bodyParameters = {
      email: email,
      password: password,
    };
    console.log(bodyParameters);

    // // Création de l'entête de la requête
    const options = {
      method: "POST",
      body: JSON.stringify(bodyParameters),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "POST",
      },
    };

    fetch("http://localhost:3000/api/auth/login", options)
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          const token = data.token;
          sessionStorage.setItem("InfoUser", JSON.stringify(data));
          sessionStorage.setItem("Token", JSON.stringify(token));
          console.log(sessionStorage.getItem("Token"));
          window.location.href = "index.html";
        } else {
          alert("Email ou Mot de Passe incorrect");
          console.log(data.error);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error);
        alert("Erreur lors de la connexion");
      });
  } else {
    alert("Veuiller bien remplir les 2 champs");
  }
});

function validateEmail(email) {
  // Expression régulière pour vérifier le format de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length > 0;
}
