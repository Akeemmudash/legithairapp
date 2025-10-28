// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import ProductScreen from '../screens/ProductScreen';
// import { ActivityIndicator, Text } from 'react-native';
// import { useFetchCategoriesQuery } from '../redux/features/product/productApi';

// const Drawer = createDrawerNavigator();

// const generateScreenOptions = (name) => ({
//   drawerLabel: name,
// });

// const DrawerNavigator = () => {
//   const { data: categories, error, isLoading } = useFetchCategoriesQuery();

//   if (isLoading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   if (error) {
//     return <Text>Error loading categories</Text>;
//   }

//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         {categories?.map(category => (
//           <Drawer.Screen
//             key={category.id}
//             name={category.name}
//             component={ProductScreen}
//             initialParams={{ categoryId: category.id }}
//             options={generateScreenOptions(category.name)}
//           />
//         ))}
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

// export default DrawerNavigator;
