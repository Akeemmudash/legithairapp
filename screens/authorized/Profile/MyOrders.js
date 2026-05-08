
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import MainContainer from '../../../components/MainContainer';
import Back from '../../../components/Back';
import { Colors } from '../../../utilities/colors';
import Arrow from "../../../assets/svg/arrow_forward_ios.svg";
import { useGetOrderHistoryQuery } from '../../../redux/features/order/orderApi';
import ROUTES from '../../../Navigation/routes';
import { FlatList } from 'react-native-gesture-handler';
import { useTranslate } from '../../../utilities/hooks/useTranslate';

const MyOrders = ({ navigation }) => {
  const { data: orderData, error: orderError, isLoading: orderLoading, refetch } = useGetOrderHistoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation, refetch]);

  const orderDetails = orderData?.data;

  const texts = [
    "My Orders",
    "Recent Orders",
    "Order ID:",
    "Date:",
    "No order details",
  ];
  const translate = useTranslate(texts);

  return (
    <MainContainer>
      <Back title={translate("My Orders")} />

      <Text style={styles.label}>{translate("Recent Orders")}</Text>

      <FlatList
        data={orderDetails}
        keyExtractor={(item) => item.order_id.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View>
            <Text style={styles.emptyText}>{translate("No order details")}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.cardContainer}
            onPress={() => navigation.navigate(ROUTES.TRACK_ORDER, { item })}
          >
            <View style={styles.infoContainer}>
              <Text style={styles.statusLabel}>{translate("Order ID:")}</Text>
              <Text style={styles.status}>{item.order_id}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.statusLabel}>{translate("Date:")}</Text>
              <Text style={styles.status}>{item.date}</Text>
            </View>
            <View>
              <Arrow />
            </View>
          </TouchableOpacity>
        )}
      />
    </MainContainer>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.Gray,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusLabel: {
    fontWeight: "400",
    fontSize: 10,
    color: Colors.Gray_04,
    marginRight: 5,
    fontFamily: "Poppins"
  },
  status: {
    fontWeight: "400",
    fontSize: 10,
    color: Colors.Orange_01,
    fontFamily: "Poppins"
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.Gray,
    marginBottom: 5,
    fontFamily: "Poppins"
  },
  emptyText: {
    fontWeight: "600",
    fontSize: 12,
    color: Colors.Gray_05,
    fontFamily: "Poppins"
  },
});

