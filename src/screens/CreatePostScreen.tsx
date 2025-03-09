import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet, Platform, Text, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export const CreatePostScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission needed',
            'Sorry, we need camera roll permissions to upload images.',
            [{ text: 'OK' }]
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'There was an error picking the image. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handlePost = () => {
    // Here you would typically send the post to your backend
    console.log('New post:', { content, image });
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialCommunityIcons name="close" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.postButton, !content ? styles.postButtonDisabled : null]}
          onPress={handlePost}
          disabled={!content}
        >
          <Text style={[styles.postButtonText, !content ? styles.postButtonTextDisabled : null]}>
            Post
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        multiline
        value={content}
        onChangeText={setContent}
        autoFocus
      />

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.previewImage} />
          <TouchableOpacity 
            style={styles.removeImage}
            onPress={() => setImage(null)}
          >
            <MaterialCommunityIcons name="close-circle" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.mediaButton} 
          onPress={pickImage}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="image" size={24} color="#1877F2" />
          <Text style={styles.mediaButtonText}>Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  closeButton: {
    padding: 8,
  },
  postButton: {
    backgroundColor: '#1877F2',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonDisabled: {
    backgroundColor: '#BDC3C7',
  },
  postButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  postButtonTextDisabled: {
    color: '#FFFFFF',
  },
  input: {
    padding: 16,
    fontSize: 16,
    minHeight: 100,
  },
  imageContainer: {
    margin: 16,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  removeImage: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  mediaButtonText: {
    marginLeft: 8,
    color: '#1877F2',
    fontWeight: '500',
  },
});