/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// const qr = require("qr-image");
// const fs = require("fs");


inquirer
  .prompt([
    /* Pass your questions in here */
    {
    type : "input",
    name : "qrInput",
    message : "Enter string to generate QR : ",
    },
    {
        type : "input",
        name : "filename",
        message : "Enter file name : ",
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log(`Your response1 : ${answers.qrInput}`);
    console.log(`Your response2 : ${answers.filename}`);

    console.log("----------------------------------------------------------");
    
    var qr_svg = qr.image(`${answers.qrInput}`);
    console.log("Generated image : success");
    qr_svg.pipe(fs.createWriteStream(`${answers.filename}.png`));
    
    console.log("sync to svg file : success");

    console.log("----------------------------------------------------------");
  
    console.log("Creating txt file to save respone");
    fs.writeFile(`./${answers.filename}.txt`, `${answers.qrInput}`, (err) => {
        if (err) throw err;
        console.log("File has been saved ! (using native fs node module)");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("some error occur");
    } else {
      // Something else went wrong
      console.log("Final status : success");
    }
  });


// import qr from "qr-image";
// import fs from "fs";
// $(document).on("ready",function(){

//     $(".btn").on("click", function(){
//         console.log("eventListener activated");
        
//         var inputString = $(".inputtext textarea").val();
//         var qr_svg = qr.image(`${inputString}`);
//         qr_svg.pipe(fs.createWriteStream(`newqr.png`));
//         $(".displayqr img").attr("src", `./newqr.png`);
//     });
    
// });

