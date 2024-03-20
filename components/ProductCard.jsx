import React from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';

// Product card component
const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Text style={styles.location}>Location: {product.location}</Text>
      <Text style={styles.rating}>Rating: {product.rating}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
card: {
    height:200,
    margin:3,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    // marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
   productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    marginBottom: 5,
  },
  rating: {
    color: 'green',
  },
})
export default ProductCard;