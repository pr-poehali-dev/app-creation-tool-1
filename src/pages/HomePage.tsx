import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useEffect } from 'react';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('tunzok_current_user');
    if (!currentUser) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('tunzok_current_user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] p-4 flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <Card className="w-full max-w-2xl relative z-10 border-primary/20 bg-card/95 backdrop-blur-sm">
        <CardContent className="p-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-neon flex items-center justify-center neon-glow">
              <Icon name="Sparkles" size={48} className="text-primary-foreground" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-neon-cyan">TUNZOK</h1>

          <div className="bg-accent/10 border border-accent/30 rounded-lg p-8 space-y-4">
            <div className="flex justify-center">
              <Icon name="Construction" size={64} className="text-accent animate-float" />
            </div>
            <h2 className="text-3xl font-bold text-accent">Сайт в разработке</h2>
            <p className="text-muted-foreground text-lg">
              Мы работаем над созданием чего-то удивительного. Скоро здесь появится полноценная социальная сеть с неоновым дизайном!
            </p>
            <div className="flex flex-wrap gap-3 justify-center text-sm text-muted-foreground mt-6">
              <div className="flex items-center gap-2">
                <Icon name="Users" size={20} className="text-primary" />
                <span>Социальная сеть</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="MessageCircle" size={20} className="text-secondary" />
                <span>Общение</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Image" size={20} className="text-accent" />
                <span>Медиа</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
