import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const approach = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About</Text>
      </View>

      <Text style={styles.titleText}>Our Approach to Safety</Text>

      <View style={styles.menuList}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>1. Streamlined Reporting: Making it easy for employees to report incidents within seconds, enabling quick responses.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>2. Data-Driven Insights: Leveraging collected data to identify safety trends and improve organizational policies.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>3. Compliance with Safety Standards: Our platform is designed to meet safety regulations such as OSHA and ISO standards, ensuring organizations remain compliant.</Text>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center', 
    padding: 25,
    borderBottomWidth: 1.8,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: -8,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
  },
  titleText: {
    fontSize: 22,
    margin: 15,
    textAlign: 'center',
    color: '#555',
    marginBottom: 55, 
  },
  menuList: {
    marginHorizontal: 15,
  },
  menuItem: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: '#ddd',
    marginHorizontal: 15,
    textAlign: 'justify', 
  },
  menuText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
    textAlign: 'justify',
  },
});

export default approach ;
