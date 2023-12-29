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
  let ids = [];
  let submitMethod;
  e.preventDefault();
  let checkboxValue;
  if (checkbox.checked) {
    checkboxValue = "on";
  } else {
    checkboxValue = "off";
  }
  let animal = {
    species: form.species.value,
    animalName: form.animalName.value,
    sound: form.sound.value,
    tail: checkboxValue,
  };
  for (i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      const dataId = row.getAttribute("data-id");
      ids.push(dataId);
    }
  }
  if (ids.length > 1) {
    alert("Invalid selection of animals");
    return;
  } else if (ids.length == 1) {
    submitMethod = "PUT";

    animal = {
      id: ids[0],
      species: form.species.value,
      animalName: form.animalName.value,
      sound: form.sound.value,
      tail: checkboxValue,
    };
  } else {
    submitMethod = "POST";
  }
  const request = new Request(url, {
    method: submitMethod,
    headers: {
      "content-type": "application/json",
    },

    body: JSON.stringify(animal),
  });
  fetch(request).then((response) => {
    form.reset();
    getData();
    if (submitMethod == "POST") {
      showToast(
        "creation",
        `successfully added the animal ${animal.animalName}`
      );
    } else {
      showToast(
        "update",
        `successfully updated the animal ${animal.animalName}`
      );
    }
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
    let bgColor;

    if (animal.tail == true) {
      tail = "Yes";
      bgColor = "#0dcaf0";
    } else {
      tail = "No";
      bgColor = "#dc3545";
    }
    tableContent += `
    <tr data-id="${animal.id}">
    <td class="tbId"><input type="checkbox" aria-label="Checkbox for following text input"></td>
    <td>${animal.species}</td>
    <td>${animal.animalName}</td>
    <td>${animal.sound}</td>
    <td style="background-color: ${bgColor}">${tail}</td>
  </tr>
  
  `;
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

      form.species.value = row.cells[1].textContent;
      form.animalName.value = row.cells[2].textContent;
      form.sound.value = row.cells[3].textContent;
      form.tail.value = row.cells[4].textContent;
      ids.push(dataId);
    }
  }
  if (ids.length != 1) {
    alert("Invalid selection of animals");
    return;
  }
});

btnSearch.addEventListener("click", (e) => {
  getData();
});

// Delete
btnDelete.addEventListener("click", (e) => {
  let ids = [];

  for (i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
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

  const request = new Request(url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(ids),
  });
  fetch(request).then((response) => {
    getData();
    showToast("delete", "successfully deleted the animal/s");
  });
});

function showToast(toastSmall, toastBody) {
  const toastLiveExample = document.getElementById("liveToast");

  document.getElementsByClassName("toast-small")[0].innerHTML = toastSmall;
  document.getElementsByClassName("toast-body")[0].innerHTML = toastBody;

  const toastBootstrap = new bootstrap.Toast(toastLiveExample, {
    autohide: false,
  });

  toastLiveExample.addEventListener("click", (e) => {
    const button = event.target.closest('button[data-bs-dismiss="toast"]');
    if (button) {
      toastBootstrap.hide();
    }
  });

  toastBootstrap.show();
}
