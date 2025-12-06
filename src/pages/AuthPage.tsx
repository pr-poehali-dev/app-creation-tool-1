import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

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
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 text-center space-y-3">
            <div className="flex justify-center">
              <Icon name="Construction" size={48} className="text-accent animate-float" />
            </div>
            <h3 className="text-xl font-bold text-accent">Сайт в разработке</h3>
            <p className="text-muted-foreground text-sm">
              Мы работаем над созданием чего-то удивительного. Скоро здесь появится полноценная социальная сеть!
            </p>
          </div>

          <div className="space-y-3 opacity-50 pointer-events-none">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-input border-border"
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
                />
              </div>
            )}

            <Button className="w-full neon-glow" size="lg">
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </div>

          <div className="text-center text-sm opacity-50">
            <button
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
