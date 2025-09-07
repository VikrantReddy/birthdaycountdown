import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { GiftPopup } from './GiftPopup';

interface DayPageProps {
  day: number;
  affirmation: string;
  gift: {
    title: string;
    description: string;
    emoji: string;
  };
  isUnlocked: boolean;
}

const DayPage = ({ day, affirmation, gift, isUnlocked }: DayPageProps) => {
  const [isGiftOpened, setIsGiftOpened] = useState(() => {
    const savedGifts = localStorage.getItem('birthdayGifts');
    const openedGifts = savedGifts ? JSON.parse(savedGifts) : [];
    return openedGifts.includes(day);
  });
  const [showGiftPopup, setShowGiftPopup] = useState(false);

  const handleGiftOpen = () => {
    if (!isGiftOpened) {
      // Confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFB6C1', '#FFC0CB', '#FFCCCB', '#FFD700', '#FF69B4']
      });

      // Save to localStorage
      const savedGifts = localStorage.getItem('birthdayGifts');
      const openedGifts = savedGifts ? JSON.parse(savedGifts) : [];
      openedGifts.push(day);
      localStorage.setItem('birthdayGifts', JSON.stringify(openedGifts));
      
      setIsGiftOpened(true);
    }
    setShowGiftPopup(true);
  };

  if (!isUnlocked) {
    return (
      <Card className="p-8 gradient-dreamy glow-soft border-none text-center">
        <div className="space-y-4">
          <div className="text-6xl opacity-50">🔒</div>
          <h2 className="text-2xl font-bold text-primary">Day {day}</h2>
          <p className="text-muted-foreground">This day will unlock soon!</p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="p-8 gradient-dreamy glow-soft border-none space-y-6">
        <div className="text-center space-y-4">
          <div className="text-4xl">🌸</div>
          <h2 className="text-3xl font-bold text-primary">Day {day}</h2>
        </div>

        <div className="text-center space-y-4">
          <div className="text-lg text-primary font-medium">
            {affirmation}
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={handleGiftOpen}
            className={`text-4xl transition-transform duration-300 ${
              isGiftOpened ? 'scale-110' : 'hover:scale-105'
            }`}
            variant="ghost"
          >
            {isGiftOpened ? '🎁✨' : '🎁'}
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            {isGiftOpened ? 'Gift opened!' : 'Click to open your gift!'}
          </p>
        </div>
      </Card>

      <GiftPopup
        gift={gift}
        isOpen={showGiftPopup}
        onClose={() => setShowGiftPopup(false)}
      />
    </>
  );
};

export default DayPage;