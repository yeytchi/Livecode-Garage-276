const url = 'https://wagon-garage-api.herokuapp.com/johny/cars';
const listCars = document.querySelector(".cars-list");
const brand = document.querySelector("#brand");
const model = document.querySelector("#model");
const plate = document.querySelector("#plate");
const owner = document.querySelector("#owner");
const formToAdd = document.querySelector("#new-car");

// J'intègre le fetch dans une fonction pour la rappeler lorsqu'on ajoute une voiture
const fetchAllCars = () => {
  // On fetch l'API pour récupérer toutes les voitures
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      // On crée un élément HTML pour afficher les informations de chaque voiture
      data.forEach((car) => {
        const carCard = `<div class="card-product-infos card-product">
              <img src="https://media.ouest-france.fr/v1/pictures/41fffbfae734558d0bb5d61647e63234-alencon-le-garage-jojo-automobiles-passe-la-premiere.jpg?width=1260&height=712&focuspoint=50%2C25&cropresize=1&client_id=cmsfront&sign=73600be9d868b93f45c7d7e304313c4bfa3a117b9f0981029e78d06540e6ef82">
              <h2>${car.brand} - ${car.model}</h2>
              <p>${car.owner} - ${car.plate}</p>
            </div>`;
        // On insère chaque carte voiture dans la div listCars
        listCars.insertAdjacentHTML("beforeend", carCard);
      });
    });

// fin de ma fonction fetchAllCars
};
// J'appelle ma fonction au chargement de la page
fetchAllCars();

// On écoute l'événement 'sumbit' sur le formulaire
formToAdd.addEventListener('submit', (event) => {
  event.preventDefault();
  // On crée un objet voiture carToAdd avec les éléments du formulaire
  const carToAdd = {
    brand: brand.value,
    model: model.value,
    owner: owner.value,
    plate: plate.value
  };
  // On ajoute cette voiture sur l'API avec la méthode POST de fetch.
  fetch(url, {
    method: "POST",
    // C'EST ICI QUE TOUT A PLANTE !!!!
    // Il manquait les guillemets à "Content-Type"
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carToAdd)
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      // Ici j'efface le code HTML présent dans la div listCars
      listCars.innerHTML = "";
      // J'appelle la méthode get du début pour m'afficher la nouvelle liste
      // qui contient la voiture que je viens de créer (cf ligne 13)
      fetchAllCars();
      // Je réinitialise le formulaire
      formToAdd.reset();
    });
});
