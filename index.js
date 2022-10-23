const express = require("express");
const port = 8000;
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var contacts = [
  {
    id: 1,
    name: "Dave Mustaine",
    number: "6207045896",
  },
  {
    id: 2,
    name: "Mikhael Adkerfelt",
    number: "6207045896",
  },
  {
    id: 3,
    name: "DIMEBAG DARREL",
    number: "9900123456",
  },
];

app.get("/", (req, res) => {
  return res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.get("/fetch-contacts", (req, res) => {
  return res.json({ message: "List of contacts", contacts });
});

app.post("/new-contact", (req, res) => {
  console.log("DATA:", req.body);
  if (req.body) {
    contacts.push(req.body);
    return res.json({
      status: "success",
      message: "New Contact Added",
      name: req.body.name,
    });
  } else {
    return res.json({
      status: "Failure!",
      message: "Adding nerw contact failed!",
    });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log("Error starting the server!");
    return;
  }
  console.log("Server up on port:", port);
});
