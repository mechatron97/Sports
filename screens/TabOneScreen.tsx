import { ActivityIndicator, Alert, Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import {
  Agenda,
  AgendaEntry,
  AgendaSchedule,
  DateData,
} from "react-native-calendars";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import React from "react";

const GetEvents = gql `
query GetEvents {
  Event {
    id
    name
    date
  }
}
`;

const getEventsSchedule = (events: []): AgendaSchedule => {
  const items: AgendaSchedule = {};

  events.forEach((event) => {
    const day = event.date.slice(0, 10);

    if (!items[day]) {
      items[day] = [];
    }
    items[day].push({ ...event, day, height: 50 });
  });

  return items;
};

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {

  const { data, loading, error } = useQuery(GetEvents);

  const [items, setItems] = useState<AgendaSchedule>({});

  const loadItems = (_day: DateData) => {
    setItems(events);
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text style={styles.emptyDate}>No events on this date</Text>
      </View>
    );
  };

  const renderItem = (reservation: AgendaEntry) => {

    return (
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate("Modal", {id: reservation.id})}
      >
        <Text style={styles.name}>{reservation.name}</Text>
      </Pressable>
    );
  };

  if(loading){
    return <ActivityIndicator />;
  }

  if(error){
    return Alert.alert("Error Fetching Events", error.message);
  }

  const events = getEventsSchedule(data.Event);

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        renderItem={renderItem}
        renderEmptyData={renderEmptyDate}
        loadItemsForMonth={loadItems}
        showOnlySelectedDayItems
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: "black",
    margin: 5
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 15
  },
  emptyDate: {
    height: 15,
    flex: 1,
    padding: 30,
    fontSize: 18,
    margin: 10
  },
});