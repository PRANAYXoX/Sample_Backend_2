const express = require("express");
const port = 8000;
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/mongoose");
const Contact = require("./schema/contact");
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
    Contact.create(req.body, (err, newContact) => {
      if (err) {
        console.log("Error in creating new Contact!");
        return res.json({ message: "Failure", details: err });
      }
      console.log("NEW CONTACT:", newContact);
      return res.json({ status: "Success", details: newContact });
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
