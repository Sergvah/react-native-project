import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import db from "../../firebase/config";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { name } = useSelector((state) => state.auth);
  const {postId} = route.params;
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const photo=route.params.photo
  const createPost = () => {
    if (!comment) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "ERROR",
        textBody: "Please, add your comment",
      });
      return;
    }
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, name });
  };
  const getAllPosts = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setComments(data.docs.map((doc) => ({ ...doc.data(),id:doc.id})))
      );
  };
  useEffect(() => {
    getAllPosts();
  }, [comment]);
  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
       <View style={{marginHorizontal:16, }}>
       <Image source={{ uri: photo }} style={styles.image}/>
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <View style={styles.commentsField}>
              <Text style={styles.user}>{item.name}</Text>
              <View  style={styles.comment}><Text>{item.comment}</Text></View>
            </View>
          )}
          keyExtractor={(item)=>item.id.toString()}
        />
       </View>
       <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS == "ios" ? 40 : 0}  
          >
        <View style={{...styles.form, marginBottom: isShowKeyboard ? 150 : 20}}>
          <TextInput
            style={styles.input}
            placeholder="Комментировать..."
            value={comment}
            onFocus={()=>setIsShowKeyboard(true)}
            onChangeText={setComment}>  
            </TextInput>
          <TouchableOpacity style={styles.button} onPress={createPost}>
            <AntDesign name="arrowup" size={24} color="white" />
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </View>
     </AlertNotificationRoot>
  );
};
const styles = StyleSheet.create({

  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
  },
  form: {
    position: "relative",
    marginHorizontal: 16,
    // marginBottom: 20,
  },
  button: {
    position: "absolute",
    right: 10,
    top: 8,
    width: 24,
    height: 24,
    borderRadius: "50%",
    backgroundColor: "#ff6347",
  },
  comment:{
    minHeight:30,
    justifyContent:"center"
  },
  user:{
    fontFamily:"roboto-bold",
    fontSize: 16,
  },
  input: {
    height: 40,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: "50%",
    backgroundColor: "#F6F6F6",
  },
  commentsField:{
    marginBottom:20,
    borderColor:"transparent",
    borderWidth:1,
    borderRadius:10,
    padding:5,
    backgroundColor: "#F6F6F6",

  },
  image:{
    marginBottom:20,
    height:240,
    borderRadius:10
  }
});
export default CommentsScreen;