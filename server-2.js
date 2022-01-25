const http = require("http");
const dt = require("./dateTime");
// const url = require("url");
const fs = require("fs");

const port = process.env.PORT || 3000;
//$env:PORT=5000; npm start //in windows
//PORT=5555 npm start //in linux
const server = http.createServer((req, res) => {
    // console.log(req.url);
    // const test = url.parse(req.url).query;
    // console.log(test);

    fs.readFile("login.html", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        console.log(err);
        return res.end();
    });
    // res.writeHead(200, { "Content-Type": "application/json" });
    // // res.write("<h1>Hello World</h1>");
    // res.write(JSON.stringify("Success!"));
    // res.end();
});

server.listen(port, () => {
    console.log(dt.myDateTime());
    console.log(`server Running at port ${port}`);
});
