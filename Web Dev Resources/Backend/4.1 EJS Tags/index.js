import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const data = {
        title : "EJS Tags",
        second : new Date().getSeconds(),
        items : ["aamba", "chikku", "safarchnda"],
        htmlContent: "<em>This is some em text</em>", 
    };

    res.sendFile(__dirname + "/view/index.ejs", data);
})

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
})