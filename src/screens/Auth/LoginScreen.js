import {
   Dimensions,
   Image,
   Platform,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import DeviceInfo from "react-native-device-info";
import IMAGES_NAME from "../../assets/index";
import Icon from "react-native-vector-icons/Ionicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SCREEN_NAME from "../../components/ScreenName";
import { UserContext } from "../../context/user";
import i18n from "locales";
import { logLogin } from "../../services/analytics";

const LoginScreen = ({ navigation }) => {
   const u = useContext(UserContext);
   // const login = useContext(UserContext);
   const [passwordShown, setPasswordShown] = useState(true);

   const togglePasswordVisibility = () => {
      setPasswordShown(passwordShown ? false : true);
   };
   useEffect(() => {
      const checkSystem = async () => {
         const deviceID = DeviceInfo.getUniqueId();
         console.log(deviceID);
         try {
            u.setDeviceId(deviceID);
         } catch (e) {
            console.log(e);
         }
      };
      checkSystem();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [u.deviceID]);
   return (
      <View style={styles.container}>
         <View style={styles.viewLogo}>
            <Image source={IMAGES_NAME.LOGIN_LOGO} style={styles.imgLogo} />
         </View>
         <View style={styles.viewContent}>
            <View>
               <TextInput
                  style={styles.txtInput}
                  maxLength={255}
                  keyboardType={"email-address"}
                  onChangeText={(text) => u.setEmail(text)}
                  value={u.email}
                  placeholder={i18n.t("email")}
                  underlineColorAndroid="transparent"
               />
               <View>
                  <TextInput
                     style={styles.txtInput}
                     maxLength={255}
                     onChangeText={(text) => u.setPassword(text)}
                     value={u.password}
                     placeholder={i18n.t("password")}
                     underlineColorAndroid="transparent"
                     secureTextEntry={passwordShown}
                  />
                  <TouchableOpacity style={styles.touchEye} onPress={() => togglePasswordVisibility()}>
                     <Ionicons
                        name={
                           passwordShown
                              ? Platform.OS === "ios"
                                 ? "ios-eye-off"
                                 : "md-eye-off"
                              : Platform.OS === "ios"
                                 ? "ios-eye"
                                 : "md-eye"
                        }
                        size={20}
                     />
                  </TouchableOpacity>
               </View>
               <Text style={styles.forgotPassword}>{i18n.t("forgotPassword")}</Text>
            </View>
            <View style={styles.blockBottom}>
               <TouchableOpacity
                  style={styles.btnLogin}
                  onPress={() => {
                     logLogin(u.deviceId);
                     // login(u.email, u.password);
                     navigation.navigate(SCREEN_NAME.HOME_COMPONENT);
                  }}>
                  <Text style={styles.txtButton}>{i18n.t("Login")}</Text>
               </TouchableOpacity>
               <Text style={styles.txtOr}> {i18n.t("or")}</Text>
               <View style={styles.otherLogin}>
                  <TouchableOpacity style={styles.touchOther} onPress={() => console.log("login Mobile")}>
                     <Icon
                        name={Platform.OS === "ios" ? "ios-phone-portrait" : "md-phone-portrait"}
                        color={"#52bdd9"}
                        size={40}
                     />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.touchOther} onPress={() => console.log("login Google")}>
                     <Icon
                        name={Platform.OS === "ios" ? "ios-logo-google" : "md-logo-google"}
                        color={"#ed5565"}
                        size={40}
                     />
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={styles.touchOther}
                     onPress={() => console.log("login Facebook")}>
                     <Icon
                        name={Platform.OS === "ios" ? "ios-logo-facebook" : "md-logo-facebook"}
                        color={"#3b5998"}
                        size={40}
                     />
                  </TouchableOpacity>
               </View>
               <View style={styles.viewRegister}>
                  <Text style={styles.txtAccount}>{i18n.t("noAccount")}</Text>
                  <TouchableOpacity onPress={() => navigation.navigate(SCREEN_NAME.REGISTER_SCREEN)}>
                     <Text style={styles.txtRegister}>{i18n.t("Register")}</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </View>
   );
};
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const styles = StyleSheet.create({
   blockBottom: {
      alignItems: "center",
   },
   btnLogin: {
      alignItems: "center",
      backgroundColor: "#20C3AF",
      height: 50,
      justifyContent: "center",
      width: WIDTH - 100,
   },
   container: {
      flex: 1,
   },
   forgotPassword: {
      alignSelf: "flex-end",
      marginBottom: 30,
   },
   imgLogo: {
      height: WIDTH * 0.6,
      width: WIDTH * 0.6,
   },
   otherLogin: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: WIDTH - 100,
   },
   touchEye: {
      marginRight: 10,
      marginTop: 15,
      position: "absolute",
      right: 0,
   },
   touchOther: {
      alignItems: "center",
      borderColor: "#808080",
      borderWidth: 0.5,
      height: WIDTH / 5,
      justifyContent: "center",
      width: WIDTH / 5,
   },
   txtAccount: {
      fontSize: 16,
   },
   txtButton: {
      color: "#fff",
      fontSize: 16,
   },
   txtInput: {
      borderColor: "gray",
      borderWidth: 1,
      height: 50,
      marginBottom: 20,
      paddingLeft: 10,
      width: WIDTH - 100,
   },
   txtOr: {
      marginVertical: 20,
   },
   txtRegister: {
      color: "#fa4134",
      fontSize: 20,
      fontWeight: "bold",
      marginLeft: 10,
   },
   viewContent: {
      alignItems: "center",
      flex: 1,
   },
   viewLogo: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 50,
   },
   viewRegister: {
      alignItems: "flex-end",
      flexDirection: "row",
      marginTop: 10,
   },
});
export default LoginScreen;
