import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const UserScreen = ({ userInfo, onSignOut }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        {userInfo && userInfo.user && (
          <>
            <Image source={{ uri: userInfo.user.photo }} style={styles.userImage} />
            <Text style={styles.userName}>{userInfo.user.name}</Text>
            <Text style={styles.userEmail}>{userInfo.user.email}</Text>
          </>
        )}
      </View>
      <Button title="Sign Out" onPress={onSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    color: '#888',
  },
});

export default UserScreen;
