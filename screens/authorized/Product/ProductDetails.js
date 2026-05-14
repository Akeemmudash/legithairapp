
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MainContainer from '../../../components/MainContainer';
import Back from '../../../components/Back';
import { Colors } from '../../../utilities/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../redux/features/cart/cartSlice';
import StatusModal from '../../../components/StatusModal';
import { useTranslate } from '../../../utilities/hooks/useTranslate';
import { useSearchProductsQuery } from '../../../redux/features/product/productApi';
import formatNaira from '../../../utilities/formatNaira';

const ProductDetails = ({ route }) => {
    const initialProduct = route?.params?.product ?? null;
    const productId = route?.params?.productId ?? initialProduct?.id ?? null;
    const [selectedImage, setSelectedImage] = useState(initialProduct?.images?.[0] ?? null);
    const [selectedInch, setSelectedInch] = useState(null);
    const dispatch = useDispatch();
    const [modalAlertVisible, setModalAlertVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ icon: '', message: '', buttonColor: '', iconColor: '' });
    const insets = useSafeAreaInsets();

    const {
        data: searchData,
        isLoading: isProductLoading,
        isFetching: isProductFetching,
        error: productError,
    } = useSearchProductsQuery(productId, {
        skip: Boolean(initialProduct) || !productId,
    });

    const matchedProduct = searchData?.data?.find(
        (item) => `${item.id}` === `${productId}`
    );
    const resolvedProduct =
        initialProduct ??
        matchedProduct ??
        (searchData?.data?.length === 1 ? searchData.data[0] : null);

    useEffect(() => {
        if (!resolvedProduct) {
            return;
        }

        setSelectedImage(resolvedProduct.images?.[0] ?? null);
        setSelectedInch(resolvedProduct.inches?.[0] ?? null);
    }, [resolvedProduct?.id]);


    const handleInchSelect = (inch) => {
        setSelectedInch(inch);
    };

    if ((isProductLoading || isProductFetching) && !resolvedProduct) {
        return (
            <MainContainer style={styles.container}>
                <Back title="View Product" />
                <View style={styles.stateContainer}>
                    <ActivityIndicator size="large" color={Colors.Orange} />
                </View>
            </MainContainer>
        );
    }

    if (!resolvedProduct) {
        return (
            <MainContainer style={styles.container}>
                <Back title="View Product" />
                <View style={styles.stateContainer}>
                    <Text style={styles.stateText}>
                        {productError ? 'Unable to load this product right now.' : 'Product not found.'}
                    </Text>
                </View>
            </MainContainer>
        );
    }

    const product = resolvedProduct;

    const handleAddToCart = () => {
        const price = selectedInch ? selectedInch.price : product.price;
        const uniqueKey = `${product.id}-${selectedInch?.inche}`;

        const cartItem = {
            id: uniqueKey,
            productId: product.id,
            name: product.product_name,
            price,
            image: product.images[0].filename,
            category_id: product.category_id,
            selectedInch: selectedInch || null,
        };

        dispatch(addItem(cartItem));
        setModalContent({
            icon: 'checkmark-circle-outline',
            message: 'Product Added to Cart!',
            buttonColor: Colors.Orange,
            iconColor: Colors.Orange,
        });
        setModalAlertVisible(true);
    };

    const shortened_name = product.product_name.split(' ').slice(0, 10).join(' ');
    const isInchAvailable = product.inches && product.inches.length > 0;

    const handleCloseModal = () => {
        setModalAlertVisible(false);
    };
    const texts = [
        "View Product",
        shortened_name,
        "Inches",
        product.product_description,
        "Description",
        "Add to Cart",
      ];

      const translate = useTranslate(texts);
    const displayImage = selectedImage ?? product.images?.[0];

    return (
        <>
            <MainContainer style={styles.container}>
                <View>
                    <Back title={translate("View Product")} />
                    <ScrollView>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: displayImage?.filename }} style={styles.selectedImage} resizeMode="cover" />
                        </View>
                        <View style={styles.thumbnailContainer}>
                            {product.images.map((image, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedImage(image)}
                                    style={[
                                        styles.thumbnailWrapper,
                                        image.filename === (selectedImage && selectedImage.filename) ? styles.selectedThumbnail : null,
                                    ]}
                                >
                                    <Image source={{ uri: image.filename }} style={styles.thumbnail} resizeMode="cover" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </MainContainer>

            <View style={[styles.detailsContainer, { paddingBottom: insets.bottom }]}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.ratingContainer}>
                        <Ionicons
                            name={'star'}
                            size={15}
                            color={Colors.Orange}
                            style={{ fontFamily: "Poppins" }}
                        />
                        <Text style={{ fontSize: 15, fontWeight: "600", color: Colors.Black, fontFamily: "Poppins" }}>
                            (4.5)
                        </Text>
                    </View>

                    <Text style={styles.productName}>{translate(shortened_name)}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.discountPrice}>
                            {selectedInch && selectedInch.discount > 0
                                ? formatNaira(selectedInch.discount)
                                : formatNaira(selectedInch?.price || product.price)}
                        </Text>
                        {selectedInch && selectedInch.discount > 0 ? (
                            <Text style={styles.originalPrice}>
                                {formatNaira(selectedInch.price)}
                            </Text>
                        ) : null}

                    </View>
                    {product.inches && Array.isArray(product.inches) && product.inches.length > 0 ? (
                        <>
                            <Text style={styles.sectionTitle}>{translate("Inches")}</Text>
                            <View style={styles.sizeContainer}>
                                {product.inches.map((inch, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.sizeButton,
                                            selectedInch === inch ? styles.selectedButton : null,
                                        ]}
                                        onPress={() => handleInchSelect(inch)}
                                    >
                                        <Text style={[
                                            styles.sizeText,
                                            selectedInch === inch ? styles.selectedText : null,
                                        ]}>
                                            {inch.inche}"
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    ) : null}




                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[
                                styles.buttonCart,
                                !selectedInch && !isInchAvailable && styles.buttonDisabled,
                                !selectedInch && isInchAvailable && { backgroundColor: Colors.Gray_03 }
                            ]}
                            activeOpacity={0.6}
                            onPress={handleAddToCart}
                            disabled={!selectedInch && isInchAvailable}
                        >
                            <Ionicons name="cart-outline" size={20} color={Colors.White} style={{ marginRight: 4 }} />
                            <Text style={styles.buttonText}>{translate("Add to Cart")}</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.sectionTitle}>{translate("Description")}</Text>
                    <Text style={styles.descriptionText}>{translate(product.product_description)}</Text>
                </ScrollView>
            </View>

            <StatusModal
                visible={modalAlertVisible}
                onClose={handleCloseModal}
                icon={modalContent.icon}
                message={modalContent.message}
                buttonColor={modalContent.buttonColor}
                iconColor={modalContent.iconColor}
            />
        </>
    );
};

