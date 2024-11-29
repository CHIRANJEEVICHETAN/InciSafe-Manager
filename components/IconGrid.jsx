import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import useLoadFont from "./../hooks/useLoadFont";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const IconGrid = ({ style, searchQuery }) => {
  const fontsLoaded = useLoadFont();
  const router = useRouter();

  const gridItems = [
    {
      title: 'Uniform',
      route: '/userPages/Forms/uniformSafety',
      image: require('./../assets/images/HomeScreenIcons/uniformSafety.png'),
      iconStyle: 'uniformIcon',
      labelStyle: 'uniformIconLabel'
    },
    {
      title: 'Health Safety',
      route: '/userPages/Forms/healthSafety',
      image: require('./../assets/images/HomeScreenIcons/healthSafety.png'),
      iconStyle: 'healthSafetyIcon',
      labelStyle: 'healthSafetyIconLabel'
    },
    {
      title: 'Equipment Issues',
      route: '/userPages/Forms/equipmentIssues',
      image: require('./../assets/images/HomeScreenIcons/equipmentIssues.png'),
    },
    {
      title: 'Fire Incident',
      route: '/userPages/Forms/FireIncident',
      image: require('./../assets/images/HomeScreenIcons/fireIncident.png'),
      hasSpecialStyle: true
    },
    {
      title: 'Hazardous Materials',
      route: '/userPages/Forms/Hazardousmaterials',
      image: require('./../assets/images/HomeScreenIcons/hazardousMaterials.png'),
    },
    {
      title: 'Environmental Hazards',
      route: '/userPages/Forms/environmentalHazards',
      image: require('./../assets/images/HomeScreenIcons/environmentalHazards.png'),
    },
    {
      title: 'Policy Violations',
      route: '/userPages/Forms/policyViolations',
      image: require('./../assets/images/HomeScreenIcons/policyViolations.png'),
    },
    {
      title: 'Weather Hazards',
      route: '/userPages/Forms/weatherHazards',
      image: require('./../assets/images/HomeScreenIcons/weatherHazards.png'),
    },
    {
      title: 'Human Errors',
      route: '/userPages/Forms/humanErrors',
      image: require('./../assets/images/HomeScreenIcons/humanErrors.png'),
      hasSpecialStyle: true
    }
  ];

  // Filter items based on search query
  const filteredItems = searchQuery
    ? gridItems.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : gridItems;

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.grid, style]} onLayout={onLayoutRootView}>
      {filteredItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.iconContainer}
          onPress={() => router.push(item.route)}
        >
          <Text style={[
            styles.iconLabel,
            item.labelStyle && styles[item.labelStyle],
            item.title === 'Environmental Hazards' && {
              width: "100%",
              textAlign: "center",
              marginTop: 10
            }
          ]}>
            {item.title}
          </Text>
          <Image
            source={item.image}
            style={[
              styles.icon,
              item.iconStyle && styles[item.iconStyle],
              item.hasSpecialStyle && {
                marginTop: 30,
                transform: [{ scale: 1.2 }]
              }
            ]}
          />
        </TouchableOpacity>
      ))}
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