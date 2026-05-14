



import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, Button, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import MainContainer from "../../../components/MainContainer";
import { Colors } from '../../../utilities/colors';
import Back from '../../../components/Back';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRateProductMutation } from '../../../redux/features/product/productApi';
import { Rating } from 'react-native-ratings';
import CustomButton from '../../../components/CustomButton';
import StatusModal from '../../../components/StatusModal';
import { FlatList } from 'react-native-gesture-handler';
import { useTranslate } from '../../../utilities/hooks/useTranslate';
import formatNaira from '../../../utilities/formatNaira';

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 5,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Colors.Orange,
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: Colors.Orange,
  stepStrokeUnFinishedColor: Colors.Orange,
  separatorFinishedColor: Colors.Black_00,
  separatorUnFinishedColor: Colors.Orange,
  stepIndicatorFinishedColor: Colors.Black_00,
  stepIndicatorUnFinishedColor: Colors.Black_00,
  stepIndicatorCurrentColor: Colors.Orange,
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#ffffff',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#ffffff',
  labelColor: Colors.Orange,
  labelSize: 14,
  currentStepLabelColor: Colors.Orange,
};

const OrderTracker = ({ route }) => {
  const { item } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);

  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ icon: '', message: '', buttonColor: "" });
  const handleCloseModal = () => {
    setModalAlertVisible(false);
  };


  const steps = [
    { title: "pending", time: item.date },
    { title: 'Processing', time: 'TBD' },
    { title: 'Shipped', time: 'TBD' },
    { title: 'Delivered', time: 'TBD' }
  ];

  const currentStep = steps.findIndex(step => step.title === item.delivery_status);

  const [rateProduct, { isLoading: isRating }] = useRateProductMutation();

  const handleRateProduct = async (productId, rating) => {
    try {
      await rateProduct({ productId, rating }).unwrap();
      setModalContent({
        icon: 'checkmark-circle-outline',
        message: 'The product has been rated successfully!',
        buttonColor: Colors.Orange,
        iconColor: Colors.Orange
      });
      setModalAlertVisible(true);
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "There was an error rating the product.");
      setModalContent({
        icon: 'close-circle-outline',
        message: 'There was an error rating the product.',
        buttonColor: Colors.Orange,
        iconColor: Colors.Orange
      });
      setModalAlertVisible(true);
    }
  };


  const formatDeliveryLandmark = (landmark) => {
    return landmark.split('\n')[0].trim();
  };

  const texts = [
    "Track your Order",
    "Product Summary",
    "Products",
    "Rate Product",
    "Inches",
    "Quantity",
    "Amount",
    'Order Date',
    'Delivery Status',
    'Payment Method',
    'Payment Status',
    'Delivery Landmark',
    'Order ID',
  ];

  const translate = useTranslate(texts);

  const orderDetails = [
    { key: translate('Order ID'), value: item.order_id },
    { key: translate('Amount Paid'), value: formatNaira(item.amount_paid) },
    { key: translate('Order Date'), value: item.date },
    { key: translate('Delivery Status'), value: item.delivery_status },
    { key: translate("'Payment Method'"), value: item.payment_method },
    { key: translate('Payment Status'), value: item.payment_status },
    { key: translate("'Delivery Landmark'"), value: formatDeliveryLandmark(item.delivery_landmark) }
  ];

  const [selectedProduct, setSelectedProduct] = useState(item.product[0]);
  const [selectedImage, setSelectedImage] = useState(selectedProduct?.product_image?.[0])

  const handleProductChange = (product) => {
    setSelectedProduct(product);
    setSelectedImage(product?.product_image?.[0]);
  };

  const [selectedImages, setSelectedImages] = useState({});


  const handleImageSelect = (productId, image) => {
    setSelectedImages((prevSelectedImages) => ({
      ...prevSelectedImages,
      [productId]: image,
    }));
  };

  const openRatingModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeRatingModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };



  return (
    <MainContainer style={styles.container}>
      <Back title={translate("Track your Order")} />

      <FlatList
        data={orderDetails}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.detailContainer}>
            <Text style={styles.detailKey}>{item.key}      </Text>
            <Text style={styles.detailValue}>{item.value}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View style={styles.stepIndicatorContainer}>
              <Text style={{ fontWeight: "600", fontSize: 12, color: Colors.Gray_05, fontFamily: "Poppins", marginTop: 20 }}>{translate("Product Summary")}</Text>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={currentStep}
                stepCount={steps.length}
                direction="vertical"
                labels={steps.map(step => `${step.title}`)}
                renderStepIndicator={({ position, stepStatus }) => (
                  <View style={[
                    styles.stepIndicator,
                    stepStatus === 'current' ? styles.currentIndicator : styles.defaultIndicator,
                    stepStatus === 'finished' ? styles.finishedIndicator : {}
                  ]}>
                    <View style={[
                      styles.dot,
                      stepStatus === 'current' ? styles.currentDot : styles.defaultDot,
                      stepStatus === 'finished' ? styles.finishedDot : {}
                    ]} />
                  </View>
                )}
              />
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "600", fontSize: 12, color: Colors.Gray_05, fontFamily: "Poppins", marginTop: 20 }}>
              {translate("Products")}
            </Text>
            <FlatList
              data={item.product}
              keyExtractor={(product) => product.product_id.toString()}
              renderItem={({ item }) => (
                <View style={styles.productContainer}>
                  <View style={styles.container}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                    >
                      <Image
                        source={{ uri: selectedImages[item.product_id]?.filename || item.product_image[0]?.filename }}
                        style={styles.selectedImage}
                        resizeMode="cover"
                      />
                      <View style={styles.thumbnailContainer}>
                        {item?.product_image?.map((image, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => handleImageSelect(item.product_id, image)}
                            style={[
                              styles.thumbnailWrapper,
                              image.filename === selectedImages[item.product_id]?.filename ? styles.selectedThumbnail : null,
                            ]}
                          >
                            <Image
                              source={{ uri: image.filename }}
                              style={styles.thumbnail}
                              resizeMode="cover"
                            />
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                  </View>
                  <Text style={styles.productName}>{item.product_name}</Text>
                  <Text style={styles.productDetail}>{translate("Amount")}: {formatNaira(item.product_amount)}</Text>
                  {item?.inches && (
                    <Text style={styles.productDetail}>{translate("Inches")}: {item?.inches}</Text>
                  )}
                  <Text style={styles.productDetail}>{translate("Quantity")}: {item.order_quantity}</Text>
                  <View style={{ marginTop: 10 }}>
                    <CustomButton
                      title={translate("Rate Product")}
                      backgroundColor={Colors.White}
                      borderColor={Colors.Orange}
                      color={Colors.Orange}
                      onPress={() => {
                        setRating(0);
                        setModalVisible(true);
                      }}
                    />
                  </View>
                </View>
              )}
            />
          </>
        )}
      />






      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rate the Product</Text>
            <Rating
              type='star'
              ratingCount={5}
              imageSize={30}
              selectedColor={Colors.Orange}
              onFinishRating={(rating) => setRating(rating)}
              style={styles.rating}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
              <TouchableOpacity style={[styles.button, { marginRight: 10 }]} activeOpacity={0.6}
                onPress={() => {
                  if (rating > 0) {
                    const productId = item.product.map(product => product.product_id)[0];
                    handleRateProduct(productId, rating);
                  }
                }}
              >
                <Text style={{ fontFamily: "Poppins", fontSize: 15, color: Colors.White, textAlign: "center" }}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonCancel, { marginLeft: 10 }]} activeOpacity={0.6} onPress={() => setModalVisible(false)}>
                <Text style={{ fontFamily: "Poppins", fontSize: 15, color: Colors.Orange, textAlign: "center" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  container: {
    flex: 1,
    padding: 20,
  },
  stepIndicatorContainer: {
    height: 500,
    marginTop: 20,
  },
  stepIndicator: {
    width: 30,
    height: 70,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    flex: 1
  },
  defaultIndicator: {
    backgroundColor: '#d3d3d3',
  },
  currentIndicator: {
    backgroundColor: Colors.Orange,
  },
  finishedIndicator: {
    backgroundColor: Colors.Orange,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  defaultDot: {
    backgroundColor: '#fff',
  },
  currentDot: {
    backgroundColor: '#fff',
  },
  finishedDot: {
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 15,
    color: Colors.Gray_05,
    fontFamily: "Poppins"
  },
  selectedImage: {
    width: 300,
    height: 300,
  },
  rating: {
    paddingVertical: 10,
    marginBottom: 15,
  },
  button: {
    // paddingHorizontal: 10,
    width: "45%",
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
  buttonCancel: {
    // paddingHorizontal: 10,
    width: "45%",
    height: 30,
    borderColor: Colors.Orange,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 5
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  detailKey: {
    fontWeight: "600",
    fontSize: 14,
    color: Colors.Gray_04,
    fontFamily: "Poppins",
  },
  detailValue: {
    fontWeight: "600",
    fontSize: 14,
    color: Colors.Gray_05,
    fontFamily: "Poppins",
    textOverflow: 'ellipsis',
    flexShrink: 1,
    whiteSpace: 'nowrap',
    // flex: 2, 
  },
  productContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: Colors.White,
    borderRadius: 5,
    borderColor: Colors.Orange,
    borderWidth: 1,
  },
  productName: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.Black_00,
    marginBottom: 5,
    fontFamily: "Poppins",
  },
  productDetail: {
    fontSize: 13,
    color: Colors.Gray_05,
    fontFamily: "Poppins",
  },
  image: {
    width: 350,
    height: 200,
    borderRadius: 20,
    marginRight: 5,
    borderColor: Colors.Orange,
    borderWidth: 2
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  // thumbnailContainer: {
  //   alignSelf: 'center',
  //   marginTop: 10,
  //   flexWrap: 'wrap',
  //   justifyContent: 'center',
  //   paddingHorizontal: 3,
  //   borderWidth: 2,
  //   paddingVertical: 20,
  //   borderColor: Colors.Black_00,
  //   borderRadius: 100,
  //   alignItems: "center",
  //   backgroundColor: Colors.White,
  //   position: "absolute",
  //   top: 40,
  //   right: 10,
  //   overflow: 'hidden',
  // },
  // thumbnailWrapper: {
  //   marginBottom: 5,
  //   marginRight: 5,
  //   margin: 5
  // },
  // thumbnail: {
  //   width: 33,
  //   height: 33,
  //   borderRadius: 30,
  // },
  // selectedThumbnail: {
  //   borderWidth: 4,
  //   borderColor: Colors.Orange,
  //   borderRadius: 50,
  // },
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
    margin: 5,
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
});

export default OrderTracker;
