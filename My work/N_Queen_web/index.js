import express from "express";
import bodyParser from "body-parser";
import cpp from "compile-run";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const outputpath = __dirname + "/view/index.ejs";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/view/index.html");
});

app.post("/check", (req, res) => {
    const codeinput = req.body["codeinput"];
    const filePath = __dirname + "/power.cpp"; // Adjust the path as needed

    // cpp.runFile(filePath, { stdin: codeinput }, (err, result) => { // Use runFile with a callback
    //     if (err) {
    //         console.error(err);
    //         res.status(500).send('Error occurred while running C++ code');
    //         return;
    //     }

    //     console.log(result.stdout);
    //     res.render(outputpath, { result: result.stdout });
    // });
    let resultPromise = cpp.runFile(filePath, { stdin: codeinput });
    resultPromise
        .then(result => {
            console.log(result);//result object
        })
        .catch(err => {
            console.log(err);
        });
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

