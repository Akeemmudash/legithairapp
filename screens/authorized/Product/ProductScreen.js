import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  RefreshControl,
  StyleSheet,
  TextInput,
} from "react-native";
import {
  useFetchProductsQuery,
  useRateProductMutation,
  useSaveProductMutation,
  useSearchProductsQuery,
} from "../../../redux/features/product/productApi";
import { Colors } from "../../../utilities/colors";
import ProductCard from "../../../components/ProductCard";
import StatusModal from "../../../components/StatusModal";
import Header from "../../../components/Header";
import MainContainer from "../../../components/MainContainer";
import SelectItemModal from "../../../components/SelectItemModal";
import ImageSlider from "../../../components/ImageSlider";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import ROUTES from "../../../Navigation/routes";
import { FlatList } from "react-native-gesture-handler";
import { useTranslate } from "../../../utilities/hooks/useTranslate";

const ITEM_HEIGHT = 200;

const ProductScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategoryText, setSelectedCategoryText] = useState("");
  const [savedProducts, setSavedProducts] = useState([]);
  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    icon: "",
    message: "",
    buttonColor: Colors.Green,
  });
  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading, isFetching, refetch } = useFetchProductsQuery({
    page: currentPage,
  });

  const {
    data: searchData,
    error: searchError,
    isLoading: isSearching,
  } = useSearchProductsQuery(selectedId || searchText || selectedCategoryText, {
    skip: !searchText && !selectedId && !selectedCategoryText,
  });

  const { full_name, phone, email } = useSelector((state) => state.userAuth);

  useEffect(() => {
    if (searchText || selectedId) {
      if (!isSearching) {
        setProducts(searchData?.data || []);
        setHasMore(false);
      }
    } else if (data) {
      setProducts((prevProducts) => {
        const newProducts = data.data.filter(
          (product) => !prevProducts.some((p) => p.id === product.id),
        );
        return currentPage === 1
          ? newProducts
          : [...prevProducts, ...newProducts];
      });
      setHasMore(currentPage < (data.total_pages || 0));
    }
  }, [data, searchData, searchText, selectedId, currentPage, isSearching]);

  const loadMoreProducts = useCallback(() => {
    if (!isFetching && hasMore && !searchText && !selectedId) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [isFetching, hasMore, searchText, selectedId]);

  const renderFooter = useMemo(
    () => (
      <View style={styles.footer}>
        {isLoading || isFetching ? (
          <ActivityIndicator size="large" color={Colors.Orange} />
        ) : !hasMore && products.length > 0 ? (
          <Text style={styles.noMoreProducts}>No more products available</Text>
        ) : null}
      </View>
    ),
    [isLoading, isFetching, hasMore, products.length],
  );

  const [saveProduct] = useSaveProductMutation();
  const [rateProduct] = useRateProductMutation();

  const handleSaveProduct = async (productId) => {
    const isProductSaved = savedProducts.some(
      (product) => product.id === productId,
    );

    try {
      await saveProduct({ productId }).unwrap();
      setSavedProducts((prev) =>
        isProductSaved
          ? prev.filter((product) => product.id !== productId)
          : [...prev, { id: productId }],
      );
      await refetch();
    } catch (error) {
      setModalContent({
        icon: "close-circle-outline",
        message: "Error saving product. Please try again.",
        buttonColor: Colors.Orange,
        iconColor: Colors.Orange,
      });
      setModalAlertVisible(true);
    }
  };

  const handleRateProduct = async (productId, rating) => {
    try {
      await rateProduct({ productId, rating }).unwrap();
    } catch (error) {
      // Handle error
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      setCurrentPage(1);
      setProducts([]);
      const response = await refetch();
      if (response.data) {
        setProducts(response.data.data || []);
      }
      setHasMore(response.data?.total_pages > 1);
    } finally {
      setRefreshing(false);
    }
  };

  const openSelectItemModal = () => setModalVisible(true);
  const closeSelectItemModal = () => setModalVisible(false);

  const resetFilter = () => {
    setProducts([]);
    setCurrentPage(1);
  };

  const handleSelectItem = (id) => {
    setSelectedId(id);
    setSearchText("");
    setSelectedCategoryText("");
    resetFilter();
    closeSelectItemModal();
  };

  const handleSearch = (text) => {
    setSearchText(text);
    setSelectedId(null);
    setSelectedCategoryText("");
    resetFilter();
  };

  const handleSelectCategoryText = (text) => {
    setSelectedCategoryText(text);
    setSearchText("");
    setSelectedId(null);
    resetFilter();
  };

  const handleCloseModal = () => setModalAlertVisible(false);

  useEffect(() => {
    if (isLoading) {
    }

    if (data) {
    }

    if (searchData) {
    }
  }, [data, searchData, isLoading]);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.productCard}>
        <ProductCard
          item={item}
          handleSaveProduct={handleSaveProduct}
          handleRateProduct={handleRateProduct}
          navigation={navigation}
        />
      </View>
    ),
    [handleSaveProduct, handleRateProduct, navigation],
  );

  const texts = ["What would you like to order", "Search Product"];

  const translate = useTranslate(texts);

  return (
    <MainContainer>
      <Header
        onPress={openSelectItemModal}
        onClose={closeSelectItemModal}
        Press={() =>
          navigation.navigate("Profile", { screen: ROUTES.PROFILE_SCREEN })
        }
      />

      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.title}>
              {translate("What would you like to order")}
            </Text>
            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={25}
                color={Colors.Orange}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder={translate("Search Product")}
                value={searchText}
                onChangeText={handleSearch}
                placeholderTextColor={Colors.Ash}
                style={styles.searchInput}
              />
            </View>
            {/* <ImageSlider /> */}
          </>
        }
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[Colors.Orange]}
          />
        }
        ListEmptyComponent={
          isSearching ? (
            <View style={styles.emptyContainer}>
              <ActivityIndicator size="large" color={Colors.Orange} />
              <Text style={styles.emptyText}>Searching...</Text>
            </View>
          ) : (searchText || selectedId)
            ? searchData?.data?.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Ionicons name="search-outline" size={60} color={Colors.Ash} />
                  <Text style={styles.emptyText}>
                    {`No products found for "${searchText || selectedId}"`}
                  </Text>
                </View>
              ) : null
            : !isLoading && !isFetching && data?.data?.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Ionicons name="search-outline" size={60} color={Colors.Ash} />
                  <Text style={styles.emptyText}>No products available</Text>
                </View>
              ) : null
        }
        ListFooterComponent={renderFooter}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />

      <SelectItemModal
        visible={modalVisible}
        onClose={closeSelectItemModal}
        onSelectItem={handleSelectItem}
        onSelectItemText={handleSelectCategoryText}
        selectedText={selectedCategoryText}
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
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: Colors.Orange,
    paddingTop: 25,
    lineHeight: 36,
    width: 246,
    fontFamily: "Poppins",
  },
  searchContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.Orange,
    borderRadius: 40,
    padding: 7.5,
    backgroundColor: Colors.White,
    flex: 1,
    marginRight: 10,
    marginBottom: 15,
  },
  searchIcon: {
    marginLeft: 10,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  searchInput: {
    flex: 1,
    color: Colors.Black,
    paddingVertical: 5,
    marginLeft: 10,
    fontFamily: "Poppins",
  },
  noMoreProducts: {
    fontSize: 16,
    color: Colors.Ash,
    fontFamily: "Poppins",
    paddingVertical: 20,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  productCard: {
    width: "49%",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.Ash,
    fontFamily: "Poppins",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default ProductScreen;
