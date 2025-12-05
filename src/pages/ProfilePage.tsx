import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Post from '@/components/Post';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

interface UserData {
  username: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  avatarUrl?: string;
}

interface PostData {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useLocalStorage<UserData>('tunzok_user', {
    username: 'User123',
    bio: 'Создатель контента | Веб-разработчик | Любитель неона 💜',
    followers: 42,
    following: 156,
    posts: 8,
  });

  const [userPosts] = useLocalStorage<PostData[]>('tunzok_posts', [
    {
      id: '1',
      author: 'User123',
      content: 'Мой первый пост в Tunzok! Невероятная платформа 🚀✨',
      timestamp: new Date(Date.now() - 3600000),
      likes: 15,
    },
  ]);

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(userData.bio);

  const handleAvatarChange = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUserData({ ...userData, avatarUrl: e.target?.result as string });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSaveBio = () => {
    setUserData({ ...userData, bio: bioText });
    setIsEditingBio(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f] relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple rounded-full blur-[120px] animate-pulse-glow"></div>
      </div>

      <div className="relative z-10">
        <div className="bg-card/30 backdrop-blur-xl border-b border-primary/30">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="text-neon-cyan hover:bg-primary/20"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Главная
            </Button>
            <div className="flex items-center gap-2">
              <Icon name="Zap" className="text-neon-cyan" size={32} />
              <h1 className="text-3xl font-orbitron font-black text-neon-cyan">TUNZOK</h1>
            </div>
            <Button
              variant="ghost"
              className="text-neon-purple hover:bg-primary/20"
            >
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <Card className="bg-card/50 backdrop-blur-xl border-primary/30 neon-glow mb-6">
            <div className="relative h-48 bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-neon-magenta/20 rounded-t-lg">
              <div className="absolute -bottom-16 left-8">
                <div className="relative group cursor-pointer" onClick={handleAvatarChange}>
                  <Avatar className="w-32 h-32 border-4 border-card">
                    <AvatarImage src={userData.avatarUrl} alt={userData.username} />
                    <AvatarFallback className="bg-neon-purple/20 text-neon-purple text-3xl font-bold">
                      {userData.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="Camera" size={32} className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-20 px-8 pb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-orbitron font-bold text-neon-cyan mb-2">
                    {userData.username}
                  </h2>
                  {!isEditingBio ? (
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground">{userData.bio}</p>
                      <Button
                        onClick={() => setIsEditingBio(true)}
                        variant="ghost"
                        size="sm"
                        className="text-neon-purple hover:bg-primary/20"
                      >
                        <Icon name="Pencil" size={16} />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-start">
                      <textarea
                        value={bioText}
                        onChange={(e) => setBioText(e.target.value)}
                        className="bg-background/50 border border-primary/30 rounded-lg px-3 py-2 text-foreground resize-none"
                        rows={2}
                      />
                      <Button
                        onClick={handleSaveBio}
                        size="sm"
                        className="bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30"
                      >
                        <Icon name="Check" size={16} />
                      </Button>
                    </div>
                  )}
                </div>
                <Button className="bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30">
                  <Icon name="UserPlus" size={16} className="mr-2" />
                  Подписаться
                </Button>
              </div>

              <div className="flex gap-8 pt-4 border-t border-primary/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-cyan">{userData.posts}</div>
                  <div className="text-sm text-muted-foreground">Постов</div>
                </div>
                <div className="text-center cursor-pointer hover:opacity-80">
                  <div className="text-2xl font-bold text-neon-purple">{userData.followers}</div>
                  <div className="text-sm text-muted-foreground">Подписчиков</div>
                </div>
                <div className="text-center cursor-pointer hover:opacity-80">
                  <div className="text-2xl font-bold text-neon-magenta">{userData.following}</div>
                  <div className="text-sm text-muted-foreground">Подписок</div>
                </div>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full bg-card/50 backdrop-blur-xl border border-primary/30">
              <TabsTrigger value="posts" className="flex-1">
                <Icon name="FileText" size={18} className="mr-2" />
                Посты
              </TabsTrigger>
              <TabsTrigger value="photos" className="flex-1">
                <Icon name="Image" size={18} className="mr-2" />
                Фото
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex-1">
                <Icon name="Video" size={18} className="mr-2" />
                Видео
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-6">
              <div className="space-y-6">
                {userPosts.filter(p => p.author === userData.username).map((post) => (
                  <Post
                    key={post.id}
                    id={post.id}
                    author={post.author}
                    content={post.content}
                    timestamp={new Date(post.timestamp)}
                    initialLikes={post.likes}
                  />
                ))}
                {userPosts.filter(p => p.author === userData.username).length === 0 && (
                  <Card className="bg-card/50 backdrop-blur-xl border-primary/30 p-12 text-center">
                    <Icon name="FileText" size={64} className="mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">Пока нет постов</p>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="photos" className="mt-6">
              <Card className="bg-card/50 backdrop-blur-xl border-primary/30 p-12 text-center">
                <Icon name="Image" size={64} className="mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">Фотографии появятся здесь</p>
              </Card>
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              <Card className="bg-card/50 backdrop-blur-xl border-primary/30 p-12 text-center">
                <Icon name="Video" size={64} className="mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">Видео появятся здесь</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
