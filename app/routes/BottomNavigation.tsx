// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Image } from 'react-native';
// import { IMAGES } from '../utils/SharedImages';
// import HomeScreen from '../screen/HomeScreen';
// import TrendScreen from '../screen/TrendScreen';
// import ProfileScreen from '../screen/ProfileScreen';
// import BookingsScreen from '../screen/BookingScreen';

// const Bottom = createBottomTabNavigator();

// const TabIcon = ({ source }: { source: any }) => (
//     <Image
//         source={source}
//         style={{ width: 24, height: 24, resizeMode: 'contain' }}
//     />
// );

// const BottomNavigation = () => {
//     return (
//         <Bottom.Navigator
//             screenOptions={{
//                 headerShown: false,
//                 tabBarShowLabel: true,
//                 tabBarLabelStyle: {
//                     fontSize: 12,
//                     fontWeight: '600',
//                 },
//                 tabBarStyle: {
//                     backgroundColor: '#ffffff',
//                     height: 60,
//                     paddingBottom: 5,
//                 },
//             }}
//         >
//             <Bottom.Screen
//                 name="Home"
//                 component={HomeScreen}
//                 options={{
//                     tabBarLabel: 'Home',
//                     tabBarIcon: ({ focused }) => (
//                         <TabIcon source={IMAGES.BottomHome} />
//                     ),
//                 }}
//             />
//             <Bottom.Screen
//                 name="Booking"
//                 component={BookingsScreen}
//                 options={{
//                     tabBarLabel: 'Booking',
//                     tabBarIcon: ({ focused }) => (
//                         <TabIcon source={IMAGES.BottomCalender} />
//                     ),
//                 }}
//             />
//             <Bottom.Screen
//                 name="Trend"
//                 component={TrendScreen}
//                 options={{
//                     tabBarLabel: 'Trend',
//                     tabBarIcon: ({ focused }) => (
//                         <TabIcon source={IMAGES.BottomTrend} />
//                     ),
//                 }}
//             />
//             <Bottom.Screen
//                 name="Profile"
//                 component={ProfileScreen}
//                 options={{
//                     tabBarLabel: 'Profile',
//                     tabBarIcon: ({ focused }) => (
//                         <TabIcon source={IMAGES.BottomProfile} />
//                     ),
//                 }}
//             />
//         </Bottom.Navigator>
//     );
// };

// export default BottomNavigation;






// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Image, Text } from 'react-native';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/Store';
// import { FONT_FAMILY, FONT_SIZE } from '../utils/Constants';
// import HomeScreen from '../screen/HomeScreen';
// import BookingScreen from '../screen/BookingScreen';
// import TrendScreen from '../screen/TrendScreen';
// import { RouteProp, ParamListBase } from '@react-navigation/native';
// import ProfileScreen from '../screen/ProfileScreen';

// const Bottom = createBottomTabNavigator();

// const fallbackMenuItems = [
//   { code: 'BK', label: 'Home', component: HomeScreen },
//   { code: 'LT', label: 'Booking', component: BookingScreen },
//   { code: 'TT', label: 'Trend', component: TrendScreen },
//   { code: 'ST', label: 'Profile', component: ProfileScreen },
// ];

// const componentMap: Record<string, React.ComponentType<any>> = {
//   BK: HomeScreen,
//   LT: BookingScreen,
//   TT: TrendScreen,
//   ST: ProfileScreen,
// };

// const BottomNavigation = () => {
//   const appSettings = useSelector((state: RootState) => state.appsettings.appSettings);

//   const menuItems = appSettings?.[0]?.Menu_Items?.length
//     ? appSettings[0].Menu_Items.map((item: { Main_Menu_Code: string | number; Menu_Desc: any; Tab_Icon_url: any; Selected_Tab_Icon_Url: any; }) => ({
//         code: item.Main_Menu_Code,
//         label: item.Menu_Desc,
//         icon: item.Tab_Icon_url,
//         selectedIcon: item.Selected_Tab_Icon_Url,
//         component: componentMap[item.Main_Menu_Code],
//       }))
//     : fallbackMenuItems;

