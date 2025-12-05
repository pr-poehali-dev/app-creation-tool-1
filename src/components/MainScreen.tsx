import Icon from '@/components/ui/icon';

export default function MainScreen() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-magenta rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center space-y-8 px-4 animate-fade-in">
        <div className="flex items-center justify-center mb-8 animate-float">
          <Icon name="Zap" className="text-neon-cyan" size={80} />
        </div>

        <h1 className="text-7xl md:text-8xl font-orbitron font-black text-neon-cyan mb-4">
          TUNZOK
        </h1>

        <div className="space-y-4">
          <div className="inline-block px-8 py-4 bg-card/50 backdrop-blur-xl rounded-2xl border border-primary/30 neon-glow">
            <p className="text-2xl md:text-3xl font-orbitron text-neon-purple">
              В РАЗРАБОТКЕ
            </p>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-roboto">
            Платформа для публикации контента и взаимодействия с пользователями
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
          <div className="flex items-center gap-2 text-neon-cyan">
            <Icon name="Users" size={24} />
            <span className="font-roboto">Социальная сеть</span>
          </div>
          <div className="flex items-center gap-2 text-neon-purple">
            <Icon name="Image" size={24} />
            <span className="font-roboto">Мультимедиа</span>
          </div>
          <div className="flex items-center gap-2 text-neon-magenta">
            <Icon name="MessageSquare" size={24} />
            <span className="font-roboto">Общение</span>
          </div>
        </div>

        <div className="pt-12">
          <div className="inline-flex items-center gap-2 text-muted-foreground animate-pulse">
            <Icon name="Rocket" size={20} />
            <span className="font-roboto text-sm">Скоро запуск...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
