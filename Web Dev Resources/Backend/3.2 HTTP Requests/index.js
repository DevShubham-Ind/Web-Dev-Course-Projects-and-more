import express from "express"
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening ${port}`);
    console.log("Having fun with NODEMON");
})

app.get("/", (req, res) => {
    res.sendStatus(200);
    // res.send("<h1>Hello World whatsapp !!!</h1>/ working well done ....");
    // console.log("Express server listening on port %d", app.address().port)
    // console.log(req.rawHeaders);
    // res.send("<h1>Hello World whatsapp !!!</h1>");
});

app.post("/register", (req,res) => {
    res.sendStatus(201);
});

app.put("/usingPut", (req,res) => {
    res.sendStatus(200);
});

app.patch("/usingPatch", (req,res) => {
    res.sendStatus(203);
});

app.get("/about", (req, res) => {
    res.send("<h1>About </h1><h3>Phone No: 7385155051</h3>");
});