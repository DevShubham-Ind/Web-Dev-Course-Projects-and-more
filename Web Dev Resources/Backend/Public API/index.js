import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const apiKey = "6064f1c3";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res)=> {
    res.render("index.ejs");
});

app.post("/search", async (req, res)=> {
    try {
        console.log("Title: ", req.body.title);
        console.log("Year: ", req.body.year);
        const result = await axios.get(`https://www.omdbapi.com/?t=${req.body.title}&apikey=${apiKey}`);
        console.log("Result 🚀----------\n", JSON.stringify(result.data));

        res.render("index.ejs", {data: result.data});
    } catch (error) {
        console.log("Error 🚫: ", error.message);
        res.render("index.ejs", {error : error.message});
    }
});

app.listen(port, ()=> {
    console.log(`Server listening to port ${port}`);
});