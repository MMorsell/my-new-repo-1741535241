import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FriendRequestCard } from '../components/FriendRequestCard';
import type { FriendRequest } from '../types';

const DUMMY_REQUESTS: FriendRequest[] = [
  {
    id: '1',
    sender: {
      id: '3',
      name: 'Mike Johnson',
      username: 'mikej',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    },
    receiver: {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    },
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    sender: {
      id: '4',
      name: 'Sarah Wilson',
      username: 'sarahw',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
    receiver: {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    },
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];

export const FriendsScreen: React.FC = () => {
  const [requests, setRequests] = useState<FriendRequest[]>(DUMMY_REQUESTS);

  const handleAccept = (requestId: string) => {
    setRequests(requests.filter(request => request.id !== requestId));
  };

  const handleReject = (requestId: string) => {
    setRequests(requests.filter(request => request.id !== requestId));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        renderItem={({ item }) => (
          <FriendRequestCard
            request={item}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  content: {
    padding: 10,
  },
});