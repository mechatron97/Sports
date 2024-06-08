// import React, { useMemo, useState } from 'react';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { StyleSheet, View, Text } from 'react-native';
// import venues from './../assets/data/venues.json';
// import CustomMarker from '../components/CustomMarker';
// import VenueListItem from '../components/VenueListItem';
// import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
// import * as Location from 'expo-location';

// export default function MapsScreen() {

//   const [selectedVenue, setSelectedVenue] = useState(null);

//   const [mapRegion, setMapRegion] = useState({
//     latitude: 43.6459,
//     longitude: -79.42423,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });

//   const snapPoints = useMemo(() => [75, '50%', '90%'], []);
  
//   return (
//     <View style={styles.container}>
//       <MapView 
//       provider={PROVIDER_GOOGLE}
//       style={styles.map}
//       // initialRegion={mapRegion}
//       region={mapRegion}
//       >
//         {venues.map((venue) => (
//         <CustomMarker 
//         key={venue.id} 
//         venue={venue} 
//         onPress={() => setSelectedVenue(venue)} 
//         />
//       ))}
//       </MapView>
//       {selectedVenue && (
//       <VenueListItem 
//       venue={selectedVenue}
//       containerStyle={{
//         position: 'absolute',
//         bottom: typeof snapPoints[0] === 'number' ? snapPoints[0] + 10 : 100,
//         left: 10,
//         right: 10,
//       }} />
//       )}
//       <BottomSheet
//         // ref={bottomSheetRef}
//         index={0}
//         snapPoints={snapPoints}
//       >
//         <Text style={styles.title}>Over {venues.length - 2} Places</Text>
//           <BottomSheetFlatList 
//           data={venues} 
//           contentContainerStyle={{ gap: 10, padding: 10}}
//           renderItem={({item}) => <VenueListItem venue={item} />}
//           />
//       </BottomSheet>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
//   title: {
//     textAlign: 'center',
//     fontWeight: '500',
//     fontSize: 16,
//     marginVertical: 10,
//     marginBottom: 20
//   }
// });

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';

const SportsClubFinderMap = () => {
  const [location, setLocation] = useState(null);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      fetchClubsNearby(location.latitude, location.longitude);
    }
  }, [location]);

  const key = process.env.EXPO_PUBLIC_API

  const fetchClubsNearby = async (latitude: any, longitude: any) => {
    const radius = 2000; // 2 km radius
    const apiKey = key;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=gym&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        setClubs(data.results);
      }
    } catch (error) {
      console.error('Error fetching sports clubs:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {location && (
        <MapView
        provider={PROVIDER_DEFAULT}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {clubs.map((club, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: club.geometry.location.lat,
                longitude: club.geometry.location.lng,
              }}
              title={club.name}
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

export default SportsClubFinderMap;

