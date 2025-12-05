import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

interface PostProps {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  timestamp: Date;
  initialLikes?: number;
}

export default function Post({ id, author, authorAvatar, content, timestamp, initialLikes = 0 }: PostProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: 'Вы',
        content: commentText,
        timestamp: new Date(),
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return 'только что';
    if (diff < 3600) return `${Math.floor(diff / 60)} мин назад`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} ч назад`;
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <Card className="bg-card/80 backdrop-blur-xl border-primary/30 hover:border-primary/50 transition-all animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary/30">
            <AvatarImage src={authorAvatar} alt={author} />
            <AvatarFallback className="bg-primary/20 text-primary font-orbitron">
              {author.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-orbitron text-neon-purple font-semibold">{author}</p>
            <p className="text-sm text-muted-foreground">{formatTime(timestamp)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground font-roboto whitespace-pre-wrap">{content}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex items-center gap-6 w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`gap-2 transition-all ${
              isLiked ? 'text-neon-magenta hover:text-neon-magenta' : 'text-muted-foreground'
            }`}
          >
            <Icon name="Heart" size={20} className={isLiked ? 'fill-current' : ''} />
            <span className="font-roboto">{likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="gap-2 text-muted-foreground hover:text-neon-cyan transition-colors"
          >
            <Icon name="MessageSquare" size={20} />
            <span className="font-roboto">{comments.length}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-neon-purple transition-colors"
          >
            <Icon name="Share2" size={20} />
          </Button>
        </div>

        {showComments && (
          <>
            <Separator className="bg-primary/20" />
            <div className="w-full space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 animate-fade-in">
                  <Avatar className="h-8 w-8 border border-primary/30">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs font-orbitron">
                      {comment.author.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="font-orbitron text-sm text-neon-cyan font-semibold">{comment.author}</p>
                      <p className="text-sm text-foreground font-roboto">{comment.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground px-3">{formatTime(comment.timestamp)}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <Input
                  placeholder="Написать комментарий..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  className="bg-input border-primary/30 focus:border-primary font-roboto"
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  size="icon"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
