
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Switch, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MainContainer from '../../../components/MainContainer';
import Back from '../../../components/Back';
import ArrowForward from "../../../assets/svg/ArrowForward.svg";
import { Colors } from '../../../utilities/colors';
import ROUTES from '../../../Navigation/routes';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFetchDashboardsQuery } from '../../../redux/features/product/productApi';
import { useTranslate } from '../../../utilities/hooks/useTranslate';

const SupportScreen = ({  }) => {
    const navigation = useNavigation();

    const { data: dashboardData, error: dashboardError, isLoading: dashboardLoading } = useFetchDashboardsQuery();

    useEffect(() => {
        if (dashboardData) {
            // console.log("Saved products:", dashboardData);
        }
    }, [dashboardData]);
  
    const admin_number = dashboardData?.customer_care;
    const admin_email = dashboardData?.customercare_email;

    console.log(admin_email, admin_number);


    const handlePhoneNumberClick = (phoneNumber) => {
        Linking.openURL(`tel:${admin_number}`);
      };

      const texts = [
        "Support",
        "Phone Number",
        "Email Us"
      ];
    
      const translate = useTranslate(texts);


    const SettingsList = [
        {
            id: 1,
            title: translate("Phone Number") || "Phone Number",
            icon: "call-outline",
            onPressed: () => handlePhoneNumberClick(admin_number)
        },
        {
            id: 2,
            title: translate("Email Us") || "Email Us",
            icon: "mail-outline",
            onPressed: () => Linking.openURL(`mailto:${admin_email}`)
        },

    ];

  

    return (
        <MainContainer>
            <Back title={translate("Support")} />

            <FlatList
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={SettingsList}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity 
                        onPress={() => item.onPressed ? item.onPressed() : navigation.navigate(item.link)}
                        >
                            <View style={styles.CardContainer}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignContent: "center", alignItems: "center" }}>
                                        <View>
                                        <Ionicons name={item?.icon} size={35} color={Colors.Orange} style={{ marginRight: 1 }} />
                                        </View>
                                        <View style={{ marginHorizontal: 5 }}>
                                            <Text style={{ color: Colors.Black_00, fontWeight: "600", fontSize: 14, fontFamily: "Poppins" }}>{item?.title} </Text>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: "center" }}>
                                            <ArrowForward />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </MainContainer>
    );
};

export default SupportScreen;

const styles = StyleSheet.create({
    CardContainer: {
        backgroundColor: "transparent",
        paddingHorizontal: 1,
        paddingVertical: 11,
        marginTop: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.Gray,
    },
});


// import { View, Text } from 'react-native'
// import React from 'react'

// const SupportScreen = () => {
//   return (
//     <View>
//       <Text>SupportScreen</Text>
//     </View>
//   )
// }

// export default SupportScreen