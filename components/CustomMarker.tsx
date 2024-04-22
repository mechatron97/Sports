import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';

const CustomMarker = ({ venue, onPress }) => {
  return (
    <Marker 
      onPress={onPress}
      coordinate={{
        latitude: venue.latitude,
        longitude: venue.longitude
       }}
       >
        <View style={styles.marker}>
        <Text style={styles.text}>{venue.id}</Text>
        </View>
       </Marker>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    marker: {
      backgroundColor: 'white',
      padding: 5,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 20
    },
    text: {
      fontWeight: 'bold'
    }
  });

export default CustomMarker