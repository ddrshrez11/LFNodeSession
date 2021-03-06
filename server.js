const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const fs = require("fs");
const validation = require("./validator");
const schema = require("./schema");

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

router.put(
    "/todos/:title",
    validation.validateBody(schema.updateTodoSchema),
    (req, res) => {
        let data = fs.readFileSync("./data.json");
        data = JSON.parse(data);
        let index = data.findIndex((i) => (i.title === req.params.title));
        console.log(index);
        if (index !== -1) {
            data[index].description = req.body.description;
            data[index].status = req.body.status;
            var newData = JSON.stringify(data);
            fs.writeFile("./data.json", newData, (err) => {
                if (err) throw err;
                console.log(`Todo ID: ${index} updated.`);
                res.status(200);
                res.json({ message: `Todo ID: ${index} updated.` });
            });
        } else{
            console.log("Bad Request");
            res.status(500);
            res.json({ message: "Bad Request" });
        }
    }
);

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "view/todo.html"));
});

app.use("/", router);

app.listen(port, () => {
    console.log(`server Running at port ${port}`);
});
