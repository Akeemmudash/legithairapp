
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import MainContainer from '../../../components/MainContainer';
import Back from '../../../components/Back';
import Cart from "../../../assets/svg/Cart.svg";
import Bell from "../../../assets/svg/Bell.svg";
import Lock from "../../../assets/svg/Lock.svg";
import Logout from "../../../assets/svg/Logout.svg";
import Message from "../../../assets/svg/Message.svg";
import Users from "../../../assets/svg/Users.svg";
import ArrowForward from "../../../assets/svg/ArrowForward.svg";
import { Colors } from '../../../utilities/colors';
import ROUTES from '../../../Navigation/routes';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearUser } from '../../../redux/features/auth/authSlice';
import { useDeleteAccountMutation } from '../../../redux/features/profile/profileApi';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import StatusModal from '../../../components/StatusModal';
import { clearCart } from '../../../redux/features/cart/cartSlice';
import { clearSavedProducts } from '../../../redux/features/product/productSlice';
import { FlatList } from 'react-native-gesture-handler';
import { toggleLanguage } from '../../../redux/features/languageSlice';
import { useTranslate } from '../../../utilities/hooks/useTranslate';

const ProfileScreen = ({ navigation }) => {
  const { full_name, phone, email } = useSelector(state => state.userAuth);
  const language = useSelector(state => state.language.language);
  console.log("language", language);
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ icon: '', message: '', buttonColor: "" });

  const handleCloseModal = () => {
    setModalAlertVisible(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      setModalContent({
        icon: 'checkmark-circle-outline',
        message: translate('Your account has been successfully deleted!'),
        buttonColor: Colors.Orange,
        iconColor: Colors.Orange
      });
      setModalAlertVisible(true);

      dispatch(clearUser());
      navigation.navigate(ROUTES.WELCOMING);
    } catch (error) {
      console.log(error);
      setModalContent({
        icon: 'close-circle-outline',
        message: translate('Failed to delete account.'),
        buttonColor: Colors.Orange,
        iconColor: Colors.Orange
      });
      setModalAlertVisible(true);
    }
    setModalVisible(false);
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      dispatch(clearUser());
      dispatch(clearCart());
      navigation.navigate(ROUTES.SIGN_UP_SCREEN);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const texts = [
    "Profile",
    "My Orders",
    "Security",
    "Help & Support",
    "Invites Friends",
    "Language",
    "Logout",
    "Delete Account",
    "Your account has been successfully deleted!",
    "Failed to delete account."
  ];

  const translate = useTranslate(texts);

  const SettingsList = [
    {
      id: 1,
      title: translate("My Orders") || "My Orders",
      svg: <Cart />,
      link: ROUTES.MY_ORDERS
    },
    {
      id: 3,
      title: translate("Security") || "Security",
      svg: <Lock />,
      link: ROUTES.SECURITY_SCREEN
    },
    {
      id: 4,
      title: translate("Help & Support") || "Help & Support",
      svg: <Message />,
      link: ROUTES.SUPPORT_SCREEN
    },
    {
      id: 5,
      title: translate("Invites Friends") || "Invites Friends",
      svg: <Users />,
      link: ROUTES.SHARE_SCREEN
    },
    {
      id: 6,
      title: translate("Language") || "Language",
      svg: <Ionicons name="language-outline" size={24} color={Colors.Orange} />,
      hasSwitch: true,
      switchValue: language === 'fr',
      onSwitchChange: () => dispatch(toggleLanguage())
    },
    {
      id: 7,
      title: translate("Logout") || "Logout",
      svg: <Logout />,
      onPressed: logout
    },
    {
      id: 8,
      title: translate("Delete Account") || "Delete Account",
      svg: <Logout />,
      onPressed: () => setModalVisible(true)
    },
  ];

  return (
    <MainContainer>
      <Back title={translate("Profile")} />
      <View style={[styles.container, styles.shadow]}>
        <View style={styles.row}>
          <Ionicons name="person-outline" size={50} color={Colors.Orange} style={{ marginRight: 1 }} />
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.UNPADTE_PROFILE_SCREEN)}>
            <View>
              <Text style={{ color: Colors.Black_00, fontWeight: "600", fontSize: 14, fontFamily: "Poppins", }}>{full_name}</Text>
              <Text style={{ color: Colors.Black_00, fontWeight: "400", fontSize: 14, fontFamily: "Poppins", }}>{email}</Text>
              <Text style={{ color: Colors.Black_00, fontWeight: "400", fontSize: 14, fontFamily: "Poppins", }}>{phone}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={SettingsList}
        renderItem={({ item }) => {
          return (
            <View>
              {item.hasSwitch ? (
                // Render item with Switch
                <View style={styles.CardContainer}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignContent: "center", alignItems: "center" }}>
                      <View style={styles.svgContainer}>
                        {item?.svg}
                      </View>
                      <View style={{ marginHorizontal: 5 }}>
                        <Text style={{ color: Colors.Black_00, fontWeight: "600", fontSize: 14, fontFamily: "Poppins", }}>{item?.title} </Text>
                      </View>
                    </View>
                    <Switch
                      value={item.switchValue}
                      onValueChange={item.onSwitchChange}
                      trackColor={{ false: "#767577", true: Colors.Orange }}
                      thumbColor={item.switchValue ? Colors.Orange : "#f4f3f4"}
                    />
                  </View>
                </View>
              ) : (
                // Render item without Switch and handle onPress
                <TouchableOpacity
                  onPress={() => item.onPressed ? item.onPressed() : navigation.navigate(item.link)}
                >
                  <View style={styles.CardContainer}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-around", alignContent: "center", alignItems: "center" }}>
                        <View style={styles.svgContainer}>
                          {item?.svg}
                        </View>
                        <View style={{ marginHorizontal: 5 }}>
                          <Text style={{ color: Colors.Black_00, fontWeight: "600", fontSize: 14, fontFamily: "Poppins", }}>{item?.title} </Text>
                        </View>
                      </View>
                      {(item.title !== translate("Help & Support") && item.title !== translate("Invites Friends") && item.title !== translate("Logout")) && (
                        <View style={{ justifyContent: "center" }}>
                          <ArrowForward />
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />

      <ConfirmDeleteModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDeleteAccount}
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

export default ProfileScreen;

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
    alignItems: "center"
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
