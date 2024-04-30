import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactId,
} from "./contacts.js";

import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.table(contacts);
      break;

    case "get":
      const oneContacts = await getContactById(id);
      return console.table(oneContacts);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      return console.table(newContact);
      break;

    case "remove":
      const deletedContact = await removeContact(id);
      return console.table(deletedContact);
      break;

    case "update":
      const updateContact = await updateContactId(id, name, email, phone);
      return console.table(updateContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
