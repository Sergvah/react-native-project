import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import {useSelector} from 'react-redux'
import * as Location from "expo-location";
import db from "../../firebase/config"
import { Feather } from '@expo/vector-icons'// import { TextInput } from "react-native-gesture-handler";
import { EvilIcons } from '@expo/vector-icons';

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState(''); 
  const [location, setLocation] = useState(null); 
  // const [camera, setCamera] = Camera.useCameraPermissions();
  // const [photo, setPhoto] = useState(CameraType.back);
const {userId, name} = useSelector((state)=> state.auth)
const [isShowKeyboard, setShowKeyboard] = useState(false);
const [locationName, setLocationName] = useState("");


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      // const coords = {
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      // };
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const takePhoto = async () => {
    console.log("comment", comment);
 
    console.log("location", location);

    const {uri} = await camera.takePictureAsync();

    setPhoto(uri);
    console.log("uri--->", uri);
    // let location = await Location.getCurrentPositionAsync({});
  };

  const sendPhoto = () => {
    upLoadPostToServer()
    navigation.navigate("Публикации", { photo });
    () => setShowKeyboard(false);
    reset()
  };

  const upLoadPostToServer = async () => {
    const photo = await upLoadPhotoToServer();
    const createPost = await db
      .firestore()
      .collection("posts")
      .add({ photo, comment, location: location.coords, userId, name });
  };

  const upLoadPhotoToServer = async() => {

    const response = await fetch(photo);
    const file = await response.blob()
    const uniquePostId = Date.now().toString()
  
    Keyboard.dismiss();

    await db.storage().ref(`postImage/${uniquePostId}`).put(file);
  
    const processedPhoto = await db.storage().ref("postImage").child(uniquePostId).getDownloadURL()
    
    return processedPhoto;
  }
  const reset = () => {
    setLocationName("");
    setComment("");
    setPhoto(null);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.createPost}>Создать публикацию</Text>
      </View>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ width: 200, height: 200,
                borderRadius: 10 }}
            />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto} style={styles.btnCamera}>
          {/* <Text style={styles.iconCamera}>+</Text> */}
          <Feather name="camera" size={24} color="#c0c0c0" />
        </TouchableOpacity>
      </Camera>
      <View>
        <Text style={styles.photoTitle}>Загрузите фото</Text>
      </View>
      <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
      <View style={styles.commentName}>
        <TextInput style={styles.photoTitle} onChangeText={setComment} placeholder={"Название..."}  onFocus={() => {
                  setShowKeyboard(true);
                }}/>
      </View>
      <View style={styles.commentNameLoc}>
      <EvilIcons name="location" size={26} color="grey" />
        <TextInput style={styles.photoTitle}  placeholder={"Местность..."} value={locationName}
              onChangeText={setLocationName} onFocus={() => {
                  setShowKeyboard(true);
                }}/>
      </View>
      <TouchableOpacity onPress={sendPhoto} style={styles.publishBtnCamera}>
        <Text style={styles.publishCameraTitle}>Опубликовать</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
    </TouchableWithoutFeedback>
  );
};
export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    // alignItems: "center",
  },
  containerHeader:{
    height:80,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderBottomColor: "#d3d3d3",
    borderColor:'transparent',
    // ...styles.form,
                // marginBottom: isShowKeyboard ? 0 : 100,
                // width: dimensios,
                // backgroundColor: "#f8f8ff",
                // borderTopLeftRadius: 25,
                // borderTopRightRadius: 25,
  },
  camera: {
    marginTop: 25,
    marginHorizontal: 15,
    height: "40%",
    borderRadius: 25,
    justifyContent: "center",

    // backgroundColor: "#d3d3d3",
    alignItems: "center",
    // borderColor:"transparent",

  },
  createPost: {
    textAlign: "center",
    marginTop: 45,
    fontSize: 18,
    fontWeight: "bold",
    
    // borderWidth: 2,
    // // borderColor: "#ff1493",
    // borderTopColor: "#40e0d0",
  },
  // iconCamera: {
  //   fontSize: 30,
  //   color: "#c0c0c0",
  // },
  btnCamera: {
    alignItems: "center",
    height: 50,
    width: 50,
    borderWidth: 2,
    borderColor: "#c0c0c0",
    borderRadius: 25,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  takePhotoContainer: {
    position: "absolute",
    // top: 20,
    // left: 40,
    borderColor: "transparent",
    borderWidth: 1,
    justifyContent: "center",
    backgroundColor: "#f8f8ff",
  },
  publishBtnCamera: {
    marginTop:20,
    marginHorizontal: 40,
    backgroundColor: "#dcdcdc",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,

    // textAlign: "center",
  },
  photoTitle: {
    color: "#d3d3d3",
    marginLeft: 15,
    marginTop: 10,
    fontSize: 18,
  },
  publishCameraTitle: {
    fontSize: 18,
    color: "#a9a9a9",
  },
  commentName:{
    height:40,
    marginTop:30,
    borderWidth: 1,
    borderBottomColor: "#d3d3d3",
    borderColor:'transparent',
    marginHorizontal: 15,
  },
  commentNameLoc:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height:40,
    marginTop:30,
    marginHorizontal: 15,
    borderWidth: 1,
    borderBottomColor: "#d3d3d3",
    borderColor:'transparent', 
  }
});
