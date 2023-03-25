import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import {useDispatch} from 'react-redux'
import {authSignInUser} from '../../redux/auth/authOperations'
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();
import * as Font from "expo-font";

export default function RegistrationScreen({ navigation }) {
  // const [state, useState] = useState(initialState);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [isShowKeyboard, setShowKeyboard] = useState(false);
  const [dimensios, seDimensions] = useState(Dimensions.get("window").width);

  const passwordHandler = (text) => setPassword(text);
  const emailHandler = (text) => setEmail(text);

  const dispatch = useDispatch()
  const handleSubmit = () => {
    () => setShowKeyboard(false);
    // Alert.alert("Password", password);
    // Alert.alert("Email", email);
    const UserData = { password, email };
    dispatch(authSignInUser(UserData))
    setPassword("");
    setEmail("");
    Keyboard.dismiss();
  };
  const onClose = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
  };
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
    };
    Dimensions.addEventListener("change", onChange);
    return;
    () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.images}
          source={require("../../assets/images/mountain.jpeg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 0 : 100,
                width: dimensios,
                backgroundColor: "#f8f8ff",
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Войти</Text>
              </View>
              <TextInput
                onFocus={() => {
                  setShowKeyboard(true);
                }}
                value={email}
                onChangeText={emailHandler}
                placeholder="Адрес электронной почты"
                style={styles.input}
              />
              <TextInput
                onFocus={() => {
                  setShowKeyboard(true);
                }}
                value={password}
                onChangeText={passwordHandler}
                placeholder="Пароль"
                secureTextEntry={true}
                style={styles.input}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={handleSubmit}
              >
                <Text style={styles.btnTitle}>Войти</Text>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{ color: "#000000", fontSize: 18, marginBottom: 5 }}
                >
                  Нет аккаунта?
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#00bfff",
                      fontSize: 18,
                      marginBottom: 5,
                      padding: 10,
                      //   backgroundColor: "#d3d3d3",
                    }}
                    onPress={() => navigation.navigate("Register")}
                  >
                    Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // backgroundColor: "#ecf0f1",
  },
  form: {
    // marginHorizontal: 30,
    // marginBottom: 100,
  },

  input: {
    // width: 200,
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: `#d3d3d3`,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 18,
    color: `#000000`,
    backgroundColor: "#f0f8ff",
  },
  images: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
    marginTop: 30,
  },
  headerTitle: {
    color: "#000000",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Roboto-Bold",
  },
  btn: {
    backgroundColor: `#87ceeb`,

    borderRadius: 40,
    // borderColor: `#87ceeb`,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 80,
    ...Platform.select({
      ios: {
        backgroundColor: `#00bfff`,
        borderColor: `#f0ffff`,
      },
      android: {
        backgroundColor: `#87ceeb`,
        borderColor: `#f0ffff`,
      },
    }),
  },
  btnTitle: {
    fontSize: 18,
    color: `#f5fffa`,
  },

  borderChangeColor: {
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: `#d3d3d3`,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 18,
    color: `#000000`,
    borderColor: "#b22222",
  },
});
