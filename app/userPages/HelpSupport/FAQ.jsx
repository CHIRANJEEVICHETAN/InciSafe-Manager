import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";

const FAQSection = () => {
  return (
    <ImageBackground source={require('../../../assets/images/background.jpg')} style={styles.container}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Help Center</Text>
      </View>

      <Text style={styles.titleText}>Frequently Asked Questions</Text>

      <View style={styles.faqList}>
        <View style={styles.faqItem}>
          <Text style={styles.questionText}>
            Q1: Can I edit an incident report after submission?
          </Text>
          <Text style={styles.answerText}>
            A: Yes, you can update your report within 24 hours of submission. Go
            to "My Reports" and click "Edit" next to the report.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.questionText}>
            Q2: How do I categorize an incident correctly?
          </Text>
          <Text style={styles.answerText}>
            A: Choose the category that best fits the nature of the event. If
            unsure, refer to the Incident Categories guide in the user manual.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.questionText}>
            Q3: Who gets notified after I report an incident?
          </Text>
          <Text style={styles.answerText}>
            A: Relevant safety officers, managers, and any designated
            stakeholders are automatically alerted via email and in-app
            notifications.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.questionText}>
            Q4: Is there a mobile app for incident reporting?
          </Text>
          <Text style={styles.answerText}>
            A: Yes, our mobile app allows you to report incidents on the go. You
            can download it from the App Store or Google Play.
          </Text>
        </View>
      </View>
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    borderBottomWidth: 1.5,
    borderColor: "#ccc",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: -8,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
  },
  titleText: {
    fontSize: 21,
    margin: 25,
    textAlign: "center",
    color: "#555",
    paddingBottom: 25,
  },
  faqList: {
    marginHorizontal: 15,
  },
  faqItem: {
    marginBottom: 15,
    paddingVertical: 10,
    // borderBottomWidth: 0.8,
    // borderBottomColor: "#aaa",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111f",
    marginBottom: 5,
  },
  answerText: {
    fontSize: 16,
    color: "#333",
    textAlign: "justify",
  },
});

export default FAQSection;
