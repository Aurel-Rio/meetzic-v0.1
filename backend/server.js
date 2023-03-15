// Importation des modules nécessaires
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const LoginForm = require("./frontend/components/LoginForm").default;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  const form = ReactDOMServer.renderToString(React.createElement(LoginForm));
  const html = `
    <html>
      <head>
        <title>Page de connexion</title>
      </head>
      <body>
        <div id="root">${form}</div>
        <script src="/app.js"></script>
      </body>
    </html>
  `;
  res.send(html);
});
// Déclaration de la route d'authentification
app.post("/auth", function (req, res) {
  // Récupération des données du formulaire d'authentification
  const email = req.body.email;
  const password = req.body.password;

  // Vérification de l'adresse email et du mot de passe
  if (email === "example@gmail.com" && password === "123456") {
    // Redirection vers la page de succès si l'authentification est réussie
    res.redirect("/success");
  } else {
    // Redirection vers la page d'erreur si l'authentification a échoué
    res.redirect("/error");
  }
});

// Déclaration de la page de succès
app.get("/success", function (req, res) {
  // Renvoi de la réponse
  res.send("Authentification réussie !");
});

// Déclaration de la page d'erreur
app.get("/error", function (req, res) {
  // Renvoi de la réponse
  res.send("Erreur d'authentification !");
});

// Fonction pour écouter les requêtes sur un port donné
function listen(port) {
  app.listen(port, function () {
    console.log("Serveur en écoute sur le port " + port);
  }).on("error", function (err) {
    // Si le port est déjà utilisé, on incrémente le numéro de port et on réessaie
    if (err.errno === "EADDRINUSE") {
      console.log("Port " + port + " déjà utilisé, tentative de connexion sur le port " + (port + 1));
      listen(port + 1);
    } else {
      console.log(err);
    }
  });
}

// Lancement du serveur sur le port 3000
listen(3000);