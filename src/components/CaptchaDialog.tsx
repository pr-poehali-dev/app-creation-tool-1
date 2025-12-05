import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CaptchaDialogProps {
  open: boolean;
  onVerify: (success: boolean) => void;
}

export default function CaptchaDialog({ open, onVerify }: CaptchaDialogProps) {
  const [targetNumber, setTargetNumber] = useState(0);
  const [options, setOptions] = useState<number[]>([]);

  useEffect(() => {
    if (open) {
      const target = Math.floor(Math.random() * 100);
      setTargetNumber(target);
      
      const opts = [target];
      while (opts.length < 4) {
        const random = Math.floor(Math.random() * 100);
        if (!opts.includes(random)) {
          opts.push(random);
        }
      }
      setOptions(opts.sort(() => Math.random() - 0.5));
    }
  }, [open]);

  const handleSelect = (num: number) => {
    onVerify(num === targetNumber);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onVerify(false)}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-primary/30 neon-glow">
        <DialogHeader>
          <DialogTitle className="text-2xl font-orbitron text-neon-cyan text-center">
            Проверка безопасности
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <p className="text-center text-lg font-roboto text-muted-foreground">
            Выберите число: <span className="text-neon-purple font-bold text-2xl">{targetNumber}</span>
          </p>
          <div className="grid grid-cols-2 gap-4">
            {options.map((num) => (
              <Button
                key={num}
                onClick={() => handleSelect(num)}
                variant="outline"
                className="h-16 text-xl font-orbitron border-primary/50 hover:border-primary hover:bg-primary/20 hover:neon-glow transition-all duration-300"
              >
                {num}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
