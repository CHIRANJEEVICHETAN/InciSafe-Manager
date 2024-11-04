const express = require('express');
const admin = require("firebase-admin");
const path = require("path");
const serviceAccount = require(path.join(__dirname, 'assets', 'serviceAccountKey.json'));

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
const incidentCategories = ["BehaviourIncident", "ChemicalIncident", "EnvironmentalHazard", "EquipmentIssues", "FireIncident", "HealthSafety",
  "PolicyViolation", "WeatherHazards", "uniformSafety",];

let deviceCounter = 1; // Initialize a counter for device IDs

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

  try {
    // Fetch all FCM tokens from Firestore
    const tokensSnapshot = await db.collection("FCMTokens").get();
    const tokens = tokensSnapshot.docs.map(doc => doc.data()["FCM Token"]);

    if (tokens.length === 0) {
      return res.status(404).send({ error: 'No FCM tokens found' });
    }

    // Send notifications to all tokens
    const response = await admin.messaging().sendEachForMulticast({
      tokens: tokens,
      notification: { title, body },
    });

    console.log("Notifications sent successfully:", response.successCount);

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
    res.status(200).send({ message: 'Notifications sent successfully', response });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).send({ error: 'Failed to send notifications', message: error });
  }
});

// Endpoint to receive and store FCM tokens
app.post('/storeFCMToken', async (req, res) => {
  const { token } = req.body;
  try {
    // Check if the token already exists
    const tokensSnapshot = await db.collection("FCMTokens").get();
    let existingDocId = null;

    tokensSnapshot.forEach(doc => {
      if (doc.data()["FCM Token"] === token) {
        existingDocId = doc.id;
      }
    });

    if (existingDocId) {
      // Update the existing token
      await db.collection("FCMTokens").doc(existingDocId).set({ "FCM Token": token });
      console.log(`Updated FCM Token for document ID: ${existingDocId}`);
    } else {
      // Create a new document for the new token
      const newDocId = `DeviceID${String(deviceCounter).padStart(4, '0')}`;
      await db.collection("FCMTokens").doc(newDocId).set({ "FCM Token": token });
      console.log(`Stored new FCM Token with document ID: ${newDocId}`);
      deviceCounter++;
    }

    res.status(200).send({ message: 'FCM Token processed successfully' });
  } catch (error) {
    console.error('Error processing FCM Token:', error);
    res.status(500).send({ error: 'Failed to process FCM Token' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`http://localhost:${port}`);
  console.log("Firebase Admin SDK initialized");
});
