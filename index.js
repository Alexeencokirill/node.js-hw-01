const contacts = require("./bd/contacts");
const { program } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const allContacts = await contacts.listContacts();
        return console.table(allContacts);
      case "get":
        const getContact = await contacts.getContactById(id);
        return console.log(getContact);
      case "add":
        const addContact = await contacts.addContact(name, email, phone);
        return console.log(addContact);
      case "remove":
        const removeContact = await contacts.removeContact(id);
        return console.log(removeContact);
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error.message);
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

invokeAction(options);
