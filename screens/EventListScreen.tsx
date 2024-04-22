import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import fetchEventbriteEvents from '../hooks/fetchEvents';

const SportsEventListScreen = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventData = await fetchEventbriteEvents();
        setEvents(eventData.events);
      } catch (error) {
        console.error('Error fetching sports events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name.text}</Text>
            {/* Add more event details as needed */}
          </View>
        )}
      />
    </View>
  );
};

export default SportsEventListScreen;
