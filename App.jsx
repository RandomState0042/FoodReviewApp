import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import CommunityScreen from './screens/CommunityScreen';
import TrendingScreen from './screens/TrendingScreen';
import UserScreen from './screens/UserScreen';

GoogleSignin.configure({
  webClientId: '193894574586-0720t243ddimj8gntekm344priaq47u8.apps.googleusercontent.com',
});

const Tab = createBottomTabNavigator();

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
    <NavigationContainer>
      {loggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Home">
            {() => <HomeScreen userInfo={userInfo} onSignOut={signOut} />}
          </Tab.Screen>
          <Tab.Screen name="Community" component={CommunityScreen} />
          <Tab.Screen name="Trending" component={TrendingScreen} />
          <Tab.Screen name="User">
            {() => <UserScreen userInfo={userInfo} onSignOut={signOut} />}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={signIn}
          />
        </View>
      )}
    </NavigationContainer>
  );
};

export default App;
