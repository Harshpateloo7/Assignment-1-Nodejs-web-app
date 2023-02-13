//Import Required Module
const { response } = require("express");
const express = require("express");
const { request } = require("http");
const path = require("path");
const { MongoClient} = require("mongodb");

//Mongo config stuff
const dbUrl = "mongodb+srv://darshdeveloperdb:myFuqY1b6wzgUntN@cluster0.6exmnze.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(dbUrl);

//Set up express app and port number
const app = express();
const port = process.env.PORT || 8888;

//Set up template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Set up static file paths
app.use(express.static(path.join(__dirname, "public")));

//Page Routes
app.get("/", async(request, response) => {
 var services = await getServices();
  response.render("index", { title: "Home", data: services});
});
app.get("/about", (request, response) => {
  response.render("about", { title: "About"});
});
app.get("/contact",(request, response)=>{
  response.render("contact",{ title:"Contact"});
});

//Setup server listning
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

//Mongo function
/* function to connect to DB and return the darshdeveloperdb database. */
async function connection(){
  await client.connect();
  db = client.db("darshdeveloperdb");
  return db;
}
/*function to select all data from atlas */
async function getServices(){
    db = await connection();
    var results = db.collection("Service").find({});
    res = await results.toArray();
    return res;
}