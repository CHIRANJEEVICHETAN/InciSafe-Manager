import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import useLoadFont from "./../hooks/useLoadFont";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

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

const IconGrid = ({ style }) => {
  const fontsLoaded = useLoadFont();

  // Hide the splash screen once the fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Don't render anything until fonts are loaded
  }
  return (
    <View style={[styles.grid, style]}>
      {icons.map((icon, index) => (
        <TouchableOpacity key={index} style={styles.iconContainer}>
          {(icon.name === 'Uniform' || icon.name === 'Health Safety') && (
            <Text style={[styles.iconLabel, icon.name === 'Uniform' ? styles.uniformIconLabel : styles.healthSafetyIconLabel]}>
              {icon.name}
            </Text>
          )}
          <Image
            source={icon.source}
            style={[
              styles.icon,
              icon.name === 'Uniform' && styles.uniformIcon, // Apply specific style for Uniform icon
              icon.name === 'Health Safety' && styles.healthSafetyIcon, // Apply specific style for Health Safety icon
            ]}
          />
          {icon.name !== 'Uniform' && icon.name !== 'Health Safety' && (
            <Text style={styles.iconLabel}>{icon.name}</Text>
          )}
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
      width: 50,
      height: 50,
      justifyContent:'center',
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
      fontFamily: 'Roboto-Bold',
      fontSize: 13,
    },
    uniformIconLabel: {
      borderColor: 'blue',
      position: 'absolute',
      bottom: 10,
      width: '90%',
      textAlign: 'center',
      
    },
            
  });
  
  export default IconGrid;
