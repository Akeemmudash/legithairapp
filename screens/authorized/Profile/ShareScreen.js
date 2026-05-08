


import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Share } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'expo';
import * as Clipboard from 'expo-clipboard';
import { ToastAndroid } from 'react-native';
import { Colors } from '../../../utilities/colors';
import CustomButton from '../../../components/CustomButton';
import Back from '../../../components/Back';
import MainContainer from '../../../components/MainContainer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFetchDashboardsQuery } from '../../../redux/features/product/productApi';
import StatusModal from '../../../components/StatusModal';
import { useTranslate } from '../../../utilities/hooks/useTranslate';

const ShareScreen = ({ route }) => {

  const { data: dashboardData, error: dashboardError, isLoading: dashboardLoading } = useFetchDashboardsQuery();

  useEffect(() => {
    if (dashboardData) {
    }
  }, [dashboardData]);

  const website_link = dashboardData?.website_link;

  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ icon: '', message: '', buttonColor: "" });
  const handleCloseModal = () => {
    setModalAlertVisible(false);
  };


  const copyToClipboard = () => {
    Clipboard.setString(website_link);
    setModalContent({
      icon: 'checkmark-circle-outline',
      message: 'Website Link has been copied!',
      buttonColor: Colors.Orange,
      iconColor: Colors.Orange
  });
  setModalAlertVisible(true);
  };



  const onShare = async () => {
    try {
      const result = await Share.share({
        message: (`Invite Friends: ` + '\n' + website_link),
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch {
    }
  }


  const texts = [
    "Invite Friend",
   "Copy",
   "Invite Your Friends"
  ];

  const translate = useTranslate(texts);

  return (
    <MainContainer>

      <View>
        <Back title={translate("Invite Friend")} />
      </View>
      <View style={{ marginTop: 30, alignContent: 'center', alignSelf: 'center' }}></View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: Colors.Orange,
            fontSize: 15,
            fontWeight: '400',
            borderRadius: 10,
            textAlign: "center",
            fontFamily: "Poppins",
            borderWidth: 1,
            borderColor: Colors.Orange,
            padding: 5
          }}
        >
          {website_link}
        </Text>
        <TouchableOpacity
          style={styles.buttonWishlist}
          activeOpacity={0.6}
          onPress={copyToClipboard}
        >
          <Text style={{ color: Colors.Orange, fontSize: 12, fontWeight: "500", fontFamily: "Poppins" }}>{translate("Copy")}</Text>
          <Ionicons name="copy-outline" size={15} color={Colors.Orange} style={{ marginLeft: 1 }} />
        </TouchableOpacity>
      </View>


      <View style={{ marginTop: 20 }}></View>
      <CustomButton
        title={translate("Invite Your Friends")}
        onPress={onShare}
        borderColor={Colors.Orange}
        color={Colors.Orange}
      />

      <StatusModal
        visible={modalAlertVisible}
        onClose={handleCloseModal}
        icon={modalContent.icon}
        message={modalContent.message}
        buttonColor={modalContent.buttonColor}
        iconColor={modalContent.iconColor}
      />
    </MainContainer>
  );
};

export default ShareScreen;

const styles = StyleSheet.create({
  ScreenStyle: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  buttonWishlist: {
    // flex: 1,
    // margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: Colors.Orange,
    borderWidth: 1,
    flexDirection: "row"
  },
});