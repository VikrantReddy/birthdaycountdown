import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Gift {
  title: string;
  description: string;
  emoji: string;
}

interface GiftPopupProps {
  gift: Gift;
  isOpen: boolean;
  onClose: () => void;
}

export const GiftPopup = ({ gift, isOpen, onClose }: GiftPopupProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md gradient-dreamy glow-soft border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-primary">
            🎉 Your Gift! 🎉
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-6 py-4">
          <div className="text-6xl">{gift.emoji}</div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-primary">{gift.title}</h3>
            <p className="text-primary leading-relaxed">{gift.description}</p>
          </div>
          
          <div className="flex justify-center space-x-2 text-2xl">
            <span className="float sparkle" style={{ animationDelay: '0s' }}>✨</span>
            <span className="float sparkle" style={{ animationDelay: '0.5s' }}>💖</span>
            <span className="float sparkle" style={{ animationDelay: '1s' }}>🌟</span>
          </div>
        </div>
        
        <div className="text-center">
          <Button onClick={onClose} variant="secondary">
            Keep This Memory 💕
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};