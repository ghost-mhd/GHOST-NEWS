
const articles = [
  { id: 1, titre: "Premier article", contenu: "Bienvenue sur GHOST-NEWS224 !", date: "2026-11-10" },
  { id: 2, titre: "Deuxième article", contenu: "Mon blog prend forme.", date: "2026-11-10" }
];

const main = document.getElementById("main");   

const formulaire = document.getElementById("formulaire") ;

const titreInput = document.getElementById("titre-input");
const contenuInput = document.getElementById("contenu-input");


  
 
function afficherArticle(article) {
  const titre = document.createElement("h2")
titre.textContent = article.titre; 
const dates = document.createElement("p");
dates.className = "date";
dates.textContent = article.date;
const contenue = document.createElement("p");
contenue.textContent = article.contenu;
const bloc = document.createElement("article");
bloc.appendChild(titre);
bloc.appendChild(dates);
bloc.appendChild(contenue);
main.appendChild(bloc);
  
}

articles.forEach(afficherArticle);

formulaire.addEventListener("submit", function (event) {
  event.preventDefault();
  const titre = titreInput.value.trim();
const contenu = contenuInput.value.trim();

if (titre === "" || contenu === "") {
  return;
}
     const nouvelArticle = {
     id: articles.length + 1,
     titre: titre,
     contenu: contenu,
     date: new Date().toISOString().slice(0, 10)
   };
   articles.push(nouvelArticle);
   afficherArticle(nouvelArticle);
  formulaire.reset();
});
