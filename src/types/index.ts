export interface User {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  coverImage?: string;
  bio?: string;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  createdAt: string;
}

export interface FriendRequest {
  id: string;
  sender: User;
  receiver: User;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}