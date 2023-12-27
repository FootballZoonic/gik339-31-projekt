console.log("Group 31 quality");

const url = "http://localhost:3000/animals";
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
    getData();
    showToast("creation",`successfully added the animal ${animal.animalName}`);
  });
}

async function getPromise() {
  const res = await fetch("http://localhost:3000/animals");
  return res.json();
}

async function getData() {
  const animals = await getPromise();

  let tableContent = "";

  animals.forEach((animal) => {
    let tail;

    if (animal.tail == true) {
      tail = "Yes";
    } else {
      tail = "No";
    }
    tableContent += `
        <tr data-id="${animal.id}">
          <td class="tbId"><input type="checkbox" aria-label="Checkbox for following text input"></td>
          <td>${animal.species}</td>
          <td>${animal.animalName}</td>
          <td>${animal.sound}</td>
          <td>${tail}</td>
        </tr>`;
  });

  table.innerHTML = tableContent;
}

// update
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
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      const dataId = row.getAttribute("data-id");
      ids.push(dataId);
    }
  }
  if (ids.length != 1) {
    alert("Invalid selection of animals");
    return;
  }
  const animal = {
    id: ids[0],
    species: form.species.value,
    animalName: form.animalName.value,
    sound: form.sound.value,
    tail: checkboxValue,
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
    getData();
    showToast("update","fetched update");
  });
});

btnSearch.addEventListener("click", (e) => {
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
  if (ids.length < 1) {
    alert("Invalid selection of animals");
    return;
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
    getData();
    showToast("delete","successfully deleted the animal/s");
  });
});

function showToast(toastSmall, toastBody)
{
  const toastLiveExample = document.getElementById("liveToast");

  document.getElementsByClassName("toast-small")[0].innerHTML = toastSmall;
  document.getElementsByClassName("toast-body")[0].innerHTML = toastBody; 
  
  const toastBootstrap = new bootstrap.Toast(toastLiveExample, {
    autohide: false, // Set autohide option to false during toast initialization
  });

  toastLiveExample.addEventListener("click", (e) => {
    const button = event.target.closest('button[data-bs-dismiss="toast"]');
    if (button) {
      toastBootstrap.hide();
    }
  });

  toastBootstrap.show();
}