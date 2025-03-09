import React, { useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Post } from '../components/Post';
import type { Post as PostType } from '../types';

const DUMMY_POSTS: PostType[] = [
  {
    id: '1',
    userId: '1',
    user: {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    },
    content: 'Just finished a great workout! 💪',
    likes: 24,
    comments: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: '2',
    user: {
      id: '2',
      name: 'Jane Smith',
      username: 'janesmith',
      profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    content: 'Beautiful sunset today! 🌅',
    image: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869',
    likes: 42,
    comments: 8,
    createdAt: new Date().toISOString(),
  },
];

export const HomeScreen: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>(DUMMY_POSTS);
  const [refreshing, setRefreshing] = useState(false);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = (postId: string) => {
    // Implement comment functionality
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate fetch delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post
            post={item}
            onLike={handleLike}
            onComment={handleComment}
          />
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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