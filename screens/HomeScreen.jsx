import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../utils/colors";
import supportedLnaguage from "../utils/supportedLnaguage";
import * as Clipboard from "expo-clipboard";
import translateAPI from "../utils/translateAPI";
import { useDispatch, useSelector } from "react-redux";
import { addHistory,setHistory } from "../redux/historySlice";
import ResultHistory from "../components/ResultHistory";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addSavedSearch } from "../redux/savedSearchSlice";

const getHistory = () => async (dispatch) => {
  try {
      const historyString = await AsyncStorage.getItem('history');
      if(historyString !==null){
        const historyI = JSON.parse(historyString);
        dispatch(setHistory({items:historyI}))
      }
      const savedItemString = await AsyncStorage.getItem('savedItem');
      if(savedItemString !==null){
        const savedI = JSON.parse(savedItemString);
        dispatch(addSavedSearch(savedI))
      }
  } catch (error) {
    console.log('Error in getHistory function',error)
  }
};

export default function HomeScreen({ navigation, route }) {
  const params = route.params || {};
  const [enteredText, setEnteredText] = useState("");
  const [resultText, setResultText] = useState("");
  const [languageTo, setLanguageTo] = useState("hi");
  const [languageFrom, setLanguageFrom] = useState("en");
  const [langToObj, setLangToObj] = useState({
    code: "hi",
    name: "Hindi",
  });
  const [langFromObj, setLangFromObj] = useState({
    code: "en",
    name: "English",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { items: history } = useSelector((state) => state.history);

  useEffect(() => {
    if (params.languageTo) {
      setLanguageTo(params.languageTo.code);
      setLangToObj(params.languageTo);
    }
    if (params.languageFrom) {
      setLanguageFrom(params.languageFrom.code);
      setLangFromObj(params.languageFrom);
    }
  });

  useEffect(() => {
    async function saveHistory() {
      try {
        await AsyncStorage.setItem("history", JSON.stringify(history));
      } catch (error) {
        console.log(error);
      }
    }
    saveHistory();
  }, [history.length]);

  useEffect(()=>{
      dispatch(getHistory());
  },[dispatch])


  const onTranslate = useCallback(async () => {
    try {
      setLoading(true);
      let _id = uuid.v4();
      let resultData = await translateAPI(
        enteredText,
        languageFrom,
        languageTo
      );

      // setResultText(resultData);
      // dispatch(addHistory({item: resultData}))

      dispatch(addHistory({ item: { enteredText, resultData, _id } }));
      setResultText("API Error");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [languageTo, languageFrom, enteredText]);

  const setTextToClipBoard = useCallback(async () => {
    await Clipboard.setStringAsync(resultText);
  }, [resultText]);

  return (
    <View style={styles.container}>
      <View style={styles.languageContainer}>
        <TouchableOpacity
          style={styles.languageOption}
          onPress={() =>
            navigation.navigate("LanguageSelect", {
              title: "Translate from",
              lang: languageFrom,
              mode: "from",
            })
          }
        >
          <Text style={styles.languageText}>{langFromObj.name}</Text>
        </TouchableOpacity>
        <View style={styles.arrowContainer}>
          <AntDesign name="arrowright" size={20} color={colors.lightGrey} />
          <AntDesign name="arrowleft" size={20} color={colors.lightGrey} />
        </View>
        <TouchableOpacity
          style={styles.languageOption}
          onPress={() =>
            navigation.navigate("LanguageSelect", {
              title: "Translate to",
              lang: languageTo,
              mode: "to",
            })
          }
        >
          <Text style={styles.languageText}>{langToObj.name}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter text "
          multiline
          style={styles.textInput}
          onChangeText={(text) => setEnteredText(text)}
        />
        <TouchableOpacity
          style={styles.forwardContainer}
          disabled={enteredText === ""}
          onPress={loading ? undefined : onTranslate}
        >
          {loading ? (
            <ActivityIndicator color={colors.primary} size="small" />
          ) : (
            <Ionicons
              name="arrow-forward-circle"
              size={24}
              color={
                enteredText !== "" ? colors.primary : colors.primaryDisabled
              }
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{resultText}</Text>
        <TouchableOpacity
          style={styles.forwardContainer}
          disabled={resultText === ""}
          onPress={setTextToClipBoard}
        >
          <Ionicons
            name="md-copy-outline"
            size={24}
            color={
              resultText !== "" ? colors.textColor : colors.textColorDisabled
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.historyContainer}>
        <FlatList
          data={history.slice().reverse()}
          renderItem={(item) => {
            return <ResultHistory item={item.item} />;
          }}
          keyExtractor={(item) => item.toString() + Math.random()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  languageContainer: {
    flexDirection: "row",
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  languageOption: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  languageText: {
    color: colors.primary,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
  arrowContainer: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  textInput: {
    color: colors.textColor,
    flex: 1,
    marginTop: 7,
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 90,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
  forwardContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  resultContainer: {
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
    height: 90,
  },
  resultText: {
    color: colors.primary,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    letterSpacing: 0.3,
    fontFamily: "regular",
  },
  historyContainer: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
    padding: 10,
  },
});
