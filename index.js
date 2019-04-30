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
server.post("/api/zoos", (req, res) => {});

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(400).json({ error: "Could not find zoos." });
    });
});

server.get("/api/zoos/:id", (req, res) => {});

server.delete("/api/zoos/:id", (req, res) => {});

server.put("/api/zoos/:id", (req, res) => {});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
