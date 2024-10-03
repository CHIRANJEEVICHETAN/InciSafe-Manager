import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const icons = [
  { name: 'Uniform', source: require('./../assets/images/HomeScreenIcons/uniformSafety1.png') },
  { name: 'Health Safety', source: require('./../assets/images/HomeScreenIcons/healthSafety.png') },
  // { name: 'Safety', source: require('./../assets/images/HomeScreenIcons/safety.png') },
//   { name: 'Safety', source: require('./../assets/images/HomeScreenIcons/safety.png') },
//   { name: 'Safety', source: require('./../assets/images/HomeScreenIcons/safety.png') },
//   { name: 'Safety', source: require('./../assets/images/HomeScreenIcons/safety.png') },
//   { name: 'Safety', source: require('./../assets/images/HomeScreenIcons/safety.png') },
//   { name: 'Safety', source: require('./../assets/images/HomeScreenIcons/safety.png') },
//   { name: 'Safety', source: require('./../assets/images/HomeScreenIcons/safety.png') },
//   { name: 'Safety', source: require('./../assets/images/HomeScreenIcons/safety.png') },
//   { name: 'Safety', source: require('./../assets/images/HomeScreenIcons/safety.png') },
  // Add other icons here
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
    },
    iconContainer: {
      alignItems: 'center',
      margin: 10,
    },
    icon: {
      width: 50,
      height: 50,
      backgroundColor: '#00bfa5',
      borderRadius: 10,
      padding: 10,
    },
    iconLabel: {
      marginTop: 5,
      textAlign: 'center',
    },
  });
  
  export default IconGrid;
