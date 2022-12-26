const express = require("express");
const mysql = require("mysql");

const app = express();
// Create Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql Connected");
});

// Insert Post 1
app.get("/addpost1", (req, res) => {
  let post = { title: "Post One", body: "This is a text for post number one" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post 1 added...");
  });
});

// Insert Post 2
app.get("/addpost2", (req, res) => {
  let post = { title: "Post Two", body: "This is a text for post number Two" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post 2 added...");
  });
});

// Get All Data
app.get("/getdata", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("Posts Fetched...");
  });
});

// Get Single Data
app.get("/getdata/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post Fetched...");
  });
});

// Update Post
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "Updated Title";
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post Updated...");
  });
});

// Delete Post
app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post Deleted...");
  });
});

app.listen("3000", () => {
  console.log("Server Started on port 3000");
});
