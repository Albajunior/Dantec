// Vérification de l'existence d'un user dans le sessionStorage
if (sessionStorage.getItem("Token")) {
  if (sessionStorage.getItem("Admin")) {
    window.location.href = "index.html";
  } else {
    window.location.href = "profile.html";
  }
}

document.getElementById("loginForm").addEventListener("click", function (e) {
  e.preventDefault();

  let passwordrrorMsg = document.querySelector("#passwordrrorMsg");
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
          passwordrrorMsg.textContent = "";
          const token = data.token;
          sessionStorage.setItem("Token", JSON.stringify(token));
          if (data.user.email == "adminblood@gmail.com") {
            sessionStorage.setItem("Admin", JSON.stringify(data.user.email));
            window.location.href = "index.html";
          } else {
            sessionStorage.setItem("User", JSON.stringify(data.user.email));
            window.location.href = "profile.html";
          }
        } else {
          passwordrrorMsg.textContent =
            "Email ou Mot de Passe incorrect";
          passwordrrorMsg.style.color = "red";
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error);
        alert("Erreur Server");
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
