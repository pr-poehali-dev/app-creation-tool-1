import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CreatePost from '@/components/CreatePost';
import Post from '@/components/Post';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface PostData {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
}

interface UserData {
  username: string;
  avatarUrl?: string;
  followers: number;
}

export default function FeedPage() {
  const navigate = useNavigate();
  const [userData] = useLocalStorage<UserData>('tunzok_user', {
    username: 'User123',
    followers: 42,
  });

  const [posts, setPosts] = useLocalStorage<PostData[]>('tunzok_posts', [
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

  const [stories] = useState([
    { id: '1', username: 'TechGuru', avatarUrl: '' },
    { id: '2', username: 'CreativeArt', avatarUrl: '' },
    { id: '3', username: 'MusicLover', avatarUrl: '' },
    { id: '4', username: 'DesignPro', avatarUrl: '' },
    { id: '5', username: 'CodeMaster', avatarUrl: '' },
  ]);

  const [trending] = useState([
    { tag: 'TunzokLaunch', posts: 1234 },
    { tag: 'NeonStyle', posts: 856 },
    { tag: 'WebDev', posts: 542 },
    { tag: 'CreativeContent', posts: 421 },
  ]);

  const handlePostCreate = (content: string) => {
    const newPost: PostData = {
      id: Date.now().toString(),
      author: userData.username,
      content,
      timestamp: new Date(),
      likes: 0,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f] relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-magenta rounded-full blur-[120px] animate-pulse-glow"></div>
      </div>

      <div className="relative z-10">
        <div className="sticky top-0 bg-card/30 backdrop-blur-xl border-b border-primary/30 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Zap" className="text-neon-cyan" size={40} />
              <h1 className="text-3xl font-orbitron font-black text-neon-cyan">TUNZOK</h1>
            </div>

            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="w-full bg-background/50 border border-primary/30 rounded-full pl-10 pr-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-cyan/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-neon-purple hover:bg-primary/20">
                <Icon name="Bell" size={24} />
              </Button>
              <Button variant="ghost" className="text-neon-cyan hover:bg-primary/20">
                <Icon name="Mail" size={24} />
              </Button>
              <Avatar
                className="cursor-pointer hover:ring-2 hover:ring-neon-cyan transition-all"
                onClick={() => navigate('/profile')}
              >
                <AvatarImage src={userData.avatarUrl} alt={userData.username} />
                <AvatarFallback className="bg-neon-purple/20 text-neon-purple font-bold">
                  {userData.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Card className="bg-card/50 backdrop-blur-xl border-primary/30 p-4 sticky top-20">
              <div
                className="flex items-center gap-3 mb-6 cursor-pointer hover:bg-primary/10 p-3 rounded-lg transition-colors"
                onClick={() => navigate('/profile')}
              >
                <Avatar>
                  <AvatarImage src={userData.avatarUrl} alt={userData.username} />
                  <AvatarFallback className="bg-neon-purple/20 text-neon-purple font-bold">
                    {userData.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">{userData.username}</div>
                  <div className="text-sm text-muted-foreground">{userData.followers} подписчиков</div>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-neon-cyan hover:bg-primary/20">
                  <Icon name="Home" size={20} className="mr-3" />
                  Лента
                </Button>
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/20">
                  <Icon name="Users" size={20} className="mr-3" />
                  Друзья
                </Button>
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/20">
                  <Icon name="MessageSquare" size={20} className="mr-3" />
                  Сообщения
                </Button>
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/20">
                  <Icon name="Bookmark" size={20} className="mr-3" />
                  Закладки
                </Button>
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/20">
                  <Icon name="Settings" size={20} className="mr-3" />
                  Настройки
                </Button>
              </div>
            </Card>
          </div>

          <div className="col-span-6 space-y-6">
            <Card className="bg-card/50 backdrop-blur-xl border-primary/30 p-4">
              <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
                  <div className="relative">
                    <Avatar className="w-16 h-16 ring-2 ring-neon-cyan">
                      <AvatarImage src={userData.avatarUrl} alt={userData.username} />
                      <AvatarFallback className="bg-neon-purple/20 text-neon-purple font-bold">
                        {userData.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 bg-neon-cyan rounded-full p-1">
                      <Icon name="Plus" size={12} className="text-background" />
                    </div>
                  </div>
                  <span className="text-xs text-foreground">Твоя история</span>
                </div>

                {stories.map((story) => (
                  <div key={story.id} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
                    <Avatar className="w-16 h-16 ring-2 ring-neon-purple group-hover:ring-neon-cyan transition-all">
                      <AvatarFallback className="bg-gradient-to-br from-neon-purple/30 to-neon-magenta/30 text-foreground font-bold">
                        {story.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground max-w-[64px] truncate">{story.username}</span>
                  </div>
                ))}
              </div>
            </Card>

            <CreatePost onPostCreate={handlePostCreate} />

            <div className="space-y-6">
              {posts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  author={post.author}
                  content={post.content}
                  timestamp={new Date(post.timestamp)}
                  initialLikes={post.likes}
                />
              ))}
            </div>
          </div>

          <div className="col-span-3">
            <Card className="bg-card/50 backdrop-blur-xl border-primary/30 p-4 sticky top-20">
              <h3 className="font-orbitron font-bold text-neon-purple mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={20} />
                Актуальное
              </h3>
              <div className="space-y-3">
                {trending.map((trend, index) => (
                  <div
                    key={index}
                    className="cursor-pointer hover:bg-primary/10 p-3 rounded-lg transition-colors"
                  >
                    <div className="font-semibold text-neon-cyan">#{trend.tag}</div>
                    <div className="text-sm text-muted-foreground">{trend.posts.toLocaleString()} постов</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-primary/20">
                <h3 className="font-orbitron font-bold text-neon-magenta mb-4 flex items-center gap-2">
                  <Icon name="Sparkles" size={20} />
                  Рекомендации
                </h3>
                <div className="space-y-3">
                  {['ProDesigner', 'TechWriter', 'ArtCreator'].map((username, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-neon-cyan/20 text-neon-cyan text-xs font-bold">
                            {username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{username}</span>
                      </div>
                      <Button size="sm" variant="ghost" className="text-neon-cyan hover:bg-primary/20">
                        <Icon name="UserPlus" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
