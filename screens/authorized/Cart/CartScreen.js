import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import MainContainer from "../../../components/MainContainer";
import CustomButton from "../../../components/CustomButton";
import { Colors } from "../../../utilities/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Back from "../../../components/Back";
import ROUTES from "../../../Navigation/routes";
import { requireAuth } from "../../../utilities/requireAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "../../../redux/features/cart/cartSlice";
import { FlatList } from "react-native-gesture-handler";
import { useTranslate } from "../../../utilities/hooks/useTranslate";
import formatNaira from "../../../utilities/formatNaira";

const CartScreen = ({ route, navigation }) => {
  const [discountText, setDiscountText] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const token = useSelector((state) => state.userAuth.token);

  const handleRemoveItem = (id, selectedSize) => {
    dispatch(removeItem({ id, selectedSize }));
  };

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to clear all items from the cart?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => dispatch(clearCart()),
        },
      ],
    );
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const itemPrice =
      item?.selectedInch?.discount > 0
        ? item?.selectedInch?.discount
        : (item?.selectedInch?.price ?? item?.price);
    return sum + itemPrice * item.quantity;
  }, 0);

  const itemNames = cartItems.map((item) => item.name);

  const texts = [
    "Proceed",
    "Summary",
    "SubTotal",
    "Total",
    "Cart",
    "Inches",
    "Your cart is empty",
    "Browse our collection and add a few pieces you love.",
    "Start shopping",
    itemNames,
  ];

  const translate = useTranslate(texts);

  const renderItem = ({ item }) => (
    <View style={styles.shadowWrapper}>
      <View style={styles.Billcontent}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 12,
                color: Colors.Black_00,
                paddingVertical: 5,
                fontFamily: "Poppins",
              }}
            >
              {translate(item.name.split(" ").slice(0, 3).join(" "))}
            </Text>
            {/* <Text style={{ fontWeight: "600", fontSize: 12, color: Colors.Black_00, paddingVertical: 5, fontFamily: "Poppins" }}>{item.name.split(' ').slice(0, 3).join(' ')}</Text> */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {item.selectedInch && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 14,
                      color: Colors.Gray_03,
                      paddingVertical: 5,
                      marginRight: 5,
                      fontFamily: "Poppins",
                    }}
                  >
                    {translate("Inches")}
                  </Text>
                  <View style={styles.sizeButton}>
                    <Text style={{ color: Colors.White, textAlign: "center" }}>
                      {item.selectedInch.inche}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {item.selectedInch ? (
                  item.selectedInch.discount > 0 ? (
                    <>
                      <Text style={styles.price}>
                        {formatNaira(item.selectedInch.discount)}
                      </Text>
                      <Text style={styles.discountPrice}>
                        {formatNaira(item.selectedInch.price)}
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.price}>
                      {formatNaira(item.selectedInch.price)}
                    </Text>
                  )
                ) : (
                  <Text style={styles.price}>{formatNaira(item.price)}</Text>
                )}
              </View>

              <TouchableOpacity
                onPress={() => handleRemoveItem(item.id, item.selectedSize)}
              >
                <View style={styles.deleteButton}>
                  <Ionicons
                    name="trash-outline"
                    size={19}
                    color={Colors.Red}
                    style={{ marginRight: 1 }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  dispatch(
                    decrementQuantity({
                      id: item.id,
                      selectedSize: item.selectedSize,
                    }),
                  )
                }
                style={styles.quantityButton}
              >
                <Ionicons name="remove" size={16} color={Colors.White} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() =>
                  dispatch(
                    incrementQuantity({
                      id: item.id,
                      selectedSize: item.selectedSize,
                    }),
                  )
                }
                style={styles.quantityButton}
              >
                <Ionicons name="add" size={16} color={Colors.White} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  // An empty cart gets its own screen rather than an empty list: the summary
  // card and Proceed button are meaningless with nothing in the cart (they
  // showed a NGN 0 total and still let you reach checkout).
  if (cartItems.length === 0) {
    return (
      <MainContainer>
        <View style={{ flex: 1 }}>
          <Text style={styles.screenTitle}>{translate("Cart")}</Text>
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="cart-outline" size={52} color={Colors.Orange} />
            </View>
            <Text style={styles.emptyTitle}>
              {translate("Your cart is empty")}
            </Text>
            <Text style={styles.emptyMessage}>
              {translate("Browse our collection and add a few pieces you love.")}
            </Text>
            <View style={styles.emptyAction}>
              <CustomButton
                title={translate("Start shopping")}
                backgroundColor={Colors.Orange}
                borderColor={Colors.Orange}
                color={Colors.White}
                onPress={() =>
                  navigation.navigate("Home", { screen: ROUTES.PRODUCT_SCREEN })
                }
              />
            </View>
          </View>
        </View>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <View style={{ flex: 1 }}>
        <Text style={styles.screenTitle}>{translate("Cart")}</Text>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          // keyExtractor={(item) => item.id}

          contentContainerStyle={styles.scrollContent}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <>
              <View style={styles.Billcontent}>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 14,
                    color: Colors.Black_00,
                    paddingVertical: 5,
                    fontFamily: "Poppins",
                  }}
                >
                  {translate("Summary")}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 12,
                      color: Colors.Black_00,
                      paddingVertical: 5,
                      fontFamily: "Poppins",
                    }}
                  >
                    {translate("SubTotal")}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 20,
                      color: Colors.Black_00,
                      paddingVertical: 5,
                      fontFamily: "Poppins",
                    }}
                  >
                    {formatNaira(totalPrice)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 12,
                      color: Colors.Black_00,
                      paddingVertical: 5,
                      fontFamily: "Poppins",
                    }}
                  >
                    {translate("Total")}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 20,
                      color: Colors.Black_00,
                      paddingVertical: 5,
                      fontFamily: "Poppins",
                    }}
                  >
                    {formatNaira(totalPrice)}
                  </Text>
                </View>
              </View>
            </>
          }
        />

        <CustomButton
          title={translate("Proceed")}
          backgroundColor={Colors.Orange}
          borderColor={Colors.Orange}
          color={Colors.White}
          onPress={() =>
            requireAuth(token, navigation, () =>
              navigation.navigate(ROUTES.CHECK_OUT_SCREEN, {
                cartItems,
                totalPrice,
              }),
            )
          }
        />
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.Black_00,
    paddingVertical: 10,
    fontFamily: "Poppins",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    // Colors.Orange at 12% - the accent the tab badge and quantity buttons
    // already use, dialled down so the icon reads as the focal point.
    backgroundColor: "rgba(255, 150, 46, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.Black_00,
    fontFamily: "Poppins",
    textAlign: "center",
  },
  emptyMessage: {
    fontSize: 13,
    color: Colors.Ash,
    fontFamily: "Poppins",
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 260,
    marginTop: 8,
  },
  emptyAction: {
    width: 200,
    marginTop: 24,
  },
  scrollContent: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  shadowWrapper: {
    marginBottom: 20,
    overflow: "visible",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  Billcontent: {
    padding: 10,
    backgroundColor: Colors.White,
    elevation: 6,
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.9)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    overflow: "visible",
  },
  buttonWishlist: {
    // flex: 1,
    // margin: 5,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: Colors.White,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderColor: Colors.Orange,
    borderWidth: 1,
  },
  sizeButton: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    // height: 30,
    marginHorizontal: 5,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.Orange,
    backgroundColor: Colors.Orange,
    justifyContent: "center",
    alignItems: "center",
  },
  bookmarkButton: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.Orange,
    backgroundColor: Colors.White,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.Red,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.Orange,
    backgroundColor: Colors.Orange,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontWeight: "600",
    fontSize: 16,
    color: Colors.Black_00,
    marginHorizontal: 10,
    fontFamily: "Poppins",
  },
  discountPrice: {
    fontSize: 8,
    color: Colors.Gray_01,
    fontWeight: "600",
    fontFamily: "Poppins",
    textDecorationLine: "line-through",
  },
  price: {
    fontSize: 12,
    color: Colors.Orange,
    left: 3,
    fontWeight: "400",
    fontFamily: "Poppins",
    marginRight: 6,
  },
});

export default CartScreen;
