let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
//----------------------------------------------------



function renderOneToy(toy) {
  //Build card
  let card = document.createElement("div")
  card.className = "card"
  card.innerHTML =
  `
  <h2>${toy.name}</h2>
    <img src = "${toy.image}" class = "toy-avatar"/>
      <p>${toy.likes} Like(s)</p>
  `
  let toyLike = document.createElement("button")
  toyLike.id = toy.id
  toyLike.className = "like-btn"
  toyLike.innerText = "Like"

  card.append(toyLike)

  //handles like increment
  const toyObj = toy

  toyLike.addEventListener("click", function(e) {
    e.preventDefault()
    toyObj.likes += 1
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: 'PATCH',
      headers: 
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'likes': toyObj.likes
      })
    })
    .then(response => response.json())
    .then(data => e.target.previousElementSibling.innerText = `${data.likes} Like(s)`)
  })
  //handles like increments

  //Add card to DOM
  document.querySelector("#toy-collection").append(card)
}

//Initial Render
function initialize() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => toys.forEach(toy => renderOneToy(toy)))
}
initialize()
//Initial Render

const newToyButton = document.querySelector(".add-toy-form")

newToyButton.addEventListener("submit", function(e) {
  e.preventDefault()

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": e.target.name.value,
      "image": e.target.image.value,
      "likes": 0
    })
  })
   .then(response => response.json())
   .then(response => renderOneToy(response))
})

//likeFunction