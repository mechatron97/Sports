import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import React from 'react';
import venues from '../assets/data/venues.json';
import clubs from '../screens/MapsScreen';

type VenueListItem = {
  club: (typeof clubs);
  containerStyle?: ViewStyle;
}

export default function VenueListItem({ club, containerStyle }: VenueListItem){

  return (
    <View style={[styles.card, containerStyle]}>
      <Image source={{uri: club.image }} style={styles.image}/>
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{club.name}</Text>
        <Text style={styles.description}>
          {club.description}
        </Text>
        <View style={styles.footer}>
          {/* <Text style={styles.price}>${venue.price}</Text>
          <Text style={styles.price}>
          {venue.last_review} ({ venue.number_of_reviews })
        </Text> */}
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({

  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  image: {
    width: 150,
    aspectRatio: 1,
    borderRadius: 10
  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 20
  },
  rightContainer: {
    padding: 5,
    flex: 1
  },

  price: {
    fontWeight: 'bold',
    flex: 1
  },

  description: {
    color: 'gray'
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto'
  }

});