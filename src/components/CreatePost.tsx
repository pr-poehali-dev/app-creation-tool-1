import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface CreatePostProps {
  onPostCreate: (content: string) => void;
}

export default function CreatePost({ onPostCreate }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onPostCreate(content);
      setContent('');
      setIsExpanded(false);
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-xl border-primary/30 hover:border-primary/50 transition-all">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Textarea
            placeholder="Что нового?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="min-h-[100px] bg-input border-primary/30 focus:border-primary resize-none font-roboto"
          />
          {isExpanded && (
            <div className="flex items-center justify-between animate-fade-in">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/30 hover:border-primary hover:bg-primary/10"
                >
                  <Icon name="Image" size={18} className="mr-2" />
                  Фото
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/30 hover:border-primary hover:bg-primary/10"
                >
                  <Icon name="Video" size={18} className="mr-2" />
                  Видео
                </Button>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-orbitron"
              >
                <Icon name="Send" size={18} className="mr-2" />
                Опубликовать
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
