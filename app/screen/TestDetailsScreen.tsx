import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../utils/SharedImages';
import { useNavigation, useRoute } from '@react-navigation/native';


const TestDetailsScreen = () => {
     const navigation = useNavigation();

  const testData = {
    id: '1',
    name: 'Basic Health Checkup',
    price: 'SAR 999',
    resultTime: '24 hr',
    description: 'A Basic Health Checkup helps in the early detection of common health issues like infections, blood disorders, diabetes, and overall body functioning.',
    fasting: {
      food: false,
      drink: false,
      water: true,
    },
    beforeFood: [
      'CBC',
      'Blood Sugar',
      'Urine Test',
      'ESR',
    ],
    afterFood: [
      'Blood Pressure',
      'BMI',
    ],
    sampleRequired: [
      'Blood Sample',
      'Urine Sample',
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft} >
          <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
            <Image source={IMAGES.back} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Test Details</Text>
        </View>
        <View style={styles.cartContainer}>
            <Image source={IMAGES.Cart} resizeMode="contain" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Test Card */}
        <View style={styles.testCard}>
          <View style={styles.testCardContent}>
            <View style={styles.iconContainer}>
              <Image source={IMAGES.Black} resizeMode="contain" />
            </View>
            <View style={styles.testInfo}>
              <Text style={styles.testName}>{testData.name}</Text>
              <View style={styles.testMetaInfo}>
                <Text style={styles.testPrice}>{testData.price}</Text>
                <View style={styles.divider} />
                <Text style={styles.resultTime}>Result {testData.resultTime}</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* About this test */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this test</Text>
          <Text style={styles.description}>{testData.description}</Text>
        </View>
        
        {/* Fasting */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fasting</Text>
          <View style={styles.fastingContainer}>
            <View style={styles.fastingItem}>
              <View style={[styles.fastingIconContainer, !testData.fasting.food && styles.notAllowed]}>
              <Image source={IMAGES.food} resizeMode="contain" style={{marginBottom:20}}/>
              {!testData.fasting.food && <Image source={IMAGES.close} resizeMode="contain"/>}
              </View>
            </View>
            
            <View style={styles.fastingItem}>
              <View style={[styles.fastingIconContainer, !testData.fasting.drink && styles.notAllowed]}>
              <Image source={IMAGES.Tea} resizeMode="contain" style={{marginBottom:20}}/>
              {!testData.fasting.drink && <Image source={IMAGES.close} resizeMode="contain"/>}
              </View>
            </View>
            
            <View style={styles.fastingItem}>
              <View style={[styles.fastingIconContainer, !testData.fasting.water && styles.notAllowed]}>
              <Image source={IMAGES.water} resizeMode="contain" style={{marginBottom:20}}/>
              {testData.fasting.water && <Image source={IMAGES.check} resizeMode="contain"/>}
              </View>
            </View>
          </View>
        </View>
        
        {/* Test Includes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Includes</Text>
          
          <Text style={styles.subSectionTitle}>Before food</Text>
          <View style={styles.testList}>
            {testData.beforeFood.map((test, index) => (
              <View key={index} style={styles.testItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.testItemText}>{test}</Text>
              </View>
            ))}
          </View>
          
          <Text style={styles.subSectionTitle}>After food</Text>
          <View style={styles.testList}>
            {testData.afterFood.map((test, index) => (
              <View key={index} style={styles.testItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.testItemText}>{test}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Sample Required */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sample Required</Text>
          <View style={styles.testList}>
            {testData.sampleRequired.map((sample, index) => (
              <View key={index} style={styles.testItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.testItemText}>{sample}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.buttonSpacing} />
      </ScrollView>
      
      {/* Add to Lab Button */}
      <View style={styles.buttonContainer}>
        <LinearGradient
           colors={['#1E3989', '#9B71AA', '#87C699']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("MyLabCartscreen")}>
            <Text style={styles.buttonText}>Add to Lab</Text>
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
    backgroundColor: 'white',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  cartContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#3949AB',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  testCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    borderWidth:1,
    borderColor:"#E4E6EF"
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 2,
  },
  testCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 30,
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
    color:"#00071A"
  },
  testMetaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testPrice: {
    fontSize: 14,
    color: '#3F4254',
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: '#00071A',
    marginHorizontal: 8,
  },
  resultTime: {
    fontSize: 14,
    color: '#3F4254',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#00071A',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#3F4254',

  },
  fastingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,

  },
  fastingItem: {
    alignItems: 'center',
    marginRight: 24,
   
  },
  fastingIconContainer: {
    width: 40,
    height: 90,
    borderRadius: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
   
  },
  notAllowed: {
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
  },
  notAllowedIcon: {
    marginTop: 4,
  },
  allowedIcon: {
    marginTop: 4,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
   color: '#00071A',
  },
  testList: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#00071A',
  },
  testItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    // marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 20,
    marginRight: 8,
    color: '#00071A',
  },
  testItemText: {
    fontSize: 14,
    color: '#3F4254',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: 'white',
    // borderTopWidth: 1,
    // borderTopColor: '#EEE',
  },
  gradientButton: {
    borderRadius: 25,
  },
  button: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSpacing: {
    height: 80,
  },
});

export default TestDetailsScreen;