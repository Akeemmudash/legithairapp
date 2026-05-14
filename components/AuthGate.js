import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MainContainer from "./MainContainer";
import { Colors } from "../utilities/colors";
import ROUTES from "../Navigation/routes";

const featureCopy = {
  cart: {
    icon: "cart-outline",
    title: "Sign in to use your cart",
    body: "Log in or create an account to save items and check out.",
  },
  wishlist: {
    icon: "heart-outline",
    title: "Sign in to save favorites",
    body: "Log in or create an account to keep a wishlist of products you love.",
  },
  profile: {
    icon: "person-outline",
    title: "Sign in to view your profile",
    body: "Log in or create an account to manage your details and orders.",
  },
  notifications: {
    icon: "notifications-outline",
    title: "Sign in to see notifications",
    body: "Log in or create an account to receive order and account updates.",
  },
  default: {
    icon: "lock-closed-outline",
    title: "Sign in to continue",
    body: "Log in or create an account to use this feature.",
  },
};

const AuthGate = ({ feature = "default", children }) => {
  const token = useSelector((state) => state.userAuth.token);
  const navigation = useNavigation();

  if (token) {
    return children;
  }

  const copy = featureCopy[feature] ?? featureCopy.default;

  const openAuth = (screen) =>
    navigation.navigate(ROUTES.AUTH_STACK, screen ? { screen } : undefined);

  return (
    <MainContainer>
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <Ionicons name={copy.icon} size={42} color={Colors.Orange} />
        </View>
        <Text style={styles.title}>{copy.title}</Text>
        <Text style={styles.body}>{copy.body}</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => openAuth(ROUTES.LOGIN_SCREEN)}
          activeOpacity={0.7}
        >
          <Text style={styles.primaryButtonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => openAuth(ROUTES.SIGN_UP_SCREEN)}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>Create account</Text>
        </TouchableOpacity>
      </View>
    </MainContainer>
  );
};

export default AuthGate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  iconWrapper: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Orange_01,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.Black_00,
    fontFamily: "Poppins",
    textAlign: "center",
    marginBottom: 8,
  },
  body: {
    fontSize: 13,
    color: Colors.Gray_03,
    fontFamily: "Poppins",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 18,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: Colors.Orange,
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: Colors.White,
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "Poppins",
  },
  secondaryButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.Orange,
    backgroundColor: Colors.White,
  },
  secondaryButtonText: {
    color: Colors.Orange,
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "Poppins",
  },
});
