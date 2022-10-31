import { View, Text, FlatList } from "react-native";
import React, { useEffect, useCallback } from "react";
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from "react-navigation-header-buttons";
import colors from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import supportdLangauge from "../utils/supportedLnaguage";
import LanguageItem from "../components/LanguageItem";

export default function LanguageSelectScreen({ navigation, route }) {
  const CustomHeaderButton = (props) => {
    return (
      <HeaderButton
        {...props}
        IconComponent={Ionicons}
        iconSize={23}
        color={props.color || colors.primary}
      />
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.title,
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              iconName="close"
              color={colors.textColor}
              onPress={() => navigation.goBack()}
            />
          </HeaderButtons>
        );
      },
    });
  }, [navigation]);

  const selectLanguage = useCallback(
    (languageData) => {
     
      let dataKey = route.params.mode === "to" ? "languageTo" : "languageFrom";
      navigation.navigate('HomeScreen',{ [dataKey] :languageData})
    },
    [navigation, route]
  );

  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        removeClippedSubviews
        // data={Object.keys(supportdLangauge)}
        data ={supportdLangauge}
        renderItem={(itemData) => {
          // let languageKey = itemData.item;
          // let language = supportdLangauge[languageKey];
        

          return (
            <LanguageItem
              // language={language}
              // selected={languageKey === route.params?.lang}
              // onPress={() => selectLanguage(languageKey)}
              language={itemData.item.name}
              selected={itemData.item.code === route.params?.lang}
              onPress={() => selectLanguage(itemData.item)}
              
            />
          );
        }}
      />
    </View>
  );
}
