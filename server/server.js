const express = require("express");
const sqlite3 = require("sqlite3").verbose();

server = express();

server.listen(3000, () => console.log("Server running"));

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

function createAnimal(species, name, weight, sound, tail)
{
    const insertQuery = `
    INSERT INTO animals (species, name, weight, sound, tail)
    VALUES ('${species}', '${name}', ${weight}, '${sound}', ${tail});
  `;

        // kör query
    db.run(insertQuery, (err) => {
        if (err) {
        console.log(err);
        } else {
        console.log(`${name} inserted!`);
        }
    });
}



function createDatabase() {// skapa databas
  // definiera tabell
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS animals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    species TEXT NOT NULL,
    name TEXT NOT NULL,
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



function createLion() {
  // skicka in exempel djur
  const insertAnimalQuery = `
  INSERT INTO animals (species, name, weight, sound, tail)
  VALUES ('Lion', 'Leo', 40000, 'Roar', true);
`;


// kör query
  db.run(insertAnimalQuery, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("lion inserted");
    }
  });
}
