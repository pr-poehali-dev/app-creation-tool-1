import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CaptchaDialog from './CaptchaDialog';
import Icon from '@/components/ui/icon';

interface AuthFormProps {
  onSuccess: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      onSuccess();
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Пароли не совпадают');
        return;
      }
      setShowCaptcha(true);
    }
  };

  const handleCaptchaVerify = (success: boolean) => {
    setShowCaptcha(false);
    if (success) {
      onSuccess();
    } else {
      alert('Капча не пройдена. Попробуйте снова.');
    }
  };

  return (
    <>
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl border-primary/30 neon-glow animate-fade-in">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Zap" className="text-neon-cyan" size={48} />
          </div>
          <CardTitle className="text-4xl font-orbitron text-center text-neon-cyan">
            TUNZOK
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground text-lg">
            {isLogin ? 'Войдите в систему' : 'Создайте аккаунт'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required={!isLogin}
                  className="bg-input border-primary/30 focus:border-primary focus:ring-primary"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">Имя пользователя</Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="bg-input border-primary/30 focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-input border-primary/30 focus:border-primary focus:ring-primary"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">Подтвердите пароль</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required={!isLogin}
                  className="bg-input border-primary/30 focus:border-primary focus:ring-primary"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-orbitron text-lg h-12"
            >
              {isLogin ? 'ВОЙТИ' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <CaptchaDialog open={showCaptcha} onVerify={handleCaptchaVerify} />
    </>
  );
}
