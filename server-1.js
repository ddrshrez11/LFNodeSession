const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hi!");
});

app.listen(3200, () => console.log("Server ready"));
