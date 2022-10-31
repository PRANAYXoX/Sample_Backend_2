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
app.use("/", require("./routes/index"));

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

app.post("/delete-contact", (req, res) => {
  const id = req.body.id;
  console.log("ID", id);
  if (id) {
    Contact.findByIdAndDelete(id, function (err, details) {
      if (err) {
        console.log("Error:", err);
        return res.json({ status: "Failure!", error: err });
      }
      return res.json({ status: "Success!", message: details });
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
