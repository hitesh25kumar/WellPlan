// import React, { Component } from 'react';
// import { View, Text, TouchableOpacity, Image,Dimensions,KeyboardAvoidingView ,StyleSheet} from 'react-native';
// import { Button, InputItem, List } from '@ant-design/react-native';
// import firebase from 'react-native-firebase';
// // import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

// const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';
// const {height,width} = Dimensions.get('window');
// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.unsubscribe = null;
//     this.state = {
//       user: null,
//       message: '',
//       codeInput: '',
//       phoneNumber: '',
//       confirmResult: null,
//     };
//   }

//   componentDidMount() {
//     this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         this.setState({ user: user.toJSON() });
//       } else {
//         // User has been signed out, reset the state
//         this.setState({
//           user: null,
//           message: '',
//           codeInput: '',
//           phoneNumber: '',
//           confirmResult: null,
//         });
//       }
//     });
//   }

//   componentWillUnmount() {
//      if (this.unsubscribe) this.unsubscribe();
//   }

//   signIn = () => {
//     const { phoneNumber } = this.state;
//     this.setState({ message: 'Sending code ...' });
// console.log(`+91${phoneNumber.replace(/ +/g, "")}`)
//     firebase.auth().signInWithPhoneNumber(`+91${phoneNumber.replace(/ +/g, "")}`)
//       .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
//       .catch(error => this.setState({ message: 'Please enter vaild phone number' }));
      
//   };

//   confirmCode = () => {
//     const { codeInput, confirmResult } = this.state;

//     if (confirmResult && codeInput.length) {
//       confirmResult.confirm(this.state.codeInput.replace(/ +/g, ""))
//         .then((user) => {
//           // this.setState({ message: 'Code Confirmed!' });
//           this.props.navigation.navigate('Home');
//         })
//         .catch(error => this.setState({ message: 'Invalid OTP - Please try again' }));
//     }
//   };

//   signOut = () => {
//     firebase.auth().signOut();
//   }

//   renderPhoneNumberInput() {
//    const { phoneNumber } = this.state;

//     return (
//       <View style={{ padding: 25 }}>
//         <Text style={styles.label}>Phone number</Text>
//         <InputItem
//         onChange={value => this.setState({ phoneNumber: value })}
//             defaultValue={phoneNumber}
//             value={phoneNumber}
//             maxLength={12}
//             type="phone"
//             placeholder="Phone number"
            
//           >
//             +91
//           </InputItem>
//         {/* <Button type="primary" style={styles.btn} onPress={this.signIn}>Sign In</Button> */}
//       </View>
//     );
//   }

//   renderMessage() {
//     const { message } = this.state;

//     if (!message.length) return null;

//     return (
//       <Text style={styles.msg}>{message}</Text>
//     );
//   }

//   resendOTP(){
//     this.signIn();
//   }

//   redirectHome = () => {
//     this.props.navigation.navigate('Schedule')
//   }

//   renderVerificationCodeInput() {
//     const { codeInput } = this.state;

//     return (
//       <View style={{  padding: 25,paddingTop:10 }}>
//         <Text style={styles.label}>Enter your OTP code</Text>
//          <InputItem
//         onChange={value => this.setState({ codeInput: value })}
//             defaultValue={codeInput}
//             value={codeInput}
//             maxLength={7}
//             type="phone"
//             placeholder="OTP code"
            
//           />
//           <TouchableOpacity><Text style={styles.rightsmalltxt}>Resend OTP</Text></TouchableOpacity>
//            <Button type="primary" style={styles.btn} onPress={this.confirmCode}>Continue</Button>
//       </View>
//     );
//   }

//   LoginTop() {
//     return (
//         <View style={styles.topContainer}>
//             <View style={styles.topImgContainer}>
//            <Image
//           style={{width: 250, height: 250}}
//           source={require('../assets/logo.png')}
//         />
//         </View>
//         <Text style={styles.topTextLeft}>
//         Planning to Make the
//         </Text>
//         <Text style={styles.topTextRight}>
//         Best Use of Your Time
//         </Text>
//            </View>
//       );
//     } 

//     // Calling this function will open Google for login.
//    googleLogin = async () => {
//   try {
//     // add any configuration settings here:
//     await GoogleSignin.configure();

//     const data = await GoogleSignin.signIn();

//     // create a new firebase credential with the token
//     const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
//     // login with credential
//     const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

//     console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
//   } catch (e) {
//     console.error(e);
//   }
// }

//   render() {
//     console.log(this.props);
//     const { user, confirmResult } = this.state;
//     return (
// <GoogleSigninButton
//     style={{ width: 192, height: 48 }}
//     size={GoogleSigninButton.Size.Wide}
//     color={GoogleSigninButton.Color.Dark}
//     onPress={this.googleLogin}
//     // disabled={this.state.isSigninInProgress} 
//     />
// //       <KeyboardAvoidingView style={{ height,width,justifyContent:'center' }} behavior="position" enabled>
// // {this.LoginTop()}
// //         {!user && !confirmResult && this.renderPhoneNumberInput()}

// //         {this.renderMessage()}

// //         {!user && confirmResult && this.renderVerificationCodeInput()}

// //         {user && (
// //           <View
// //             style={{
// //               padding: 15,
// //               paddingTop:0,
// //               justifyContent: 'center',
// //               alignItems: 'center',
// //               backgroundColor: '#77dd77',
// //               // flex: 1,
// //             }}
// //           >
// //             <Text style={styles.label}> You are already Signed In!</Text>
// //             <Button type="primary" style={styles.btn} onPress={this.redirectHome}>Continue</Button>
   
// //           </View>
// //         )}
// //       </KeyboardAvoidingView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//     topContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         // marginTop:'16%',
//         width,
//     },
//     topTextLeft:{
//         color:'#0080FB',
//         fontSize:22,
//         textAlign:'left',
//         paddingLeft:'12%',
//         marginBottom: '3%',
//     },
//     topTextRight:{
//         color:'#0080FB',
//         fontSize:22,
//         textAlign:'right',
//         paddingRight:'12%'
//     },
//     topImgContainer:{
//         width,
//         justifyContent:'center',
//         alignItems:'center'
//     },
//     btn:{
//         maxWidth:'70%',
//         height:45,
//         marginLeft:'15%',
//         marginTop:30,
//         borderRadius:40,
//         backgroundColor:'#0080FB',
//         elevation:2

//     },
//     label:{
// fontSize:17,
// color:'rgba(0,0,0,0.7)',
// marginLeft:'5%',
// marginBottom: '3%',
//     },
//     msg:{ padding: 5,textAlign:'center',marginTop:20, fontSize:17, color: 'red' },
//     rightsmalltxt:{
//       textAlign:'right',
//       fontSize:16,
//       paddingTop:10,
//       paddingBottom: 10,
//       marginLeft: width - 200,
//       color:'rgba(0,0,0,0.7)',
//     }
// });