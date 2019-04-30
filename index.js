const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const sqlite3 = require("sqlite3");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  useNullAsDefault: true
};
const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post("/api/zoos", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Please provide a name for the zoo." });
  }
  db("zoos")
    .insert(req.body)
    .then(zoo => {
      res.status(201).json(zoo);
    })
    .catch(err => {
      res
        .status(400)
        .json({ error: "The zoo could not be saved to the database." });
    });
});

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(404).json({ error: "Could not find zoos." });
    });
});

server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id })
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(err => {
      res.status(404).json({ error: "Could not find that zoo." });
    });
});

server.delete("/api/zoos/:id", (req, res) => {});

server.put("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id })
    .update(req.body)
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
