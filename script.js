import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://mescevouincapisgvxus.supabase.co";
const SUPABASE_KEY = "sb_publishable_aQ7uZq1ycrc4A_z26UfCmQ_5aPzicI-";
const client = createClient(SUPABASE_URL, SUPABASE_KEY);

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
  const div = document.createElement("div");
  div.className = "actions"
  const boutton = document.createElement("button");
  bloc.appendChild(titre);
  bloc.appendChild(dates);
    bloc.appendChild(contenue);
  boutton.textContent = "Supprimer";
  boutton.addEventListener("click", async function () {
    if(!confirm("Supprimer cet article ?")) {
      return;
    }
  const { data, error } = await client
.from("articles")
.delete()
.eq("id", article.id)
.select();
if(error || data.length === 0) {
alert("Suppression refussee")
return;
}
bloc.remove();

});
    div.appendChild(boutton);
  bloc.appendChild(div);
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
    alert("Publication refusée : vérifie que tu es connecté");
    return;
  }
  afficherArticle(data);
  formulaire.reset();
});
 
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email-input");
const mdpInput = document.getElementById("mdp-input");
const logoutBtn = document.getElementById("logout-btn");

function majAffichage(session) {
  const connecte = session !== null;
  loginForm.hidden = connecte;
  formulaire.hidden = !connecte;
  logoutBtn.hidden = !connecte;
  document.body.classList.toggle("admin", connecte);
}

client.auth.getSession().then(({ data }) => majAffichage(data.session));
client.auth.onAuthStateChange((event, session) => majAffichage(session));

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const { error } = await client.auth.signInWithPassword({
    email: emailInput.value.trim(),
    password: mdpInput.value
  });
  if (error) {
    alert("Connexion refusée :" + error.message);
    return;
  }
  loginForm.reset();
});

logoutBtn.addEventListener("click", async function () {
  await client.auth.signOut();
});
