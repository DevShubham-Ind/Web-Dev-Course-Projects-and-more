import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "root123",
  port: 5432
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let countries = [];

app.get("/", async (req, res) => {
  //Write your code here.
  try {
    const result = await db.query("SELECT * FROM visited_countries");

    result.rows.forEach((country)=>{
      countries.push(country.country_code);
    });

    res.render("index.ejs", {countries: countries, total: countries.length});

    // const countryCodeArray = result.rows.map(row => row.country_code);
    // const countries = countryCodeArray.join(',');

    // console.log("\nCountries: ",countries);
    // console.log("Length: ", countryCodeArray.length);

    // res.render("index.ejs", {countries: countries, total: countryCodeArray.length});
  } catch (err) {
    console.log("Error executing query | ", err.stack);
    res.status(500).send("Error Retriving data");
  }
});

app.post("/add", async (req, res)=>{
  const newCountry = req.body.country;
  console.log("Country: ", newCountry);

  const result = await db.query("SELECT country_code FROM countries WHERE country_name = $1", [newCountry]);
  const newCode = result.rows[0].country_code;

  console.log("Code : ", newCode);
  countries.push(newCode);
  console.log("Countries: ", countries);

  res.render("index.ejs", {countries: countries, total: countries.length});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
