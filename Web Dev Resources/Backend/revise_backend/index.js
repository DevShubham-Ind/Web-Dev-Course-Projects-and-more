import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000; 

app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "\\index.html");
});

app.post("/check", (req, res)=>{
    // console.log(req.body)
    console.log(`Name : ${req.body.name} | Number : ${req.body.num}`);
    const nav = req.body.name;
    const no = req.body.num;
    res.send(`<span><strong>Name : </strong>${nav}</span> <span><strong>Number : </strong>${no}</span>`);
    // res.send('form submitted successfully')
})

app.listen(port, ()=>{
    console.log(`Server running on ${port}.`);
});