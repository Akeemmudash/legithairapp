import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MainContainer from "../../../components/MainContainer";
import Back from "../../../components/Back";
import ArrowForward from "../../../assets/svg/ArrowForward.svg";
import { Colors } from "../../../utilities/colors";
import ROUTES from "../../../Navigation/routes";
import { FlatList } from "react-native-gesture-handler";
import { useTranslate } from "../../../utilities/hooks/useTranslate";
// import ArrowForward from "../../../assets/svg/ArrowForward.svg"

const SecurityScreen = ({}) => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    "Remember Me": false,
    FingerPrint: false,
    "Face ID": false,
  });

  const texts = ["Change Password", "Update Profile", "Updating...", "Proceed"];

  const translate = useTranslate(texts);

  const SettingsList = [
    {
      id: 1,
      title: translate("Change Password"),
    },
  ];

  const toggleSwitch = (title) => {
    setSettings((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };

  const handlePress = (title) => {
    if (title === "Change Password") {
      navigation.navigate(ROUTES.UPDATE_SCREEN);
    } else {
      toggleSwitch(title);
    }
  };

  return (
    <MainContainer>
      <Back title={translate("Security")} />

      <FlatList
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={SettingsList}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => handlePress(item.title)}>
              <View style={styles.CardContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ marginHorizontal: 5 }}>
                      <Text
                        style={{
                          color: Colors.Black_00,
                          fontWeight: "600",
                          fontSize: 14,
                          fontFamily: "Poppins",
                        }}
                      >
                        {item?.title}{" "}
                      </Text>
                    </View>
                  </View>
                  <View style={{ justifyContent: "center" }}>
                    {item.title === "Change Password" ? (
                      <ArrowForward />
                    ) : (
                      <Switch
                        value={settings[item.title]}
                        onValueChange={() => toggleSwitch(item.title)}
                        trackColor={{ false: Colors.Ash, true: Colors.Orange }}
                        thumbColor={false ? "#f5dd4b" : Colors.White}
                      />
                    )}
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

export default SecurityScreen;

const styles = StyleSheet.create({
  CardContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 1,
    paddingVertical: 11,
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.Gray,
  },
});
