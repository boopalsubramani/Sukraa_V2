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






// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   Image,
//   ScrollView,
// } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
// import { LineChart } from 'react-native-chart-kit';
// import { IMAGES } from '../utils/SharedImages';

// const { width } = Dimensions.get('window');

// const TestTrendsScreen = ({ navigation }: any) => {
//   const [selectedPatient, setSelectedPatient] = useState('Krishnan');
//   const [selectedTest, setSelectedTest] = useState('BUN');
//   const [chartView, setChartView] = useState(true);

//   const data = [10, 14, 20.67, 18, 32, 22, 12];

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image source={IMAGES.LeftArrow} style={styles.backArrow} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Test Trends</Text>
//       </View>

//       <View style={styles.dropdownRow}>
//         <RNPickerSelect
//           onValueChange={(value) => setSelectedPatient(value)}
//           value={selectedPatient}
//           items={[
//             { label: 'Krishnan ,24', value: 'Krishnan' },
//             { label: 'Another Person', value: 'Another' },
//           ]}
//           style={pickerSelectStyles}
//           placeholder={{}}
//         />
//         <Text style={styles.inlineText}>Male</Text>
//         <Text style={styles.inlineText}>Self</Text>
//       </View>

//       <RNPickerSelect
//         onValueChange={(value) => setSelectedTest(value)}
//         value={selectedTest}
//         items={[{ label: 'BUN- Blood Urea Nitrogen', value: 'BUN' }]}
//         style={pickerSelectStyles}
//         placeholder={{}}
//       />

//       <View style={styles.toggleRow}>
//         <TouchableOpacity
//           style={[styles.toggleButton, chartView && styles.activeToggle]}
//           onPress={() => setChartView(true)}
//         >
//           <Text style={[styles.toggleText, chartView && styles.activeText]}>Chart</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.toggleButton, !chartView && styles.activeToggle]}
//           onPress={() => setChartView(false)}
//         >
//           <Text style={[styles.toggleText, !chartView && styles.activeText]}>View List</Text>
//         </TouchableOpacity>
//       </View>

//       {chartView && (
//         <LineChart
//           data={{
//             labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//             datasets: [{ data }],
//           }}
//           width={width * 0.9}
//           height={220}
//           yAxisSuffix=""
//           yAxisInterval={1}
//           chartConfig={{
//             backgroundColor: '#fff',
//             backgroundGradientFrom: '#fff',
//             backgroundGradientTo: '#fff',
//             decimalPlaces: 2,
//             color: (opacity = 1) => `rgba(62, 44, 145, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             style: {
//               borderRadius: 16,
//             },
//             propsForDots: {
//               r: '5',
//               strokeWidth: '2',
//               stroke: '#3E2C91',
//             },
//           }}
//           bezier
//           style={{
//             marginVertical: 16,
//             borderRadius: 16,
//           }}
//         />
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     flex: 1,
//     paddingHorizontal: width * 0.05,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 16,
//     marginBottom: 16,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 16,
//   },
//   backArrow: {
//     width: 10,
//     height: 16,
//     resizeMode: 'contain',
//   },
//   dropdownRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//     gap: 10,
//   },
//   inlineText: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     fontSize: 14,
//     color: '#333',
//   },
//   toggleRow: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 12,
//   },
//   toggleButton: {
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     marginLeft: 8,
//     backgroundColor: '#eee',
//   },
//   activeToggle: {
//     backgroundColor: '#3E2C91',
//   },
//   toggleText: {
//     fontSize: 14,
//     color: '#888',
//   },
//   activeText: {
//     color: '#fff',
//   },
// });

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 14,
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 10,
//     color: 'black',
//     marginBottom: 8,
//     backgroundColor: '#f9f9f9',
//   },
//   inputAndroid: {
//     fontSize: 14,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 10,
//     color: 'black',
//     marginBottom: 8,
//     backgroundColor: '#f9f9f9',
//   },
// });

// export default TestTrendsScreen;

