const fs = require("fs");

// fs.writeFile("./messeage.txt", "Hello from NodeJS!", (err) => {
//     if (err) throw err;
//     console.log("File has been saved !");
// });

fs.readFile("./messeage.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
});