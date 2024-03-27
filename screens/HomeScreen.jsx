import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, Alert, ScrollView} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ userInfo}) => {
  const [currentLocation, setCurrentLocation] = useState('');
    const [products, setProducts] = useState([]);
  useEffect(() => {
    requestLocationPermission();
    generateRandomProducts();
  }, []);

  const requestLocationPermission = () => {
    Alert.alert(
      'Location Permission',
      'This app needs access to your location to provide location-based services.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Permission denied'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: getCurrentLocation,
        },
      ],
      { cancelable: false }
    );
  };

 const getCurrentLocation = () => {
  try {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      error => {
        switch (error.code) {
          case 1:
            Alert.alert(
              'Location Permission Denied',
              'Please enable location permissions to use this feature.',
              [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
              ],
              { cancelable: false }
            );
            break;
          case 2:
            console.log("Position unavailable");
            break;
          case 3:
            console.log("Location request timed out");
            break;
          case 4:
            console.log("Activity is null");
            break;
          default:
            console.log("Unknown error occurred");
        }
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  } catch (error) {
    console.log("Error getting location:", error.message);
  }
};



const generateRandomProducts = () => {
    // Generate random products data
    const randomProducts = [];
    for (let i = 0; i < 4; i++) {
      const product = {
        image: `https://picsum.photos/200/200?random=${i}`,
        price: (Math.random() * 100).toFixed(2),
        location: `Location ${i + 1}`,
        rating: (Math.random() * 5).toFixed(1),
      };
      randomProducts.push(product);
    }
    setProducts(randomProducts);
  };

  return (
    <View style={styles.container}>
        {/* upperhalf */}
      <View style={styles.upperHalf}>
        <View style={styles.header}>
          <Text>{currentLocation ? currentLocation : 'Loading...'}</Text>
          
          {userInfo && userInfo.user && (
            <Image
              source={{ uri: userInfo.user.photo }}
              style={styles.userImage}
            />
          )}
        </View>
        {userInfo && userInfo.user && (
          <Text>Hello {userInfo.user.name}, let's search your food</Text>
        )}
        <TextInput
          style={styles.searchBox}
          placeholder="Search..."
        />
      </View>
      {/* bottomhalf */}
        <View style={styles.bottomHalf}>
            <ScrollView vertical>
                <View style={styles.rowone}>
                <ScrollView horizontal contentContainerStyle={styles.productContainer}>
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.rowtwo}>
                <ScrollView horizontal contentContainerStyle={styles.productContainer}>
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.rowtwo}>
                <ScrollView horizontal contentContainerStyle={styles.productContainer}>
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </ScrollView>
            </View>
            </ScrollView>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  contentContainer: {
    flexGrow: 4,
  },
  upperHalf: {
    flex: 0.3,
    padding: '2%',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
  searchBox: {
    width: '90%',
    height: 40,
    marginTop: '6%',
    marginBottom:'10%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  userImage: {
    width: 43,
    height: 43,
    borderRadius: 50,
  },
  bottomHalf: {
    flex: 1,
    padding: 4,
  },
  buttonContainer: {
    padding: 5,
  },
  productContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  rowone:{
    flex:1
  },
  rowtwo:{
    flex:1
  }
});

export default HomeScreen;
