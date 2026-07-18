import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import React, { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { Colors } from '../../../utilities/colors';
import CustomButton from '../../../components/CustomButton';
import Back from '../../../components/Back';
import MainContainer from '../../../components/MainContainer';
import Ionicons from '@expo/vector-icons/Ionicons';
import StatusModal from '../../../components/StatusModal';
import { useTranslate } from '../../../utilities/hooks/useTranslate';

const APP_STORE_URL = 'https://apps.apple.com/ng/app/legit-hair/id6763316428';
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.techstackcompany.legithair';

const ShareScreen = () => {
  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ icon: '', message: '', buttonColor: '' });

  const handleCloseModal = () => {
    setModalAlertVisible(false);
  };

  const copyToClipboard = (link, label) => {
    Clipboard.setStringAsync(link);
    setModalContent({
      icon: 'checkmark-circle-outline',
      message: `${label} link has been copied!`,
      buttonColor: Colors.Orange,
      iconColor: Colors.Orange,
    });
    setModalAlertVisible(true);
  };

  const onShare = async () => {
    try {
      await Share.share({
        message:
          `Download Legit Hair 💇` +
          '\n\n' +
          `App Store: ${APP_STORE_URL}` +
          '\n' +
          `Play Store: ${PLAY_STORE_URL}`,
      });
    } catch {}
  };

  const texts = [
    'Invite Friend',
    'Copy',
    'Invite Your Friends',
    'Download Legit Hair on your favourite store',
    'App Store',
    'Play Store',
  ];
  const translate = useTranslate(texts);

  const stores = [
    { label: translate('App Store'), icon: 'logo-apple', link: APP_STORE_URL },
    { label: translate('Play Store'), icon: 'logo-google-playstore', link: PLAY_STORE_URL },
  ];

  return (
    <MainContainer>
      <View>
        <Back title={translate('Invite Friend')} />
      </View>

      <Text style={styles.subtitle}>
        {translate('Download Legit Hair on your favourite store')}
      </Text>

      {stores.map((store) => (
        <View key={store.label} style={styles.storeRow}>
          <View style={styles.storeInfo}>
            <Ionicons name={store.icon} size={22} color={Colors.Orange} />
            <View style={styles.storeText}>
              <Text style={styles.storeLabel}>{store.label}</Text>
              <Text style={styles.storeLink} numberOfLines={1} ellipsizeMode="tail">
                {store.link}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonWishlist}
            activeOpacity={0.6}
            onPress={() => copyToClipboard(store.link, store.label)}
          >
            <Text style={styles.copyText}>{translate('Copy')}</Text>
            <Ionicons name="copy-outline" size={15} color={Colors.Orange} style={{ marginLeft: 1 }} />
          </TouchableOpacity>
        </View>
      ))}

      <View style={{ marginTop: 20 }} />
      <CustomButton
        title={translate('Invite Your Friends')}
        onPress={onShare}
        borderColor={Colors.Orange}
        color={Colors.Orange}
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

export default ShareScreen;

const styles = StyleSheet.create({
  ScreenStyle: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  subtitle: {
    color: Colors.Black,
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    marginTop: 30,
    marginBottom: 10,
  },
  storeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.Orange,
    borderRadius: 10,
    padding: 12,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  storeText: {
    marginLeft: 10,
    flex: 1,
  },
  storeLabel: {
    color: Colors.Black,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  storeLink: {
    color: Colors.Orange,
    fontSize: 11,
    fontFamily: 'Poppins',
  },
  copyText: {
    color: Colors.Orange,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  buttonWishlist: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: Colors.Orange,
    borderWidth: 1,
    flexDirection: 'row',
  },
});
