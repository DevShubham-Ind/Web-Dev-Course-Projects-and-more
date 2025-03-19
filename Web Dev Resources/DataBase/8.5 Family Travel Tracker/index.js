import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "root123",
  port: 5432,
});
db.connect();

function printDivider(req, res, next) {
  console.log("------------------------");
  next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(printDivider);

let currentUserId = 1;

// let users = [
//   { id: 1, name: "Angela", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];

const fetchUsers = async ()=> {
  try {
    const result = await db.query("SELECT id, name, color FROM users;");
    return result.rows;
  } catch (err) {
    console.error("Error fetching users: ", err);
    return [];
  }
};

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1", [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const users = await fetchUsers();
  const currentUser = users.find(user => user.id === currentUserId);
  
  console.log("Curr ID  :", typeof(currentUserId));
  console.log("Curr User: ", currentUser); 
  console.log("Curr Color: ", currentUser.color); 
  console.log("Curr Countries: ", countries);

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser ? currentUser.color : "white",
    // color: (users.find(user => user.id === currentUserId)).color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  if(req.body.add){
    console.log("Request for adding new user");
    res.render("new.ejs");
  }
  else if(req.body.user) {
    console.log("Request for user : ", req.body.user);
    currentUserId = parseInt(req.body.user);
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  try {
    console.log("New Add Req: ", req.body);

    const insertion_result = await db.query(
      "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id;",
      [req.body.name, req.body.color]
    );
    console.log("Inserted ID: ", insertion_result.rows[0].id);
    res.redirect("/");
  } catch (err) {
    console.log("Error zala: ", err);
  }
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
