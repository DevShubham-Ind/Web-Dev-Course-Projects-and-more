import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "shubham31";
const yourPassword = "secret_api";
const yourAPIKey = "a934c90f-37cc-4728-b972-4a1bfe51f5e2";
const yourBearerToken = "31c2bb22-47ee-49a8-a53d-c17fe8c85c84";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  try {
    const response = await axios.get('https://secrets-api.appbrewery.com/random');
    const result = JSON.stringify(response.data);
    console.log(`Ans : ${result}`);

    res.render("index.ejs", {content: result});
  }
  catch (error) {
    console.log("Fail to make authentication : ", error.message);

    res.render("index.ejs", {error : error.message});
  }
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908

  try {
    const response = await axios.get('https://secrets-api.appbrewery.com/all', {
      auth : {
        username : "shubham31",
        password : "secret_api"
      },
      params : { page : 1}
    });
    const result = JSON.stringify(response.data);
    // const result = response.data;
  
    res.render("index.ejs", {content: result});
  } catch (error) {
    console.log("Failed to authinticate : ", error.message);

    res.render("index.ejs", {error : error.message});
  }

  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    const response = await axios.get('https://secrets-api.appbrewery.com/filter', {
      params : { 
        apiKey: yourAPIKey,
        score : 5
      }
    });
    const result = JSON.stringify(response.data);
    // const result = response.data;
  
    res.render("index.ejs", {content: result});
  } catch (error) {
    console.log("Failed to authinticate : ", error.message);

    res.render("index.ejs", {error : error.message});
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */

  // This way also we can authenticate in axios method ---------
  // const config = {
  //   Authorization : `Bearer ${yourBearerToken}`
  // };

  try {
    const response = await axios.get('https://secrets-api.appbrewery.com/secrets/42', {
      headers: { 
        Authorization: `Bearer ${yourBearerToken}`
      }
    });
    const result = JSON.stringify(response.data);
    // const result = response.data;
  
    res.render("index.ejs", {content: result});
  } catch (error) {
    console.log("Failed to authinticate : ", error.message);

    res.render("index.ejs", {error : error.message});
  }  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
