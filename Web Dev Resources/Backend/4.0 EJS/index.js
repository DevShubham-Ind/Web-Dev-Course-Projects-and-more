import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const outputpath = __dirname + "/view/index.ejs";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/submit", (req, res) => {
    // const name = req.body[name];
    console.log(req.body);
    res.render(outputpath, 
    // {name : "AdiShubh"} 
    {name : req.body["name"]} 
    );
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})