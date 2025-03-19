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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];

const fetchItems = async ()=> {
  try {
    const result = await db.query("SELECT * FROM items");
    return result.rows;
  } catch (err) {
    console.err("Error : ", err);
    return [];
  }
}

app.get("/", async (req, res) => {
  const items = await fetchItems();
  console.log("Items: \n", items);

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const items = await fetchItems();
  const item = req.body.newItem;

  const result = await db.query("INSERT INTO items (title) VALUES ($1) RETURNING title", [item]);
  console.log("New Record Added successfully | ", result.rows[0].title);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  try {
    console.log("Req Item (for edit): ", req.body);
    const result = await db.query(
      "UPDATE items SET title = $1 WHERE id = $2",
    [req.body.updatedItemTitle, req.body.updatedItemId]);
    
    console.log("Record Updated successfully");
    res.redirect("/");
  } catch (err) {
    console.error("Error: ", err);
    res.redirect("/");
  }
});

app.post("/delete", async (req, res) => {
  try {
    console.log("Del Req Item: ", req.body);
    const result = await db.query(
      "DELETE FROM items WHERE id = $1",
      [req.body.deleteItemId]
    );

    console.log("Record Deleted successfully");
    res.redirect("/");
  } catch (err) {
    console.log("Error: ", err);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
