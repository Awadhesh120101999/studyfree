const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const noResults = document.getElementById("noResults");

function searchSite() {
  const term = searchInput.value.trim().toLowerCase();
  const searchable = [...document.querySelectorAll(".resource-card, .video-card, .subject")];
  if (!term) {
    searchable.forEach(el => el.style.display = "");
    noResults.hidden = true;
    return;
  }
  let found = false;
  searchable.forEach(el => {
    const text = (el.innerText + " " + (el.dataset.search || "")).toLowerCase();
    const match = text.includes(term);
    el.style.display = match ? "" : "none";
    if (match) found = true;
  });
  noResults.hidden = found;
  if (found) document.getElementById("resources").scrollIntoView({behavior:"smooth"});
}

searchBtn.addEventListener("click", searchSite);
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") searchSite();
});

document.querySelectorAll(".subject").forEach(btn => {
  btn.addEventListener("click", () => {
    searchInput.value = btn.dataset.search.split(" ")[0];
    searchSite();
  });
});

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

document.getElementById("year").textContent = new Date().getFullYear();
