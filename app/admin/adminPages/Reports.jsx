import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReportDownloads from './../adminScreens/reportDownload';

export default function Reports() {
  return (
    <View style={styles.container}>
      <ReportDownloads />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
