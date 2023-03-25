import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import useRoute from "../router";
import { useEffect } from "react";
import { authStateChangeUser } from "../redux/auth/authOperations";
const Main = () => {
  const dispatch = useDispatch();
  const { stateChange } = useSelector((state) => state.auth);
  useEffect(() => {

    dispatch(authStateChangeUser());
  }, [stateChange]);
  
// db.auth().onAuthStateChanged((user)=>setUser(user))

  useEffect(() => {});
  const routing = useRoute(stateChange);
  return <NavigationContainer>{routing}</NavigationContainer>;
};
export default Main;