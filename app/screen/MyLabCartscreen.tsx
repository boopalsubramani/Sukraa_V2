import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../utils/SharedImages';
import { useNavigation } from '@react-navigation/native';

const MyLabCartscreen = () => {
      const navigation = useNavigation();
  // Using the provided data
  const testData =[ {
    id: '1',
    name: 'Basic Health Checkup',
    price: 'SAR 999',
    resultTime: '24hrs',
    images:IMAGES.Black
  }
  ,{
    id: '2',
    name: 'Glucose - Fasting',
    price: 'SAR 199',
    resultTime: ' 03hrs',
    images:IMAGES.bloodDrop
  }
];

  // State to track if we have tests in the lab
  const [tests, setTests] = React.useState(testData);

  const removeTest = (id) => {
    setTests(tests.filter(test => test.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
              <Image source={IMAGES.back} resizeMode="contain" />
          </TouchableOpacity>
              <Text style={styles.headerTitle}>My Lab</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        {/* Test Cards */}
        {tests.map((test) => (
          <View key={test.id} style={styles.testCard}>
            <View style={styles.testCardContent}>
              <View style={styles.iconContainer}>
                  <Image source={test.images} resizeMode="contain"/>
              </View>
              <View style={styles.testInfo}>
                <Text style={styles.testName}>{test.name}</Text>
                <View style={styles.testMetaInfo}>
                  <Text style={styles.testPrice}>{test.price}</Text>
                  <View style={styles.divider} />
                  <Text style={styles.resultTime}>Result {test.resultTime}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeTest(test.id)}
              >
                <Image source={IMAGES.remove} resizeMode="contain" />
                {/* <Ionicons name="close-circle" size={24} color="#FF5252" /> */}
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Test</Text>
        </TouchableOpacity>
        
        <LinearGradient
           colors={['#1E3989', '#9B71AA', '#87C699']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: 'white',
  },
 
  headerLeft: {
    flex:1,
    flexDirection: 'row',

    alignItems: 'center',
  },
  backButton: {
    // paddingVertical: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    marginTop:16,
    padding: 16,
  },
  testCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 20,
    borderWidth:1,
    borderColor:"#E4E6EF"
  },
  testCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 159, 67, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  testMetaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testPrice: {
    fontSize: 14,
    color: '#555',
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: '#DDD',
    marginHorizontal: 8,
  },
  resultTime: {
    fontSize: 14,
    color: '#555',
  },
  removeButton: {
    padding: 8,
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    // borderTopWidth: 1,
    // borderTopColor: '#EEEEEE',
  },
  addButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#3949AB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  addButtonText: {
    color: '#3949AB',
    fontSize: 16,
    fontWeight: '600',
  },
  gradientButton: {
    flex: 1,
    borderRadius: 25,
    marginLeft: 8,
  },
  bookButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MyLabCartscreen;