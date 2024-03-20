import React, { useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '193894574586-0720t243ddimj8gntekm344priaq47u8.apps.googleusercontent.com',
});

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const isUserSignedIn = await GoogleSignin.isSignedIn();
      setLoggedIn(isUserSignedIn);
    };

    checkLoggedInStatus();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setLoggedIn(true);
      Alert.alert('Success', `Welcome ${userInfo.user.name}!`);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelled', 'Google sign in was cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign in in progress', 'Google sign in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play services not available', 'Please ensure Google Play Services are installed');
      } else {
        Alert.alert('Error', 'An error occurred while signing in with Google');
        console.error(error);
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loggedIn ? (
        <Button title="Sign Out" onPress={signOut} />
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
