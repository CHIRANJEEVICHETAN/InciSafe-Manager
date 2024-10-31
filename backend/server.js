const express = require('express');
const admin = require("firebase-admin");
const path = require("path");
const serviceAccount = require(path.join(__dirname, 'assets', 'serviceAccountKey.json'));
const { setDoc, doc } = require("firebase/firestore");
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(express.json());

const departments = ["HR", "Engineering", "Sales", "Marketing"];
const employees = [
  "John Doe - 1001",
  "Jane Smith - 1002",
  "Alice Johnson - 1003",
  "Bob Brown - 1004", // Corrected duplicate ID
];
const severity = ["minor", "moderate", "severe"];
const incidentCategories = ["Environmental Hazard Reporting Form", "Equipment-Related Incident", "Fire and Electrical Hazard Incident", "Hazardous Material Handling Incident", "Health & Safety Incident Violation", "Behaviour and Human Error Incident", "Work Policy Violation Incident", "Uniform Safety Equipment Violation", "Weather-Related Hazards"];

// Endpoint to get departments
app.get("/departments", (req, res) => {
  res.json(departments);
});

app.get("/incidentCategories", (req, res) => {
  res.json(incidentCategories);
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

app.post('/sendNotification', async (req, res) => {
  const { title, body, date, username, userId } = req.body;
  const message = {
    notification: { title, body },
    topic: "all_users",
  };

  try {
    // Send the notification
    const response = await admin.messaging().send(message);

    console.log("Notification sent successfully:", response);

    // Reference to the user’s notifications subcollection
    const userNotificationsRef = db.collection("notifications").doc(userId).collection("userNotifications");

    // Reference to the adminNotifications collection
    const adminNotificationsRef = db.collection("adminNotifications");

    // Create a new document for each notification in both collections
    const notificationData = {
      title,
      body,
      date,
      username,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    await userNotificationsRef.add(notificationData); // Save to user-specific notifications
    await adminNotificationsRef.add(notificationData); // Save to adminNotifications

    console.log("Notification document created in Firestore for user:", userId, notificationData);
    res.status(200).send({ message: 'Notification sent successfully', response });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send({ error: 'Failed to send notification', message: error });
  }
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`http://localhost:${port}`);
  console.log("Firebase Admin SDK initialized");
});
