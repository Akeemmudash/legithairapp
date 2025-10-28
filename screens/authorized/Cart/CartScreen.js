
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import CustomButton from '../../../components/CustomButton';
import { Colors } from '../../../utilities/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Back from '../../../components/Back';
import ROUTES from '../../../Navigation/routes';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeItem, incrementQuantity, decrementQuantity } from '../../../redux/features/cart/cartSlice';
import { FlatList } from 'react-native-gesture-handler';
import { useTranslate } from '../../../utilities/hooks/useTranslate';

const CartScreen = ({ route, navigation }) => {
    const [discountText, setDiscountText] = useState("");
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
  const conversionRates = useSelector(state => state.currency.rates);

  const convertPrice = (priceInNGN) => {
    if (conversionRates[selectedCurrency]) {
      return priceInNGN * conversionRates[selectedCurrency];
    }
    return priceInNGN; // Fallback to NGN if conversion rate not available
  };

  const formatPrice = (price) => {
    const convertedPrice = convertPrice(price);
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: selectedCurrency }).format(convertedPrice);
  };


    console.log("cartItems", cartItems);


    const handleRemoveItem = (id, selectedSize) => {
        dispatch(removeItem({ id, selectedSize }));
    };

    const handleClearCart = () => {
        Alert.alert(
            'Clear Cart',
            'Are you sure you want to clear all items from the cart?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => dispatch(clearCart()),
                },
            ]
        );
    };

    const totalPrice = cartItems.reduce((sum, item) => {
        const itemPrice = item?.selectedInch?.discount > 0 ? item?.selectedInch?.discount : item?.selectedInch?.price ?? item?.price;
        return sum + (itemPrice * item.quantity);
    }, 0);
    
    const itemNames = cartItems.map(item => item.name);

    const texts = [
        "Proceed",
        "Summary",
        "SubTotal",
        "Total",
        "Cart",
        "Inches",
        itemNames
      ];

      const translate = useTranslate(texts);

    const renderItem = ({ item }) => (
        <View style={styles.shadowWrapper}>
            <View style={styles.Billcontent}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={{ fontWeight: "600", fontSize: 12, color: Colors.Black_00, paddingVertical: 5, fontFamily: "Poppins" }}>{translate(item.name.split(' ').slice(0, 3).join(' '))}</Text>
                        {/* <Text style={{ fontWeight: "600", fontSize: 12, color: Colors.Black_00, paddingVertical: 5, fontFamily: "Poppins" }}>{item.name.split(' ').slice(0, 3).join(' ')}</Text> */}
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {item.selectedInch && (
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ fontWeight: "600", fontSize: 14, color: Colors.Gray_03, paddingVertical: 5, marginRight: 5, fontFamily: "Poppins" }}>{translate("Inches")}</Text>
                                    <View style={styles.sizeButton}>
                                        <Text style={{ color: Colors.White, textAlign: "center" }}>{item.selectedInch.inche}</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>

                                {item.selectedInch ? (
                                    item.selectedInch.discount > 0 ? (
                                        <>
                                            <Text style={styles.price}>{formatPrice(item.selectedInch.discount)}</Text>
                                            <Text style={styles.discountPrice}>{formatPrice(item.selectedInch.price)}</Text>
                                        </>
                                    ) : (
                                        <Text style={styles.price}>{formatPrice(item.selectedInch.price)}</Text>
                                    )
                                ) : (
                                    <Text style={styles.price}>{formatPrice(item.price)}</Text>
                                )}
                            </View>

                            <TouchableOpacity onPress={() => handleRemoveItem(item.id, item.selectedSize)}>
                                <View style={styles.deleteButton}>
                                    <Ionicons name="trash-outline" size={19} color={Colors.Red} style={{ marginRight: 1 }} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => dispatch(decrementQuantity({ id: item.id, selectedSize: item.selectedSize }))} style={styles.quantityButton}>
                                <Ionicons name="remove" size={16} color={Colors.White} />
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => dispatch(incrementQuantity({ id: item.id, selectedSize: item.selectedSize }))} style={styles.quantityButton}>
                                <Ionicons name="add" size={16} color={Colors.White} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <MainContainer>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: Colors.Black_00, paddingVertical: 10, fontFamily: "Poppins" }}>{translate("Cart")}</Text>
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
                                <Text style={{ fontWeight: "600", fontSize: 14, color: Colors.Black_00, paddingVertical: 5, fontFamily: "Poppins" }}>{translate("Summary")}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                    <Text style={{ fontWeight: "500", fontSize: 12, color: Colors.Black_00, paddingVertical: 5, fontFamily: "Poppins" }}>{translate("SubTotal")}</Text>
                                    <Text style={{ fontWeight: "600", fontSize: 20, color: Colors.Black_00, paddingVertical: 5, fontFamily: "Poppins" }}>{formatPrice(totalPrice)}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                    <Text style={{ fontWeight: "500", fontSize: 12, color: Colors.Black_00, paddingVertical: 5, fontFamily: "Poppins" }}>{translate("Total")}</Text>
                                    <Text style={{ fontWeight: "600", fontSize: 20, color: Colors.Black_00, paddingVertical: 5, fontFamily: "Poppins" }}>{formatPrice(totalPrice)}</Text>
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
                    onPress={() => navigation.navigate(ROUTES.CHECK_OUT_SCREEN, { cartItems, totalPrice })}
                />
            </View>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    shadowWrapper: {
        marginBottom: 20,
        overflow: 'visible',
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
        shadowColor: 'rgba(0, 0, 0, 0.9)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        overflow: 'visible',
    },
    buttonWishlist: {
        // flex: 1,
        // margin: 5,
        paddingVertical: 15,
        paddingHorizontal: 40,
        backgroundColor: Colors.White,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderColor: Colors.Orange,
        borderWidth: 1
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookmarkButton: {
        width: 50,
        height: 50,
        marginHorizontal: 5,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: Colors.Orange,
        backgroundColor: Colors.White,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        width: 50,
        height: 50,
        marginHorizontal: 5,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: Colors.Red,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.Orange,
        backgroundColor: Colors.Orange,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontWeight: "600",
        fontSize: 16,
        color: Colors.Black_00,
        marginHorizontal: 10,
        fontFamily: "Poppins"
    },
    discountPrice: {
        fontSize: 8,
        color: Colors.Gray_01,
        fontWeight: "600",
        fontFamily: "Poppins",
        textDecorationLine: 'line-through',

    },
    price: {
        fontSize: 12,
        color: Colors.Orange,
        left: 3,
        fontWeight: "400",
        fontFamily: "Poppins",
        marginRight: 6
    },
});

export default CartScreen;





























