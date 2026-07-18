import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useFetchCategoriesQuery } from "../redux/features/product/productApi";
import { Colors } from "../utilities/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Thumb from "../assets/svg/thumbnail.svg";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const SelectItemModal = ({
  visible,
  onClose,
  onSelectItem,
  onSelectItemText,
  selectedText,
  selectedId,
}) => {
  const { data, error, isLoading } = useFetchCategoriesQuery();
  const [expandedItems, setExpandedItems] = useState([]);

  if (isLoading) {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <Pressable style={styles.overlay} onPress={onClose}>
          <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.Orange} />
          </View>
        </Pressable>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <Pressable style={styles.overlay} onPress={onClose}>
          <View style={styles.container}>
            <Text style={styles.title}>Failed to load categories</Text>
          </View>
        </Pressable>
      </Modal>
    );
  }

  const handlePressItem = (itemId) => {
    setExpandedItems((prevExpandedItems) =>
      prevExpandedItems.includes(itemId)
        ? prevExpandedItems.filter((id) => id !== itemId)
        : [...prevExpandedItems, itemId],
    );
  };

  const handleFinalItemPress = (itemId) => {
    onSelectItem(itemId);
    onClose();
  };

  const handleSelectText = (text) => {
    if (typeof text === "string") {
      onSelectItemText(text.toLowerCase());
      onClose();
    }
  };

  const renderItem = ({ item }) => {
    const hasChildren = Array.isArray(item?.children) && item.children > 0;
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() =>
            hasChildren
              ? handlePressItem(item.id)
              : handleFinalItemPress(item?.id)
          }
        >
          <View style={styles.itemRow}>
            {hasChildren ? (
              <Ionicons
                name={
                  expandedItems.includes(item.id)
                    ? "chevron-up-sharp"
                    : "chevron-down-sharp"
                }
                size={20}
                color={Colors.Orange}
              />
            ) : (
              <Ionicons
                name={
                  !isNaN(Number(item.id)) &&
                  Number(item.id) === Number(selectedId)
                    ? "radio-button-on-outline"
                    : "radio-button-off-outline"
                }
                size={20}
                color={Colors.Orange}
              />
            )}
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
        {expandedItems.includes(item.id) && item.children.length > 0 && (
          <FlatList
            data={item.children}
            keyExtractor={(child) => child.id.toString()}
            renderItem={
              item.children[0]?.children?.length > 0
                ? renderItem
                : renderFinalItem
            }
            style={styles.childList}
          />
        )}
      </View>
    );
  };

  const renderFinalItem = ({ item }) => (
    <TouchableOpacity
      style={styles.childContainer}
      onPress={() => handleFinalItemPress(item.id)}
    >
      <View style={styles.childRow}>
        <Ionicons
          name="ellipse"
          size={10}
          color={Colors.Orange}
          style={styles.dotIcon}
        />
        <Text style={styles.childText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <SafeAreaView edges={["top"]}>
            <View style={styles.header}>
              <Thumb style={styles.thumb} />
              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButtonContainer}
              >
                <Ionicons name="close" size={40} color={Colors.Orange} />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 30, padding: 5 }}>
              <FlatList
                data={data.concat({ name: "All", id: 0 })}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListFooterComponent={<View style={styles.footer} />}
              />
            </View>
          </SafeAreaView>
        </View>
      </Pressable>
    </Modal>
  );
};

export default SelectItemModal;

const styles = StyleSheet.create({
  container: {
    width: width * 0.7,
    backgroundColor: "white",
    borderRadius: 0,
    padding: 20,
    flex: 1,
  },
  overlay: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemText: {
    padding: 10,
    fontSize: 18,
    color: Colors.Black,
    fontFamily: "Poppins",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  childContainer: {
    paddingLeft: 20,
    marginBottom: 5,
  },
  childText: {
    fontSize: 16,
    color: Colors.Gray,
    fontFamily: "Poppins",
  },
  childRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dotIcon: {
    marginRight: 10,
  },
  closeButtonContainer: {
    // Add any additional styles for the close button container if needed
  },
  footer: {
    height: 50, // or adjust based on your needs
  },
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
});
