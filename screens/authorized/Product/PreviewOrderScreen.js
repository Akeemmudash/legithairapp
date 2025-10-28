import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import CustomButton from '../../../components/CustomButton';
import { Colors } from '../../../utilities/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Back from '../../../components/Back';
import ROUTES from '../../../Navigation/routes';

const PreviewOrderScreen = ({ route, navigation }) => {
    const { product, selectedSize } = route.params;
    const [discountText, setDiscountText] = useState("");

    return (
        <MainContainer>
            <View style={{ flex: 1 }}>
                <Back title={"Review Your Order"} />
                <ScrollView contentContainerStyle={styles.scrollContent}>

                    <View style={styles.shadowWrapper}>
                    <View style={styles.Billcontent}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                           <Image source={require("../../../assets/images/Rectangle.png")} />
                        </View>
                        <View style={{flex: 1, marginLeft: 10}}>
                            <Text style={{ fontWeight: "600", fontSize: 12, color: Colors.Black_00, paddingVertical: 5 }}>{product.Name}</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Text style={{ fontWeight: "600", fontSize: 14, color: Colors.Gray_03, paddingVertical: 5, marginRight: 5 }}>Color</Text>
                                <View style={styles.sizeButton}>
                                <Text style={{color: Colors.White, textAlign: "center"}}>{selectedSize}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                <View>
                                    <Text style={{ fontWeight: "400", fontSize: 12, color: Colors.Black_00, paddingVertical: 5 }}>Price</Text>
                                    <Text style={{ fontWeight: "600", fontSize: 12, color: Colors.Black_00, paddingVertical: 5 }}>N 7,955.00</Text>
                                </View>
                                <View style={{flexDirection: "row",}}>
                                    <View style={styles.bookmarkButton}>
                                    <Ionicons name="bookmark-outline" size={19} color={Colors.Orange} style={{ marginRight: 1 }} />
                                </View>
                                <View style={styles.deleteButton}>
                                <Ionicons name="trash-outline" size={19} color={Colors.Red} style={{ marginRight: 1 }} />
                                </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    </View>
                    </View>

                    <View style={styles.Billcontent}>
                        <Text style={{ fontWeight: "500", fontSize: 12, color: Colors.Black_00, paddingVertical: 5 }}>Discount code</Text>
                        <View style={{ paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: Colors.Orange, borderRadius: 10, padding: 7.5, backgroundColor: Colors.Orange, flex: 1, marginRight: 10 }}>
                                <TextInput
                                    placeholder="."
                                    value={discountText}
                                    onChangeText={setDiscountText}
                                    placeholderTextColor={Colors.Ash}
                                    style={{ flex: 1, color: Colors.Black, paddingVertical: 5 }}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.buttonWishlist}
                                activeOpacity={0.6}
                                onPress={() => { }}
                            >
                                <Text style={{color: Colors.Orange, fontSize: 14, fontWeight: "500"}}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontWeight: "700", fontSize: 14, color: Colors.Black_00, paddingVertical: 5 }}>Summary</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                            <Text style={{ fontWeight: "500", fontSize: 12, color: Colors.Black_00, paddingVertical: 5 }}>SubTotal</Text>
                            <Text style={{ fontWeight: "700", fontSize: 20, color: Colors.Black_00, paddingVertical: 5 }}>N7,955</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                            <Text style={{ fontWeight: "500", fontSize: 12, color: Colors.Black_00, paddingVertical: 5 }}>Shipping</Text>
                            <Text style={{ fontWeight: "700", fontSize: 20, color: "green", paddingVertical: 5 }}>Free</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                            <Text style={{ fontWeight: "500", fontSize: 12, color: Colors.Black_00, paddingVertical: 5 }}>Total</Text>
                            <Text style={{ fontWeight: "700", fontSize: 20, color: Colors.Black_00, paddingVertical: 5 }}>N8,044</Text>
                        </View>
                    </View>
                </ScrollView>


                <View style={styles.buttonContainer}>
                    <CustomButton
                        title={"Proceed"}
                        backgroundColor={Colors.Orange}
                        borderColor={Colors.Orange}
                        color={Colors.White}
                        onPress={() => navigation.navigate(ROUTES.CHECK_OUT_SCREEN, { product, selectedSize })}
                    />
                </View>
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
    Billcontent: {
        padding: 10,
        backgroundColor: Colors.White,
        elevation: 6, // Elevation for Android
        borderRadius: 8,
        shadowColor: 'rgba(0, 0, 0, 0.9)', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        overflow: 'visible', // Ensure the shadow is visible
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 70,
        left: 0,
        right: 0,
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
        width: 30,
        height: 30,
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
    
    
});



export default PreviewOrderScreen;
