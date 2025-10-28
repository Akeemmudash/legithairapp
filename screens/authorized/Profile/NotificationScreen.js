import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import MainContainer from '../../../components/MainContainer';
import Back from '../../../components/Back';
import { Colors } from '../../../utilities/colors';
import { FlatList } from 'react-native-gesture-handler';

const NotificationScreen = () => {
  const [settings, setSettings] = useState({
    "Sound": false,
    "Vibration": false,
    "New Product Available": false,
    "New Service Available": false,
    "Invites Friends": true,
  });

  const SettingsList = [
    {
      id: 1,
      title: "Sound",
    },
    {
      id: 2,
      title: "Vibration",
    },
    {
      id: 3,
      title: "New Product Available",
    },
    {
      id: 4,
      title: "New Service Available",
    },
    {
      id: 5,
      title: "Invites Friend",
    },
  ];

  const toggleSwitch = (title) => {
    setSettings((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };

  return (
    <MainContainer>
      <Back title={"Notification"} />

      <FlatList
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={SettingsList}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
              <View style={styles.CardContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-around", alignContent: "center", alignItems: "center" }}>
                    <View style={{ marginHorizontal: 5 }}>
                      <Text style={{ color: Colors.Black_00, fontWeight: "600", fontSize: 14 }}>{item?.title} </Text>
                    </View>
                  </View>
                  <View style={{ justifyContent: "center" }}>
                    <Switch
                      value={settings[item.title]}
                      onValueChange={() => toggleSwitch(item.title)}
                      trackColor={{ false: Colors.Ash, true: Colors.Orange }}
                      thumbColor={false ? '#f5dd4b' : Colors.White}
                    />
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

export default NotificationScreen;

const styles = StyleSheet.create({
  CardContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 5,
    paddingVertical: 11,
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.Gray,
  },

});
