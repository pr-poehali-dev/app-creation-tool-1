import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem('tunzok_users') || '[]');
      const user = users.find((u: { email: string; password: string }) => 
        u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem('tunzok_current_user', JSON.stringify(user));
        toast({
          title: 'Успешный вход',
          description: 'Добро пожаловать!',
        });
        navigate('/home');
      } else {
        toast({
          title: 'Ошибка',
          description: 'Неверный email или пароль',
          variant: 'destructive',
        });
      }
    } else {
      if (password !== confirmPassword) {
        toast({
          title: 'Ошибка',
          description: 'Пароли не совпадают',
          variant: 'destructive',
        });
        return;
      }

      const users = JSON.parse(localStorage.getItem('tunzok_users') || '[]');
      
      if (users.find((u: { email: string }) => u.email === email)) {
        toast({
          title: 'Ошибка',
          description: 'Пользователь с таким email уже существует',
          variant: 'destructive',
        });
        return;
      }

      const newUser = { email, password };
      users.push(newUser);
      localStorage.setItem('tunzok_users', JSON.stringify(users));
      localStorage.setItem('tunzok_current_user', JSON.stringify(newUser));

      toast({
        title: 'Регистрация успешна',
        description: 'Добро пожаловать!',
      });
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <Card className="w-full max-w-md relative z-10 border-primary/20 bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-neon flex items-center justify-center neon-glow">
              <Icon name="Sparkles" size={32} className="text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-neon-cyan">TUNZOK</CardTitle>
          <CardDescription className="text-muted-foreground">
            {isLogin ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                className="bg-input border-border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-input border-border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-input border-border"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            <Button type="submit" className="w-full neon-glow" size="lg">
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </form>

          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline"
            >
              {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
