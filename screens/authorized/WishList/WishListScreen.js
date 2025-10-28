

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../../utilities/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useSaveProductMutation } from '../../../redux/features/product/productApi';
import { addProduct, loadSavedProducts, removeProduct, saveProductToStorage } from '../../../redux/features/product/productSlice';
import ROUTES from '../../../Navigation/routes';
import { FlatList } from 'react-native-gesture-handler';
import { useTranslate } from '../../../utilities/hooks/useTranslate';

const WishListScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { id } = useSelector(state => state.userAuth);
    const savedProducts = useSelector(state => state.savedProducts);
    const [saveProduct] = useSaveProductMutation();
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        dispatch(loadSavedProducts());
    }, [dispatch]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(loadSavedProducts());
        setRefreshing(false);
    };

    const handleSavePress = async (productId) => {
        const product = savedProducts.find(p => p.id === productId);

        try {
            const isProductSaved = product !== undefined;
            const updatedSavedProducts = isProductSaved
                ? savedProducts.filter(p => p.id !== productId)
                : [...savedProducts, { id: productId }];

            await dispatch(saveProductToStorage(updatedSavedProducts));

            if (isProductSaved) {
                dispatch(removeProduct({ id: productId }));
            } else {
                dispatch(addProduct({ id: productId }));
            }

            await saveProduct({ productId }).unwrap();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Error updating product. Please try again.');
        }
    };


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


    const itemNames = savedProducts.map(item => item.product_name);

    const texts = [
        "WishList",
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
                        <Image source={{ uri: item?.images?.[0]?.filename }} style={styles.image} resizeMode="cover" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.productName}>
                            {translate(item.product_name.split(' ').slice(0, 3).join(' '))}
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.productPriceLabel}>Price: </Text>
                                <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                    style={styles.bookmarkButton}
                                    onPress={() => handleSavePress(item.id)}
                                >
                                    <Ionicons
                                        name={savedProducts.some(p => p.id === item.id) ? 'heart' : 'heart-outline'}
                                        size={19}
                                        color={Colors.Orange}
                                        style={{ marginRight: 1 }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.bookmarkButton}
                                    onPress={() =>
                                        navigation.navigate('Home', {
                                            screen: ROUTES.PRODUCT_DETAILS,
                                            params: { product: item },
                                        })
                                    }
                                >
                                    <Ionicons name="cart-outline" size={19} color={Colors.Orange} style={{ marginRight: 1 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <MainContainer>
            <Text style={styles.title}>{translate("WishList")}</Text>
            <FlatList
                data={savedProducts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.scrollContent}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text style={styles.emptyMessage}>No saved products found.</Text>}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[Colors.Orange]}
                    />
                }
            />
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.Black_00,
        paddingVertical: 10,
        fontFamily: "Poppins",
    },
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
        elevation: 6,
        borderRadius: 8,
        shadowColor: 'rgba(0, 0, 0, 0.9)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        overflow: 'visible',
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
    image: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
    productName: {
        fontWeight: "600",
        fontSize: 12,
        color: Colors.Black_00,
        paddingVertical: 5,
        fontFamily: "Poppins",
    },
    productPriceLabel: {
        fontWeight: "400",
        fontSize: 12,
        color: Colors.Black_00,
        paddingVertical: 5,
        fontFamily: "Poppins",
    },
    productPrice: {
        fontWeight: "600",
        fontSize: 12,
        color: Colors.Black_00,
        paddingVertical: 5,
        fontFamily: "Poppins",
    },
    emptyMessage: {
        fontFamily: "Poppins",
        fontWeight: "600",
    },
});

export default WishListScreen;
