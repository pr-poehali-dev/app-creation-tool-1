import { useState } from 'react';
import Icon from '@/components/ui/icon';
import UserProfile from './UserProfile';
import CreatePost from './CreatePost';
import Post from './Post';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PostData {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
}

export default function MainScreen() {
  const [username] = useState('User123');
  const [followers, setFollowers] = useState(42);
  const [posts, setPosts] = useState<PostData[]>([
    {
      id: '1',
      author: 'TechGuru',
      content: 'Только что запустил новый проект на Tunzok! 🚀 Невероятные возможности для создателей контента!',
      timestamp: new Date(Date.now() - 3600000),
      likes: 15,
    },
    {
      id: '2',
      author: 'CreativeArt',
      content: 'Делюсь своими последними работами. Как вам неоновый стиль? 💜✨',
      timestamp: new Date(Date.now() - 7200000),
      likes: 23,
    },
  ]);

  const handleAvatarChange = (file: File) => {
    console.log('Аватар изменен:', file.name);
  };

  const handlePostCreate = (content: string) => {
    const newPost: PostData = {
      id: Date.now().toString(),
      author: username,
      content,
      timestamp: new Date(),
      likes: 0,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f] relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-magenta rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      <UserProfile
        username={username}
        followers={followers}
        onAvatarChange={handleAvatarChange}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8 gap-3 animate-fade-in">
          <Icon name="Zap" className="text-neon-cyan" size={48} />
          <h1 className="text-5xl md:text-6xl font-orbitron font-black text-neon-cyan">
            TUNZOK
          </h1>
        </div>

        <div className="space-y-6">
          <CreatePost onPostCreate={handlePostCreate} />

          <div className="space-y-6">
            {posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                author={post.author}
                content={post.content}
                timestamp={post.timestamp}
                initialLikes={post.likes}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
