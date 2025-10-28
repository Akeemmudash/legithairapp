

import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { Colors } from '../utilities/colors';
import Rating from './Rating';
import { addProduct, removeProduct, saveProductToStorage } from '../redux/features/product/productSlice';
import { useTranslate } from '../utilities/hooks/useTranslate';

const { width } = Dimensions.get('window');

const ProductCard = ({ item, handleSaveProduct, navigation, showSaveModal }) => {
  const dispatch = useDispatch();
  const savedProducts = useSelector(state => state.savedProducts);
  const selectedCurrency = useSelector(state => state.currency.selectedCurrency);
  const conversionRates = useSelector(state => state.currency.rates);


  const handleSavePress = useCallback(async (product) => {
    const isProductSaved = savedProducts.some(p => p.id === product.id);

    const updatedSavedProducts = isProductSaved
      ? savedProducts.filter(p => p.id !== product.id)
      : [...savedProducts, product];

    try {
      // Optimistically update UI
      dispatch(saveProductToStorage(updatedSavedProducts));
      if (showSaveModal) {
        showSaveModal(product.id, !isProductSaved);
      }
      if (isProductSaved) {
        dispatch(removeProduct(product));
      } else {
        dispatch(addProduct(product));
      }
      await handleSaveProduct(product.id);
    } catch (error) {

    }
  }, [savedProducts, handleSaveProduct, dispatch, showSaveModal]);

  // const formatPrice = (price) => {
  //   return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);
  // };

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

  const shortened_name = item?.product_name
    ? item.product_name.split(' ').slice(0, 6).join(' ')
    : 'Unknown Product';

  const isSaved = savedProducts.some(p => p.id === item.id);

  const texts = [
    "Add to Cart",
    shortened_name
  ];

  const translate = useTranslate(texts);

  return (
    <View style={{ flex: 1, margin: 5 }}>
      <View style={styles.card} 
      // onPress={() => navigation.navigate('ProductDetails', { product: item })}
      >
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageSlider}
        >
          {item.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.filename }}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center", marginTop: 5 }}>
            <View style={styles.ratingContainer}>
              <Rating rating={item.total_rating} />
            </View>
            <TouchableOpacity onPress={() => handleSavePress(item)} style={{ marginRight: 2 }} activeOpacity={0.6}>
              <Ionicons
                name={isSaved ? 'heart' : 'heart-outline'}
                size={18}
                color={isSaved ? Colors.Orange : Colors.Gray}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>
            {translate(shortened_name)}
            </Text>
          <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", paddingVertical: 4 }}>
            {item.discount > 0 ? (
              <>
                <Text style={styles.price}>{formatPrice(item.discount)}</Text>
                <Text style={styles.discountPrice}>{formatPrice(item.price)}</Text>
              </>
            ) : (
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => navigation.navigate('ProductDetails', { product: item })}>
            <Ionicons name="cart-outline" size={15} color={Colors.White} style={{ marginRight: 1 }} />
            <Text style={styles.buttonText}>{translate("Add to Cart")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.White,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  imageSlider: {
    width: width / 2 - 20,
  },
  image: {
    width: width / 2 - 20,
    height: 150,
  },
  ratingContainer: {
    marginRight: 10,
  },
  name: {
    fontSize: 12,
    color: Colors.Gray_01,
    fontWeight: '600',
    fontFamily: "Poppins",
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
  button: {
    width: "100%",
    height: 30,
    backgroundColor: Colors.Orange,
    borderRadius: 20,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 5
  },
  buttonText: {
    fontSize: 8.12,
    fontWeight: "600",
    color: Colors.White,
    fontFamily: "Poppins"
  }
});

export default ProductCard;


