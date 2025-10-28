// import React, { useEffect } from 'react';
// import { View, ScrollView, Image, Dimensions, StyleSheet } from 'react-native';
// import { useFetchDashboardsQuery } from '../redux/features/product/productApi';

// // Adjust the paths as needed
// const images = [
//   require('../assets/images/Feature1.png'),
//   require('../assets/images/Feature2.png'),
// ];

// const { width } = Dimensions.get('window');

// const { data: dashboardData, error: dashboardError, isLoading: dashboardLoading } = useFetchDashboardsQuery();
// useEffect(() => {
//     if (dashboardData) {
//     }
// }, [dashboardData]);

// const Saved = dashboardData?.saved_product
// console.log("Saved", Saved);

// const ImageSlider = () => {
//   return (
//     <View style={styles.container}>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         pagingEnabled
//       >
//         {images.map((image, index) => (
//           <Image
//             key={index}
//             source={image}
//             style={styles.image}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: width,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: 350,
//     height: 200, 
//     borderRadius: 20,
//     marginRight: 5
//   },
// });

// export default ImageSlider;

import React, { useEffect } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet, Text } from 'react-native';
import { useFetchDashboardsQuery } from '../redux/features/product/productApi';
import { Colors } from '../utilities/colors';

const { width } = Dimensions.get('window');



const ImageSlider = () => {
  const { data: dashboardData, error: dashboardError, isLoading: dashboardLoading } = useFetchDashboardsQuery();

  useEffect(() => {
    if (dashboardData) {
    }
  }, [dashboardData]);

  if (dashboardLoading) {
    return <View><Text>Loading...</Text></View>;
  }

  if (dashboardError) {
    return <View><Text>Error loading dashboard data.</Text></View>;
  }

  const images = dashboardData?.banner_image;
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{uri: image?.filename}}
            style={styles.image}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 350,
    height: 200, 
    borderRadius: 20,
    marginRight: 5, 
    borderColor: Colors.Orange,
    borderWidth: 2
  },
});

export default ImageSlider;

