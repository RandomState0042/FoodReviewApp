import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const TrendingScreen = () => {
  // Sample data for cards
  const data = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      name: 'Product 1',
      description: 'Description of Product 1',
      price: '$10.00',
      location: 'Location 1',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      name: 'Product 2',
      description: 'Description of Product 2',
      price: '$20.00',
      location: 'Location 2',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      name: 'Product 3',
      description: 'Description of Product 3',
      price: '$20.00',
      location: 'Location 2',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/150',
      name: 'Product 4',
      description: 'Description of Product 4',
      price: '$20.00',
      location: 'Location 2',
    },
    
  ];

  return (
    <ScrollView style={styles.container}>
      {data.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    color: '#888',
  },
});

export default TrendingScreen;
