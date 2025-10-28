
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import MainContainer from '../../../components/MainContainer';
import Edit from "../../../assets/svg/Edit.svg";
import HalfStar from "../../../assets/svg/HalfStar.svg";
import Shield from "../../../assets/svg/Shield.svg";
import { Colors } from '../../../utilities/colors';
import ROUTES from '../../../Navigation/routes';
import { FlatList } from 'react-native-gesture-handler';

const NotificationMainScreen = ({navigation}) => {

  const SettingsList = [
    {
      id: 1,
      title: "Profile Sucessfully Edited",
      sub: "Check It Out",
      svg: <Edit />,
    },
    {
      id: 2,
      title: "New Products Avilable",
      sub: "Check It Out",
      svg: <HalfStar />,
    },
    {
      id: 3,
      title: "Account Verification Completed",
      sub: "Weldone!",
      svg: <Shield />,
    },
    {
      id: 4,
      title: "Password Updated",
      sub: "Keep it safe",
      svg: <Shield />,
    },
    {
      id: 5,
      title: "Password Updated",
      sub: "Keep it safe",
      svg: <Shield />,
    },
  ];

  return (
    <MainContainer>
      <Text style={{ fontSize: 16, fontWeight: "700", color: Colors.Black_00, paddingVertical: 10, fontFamily: "Poppins" }}>Notification</Text>


      <FlatList
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={SettingsList}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
             
            >
              <View style={styles.CardContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-around", alignContent: "center", alignItems: "center" }}>
                    <View style={styles.svgContainer}>
                      {item?.svg}
                    </View>
                    <View style={{ marginHorizontal: 5 }}>
                      <Text style={{ color: Colors.Black_00, fontWeight: "600", fontSize: 14, fontFamily: "Poppins" }}>{item?.title} </Text>
                      <Text style={{ color: Colors.Gray_04, fontWeight: "400", fontSize: 10, fontFamily: "Poppins" }}>{item?.sub} </Text>

                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </MainContainer>
  );
};

export default NotificationMainScreen;

const styles = StyleSheet.create({
  CardContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 5,
    paddingVertical: 11,
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.Gray,
  },
  container: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    padding: 16,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: "space-around",
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  svgContainer: {
    backgroundColor: "#F5AE5F",
    padding: 5,
    borderRadius: 8,
    alignContent: "center",
  },
});
