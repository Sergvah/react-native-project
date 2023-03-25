import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";

import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();
import * as Font from "expo-font";
import {useDispatch} from 'react-redux'
import {authSignUpUser} from '../../redux/auth/authOperations'

// const initialState = {
//   name: "",
//   password: "",
// };

export default function RegistrationScreen({ navigation }) {
  // const [state, useState] = useState(initialState);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
const dispatch = useDispatch()

  const [isShowKeyboard, setShowKeyboard] = useState(false);
  const [dimensios, seDimensions] = useState(Dimensions.get("window").width);

  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);
  const emailHandler = (text) => setEmail(text);

  const onLogin = () => {
    () => setShowKeyboard(false);
    // Alert.alert("Password", password);
    // Alert.alert("Email", email);
    // Alert.alert("Name", name);
    setName("");
    setPassword("");
    setEmail("");
    Keyboard.dismiss();
    const userData = { name, email, password };
    dispatch(authSignUpUser(userData))

console.log(userData)

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                <Text style={styles.headerTitle}>Регистрация</Text>
              </View>
              <TextInput
                onFocus={() => {
                  setShowKeyboard(true);
                }}
                value={name}
                onChangeText={nameHandler}
                placeholder="Логин"
                style={styles.input}
                // style={name ? styles.borderChangeColor : styles.input}
              />
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
                onPress={onLogin}
              >
                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
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
                  Уже есть аккаунт?
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
                    onPress={() => navigation.navigate("Login")}
                  >
                    Войти
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
