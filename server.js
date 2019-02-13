const express = require("express");
const sql     = require("sqlite3").verbose();
const bcrypt  = require("bcrypt");
const cors    = require("cors");

const app = express();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.use(cors());

// open db connection
let db = new sql.Database("./users.db", (err) => {
   if (err) {
      throw err;
   }
   let s = `CREATE TABLE IF NOT EXISTS users (
               user_email text NOT NULL,
               user_passw text NOT NULL
            );`;
   db.run(s, [], (err) => {
      if (err) {
         throw err;
      }
   })
});

app.post("/new-user", jsonParser, (req, res) => {
   let email = req.body.email;
   let passw = req.body.passw;
   bcrypt.hash(passw, 14, (err, hash) => {
      let q = `INSERT INTO users (user_email,user_passw) VALUES ("${email}", "${hash}");`;
      // add to db
      db.run(q, (err) => {
         if (err) {
            throw err;
         }
         // update user list
         res.json({yep: "cool"});
      })
   })
});

app.get("/get-users", (req, res) => {
   // query
   let q  = "SELECT user_email,user_passw FROM users;";
   // get users from db
   db.all(q, (err, rows) => {
      if (err) {
         throw err;
      }
      let users = [];
      rows.forEach((row) => {
         users.push({ email: row.user_email, passw: row.user_passw })
      })
      // send json
      res.json({ users: users })
   })
})

app.listen(3001);
