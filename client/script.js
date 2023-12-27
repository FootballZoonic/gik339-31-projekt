console.log("Group 31 quality");

const url = "http://localhost:3000/animals";
const btnSubmit = document.getElementById("btnSubmit");
const btnSearch = document.getElementById("btnSearch");
const btnUpdate = document.getElementById("btnUpdate");
const btnDelete = document.getElementById("btnDelete");

const form = document.getElementById("form");
const table = document.getElementById("table");
const checkbox = document.getElementById("tail");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  let checkboxValue;
  if (checkbox.checked) {
    checkboxValue = "on";
  } else {
    checkboxValue = "off";
  }
  console.log(checkboxValue);
  const animal = {
    species: form.species.value,
    animalName: form.animalName.value,
    sound: form.sound.value,
    tail: checkboxValue,
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

    let tableContent = '';
  
    animals.forEach((animal) => {
      tableContent += `
        <tr data-id="${animal.id}">
          <td class="tbId"><input type="checkbox" aria-label="Checkbox for following text input"></td>
          <td>${animal.species}</td>
          <td>${animal.animalName}</td>
          <td>${animal.sound}</td>
          <td>${animal.tail}</td>
        </tr>`;
    });
  
    table.innerHTML = tableContent; 
  }
  

  /* animals.forEach((animal) => {
    const row = document.createElement("tr");
    row.setAttribute("data-id", animal.id);
    row.className("row")

    row.innerHTML = `
          <td class="tbId"><input type="checkbox" aria-label="Checkbox for following text input"></td>
          <td>${animal.species}</td>
          <td>${animal.animalName}</td>
          <td>${animal.sound}</td>
          <td>${animal.tail}</td>
        `;
    table.appendChild(row);
  }); */
//}

//btnSubmit.addEventListener("submit", (e) => console.log("submit"));

btnUpdate.addEventListener("click", (e) => {
  let ids = [];
  let checkboxValue;
  if (checkbox.checked) {
    checkboxValue = "on";
  } else {
    checkboxValue = "off";
  }
  for (i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    //console.log(`Row ${i + 1}:`, row);
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      const dataId = row.getAttribute("data-id");
      ids.push(dataId);
    }
  }
  if (ids.length != 1)
  {
    alert("Ogiltig selektion av användare.");
    return;
  }
  const animal = {
    id: ids[0],
    species: form.species.value,
    animalName: form.animalName.value,
    sound: form.sound.value,
    tail: checkboxValue
  };

  const request = new Request(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(animal),
  });
  fetch(request).then((response) => {
    console.log(response);
    form.reset();
  });
});

btnSearch.addEventListener("click", async (e) => {
  const tbody = table.getElementsByTagName('tbody')[0];
  //tbody.innerHTML = '';
  getData();
});

btnDelete.addEventListener("click", (e) => {
  let ids = [];

  for (i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    console.log(`Row ${i + 1}:`, row);
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      const dataId = row.getAttribute("data-id");
      ids.push(dataId);
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



document.addEventListener("DOMContentLoaded", function () {
  const toastTrigger = document.getElementById("btnDelete");
  const toastLiveExample = document.getElementById("liveToast");

  if (toastTrigger && toastLiveExample) {
    const toastBootstrap = new bootstrap.Toast(toastLiveExample, {
      autohide: false, // Set autohide option to false during toast initialization
    });

    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });

    toastLiveExample.addEventListener("click", (e) => {
      const button = event.target.closest('button[data-bs-dismiss="toast"]');
      if (button) {
        toastBootstrap.hide();
      }
    });
  }
});
