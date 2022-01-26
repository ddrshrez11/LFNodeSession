const express = require("express");
const { route } = require("express/lib/application");
const app = express();
const router = express.Router();
const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware
function test(req, res, next) {
    console.log("middleware");
    next();
}
app.use(test);

/*
CRUD
Create: POST
read:   GET
update: PUT
delete: DELETE
*/

router.get("/todos", (req, res) => {
    // const data = require("./data.json");
    let data = fs.readFileSync("./data.json");
    data = JSON.parse(data);
    res.status(200).send(data);
});

router.post("/todos", (req, res) => {
    // const data = require("./data.json");
    let data = fs.readFileSync("./data.json");
    data = JSON.parse(data);

    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;

    data.push({
        title: title,
        description: description,
        status: status,
    });

    var newData = JSON.stringify(data);

    fs.writeFile("./data.json", newData, (err) => {
        if (err) throw err;
        console.log("New Data Added");
    });
    res.redirect("/");
    // res.status(200).send(data);
});

router.delete("/todos/:id", (req, res) => {
    let data = fs.readFileSync("./data.json");
    data = JSON.parse(data);
    let removeIndex = req.params.id;
    // console.log(data);
    if (data[removeIndex]) {
        data.splice(removeIndex, 1);

        var newData = JSON.stringify(data);

        fs.writeFile("./data.json", newData, (err) => {
            if (err) throw err;
            console.log(`Index ${removeIndex} removed.`);
            res.status(200);
            res.json({ message: `Index ${removeIndex} removed.` });
        });
    } else {
        console.log(`Not Found`);
        res.status(400);
        res.json({ message: `Not Found` });
    }
});

router.put("/todos/:id", (req, res) => {
    let data = fs.readFileSync("./data.json");
    data = JSON.parse(data);
    let updateIndex = req.params.id;
    if (
        !req.body.title ||
        !req.body.description ||
        !req.body.status ||
        !data[updateIndex]
    ) {
        console.log("Bad Request");
        res.status(500);
        res.json({ message: "Bad Request" });
    } else {
        data[updateIndex] = {
            title: req.body.title || data[updateIndex].title,
            description: req.body.description || data[updateIndex].description,
            status: req.body.status || data[updateIndex].status,
        };
        var newData = JSON.stringify(data);

        fs.writeFile("./data.json", newData, (err) => {
            if (err) throw err;
            console.log(`Todo ID: ${updateIndex} updated.`);
            res.status(200);
            res.json({ message: `Todo ID: ${updateIndex} updated.` });
        });
    }
});

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "view/todo.html"));
});

app.use("/", router);

app.listen(port, () => {
    console.log(`server Running at port ${port}`);
});
