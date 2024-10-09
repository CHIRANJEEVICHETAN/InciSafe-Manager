import React, { useCallback } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import useLoadFont from "./../hooks/useLoadFont";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const IconGrid = ({ style }) => {
  const fontsLoaded = useLoadFont();
  const router = useRouter();
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
      <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/userPages/Forms/uniformSafety')}>
        <Text style={[styles.iconLabel, styles.uniformIconLabel]}>Uniform</Text>
        <Image
          source={require('./../assets/images/HomeScreenIcons/uniformSafety.png')}
          style={[styles.icon, styles.uniformIcon]}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/userPages/Forms/healthSafety')}>
        <Text style={[styles.iconLabel, styles.healthSafetyIconLabel]}>Health Safety</Text>
        <Image
          source={require('./../assets/images/HomeScreenIcons/healthSafety.png')}
          style={[styles.icon, styles.healthSafetyIcon]}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/userPages/Forms/equipmentIssues')}>
        <Text style={styles.iconLabel}>Equipment Issues</Text>
        <Image
          source={require('./../assets/images/HomeScreenIcons/equipmentIssues.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/userPages/Forms/FireIncident')}>
        <Text style={styles.iconLabel}>Fire Incident</Text>
        <Image
          source={require('./../assets/images/HomeScreenIcons/fireIncident.png')}
          style={[styles.icon, { marginTop: 30 }, { transform: [{ scale: 1.2 }] }]}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/userPages/Forms/Hazardousmaterials')}>
        <Text style={styles.iconLabel}>Hazardous Materials</Text>
        <Image
          source={require('./../assets/images/HomeScreenIcons/hazardousMaterials.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/userPages/Forms/environmentalHazards')}>
        <Text style={[styles.iconLabel, { width: "100%", textAlign: "center", marginTop: 10 }]}>Environmental Hazards</Text>
        <Image
          source={require('./../assets/images/HomeScreenIcons/environmentalHazards.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/userPages/Forms/policyViolations')}>
        <Text style={styles.iconLabel}>Policy Violations</Text>
        <Image
          source={require('./../assets/images/HomeScreenIcons/policyViolations.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/userPages/Forms/weatherHazards')}>
        <Text style={styles.iconLabel}>Weather Hazards</Text>
        <Image
          source={require('./../assets/images/HomeScreenIcons/weatherHazards.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/userPages/Forms/humanErrors')}>
        <Text style={styles.iconLabel}>Human Errors</Text>
        <Image
          source={require('./../assets/images/HomeScreenIcons/humanErrors.png')}
          style={[styles.icon, { marginTop: 30 }, { transform: [{ scale: 1.2 }] }]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  iconContainer: {
    alignItems: 'center',
    margin: 20,
    marginTop: 20,
    // backgroundColor: '#00bfa5',
    borderWidth: 2,
    borderColor: 'black',
    width: 100,
    height: 100,
    marginLeft: 5,
    marginRight: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  icon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
  },
  uniformIcon: {
    borderWidth: 2,
    marginTop: 20,
    position: 'absolute',
    bottom: 32,
    left: 30,
    textAlign: 'center',
    transform: [{ scale: 1.2 }],
  },
  healthSafetyIcon: {
    marginTop: 25,
    textAlign: 'center',
    transform: [{ scale: 1.2 }],
  },
  healthSafetyIconLabel: {
    borderColor: 'blue',
    position: 'absolute',
    bottom: 8,
    width: '90%',
    marginTop: 15,
  },
  iconLabel: {
    borderColor: 'blue',
    position: 'absolute',
    bottom: 5,
    width: '90%',
    marginTop: 15,
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Roboto-Bold',
  },
  uniformIconLabel: {
    borderColor: 'blue',
    position: 'absolute',
    bottom: 8,
    width: '100%',
    textAlign: 'center',
  },
});

export default IconGrid;