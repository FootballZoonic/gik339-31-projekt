console.log("Group 31 quality");

const url = "http://localhost:3000/animals";
const btnSubmit = document.getElementById("btnSubmit");
const btnSearch = document.getElementById("btnSearch");
const btnUpdate = document.getElementById("btnUpdate");
const btnDelete = document.getElementById("btnDelete");

const form = document.getElementById("form");
const table = document.getElementById("table");
const checkbox = document.getElementById("tail")

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const animal = {
    species: form.species.value,
    animalName: form.animalName.value,
    weight: form.weight.value,
    sound: form.sound.value,
    tail: form.tail.value,
  };
  console.log(animal);

  const request = new Request(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(animal),
  });
  fetch(request).then((response) => {
    console.log(response);
    form.reset();
  });
}

async function getPromise() {
  const res = await fetch("http://localhost:3000/animals");
  return res.json();
}

//console.log(getPromise())

async function getData() {
  const animals = await getPromise();

  animals.forEach((animal) => {
    const row = document.createElement("tr");

    row.innerHTML = `
          <td class="tbId"><input type="checkbox" aria-label="Checkbox for following text input"></td>
          <td>${animal.id}</td>
          <td>${animal.species}</td>
          <td>${animal.animalName}</td>
          <td>${animal.weight}</td>
          <td>${animal.sound}</td>
          <td>${animal.tail}</td>
        `;
    table.appendChild(row);
  });
}

btnSubmit.addEventListener("submit", (e) => console.log("submit"));
btnSearch.addEventListener("click", (e) => console.log("search"));
btnUpdate.addEventListener("click", (e) => console.log("update"));

btnDelete.addEventListener("click", (e) => {
  let ids = [];

  const tdElements = document.getElementsByClassName("tbId");

  for (let i = 0; i < tdElements.length; i++) {
    const checkbox = tdElements[i].querySelector('input[type="checkbox"]');

    if (checkbox && checkbox.checked) {
      const nextSibling = tdElements[i].nextElementSibling;
      console.log(checkbox.value);
      console.log(nextSibling.innerText);
      ids.push(nextSibling.innerText);
    }
  }
  console.log(ids);

  const request = new Request(url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(ids),
  });
  fetch(request).then((response) => {
    console.log(response);
    form.reset();
  });
});

getData();
