document.addEventListener('DOMContentLoaded', () => {
  loadImages();
  loadBreed();
})

function loadImages(){
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  fetch(imgUrl)
  .then((res) => res.json())
  .then((show) => {
    show.message.forEach(element => {
      addImg(element);
    });
  })
}

function addImg(url) {
  const dogContainer = document.getElementById('dog-image-container');
  const images = document.createElement('img');
  images.src = url;
  dogContainer.appendChild(images);
}

let breeds = [];

function loadBreed(){
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  fetch(breedUrl)
  .then((res) => res.json())
  .then((show) => {
    breeds = Object.keys(show.message)
    updateBreeds(breeds);
    breedListener();
  })
}

function addBreed(name){
  let ul = document.getElementById('dog-breeds');
  let li = document.createElement('li');
  li.innerText = name;
  ul.appendChild(li);
  li.addEventListener('click', changeColor);
}

function updateBreeds(breeds) {
  let ul = document.getElementById('dog-breeds');
  removeChild(ul);
  breeds.forEach((breed) => addBreed(breed))
}

function removeChild(event){
  let ulChild = event.lastElementChild;
  while(ulChild){
    event.removeChild(ulChild);
    ulChild = event.lastElementChild;
  }
}

function changeColor(e){
  e.target.style.color = 'green';
}

function filterBreeds(event){
  updateBreeds(breeds.filter((breed) => breed.startsWith(event)));
}

function breedListener(){
  let dropdown = document.getElementById('breed-dropdown');
  dropdown.addEventListener('change', (event) => {
    filterBreeds(event.target.value);
  })
}
