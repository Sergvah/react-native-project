import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image, Button, Text, Dimensions, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import db from '../../firebase/config'
import { Octicons } from "@expo/vector-icons"
import { EvilIcons } from '@expo/vector-icons';

import { useDispatch, useSelector} from 'react-redux'
import { authSignOutUser } from '../../redux/auth/authOperations'

const Home = ({ route, navigation }) => {
    const [posts, setPosts] = useState([]);
    const [dimensios, seDimensions] = useState(Dimensions.get("window").width);
    const dispatch = useDispatch();

  console.log("route.params", route.params);

const getAllPost = async () => {
  await db
  .firestore()
  .collection("posts")
  .onSnapshot((data)=>
  setPosts(data.docs.map(doc=>({...doc.data(), id: doc.id}))))
}

  useEffect(() => {
    getAllPost()
  }, []);

  const signOut = () => {
    dispatch(authSignOutUser())
  };
  return (
    <View style={styles.container}>
            <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                // marginBottom: isShowKeyboard ? 0 : 100,
                width: dimensios,
                backgroundColor: "#f8f8ff",
              }}>
          <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={signOut}
              >
                <View style={styles.btnTitle}><Octicons name="sign-out" size={24} color="#d3d3d3" /></View>
              </TouchableOpacity>

      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginTop: 15, marginHorizontal:15, marginBottom:20, }}>
            <Image
              source={{ uri: item.photo }}
              style={styles.img}
            />
            <View>
            <Text style={{marginTop:10, fontFamily: "Roboto-Bold" }}>{item.comment}</Text>
            <View style={{flex:1,flexDirection:"row", marginTop:10}}>
                <View>
                  <EvilIcons  onPress={() => navigation.navigate("Комментарии",{postId:item.id,photo:item.photo})} name="comment" size={26} color="grey" />
                  </View>
                 <View style={{flex:1, flexDirection:"row", justifyContent:"flex-end"}}>
                   <EvilIcons onPress={() => navigation.navigate("Map", {location: item.location})} name="location" size={26} color="grey" />
                 </View>
                 <View>
      </View>
            </View>
            </View>
      </View>
         )}
    />
    </View>
          </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:85,
    backgroundColor:"#fff"
  },

  btn:{
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },

  btnTitle:{
    alignItems: "flex-end",
  },

    img:{
    height: 250,
    borderRadius: 10
  },
});

export default Home;


