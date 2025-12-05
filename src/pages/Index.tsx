import { useState } from 'react';
import AuthForm from '@/components/AuthForm';
import MainScreen from '@/components/MainScreen';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return <MainScreen />;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f] relative overflow-hidden p-4">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <AuthForm onSuccess={() => setIsAuthenticated(true)} />
    </div>
  );
}
