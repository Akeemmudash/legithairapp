
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Menu from "../assets/svg/Menu.svg";
import { Colors } from '../utilities/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCurrency } from '../redux/features/currencySlice';
import CustomDropdown from './CustomDropDown';
import CustomCurrencyDropDown from './CustomCurrencyDropDown';

const Header = ({ onPress, Press }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const rates = useSelector((state) => state.currency.rates);
  const selectedCurrency = useSelector((state) => state.currency.selectedCurrency);


  const handleCurrencyChange = (currency) => {
    dispatch(setSelectedCurrency(currency));
  };


  const currencyOptions = Object.keys(rates).map(currency => ({
    label: currency,
    value: currency,
  }));

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
     <View style={{ flexDirection: "row", }}>
     <TouchableOpacity
        style={{ padding: 10, backgroundColor: Colors.White, elevation: 3, borderRadius: 8, marginRight: 10 }}
        onPress={onPress}
      >
        <Menu />
      </TouchableOpacity>
      <CustomCurrencyDropDown
        label="Select Currency"
        options={currencyOptions}
        selectedValue={selectedCurrency}
        onSelect={handleCurrencyChange}
      />
     </View>
      <TouchableOpacity onPress={Press} style={{ alignItems: "center" }}>
        <Ionicons name="person-outline" size={40} color={Colors.Orange} style={{ marginRight: 1 }} />
      </TouchableOpacity>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  childList: {
    marginLeft: 20,
  },
  header: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: 150,

  },
})



