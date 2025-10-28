

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Linking, TouchableOpacity } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import CustomButton from '../../../components/CustomButton';
import { Colors } from '../../../utilities/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Back from '../../../components/Back';
import CustomTextInput from '../../../components/CustomTextInput';
import * as Clipboard from 'expo-clipboard';
import { useCreateOrderMutation } from '../../../redux/features/order/orderApi';
import { useDispatch, useSelector } from 'react-redux';
import { PayWithFlutterwave } from 'flutterwave-react-native';
import { useFetchDashboardsQuery, useGetLandMarkQuery } from '../../../redux/features/product/productApi';
import axios from 'axios';
import StatusModal from '../../../components/StatusModal';
import { Paystack } from 'react-native-paystack-webview';
import CustomDropdown from '../../../components/CustomDropDown';
import LandMarkCustomDropdown from '../../../components/LandMarkCustomDropDown';
import RadioButton from '../../../components/RadioButton';
import Checkbox from '../../../components/PlaceRadio';
import PlaceRadio from '../../../components/PlaceRadio';
import { FlatList } from 'react-native-gesture-handler';
import ROUTES from '../../../Navigation/routes';
import { clearCart } from '../../../redux/features/cart/cartSlice';
import { useTranslate } from '../../../utilities/hooks/useTranslate';