export default ProductDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    stateContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stateText: {
        color: Colors.Black_00,
        fontSize: 16,
        fontWeight: '500',
        fontFamily: "Poppins",
        textAlign: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
    },
    discountPrice: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.Orange,
        fontFamily: "Poppins"
    },
    originalPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.Gray_03,
        textDecorationLine: 'line-through',
        marginLeft: 10,
        fontFamily: "Poppins"
    },
    scrollContent: {
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    selectedImage: {
        width: 300,
        height: 300,
    },
    thumbnailContainer: {
        alignSelf: 'center',
        marginTop: 10,
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 3,
        borderWidth: 2,
        paddingVertical: 20,
        borderColor: Colors.Black_00,
        borderRadius: 100,
        alignItems: "center",
        backgroundColor: Colors.White,
        position: "absolute",
        top: 40,
        right: 10,
        overflow: 'hidden',
    },
    thumbnailWrapper: {
        marginBottom: 5,
        marginRight: 5,
        margin: 5
    },
    thumbnail: {
        width: 33,
        height: 33,
        borderRadius: 30,
    },
    selectedThumbnail: {
        borderWidth: 4,
        borderColor: Colors.Orange,
        borderRadius: 50,
    },
    detailsContainer: {
        position: 'absolute',
        top: 370,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.White,
        padding: 20,
        borderWidth: 2,
        borderBottomWidth: 0,
        borderColor: Colors.Orange,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 8,
        zIndex: 1,
        bottom: 80,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 5,
    },
    // discountPrice: {
    //     fontSize: 24,
    //     color: Colors.Orange,
    //     fontWeight: "600",
    //     fontFamily: "Poppins",
    // },
    price: {
        fontSize: 14,
        color: Colors.Gray_01,
        left: 3,
        fontWeight: "400",
        fontFamily: "Poppins",
        textDecorationLine: 'line-through',
    },
    productName: {
        fontSize: 27,
        fontWeight: "600",
        color: Colors.Black,
        width: 349,
        fontFamily: "Poppins",
    },
    productBrand: {
        fontSize: 14,
        fontWeight: "400",
        color: Colors.Gray_03,
        fontFamily: "Poppins",
    },
    priceContainer: {
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        paddingVertical: 7,
    },
    sectionTitle: {
        color: Colors.Black_00,
        fontSize: 24,
        fontWeight: "600",
        paddingVertical: 3,
        fontFamily: "Poppins",
    },
    sizeContainer: {
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 4,
    },
    sizeButton: {
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
    selectedButton: {
        backgroundColor: Colors.Orange,
    },
    sizeText: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.Orange,
        fontFamily: "Poppins",
    },
    selectedText: {
        color: Colors.White,
    },
    buttonCart: {
        flex: 1,
        margin: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.Orange,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        flexDirection: 'row',
    },
    buttonCart: {
        flex: 1,
        margin: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.Orange,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 14,
        color: Colors.White,
        fontWeight: "600",
        fontFamily: "Poppins",
    },
    descriptionText: {
        color: Colors.Gray_03,
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "Poppins",
    },
});
