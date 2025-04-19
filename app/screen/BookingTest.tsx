import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AllComponent from '../components/Common/AllComponent';
import PackagesComponent from '../components/Common/PackagesComponent';
import TestsComponent from '../components/Common/IndividualtestsComponent';
import UploadComponent from '../components/Common/UploadComponent';
import { IMAGES } from '../utils/SharedImages';
import { useRoute } from '@react-navigation/native';


const categories = [
    { label: 'All' },
    { label: 'Packages' },
    { label: 'Individual tests' },
    { label: 'Upload prescription' },
  ];


const categoryIcons = [
    { label: 'Heart', color: '#FFF5F8', icon:IMAGES.Heart},
    { label: 'Bones', color: '#E8FFF3', icon:IMAGES.Bones},
    { label: 'Kidney', color: '#FFF9F4', icon:IMAGES.kidney },
    { label: 'Liver', color: '#FFF8DD', icon:IMAGES.liver },
    { label: 'Colon', color: '#FFF8DD', icon:IMAGES.Colon},
    { label: 'Lungs', color: '#FFF8DD', icon:IMAGES.Lungs},
    { label: 'Thyroid', color: '#F1FAFF', icon:IMAGES.Thyroid},
    { label: 'Blood', color: '#FFF9F4', icon:IMAGES.BloodDrop },

    
  ]

const packageSections = [
  { 
  
    section: 'Full Body Health',
    packages: [
      {
        packid:"1",
        title: 'Full Body Checkup - Advanced',
        description: 'Home sample collection',
        price: '1799',
        originalPrice: '2499',
        recommended: true,
        tests: 15,
      },
      {
        packid:"2",
        title: 'Full Body Checkup - Advanced',
        description: 'Home sample collection',
        price: '1799',
        originalPrice: '2499',
        recommended: true,
        tests: 15,
      },
      {
        packid:"3",
        title: 'Full Body Checkup - Advanced',
        description: 'Home sample collection',
        price: '1799',
        originalPrice: '2499',
        recommended: true,
        tests: 15,
      },
    ],
  },
  {  
    section: 'Diabetes',
    packages: [
      {
        packid:"4",
        title: 'Diabetes Screening',
        description: 'Home sample collection',
        price: '1799',
        originalPrice: '2499',
        recommended: true,
        tests: "03",
      },
      {
        packid:"5",
        title: 'Diabetes Screening',
        description: 'Home sample collection',
        price: '1799',
        originalPrice: '2499',
        recommended: true,
        tests: "03",
      },
    ],
  },
  {
    section: 'Thyroid',
    packages: [
      {
        packid:"6",
        title: 'Advanced Thyroid Package',
        description: 'Home sample collection',
        price: '1799',
        originalPrice: '2499',
        recommended: false,
        tests: "06",
      },
      { 
        packid:"7",
        title: 'Advanced Thyroid Package',
        description: 'Home sample collection',
        price: '1799',
        originalPrice: '2499',
        recommended: false,
        tests: "06",
      },
    ],
  },
];


const screenWidth = Dimensions.get('window').width;
const CategoryButton = ({ label,index, activeCategoryIndex,setActiveCategoryIndex }) => (
  <TouchableOpacity  onPress={() => setActiveCategoryIndex(index)} style={[styles.categoryButton, activeCategoryIndex  && styles.activeCategory]}>
    <Text style={[styles.categoryText, activeCategoryIndex && styles.activeCategoryText]}>{label}</Text>
  </TouchableOpacity>
);


export default function BookingTest() {
  const route = useRoute();
  const index = route?.params?.index ?? 0;
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(index);

    const renderComponent = () => {
        switch (activeCategoryIndex) {
          case 0: return <AllComponent  packageData ={packageSections} categoryIcons={categoryIcons}/>;
          case 1: return <PackagesComponent packageData ={packageSections} categoryIcons={categoryIcons}/>;
          case 2: return <TestsComponent categoryIcons={categoryIcons}/>;
          case 3: return <UploadComponent />;
          default: return null;
        }
      };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with search */}
      <View style={styles.header}>

        <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
          {/* Search Container */}
          <View style={[styles.searchContainer, {width: screenWidth * 0.8}]}>
            <Image
              source={IMAGES.Search}
              resizeMode="contain"
              style={styles.icon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for tests or health packages"
              placeholderTextColor="#7E8299"
            />
            <Image
              source={IMAGES.searchInsta}
              resizeMode="contain"
              style={styles.icon}
            />
          </View>

          {/* Cart Button - Always visible */}
          <TouchableOpacity style={styles.cartButton}>
                    <View style={styles.cartContainer}>
                        <Image source={IMAGES.Cart} resizeMode="contain" />
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>1</Text>
                      </View>
                    </View>
          {/* <Image
              source={IMAGES.Cart}
              resizeMode="contain"
              style={styles.icon}
            />
            <View style={styles.cartBadge}>
                
              <Text style={styles.cartBadgeText}>1</Text>
            </View> */}
          </TouchableOpacity>
        </View>
      </View>
      {/* Categories - horizontal */}
      <View style={styles.categories}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item, index) => (
            <CategoryButton
              key={index}
              label={item.label}
              // icon={item.icon}
              index={index}
              activeCategoryIndex={activeCategoryIndex === index}
              setActiveCategoryIndex={setActiveCategoryIndex}
            />
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        <View style={{flex: 1}}>{renderComponent()}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    backgroundColor: '#fff',
    paddingHorizontal:10
},
  categories:{paddingBottom:10},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth:1,
    borderColor:"#EFF2F5",
    borderRadius: 25,
    marginRight: 10,
    padding:8
  },
  searchInput: {
    flex: 1,
    justifyContent:"space-around",
    color: '#000',
    marginLeft: 8,
    fontSize: 16,
  },
  icon: {
    width: 25,
    height: 25,
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
  cartButton: {
    width: 40,
    height: 40,
    backgroundColor: '#EFF2F5',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: '#1E3989',
    borderRadius: 15,
    paddingHorizontal: 5,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 11,
  },
  scrollRow: {
    marginVertical: 10,
  },
 
  categoryText: {
    color: '#3F4254',
  },
  
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 30,
    backgroundColor: '#F1FAFF',
    marginRight: 10,
  },
  activeCategory: {
    backgroundColor: '#1E3989',
    
  },
  activeCategoryText: {
    color: '#fff',
  },
  categoryText: {
    fontSize: 14,
  }
 
});
