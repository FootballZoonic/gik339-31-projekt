console.log("Group 31 quality");

let form = document.getElementsByClassName("row");

const btnSubmit = document.getElementById("btnSubmit");
const btnSearch = document.getElementById("btnSearch");
const btnUpdate = document.getElementById("btnUpdate");
const btnDelete = document.getElementById("btnDelete");

btnSubmit.addEventListener('click', (e) => console.log("submit"));
btnSearch.addEventListener('click', (e) => console.log("search"));
btnUpdate.addEventListener('click', (e) => console.log("update"));
btnDelete.addEventListener('click', (e) => console.log("delete"));
