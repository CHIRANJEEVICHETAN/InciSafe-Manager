const express = require('express');
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());

const departments = ["HR", "Engineering", "Sales", "Marketing"];
const employees = [
  "John Doe - 1001",
  "Jane Smith - 1002",
  "Alice Johnson - 1003",
  "Bob Brown - 1003",
];
const severity = ["minor", "moderate", "severe"];

// Endpoint to get departments
app.get("/departments", (req, res) => {
  res.json(departments);
});

// Endpoint to get employees
app.get("/employees", (req, res) => {
  res.json(employees);
});

// Endpoint to get severity levels
app.get("/severity", (req, res) => {
  res.json(severity);
});

// Endpoint to delete a user
app.post("/deleteUser", async (req, res) => {
  const { uid } = req.body;
  try {
    await admin.auth().deleteUser(uid);
    console.log(`Successfully deleted user with UID: ${uid}`);
    res.status(200).send({ message: `User ${uid} deleted successfully` });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ error: "Failed to delete user" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
