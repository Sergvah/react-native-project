import { View, Text, StyleSheet, FlatList, Image, ImageBackground, KeyboardAvoidingView, Dimensions, TouchableOpacity } from "react-native";
import db from '../../firebase/config'
import {authSignOutUser} from '../../redux/auth/authOperations'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { Octicons } from "@expo/vector-icons"

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([])
  const {userId} = useSelector((state)=>state.auth)
  const [dimensios, seDimensions] = useState(Dimensions.get("window").width);
  const [allComments, setAllComments] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getUserPosts()
  }, [])
  
  const getUserPosts = async () => {

  await db.firestore().collection('posts').where('userId', '==', userId ).onSnapshot((data)=>setUserPosts(data.docs.map(doc=>({...doc.data()}))))
  }
  const signOut = () => {
    dispatch(authSignOutUser())
  };

  return (
    <View style={styles.container}>
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
                width: dimensios,
                backgroundColor: "#f8f8ff",
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                marginTop: 150,
                marginBottom: 160,
              }}
            >
          <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={signOut}
              >
                <View style={styles.btnTitle}><Octicons name="sign-out" size={24} color="#d3d3d3" /></View>
              </TouchableOpacity>
          <FlatList
            data={userPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
          <View style={{ marginTop: 15,    
             marginHorizontal:15, marginBottom:15,
        }}>
            <Image
              source={{ uri: item.photo }}
              style={styles.img}
            />
            <Text style={{marginTop:10, fontFamily: "Roboto-Bold" }}>{item.comment}</Text>
            <View style={{flex:1,flexDirection:"row", marginTop:10}}>
              <View><EvilIcons  onPress={() => navigation.navigate("Комментарии",{postId:item.id,photo:item.photo})} name="comment" size={26} color="grey" /></View>
              <View style={{flex:1, flexDirection:"row", justifyContent:"flex-end"}}>
                <EvilIcons name="location" size={26} color="grey" />
                <Text onPress={() => navigation.navigate("Map", {location:item.location})}>{item.locationName}</Text>
              </View>
            </View>
          </View>
         )}
    />
      </View>
      </KeyboardAvoidingView>
        </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },

  images: {
    resizeMode: "cover",
  },

  btnTitle:{
    marginRight:20,
    marginTop:20,
    marginBottom:10,
    alignItems:"flex-end",
  },

  img:{
    height: 250,
    borderRadius: 10
  },
});

