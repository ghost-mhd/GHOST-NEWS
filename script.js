const SUPABASE_URL = "https://mescevouincapisgvxus.supabase.co";
const SUPABASE_KEY = "sb_publishable_aQ7uZq1ycrc4A_z26UfCmQ_5aPzicI-";
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const main = document.getElementById("main");
const formulaire = document.getElementById("formulaire");
const titreInput = document.getElementById("titre-input");
const contenuInput = document.getElementById("contenu-input");

function afficherArticle(article) {
  const titre = document.createElement("h2");
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

async function chargerArticles() {
  const { data, error } = await client
    .from("articles")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    main.textContent = "Impossible de charger les articles.";
    console.error(error);
    return;
  }
  data.forEach(afficherArticle);
}

chargerArticles();

formulaire.addEventListener("submit", async function (event) {
  event.preventDefault();
  const titre = titreInput.value.trim();
  const contenu = contenuInput.value.trim();
  if (titre === "" || contenu === "") return;

  const { data, error } = await client
    .from("articles")
    .insert({ titre, contenu })
    .select()
    .single();

  if (error) {
    alert("Publication refusée :" + error.message );
    return;
  }
  afficherArticle(data);
  formulaire.reset();
});
