import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "root123",
  port: 5432
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  console.log("-- Request Register --");
  console.log("Email   : ", email);
  console.log("Password: ", password);

  try{
    const checkRegister = await db.query("SELECT email, password FROM users WHERE email=$1 AND password=$2", [email, password]);
    if(checkRegister.rows.length >0){
      res.send("Already Registered | Login to enter");
    }
    else{
      const result = await db.query("INSERT INTO users (email, password) VALUES($1, $2)", [email, password]);
      const response = result.rows[0];
      console.log(`\n-- Inserted: {response} ✅✅✅`);
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log("Error: ", err);
    res.render("register.ejs");
  }

});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  console.log("-- Request Login --");
  console.log("Email   : ", email);
  console.log("Password: ", password);
  
  try{
    const result = await db.query("SELECT email, password FROM users WHERE email=$1 AND password=$2", [email, password]);

    if(result.rows.length > 0){
      // const result = await db.query("SELECT email, password FROM users WHERE email=$1 AND password=$2", [email, password]);
      const response = result.rows[0];

      if(response.email == email && response.password == password){
        console.log("\nRegisteration Found ✅✅✅");
        res.render("secrets.ejs");
      }
      else{
        console.log("Result: ", response);
        res.render("login.ejs");
      }
    }
    else{
      res.send("Register First to enter");
    }
  } catch (err) {
    console.log("Error: ", err);
    res.render("register.ejs");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
