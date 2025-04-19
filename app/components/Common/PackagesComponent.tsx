import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageSourcePropType,
  } from 'react-native';
  import React from 'react';
  import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../../utils/SharedImages';
import { useNavigation } from '@react-navigation/native';
  const {width, height} = Dimensions.get('window');

  interface PackageItem {
    title: string;
    description: string;
    tests: string;
    price: number;
    recommended?: boolean;
  }
  
  interface PackageSection {
    section: string;
    packages: PackageItem[];
  }
  
  interface PackagesComponentProps {
    packageData: PackageSection[];
    categoryIcons: CategoryIconItem[];
  }
  
  interface CategoryIconItem {
    label: string;
    color: string;
    icon: ImageSourcePropType;
  }
  

  
  const PackagesComponent: React.FC<PackagesComponentProps> = ({ packageData,categoryIcons }) => {
      const navigation = useNavigation()
    return (
      <>
            <ScrollView
              horizontal
              style={styles.iconRow}
              showsHorizontalScrollIndicator={false}>
              {categoryIcons.map((item, index) => (
                <TouchableOpacity key={index} style={styles.iconContainer}>
                  <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
                    <Image
                      source={item.icon}
                      style={{
                        width: 60,
                        height: 60,
                        resizeMode: 'contain',
                        marginRight: 5,
                      }}
                    />
                  </View>
                  <Text >{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
        {packageData.map((section, index) => (
          <View key={index} style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
              {section.packages.map((item, index) => (
                <View key={index} style={styles.packageCard}>
                  {item.recommended && (
                    <View style={styles.recommendedBadge}>
                      <Text style={{ color: '#fff', fontSize: 12 }}>
                        Recommended For You
                      </Text>
                    </View>
                  )}
                  <View style={styles.contentContainer}>
                    <View>
                      <Text style={styles.title}>{item.title}</Text>
                      <View style={styles.sampleInfo}>
                        <Text style={styles.sampleText}>{item.description}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            backgroundColor: '#fff',
                            marginVertical: 10,
                            borderRadius: 10,
                            paddingHorizontal: 8,
                          }}>
                          <Image source={IMAGES.testtube} style={styles.testTubeIcon} />
                          <Text style={styles.timeText}>{item.tests}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.priceContainer}>
                      <TouchableOpacity onPress={() => navigation.navigate('TestDetailsScreen')}>
                        <LinearGradient
                          colors={['#1E3989', '#9B71AA', '#87C699']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={styles.addButton}>
                          <Text style={styles.buttonText}>Add to Lab</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <View>
                        <Text style={styles.price}>SAR {item.price}</Text>
                        <Text style={styles.originalPrice}>SAR2499</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        ))}
      </>
    );
  };
  
  const styles = StyleSheet.create({
    iconRow:{marginTop:10},
    sectionTitle: {
      color:"#00071A",
      fontSize: 18,
      fontWeight: 'bold',
      marginHorizontal: 10,
      marginTop: 20,
    },
    scrollRow: {
      marginVertical: 10,
    },
    packageCard: {
      width: width - 100,
      marginHorizontal: 8,
      padding: 16,
      backgroundColor: '#C8DFFF',
      borderRadius: 12,
      // marginBottom: 16,
    },
    recommendedBadge: {
      position: 'absolute',
      backgroundColor: '#1E3989',
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
      alignSelf: 'flex-start',
      // marginBottom: 12,
    },

    // PackageScreen
    recommendedText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      marginBottom: 16,
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    contentContainer: {
      gap: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: '#00071A',
      marginTop: 20,
      marginBottom: 8,
    },
    sampleInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    sampleText: {
      fontSize: 13,
      color: '#3F4254',
    },
    dotContainer: {
      paddingHorizontal: 8,
      justifyContent: 'center',
    },
    dot: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: '#666',
    },
    testTubeIcon: {
      width: 15,
      height: 15,
      resizeMode: 'contain',
    },
    timeText: {
      fontSize: 13,
      color: '#00071A',
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 4,
    },
    price: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
    },
    originalPrice: {
      fontSize: 13,
      color: '#666',
      textDecorationLine: 'line-through',
    },
    addButton: {
      borderRadius: 30,
      padding: 14,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
    },
    iconContainer: {
      alignItems: 'center',
      marginRight: 20,
    },
    iconCircle: {
      justifyContent:"center",
      alignItems:"center",
      width: 85,
      height: 85,
      borderRadius: 50,
      marginBottom: 5,
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 6,
    },
    iconSmall: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
  });
  
  export default PackagesComponent;
  