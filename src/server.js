const nunjucks = require("nunjucks");
const express = require("express");
const server = express();
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server.use(express.static("public"));

server.get("/", (req, res) => {
  return res.render("index.html");
});
server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});
server.get("/search", (req, res) => {
  return res.render("search-results.html");
});

server.listen(3000);
console.log("Server on in http://localhost:3000");
