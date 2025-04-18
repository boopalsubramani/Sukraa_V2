import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrendScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TrendScreen</Text>
    </View>
  );
};

export default TrendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F3F', // dark blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
