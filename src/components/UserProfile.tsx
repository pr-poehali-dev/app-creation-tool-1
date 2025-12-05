import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface UserProfileProps {
  username: string;
  followers: number;
  onAvatarChange: (file: File) => void;
}

export default function UserProfile({ username, followers, onAvatarChange }: UserProfileProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      onAvatarChange(file);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="fixed top-4 right-4 z-50 p-2 rounded-full bg-card/80 backdrop-blur-xl border border-primary/30 hover:neon-glow transition-all duration-300"
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback className="bg-primary text-primary-foreground font-orbitron text-lg">
              {username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-card/95 backdrop-blur-xl border-primary/30 w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="font-orbitron text-2xl text-neon-cyan">Профиль</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-primary neon-glow">
                <AvatarImage src={avatarUrl} alt={username} />
                <AvatarFallback className="bg-primary text-primary-foreground font-orbitron text-4xl">
                  {username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Icon name="Camera" size={32} className="text-white" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-orbitron text-neon-purple">{username}</h2>
              <div className="flex items-center justify-center gap-2 mt-2 text-muted-foreground">
                <Icon name="Users" size={18} />
                <span className="font-roboto">
                  <span className="text-neon-cyan font-bold">{followers}</span> подписчиков
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-primary/20">
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start border-primary/30 hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Icon name="Settings" size={20} className="mr-3" />
                Настройки
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-primary/30 hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Icon name="Bell" size={20} className="mr-3" />
                Уведомления
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-primary/30 hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Icon name="LogOut" size={20} className="mr-3" />
                Выход
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
