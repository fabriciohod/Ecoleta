const nunjucks = require("nunjucks");
const express = require("express");
const server = express();
const db = require("./database/db.js");

nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  return res.render("index.html");
});
server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});
server.post("/savepoint", (req, res) => {
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  const query = `
      INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
      ) VALUES (?,?,?,?,?,?,?);
  `;

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.send("Erro no cadastro!");
    }
    console.log("Cadastrdo com sucesso");
    console.log(this);
  }
  db.run(query, values, afterInsertData);
  return res.render("create-point.html", { saved: true });
});

server.get("/search", (req, res) => {
  const search = req.query.search;
  console.log(search)
  if (search == "") {
    return res.render("search-results.html", { total: 0 });
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    const total = rows.length;
    return res.render("search-results.html", { places: rows, total });
  });
});

server.listen(3000);
console.log("Server on in http://localhost:3000");
