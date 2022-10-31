import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import colors from "../utils/colors";
import SettingItem from "../components/SettingItem";
import { AntDesign } from "@expo/vector-icons";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearHistory } from "../redux/historySlice";
import { addSavedSearch } from "../redux/savedSearchSlice";

export default function SettingScreen() {
  const dispatch = useDispatch();

  const deleteHistory = useCallback(async () => {
    try {
      await AsyncStorage.setItem("history", JSON.stringify([]));
      dispatch(clearHistory())
      Alert.alert('History deleted');
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const deleteSavedItem = useCallback(async () => {
    try {
      await AsyncStorage.setItem("savedItem", JSON.stringify([]));
      dispatch(addSavedSearch([]))
      Alert.alert('Saved Items deleted');
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <SettingItem
        title="Clear History"
        subTitle="Clear all items from the history"
        icon="delete"
        iconFamily={AntDesign}
        onPress={deleteHistory}
      />
      <SettingItem
        title="Clear Saved Item"
        subTitle="Clear all Saved items"
        icon="delete"
        iconFamily={AntDesign}
        onPress={deleteSavedItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
    padding: 10,
  },
});
