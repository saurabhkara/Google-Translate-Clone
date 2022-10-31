import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { Entypo } from "@expo/vector-icons";
import colors from "../utils/colors";
import { useSelector, useDispatch } from "react-redux";
import { addSavedSearch } from "../redux/savedSearchSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResultHistory({ item }) {
  // const {items} = useSelector(state=>state.history);
  const dispatch = useDispatch();
  const savedItem = useSelector((state) => state.savedSearch.items);
  const isSaved = savedItem.some((i) => i._id === item._id);

  const onAddRemoveToSave =useCallback(async() => {
    let newSavedItem;
    if (isSaved) {
      newSavedItem = savedItem.filter((i) => i._id !== item._id);
    } else {
      newSavedItem = savedItem.slice();
      newSavedItem.push(item);
    }
    await AsyncStorage.setItem('savedItem', JSON.stringify(newSavedItem));
    dispatch(addSavedSearch(newSavedItem));
  },[dispatch,savedItem,isSaved])

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.searchedText}>{item.enteredText}</Text>
        <Text style={styles.resultText}>{item?.resultData[0]}</Text>
      </View>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={onAddRemoveToSave}
      >
        <Entypo
          name={isSaved ? "star" : "star-outlined"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: colors.backgroundGrey,
    borderBottomWidth: 2,
  },
  searchedText: {
    fontFamily: "medium",
  },
  resultText: {
    fontFamily: "regular",
  },
  iconContainer: {},
});
