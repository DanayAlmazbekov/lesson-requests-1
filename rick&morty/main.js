const API = "https://rickandmortyapi.com/api/character";
// console.log(API);
let app = document.getElementById("app");
async function getCharacters() {
  let response = await fetch(API)
    .then(res => res.json())
    .catch(err => console.log(err));
  // console.log(response);
  response.results.forEach(item => {
    let newElem = document.createElement("div");
    newElem.innerText = item.name;
    newElem.className = "character";
    newElem.id = item.url;
    app.append(newElem);
  });
}
getCharacters();

let info = document.getElementById("info");
// console.log(info);
document.addEventListener("click", async function (e) {
  if (e.target.className === "character") {
    let response = await fetch(e.target.id)
      .then(res => res.json())
      .catch(err => console.log(err));

    info.innerHTML = `
    <div>Имя: ${response.name}</div>
    <div>Статус: ${response.status}</div>
    <div>Пол: ${response.gender}</div>
    <div>Вид: ${response.species}</div>
    <div>Серия: ${response.origin.name}</div>
    <div>Место: ${response.location.name}</div>
    <img src=${response.image} />
    `;
    // console.log(response);
  }
});
