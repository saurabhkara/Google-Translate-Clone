import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import colors from "../utils/colors";

export default function SettingItem(props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {props.title}
        </Text>
        <Text style={styles.subTitle} numberOfLines={1}>
          {props.subTitle}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <props.iconFamily name={props.icon} size={22} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    backgroundColor:'white',
    paddingHorizontal:15,
    paddingVertical:10,
    alignItems:'center',
    justifyContent:'space-between',
    borderColor:colors.lightGrey,
    borderWidth:0.5,
    marginBottom:15,
  },
  textContainer: {
    flex:1,
    marginRight:8,
  },
  title: {
    fontFamily: "medium",
    letterSpacing: 0.3,
    color: colors.textColor,
  },
  subTitle: {
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: 12,
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
