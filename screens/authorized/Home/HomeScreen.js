


import { View, Text, TouchableOpacity, Dimensions, FlatList, StyleSheet, ScrollView, Image, Platform, Alert } from 'react-native'
import React, { useState, useCallback } from 'react'
import MainContainer from '../../../components/MainContainer'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../../utilities/colors'
import Header from '../../../components/Header'
import SearchSection from '../../../components/SearchSection'
import ImageSlider from '../../../components/ImageSlider'
import ROUTES from '../../../Navigation/routes';
import { useSelector } from 'react-redux';
import { useFetchProductsQuery, useSaveProductMutation, useRateProductMutation } from '../../../redux/features/product/productApi';
import ProductCard from '../../../components/ProductCard';
import Thumb from "../../../assets/svg/thumbnail.svg"
import StatusModal from '../../../components/StatusModal';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { full_name, phone, id } = useSelector(state => state.userAuth);
  console.log(full_name, phone, id)
  const { data, error, isLoading } = useFetchProductsQuery(0);
  const [saveProduct, { isLoading: isSaving }] = useSaveProductMutation();
  const [rateProduct, { isLoading: isRating }] = useRateProductMutation();

  const products = data?.data.slice(0, 6) || [];

  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ icon: '', message: '', buttonColor: "" });
  const handleCloseModal = () => {
      setModalAlertVisible(false);
    };


  const handleSaveProduct = async (productId) => {
    try {
      const response = await saveProduct({ productId }).unwrap();
      console.log("Save Product Response:", response); // Log the response
      Alert.alert("Product Saved", "The product has been saved successfully.");
      setModalContent({
        icon: 'checkmark-circle-outline',
        message: 'The product has been saved successfully!',
        buttonColor: Colors.Orange,
        iconColor: Colors.Orange
    });
    setModalAlertVisible(true);
    } catch (error) {
      console.error("Error saving product:", error);
      Alert.alert("Error", "");
      setModalContent({
        icon: 'close-circle-outline',
        message: 'There was an error saving the product.',
        buttonColor: Colors.Orange,
        iconColor:Colors.Orange
      });
      setModalAlertVisible(true);
    }
  };

  const handleRateProduct = async (productId, rating) => {
    try {
      await rateProduct({ productId, rating }).unwrap();
      Alert.alert("Product Rated", "The product has been rated successfully.");
    } catch (error) {
      console.error("Error rating product:", error);
      Alert.alert("Error", "There was an error rating the product.");
    }
  };

  return (
    <MainContainer>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Thumb />
          <View style={{}}>
            <Ionicons name="person-outline" size={40} color={Colors.Orange} style={{ marginRight: 1 }} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={{ fontSize: 26, fontWeight: "600", color: Colors.Orange, paddingTop: 25, lineHeight: 36, width: 280, fontFamily: "Poppins" }}>What would you like to order</Text>
          {/* <SearchSection /> */}
          <ImageSlider />

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
            <Text style={{ color: Colors.Gray_00, fontSize: 14, fontWeight: "600", fontFamily: "Poppins" }}>Latest Hairs</Text>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.PRODUCT_SCREEN)}>
            </TouchableOpacity>
          </View>
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                handleSaveProduct={handleSaveProduct}
                handleRateProduct={handleRateProduct}
                navigation={navigation}
              />
            )}
          />
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
    </MainContainer>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  scrollContent: {
    paddingHorizontal: 0.5,
    paddingVertical: 1,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.White,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
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
  indicatorContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: Colors.Orange,
    borderRadius: 30,
    paddingHorizontal: 5,
  },
  indicatorText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: "Poppins"
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
    marginVertical: 5,
    color: Colors.Gray_01,
    fontFamily: "Poppins"
  },
  discountPrice: {
    fontSize: 10,
    color: Colors.Orange,
    fontWeight: "600",
    fontFamily: "Poppins"
  },
  price: {
    fontSize: 8,
    color: Colors.Gray_01,
    textDecorationLine: 'line-through',
    left: 3,
    fontWeight: "400",
    fontFamily: "Poppins"
  },
  delivery: {
    fontSize: 10,
    color: Colors.Black,
    textAlign: "center",
    fontWeight: "400",
    marginVertical: 2,
    fontFamily: "Poppins"
  },
  engagement: {
    fontSize: 9,
    fontWeight: "400",
    color: Colors.Black,
    marginBottom: 1,
    marginTop: 5,
    fontFamily: "Poppins"
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
    fontWeight: "700",
    color: Colors.White,
    fontFamily: "Poppins"
  }
});
