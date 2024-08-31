const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/morpheus", (req, res) => res.send("Tamo no a, ihuuuuuuuuul"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;