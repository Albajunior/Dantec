auth.test.js;
const app = require("../app.js");
const { login } = require("./auth");
describe("Test de la fonction login", () => {
  test("Vérifie si la connexion fonctionne avec des identifiants ", async () => {
    const response = await request(login).post('/login');
    expect(response.status).toBe(201);
  });
  test("Vérifie si la connexion échoue avec des identifiants incorrects", () => {
    expect(login("utilisateur", "mdp")).toBe(false);
  });
});
