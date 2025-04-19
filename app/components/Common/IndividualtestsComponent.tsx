import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageSourcePropType,
  } from 'react-native';
  import React from 'react';

  interface CategoryIconItem {
    label: string;
    color: string;
    icon: ImageSourcePropType;
  }
  
  interface TestsComponentProps {
    categoryIcons: CategoryIconItem[];
  }
  
  const TestsComponent: React.FC<TestsComponentProps> = ({ categoryIcons }) => {
    return (
      <>
        <Text style={styles.sectionTitle}>Individual tests</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {categoryIcons.map((item, index) => (
            <TouchableOpacity key={index} style={styles.iconContainer}>
              <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
                <Image
                  source={item.icon}
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain',
                    marginRight: 5,
                  }}
                />
                <Text style={styles.iconLabel}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    iconRow: {flex:1,marginTop: 10,flexDirection:"row", flexWrap: 'wrap'},
  
    iconContainer: {
      alignItems: 'center',
      marginRight: 10,
    },
  
    iconCircle: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 85,
      height: 85,
      borderRadius: 50,
      marginBottom: 20,
    },
    iconLabel: {
      fontSize: 12,
      textAlign: 'center',
    },
    sectionTitle: {
      color:"#00071A",
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 8,
      marginBottom: 10,
    },
  });
  
  export default TestsComponent;
  