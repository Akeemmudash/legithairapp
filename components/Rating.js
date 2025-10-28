// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const Rating = ({ rating }) => {
//   const filledStars = Math.floor(rating);
//   const halfStar = rating % 1 >= 0.5;
//   const emptyStars = 5 - Math.ceil(rating);

//   return (
//     <View style={styles.ratingContainer}>
//       {[...Array(filledStars)].map((_, i) => (
//         <Icon key={`filled-${i}`} name="star" size={20} color="gold" />
//       ))}
//       {halfStar && <Icon name="star-half-full" size={20} color="gold" />}
//       {[...Array(emptyStars)].map((_, i) => (
//         <Icon key={`empty-${i}`} name="star-o" size={20} color="gold" />
//       ))}
//       <Text style={styles.ratingText}>({rating.toFixed(1)})</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   ratingText: {
//     marginLeft: 8,
//     fontSize: 16,
//     color: '#555',
//   },
// });

// export default Rating;


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../utilities/colors';

const Rating = ({ rating }) => {
  // Provide a default value of 0 if rating is null or undefined
  const validRating = rating != null ? Math.max(0, Math.min(5, rating)) : 0;
  
  // Calculate the number of filled stars, half stars, and empty stars
  const filledStars = Math.floor(validRating);
  const halfStar = validRating % 1 >= 0.5;
  const emptyStars = 5 - Math.ceil(validRating);

  return (
    <View style={styles.ratingContainer}>
      {[...Array(filledStars)].map((_, i) => (
        <Icon key={`filled-${i}`} name="star" size={15} color={Colors.Orange} />
      ))}
      {halfStar && <Icon name="star-half-full" size={15} color={Colors.Orange} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Icon key={`empty-${i}`} name="star-o" size={15} color={Colors.Orange} />
      ))}
      <Text style={styles.ratingText}>({validRating.toFixed(1)})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 8,
    color: '#555',
    fontFamily: "Poppins"
  },
});

export default Rating;

