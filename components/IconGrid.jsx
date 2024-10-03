import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const icons = [
  { name: 'Uniform', source: require('./../assets/images/HomeScreenIcons/uniformSafety.png') },
  { name: 'Health Safety', source: require('./../assets/images/HomeScreenIcons/healthSafety.png') },
  { name: 'Equipment Issues', source: require('./../assets/images/HomeScreenIcons/equipmentIssues.png') },
  { name: 'Fire Incident', source: require('./../assets/images/HomeScreenIcons/fireIncident.png') },
  { name: 'Hazardous Materials', source: require('./../assets/images/HomeScreenIcons/hazardousMaterials.png') },
  { name: 'Environmental Hazards', source: require('./../assets/images/HomeScreenIcons/environmentalHazards.png') },
  { name: 'Policy Violations', source: require('./../assets/images/HomeScreenIcons/policyViolations.png') },
  { name: 'Weather Hazards', source: require('./../assets/images/HomeScreenIcons/weatherHazards.png') },
  { name: 'Human Errors', source: require('./../assets/images/HomeScreenIcons/humanErrors.png') },
];

const IconGrid = ({ style }) => {  // Accept style as a prop
    return (
      <View style={[styles.grid, style]}>
        {icons.map((icon, index) => (
          <TouchableOpacity key={index} style={styles.iconContainer}>
            <Image source={icon.source} style={styles.icon} />
            <Text style={styles.iconLabel}>{icon.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft:10,
      marginRight: 10,
      // backgroundColor: 'red',
    },
    iconContainer: {
      alignItems: 'center',
      margin: 35,
      marginTop: 35,
      backgroundColor: '#00bfa5',
      width: 100,
      height: 111,
      marginLeft:5,
      marginRight:5,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 18,
    },
    icon: {
      width: 60,
      height: 60,
      // backgroundColor: '#00bfa5',
      borderRadius: 10,
      padding: 10,
      marginTop: 20,
    },
    iconLabel: {
      marginTop: 5,
      textAlign: 'center',
    },
  });
  
  export default IconGrid;