//   if (!menuItems.length) return null;

//   return (
//     <Bottom.Navigator
//       initialRouteName={menuItems[0].label}
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: { borderTopWidth: 0.3, borderTopColor: '#778899' },
//         tabBarLabelStyle: {
//           fontSize: FONT_SIZE.S,
//           fontFamily: FONT_FAMILY.fontFamilyAnekLatinMedium,
//         },
//       }}
//     >
//       {menuItems.map((item: { component: React.ComponentType<{}> | React.ComponentType<{ route: RouteProp<ParamListBase, any>; navigation: any; }>; label: unknown; selectedIcon: any; icon: any; }, index: React.Key | null | undefined) => {
//         if (!item.component) return null;
//         return (
//           <Bottom.Screen
//             key={index}
//             name={item.label}
//             component={item.component}
//             options={{
//               tabBarIcon: ({ focused }) => (
//                 <Image
//                   source={{ uri: focused ? item.selectedIcon || '' : item.icon || '' }}
//                   style={{ width: 20, height: 20, resizeMode: 'contain' }}
//                   onError={e => console.log('Image load error:', e.nativeEvent.error)}
//                 />
//               ),
//               tabBarLabel: ({ color }) => (
//                 <Text style={{
//                   color: 'black',
//                   fontSize: FONT_SIZE.S,
//                   fontFamily: FONT_FAMILY.fontFamilyAnekLatinRegular,
//                 }}>
//                   {item.label}
//                 </Text>
//               ),
//             }}
//           />
//         );
//       })}
//     </Bottom.Navigator>
//   );
// };

// export default BottomNavigation;



import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import HomeScreen from '../screen/HomeScreen';
import BookingScreen from '../screen/BookingScreen';
import TrendScreen from '../screen/TrendScreen';
import ProfileScreen from '../screen/ProfileScreen';

const Bottom = createBottomTabNavigator();

const fallbackMenuItems = [
  { code: 'BK', label: 'Home', component: HomeScreen },
  { code: 'LT', label: 'Booking', component: BookingScreen },
  { code: 'TT', label: 'Trend', component: TrendScreen },
  { code: 'ST', label: 'Profile', component: ProfileScreen },
];

const componentMap: Record<string, React.ComponentType<any>> = {
  BK: HomeScreen,
  LT: BookingScreen,
  TT: TrendScreen,
  ST: ProfileScreen,
};

const BottomNavigation = () => {
  const appSettings = useSelector((state: RootState) => state.appsettings.appSettings);

  const menuItems = appSettings?.[0]?.Menu_Items?.length
    ? appSettings[0].Menu_Items.map((item: { Main_Menu_Code: string | number; Menu_Desc: any; Tab_Icon_url: any; Selected_Tab_Icon_Url: any; }) => ({
        code: item.Main_Menu_Code,
        label: item.Menu_Desc,
        icon: item.Tab_Icon_url,
        selectedIcon: item.Selected_Tab_Icon_Url,
        component: componentMap[item.Main_Menu_Code],
      }))
    : fallbackMenuItems;

  if (!menuItems.length) return null;

  return (
    <Bottom.Navigator
      initialRouteName={menuItems[0].label}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,  
        tabBarStyle: { borderTopWidth: 0.3, borderTopColor: '#778899' },
      }}
    >
      {menuItems.map((item, index) => {
        if (!item.component) return null;
        return (
          <Bottom.Screen
            key={index}
            name={item.label}
            component={item.component}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={{ uri: focused ? item.selectedIcon || '' : item.icon || '' }}
                    style={{ width: 24, height: 24, resizeMode: 'contain' }}
                    onError={e => console.log('Image load error:', e.nativeEvent.error)}
                  />
                </View>
              ),
            }}
          />
        );
      })}
    </Bottom.Navigator>
  );
};

export default BottomNavigation;