const COUNTRIES_API_URL = 'https://countriesnow.space/api/v0.1/countries';
const STATES_API_URL = 'https://countriesnow.space/api/v0.1/countries/states';
const CheckOutScreen = ({ route, navigation }) => {

    const { cartItems, totalPrice } = route.params;

const dispatch = useDispatch();
const { full_name, phone, id, email } = useSelector(state => state.userAuth);

const [name, setName] = useState('');
const [Email, setEmail] = useState('');
const [address, setAddress] = useState('');
const [addition, setAdditional] = useState('');
const [selectedOption, setSelectedOption] = useState('bank');
const [selectedPlace, setSelectedPlace] = useState('pickup');
const [fetchingStates, setFetchingStates] = useState(false);
const [isValid, setIsValid] = useState(false);
const [selectedCountry, setSelectedCountry] = useState(null);
const [selectedState, setSelectedState] = useState(null);
const [countries, setCountries] = useState([]);
const [states, setStates] = useState([]);
const [city, setCity] = useState('');
const [selectedLandmark, setSelectedLandmark] = useState(null);
const [checkedItems, setCheckedItems] = useState('');
const [modalAlertVisible, setModalAlertVisible] = useState(false);
const [modalContent, setModalContent] = useState({ icon: '', message: '', buttonColor: "" });
const [showPaystack, setShowPaystack] = useState(false);

const texts = [
    "Check Out",
    "Pickup",
    "Door Delivery",
    "Summary",
    "subTotal",
    "Shipping Fee",
    "Total",
    "Payment Method",
    "Kindly note that the base currency for all Payment is NGN(naira)",
    "Bank Transfer",
    "Pay with Paystack",
    "Bank Details",
    "Account Number",
    "Account Name", 
    "Send Reciept",
    "Copy"
  ];

  const translate = useTranslate(texts);

// ALL API hooks must come after all state/init logic
const { data: dashboardData, error: dashboardError, isLoading: dashboardLoading } = useFetchDashboardsQuery();
const { data: landmarks, error } = useGetLandMarkQuery(city);
const [createOrder, { isLoading }] = useCreateOrderMutation();


    const generateOrderId = () => {
        const orderId = Math.floor(100000 + Math.random() * 900000);
        return orderId;
      };

    useEffect(() => {
        setName(full_name);
        setEmail(email);
    }, [full_name, phone, email]);


    const orderId = generateOrderId();


    useEffect(() => {
        if (dashboardData) {
        }
    }, [dashboardData]);



    const public_key = dashboardData?.public_key;
    const private_key = dashboardData?.private_key;
    const customer_care = dashboardData?.customer_care;
    const bank_name = dashboardData?.account_details?.[0]?.bank_name;
    const bank_acct_name = dashboardData?.account_details?.[0]?.account_name;
    const bank_acct_number = dashboardData?.account_details?.[0]?.account_number;
    const Pickupcenters = dashboardData?.pickupcenters;

    useEffect(() => {
        if (selectedState) {
            const cityName = selectedState.replace(/\s*State$/i, '');
            setCity(cityName);
        }
    }, [selectedState]);



    const renderItem = ({ item }) => (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
            width: "100%"
        }}>
            <PlaceRadio
                selected={checkedItems === item.pickup_center}
                onPress={() => setCheckedItems(item.pickup_center)}
            />
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: Colors.textColor, fontFamily: "Poppins" }}>{item.pickup_center}</Text>
            </View>
        </View>
    );




    useEffect(() => {
        axios.get(COUNTRIES_API_URL)
            .then(response => {
                const countriesData = response.data.data.map(country => ({
                    label: country.country,
                    value: country.country,
                }));
                setCountries(countriesData);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
                // Handle error
            });
    }, []);


    useEffect(() => {
        if (selectedCountry) {
            // Fetch states when a country is selected
            setFetchingStates(true);
            axios.post(STATES_API_URL, { country: selectedCountry })
                .then(response => {
                    const statesData = response.data.data.states.map(state => ({
                        label: state.name,
                        value: state.name
                    }));
                    setStates(statesData);
                    setFetchingStates(false);
                })
                .catch(error => {
                    console.error('Error fetching states:', error);
                    // Handle error
                    setFetchingStates(false);
                });
        } else {
            setStates([]);
        }
    }, [selectedCountry]);

    // console.log("states", states)



    useEffect(() => {
        setIsValid((name || '').length > 0 && (email || '').length > 0);
    }, [name, email]);

    // if (dashboardLoading) {
    //     return <View><Text>Loading...</Text></View>;
    // }

    // if (dashboardError) {
    //     return <View><Text>Error loading dashboard data.</Text></View>;
    // };

    // const DeliverytotalPrice = totalPrice + (selectedLandmark?.landmark_price ?? 0);
    const DeliverytotalPrice = (Number(totalPrice) || 0) + (Number(selectedLandmark?.landmark_price) || 0);
    // const [modalAlertVisible, setModalAlertVisible] = useState(false);
    // const [modalContent, setModalContent] = useState({ icon: '', message: '', buttonColor: "" });
    const handleCloseModal = () => {
        setModalAlertVisible(false);
    };

    const copyToClipboard = () => {
        Clipboard.setString(bank_acct_number);
        setModalContent({
            icon: 'checkmark-circle-outline',
            message: 'Account number Copied to Clipboard',
            buttonColor: Colors.Orange,
            iconColor: Colors.Orange
        });
        setModalAlertVisible(true);
    };

    const generateTransactionRef = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return `flw_tx_ref_${result}`;
    };
    // console.log("cartItems", cartItems)
    const deliveryLandmark = selectedLandmark
        ? `${selectedLandmark.landmark_name}-${selectedLandmark.landmark_price}`
        : "pickup";


    const handleOrderCreation = async () => {
        const items = cartItems;
        console.log("items", items)
        const orderDetails = {
            products: items.map(item => {
                const hasDiscount = item.selectedInch?.discount && item.selectedInch.discount > 0;

                const productAmount = item.selectedInch ? (hasDiscount ? item.selectedInch.discount : item.selectedInch.price) : item.price;
                const initialAmount = item.selectedInch ? (hasDiscount ? item.selectedInch.price : 0) : 0;

                return {
                    product_id: item.productId, 
                    product_amount: productAmount,
                    category_id: item.category_id,
                    inches: item.selectedInch?.inche || null,
                    initial_amount: initialAmount,
                    discounted: hasDiscount ? 1 : 0,
                    order_quantity: item.quantity
                };
            }),
            delivery_address: address || checkedItems || "",
            delivery_state: selectedState || checkedItems || "",
            delivery_country: selectedCountry || checkedItems || "",
            amount_paid: DeliverytotalPrice.toString(),
            additional_information: addition || "",
            payment_method: 'bank',
            delivery_landmark: deliveryLandmark,
            order_id: orderId
        };

        console.log("orderDetails", orderDetails)
        console.log("selectedLandmark", selectedLandmark)


        try {
            // Create the order
            const orderResponse = await createOrder(orderDetails).unwrap();
            console.log("Order Creation Response:", orderResponse);


            if (orderResponse.message === 'success') {

                setModalContent({
                    icon: 'checkmark-circle-outline',
                    message: 'Order Created Successfully',
                    buttonColor: Colors.Orange,
                    iconColor: Colors.Orange
                });
                setModalAlertVisible(true);

                setTimeout(() => {
                    dispatch(clearCart());
                    navigation.goBack()
                    navigation.navigate("Home", { screen: ROUTES.PRODUCT_SCREEN });

                    // Proceed to open WhatsApp
                    const phoneNumber = customer_care;
                    const message = encodeURIComponent(`Hello, I would like to confirm my order with My Receipt.`);
                    const url = `whatsapp://send?phone=${phoneNumber}&text=${message}`;

                    Linking.canOpenURL(url)
                        .then((supported) => {
                            if (supported) {
                                return Linking.openURL(url);
                            } else {
                                setModalContent({
                                    icon: 'close-circle-outline',
                                    message: "WhatsApp not installed",
                                    buttonColor: Colors.Orange,
                                    iconColor: Colors.Orange
                                });
                                setModalAlertVisible(true);
                            }
                        })
                        .catch((error) => console.error("Error opening WhatsApp:", error));
                }, 2000);

            } else {
                setModalContent({
                    icon: 'close-circle-outline',
                    message: "Order Creation Failed. Please try again.",
                    buttonColor: Colors.Orange,
                    iconColor: Colors.Orange
                });
                setModalAlertVisible(true);
            }
        } catch (orderError) {
            console.error("Error creating order:", orderError?.data?.errors);
            setModalContent({
                icon: 'close-circle-outline',
                message: orderError?.data?.message || "Order Creation Failed. Please try again.",
                buttonColor: Colors.Orange,
                iconColor: Colors.Orange
            });
            setModalAlertVisible(true);
        }
    };




    // const [showPaystack, setShowPaystack] = useState(false);



    const handleOnRedirect = async (data) => {
        console.log("data", data);
        const { transactionRef: { reference } } = data;

        const items = cartItems;
        const orderDetails = {
            products: items.map(item => {
                const hasDiscount = item.selectedInch?.discount && item.selectedInch.discount > 0;

                const productAmount = item.selectedInch ? (hasDiscount ? item.selectedInch.discount : item.selectedInch.price) : item.price;
                const initialAmount = item.selectedInch ? (hasDiscount ? item.selectedInch.price : 0) : 0;

                return {
                    product_id: item.id,
                    product_amount: productAmount,
                    category_id: item.category_id,
                    inches: item.selectedInch?.inche || null,
                    initial_amount: initialAmount,
                    discounted: hasDiscount ? 1 : 0,
                    order_quantity: item.quantity
                };
            }),
            delivery_address: address || checkedItems || "",
            delivery_state: selectedState || checkedItems || "",
            delivery_country: selectedCountry || checkedItems || "",
            amount_paid: DeliverytotalPrice.toString(),
            additional_information: addition || "",
            payment_method: 'online',
            delivery_landmark: deliveryLandmark,
            order_id: orderId
        };
        console.log("selectedLandmark", selectedLandmark)

        try {
            const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
                headers: {
                    Authorization: `Bearer ${private_key}`,
                },
            });

            const verificationData = response.data;
            console.log("Verification Data:", verificationData);

            if (verificationData.message === 'Verification successful') {
                setModalContent({
                    icon: 'checkmark-circle-outline',
                    message: 'Payment Successful',
                    buttonColor: Colors.Orange,
                    iconColor: Colors.Orange
                });
                setModalAlertVisible(true);

                const orderResponse = await createOrder(orderDetails).unwrap();
                console.log("Order Creation Response:", orderResponse);

                setModalContent({
                    icon: 'checkmark-circle-outline',
                    message: 'Order Created Successfully',
                    buttonColor: Colors.Orange,
                    iconColor: Colors.Orange
                });
                setModalAlertVisible(true);
                dispatch(clearCart());
                navigation.goBack()
                navigation.navigate("Home", { screen: ROUTES.PRODUCT_SCREEN })
            } else {
                setModalContent({
                    icon: 'close-circle-outline',
                    message: 'Payment verification failed.',
                    buttonColor: Colors.Orange,
                    iconColor: Colors.Orange
                });
                setModalAlertVisible(true);
            }
        } catch (error) {
            console.error("Error during transaction verification or order creation:", error);
            setModalContent({
                icon: 'close-circle-outline',
                message: 'An error occurred. Please try again.',
                buttonColor: Colors.Orange,
                iconColor: Colors.Orange
            });
            setModalAlertVisible(true);
        }
    };



    const paymentOptions = {
        tx_ref: generateTransactionRef(10),
        authorization: public_key,
        customer: {
            email: email,
        },
        amount: totalPrice,
        currency: 'NGN',
        payment_options: 'card',
    };

    const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
    const conversionRates = useSelector(state => state.currency.rates);
  
    const convertPrice = (priceInNGN) => {
      if (conversionRates[selectedCurrency]) {
        return priceInNGN * conversionRates[selectedCurrency];
      }
      return priceInNGN; 
    };
  
    const formatPrice = (price) => {
      const convertedPrice = convertPrice(price);
      return new Intl.NumberFormat('en-NG', { style: 'currency', currency: selectedCurrency }).format(convertedPrice);
    };

    const handleCountryChange = (country) => {
        setSelectedCountry(country);
        setSelectedState(null);
        setSelectedLandmark(null);
    };

    const handleStateChange = (state) => {
        setSelectedState(state);
        setSelectedLandmark(null);
    };


    return (
        <MainContainer>
            <FlatList
                data={[]}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <>
                        <Back title={translate("Check Out")} />

                        <View style={styles.rowContainer}>
                            <RadioButton
                                label={translate("Pickup")}
                                value="pickup"
                                selected={selectedPlace === 'pickup'}
                                onPress={() => setSelectedPlace('pickup')}
                            />
                            <RadioButton
                                label={translate("Door Delivery")}
                                value="Delivery"
                                selected={selectedPlace === 'Delivery'}
                                onPress={() => setSelectedPlace('Delivery')}
                            />
                        </View>
                        {selectedPlace === 'pickup' && (
                            <View style={{ marginBottom: 20 }}>
                                <FlatList
                                    data={Pickupcenters}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={renderItem}
                                />
                            </View>
                        )}

                        {selectedPlace === 'Delivery' && (
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: "600", color: Colors.Black_00, paddingVertical: 10, fontFamily: "Poppins" }}>Delivery details</Text>
                                <CustomTextInput
                                    label={"Delivery Address"}
                                    value={address}
                                    onChangeText={setAddress}
                                />
                                <CustomTextInput
                                    label={"Additional Address"}
                                    value={addition}
                                    onChangeText={setAdditional}
                                />
                                <View style={styles.rowContainer}>
                                    <View style={styles.inputContainer}>
                                        <CustomDropdown
                                            label="Country"
                                            options={countries}
                                            selectedValue={selectedCountry}
                                            onSelect={(value) => {
                                                setSelectedCountry(value);
                                                handleCountryChange(value); 
                                            }}
                                            onValueChange={handleCountryChange}
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <CustomDropdown
                                            label="State"
                                            options={states}
                                            selectedValue={selectedState}
                                            onSelect={(value) => {
                                                setSelectedState(value);
                                                handleStateChange(value);
                                            }}
                                            fetching={fetchingStates}
                                        />
                                    </View>
                                </View>
                                <LandMarkCustomDropdown
                                    label="LandMarks"
                                    options={landmarks || []}
                                    selectedValue={selectedLandmark}
                                    onSelect={setSelectedLandmark}
                                />
                            </View>
                        )}

                        <View style={[styles.scrollContent]}>
                            <View style={styles.Billcontent}>
                                <Text style={styles.cardTitle}>{translate("Summary")}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                    <Text style={{ fontWeight: "500", fontSize: 12, color: Colors.Black_00, paddingVertical: 5, fontFamily: "Poppins" }}>{translate("SubTotal")}</Text>
                                    <Text style={{ fontWeight: "600", fontSize: 20, color: Colors.Black_00, paddingVertical: 5, fontFamily: "Poppins" }}>{formatPrice(totalPrice)}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                    <Text style={{ fontWeight: "500", fontSize: 12, color: Colors.Black_00, paddingVertical: 5, fontFamily: "Poppins" }}>{translate("Shipping Fee")}</Text>
                                    <Text style={{ fontWeight: "600", fontSize: 20, color: Colors.Black_00, paddingVertical: 5, fontFamily: "Poppins" }}> {formatPrice(selectedLandmark?.landmark_price ?? 0)}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                    <Text style={{ fontWeight: "500", fontSize: 12, color: Colors.Black_00, paddingVertical: 5, fontFamily: "Poppins" }}>{translate("Total")}</Text>
                                    <Text style={{ fontWeight: "600", fontSize: 20, color: Colors.Black_00, paddingVertical: 5, fontFamily: "Poppins" }}>{formatPrice(DeliverytotalPrice)}</Text>
                                </View>
                            </View>
                        </View>
                    </>
                }
                ListFooterComponent={
                    <>
                        <Text style={{ fontSize: 16, fontWeight: "600", color: Colors.Black_00, paddingVertical: 10, fontFamily: "Poppins" }}>{translate("Payment Method")}</Text>
                        <Text style={{ fontSize: 12, fontWeight: "600", color: Colors.Red, paddingVertical: 2, fontFamily: "Poppins" }}>{translate("Kindly note that the base currency for all Payment is NGN(naira)")}</Text>
                        <View style={styles.rowContainer}>
                            <RadioButton
                                label={translate("Bank Transfer")}
                                value="bank"
                                selected={selectedOption === 'bank'}
                                onPress={() => setSelectedOption('bank')}
                            />
                            <RadioButton
                                label={translate("Pay with Paystack")}
                                value="nameEmail"
                                selected={selectedOption === 'nameEmail'}
                                onPress={() => setSelectedOption('nameEmail')}
                            />
                        </View>

                        {selectedOption === 'bank' && (
                            <View style={[styles.scrollContent]}>
                                <View style={styles.Billcontent}>
                                    <Text style={styles.cardTitle}>{translate("Bank Details")}</Text>
                                    <Text style={{ fontWeight: "600", fontSize: 15, color: Colors.textColor, fontFamily: "Poppins" }}>{bank_name}</Text>
                                    <View style={{ flexDirection: "row", width: "100%", paddingVertical: 10 }}>
                                        <Text style={{ fontWeight: "600", fontSize: 15, color: Colors.textColor, fontFamily: "Poppins" }}>{translate("Account Name: ")}</Text>
                                        <Text style={{ fontWeight: "600", fontSize: 15, color: Colors.textColor, fontFamily: "Poppins" }}>{bank_acct_name}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ fontWeight: "600", fontSize: 15, color: Colors.textColor, fontFamily: "Poppins" }}>{translate("Account Number: ")}</Text>
                                            <Text style={{ fontWeight: "600", fontSize: 15, color: Colors.textColor, fontFamily: "Poppins" }}>{bank_acct_number}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.buttonWishlist}
                                            activeOpacity={0.6}
                                            onPress={copyToClipboard}
                                        >
                                            <Text style={{ color: Colors.Orange, fontSize: 14, fontWeight: "500" }}>{translate("Copy")}</Text>
                                            <Ionicons name="copy-outline" size={15} color={Colors.Orange} style={{ marginLeft: 1 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}

                        {selectedOption === 'nameEmail' && (
                            <View >
                                <CustomTextInput
                                    label={"Full Name"}
                                    value={name}
                                    type={name}
                                    onChangeText={setName}
                                />
                                <CustomTextInput
                                    label={"Email Address"}
                                    value={Email}
                                    type={email}
                                    onChangeText={setEmail}
                                />
                                <CustomButton
                                    title={isLoading ? 'Creating Order...' : 'Pay with Paystack'}
                                    color={Colors.Orange}
                                    borderColor={Colors.Orange}
                                    onPress={() => {
                                        if (selectedPlace === 'pickup' && !checkedItems) {
                                            setModalContent({
                                                icon: 'close-circle-outline',
                                                message: 'Please select a pickup center before proceeding.',
                                                buttonColor: Colors.Orange,
                                                iconColor: Colors.Orange
                                            });
                                            setModalAlertVisible(true);
                                            return;
                                        }

                                        if (selectedPlace === 'Delivery' && !selectedLandmark) {
                                            setModalContent({
                                                icon: 'close-circle-outline',
                                                message: 'Provide a deliver LandMark before proceeding.',
                                                buttonColor: Colors.Orange,
                                                iconColor: Colors.Orange
                                            });
                                            setModalAlertVisible(true);
                                            return;
                                        }
                                        setShowPaystack(true);
                                    }}
                                />
                                {showPaystack && (
                                    <Paystack
                                        paystackKey={public_key}
                                        amount={totalPrice}
                                        billingEmail={email}
                                        activityIndicatorColor="orange"
                                        onSuccess={handleOnRedirect}
                                        onCancel={() => { }}
                                        autoStart={true}
                                    />
                                )}
                            </View>
                        )}

                        {selectedOption === 'bank' && (
                            <CustomButton
                                title={isLoading ? 'Creating Order...' : 'Send Reciept'}
                                // onPress={handleOrderCreation}
                                disabled={isLoading}
                                color={Colors.Orange}
                                borderColor={Colors.Orange}
                                onPress={() => {
                                    if (selectedPlace === 'pickup' && !checkedItems) {
                                        setModalContent({
                                            icon: 'close-circle-outline',
                                            message: 'Please select a pickup center before proceeding.',
                                            buttonColor: Colors.Orange,
                                            iconColor: Colors.Orange
                                        });
                                        setModalAlertVisible(true);
                                        return;
                                    }

                                    if (selectedPlace === 'Delivery' && !selectedLandmark) {
                                        setModalContent({
                                            icon: 'close-circle-outline',
                                            message: 'Please provide a delivery address before proceeding.',
                                            buttonColor: Colors.Orange,
                                            iconColor: Colors.Orange
                                        });
                                        setModalAlertVisible(true);
                                        return;
                                    }
                                    handleOrderCreation();
                                }}
                            />
                        )}
                    </>
                }
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

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
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
        marginHorizontal: 5
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 5,

    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.Black_00,
        marginBottom: 5,
        fontFamily: "Poppins"
    },
    textInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.Orange,
        borderRadius: 5,
        padding: 7.5,
        backgroundColor: Colors.White,
        color: Colors.Black,
        paddingVertical: 5,
        flex: 1,
        height: 43,
        fontFamily: "Poppins"
    },
    card: {
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.Orange,
        borderRadius: 10,
        backgroundColor: Colors.White,
        marginVertical: 20,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: Colors.Black,
        fontFamily: "Poppins"
    },
    copyButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: Colors.Orange,
        borderRadius: 5,
        alignItems: 'center',
    },
    copyButtonText: {
        color: Colors.White,
        fontWeight: 'bold',
        fontFamily: "Poppins"
    },
    buttonContainer: {
        // position: 'absolute',
        // bottom: 20,
        // left: 0,
        // right: 0,
    },
    inputField: {
        marginBottom: 20,

    },
    buttonWishlist: {
        // flex: 1,
        // margin: 5,
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: Colors.White,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderColor: Colors.Orange,
        borderWidth: 1,
        flexDirection: "row"
    },
    scrollContent2: {
        paddingHorizontal: 5,
        paddingVertical: 10,
    }
});

export default CheckOutScreen;


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: Colors.Gray,
        borderRadius: 4,
        color: Colors.Black,
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: Colors.Gray,
        borderRadius: 8,
        color: Colors.Black,
        paddingRight: 30,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemText: {
        fontSize: 16,
        color: '#000',
    },
});