import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import colors from "../utils/colors";
import ResultHistory from "../components/ResultHistory";

export default function SavedScreen() {
  const dispatch = useDispatch();
  const savedItem = useSelector((state) => state.savedSearch.items);

  if (savedItem.length === 0) {
    return (
      <View style={styles.nothingShowContainer}>
        <Text style={styles.nothingShowText}>Nothing to Show</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedItem.slice().reverse()}
        renderItem={(item) => {
          return <ResultHistory item={item.item} />;
        }}
        keyExtractor={(item) => item.toString() + Math.random()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundGrey,
    padding: 10,
  },
  nothingShowContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nothingShowText: {
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
});
