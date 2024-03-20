// App.js
import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import HomeScreen from './screens/HomeScreen';

GoogleSignin.configure({
  webClientId: '193894574586-0720t243ddimj8gntekm344priaq47u8.apps.googleusercontent.com',
});

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const isUserSignedIn = await GoogleSignin.isSignedIn();
      if (isUserSignedIn) {
        const userInfo = await GoogleSignin.getCurrentUser();
        setLoggedIn(true);
        setUserInfo(userInfo);
      }
    };

    checkLoggedInStatus();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setLoggedIn(true);
      setUserInfo(userInfo);
      // Alert.alert('Success', `Welcome ${userInfo.user.name}!`);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setLoggedIn(false);
      setUserInfo(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loggedIn ? (
        <HomeScreen userInfo={userInfo} onSignOut={signOut} />
      ) : (
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={signIn}
        />
      )}
    </View>
  );
};

export default App;
