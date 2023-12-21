const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

server = express();

server.listen(3000, () => console.log("Server running"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json()); // Parse JSON bodies
server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

const db = new sqlite3.Database("./animals.db");

// delete

server.delete("/animals", (req, res) => {
  ids = req.body;

  ids.forEach(id => {
    deleteAnimal(id);
  });
  res.send(ids);
});
// create
server.post("/animals", (req, res) => {
  const { species, animalName, weight, sound, tail } = req.body;
  console.log(req.body);
  const convertedTail = tail === "on" ? true : false;
  createAnimal(species, animalName, weight, sound, convertedTail);
  res.send(species);
});

// read
server.get("/animals", (req, res) => {
  const sql = "SELECT * FROM animals";

  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows);
    }
  });
});

// update

server.put("/animals", (req, res) => {
  const { id, species, animalName, weight, sound, tail } = req.body;
  updateAnimal(id, species, animalName, weight, sound, tail);
  res.send(id);
});

// database functions
function updateAnimal(id, species, animalName, weight, sound, tail) {
  const updateQuery = `
    UPDATE animals
    SET species = ${species}, animalName = ${animalName}, weight = ${weight}, sound = ${sound}, tail = ${tail}
    WHERE id = ${id};
  `;

  // kör query
  db.run(updateQuery, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`updated animal with id: ${id}`);
    }
  });
}

function createAnimal(species, animalName, weight, sound, tail) {
  const insertQuery = `
    INSERT INTO animals (species, animalName, weight, sound, tail)
    VALUES ('${species}', '${animalName}', ${weight}, '${sound}', ${tail});
  `;

  // kör query
  db.run(insertQuery, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${animalName} inserted!`);
    }
  });
}

function createDatabase() {
  // skapa databas
  // definiera tabell
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS animals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    species TEXT NOT NULL,
    animalName TEXT NOT NULL,
    weight INTEGER NOT NULL,
    sound TEXT NOT NULL,
    tail BOOLEAN NOT NULL
  );
`;
  // kör query
  db.run(createTableQuery, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("table created!");
    }
  });
}

function deleteAnimal(id) {
  const removeAnimalQuery = `DELETE FROM animals WHERE id = ${id}`;

  db.run(removeAnimalQuery, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`animal with id: ${id} was removed!`);
    }
  });
}
