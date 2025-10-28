import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../utilities/colors';

const HorizontalDashComponent = ({text}) => {
  return (
    <View style={styles.container}>
      < View style={styles.dash}/>
      <Text style={styles.subText}>{text}</Text>
      < View style={styles.dash}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: "center",
    alignContent: "center"
  },
  dash: {
    flex: 1,
    width: '100%',
    height: 1,
    backgroundColor: Colors.Black,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.Black,
    fontFamily: "Poppins"
  },

  subText: {
    fontSize: 18,
    color: Colors.Black,
    fontWeight: '600',
    fontFamily: "Poppins", 
},
  
});

export default HorizontalDashComponent;
