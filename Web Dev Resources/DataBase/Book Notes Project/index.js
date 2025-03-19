import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;

function printDivider(req, res, next) {
    console.log("------------------------");
    // console.log("Req: ", req);
    next();
}

// app.use(printDivider);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "book_project_db",
    password: "root123",
    port: 5432,
});
db.connect();

const genres = ["All", "Science Fiction", "Fantasy", "Mystery", "Thriller", "Romance", "Historical Fiction", "Non-Fiction"]
let query;
let statusMsg = "Null";
let tabTitle = "Null";
let currentGenre = "All";

const fetchBook = async (genre) => {
    query = "SELECT * FROM bookRecord";
    let params =[];
    console.log("Req Genre: " , genre);
    console.log("genre dtype: ", typeof(genre));

    if(genre && genre !== "All"){
        query += " WHERE genre = $1";
        params.push(genre);
    }

    console.log(`Query: ${query} | param: ${params}`);
    try {
        const result = await db.query(query, params);
        return result.rows
    } catch (err) {
        console.log("Error: Fetching Books | ", err);
        return [];
    }
}

const fetchBookCover = async (bookTitle, author) => {
    try {
        const response = await axios.get(`https://bookcover.longitood.com/bookcover?book_title=${encodeURIComponent(bookTitle)}&author_name=${encodeURIComponent(author)}`);
        const result = response.data;
        console.log("Book Fetech ---");
        // console.log("Result: ", result.docs);
        // Extract the first available ISBN number from the results
        // const firstISBN = result.docs.find(doc => doc.isbn)?.isbn[0] || null;
        // return firstISBN;
        return result;
    } catch (err) {
        console.error("Error: ", err);
        return [];
    }
}

// console.log("Book cover: ", await fetchBookCover("Atomic Habits", "James Clear"));

app.post("/Request_edit", (req, res)=> {
    tabTitle = "Edit Info";
    statusMsg = "Edit request granted";
    console.log("Req Edit: ", req.body);
    res.redirect(`/showBook/${req.body.title}`);
})

// Display exsisting book
app.get("/showBook/:bookTitle", async (req, res)=> {
    let bookData;
    console.log("Redirect req for: ", req.params.bookTitle);
    try {
        const book = await db.query("SELECT * FROM bookrecord WHERE title = $1", [req.params.bookTitle]);
        bookData = book.rows[0];
        console.log("Book: ", bookData);
    } catch (err) {
        console.log("Error: ", err);
        bookData = {
            title: req.params.bookTitle,
            genre: "Fetch Error",
            author: "Fetch Error",
            publish_year: "Fetch Error",
            bookNote: "Fetch Error"
        };
    }

    console.log("Request Display Book ----");
    if(statusMsg === "Null"){
        statusMsg = "Displaying Book success";
    }
    if(tabTitle === "Null"){
        tabTitle = "Book";
    }
    
    console.log("--> Title: ", bookData.title);
    // const bookUrl = "/images/book-cover.png";
    const response = await fetchBookCover(bookData.title, bookData.author);
    const bookUrl = response.url;
    console.log("---> Output URL: ", bookUrl);
    // const submissionReq = "request_edit";
    const submit_button = "Add";
    res.render("book.ejs", {tabTitle, statusMsg, genres, bookUrl, submit_button, bookData});

    // const books = await fetchBook(currentGenre);
    // // console.log("Books: ",books);
    // res.render("index.ejs", {genres, contentTitle:currentGenre, books});
})

// Display New book Page
app.get("/newBook", (req, res)=> {
    console.log("Request New Book <<<");
    const statusMsg = "Record added successfully";
    const bookUrl = "/images/book-cover.png";
    const tabTitle = "New Note";
    const submissionReq = "submit_newNote";
    const submit_button = "Add";
    const bookData = {};
    res.render("book.ejs", {tabTitle, statusMsg, genres, bookUrl, submissionReq, submit_button, bookData });
})
app.post("/submit_newNote", async (req, res)=> {
    console.log("New Book: ", req.body);
    const book = req.body;
    try {
        await db.query("INSERT INTO bookrecord (title, author, genre, publish_year, note) VALUE ($1, $2, $3, $4, $5)",
        [book.title, book.author, book.genre, book.publish_year, book.note]);
    } catch (err) {
        console.log("Error: ", err);
    }
    const bookUrl = "/images/book-cover.png";
    const tabTitle = "New Note";
    const submitionReq = "submit_newNote";
    const submit_button = "Add";
    res.render("book.ejs", {tabTitle, genres, bookUrl, submitionReq, submit_button });    
})

app.post("/request-sort", async (req, res)=> {
    console.log("Sort Triggered");
    console.log("Request Sort: ", req.body);
    let sortParamNo;
    let param = [];
    try {
        if(currentGenre === "All"){
            // sortParamNo = 1;
            // param.push(req.body.sort);
        }
        else {
            // sortParamNo = 2;
            param.push(currentGenre);
            // param.push(req.body.sort);
        }

        let newQuery = query + ` ORDER BY ${req.body.sort}`;
        console.log("Sort query: ", newQuery, " | ", param);

        const result = await db.query(newQuery, param);
        const books = result.rows;
        res.render("index.ejs", {genres, contentTitle: currentGenre, books});
    } catch (err) {
        console.log("Error: ", err);
        res.redirect("/");
    }
});

app.post("/request_genre", (req, res) => {
    console.log("Request Genre: ", req.body);
    currentGenre = req.body.genre;
    res.redirect("/");
});

app.get("/", async (req, res)=> {
    const books = await fetchBook(currentGenre);
    // console.log("Books: ",books);
    res.render("index.ejs", {genres, contentTitle:currentGenre, books});
});

app.listen(port, ()=>{
    console.log(`Server listening to port ${port}`);
});

// const testBooks = await fetchBook("Science Fiction");
// console.log(testBooks);  // Should log all books with genre "Science Fiction"
