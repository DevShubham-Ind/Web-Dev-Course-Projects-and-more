import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

app.post("/submit", (req, res)=> {
    console.log("Form received by Server");

    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    const data = {
        content: req.body.content,
        topic: req.body.topic, // Ensure this matches the client-side key
        name: req.body.name,
        fullDate: days[today.getDay()] + `, ` + today.getDate() + `/` + (today.getMonth() + 1) + `/` + today.getFullYear() + ` ` + time // Correct date format
    };

    console.log(`Topic : ${data.topic}`);
    console.log(`Name : ${data.name}`);
    res.json(data);
});

app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});