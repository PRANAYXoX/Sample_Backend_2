const Contact = require("../schema/contact");
module.exports.home = (req, res) => {
  return res.json({ msg: "This is CORS-enabled for all origins!" });
};

module.exports.fetchContacts = (req, res) => {
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("Error Finding Contacts from db! ERROR:", err);
      return res.json({ status: "Failure..", msg: err });
    }
    return res.json({ message: "Contacts Fetched!", contacts });
  });
};

module.exports.newContact = (req, res) => {
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
};
