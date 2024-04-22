import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { View, Text } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton/CustomButton';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useUserId } from '@nhost/react';
import { useChatContext } from '../context/ChatContext';

const GetEvent = gql`
  query GetEvent($id: uuid!) {
    Event_by_pk(id: $id) {
      id
      name
      date
      description
      EventAttendee {
        user {
          id
          displayName
          avatarUrl
        }
      }
    }
  }
`;

const JoinEvent = gql`
  mutation InsertEventAttendee($eventId: uuid!, $userId: uuid!) {
    insert_EventAttendee(objects: [{ eventId: $eventId, userId: $userId }]) {
      returning {
        id
        userId
        eventId
        Event {
          id
          EventAttendee {
            id
          }
        }
      }
    }
  }
`;

export default function ModalScreen({ route }) {

  const id = route?.params?.id;
  const userId = useUserId();

  const { data, loading, error } = useQuery(GetEvent, { variables: { id } });
  const event = data?.Event_by_pk;

  const [doJoinEvent, ] = useMutation(JoinEvent);

  const onJoin = async () => {
    try {
      await doJoinEvent({ variables: {userId, eventId: id}});
    } catch (e) {
      Alert.alert("Could not join the event", (e as Error).message);
    }
  };

  const { joinEventChatRoom } = useChatContext();

  const displayedUsers = (event?.EventAttendee || [])
  .slice(0, 5)
  .map((attendee: { user: any; }) => attendee.user);

  const joined = event?.EventAttendee?.some(
    (attendee: { user: { id: string | undefined; }; }) => attendee.user.id === userId);
  
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Couldn't find the event</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }
  
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
        <Image
    style={{
      width: 340,
      height: 200,
      borderRadius: 10,
      marginTop: 10
    }}
    source={require('../assets/images/a.jpg')} 
  />
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.time}>
      <AntDesign name="calendar" size={24} color={"black"} />
        {" | "}
        {new Date(event.date).toDateString()}
      </Text>
      <Text style={styles.paragraph}>
        {event.description}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.subtitle}>Attendees</Text>
        <View style={styles.users}>
          {displayedUsers.map((user: { id: React.Key | null | undefined; avatarUrl: any; }, index: number) => (
            <Image
              key={user.id}
              source={{ uri: user.avatarUrl }}
              style={[
                styles.userAvatar,
                { transform: [{ translateX: -15 * index }] },
              ]}
            />
          ))}
          <View
            style={[
              styles.userAvatar,
              {
                transform: [{ translateX: -15 * displayedUsers.length }],
              },
            ]}
          >
            <Text>+{event?.EventAttendee?.length - displayedUsers.length}</Text>
          </View>
        </View>
        {!joined ? <CustomButton text="Join the event" onPress={onJoin} /> : (
        <CustomButton 
        text="Join the conversation" 
        type='SECONDARY' 
        onPress={() => joinEventChatRoom(event)} />
        )}
      </View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 5,
    marginTop: 5
  },
  time: {
    fontSize: 20,
    fontWeight: '600',
    padding: 5
  },
  paragraph: {
    fontSize: 18,
    fontWeight: '400',
    padding: 5,
    flex: 1
  },
  footer: {
    marginTop: 'auto'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  users: {
    flexDirection: "row",
    marginVertical: 5,
  },
  userAvatar: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    margin: 2,
    borderColor: "white",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gainsboro",
  },
});
