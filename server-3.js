const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const path = require("path");

const port = process.env.PORT || 3000;

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/login.html"));
});

router.post("/login", (req, res) => {
    const username = "un";
    const password = "pw";
    console.log(req.body.username, username, req.body.username === username);

    if (req.body.username === username && req.body.password === password) {
        console.log("success");
        res.send("success");
    } else {
        console.log("fail");
        res.send("fail");
    }

    // res.send("login success!");
    // console.log(req.body);
    // res.send(req.body);
});

router.get("/register", (req, res) => {
    res.send("trying to register!");
});
router.get("/logout", (req, res) => {
    res.send("trying to logout!");
});

app.use("/", router);

app.listen(port, () => {
    console.log(`server Running at port ${port}`);
});
